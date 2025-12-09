import { useState, useEffect } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";

interface ClothingItem {
  id: number;
  type: string;
  color: string;
  season: string;
  name: string;
  image?: string;
}

interface Event {
  id: number;
  name: string;
  occasion: string;
  date: string;
}

interface Outfit {
  id: number;
  items: ClothingItem[];
  occasion: string;
  weather: string;
  score: number;
}

interface UserData {
  wardrobe: ClothingItem[];
  events: Event[];
  generatedOutfits: Outfit[];
  favorites: Outfit[];
  darkMode: boolean;
  onboardingCompleted?: boolean;
}

export const useFirestore = () => {
  const { user } = useAuth();
  const [data, setData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setData(null);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setData(docSnap.data() as UserData);
        } else {
          // Initialize with default data
          const defaultData: UserData = {
            wardrobe: [],
            events: [],
            generatedOutfits: [],
            favorites: [],
            darkMode: false,
          };
          await setDoc(docRef, defaultData);
          setData(defaultData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const updateData = async (updates: Partial<UserData>) => {
    if (!user) return;

    try {
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, updates);
      setData((prev) => (prev ? { ...prev, ...updates } : null));
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return { data, loading, updateData };
};
