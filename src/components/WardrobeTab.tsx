'use client';

import React, { useState, useMemo } from 'react';
import { Shirt, Search } from 'lucide-react';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterColor, setFilterColor] = useState('');
  const [filterSeason, setFilterSeason] = useState('');

  const filteredWardrobe = useMemo(() => {
    return wardrobe.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = !filterType || item.type === filterType;
      const matchesColor = !filterColor || item.color === filterColor;
      const matchesSeason = !filterSeason || item.season === filterSeason;

      return matchesSearch && matchesType && matchesColor && matchesSeason;
    });
  }, [wardrobe, searchTerm, filterType, filterColor, filterSeason]);

  const uniqueTypes = Array.from(new Set(wardrobe.map(item => item.type)));
  const uniqueColors = Array.from(new Set(wardrobe.map(item => item.color)));
  const uniqueSeasons = Array.from(new Set(wardrobe.map(item => item.season)));
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Your Wardrobe ({filteredWardrobe.length} items)</h2>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
              darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <div>
            <label htmlFor="filter-type" className="block text-sm font-medium mb-1">Type</label>
            <select
              id="filter-type"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className={`px-3 py-2 rounded-lg border ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            >
              <option value="">All Types</option>
              {uniqueTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="filter-color" className="block text-sm font-medium mb-1">Color</label>
            <select
              id="filter-color"
              value={filterColor}
              onChange={(e) => setFilterColor(e.target.value)}
              className={`px-3 py-2 rounded-lg border ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            >
              <option value="">All Colors</option>
              {uniqueColors.map(color => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="filter-season" className="block text-sm font-medium mb-1">Season</label>
            <select
              id="filter-season"
              value={filterSeason}
              onChange={(e) => setFilterSeason(e.target.value)}
              className={`px-3 py-2 rounded-lg border ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            >
              <option value="">All Seasons</option>
              {uniqueSeasons.map(season => (
                <option key={season} value={season}>{season}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredWardrobe.length === 0 ? (
        <div className="text-center py-12">
          <Shirt className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            No items scanned yet. Go to Scanner to add items.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredWardrobe.map((item) => (
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