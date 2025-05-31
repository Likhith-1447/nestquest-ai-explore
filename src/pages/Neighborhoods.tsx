
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, TrendingUp, School, Coffee, ShoppingBag, Sparkles, ArrowLeft, Users, DollarSign, Car, Train } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const Neighborhoods = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const neighborhoods = [
    {
      id: 1,
      name: "Pacific Heights",
      city: "San Francisco, CA",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
      medianPrice: 2850000,
      walkScore: 88,
      transitScore: 72,
      bikeScore: 65,
      schools: 9.2,
      safety: 8.8,
      amenities: 9.5,
      priceChange: 5.2,
      demographics: "Young professionals, Families",
      highlights: ["Victorian architecture", "Upscale dining", "City views"],
      description: "Prestigious hilltop neighborhood known for its stunning Victorian and Edwardian mansions."
    },
    {
      id: 2,
      name: "SoHo",
      city: "New York, NY",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop",
      medianPrice: 1850000,
      walkScore: 95,
      transitScore: 100,
      bikeScore: 75,
      schools: 8.5,
      safety: 8.0,
      amenities: 9.8,
      priceChange: 3.1,
      demographics: "Artists, Creatives, Professionals",
      highlights: ["Cast-iron architecture", "Art galleries", "Designer shopping"],
      description: "Historic arts district with cobblestone streets and world-class shopping and dining."
    },
    {
      id: 3,
      name: "South End",
      city: "Austin, TX",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
      medianPrice: 685000,
      walkScore: 82,
      transitScore: 45,
      bikeScore: 88,
      schools: 8.2,
      safety: 8.5,
      amenities: 8.9,
      priceChange: 12.8,
      demographics: "Tech workers, Young families",
      highlights: ["Food trucks", "Live music", "Tech hub"],
      description: "Hip neighborhood with a thriving food scene and proximity to downtown Austin."
    },
    {
      id: 4,
      name: "Ballard",
      city: "Seattle, WA",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
      medianPrice: 925000,
      walkScore: 89,
      transitScore: 68,
      bikeScore: 82,
      schools: 8.8,
      safety: 8.7,
      amenities: 9.1,
      priceChange: 6.4,
      demographics: "Young professionals, Families",
      highlights: ["Waterfront access", "Craft breweries", "Farmers market"],
      description: "Maritime neighborhood with Scandinavian roots and a booming food and drink scene."
    },
    {
      id: 5,
      name: "Wynwood",
      city: "Miami, FL",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      medianPrice: 485000,
      walkScore: 76,
      transitScore: 42,
      bikeScore: 68,
      schools: 7.5,
      safety: 7.2,
      amenities: 8.7,
      priceChange: 15.3,
      demographics: "Artists, Young professionals",
      highlights: ["Street art", "Galleries", "Nightlife"],
      description: "Vibrant arts district famous for its colorful murals and creative community."
    },
    {
      id: 6,
      name: "Back Bay",
      city: "Boston, MA",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
      medianPrice: 1150000,
      walkScore: 94,
      transitScore: 90,
      bikeScore: 70,
      schools: 9.1,
      safety: 8.9,
      amenities: 9.3,
      priceChange: 4.7,
      demographics: "Students, Professionals, Families",
      highlights: ["Victorian brownstones", "Newbury Street", "Public Garden"],
      description: "Historic Victorian neighborhood with premier shopping and dining along Newbury Street."
    }
  ];

  const filteredNeighborhoods = neighborhoods.filter(neighborhood =>
    neighborhood.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    neighborhood.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getScoreColor = (score: number) => {
    if (score >= 8.5) return 'bg-green-100 text-green-700';
    if (score >= 7.0) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 gradient-ai rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  NestQuest AI
                </h1>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/search" className="text-gray-700 hover:text-purple-600 transition-colors">Search</Link>
              <Link to="/market-trends" className="text-gray-700 hover:text-purple-600 transition-colors">Market Trends</Link>
              <Link to="/agents" className="text-gray-700 hover:text-purple-600 transition-colors">Agents</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Explore Neighborhoods</h2>
          <p className="text-gray-600">Discover the perfect area for your lifestyle with AI-powered insights</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search neighborhoods or cities..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* AI Insights Banner */}
        <Card className="mb-8 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Sparkles className="w-6 h-6 text-purple-600 mr-3" />
              <h3 className="text-lg font-semibold text-purple-800">AI Neighborhood Insights</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/60 rounded-lg p-4">
                <h4 className="font-medium text-purple-700 mb-2">Trending Areas</h4>
                <p className="text-sm text-purple-600">
                  Wynwood and South End are seeing the highest growth in property values this quarter.
                </p>
              </div>
              <div className="bg-white/60 rounded-lg p-4">
                <h4 className="font-medium text-purple-700 mb-2">Best for Families</h4>
                <p className="text-sm text-purple-600">
                  Pacific Heights and Back Bay offer top-rated schools and family-friendly amenities.
                </p>
              </div>
              <div className="bg-white/60 rounded-lg p-4">
                <h4 className="font-medium text-purple-700 mb-2">Walkability Champions</h4>
                <p className="text-sm text-purple-600">
                  SoHo and Back Bay lead with 95+ walk scores for car-free living.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Neighborhoods Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredNeighborhoods.map((neighborhood) => (
            <Card key={neighborhood.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative">
                <img
                  src={neighborhood.image}
                  alt={neighborhood.name}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-3 right-3 bg-white text-purple-600">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +{neighborhood.priceChange}%
                </Badge>
              </div>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{neighborhood.name}</h3>
                    <p className="text-gray-600 flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {neighborhood.city}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-purple-600">
                      ${neighborhood.medianPrice.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Median Price</div>
                  </div>
                </div>

                <p className="text-gray-700 text-sm mb-4">{neighborhood.description}</p>

                {/* Scores */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center mb-1">
                      <Car className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="text-lg font-semibold">{neighborhood.walkScore}</div>
                    <div className="text-xs text-gray-600">Walk Score</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center mb-1">
                      <Train className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="text-lg font-semibold">{neighborhood.transitScore}</div>
                    <div className="text-xs text-gray-600">Transit</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center mb-1">
                      <School className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="text-lg font-semibold">{neighborhood.schools}</div>
                    <div className="text-xs text-gray-600">Schools</div>
                  </div>
                </div>

                {/* Quality Scores */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Safety</span>
                    <Badge className={getScoreColor(neighborhood.safety)}>
                      {neighborhood.safety}/10
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Amenities</span>
                    <Badge className={getScoreColor(neighborhood.amenities)}>
                      {neighborhood.amenities}/10
                    </Badge>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">Highlights</div>
                  <div className="flex flex-wrap gap-1">
                    {neighborhood.highlights.map((highlight, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Demographics */}
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-1">Demographics</div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-1" />
                    {neighborhood.demographics}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1 gradient-ai text-white">
                    View Properties
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="mt-12 gradient-ai text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Find Your Perfect Neighborhood</h3>
            <p className="text-purple-100 mb-6">
              Get personalized neighborhood recommendations based on your lifestyle preferences and budget.
            </p>
            <Button className="bg-white text-purple-600 hover:bg-gray-100">
              <Sparkles className="w-4 h-4 mr-2" />
              Take Lifestyle Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Neighborhoods;
