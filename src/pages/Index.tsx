
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Sparkles, MapPin, TrendingUp, Shield, Users, ArrowRight, Home, Building, DollarSign, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Search",
      description: "Get intelligent property recommendations based on your preferences and lifestyle needs."
    },
    {
      icon: TrendingUp,
      title: "Market Analytics",
      description: "Real-time market trends and property value predictions powered by advanced data analysis."
    },
    {
      icon: Shield,
      title: "Verified Properties",
      description: "All listings are verified with accurate information and professional photography."
    },
    {
      icon: Users,
      title: "Expert Network",
      description: "Connect with top-rated real estate professionals and local market experts."
    }
  ];

  const stats = [
    { icon: Home, value: "50K+", label: "Properties Listed" },
    { icon: Users, value: "25K+", label: "Happy Clients" },
    { icon: Building, value: "500+", label: "Cities Covered" },
    { icon: Star, value: "4.9", label: "Average Rating" }
  ];

  const featuredProperties = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
      title: "Modern Family Home",
      location: "San Francisco, CA",
      price: 1250000,
      beds: 4,
      baths: 3,
      sqft: 2800,
      aiMatch: 95
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
      title: "Luxury Downtown Condo",
      location: "New York, NY",
      price: 850000,
      beds: 2,
      baths: 2,
      sqft: 1200,
      aiMatch: 88
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop",
      title: "Suburban Paradise",
      location: "Austin, TX",
      price: 550000,
      beds: 3,
      baths: 2.5,
      sqft: 2200,
      aiMatch: 92
    }
  ];

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
              <Link to="/search" className="text-gray-700 hover:text-purple-600 transition-colors">Search</Link>
              <Link to="/market-trends" className="text-gray-700 hover:text-purple-600 transition-colors">Market Trends</Link>
              <Link to="/neighborhoods" className="text-gray-700 hover:text-purple-600 transition-colors">Neighborhoods</Link>
              <Link to="/agents" className="text-gray-700 hover:text-purple-600 transition-colors">Agents</Link>
              <Link to="/mortgage-calculator" className="text-gray-700 hover:text-purple-600 transition-colors">Calculator</Link>
            </nav>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">Sign In</Button>
              <Button size="sm" className="gradient-ai text-white">Get Started</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100/30 to-blue-100/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Find Your Perfect Home with{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                AI Intelligence
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover properties that match your lifestyle with our advanced AI-powered search engine. 
              Get personalized recommendations and market insights to make informed decisions.
            </p>
            
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search by location, property type, or describe your ideal home..."
                  className="pl-12 pr-4 py-4 text-lg border-2 border-purple-200 focus:border-purple-500 rounded-xl"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button 
                  type="submit"
                  className="absolute right-2 top-2 gradient-ai text-white"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Search with AI
                </Button>
              </div>
            </form>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6 bg-white/60 backdrop-blur-sm border-purple-100">
                <CardContent className="p-0">
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-purple-600" />
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Featured Properties</h3>
            <p className="text-gray-600">Handpicked homes that match most buyers' preferences</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {featuredProperties.map((property) => (
              <Card key={property.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-purple-600 text-white">
                    <Sparkles className="w-3 h-3 mr-1" />
                    {property.aiMatch}% Match
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h4 className="font-semibold text-lg mb-2">{property.title}</h4>
                  <p className="text-gray-600 text-sm mb-3 flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {property.location}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-purple-600">
                      ${property.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <span>{property.beds} beds</span>
                    <span>{property.baths} baths</span>
                    <span>{property.sqft.toLocaleString()} sqft</span>
                  </div>
                  <Link to={`/property/${property.id}`}>
                    <Button className="w-full gradient-ai text-white">
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/search">
              <Button variant="outline" size="lg">
                View All Properties
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose NestQuest AI?</h3>
            <p className="text-gray-600">Experience the future of property search with intelligent technology</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow bg-white/80 backdrop-blur-sm">
                <CardContent className="p-0">
                  <div className="w-12 h-12 gradient-ai rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-lg mb-3">{feature.title}</h4>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Find Your Dream Home?
          </h3>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of satisfied customers who found their perfect home with NestQuest AI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/search">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                Start Your Search
                <Sparkles className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 gradient-ai rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-xl font-bold">NestQuest AI</h4>
              </div>
              <p className="text-gray-400">
                The future of property search, powered by artificial intelligence.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Platform</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/search" className="hover:text-white">Search Properties</Link></li>
                <li><Link to="/market-trends" className="hover:text-white">Market Trends</Link></li>
                <li><Link to="/neighborhoods" className="hover:text-white">Neighborhoods</Link></li>
                <li><Link to="/agents" className="hover:text-white">Find Agents</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Resources</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/mortgage-calculator" className="hover:text-white">Mortgage Calculator</Link></li>
                <li><a href="#" className="hover:text-white">Buying Guide</a></li>
                <li><a href="#" className="hover:text-white">Selling Guide</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 NestQuest AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
