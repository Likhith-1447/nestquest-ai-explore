
import React from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EnhancedProperty } from '@/hooks/usePropertyData';

interface PropertyHostInfoProps {
  property: EnhancedProperty;
}

export const PropertyHostInfo: React.FC<PropertyHostInfoProps> = ({ property }) => {
  return (
    <Card className="animate-scale-in">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
            {property.owner_name?.charAt(0) || 'O'}
          </div>
          <div>
            <h4 className="font-semibold">Listed by {property.owner_name || 'Property Owner'}</h4>
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>4.95 (89 reviews)</span>
            </div>
          </div>
          <Button variant="outline" size="sm" className="ml-auto hover-scale">
            <MessageSquare className="w-4 h-4 mr-2" />
            Contact
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
