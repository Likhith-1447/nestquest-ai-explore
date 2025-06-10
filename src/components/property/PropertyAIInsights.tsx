
import React from 'react';
import { Bot, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { EnhancedProperty } from '@/hooks/usePropertyData';

interface PropertyAIInsightsProps {
  property: EnhancedProperty;
}

export const PropertyAIInsights: React.FC<PropertyAIInsightsProps> = ({ property }) => {
  const aiInsights = [
    `Perfect ${property.property_type} with ${property.bedrooms} bedrooms in ${property.city}`,
    `Built in ${property.year_built}, this property offers modern living`,
    `Located in ${property.school_district || 'excellent school district'}`,
    `${property.square_feet?.toLocaleString()} sq ft of comfortable living space`
  ];

  return (
    <Card className="mb-6 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 animate-scale-in">
      <CardContent className="p-4">
        <div className="flex items-center mb-3">
          <Bot className="w-5 h-5 text-purple-600 mr-2" />
          <h3 className="font-semibold text-purple-800">AI Insights</h3>
        </div>
        <ul className="space-y-2">
          {aiInsights.map((insight, index) => (
            <li key={index} className="flex items-start animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <Sparkles className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-purple-700">{insight}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
