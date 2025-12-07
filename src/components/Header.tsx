import React from 'react';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Digital Wardrobe & Outfit Planner</h1>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          AI-powered outfit recommendations based on weather and occasion
        </p>
      </div>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
      >
        {darkMode ? '☀️' : '🌙'} Mode
      </button>
    </div>
  );
};

export default Header;