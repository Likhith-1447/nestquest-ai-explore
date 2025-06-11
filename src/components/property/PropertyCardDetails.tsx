
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
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-base sm:text-lg mb-1 truncate">
            {formatPrice(property.current_value || 0)}
          </h3>
          <p className="text-gray-600 text-xs sm:text-sm flex items-center mb-2">
            <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
            <span className="truncate">{property.address}</span>
          </p>
          <p className="text-gray-500 text-xs truncate">
            {property.city}, {property.state} {property.zip_code}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-4 mb-3 text-xs sm:text-sm text-gray-600">
        {property.bedrooms && (
          <div className="flex items-center">
            <Bed className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            <span className="hidden sm:inline">{property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}</span>
            <span className="sm:hidden">{property.bedrooms} bed</span>
          </div>
        )}
        {property.bathrooms && (
          <div className="flex items-center">
            <Bath className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            <span className="hidden sm:inline">{property.bathrooms} bath{property.bathrooms !== 1 ? 's' : ''}</span>
            <span className="sm:hidden">{property.bathrooms} bath</span>
          </div>
        )}
        {property.square_feet && (
          <div className="flex items-center col-span-2 sm:col-span-1">
            <Square className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
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
