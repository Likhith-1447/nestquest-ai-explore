
import React, { useEffect, useState } from 'react';
import { Bot, TrendingUp, MapPin, DollarSign, Home, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { usePropertyAI } from '@/hooks/usePropertyAI';
import { usePropertyData } from '@/hooks/usePropertyData';
import { useNavigate } from 'react-router-dom';

interface AIRecommendationsProps {
  searchQuery?: string;
  className?: string;
}

export const AIRecommendations: React.FC<AIRecommendationsProps> = ({
  searchQuery = '',
  className = ''
}) => {
  const navigate = useNavigate();
  const { analyzeProperties, aiInsights, isLoading } = usePropertyAI();
  const { properties } = usePropertyData();
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  useEffect(() => {
    if (properties.length > 0 && !hasAnalyzed) {
      analyzeProperties(searchQuery || 'general property recommendations', properties.slice(0, 10));
      setHasAnalyzed(true);
    }
  }, [properties, searchQuery, hasAnalyzed, analyzeProperties]);

  const recommendations = aiInsights?.recommendations || [];
  const marketAnalysis = aiInsights?.market_analysis || '';
  const searchTips = aiInsights?.search_tips || '';

  const handleViewProperty = (propertyId: string) => {
    console.log('Navigating to property from AI recommendations:', propertyId);
    navigate(`/property/${propertyId}`);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* AI Market Insights */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-blue-800">Market Insights</CardTitle>
            <Badge className="gradient-ai text-white">
              <Bot className="w-3 h-3 mr-1" />
              AI Powered
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span className="text-blue-700">Analyzing market trends...</span>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-blue-700">{marketAnalysis}</p>
              {searchTips && (
                <div className="bg-blue-100 p-3 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Sparkles className="w-4 h-4 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-800">Search Tips</p>
                      <p className="text-blue-700 text-sm">{searchTips}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Property Recommendations */}
      {recommendations.length > 0 && (
        <Card className="border-purple-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Home className="w-5 h-5 text-purple-600" />
                <CardTitle className="text-purple-800">AI Recommended Properties</CardTitle>
              </div>
              <Badge variant="secondary" className="text-purple-700">
                {recommendations.length} recommendations
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendations.map((rec, index) => {
              const property = properties.find(p => p.id === rec.property_id);
              return (
                <div
                  key={rec.property_id}
                  className="bg-gradient-to-r from-purple-50 to-white p-4 rounded-lg border border-purple-100 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge className="gradient-ai text-white text-xs">
                          Score: {rec.score}
                        </Badge>
                        <span className="text-purple-600 font-medium">
                          #{index + 1} Recommendation
                        </span>
                      </div>
                      <h4 className="font-semibold text-gray-900">
                        {property?.address || `Property ${rec.property_id}`}
                      </h4>
                      {property && (
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <span className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {property.city}, {property.state}
                          </span>
                          <span className="flex items-center">
                            <DollarSign className="w-3 h-3 mr-1" />
                            {property.current_value?.toLocaleString() || 'Price on request'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-purple-700 text-sm bg-purple-50 p-2 rounded italic">
                    "{rec.reason}"
                  </p>
                  {property && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3 text-purple-600 border-purple-300 hover:bg-purple-50"
                      onClick={() => handleViewProperty(property.id)}
                    >
                      View Details
                    </Button>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
