
import React from 'react';
import { Wifi } from 'lucide-react';
import { EnhancedProperty } from '@/hooks/usePropertyData';

interface PropertyAmenitiesProps {
  property: EnhancedProperty;
}

export const PropertyAmenities: React.FC<PropertyAmenitiesProps> = ({ property }) => {
  const amenities = [
    ...(property.air_conditioning ? ['Air Conditioning'] : []),
    ...(property.fireplace ? ['Fireplace'] : []),
    ...(property.pool ? ['Pool'] : []),
    ...(property.garage_spaces ? [`${property.garage_spaces} Car Garage`] : []),
    ...(property.parking_spaces ? [`${property.parking_spaces} Parking Spaces`] : []),
    ...(property.basement ? ['Basement'] : [])
  ];

  if (amenities.length === 0) return null;

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-3">Amenities</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {amenities.map((amenity, index) => (
          <div 
            key={amenity} 
            className="flex items-center space-x-2 p-3 bg-white rounded-lg shadow-sm border hover:shadow-md transition-all duration-200 hover:scale-105 animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <Wifi className="w-4 h-4 text-gray-600" />
            <span className="text-gray-700">{amenity}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
