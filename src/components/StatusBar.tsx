import React from 'react';

interface StatusBarProps {
  wardrobeCount: number;
  eventsCount: number;
  outfitsCount: number;
  favoritesCount: number;
  weather: { temp: number; condition: string };
  darkMode: boolean;
}

const StatusBar: React.FC<StatusBarProps> = ({
  wardrobeCount,
  eventsCount,
  outfitsCount,
  favoritesCount,
  weather,
  darkMode
}) => {
  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-4 mb-6 flex items-center justify-between`}>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        <span className="font-semibold">Online Mode Active</span>
      </div>
      <div className="flex gap-4 text-sm">
        <span>Items: {wardrobeCount}</span>
        <span>Events: {eventsCount}</span>
        <span>Outfits: {outfitsCount}</span>
        <span>Favorites: {favoritesCount}</span>
        <span>Weather: {weather.temp}°F {weather.condition}</span>
      </div>
    </div>
  );
};

export default StatusBar;