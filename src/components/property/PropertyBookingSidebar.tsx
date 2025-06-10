
import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EnhancedProperty } from '@/hooks/usePropertyData';

interface PropertyBookingSidebarProps {
  property: EnhancedProperty;
}

export const PropertyBookingSidebar: React.FC<PropertyBookingSidebarProps> = ({ property }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);

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
    <Card className="sticky top-24 animate-slide-in-right">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold">{formatPrice(property.current_value)}</span>
            {property.listing_type === 'rent' && <span className="text-gray-600"> / month</span>}
          </div>
          <Badge className="gradient-ai text-white">
            <Sparkles className="w-3 h-3 mr-1" />
            AI Recommended
          </Badge>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
              <Input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full transition-all duration-200 focus:scale-105"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
              <Input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full transition-all duration-200 focus:scale-105"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
            <Input
              type="number"
              min="1"
              max="10"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
              className="w-full transition-all duration-200 focus:scale-105"
            />
          </div>

          <Button className="w-full gradient-ai text-white font-semibold py-3 hover-scale transition-all duration-200">
            {property.listing_type === 'rent' ? 'Contact for Viewing' : 'Request Info'}
          </Button>

          <div className="text-center text-sm text-gray-600">
            No commitment required
          </div>

          {property.current_value && (
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Property Value</span>
                <span>{formatPrice(property.current_value)}</span>
              </div>
              {property.hoa_fee && (
                <div className="flex justify-between">
                  <span>HOA Fee</span>
                  <span>${property.hoa_fee}/month</span>
                </div>
              )}
              <div className="flex justify-between text-sm text-gray-600">
                <span>Price per sq ft</span>
                <span>${Math.round((property.current_value / (property.square_feet || 1)))}</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
