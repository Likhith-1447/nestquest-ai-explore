
import React, { useState } from 'react';
import { Search, Sparkles, Bot, TrendingUp, MapPin, Home, Users, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
import { AIAssistant } from '@/components/AIAssistant';
import { UserMenu } from '@/components/auth/UserMenu';
import { AuthPage } from '@/components/auth/AuthPage';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const featuredSearches = [
    'Luxury homes with pools',
    'Mountain cabins in Colorado', 
    'Downtown condos',
    'Family homes with good schools',
    'Investment properties',
    'Waterfront properties'
  ];

  const aiFeatures = [
    {
      icon: Bot,
      title: 'AI Property Assistant',
      description: 'Chat with our AI to get personalized property recommendations and market insights.',
      color: 'from-purple-600 to-blue-600'
    },
    {
      icon: TrendingUp,
      title: 'Smart Market Analysis',
      description: 'Get AI-powered market trends, pricing insights, and investment potential analysis.',
      color: 'from-blue-600 to-green-600'
    },
    {
      icon: MapPin,
      title: 'Location Intelligence',
      description: 'Discover neighborhood insights, school ratings, and local amenities with AI.',
      color: 'from-green-600 to-teal-600'
    }
  ];

  return (
    <>
      <SignedOut>
        <AuthPage />
      </SignedOut>
      
      <SignedIn>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
          {/* Header */}
          <header className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              {/* User Menu in top right */}
              <div className="absolute top-4 right-4">
                <UserMenu />
              </div>

              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 gradient-ai rounded-xl flex items-center justify-center animate-scale-in">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      NestQuest AI
                    </h1>
                    <p className="text-gray-600">Your AI-Powered Real Estate Journey</p>
                  </div>
                </div>
              </div>

              <div className="text-center mb-12">
                <h2 className="text-5xl font-bold text-gray-900 mb-4 animate-fade-in">
                  Find Your Perfect Home with
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> AI Intelligence</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in">
                  Experience the future of real estate with our advanced AI assistant. Get personalized recommendations, 
                  market insights, and smart property comparisons.
                </p>
              </div>

              {/* Enhanced Search */}
              <div className="max-w-2xl mx-auto mb-8 animate-scale-in">
                <div className="relative">
                  <div className="flex space-x-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type="text"
                        placeholder="Try 'luxury homes with pools' or 'family homes near schools'"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 focus:border-purple-500 rounded-xl shadow-lg"
                      />
                    </div>
                    <Button 
                      onClick={handleSearch}
                      className="px-8 py-4 gradient-ai text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                    >
                      <Bot className="w-5 h-5 mr-2" />
                      AI Search
                    </Button>
                  </div>
                </div>
                
                {/* Quick Search Options */}
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-3">Popular AI searches:</p>
                  <div className="flex flex-wrap gap-2">
                    {featuredSearches.map((search, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => setSearchQuery(search)}
                        className="text-sm hover:bg-purple-50 hover:border-purple-300 transition-colors duration-200 animate-fade-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <Sparkles className="w-3 h-3 mr-1" />
                        {search}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* AI Features Section */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <Badge className="gradient-ai text-white text-sm px-4 py-2 mb-4">
                  <Bot className="w-4 h-4 mr-2" />
                  Powered by Advanced AI
                </Badge>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Revolutionary AI Features
                </h3>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Our cutting-edge AI technology transforms how you search, analyze, and choose properties.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {aiFeatures.map((feature, index) => (
                  <Card 
                    key={index} 
                    className="border-2 border-gray-100 hover:border-purple-200 transition-all duration-300 hover:shadow-xl group animate-fade-in"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <CardContent className="p-8 text-center">
                      <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
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
                Ready to Experience AI-Powered Real Estate?
              </h3>
              <p className="text-xl text-purple-100 mb-8">
                Start your journey with personalized recommendations and smart insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-purple-600 hover:bg-gray-50 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  onClick={() => navigate('/search')}
                >
                  <Bot className="w-5 h-5 mr-2" />
                  Start AI Search
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  variant="outline"
                  size="lg" 
                  className="border-2 border-white text-white hover:bg-white hover:text-purple-600 font-semibold px-8 py-4 rounded-xl transition-all duration-200"
                  onClick={() => navigate('/market-trends')}
                >
                  <TrendingUp className="w-5 h-5 mr-2" />
                  View Market Trends
                </Button>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="py-12 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div className="animate-scale-in">
                  <div className="text-3xl font-bold text-purple-600 mb-2">10,000+</div>
                  <div className="text-gray-600">Properties Analyzed</div>
                </div>
                <div className="animate-scale-in" style={{ animationDelay: '100ms' }}>
                  <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
                  <div className="text-gray-600">AI Accuracy Rate</div>
                </div>
                <div className="animate-scale-in" style={{ animationDelay: '200ms' }}>
                  <div className="text-3xl font-bold text-green-600 mb-2">2,500+</div>
                  <div className="text-gray-600">Happy Customers</div>
                </div>
                <div className="animate-scale-in" style={{ animationDelay: '300ms' }}>
                  <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                  <div className="text-gray-600">AI Assistance</div>
                </div>
              </div>
            </div>
          </section>

          {/* AI Assistant */}
          <AIAssistant />
        </div>
      </SignedIn>
    </>
  );
};

export default Index;
