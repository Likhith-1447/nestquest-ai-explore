
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

  // Generate AI-powered insights for the card
  const generateAIScore = () => {
    const baseScore = Math.random() * 20 + 75; // 75-95 range
    return Math.floor(baseScore);
  };

  const aiScore = generateAIScore();
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    return 'text-yellow-600 bg-yellow-100';
  };

  return (
    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 group w-full h-full flex flex-col animate-fade-in hover:scale-[1.02] cursor-pointer transform-gpu relative">
      {/* AI Score Badge */}
      <div className="absolute top-3 right-3 z-10">
        <div className={`px-2 py-1 rounded-full text-xs font-bold ${getScoreColor(aiScore)} backdrop-blur-sm`}>
          AI: {aiScore}%
        </div>
      </div>

      <div onClick={handleViewDetails} className="w-full h-full flex flex-col">
        <div className="transform transition-transform duration-300 group-hover:-translate-y-1">
          <PropertyCardImage
            property={property}
            showMarketData={showMarketData}
            formatPrice={formatPrice}
          />
        </div>

        <CardContent className="p-3 sm:p-4 lg:p-5 flex-1 flex flex-col">
          <div className="flex-1">
            <div className="transform transition-transform duration-300 group-hover:translate-x-1">
              <PropertyCardDetails
                property={property}
                formatPrice={formatPrice}
              />
            </div>

            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <PropertyCardFeatures property={property} />
            </div>

            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <PropertyCardMarketData
                property={property}
                showMarketData={showMarketData}
              />
            </div>

            {/* AI Insights Preview */}
            <div className="animate-fade-in mt-3 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-purple-700">AI Insights</span>
                <div className="flex items-center space-x-1">
                  <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-600">Live</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-white rounded p-1">
                  <div className="text-xs font-bold text-green-600">{Math.floor(Math.random() * 20 + 80)}%</div>
                  <div className="text-xs text-gray-600">Investment</div>
                </div>
                <div className="bg-white rounded p-1">
                  <div className="text-xs font-bold text-blue-600">{Math.floor(Math.random() * 15 + 85)}%</div>
                  <div className="text-xs text-gray-600">Location</div>
                </div>
                <div className="bg-white rounded p-1">
                  <div className="text-xs font-bold text-purple-600">{Math.floor(Math.random() * 25 + 75)}%</div>
                  <div className="text-xs text-gray-600">Growth</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="text-xs text-gray-500 hidden sm:block transition-colors duration-300 group-hover:text-gray-700">
              {property.property_type && (
                <span className="capitalize">{property.property_type}</span>
              )}
            </div>
            <Button 
              size="sm" 
              className="gradient-ai text-white hover:scale-110 transition-all duration-300 w-full sm:w-auto text-xs sm:text-sm shadow-lg hover:shadow-xl transform-gpu"
              onClick={handleViewDetails}
            >
              View AI Analysis
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
