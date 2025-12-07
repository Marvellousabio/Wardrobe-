import React from 'react';
import { Calendar, Plus } from 'lucide-react';

interface Event {
  id: number;
  name: string;
  occasion: string;
  date: string;
}

interface EventsTabProps {
  events: Event[];
  onAddEvent: () => void;
  onGenerateOutfits: (occasion: string) => void;
  darkMode: boolean;
}

const EventsTab: React.FC<EventsTabProps> = ({
  events,
  onAddEvent,
  onGenerateOutfits,
  darkMode
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Upcoming Events</h2>
        <button
          onClick={onAddEvent}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Event
        </button>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            No events scheduled. Add events to generate outfit suggestions.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {events.map(event => (
            <div
              key={event.id}
              className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-lg border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{event.name}</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {event.date} • {event.occasion}
                  </p>
                </div>
                <button
                  onClick={() => onGenerateOutfits(event.occasion)}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Generate Outfits
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsTab;