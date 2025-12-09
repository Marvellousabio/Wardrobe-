"use client";

import { useAuth } from "@/contexts/AuthContext";
import Auth from "@/components/Auth";
import WardrobeApp from "@/components/WardrobeApp";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return user ? <WardrobeApp /> : <Auth />;
}
