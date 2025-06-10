
import React from 'react';
import { EnhancedProperty } from '@/hooks/usePropertyData';

interface PropertyCardMarketDataProps {
  property: EnhancedProperty;
  showMarketData?: boolean;
}

export const PropertyCardMarketData: React.FC<PropertyCardMarketDataProps> = ({
  property,
  showMarketData = false
}) => {
  const marketData = property.property_market_data?.[0];

  if (!marketData || !showMarketData) {
    return null;
  }

  return (
    <div className="border-t pt-2 mb-3">
      <div className="grid grid-cols-2 gap-2 text-xs">
        {marketData.price_per_sqft && (
          <div className="text-gray-600">
            <span className="font-medium">${marketData.price_per_sqft}/sq ft</span>
          </div>
        )}
        {marketData.days_on_market && (
          <div className="text-gray-600">
            <span className="font-medium">{marketData.days_on_market} days on market</span>
          </div>
        )}
      </div>
    </div>
  );
};
