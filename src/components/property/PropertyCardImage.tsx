
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Camera, Heart, TrendingUp } from 'lucide-react';
import { EnhancedProperty } from '@/hooks/usePropertyData';

interface PropertyCardImageProps {
  property: EnhancedProperty;
  showMarketData?: boolean;
  formatPrice: (price: number | null) => string;
}

export const PropertyCardImage: React.FC<PropertyCardImageProps> = ({
  property,
  showMarketData = false,
  formatPrice
}) => {
  const primaryPhoto = property.property_photos?.find(photo => photo.is_primary) 
    || property.property_photos?.[0];
  
  const marketData = property.property_market_data?.[0];

  return (
    <div className="relative">
      <img
        src={primaryPhoto?.photo_url || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop"}
        alt={property.address}
        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
      />
      
      <div className="absolute top-3 left-3 flex flex-wrap gap-1">
        {property.listing_type && (
          <Badge variant="secondary" className="bg-purple-600 text-white text-xs">
            For {property.listing_type}
          </Badge>
        )}
        {property.property_status === 'new' && (
          <Badge variant="secondary" className="bg-green-600 text-white text-xs">
            New Listing
          </Badge>
        )}
      </div>

      <div className="absolute top-3 right-3 flex gap-2">
        {property.property_photos && property.property_photos.length > 1 && (
          <Badge variant="secondary" className="bg-black/70 text-white text-xs">
            <Camera className="w-3 h-3 mr-1" />
            {property.property_photos.length}
          </Badge>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="bg-white/80 backdrop-blur-sm hover:bg-white p-2"
        >
          <Heart className="w-4 h-4" />
        </Button>
      </div>

      {showMarketData && marketData?.price_estimate && (
        <div className="absolute bottom-3 left-3">
          <Badge variant="secondary" className="bg-blue-600 text-white text-xs">
            <TrendingUp className="w-3 h-3 mr-1" />
            Est. {formatPrice(marketData.price_estimate)}
          </Badge>
        </div>
      )}
    </div>
  );
};
