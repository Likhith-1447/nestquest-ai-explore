
import React, { useState } from 'react';
import { MapPin, Users, ShoppingBag, GraduationCap, Shield, Leaf } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface NeighborhoodInsightsProps {
  location: string;
}

export const NeighborhoodInsights: React.FC<NeighborhoodInsightsProps> = ({ location }) => {
  const [insights, setInsights] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateInsights = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setInsights({
        overallScore: Math.floor(Math.random() * 30 + 70),
        demographics: {
          averageAge: Math.floor(Math.random() * 20 + 35),
          familyPercentage: Math.floor(Math.random() * 30 + 40),
          medianIncome: Math.floor(Math.random() * 40000 + 60000)
        },
        metrics: [
          { name: 'Safety Score', value: Math.floor(Math.random() * 25 + 75), icon: Shield, color: 'text-green-600' },
          { name: 'School Rating', value: Math.floor(Math.random() * 30 + 70), icon: GraduationCap, color: 'text-blue-600' },
          { name: 'Walkability', value: Math.floor(Math.random() * 40 + 60), icon: Users, color: 'text-purple-600' },
          { name: 'Environmental', value: Math.floor(Math.random() * 35 + 65), icon: Leaf, color: 'text-green-500' },
          { name: 'Shopping/Dining', value: Math.floor(Math.random() * 30 + 70), icon: ShoppingBag, color: 'text-orange-600' }
        ],
        trends: [
          'Property values increased 8.5% in the last year',
          'New shopping center planned for 2025',
          'Excellent public transportation access',
          'Growing young professional community',
          'Low crime rate trending downward'
        ],
        nearbyAmenities: [
          { name: 'Elementary Schools', count: 3, distance: '0.5 miles' },
          { name: 'Parks', count: 5, distance: '0.3 miles' },
          { name: 'Grocery Stores', count: 4, distance: '0.7 miles' },
          { name: 'Restaurants', count: 12, distance: '0.4 miles' },
          { name: 'Healthcare', count: 2, distance: '1.2 miles' }
        ]
      });
      setIsLoading(false);
    }, 1500);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className="border-purple-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-purple-600" />
            <CardTitle className="text-purple-800">Neighborhood AI Insights</CardTitle>
          </div>
          <Button
            onClick={generateInsights}
            disabled={isLoading}
            className="gradient-ai text-white"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Analyzing...
              </>
            ) : (
              'Analyze Area'
            )}
          </Button>
        </div>
        <p className="text-sm text-gray-600">{location}</p>
      </CardHeader>
      
      {insights && (
        <CardContent className="space-y-6">
          {/* Overall Score */}
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
            <div className={`text-3xl font-bold ${getScoreColor(insights.overallScore)}`}>
              {insights.overallScore}/100
            </div>
            <p className="text-sm text-gray-600">Neighborhood Livability Score</p>
          </div>

          {/* Key Metrics */}
          <div>
            <h4 className="font-semibold mb-3">Key Metrics</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {insights.metrics.map((metric: any, index: number) => {
                const IconComponent = metric.icon;
                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <IconComponent className={`w-4 h-4 ${metric.color}`} />
                      <span className="text-sm font-medium">{metric.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress value={metric.value} className="w-16 h-2" />
                      <span className={`text-sm font-bold ${getScoreColor(metric.value)}`}>
                        {metric.value}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Demographics */}
          <div>
            <h4 className="font-semibold mb-3">Demographics</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-xl font-bold text-blue-600">{insights.demographics.averageAge}</div>
                <p className="text-xs text-gray-600">Average Age</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-xl font-bold text-green-600">{insights.demographics.familyPercentage}%</div>
                <p className="text-xs text-gray-600">Families</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="text-lg font-bold text-purple-600">
                  ${insights.demographics.medianIncome.toLocaleString()}
                </div>
                <p className="text-xs text-gray-600">Median Income</p>
              </div>
            </div>
          </div>

          {/* Trends & Insights */}
          <div>
            <h4 className="font-semibold mb-3">AI-Generated Trends</h4>
            <ul className="space-y-2">
              {insights.trends.map((trend: string, index: number) => (
                <li key={index} className="flex items-start text-sm">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  {trend}
                </li>
              ))}
            </ul>
          </div>

          {/* Nearby Amenities */}
          <div>
            <h4 className="font-semibold mb-3">Nearby Amenities</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {insights.nearbyAmenities.map((amenity: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded-lg">
                  <div>
                    <span className="text-sm font-medium">{amenity.name}</span>
                    <p className="text-xs text-gray-600">{amenity.distance} avg</p>
                  </div>
                  <Badge variant="secondary">{amenity.count}</Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
