
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Star, Heart, Filter, Mic, Camera, Sparkles, Calendar, Users, Wifi, Car, Coffee, Mountain, Waves, TreePine, Building, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Mock data for properties
  const properties = [
    {
      id: 1,
      title: "Mountain Cabin with Stunning Views",
      location: "Aspen, Colorado",
      price: 180,
      rating: 4.9,
      reviews: 127,
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
      aiHighlight: "Perfect for remote work with high-speed Wi-Fi",
      tags: ["Mountain", "Wi-Fi", "Pet-friendly"],
      host: "Sarah"
    },
    {
      id: 2,
      title: "Beachfront Villa Paradise",
      location: "Malibu, California",
      price: 320,
      rating: 4.8,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1502780402662-acc01917610e?w=800&h=600&fit=crop",
      aiHighlight: "Exceptionally quiet after 8 PM",
      tags: ["Beach", "Pool", "Luxury"],
      host: "Marcus"
    },
    {
      id: 3,
      title: "Urban Loft in Arts District",
      location: "Brooklyn, New York",
      price: 125,
      rating: 4.7,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      aiHighlight: "Great for photographers with amazing lighting",
      tags: ["Urban", "Arts", "Trendy"],
      host: "Alex"
    },
    {
      id: 4,
      title: "Cozy Forest Retreat",
      location: "Portland, Oregon",
      price: 95,
      rating: 4.9,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1544967919-659d8ac8d0d8?w=800&h=600&fit=crop",
      aiHighlight: "Perfect for digital detox and meditation",
      tags: ["Forest", "Eco-friendly", "Quiet"],
      host: "Emma"
    }
  ];

  const filters = [
    { id: 'wifi', label: 'Wi-Fi', icon: Wifi },
    { id: 'parking', label: 'Parking', icon: Car },
    { id: 'breakfast', label: 'Breakfast', icon: Coffee },
    { id: 'mountain', label: 'Mountain', icon: Mountain },
    { id: 'beach', label: 'Beach', icon: Waves },
    { id: 'forest', label: 'Forest', icon: TreePine },
    { id: 'urban', label: 'Urban', icon: Building },
    { id: 'family', label: 'Family-friendly', icon: Home }
  ];

  const inspirationCategories = [
    { title: "Mountain Escapes", color: "from-green-600 to-blue-600", icon: Mountain },
    { title: "Beach Retreats", color: "from-blue-400 to-cyan-400", icon: Waves },
    { title: "City Adventures", color: "from-purple-600 to-pink-600", icon: Building },
    { title: "Forest Hideaways", color: "from-green-700 to-emerald-500", icon: TreePine }
  ];

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev =>
      prev.includes(filterId)
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-ai rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                NestQuest AI
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">Explore</a>
              <Link to="/host" className="text-gray-700 hover:text-purple-600 transition-colors">Host</Link>
              <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">Help</a>
              <Button variant="outline" size="sm">Sign In</Button>
              <Link to="/profile">
                <Button className="gradient-ai text-white" size="sm">Profile</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 text-shadow">
            Find Your Perfect
            <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
              NestQuest
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            AI-powered travel that understands exactly what you're looking for. 
            Discover unique places to stay, perfectly matched to your style.
          </p>

          {/* AI-Powered Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 p-2">
              <div className="flex items-center space-x-3">
                <div className="flex-1 flex items-center space-x-3 px-4">
                  <Search className="w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Try 'cozy cabins near skiing with pet-friendly options'"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-0 focus:ring-0 text-lg placeholder:text-gray-400"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="p-2">
                    <Mic className="w-5 h-5 text-gray-400" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-2">
                    <Camera className="w-5 h-5 text-gray-400" />
                  </Button>
                  <Link to="/search">
                    <Button className="gradient-ai text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity">
                      Search
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {filters.slice(0, 6).map((filter) => {
              const Icon = filter.icon;
              const isSelected = selectedFilters.includes(filter.id);
              return (
                <Button
                  key={filter.id}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleFilter(filter.id)}
                  className={`flex items-center space-x-2 rounded-full ${
                    isSelected ? 'gradient-ai text-white' : 'hover:bg-purple-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{filter.label}</span>
                </Button>
              );
            })}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="rounded-full"
            >
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>

          {/* Inspire Me Section */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Need inspiration?</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {inspirationCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <Card key={category.title} className="overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300">
                    <CardContent className="p-0">
                      <div className={`bg-gradient-to-br ${category.color} p-6 text-white text-center`}>
                        <Icon className="w-8 h-8 mx-auto mb-2" />
                        <h4 className="font-semibold">{category.title}</h4>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Personalized for You
            </h2>
            <Link to="/search">
              <Button variant="outline" className="hidden md:flex">
                View All
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {properties.map((property) => (
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
                  <Badge className="absolute bottom-3 left-3 bg-purple-600 text-white">
                    <Sparkles className="w-3 h-3 mr-1" />
                    AI Match
                  </Badge>
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
                      {property.aiHighlight}
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
                        Instant Book
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features Showcase */}
      <section className="py-24 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powered by Advanced AI
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our intelligent platform learns your preferences and delivers personalized recommendations 
              that feel like they were curated just for you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 gradient-ai rounded-2xl flex items-center justify-center mx-auto mb-4 animate-float">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Search</h3>
              <p className="text-gray-600">
                Natural language understanding that knows exactly what you mean, 
                even with complex requests.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 gradient-trust rounded-2xl flex items-center justify-center mx-auto mb-4 animate-float" style={{animationDelay: '2s'}}>
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Personalized Matches</h3>
              <p className="text-gray-600">
                AI algorithms that learn from your preferences and behavior 
                to surface the perfect properties.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 gradient-earth rounded-2xl flex items-center justify-center mx-auto mb-4 animate-float" style={{animationDelay: '4s'}}>
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Dynamic Pricing</h3>
              <p className="text-gray-600">
                Real-time pricing optimization based on demand, events, 
                and market conditions for the best deals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 gradient-ai rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">NestQuest AI</h3>
              </div>
              <p className="text-gray-400 mb-4">
                The future of travel is here. Discover your perfect stay with the power of AI.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Explore</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Destinations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Featured Homes</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AI Recommendations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Host</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">List Your Property</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Host Resources</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AI Pricing Tools</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 NestQuest AI. All rights reserved. Built with ❤️ and AI.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
