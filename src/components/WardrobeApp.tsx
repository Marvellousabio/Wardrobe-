'use client';

import React, { useState, useEffect } from 'react';
import Header from './Header';
import StatusBar from './StatusBar';
import TabNavigation from './TabNavigation';
import ScannerTab from './ScannerTab';
import WardrobeTab from './WardrobeTab';
import EventsTab from './EventsTab';
import OutfitsTab from './OutfitsTab';
import SettingsTab from './SettingsTab';
import Onboarding from './Onboarding';
import Footer from './Footer';
import { useFirestore } from '@/hooks/useFirestore';
import { getCurrentWeather, WeatherData } from '@/lib/weather';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';

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

const WardrobeApp = () => {
  const [activeTab, setActiveTab] = useState('scanner');
  const [scanning, setScanning] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [weather, setWeather] = useState<WeatherData>({ temp: 75, condition: 'Sunny', description: 'clear sky', icon: '01d' });
  const [showOnboarding, setShowOnboarding] = useState(false);

  const { user } = useAuth();
  const { data, loading, updateData } = useFirestore();

  // Check if onboarding is needed
  useEffect(() => {
    if (data && !data.onboardingCompleted) {
      setShowOnboarding(true);
    }
  }, [data]);

  const wardrobe = data?.wardrobe || [];
  const events = data?.events || [];
  const generatedOutfits = data?.generatedOutfits || [];
  const favorites = data?.favorites || [];
  const darkMode = data?.darkMode || false;

  // Fetch weather on mount
  useEffect(() => {
    const fetchWeather = async () => {
      const weatherData = await getCurrentWeather();
      setWeather(weatherData);
    };
    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading your wardrobe...</div>
      </div>
    );
  }

  // Sample clothing items database
  const clothingDatabase: ClothingItem[] = [
    { id: 1, type: 'shirt', color: 'blue', season: 'all', name: 'Blue Oxford Shirt' },
    { id: 2, type: 'pants', color: 'black', season: 'all', name: 'Black Dress Pants' },
    { id: 3, type: 'jacket', color: 'navy', season: 'winter', name: 'Navy Blazer' },
    { id: 4, type: 'shirt', color: 'white', season: 'all', name: 'White T-Shirt' },
    { id: 5, type: 'pants', color: 'blue', season: 'all', name: 'Blue Jeans' },
    { id: 6, type: 'sweater', color: 'gray', season: 'winter', name: 'Gray Sweater' },
    { id: 7, type: 'dress', color: 'black', season: 'all', name: 'Black Cocktail Dress' },
    { id: 8, type: 'shoes', color: 'brown', season: 'all', name: 'Brown Loafers' },
  ];


  // Handle file upload and simulate scanning
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && user) {
      setSelectedFile(file);
      setScanning(true);

      try {
        // Upload to Firebase Storage
        const storageRef = ref(storage, `users/${user.uid}/wardrobe/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);

        // Simulate AI processing delay
        setTimeout(() => {
          const randomItems = clothingDatabase
            .sort(() => 0.5 - Math.random())
            .slice(0, Math.floor(Math.random() * 3) + 2)
            .map(item => ({ ...item, image: downloadURL }));
          updateData({ wardrobe: [...wardrobe, ...randomItems] });
          setScanning(false);
          setSelectedFile(null);
        }, 2000);
      } catch (error) {
        console.error('Upload error:', error);
        // Fallback to base64 if upload fails
        const reader = new FileReader();
        reader.onload = (e) => {
          const image = e.target?.result as string;
          const randomItems = clothingDatabase
            .sort(() => 0.5 - Math.random())
            .slice(0, Math.floor(Math.random() * 3) + 2)
            .map(item => ({ ...item, image }));
          updateData({ wardrobe: [...wardrobe, ...randomItems] });
          setScanning(false);
          setSelectedFile(null);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  // AI outfit generation algorithm
  const generateOutfits = (occasion: string, weather: string): Outfit[] => {
    const shirts = wardrobe.filter(item => item.type === 'shirt' || item.type === 'dress');
    const bottoms = wardrobe.filter(item => item.type === 'pants');
    const layers = wardrobe.filter(item => item.type === 'jacket' || item.type === 'sweater');

    const outfits: Outfit[] = [];

    if (occasion === 'business') {
      // Formal combinations
      shirts.forEach(shirt => {
        bottoms.forEach(bottom => {
          if (shirt.color !== bottom.color) {
            outfits.push({
              id: Date.now() + Math.random(),
              items: [shirt, bottom, ...layers.slice(0, 1)],
              occasion,
              weather,
              score: Math.floor(Math.random() * 20) + 80
            });
          }
        });
      });
    } else {
      // Casual combinations
      shirts.forEach(shirt => {
        bottoms.forEach(bottom => {
          outfits.push({
            id: Date.now() + Math.random(),
            items: [shirt, bottom],
            occasion,
            weather,
            score: Math.floor(Math.random() * 20) + 75
          });
        });
      });
    }

    return outfits.slice(0, 3);
  };

  const addEvent = (name: string, occasion: string) => {
    const newEvent = {
      id: Date.now(),
      name,
      occasion,
      date: new Date().toLocaleDateString(),
    };
    updateData({ events: [...events, newEvent] });
  };

  const generateOutfitsForEvent = (occasion: string) => {
    const outfits = generateOutfits(occasion, 'sunny');
    updateData({ generatedOutfits: outfits });
    setActiveTab('outfits');
  };

  const saveToFavorites = (outfit: Outfit) => {
    if (!favorites.find(fav => fav.id === outfit.id)) {
      updateData({ favorites: [...favorites, outfit] });
    }
  };

  const setDarkMode = (mode: boolean) => {
    updateData({ darkMode: mode });
  };

  const handleImportData = (importedData: any) => {
    if (importedData.wardrobe) updateData({ wardrobe: importedData.wardrobe });
    if (importedData.events) updateData({ events: importedData.events });
    if (importedData.favorites) updateData({ favorites: importedData.favorites });
  };

  const completeOnboarding = () => {
    setShowOnboarding(false);
    updateData({ onboardingCompleted: true });
  };

  return (
    <>
      {showOnboarding && (
        <Onboarding onComplete={completeOnboarding} darkMode={darkMode} />
      )}
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-purple-50 text-gray-900'} p-6`}>
        <div className="max-w-6xl mx-auto">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

        <StatusBar
          wardrobeCount={wardrobe.length}
          eventsCount={events.length}
          outfitsCount={generatedOutfits.length}
          favoritesCount={favorites.length}
          weather={weather}
          darkMode={darkMode}
        />

        <TabNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          darkMode={darkMode}
        />

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl p-8 min-h-96`}>
          {activeTab === 'scanner' && (
            <ScannerTab
              scanning={scanning}
              selectedFile={selectedFile}
              onFileUpload={handleFileUpload}
              darkMode={darkMode}
            />
          )}

          {activeTab === 'wardrobe' && (
            <WardrobeTab wardrobe={wardrobe} darkMode={darkMode} />
          )}

          {activeTab === 'events' && (
            <EventsTab
              events={events}
              onAddEvent={() => addEvent('Team Dinner', 'business')}
              onGenerateOutfits={generateOutfitsForEvent}
              darkMode={darkMode}
            />
          )}

          {activeTab === 'outfits' && (
            <OutfitsTab
              generatedOutfits={generatedOutfits}
              onSaveToFavorites={saveToFavorites}
              darkMode={darkMode}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsTab
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              wardrobe={wardrobe}
              events={events}
              favorites={favorites}
              onImportData={handleImportData}
              darkModeEnabled={darkMode}
            />
          )}
        </div>

        <Footer />
      </div>
    </div>
    </>
  );
};

export default WardrobeApp;