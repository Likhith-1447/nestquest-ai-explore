
import React, { useState } from 'react';
import { TrendingUp, Calculator, AlertCircle, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const PricePredictionTool: React.FC = () => {
  const [inputs, setInputs] = useState({
    bedrooms: '',
    bathrooms: '',
    sqft: '',
    location: '',
    propertyType: '',
    yearBuilt: ''
  });
  const [prediction, setPrediction] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generatePrediction = () => {
    if (!inputs.bedrooms || !inputs.bathrooms || !inputs.sqft || !inputs.location) {
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      const basePricePerSqft = Math.random() * 200 + 150; // $150-350 per sqft
      const sqft = parseInt(inputs.sqft);
      const estimatedPrice = basePricePerSqft * sqft;
      
      setPrediction({
        currentEstimate: Math.floor(estimatedPrice),
        priceRange: {
          low: Math.floor(estimatedPrice * 0.9),
          high: Math.floor(estimatedPrice * 1.1)
        },
        confidence: Math.floor(Math.random() * 15 + 85),
        marketFactors: [
          { factor: 'Location Premium', impact: '+$25,000', positive: true },
          { factor: 'Property Age', impact: '-$8,000', positive: false },
          { factor: 'Square Footage', impact: '+$45,000', positive: true },
          { factor: 'Market Conditions', impact: '+$12,000', positive: true }
        ],
        comparables: [
          { address: '123 Similar St', price: estimatedPrice * 0.95, sqft: sqft - 100 },
          { address: '456 Nearby Ave', price: estimatedPrice * 1.05, sqft: sqft + 150 },
          { address: '789 Close Rd', price: estimatedPrice * 0.98, sqft: sqft - 50 }
        ],
        futureProjections: {
          oneYear: Math.floor(estimatedPrice * 1.05),
          threeYear: Math.floor(estimatedPrice * 1.15),
          fiveYear: Math.floor(estimatedPrice * 1.25)
        }
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Card className="border-green-200">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Calculator className="w-5 h-5 text-green-600" />
          <CardTitle className="text-green-800">AI Price Prediction Tool</CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Input Form */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="bedrooms">Bedrooms</Label>
            <Input
              id="bedrooms"
              type="number"
              value={inputs.bedrooms}
              onChange={(e) => setInputs({...inputs, bedrooms: e.target.value})}
              placeholder="3"
            />
          </div>
          
          <div>
            <Label htmlFor="bathrooms">Bathrooms</Label>
            <Input
              id="bathrooms"
              type="number"
              step="0.5"
              value={inputs.bathrooms}
              onChange={(e) => setInputs({...inputs, bathrooms: e.target.value})}
              placeholder="2.5"
            />
          </div>
          
          <div>
            <Label htmlFor="sqft">Square Feet</Label>
            <Input
              id="sqft"
              type="number"
              value={inputs.sqft}
              onChange={(e) => setInputs({...inputs, sqft: e.target.value})}
              placeholder="2000"
            />
          </div>
          
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={inputs.location}
              onChange={(e) => setInputs({...inputs, location: e.target.value})}
              placeholder="City, State"
            />
          </div>
          
          <div>
            <Label htmlFor="propertyType">Property Type</Label>
            <Select value={inputs.propertyType} onValueChange={(value) => setInputs({...inputs, propertyType: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single-family">Single Family</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
                <SelectItem value="multi-family">Multi-Family</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="yearBuilt">Year Built</Label>
            <Input
              id="yearBuilt"
              type="number"
              value={inputs.yearBuilt}
              onChange={(e) => setInputs({...inputs, yearBuilt: e.target.value})}
              placeholder="2010"
            />
          </div>
        </div>

        <Button
          onClick={generatePrediction}
          disabled={isLoading || !inputs.bedrooms || !inputs.bathrooms || !inputs.sqft || !inputs.location}
          className="w-full gradient-ai text-white"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Calculating AI Prediction...
            </>
          ) : (
            <>
              <Target className="w-4 h-4 mr-2" />
              Generate Price Prediction
            </>
          )}
        </Button>

        {prediction && (
          <div className="space-y-6">
            {/* Main Prediction */}
            <div className="text-center p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">
                ${prediction.currentEstimate.toLocaleString()}
              </div>
              <p className="text-gray-600">Estimated Market Value</p>
              <p className="text-sm text-gray-500 mt-2">
                Range: ${prediction.priceRange.low.toLocaleString()} - ${prediction.priceRange.high.toLocaleString()}
              </p>
              <div className="flex items-center justify-center mt-2">
                <AlertCircle className="w-4 h-4 text-blue-600 mr-1" />
                <span className="text-sm text-blue-600">
                  {prediction.confidence}% Confidence
                </span>
              </div>
            </div>

            {/* Market Factors */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2 text-green-600" />
                Price Impact Factors
              </h4>
              <div className="space-y-2">
                {prediction.marketFactors.map((factor: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">{factor.factor}</span>
                    <span className={`text-sm font-medium ${factor.positive ? 'text-green-600' : 'text-red-600'}`}>
                      {factor.impact}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Comparable Properties */}
            <div>
              <h4 className="font-semibold mb-3">Recent Comparables</h4>
              <div className="space-y-2">
                {prediction.comparables.map((comp: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <span className="text-sm font-medium">{comp.address}</span>
                      <p className="text-xs text-gray-600">{comp.sqft.toLocaleString()} sq ft</p>
                    </div>
                    <span className="text-sm font-bold text-green-600">
                      ${comp.price.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Future Projections */}
            <div>
              <h4 className="font-semibold mb-3">Future Value Projections</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">
                    ${prediction.futureProjections.oneYear.toLocaleString()}
                  </div>
                  <p className="text-xs text-gray-600">1 Year</p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-lg font-bold text-purple-600">
                    ${prediction.futureProjections.threeYear.toLocaleString()}
                  </div>
                  <p className="text-xs text-gray-600">3 Years</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">
                    ${prediction.futureProjections.fiveYear.toLocaleString()}
                  </div>
                  <p className="text-xs text-gray-600">5 Years</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
