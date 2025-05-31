
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Phone, Mail, MessageSquare, Award, TrendingUp, Users, ArrowLeft, Sparkles, MapPin, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Agents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  const agents = [
    {
      id: 1,
      name: "Sarah Chen",
      title: "Senior Real Estate Agent",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      reviews: 127,
      sales: 45,
      experience: 8,
      specialty: ["Luxury", "First-time buyers"],
      location: "San Francisco, CA",
      languages: ["English", "Mandarin"],
      achievements: ["Top 1% Agent", "Luxury Specialist"],
      recentSale: "$2.8M",
      description: "Specializing in luxury properties and helping first-time buyers navigate the San Francisco market.",
      responseTime: "< 30 min"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      title: "Real Estate Broker",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 4.8,
      reviews: 203,
      sales: 72,
      experience: 12,
      specialty: ["Investment", "Commercial"],
      location: "Los Angeles, CA",
      languages: ["English", "Spanish"],
      achievements: ["Investment Expert", "Commercial Certified"],
      recentSale: "$1.5M",
      description: "Expert in investment properties and commercial real estate with over a decade of experience.",
      responseTime: "< 45 min"
    },
    {
      id: 3,
      name: "Emily Johnson",
      title: "Buyer's Agent Specialist",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      reviews: 89,
      sales: 38,
      experience: 6,
      specialty: ["First-time buyers", "Relocation"],
      location: "Austin, TX",
      languages: ["English"],
      achievements: ["Buyer's Choice Award", "Rising Star"],
      recentSale: "$650K",
      description: "Dedicated to helping first-time buyers and families relocating to the Austin area.",
      responseTime: "< 15 min"
    },
    {
      id: 4,
      name: "David Kim",
      title: "Luxury Property Specialist",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 4.7,
      reviews: 156,
      sales: 28,
      experience: 10,
      specialty: ["Luxury", "Waterfront"],
      location: "Miami, FL",
      languages: ["English", "Korean"],
      achievements: ["Luxury Certified", "Waterfront Expert"],
      recentSale: "$3.2M",
      description: "Luxury and waterfront property specialist with extensive knowledge of Miami's premium markets.",
      responseTime: "< 1 hour"
    },
    {
      id: 5,
      name: "Amanda Foster",
      title: "Market Research Analyst",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      rating: 4.8,
      reviews: 94,
      sales: 52,
      experience: 7,
      specialty: ["Market analysis", "Investment"],
      location: "Seattle, WA",
      languages: ["English", "French"],
      achievements: ["Market Expert", "Data Analyst"],
      recentSale: "$980K",
      description: "Data-driven agent specializing in market analysis and strategic investment opportunities.",
      responseTime: "< 20 min"
    },
    {
      id: 6,
      name: "James Thompson",
      title: "Residential Sales Expert",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      rating: 4.6,
      reviews: 178,
      sales: 84,
      experience: 15,
      specialty: ["Residential", "Condos"],
      location: "Boston, MA",
      languages: ["English"],
      achievements: ["Veteran Agent", "Condo Specialist"],
      recentSale: "$1.2M",
      description: "Experienced residential agent with deep knowledge of Boston's diverse neighborhood markets.",
      responseTime: "< 1 hour"
    }
  ];

  const specialties = [
    { value: 'all', label: 'All Specialties' },
    { value: 'luxury', label: 'Luxury' },
    { value: 'first-time', label: 'First-time Buyers' },
    { value: 'investment', label: 'Investment' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'relocation', label: 'Relocation' }
  ];

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || 
                            agent.specialty.some(s => s.toLowerCase().includes(selectedSpecialty));
    return matchesSearch && matchesSpecialty;
  });

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
              <Link to="/neighborhoods" className="text-gray-700 hover:text-purple-600 transition-colors">Neighborhoods</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Find Your Perfect Agent</h2>
          <p className="text-gray-600">Connect with top-rated real estate professionals in your area</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by agent name or location..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="px-3 py-2 border rounded-md bg-white min-w-32"
            >
              {specialties.map(specialty => (
                <option key={specialty.value} value={specialty.value}>
                  {specialty.label}
                </option>
              ))}
            </select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        {/* AI Matching Banner */}
        <Card className="mb-8 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Sparkles className="w-6 h-6 text-purple-600 mr-3" />
              <h3 className="text-lg font-semibold text-purple-800">AI Agent Matching</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/60 rounded-lg p-4">
                <h4 className="font-medium text-purple-700 mb-2">Perfect Match</h4>
                <p className="text-sm text-purple-600">
                  Our AI analyzes agent performance, specialties, and client reviews to find your ideal match.
                </p>
              </div>
              <div className="bg-white/60 rounded-lg p-4">
                <h4 className="font-medium text-purple-700 mb-2">Response Time</h4>
                <p className="text-sm text-purple-600">
                  All featured agents respond within 1 hour to ensure quick communication.
                </p>
              </div>
              <div className="bg-white/60 rounded-lg p-4">
                <h4 className="font-medium text-purple-700 mb-2">Verified Reviews</h4>
                <p className="text-sm text-purple-600">
                  Every review is verified from actual client transactions for authentic feedback.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Agents Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => (
            <Card key={agent.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                {/* Agent Header */}
                <div className="flex items-start space-x-4 mb-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={agent.image} alt={agent.name} />
                    <AvatarFallback>{agent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">{agent.name}</h3>
                    <p className="text-sm text-gray-600">{agent.title}</p>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-medium">{agent.rating}</span>
                        <span className="text-gray-600 text-sm ml-1">({agent.reviews} reviews)</span>
                      </div>
                    </div>
                    <div className="flex items-center mt-1 text-sm text-gray-600">
                      <MapPin className="w-3 h-3 mr-1" />
                      {agent.location}
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">{agent.sales}</div>
                    <div className="text-xs text-gray-600">Sales</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">{agent.experience}Y</div>
                    <div className="text-xs text-gray-600">Experience</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">{agent.responseTime}</div>
                    <div className="text-xs text-gray-600">Response</div>
                  </div>
                </div>

                {/* Specialties */}
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">Specialties</div>
                  <div className="flex flex-wrap gap-1">
                    {agent.specialty.map((spec, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">Achievements</div>
                  <div className="flex flex-wrap gap-1">
                    {agent.achievements.map((achievement, index) => (
                      <Badge key={index} className="text-xs bg-purple-100 text-purple-700">
                        <Award className="w-3 h-3 mr-1" />
                        {achievement}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Recent Sale */}
                <div className="mb-4 p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-700">Recent Sale</span>
                    <span className="font-bold text-green-800">{agent.recentSale}</span>
                  </div>
                </div>

                {/* Languages */}
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-1">Languages</div>
                  <div className="text-sm text-gray-600">{agent.languages.join(', ')}</div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-700 mb-4">{agent.description}</p>

                {/* Contact Buttons */}
                <div className="grid grid-cols-3 gap-2">
                  <Button size="sm" className="gradient-ai text-white">
                    <MessageSquare className="w-3 h-3 mr-1" />
                    Chat
                  </Button>
                  <Button size="sm" variant="outline">
                    <Phone className="w-3 h-3 mr-1" />
                    Call
                  </Button>
                  <Button size="sm" variant="outline">
                    <Mail className="w-3 h-3 mr-1" />
                    Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Load More Agents
          </Button>
        </div>

        {/* CTA Section */}
        <Card className="mt-12 gradient-ai text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Work with a Top Agent?</h3>
            <p className="text-purple-100 mb-6">
              Our AI will match you with the perfect agent based on your specific needs and preferences.
            </p>
            <Button className="bg-white text-purple-600 hover:bg-gray-100">
              <Sparkles className="w-4 h-4 mr-2" />
              Get Matched Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Agents;
