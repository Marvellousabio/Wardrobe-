import React from 'react';
import { Shirt } from 'lucide-react';

interface ClothingItem {
  id: number;
  type: string;
  color: string;
  season: string;
  name: string;
  image?: string;
}

interface WardrobeTabProps {
  wardrobe: ClothingItem[];
  darkMode: boolean;
}

const WardrobeTab: React.FC<WardrobeTabProps> = ({ wardrobe, darkMode }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Your Wardrobe ({wardrobe.length} items)</h2>
      {wardrobe.length === 0 ? (
        <div className="text-center py-12">
          <Shirt className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            No items scanned yet. Go to Scanner to add items.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {wardrobe.map((item) => (
            <div
              key={item.id}
              className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg border-2 ${darkMode ? 'border-gray-600' : 'border-gray-200'} hover:shadow-lg transition`}
            >
              <div className="w-full h-32 bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <Shirt className="w-12 h-12 text-white" />
                )}
              </div>
              <h3 className="font-semibold text-sm mb-1">{item.name}</h3>
              <div className="flex gap-2 text-xs">
                <span className={`px-2 py-1 rounded ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                  {item.type}
                </span>
                <span className={`px-2 py-1 rounded ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                  {item.color}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WardrobeTab;