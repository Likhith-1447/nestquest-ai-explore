
import React from 'react';
import { Link } from 'react-router-dom';
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
  const formatPrice = (price: number | null) => {
    if (!price) return 'Price on request';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <PropertyCardImage
        property={property}
        showMarketData={showMarketData}
        formatPrice={formatPrice}
      />

      <CardContent className="p-4">
        <PropertyCardDetails
          property={property}
          formatPrice={formatPrice}
        />

        <PropertyCardFeatures property={property} />

        <PropertyCardMarketData
          property={property}
          showMarketData={showMarketData}
        />

        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            {property.property_type && (
              <span className="capitalize">{property.property_type}</span>
            )}
          </div>
          <Link to={`/property/${property.id}`}>
            <Button size="sm" className="gradient-ai text-white">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
