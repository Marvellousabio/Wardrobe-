'use client';

import React, { useState, useEffect } from 'react';
import Header from './Header';
import StatusBar from './StatusBar';
import TabNavigation from './TabNavigation';
import ScannerTab from './ScannerTab';
import WardrobeTab from './WardrobeTab';
import EventsTab from './EventsTab';
import OutfitsTab from './OutfitsTab';
import Footer from './Footer';

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
  const [wardrobe, setWardrobe] = useState<ClothingItem[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [generatedOutfits, setGeneratedOutfits] = useState<Outfit[]>([]);
  const [favorites, setFavorites] = useState<Outfit[]>([]);
  const [scanning, setScanning] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [weather, setWeather] = useState({ temp: 75, condition: 'Sunny' });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedWardrobe = localStorage.getItem('wardrobe');
    const savedEvents = localStorage.getItem('events');
    const savedOutfits = localStorage.getItem('generatedOutfits');
    const savedFavorites = localStorage.getItem('favorites');
    const savedDarkMode = localStorage.getItem('darkMode');

    if (savedWardrobe) setWardrobe(JSON.parse(savedWardrobe));
    if (savedEvents) setEvents(JSON.parse(savedEvents));
    if (savedOutfits) setGeneratedOutfits(JSON.parse(savedOutfits));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedDarkMode) setDarkMode(JSON.parse(savedDarkMode));
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('wardrobe', JSON.stringify(wardrobe));
  }, [wardrobe]);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('generatedOutfits', JSON.stringify(generatedOutfits));
  }, [generatedOutfits]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

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
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setScanning(true);
      setTimeout(() => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const image = e.target?.result as string;
          const randomItems = clothingDatabase
            .sort(() => 0.5 - Math.random())
            .slice(0, Math.floor(Math.random() * 3) + 2)
            .map(item => ({ ...item, image }));
          setWardrobe([...wardrobe, ...randomItems]);
          setScanning(false);
          setSelectedFile(null);
        };
        reader.readAsDataURL(file);
      }, 2000);
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
    setEvents([...events, newEvent]);
  };

  const generateOutfitsForEvent = (occasion: string) => {
    const outfits = generateOutfits(occasion, 'sunny');
    setGeneratedOutfits(outfits);
    setActiveTab('outfits');
  };

  const saveToFavorites = (outfit: Outfit) => {
    if (!favorites.find(fav => fav.id === outfit.id)) {
      setFavorites([...favorites, outfit]);
    }
  };

  return (
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
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default WardrobeApp;