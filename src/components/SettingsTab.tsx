'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface SettingsTabProps {
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
  wardrobe: any[];
  events: any[];
  favorites: any[];
  onImportData: (data: any) => void;
  darkModeEnabled: boolean;
}

const SettingsTab: React.FC<SettingsTabProps> = ({
  darkMode,
  setDarkMode,
  wardrobe,
  events,
  favorites,
  onImportData,
}) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || '');

  const exportData = () => {
    const data = {
      wardrobe,
      events,
      favorites,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wardrobe-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          onImportData(data);
          alert('Data imported successfully!');
        } catch (error) {
          alert('Invalid file format');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>

      {/* Profile Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Profile</h3>
        <div>
          <label className="block text-sm font-medium mb-2">Display Name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className={`w-full px-3 py-2 rounded-lg border ${
              darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter your display name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={user?.email || ''}
            disabled
            className={`w-full px-3 py-2 rounded-lg border ${
              darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            } opacity-50 cursor-not-allowed`}
          />
        </div>
      </div>

      <div className="border-t pt-6 space-y-4">
        <div className="flex items-center justify-between">
          <span>Dark Mode</span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-12 h-6 rounded-full transition-colors ${
              darkMode ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full transition-transform ${
                darkMode ? 'translate-x-6' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <span>Notifications</span>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`w-12 h-6 rounded-full transition-colors ${
              notifications ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full transition-transform ${
                notifications ? 'translate-x-6' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Data Management</h3>
        <div className="space-y-4">
          <button
            onClick={exportData}
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Export Data
          </button>
          <div>
            <label className="block text-sm font-medium mb-2">Import Data</label>
            <input
              type="file"
              accept=".json"
              onChange={importData}
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">About</h3>
        <div className="space-y-2 text-sm">
          <p>Version: 0.1.0</p>
          <p>Built with Next.js, React, and Firebase</p>
          <div className="flex gap-4 mt-4">
            <a href="/privacy" className="text-blue-500 hover:underline">Privacy Policy</a>
            <a href="/terms" className="text-blue-500 hover:underline">Terms of Service</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;