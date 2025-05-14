
import React from 'react';
import { QrCode } from 'lucide-react';

interface EventBadgeProps {
  name: string;
  type: string;
  event?: string;
  date?: string;
  time?: string;
  location?: string;
  qrValue: string;
  logo?: string;
  printMode?: boolean;
}

const EventBadge: React.FC<EventBadgeProps> = ({
  name,
  type,
  event,
  date,
  time,
  location,
  qrValue,
  logo = '/lovable-uploads/8b8ba947-ce02-4dae-b677-d70b3a0211b3.png',
  printMode = false
}) => {
  return (
    <div className={`bg-white rounded-lg overflow-hidden shadow-md ${printMode ? 'w-[300px] h-[500px]' : 'w-full md:w-[300px] h-auto'}`}>
      {/* Header with logo */}
      <div className="bg-blue-600 p-4 flex justify-center items-center">
        <img src={logo} alt="Event Logo" className="h-10 object-contain" />
      </div>
      
      {/* Badge content */}
      <div className="p-6 flex flex-col items-center text-center space-y-6">
        {/* Attendee details */}
        <div className="space-y-2">
          <h4 className="text-xl font-bold text-gray-900">{name}</h4>
          <p className="text-gray-600">{type}</p>
        </div>
        
        {/* QR Code */}
        <div className="w-32 h-32 bg-white border border-gray-200 p-1 rounded-md flex items-center justify-center">
          {qrValue ? (
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(qrValue)}`} 
              alt="QR Code"
              className="w-full h-full"
            />
          ) : (
            <QrCode size={120} />
          )}
        </div>
        
        {/* Event details */}
        {event && date && (
          <div className="text-sm text-gray-600 space-y-1">
            {date && <p className="font-medium">{date}</p>}
            {time && <p>{time}</p>}
            {location && <p className="text-xs">{location}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventBadge;
