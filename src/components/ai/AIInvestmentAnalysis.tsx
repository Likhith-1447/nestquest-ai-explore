
import React, { useState } from 'react';
import { TrendingUp, DollarSign, Calendar, AlertTriangle, CheckCircle, Calculator } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { EnhancedProperty } from '@/hooks/usePropertyData';

interface AIInvestmentAnalysisProps {
  property: EnhancedProperty;
}

export const AIInvestmentAnalysis: React.FC<AIInvestmentAnalysisProps> = ({ property }) => {
  const [analysis, setAnalysis] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateAnalysis = () => {
    setIsLoading(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const currentValue = property.current_value || 0;
      const projectedGrowth = Math.random() * 15 + 5; // 5-20% growth
      const riskScore = Math.random() * 100;
      const roiScore = Math.random() * 100;
      
      setAnalysis({
        investmentScore: Math.floor(85 - (riskScore * 0.3) + (roiScore * 0.4)),
        projectedValue: Math.floor(currentValue * (1 + projectedGrowth / 100)),
        projectedGrowth,
        riskLevel: riskScore < 30 ? 'Low' : riskScore < 70 ? 'Medium' : 'High',
        riskScore,
        roiPotential: roiScore,
        keyFactors: [
          { factor: 'Location Score', score: Math.floor(Math.random() * 30 + 70), positive: true },
          { factor: 'Market Trends', score: Math.floor(Math.random() * 40 + 60), positive: true },
          { factor: 'Property Condition', score: Math.floor(Math.random() * 25 + 75), positive: true },
          { factor: 'Local Development', score: Math.floor(Math.random() * 35 + 65), positive: true }
        ],
        recommendations: [
          'Strong appreciation potential in this neighborhood',
          'Consider timing with local market cycles',
          'Excellent rental income potential',
          'Monitor interest rate trends before purchase'
        ]
      });
      setIsLoading(false);
    }, 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskColor = (risk: string) => {
    if (risk === 'Low') return 'bg-green-100 text-green-800';
    if (risk === 'Medium') return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <Card className="border-blue-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-blue-800">AI Investment Analysis</CardTitle>
          </div>
          <Button
            onClick={generateAnalysis}
            disabled={isLoading}
            className="gradient-ai text-white"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Analyzing...
              </>
            ) : (
              <>
                <Calculator className="w-4 h-4 mr-2" />
                Generate Analysis
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      
      {analysis && (
        <CardContent className="space-y-6">
          {/* Investment Score */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <div className={`text-3xl font-bold ${getScoreColor(analysis.investmentScore)}`}>
                {analysis.investmentScore}/100
              </div>
              <p className="text-sm text-gray-600">Investment Score</p>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                ${analysis.projectedValue?.toLocaleString()}
              </div>
              <p className="text-sm text-gray-600">5-Year Projection</p>
              <p className="text-xs text-green-600">+{analysis.projectedGrowth.toFixed(1)}%</p>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
              <Badge className={getRiskColor(analysis.riskLevel)}>
                {analysis.riskLevel} Risk
              </Badge>
              <p className="text-sm text-gray-600 mt-2">Risk Assessment</p>
            </div>
          </div>

          {/* Key Factors */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
              Investment Factors
            </h4>
            <div className="space-y-3">
              {analysis.keyFactors.map((factor: any, index: number) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">{factor.factor}</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={factor.score} className="w-20 h-2" />
                    <span className={`text-sm font-medium ${getScoreColor(factor.score)}`}>
                      {factor.score}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommendations */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2 text-yellow-600" />
              AI Recommendations
            </h4>
            <ul className="space-y-2">
              {analysis.recommendations.map((rec: string, index: number) => (
                <li key={index} className="flex items-start text-sm">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  {rec}
                </li>
              ))}
            </ul>
          </div>

          {/* ROI Metrics */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">ROI Potential</span>
              <span className={`font-bold ${getScoreColor(analysis.roiPotential)}`}>
                {analysis.roiPotential.toFixed(0)}%
              </span>
            </div>
            <Progress value={analysis.roiPotential} className="h-2" />
            <p className="text-xs text-gray-600 mt-2">
              Based on market trends, location factors, and property characteristics
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
