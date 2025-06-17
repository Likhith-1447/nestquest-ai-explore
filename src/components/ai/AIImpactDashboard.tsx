
import React, { useState, useEffect } from 'react';
import { Brain, Target, TrendingUp, Users, Zap, Award, CheckCircle, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export const AIImpactDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    // Simulate loading AI impact metrics
    setTimeout(() => {
      setMetrics({
        totalSearches: 1247,
        accuratePredictions: 94.2,
        userSatisfaction: 96.8,
        timeSaved: 18.5, // hours
        moneySaved: 45200, // dollars
        features: [
          { name: 'Smart Recommendations', usage: 89, impact: 'High', savings: '$12,300' },
          { name: 'Price Predictions', usage: 76, impact: 'Very High', savings: '$18,900' },
          { name: 'Investment Analysis', usage: 68, impact: 'High', savings: '$8,200' },
          { name: 'Neighborhood Insights', usage: 82, impact: 'Medium', savings: '$3,100' },
          { name: 'Environmental Impact', usage: 54, impact: 'Medium', savings: '$2,700' }
        ],
        successStories: [
          'Helped 234 families find their dream homes 40% faster',
          'Prevented $180k in overpriced property purchases',
          'Identified 89 high-growth investment opportunities',
          'Reduced environmental impact by 15% through smart choices'
        ],
        improvements: [
          { metric: 'Search Accuracy', improvement: '+23%', timeframe: 'vs last month' },
          { metric: 'User Engagement', improvement: '+45%', timeframe: 'vs baseline' },
          { metric: 'Decision Speed', improvement: '+67%', timeframe: 'vs traditional' },
          { metric: 'Satisfaction Score', improvement: '+31%', timeframe: 'vs industry avg' }
        ]
      });
    }, 1000);
  }, []);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Very High': return 'bg-green-100 text-green-800';
      case 'High': return 'bg-blue-100 text-blue-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!metrics) {
    return (
      <Card className="border-purple-200">
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading AI Impact Analytics...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Brain className="w-6 h-6 text-purple-600" />
            <CardTitle className="text-2xl text-purple-800">AI Impact Dashboard</CardTitle>
          </div>
          <p className="text-gray-600">Real-time analytics showing how AI is transforming your property search experience</p>
        </CardHeader>
      </Card>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="text-center">
          <CardContent className="p-6">
            <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-blue-600">{metrics.totalSearches.toLocaleString()}</div>
            <p className="text-sm text-gray-600">AI-Powered Searches</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-green-600">{metrics.accuratePredictions}%</div>
            <p className="text-sm text-gray-600">Prediction Accuracy</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-purple-600">{metrics.userSatisfaction}%</div>
            <p className="text-sm text-gray-600">User Satisfaction</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <Zap className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-yellow-600">{metrics.timeSaved}h</div>
            <p className="text-sm text-gray-600">Time Saved (Avg)</p>
          </CardContent>
        </Card>
      </div>

      {/* Feature Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
            AI Feature Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {metrics.features.map((feature: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{feature.name}</span>
                    <div className="flex items-center space-x-2">
                      <Badge className={getImpactColor(feature.impact)}>
                        {feature.impact} Impact
                      </Badge>
                      <span className="text-sm font-bold text-green-600">{feature.savings}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Progress value={feature.usage} className="flex-1 h-2" />
                    <span className="text-sm font-medium">{feature.usage}% adoption</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Success Stories */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center text-green-800">
            <Award className="w-5 h-5 mr-2 text-green-600" />
            AI Success Stories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {metrics.successStories.map((story: string, index: number) => (
              <div key={index} className="flex items-start p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-green-700">{story}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Improvements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
            Performance Improvements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {metrics.improvements.map((improvement: any, index: number) => (
              <div key={index} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">{improvement.metric}</span>
                  <span className="text-lg font-bold text-green-600">{improvement.improvement}</span>
                </div>
                <p className="text-sm text-gray-600">{improvement.timeframe}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Total Impact Summary */}
      <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <CardContent className="p-6 text-center">
          <h3 className="text-2xl font-bold mb-2">Total AI Impact</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="text-3xl font-bold">${metrics.moneySaved.toLocaleString()}</div>
              <p className="text-purple-100">Average Money Saved per User</p>
            </div>
            <div>
              <div className="text-3xl font-bold">{metrics.timeSaved}hrs</div>
              <p className="text-purple-100">Average Time Saved per Search</p>
            </div>
          </div>
          <p className="text-purple-100 mt-4">
            Our AI-powered features are revolutionizing how people search, analyze, and purchase real estate,
            making the process faster, smarter, and more profitable for everyone.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
