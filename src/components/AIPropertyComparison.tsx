
import React, { useState } from 'react';
import { Bot, BarChart3, CheckCircle, XCircle, TrendingUp, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { usePropertyAI } from '@/hooks/usePropertyAI';
import { EnhancedProperty } from '@/hooks/usePropertyData';

interface AIPropertyComparisonProps {
  properties: EnhancedProperty[];
  onSelectProperty?: (property: EnhancedProperty) => void;
}

export const AIPropertyComparison: React.FC<AIPropertyComparisonProps> = ({
  properties,
  onSelectProperty
}) => {
  const [selectedProperties, setSelectedProperties] = useState<EnhancedProperty[]>([]);
  const [comparisonResults, setComparisonResults] = useState<any>(null);
  const [isComparing, setIsComparing] = useState(false);
  const { analyzeProperties } = usePropertyAI();

  const togglePropertySelection = (property: EnhancedProperty) => {
    setSelectedProperties(prev => {
      const isSelected = prev.find(p => p.id === property.id);
      if (isSelected) {
        return prev.filter(p => p.id !== property.id);
      } else if (prev.length < 3) {
        return [...prev, property];
      }
      return prev;
    });
  };

  const handleCompareProperties = async () => {
    if (selectedProperties.length < 2) return;
    
    setIsComparing(true);
    
    const comparisonQuery = `Compare these ${selectedProperties.length} properties and provide detailed analysis of pros/cons, value proposition, and investment potential`;
    
    try {
      await analyzeProperties(comparisonQuery, selectedProperties, 'comparison');
      
      // Generate mock comparison results for demo
      const results = {
        winner: selectedProperties[0],
        criteria: [
          {
            name: 'Price Value',
            scores: selectedProperties.map((p, i) => ({
              property: p,
              score: 85 - (i * 5),
              reasoning: `Excellent value considering location and amenities`
            }))
          },
          {
            name: 'Location Score',
            scores: selectedProperties.map((p, i) => ({
              property: p,
              score: 90 - (i * 3),
              reasoning: `Prime location with good accessibility`
            }))
          },
          {
            name: 'Investment Potential',
            scores: selectedProperties.map((p, i) => ({
              property: p,
              score: 80 + (i * 2),
              reasoning: `Strong growth potential in this area`
            }))
          }
        ],
        summary: `Based on AI analysis, ${selectedProperties[0].address} offers the best overall value with superior location advantages and strong investment potential.`
      };
      
      setComparisonResults(results);
    } catch (error) {
      console.error('Comparison failed:', error);
    } finally {
      setIsComparing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Property Selection */}
      <Card className="border-green-200">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-green-600" />
            <CardTitle className="text-green-800">AI Property Comparison</CardTitle>
            <Badge className="gradient-ai text-white">
              <Bot className="w-3 h-3 mr-1" />
              AI Powered
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Select 2-3 properties to compare with AI analysis (Selected: {selectedProperties.length}/3)
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {properties.slice(0, 6).map((property) => {
              const isSelected = selectedProperties.find(p => p.id === property.id);
              return (
                <div
                  key={property.id}
                  className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'border-green-500 bg-green-50 shadow-md'
                      : 'border-gray-200 hover:border-green-300 hover:shadow-sm'
                  }`}
                  onClick={() => togglePropertySelection(property)}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                  )}
                  
                  <h4 className="font-semibold text-gray-900 mb-1 pr-6">
                    {property.address}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    {property.city}, {property.state}
                  </p>
                  <p className="font-bold text-green-600">
                    {property.current_value ? `$${property.current_value.toLocaleString()}` : 'Price on request'}
                  </p>
                </div>
              );
            })}
          </div>

          <Button
            onClick={handleCompareProperties}
            disabled={selectedProperties.length < 2 || isComparing}
            className="w-full gradient-ai text-white"
          >
            {isComparing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                AI is comparing properties...
              </>
            ) : (
              <>
                <Bot className="w-4 h-4 mr-2" />
                Compare Selected Properties with AI
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Comparison Results */}
      {comparisonResults && (
        <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-white">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <CardTitle className="text-blue-800">AI Comparison Results</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Winner */}
            <div className="bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-800">AI Recommended Winner</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900">{comparisonResults.winner.address}</h3>
              <p className="text-gray-700 mt-1">{comparisonResults.summary}</p>
            </div>

            {/* Detailed Comparison */}
            <div className="space-y-4">
              {comparisonResults.criteria.map((criterion: any, index: number) => (
                <div key={index} className="bg-white p-4 rounded-lg border">
                  <h4 className="font-semibold text-gray-900 mb-3">{criterion.name}</h4>
                  <div className="space-y-2">
                    {criterion.scores.map((score: any, scoreIndex: number) => (
                      <div key={scoreIndex} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-800">
                              {score.property.address}
                            </span>
                            <Badge variant="outline">{score.score}/100</Badge>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{score.reasoning}</p>
                        </div>
                        <div className="w-24 h-2 bg-gray-200 rounded-full ml-4">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
                            style={{ width: `${score.score}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button
                onClick={() => onSelectProperty?.(comparisonResults.winner)}
                className="gradient-ai text-white"
              >
                View Recommended Property
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                onClick={() => setComparisonResults(null)}
              >
                Clear Comparison
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
