
import React from 'react';
import { Bot, RefreshCw, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AIInsightsBannerProps {
  insights: {
    insight: string;
    market_analysis?: string;
    search_tips?: string;
  } | null;
  isLoading: boolean;
  error: string | null;
  onRefresh: () => void;
}

export const AIInsightsBanner: React.FC<AIInsightsBannerProps> = ({
  insights,
  isLoading,
  error,
  onRefresh
}) => {
  return (
    <Card className="mb-6 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Bot className="w-5 h-5 text-purple-600 mr-2" />
            <h3 className="font-semibold text-purple-800">AI Property Insights</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRefresh}
            disabled={isLoading}
            className="text-purple-600"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        
        {isLoading && (
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" />
            <p className="text-purple-700 text-sm">AI is analyzing your property search...</p>
          </div>
        )}
        
        {error && (
          <Alert className="mb-3">
            <AlertDescription className="text-red-700">
              {error}
            </AlertDescription>
          </Alert>
        )}
        
        {insights && !isLoading && (
          <div className="space-y-2">
            <p className="text-purple-700 text-sm font-medium">{insights.insight}</p>
            {insights.market_analysis && (
              <p className="text-purple-600 text-xs">{insights.market_analysis}</p>
            )}
            {insights.search_tips && (
              <div className="mt-2 p-2 bg-blue-100 rounded-lg">
                <p className="text-blue-700 text-xs">
                  <Sparkles className="w-3 h-3 inline mr-1" />
                  <strong>Tip:</strong> {insights.search_tips}
                </p>
              </div>
            )}
          </div>
        )}
        
        {!insights && !isLoading && !error && (
          <p className="text-purple-700 text-sm">
            Click refresh to get AI insights for your property search.
          </p>
        )}
      </CardContent>
    </Card>
  );
};
