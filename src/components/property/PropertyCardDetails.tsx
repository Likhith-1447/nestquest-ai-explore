
import React from 'react';
import { MapPin, Bed, Bath, Square, Calendar } from 'lucide-react';
import { EnhancedProperty } from '@/hooks/usePropertyData';

interface PropertyCardDetailsProps {
  property: EnhancedProperty;
  formatPrice: (price: number | null) => string;
}

export const PropertyCardDetails: React.FC<PropertyCardDetailsProps> = ({
  property,
  formatPrice
}) => {
  return (
    <>
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-lg mb-1 line-clamp-1">
            {formatPrice(property.current_value || 0)}
          </h3>
          <p className="text-gray-600 text-sm flex items-center mb-2">
            <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
            <span className="line-clamp-1">{property.address}</span>
          </p>
          <p className="text-gray-500 text-xs">
            {property.city}, {property.state} {property.zip_code}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
        {property.bedrooms && (
          <div className="flex items-center">
            <Bed className="w-4 h-4 mr-1" />
            <span>{property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}</span>
          </div>
        )}
        {property.bathrooms && (
          <div className="flex items-center">
            <Bath className="w-4 h-4 mr-1" />
            <span>{property.bathrooms} bath{property.bathrooms !== 1 ? 's' : ''}</span>
          </div>
        )}
        {property.square_feet && (
          <div className="flex items-center">
            <Square className="w-4 h-4 mr-1" />
            <span>{property.square_feet.toLocaleString()} sq ft</span>
          </div>
        )}
      </div>

      {property.year_built && (
        <div className="flex items-center text-xs text-gray-500 mb-3">
          <Calendar className="w-3 h-3 mr-1" />
          Built in {property.year_built}
        </div>
      )}
    </>
  );
};
