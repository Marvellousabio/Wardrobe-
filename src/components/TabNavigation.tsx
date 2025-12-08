import React from 'react';

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  darkMode: boolean;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab, darkMode }) => {
  const tabs = ['scanner', 'wardrobe', 'events', 'outfits', 'settings'];

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-2 mb-6 flex gap-2`}>
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
            activeTab === tab
              ? 'bg-blue-500 text-white shadow-lg'
              : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
          }`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;