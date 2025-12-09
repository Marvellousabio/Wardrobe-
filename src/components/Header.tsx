"use client";

import React from "react";
import { useAuth } from "@/contexts/AuthContext";

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode }) => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">
          Digital Wardrobe & Outfit Planner
        </h1>
        <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          AI-powered outfit recommendations based on weather and occasion
        </p>
        {user && <p className="text-sm mt-1">Welcome, {user.email}</p>}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`px-4 py-2 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}
        >
          {darkMode ? "☀️" : "🌙"} Mode
        </button>
        {user && (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
