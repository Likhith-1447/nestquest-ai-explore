
import React from 'react';
import { Home, Bed, Bath, Square } from 'lucide-react';
import { EnhancedProperty } from '@/hooks/usePropertyData';

interface PropertyInfoCardProps {
  property: EnhancedProperty;
}

export const PropertyInfoCard: React.FC<PropertyInfoCardProps> = ({ property }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {property.bedrooms && (
        <div className="bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition-all duration-200 hover:scale-105">
          <div className="flex items-center space-x-2">
            <Bed className="w-5 h-5 text-purple-600" />
            <div>
              <div className="font-semibold">{property.bedrooms}</div>
              <div className="text-sm text-gray-600">Bedrooms</div>
            </div>
          </div>
        </div>
      )}
      {property.bathrooms && (
        <div className="bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition-all duration-200 hover:scale-105">
          <div className="flex items-center space-x-2">
            <Bath className="w-5 h-5 text-blue-600" />
            <div>
              <div className="font-semibold">{property.bathrooms}</div>
              <div className="text-sm text-gray-600">Bathrooms</div>
            </div>
          </div>
        </div>
      )}
      {property.square_feet && (
        <div className="bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition-all duration-200 hover:scale-105">
          <div className="flex items-center space-x-2">
            <Square className="w-5 h-5 text-green-600" />
            <div>
              <div className="font-semibold">{property.square_feet.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Sq Ft</div>
            </div>
          </div>
        </div>
      )}
      {property.year_built && (
        <div className="bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition-all duration-200 hover:scale-105">
          <div className="flex items-center space-x-2">
            <Home className="w-5 h-5 text-orange-600" />
            <div>
              <div className="font-semibold">{property.year_built}</div>
              <div className="text-sm text-gray-600">Built</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
