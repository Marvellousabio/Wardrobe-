import React from 'react';
import { Zap, Check, Shirt } from 'lucide-react';

interface ClothingItem {
  id: number;
  type: string;
  color: string;
  season: string;
  name: string;
  image?: string;
}

interface Outfit {
  id: number;
  items: ClothingItem[];
  occasion: string;
  weather: string;
  score: number;
}

interface OutfitsTabProps {
  generatedOutfits: Outfit[];
  onSaveToFavorites: (outfit: Outfit) => void;
  darkMode: boolean;
}

const OutfitsTab: React.FC<OutfitsTabProps> = ({
  generatedOutfits,
  onSaveToFavorites,
  darkMode
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">AI-Generated Outfits</h2>
      {generatedOutfits.length === 0 ? (
        <div className="text-center py-12">
          <Zap className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            No outfits generated yet. Add events and wardrobe items to get started.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {generatedOutfits.map(outfit => (
            <div
              key={outfit.id}
              className={`${darkMode ? 'bg-gray-700' : 'bg-gradient-to-br from-blue-50 to-purple-50'} p-6 rounded-lg border-2 ${darkMode ? 'border-gray-600' : 'border-blue-200'} hover:shadow-xl transition`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${darkMode ? 'bg-blue-600' : 'bg-blue-500'} text-white`}>
                    {outfit.occasion}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="font-bold text-green-500">{outfit.score}%</span>
                </div>
              </div>

              <div className="space-y-3">
                {outfit.items.map((item, idx) => (
                  <div key={idx} className={`${darkMode ? 'bg-gray-600' : 'bg-white'} p-3 rounded-lg flex items-center gap-3`}>
                    <Shirt className="w-6 h-6 text-blue-500" />
                    <div>
                      <p className="font-semibold text-sm">{item.name}</p>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {item.type} • {item.color}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onSaveToFavorites(outfit)}
                className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg"
              >
                Save to Favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OutfitsTab;