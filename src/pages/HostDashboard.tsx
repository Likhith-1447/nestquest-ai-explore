
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Home, Calendar, Users, DollarSign, Star, TrendingUp, Sparkles, Bot, BarChart3, Eye, Bell, MessageSquare, MapPin, Zap, Target, Clock, ArrowUp, ArrowDown, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const HostDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [animateStats, setAnimateStats] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    setAnimateStats(true);
  }, []);

  const stats = {
    totalEarnings: 24850,
    monthlyGrowth: 23.5,
    bookings: 47,
    bookingGrowth: 15.2,
    occupancyRate: 87,
    occupancyGrowth: 8.1,
    rating: 4.9,
    ratingGrowth: 2.3,
    totalProperties: 8,
    activeListings: 7,
    pendingBookings: 12,
    unreadMessages: 5
  };

  const recentBookings = [
    { id: 1, guest: "Sarah Chen", property: "Mountain Cabin", checkIn: "Dec 28", nights: 4, amount: 1240, status: "confirmed" },
    { id: 2, guest: "Mike Johnson", property: "Beach Villa", checkIn: "Dec 30", nights: 7, amount: 3150, status: "pending" },
    { id: 3, guest: "Emma Wilson", property: "City Loft", checkIn: "Jan 3", nights: 3, amount: 890, status: "confirmed" },
  ];

  const properties = [
    {
      id: 1,
      title: "Luxury Mountain Cabin",
      location: "Aspen, Colorado",
      status: "occupied",
      nextBooking: "Dec 28",
      currentBooking: "Dec 20 - 27",
      earnings: 2400,
      monthlyEarnings: 8200,
      rating: 4.9,
      reviews: 127,
      occupancyRate: 92,
      aiOptimization: "Price increased by 15% for peak winter season. Demand surge detected.",
      lastUpdated: "2 hours ago",
      images: ["mountain1.jpg", "mountain2.jpg"],
      amenities: ["Hot Tub", "Ski Storage", "Fireplace", "Mountain View"]
    },
    {
      id: 2,
      title: "Oceanfront Beach Villa",
      location: "Malibu, California",
      status: "available",
      nextBooking: "Dec 30",
      currentBooking: null,
      earnings: 3200,
      monthlyEarnings: 12400,
      rating: 4.8,
      reviews: 89,
      occupancyRate: 88,
      aiOptimization: "Description enhanced with sunset views. Photos updated with drone shots.",
      lastUpdated: "1 day ago",
      images: ["beach1.jpg", "beach2.jpg"],
      amenities: ["Private Beach", "Pool", "Ocean View", "BBQ Area"]
    },
    {
      id: 3,
      title: "Downtown City Loft",
      location: "San Francisco, CA",
      status: "maintenance",
      nextBooking: "Jan 5",
      currentBooking: null,
      earnings: 1100,
      monthlyEarnings: 4200,
      rating: 4.7,
      reviews: 203,
      occupancyRate: 85,
      aiOptimization: "Smart lock installation recommended. Tech amenities highlighted.",
      lastUpdated: "3 days ago",
      images: ["city1.jpg", "city2.jpg"],
      amenities: ["City View", "High-Speed WiFi", "Rooftop Access", "Gym"]
    }
  ];

  const aiRecommendations = [
    {
      type: "pricing",
      title: "New Year's Premium Pricing",
      description: "Increase rates by 35% for Dec 29 - Jan 2 based on 127% demand surge in your area",
      impact: "+$1,240 potential revenue",
      urgency: "high",
      confidence: 94
    },
    {
      type: "listing",
      title: "Winter Photo Refresh",
      description: "Add snowy landscape photos to Mountain Cabin. Winter bookings increased 40% with seasonal photos",
      impact: "+18% booking probability",
      urgency: "medium",
      confidence: 87
    },
    {
      type: "amenities",
      title: "EV Charging Station",
      description: "Install Tesla charging for Beach Villa. 73% of luxury guests request EV charging",
      impact: "+31% guest satisfaction",
      urgency: "low",
      confidence: 91
    },
    {
      type: "automation",
      title: "Smart Check-in Setup",
      description: "Automated check-in reduces guest friction and increases 5-star reviews by 23%",
      impact: "+0.2 rating points",
      urgency: "medium",
      confidence: 89
    }
  ];

  const marketInsights = [
    { metric: "Local Demand", value: "+127%", trend: "up", period: "vs last month" },
    { metric: "Avg Nightly Rate", value: "$312", trend: "up", period: "in your area" },
    { metric: "Competition", value: "23 new listings", trend: "up", period: "this month" },
    { metric: "Booking Lead Time", value: "18 days", trend: "down", period: "average" }
  ];

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || property.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'occupied': return 'bg-green-600 text-white';
      case 'available': return 'bg-blue-600 text-white';
      case 'maintenance': return 'bg-orange-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      case 'low': return 'border-green-200 bg-green-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Link to="/" className="flex items-center space-x-2 group">
                <div className="w-8 h-8 gradient-ai rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  NestQuest AI
                </h1>
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="relative hover:scale-105 transition-transform duration-200">
                <Bell className="w-4 h-4" />
                {stats.unreadMessages > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                    {stats.unreadMessages}
                  </span>
                )}
              </Button>
              <Button variant="outline" size="sm" className="hover:scale-105 transition-transform duration-200">
                <Eye className="w-4 h-4 mr-2" />
                Guest View
              </Button>
              <Button className="gradient-ai text-white hover:scale-105 transition-transform duration-200">
                <Plus className="w-4 h-4 mr-2" />
                Add Property
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Host Dashboard</h1>
              <p className="text-gray-600">Manage your properties with AI-powered insights</p>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border rounded-lg text-sm bg-white hover:border-purple-300 transition-colors duration-200"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className={`hover:shadow-lg transition-all duration-300 hover:scale-105 ${animateStats ? 'animate-scale-in' : ''}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <DollarSign className="w-8 h-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                    <p className="text-2xl font-bold text-gray-900">${stats.totalEarnings.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center text-green-600 text-sm">
                  <ArrowUp className="w-4 h-4 mr-1" />
                  <span className="font-semibold">+{stats.monthlyGrowth}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`hover:shadow-lg transition-all duration-300 hover:scale-105 ${animateStats ? 'animate-scale-in' : ''}`} style={{ animationDelay: '0.1s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="w-8 h-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Bookings</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.bookings}</p>
                  </div>
                </div>
                <div className="flex items-center text-green-600 text-sm">
                  <ArrowUp className="w-4 h-4 mr-1" />
                  <span className="font-semibold">+{stats.bookingGrowth}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`hover:shadow-lg transition-all duration-300 hover:scale-105 ${animateStats ? 'animate-scale-in' : ''}`} style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Home className="w-8 h-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Occupancy Rate</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.occupancyRate}%</p>
                  </div>
                </div>
                <div className="flex items-center text-green-600 text-sm">
                  <ArrowUp className="w-4 h-4 mr-1" />
                  <span className="font-semibold">+{stats.occupancyGrowth}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`hover:shadow-lg transition-all duration-300 hover:scale-105 ${animateStats ? 'animate-scale-in' : ''}`} style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="w-8 h-8 text-yellow-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Average Rating</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.rating}</p>
                  </div>
                </div>
                <div className="flex items-center text-green-600 text-sm">
                  <ArrowUp className="w-4 h-4 mr-1" />
                  <span className="font-semibold">+{stats.ratingGrowth}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Enhanced AI Recommendations */}
            <Card className="animate-fade-in hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bot className="w-5 h-5 text-purple-600 mr-2" />
                  AI Recommendations
                  <Badge variant="secondary" className="ml-2 animate-pulse-slow">
                    {aiRecommendations.length} Active
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {aiRecommendations.map((rec, index) => (
                  <div key={index} className={`p-4 border-2 rounded-lg hover:shadow-md transition-all duration-300 hover:scale-[1.02] ${getUrgencyColor(rec.urgency)}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {rec.type}
                        </Badge>
                        <div className="flex items-center text-xs text-gray-500">
                          <Target className="w-3 h-3 mr-1" />
                          {rec.confidence}% confidence
                        </div>
                      </div>
                      <Badge 
                        variant={rec.urgency === 'high' ? 'destructive' : rec.urgency === 'medium' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {rec.urgency} priority
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{rec.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-green-600 font-medium text-sm">{rec.impact}</span>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="hover:scale-105 transition-transform duration-200">
                          Learn More
                        </Button>
                        <Button size="sm" className="gradient-ai text-white hover:scale-105 transition-transform duration-200">
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Enhanced Properties List */}
            <Card className="animate-fade-in hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Your Properties</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        placeholder="Search properties..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-48"
                      />
                    </div>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-3 py-2 border rounded-md text-sm"
                    >
                      <option value="all">All Status</option>
                      <option value="occupied">Occupied</option>
                      <option value="available">Available</option>
                      <option value="maintenance">Maintenance</option>
                    </select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredProperties.map((property) => (
                  <div key={property.id} className="p-6 border rounded-lg hover:shadow-md transition-all duration-300 hover:scale-[1.02] bg-white">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div>
                          <h4 className="font-semibold text-gray-900 text-lg">{property.title}</h4>
                          <div className="flex items-center text-gray-600 text-sm mt-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            {property.location}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(property.status)}>
                          {property.status}
                        </Badge>
                        <div className="text-right text-xs text-gray-500">
                          <Clock className="w-3 h-3 inline mr-1" />
                          {property.lastUpdated}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Rating</p>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          <span className="font-semibold">{property.rating}</span>
                          <span className="text-gray-500 text-sm ml-1">({property.reviews})</span>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">This Month</p>
                        <p className="font-semibold text-green-600">${property.monthlyEarnings.toLocaleString()}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Occupancy</p>
                        <p className="font-semibold">{property.occupancyRate}%</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Next Booking</p>
                        <p className="font-semibold">{property.nextBooking}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs text-gray-600 mb-2">Amenities</p>
                      <div className="flex flex-wrap gap-1">
                        {property.amenities.map((amenity, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                      <div className="flex items-start">
                        <Sparkles className="w-4 h-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-purple-700 text-sm font-medium mb-1">AI Optimization</p>
                          <p className="text-purple-600 text-sm">{property.aiOptimization}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="hover:scale-105 transition-transform duration-200">
                          <Calendar className="w-4 h-4 mr-2" />
                          Manage Calendar
                        </Button>
                        <Button variant="outline" size="sm" className="hover:scale-105 transition-transform duration-200">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Messages
                        </Button>
                      </div>
                      <Button size="sm" className="gradient-ai text-white hover:scale-105 transition-transform duration-200">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* Market Insights */}
            <Card className="animate-fade-in hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Market Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketInsights.map((insight, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <div>
                        <span className="text-sm font-medium text-gray-900">{insight.metric}</span>
                        <p className="text-xs text-gray-600">{insight.period}</p>
                      </div>
                      <div className="flex items-center">
                        {insight.trend === 'up' ? (
                          <ArrowUp className="w-4 h-4 text-green-600 mr-1" />
                        ) : (
                          <ArrowDown className="w-4 h-4 text-red-600 mr-1" />
                        )}
                        <span className={`font-semibold ${insight.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          {insight.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Bookings */}
            <Card className="animate-fade-in hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Recent Bookings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-900">{booking.guest}</h5>
                      <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                        {booking.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{booking.property}</p>
                    <div className="flex items-center justify-between mt-2 text-sm">
                      <span className="text-gray-500">{booking.checkIn} • {booking.nights}n</span>
                      <span className="font-semibold text-green-600">${booking.amount}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Enhanced Quick Actions */}
            <Card className="animate-fade-in hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start hover:scale-105 transition-transform duration-200">
                  <Calendar className="w-4 h-4 mr-2" />
                  Manage Calendar
                  <Badge variant="secondary" className="ml-auto">
                    {stats.pendingBookings}
                  </Badge>
                </Button>
                <Button variant="outline" className="w-full justify-start hover:scale-105 transition-transform duration-200">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Guest Messages
                  <Badge variant="destructive" className="ml-auto">
                    {stats.unreadMessages}
                  </Badge>
                </Button>
                <Button variant="outline" className="w-full justify-start hover:scale-105 transition-transform duration-200">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Pricing Tools
                  <Zap className="w-3 h-3 ml-auto text-yellow-500" />
                </Button>
                <Button variant="outline" className="w-full justify-start hover:scale-105 transition-transform duration-200">
                  <Star className="w-4 h-4 mr-2" />
                  Reviews & Ratings
                </Button>
                <Button variant="outline" className="w-full justify-start hover:scale-105 transition-transform duration-200">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics Dashboard
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostDashboard;
