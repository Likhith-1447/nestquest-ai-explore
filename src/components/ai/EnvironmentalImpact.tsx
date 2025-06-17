
import React, { useState } from 'react';
import { Leaf, Zap, Droplets, Recycle, Sun, Wind } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { EnhancedProperty } from '@/hooks/usePropertyData';

interface EnvironmentalImpactProps {
  property: EnhancedProperty;
}

export const EnvironmentalImpact: React.FC<EnvironmentalImpactProps> = ({ property }) => {
  const [assessment, setAssessment] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateAssessment = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setAssessment({
        overallScore: Math.floor(Math.random() * 30 + 70),
        carbonFootprint: Math.floor(Math.random() * 5 + 8), // tons per year
        energyEfficiency: Math.floor(Math.random() * 25 + 75),
        waterEfficiency: Math.floor(Math.random() * 30 + 70),
        features: [
          { name: 'Solar Potential', score: Math.floor(Math.random() * 40 + 60), icon: Sun, available: true },
          { name: 'Energy Star Rating', score: Math.floor(Math.random() * 35 + 65), icon: Zap, available: true },
          { name: 'Water Conservation', score: Math.floor(Math.random() * 30 + 70), icon: Droplets, available: true },
          { name: 'Recycling Access', score: Math.floor(Math.random() * 25 + 75), icon: Recycle, available: true },
          { name: 'Wind Energy', score: Math.floor(Math.random() * 50 + 50), icon: Wind, available: false }
        ],
        improvements: [
          { improvement: 'Install Solar Panels', savings: '$1,200/year', impact: '-2.5 tons CO2' },
          { improvement: 'Smart Thermostat', savings: '$180/year', impact: '-0.8 tons CO2' },
          { improvement: 'LED Lighting', savings: '$120/year', impact: '-0.4 tons CO2' },
          { improvement: 'Energy-Efficient Windows', savings: '$300/year', impact: '-1.1 tons CO2' }
        ],
        nearbyGreen: [
          'EV Charging Station - 0.3 miles',
          'Recycling Center - 0.8 miles',
          'Public Transit Hub - 0.5 miles',
          'Bike Share Station - 0.2 miles',
          'Farmers Market - 1.2 miles'
        ],
        certifications: ['Energy Star Eligible', 'LEED Potential', 'Green Building Standards']
      });
      setIsLoading(false);
    }, 1800);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getImpactColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <Card className="border-green-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Leaf className="w-5 h-5 text-green-600" />
            <CardTitle className="text-green-800">Environmental Impact Assessment</CardTitle>
          </div>
          <Button
            onClick={generateAssessment}
            disabled={isLoading}
            className="gradient-earth text-white"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Analyzing...
              </>
            ) : (
              'Assess Impact'
            )}
          </Button>
        </div>
      </CardHeader>
      
      {assessment && (
        <CardContent className="space-y-6">
          {/* Overall Scores */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
              <div className={`text-3xl font-bold ${getScoreColor(assessment.overallScore)}`}>
                {assessment.overallScore}/100
              </div>
              <p className="text-sm text-gray-600">Eco Score</p>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {assessment.carbonFootprint} tons
              </div>
              <p className="text-sm text-gray-600">Annual CO2</p>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
              <div className={`text-2xl font-bold ${getScoreColor(assessment.energyEfficiency)}`}>
                {assessment.energyEfficiency}%
              </div>
              <p className="text-sm text-gray-600">Energy Efficient</p>
            </div>
          </div>

          {/* Environmental Features */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center">
              <Leaf className="w-4 h-4 mr-2 text-green-600" />
              Environmental Features
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {assessment.features.map((feature: any, index: number) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className={`p-3 rounded-lg border ${feature.available ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <IconComponent className={`w-4 h-4 ${feature.available ? 'text-green-600' : 'text-gray-400'}`} />
                        <span className="text-sm font-medium">{feature.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {feature.available && (
                          <>
                            <Progress value={feature.score} className="w-16 h-2" />
                            <span className={`text-xs font-bold ${getScoreColor(feature.score)}`}>
                              {feature.score}
                            </span>
                          </>
                        )}
                        <Badge variant={feature.available ? "default" : "secondary"}>
                          {feature.available ? "Available" : "N/A"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Improvement Opportunities */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center">
              <Zap className="w-4 h-4 mr-2 text-yellow-600" />
              Improvement Opportunities
            </h4>
            <div className="space-y-3">
              {assessment.improvements.map((improvement: any, index: number) => (
                <div key={index} className="p-3 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium">{improvement.improvement}</span>
                      <p className="text-xs text-gray-600">Environmental Impact: {improvement.impact}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-green-600">{improvement.savings}</span>
                      <p className="text-xs text-gray-600">Annual Savings</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nearby Green Infrastructure */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center">
              <Recycle className="w-4 h-4 mr-2 text-blue-600" />
              Nearby Green Infrastructure
            </h4>
            <ul className="space-y-2">
              {assessment.nearbyGreen.map((item: string, index: number) => (
                <li key={index} className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <h4 className="font-semibold mb-3">Green Certifications</h4>
            <div className="flex flex-wrap gap-2">
              {assessment.certifications.map((cert: string, index: number) => (
                <Badge key={index} className="bg-green-100 text-green-800">
                  {cert}
                </Badge>
              ))}
            </div>
          </div>

          {/* Impact Summary */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Environmental Impact Summary</h4>
            <p className="text-sm text-gray-700">
              This property has a <span className={getScoreColor(assessment.overallScore)}>
              {assessment.overallScore >= 80 ? 'excellent' : assessment.overallScore >= 60 ? 'good' : 'moderate'}
              </span> environmental profile. With recommended improvements, you could save up to 
              <span className="font-bold text-green-600"> $1,800/year</span> and reduce your carbon footprint by 
              <span className="font-bold text-green-600"> 4.8 tons CO2</span> annually.
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
