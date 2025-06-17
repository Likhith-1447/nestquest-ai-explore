
import React, { useState, useEffect } from 'react';
import { Brain, Star, TrendingUp, MapPin, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { EnhancedProperty } from '@/hooks/usePropertyData';

interface SmartRecommendationEngineProps {
  properties: EnhancedProperty[];
  onSelectProperty: (property: EnhancedProperty) => void;
}

export const SmartRecommendationEngine: React.FC<SmartRecommendationEngineProps> = ({
  properties,
  onSelectProperty
}) => {
  const [preferences, setPreferences] = useState({
    maxBudget: [500000],
    minBedrooms: [2],
    lifestyle: '',
    priorities: [] as string[]
  });
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const lifestyleOptions = [
    'Young Professional',
    'Growing Family',
    'Empty Nester',
    'First-Time Buyer',
    'Investor',
    'Retiree'
  ];

  const priorityOptions = [
    'Good Schools',
    'Low Commute',
    'Investment Potential',
    'Safety',
    'Walkability',
    'Nightlife',
    'Nature Access',
    'Shopping'
  ];

  const generateRecommendations = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const scored = properties.slice(0, 5).map(property => {
        let score = Math.random() * 40 + 60; // Base score 60-100
        
        // Adjust based on budget
        if (property.current_value && property.current_value <= preferences.maxBudget[0]) {
          score += 10;
        }
        
        // Adjust based on bedrooms
        if (property.bedrooms && property.bedrooms >= preferences.minBedrooms[0]) {
          score += 8;
        }
        
        // Lifestyle adjustments
        if (preferences.lifestyle === 'Young Professional') {
          score += Math.random() * 15;
        } else if (preferences.lifestyle === 'Growing Family') {
          score += Math.random() * 12;
        }
        
        return {
          property,
          score: Math.min(100, Math.floor(score)),
          reasons: generateReasons(property, preferences),
          matchFactors: generateMatchFactors()
        };
      }).sort((a, b) => b.score - a.score);
      
      setRecommendations(scored);
      setIsAnalyzing(false);
    }, 2000);
  };

  const generateReasons = (property: EnhancedProperty, prefs: any) => {
    const reasons = [];
    if (property.current_value && property.current_value <= prefs.maxBudget[0]) {
      reasons.push('Within your budget range');
    }
    if (property.bedrooms && property.bedrooms >= prefs.minBedrooms[0]) {
      reasons.push('Meets bedroom requirements');
    }
    if (prefs.lifestyle === 'Young Professional') {
      reasons.push('Great for professionals');
    }
    if (prefs.priorities.includes('Investment Potential')) {
      reasons.push('Strong investment opportunity');
    }
    return reasons.slice(0, 3);
  };

  const generateMatchFactors = () => {
    return [
      { factor: 'Location Match', score: Math.floor(Math.random() * 25 + 75) },
      { factor: 'Price Value', score: Math.floor(Math.random() * 30 + 70) },
      { factor: 'Lifestyle Fit', score: Math.floor(Math.random() * 20 + 80) },
      { factor: 'Future Growth', score: Math.floor(Math.random() * 35 + 65) }
    ];
  };

  const togglePriority = (priority: string) => {
    setPreferences(prev => ({
      ...prev,
      priorities: prev.priorities.includes(priority)
        ? prev.priorities.filter(p => p !== priority)
        : [...prev.priorities, priority]
    }));
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-gray-600';
  };

  return (
    <Card className="border-indigo-200">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-indigo-600" />
          <CardTitle className="text-indigo-800">Smart AI Recommendation Engine</CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Preferences Input */}
        <div className="space-y-4">
          <div>
            <Label>Maximum Budget: ${preferences.maxBudget[0].toLocaleString()}</Label>
            <Slider
              value={preferences.maxBudget}
              onValueChange={(value) => setPreferences({...preferences, maxBudget: value})}
              max={1000000}
              min={100000}
              step={25000}
              className="mt-2"
            />
          </div>
          
          <div>
            <Label>Minimum Bedrooms: {preferences.minBedrooms[0]}</Label>
            <Slider
              value={preferences.minBedrooms}
              onValueChange={(value) => setPreferences({...preferences, minBedrooms: value})}
              max={6}
              min={1}
              step={1}
              className="mt-2"
            />
          </div>
          
          <div>
            <Label>Lifestyle</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {lifestyleOptions.map(lifestyle => (
                <Button
                  key={lifestyle}
                  variant={preferences.lifestyle === lifestyle ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPreferences({...preferences, lifestyle})}
                >
                  {lifestyle}
                </Button>
              ))}
            </div>
          </div>
          
          <div>
            <Label>Priorities (Select multiple)</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {priorityOptions.map(priority => (
                <Button
                  key={priority}
                  variant={preferences.priorities.includes(priority) ? "default" : "outline"}
                  size="sm"
                  onClick={() => togglePriority(priority)}
                >
                  {priority}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <Button
          onClick={generateRecommendations}
          disabled={isAnalyzing}
          className="w-full gradient-ai text-white"
        >
          {isAnalyzing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              AI is analyzing your preferences...
            </>
          ) : (
            <>
              <Brain className="w-4 h-4 mr-2" />
              Generate Smart Recommendations
            </>
          )}
        </Button>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-semibold flex items-center">
              <Star className="w-4 h-4 mr-2 text-yellow-600" />
              Your Personalized Recommendations
            </h4>
            
            {recommendations.map((rec, index) => (
              <div key={rec.property.id} className="p-4 border-2 border-indigo-200 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <Badge className="gradient-ai text-white">
                        #{index + 1} Match
                      </Badge>
                      <span className={`font-bold text-2xl ${getScoreColor(rec.score)}`}>
                        {rec.score}%
                      </span>
                    </div>
                    <h5 className="font-semibold text-lg">{rec.property.address}</h5>
                    <p className="text-sm text-gray-600 flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {rec.property.city}, {rec.property.state}
                    </p>
                    <p className="text-lg font-bold text-green-600">
                      {rec.property.current_value ? `$${rec.property.current_value.toLocaleString()}` : 'Price on request'}
                    </p>
                  </div>
                  <Button
                    onClick={() => onSelectProperty(rec.property)}
                    className="gradient-ai text-white"
                  >
                    View Details
                  </Button>
                </div>
                
                {/* Match Reasons */}
                <div className="mb-3">
                  <p className="text-sm font-medium mb-2">Why this property matches you:</p>
                  <ul className="text-sm space-y-1">
                    {rec.reasons.map((reason: string, idx: number) => (
                      <li key={idx} className="flex items-center">
                        <Heart className="w-3 h-3 mr-2 text-red-500" />
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Match Factors */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {rec.matchFactors.map((factor: any, idx: number) => (
                    <div key={idx} className="text-center p-2 bg-white rounded">
                      <div className={`text-sm font-bold ${getScoreColor(factor.score)}`}>
                        {factor.score}%
                      </div>
                      <p className="text-xs text-gray-600">{factor.factor}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
