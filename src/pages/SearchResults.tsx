
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MapPin, Star, Heart, Sparkles, SlidersHorizontal, Bot, Map, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { useAISearch } from '@/hooks/useAISearch';
import { Alert, AlertDescription } from '@/components/ui/alert';

const SearchResults = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([50, 300]);
  const [sortBy, setSortBy] = useState('ai-recommended');
  const [searchQuery, setSearchQuery] = useState('Mountain cabins in Colorado');
  
  const { searchWithAI, aiInsights, isLoading: aiLoading, error: aiError } = useAISearch();

  const searchResults = [
    {
      id: 1,
      title: "Mountain Cabin with Stunning Views",
      location: "Aspen, Colorado",
      price: 180,
      rating: 4.9,
      reviews: 127,
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
      aiMatch: 95,
      aiHighlight: "Perfect for remote work with high-speed Wi-Fi",
      tags: ["Mountain", "Wi-Fi", "Pet-friendly"],
      instant: true
    },
    {
      id: 2,
      title: "Beachfront Villa Paradise",
      location: "Malibu, California",
      price: 320,
      rating: 4.8,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1502780402662-acc01917610e?w=400&h=300&fit=crop",
      aiMatch: 88,
      aiHighlight: "Exceptionally quiet after 8 PM",
      tags: ["Beach", "Pool", "Luxury"],
      instant: true
    },
    {
      id: 3,
      title: "Urban Loft in Arts District",
      location: "Brooklyn, New York",
      price: 125,
      rating: 4.7,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      aiMatch: 82,
      aiHighlight: "Great for photographers with amazing lighting",
      tags: ["Urban", "Arts", "Trendy"],
      instant: false
    },
    {
      id: 4,
      title: "Cozy Forest Retreat",
      location: "Portland, Oregon",
      price: 95,
      rating: 4.9,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1544967919-659d8ac8d0d8?w=400&h=300&fit=crop",
      aiMatch: 91,
      aiHighlight: "Perfect for digital detox and meditation",
      tags: ["Forest", "Eco-friendly", "Quiet"],
      instant: true
    }
  ];

  const filters = {
    propertyType: ['Entire place', 'Private room', 'Shared room'],
    amenities: ['Wi-Fi', 'Kitchen', 'Parking', 'Pool', 'Pet-friendly', 'Hot tub'],
    instantBook: true
  };

  // Trigger AI search when component mounts
  useEffect(() => {
    searchWithAI(searchQuery, searchResults, 'vacation_rental');
  }, []);

  const handleAIRefresh = () => {
    searchWithAI(searchQuery, searchResults, 'vacation_rental');
  };

  const getAIRecommendationForProperty = (propertyId: number) => {
    return aiInsights?.recommendations?.find(rec => rec.property_id === propertyId.toString());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-ai rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                NestQuest AI
              </h1>
            </Link>
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search destinations, properties..."
                  className="pl-10 pr-4"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Map className="w-4 h-4 mr-2" />
                Map
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search Summary & Filters */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">12 stays found</h2>
            <p className="text-gray-600">{searchQuery}</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
            </Button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border rounded-md bg-white"
            >
              <option value="ai-recommended">AI Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-80 flex-shrink-0">
              <Card className="sticky top-24">
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Price Range</h3>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={500}
                      min={0}
                      step={10}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Property Type</h3>
                    <div className="space-y-2">
                      {filters.propertyType.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox id={type} />
                          <label htmlFor={type} className="text-sm">{type}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Amenities</h3>
                    <div className="space-y-2">
                      {filters.amenities.map((amenity) => (
                        <div key={amenity} className="flex items-center space-x-2">
                          <Checkbox id={amenity} />
                          <label htmlFor={amenity} className="text-sm">{amenity}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="instant" defaultChecked />
                      <label htmlFor="instant" className="text-sm font-medium">Instant Book</label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Results Grid */}
          <div className="flex-1">
            {/* AI Insights Banner */}
            <Card className="mb-6 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Bot className="w-5 h-5 text-purple-600 mr-2" />
                    <h3 className="font-semibold text-purple-800">AI Search Insights</h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleAIRefresh}
                    disabled={aiLoading}
                    className="text-purple-600"
                  >
                    <RefreshCw className={`w-4 h-4 ${aiLoading ? 'animate-spin' : ''}`} />
                  </Button>
                </div>
                
                {aiLoading && (
                  <p className="text-purple-700 text-sm">AI is analyzing your search...</p>
                )}
                
                {aiError && (
                  <Alert className="mb-3">
                    <AlertDescription className="text-red-700">
                      {aiError}
                    </AlertDescription>
                  </Alert>
                )}
                
                {aiInsights && !aiLoading && (
                  <div className="space-y-2">
                    <p className="text-purple-700 text-sm">{aiInsights.insight}</p>
                    {aiInsights.market_analysis && (
                      <p className="text-purple-600 text-xs">{aiInsights.market_analysis}</p>
                    )}
                  </div>
                )}
                
                {!aiInsights && !aiLoading && !aiError && (
                  <p className="text-purple-700 text-sm">
                    Based on your preferences, we found mountain properties with excellent Wi-Fi ratings. 
                    Peak season pricing is 23% higher than average for these dates.
                  </p>
                )}
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {searchResults.map((property) => {
                const aiRecommendation = getAIRecommendationForProperty(property.id);
                return (
                  <Card key={property.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer">
                    <div className="relative">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm hover:bg-white"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                      <div className="absolute top-3 left-3 flex space-x-2">
                        <Badge className="bg-purple-600 text-white">
                          <Sparkles className="w-3 h-3 mr-1" />
                          {aiRecommendation?.score || property.aiMatch}% Match
                        </Badge>
                        {property.instant && (
                          <Badge variant="secondary" className="bg-green-600 text-white">
                            Instant Book
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 line-clamp-1">{property.title}</h3>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{property.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-3 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {property.location}
                      </p>
                      <div className="bg-blue-50 rounded-lg p-2 mb-3">
                        <p className="text-xs text-blue-700 font-medium">
                          <Sparkles className="w-3 h-3 inline mr-1" />
                          {aiRecommendation?.reason || property.aiHighlight}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {property.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-gray-900">${property.price}</span>
                          <span className="text-gray-600 text-sm"> / night</span>
                        </div>
                        <Link to={`/property/${property.id}`}>
                          <Button size="sm" className="gradient-ai text-white">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* AI Tips Section */}
            {aiInsights?.search_tips && (
              <Card className="mt-6 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardContent className="p-4">
                  <div className="flex items-center mb-2">
                    <Sparkles className="w-5 h-5 text-blue-600 mr-2" />
                    <h3 className="font-semibold text-blue-800">AI Search Tips</h3>
                  </div>
                  <p className="text-blue-700 text-sm">{aiInsights.search_tips}</p>
                </CardContent>
              </Card>
            )}

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                Load More Results
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
