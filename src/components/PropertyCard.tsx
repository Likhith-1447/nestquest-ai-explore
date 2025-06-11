
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { EnhancedProperty } from '@/hooks/usePropertyData';
import { PropertyCardImage } from '@/components/property/PropertyCardImage';
import { PropertyCardDetails } from '@/components/property/PropertyCardDetails';
import { PropertyCardFeatures } from '@/components/property/PropertyCardFeatures';
import { PropertyCardMarketData } from '@/components/property/PropertyCardMarketData';

interface PropertyCardProps {
  property: EnhancedProperty;
  showMarketData?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  showMarketData = false 
}) => {
  const navigate = useNavigate();

  const formatPrice = (price: number | null) => {
    if (!price) return 'Price on request';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleViewDetails = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    const propertyId = property.id;
    console.log('PropertyCard: Navigating to property ID:', propertyId);
    
    try {
      navigate(`/property/${propertyId}`);
    } catch (error) {
      console.error('Navigation error:', error);
      window.location.href = `/property/${propertyId}`;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group w-full max-w-sm mx-auto sm:max-w-none">
      <PropertyCardImage
        property={property}
        showMarketData={showMarketData}
        formatPrice={formatPrice}
      />

      <CardContent className="p-3 sm:p-4 lg:p-6">
        <PropertyCardDetails
          property={property}
          formatPrice={formatPrice}
        />

        <PropertyCardFeatures property={property} />

        <PropertyCardMarketData
          property={property}
          showMarketData={showMarketData}
        />

        <div className="flex items-center justify-between mt-4">
          <div className="text-xs text-gray-500 hidden sm:block">
            {property.property_type && (
              <span className="capitalize">{property.property_type}</span>
            )}
          </div>
          <Button 
            size="sm" 
            className="gradient-ai text-white hover:scale-105 transition-transform w-full sm:w-auto"
            onClick={handleViewDetails}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
