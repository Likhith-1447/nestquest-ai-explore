
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Home, Calendar, Users, DollarSign, Star, TrendingUp, Sparkles, Bot, BarChart3, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const HostDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const stats = {
    totalEarnings: 12450,
    bookings: 28,
    occupancyRate: 85,
    rating: 4.8
  };

  const properties = [
    {
      id: 1,
      title: "Mountain Cabin",
      location: "Aspen, CO",
      status: "occupied",
      nextBooking: "Dec 20",
      earnings: 1200,
      aiOptimization: "Price increased by 15% based on demand"
    },
    {
      id: 2,
      title: "Beach Villa",
      location: "Malibu, CA",
      status: "available",
      nextBooking: "Dec 22",
      earnings: 2400,
      aiOptimization: "Description enhanced for better visibility"
    }
  ];

  const aiRecommendations = [
    {
      type: "pricing",
      title: "Optimize Holiday Pricing",
      description: "Increase rates by 20% for Dec 24-31 based on local demand surge",
      impact: "+$340 potential revenue"
    },
    {
      type: "listing",
      title: "Update Photos",
      description: "Consider adding winter photos to Mountain Cabin for seasonal appeal",
      impact: "+12% booking probability"
    },
    {
      type: "amenities",
      title: "Add Trending Amenities",
      description: "Hot tub and EV charging are highly requested in your area",
      impact: "+25% guest satisfaction"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 gradient-ai rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  NestQuest AI
                </h1>
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                Guest View
              </Button>
              <Button className="gradient-ai text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Property
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Host Dashboard</h1>
          <p className="text-gray-600">Manage your properties with AI-powered insights</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                  <p className="text-2xl font-bold text-gray-900">${stats.totalEarnings.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.bookings}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Home className="w-8 h-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Occupancy Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.occupancyRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Star className="w-8 h-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Average Rating</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.rating}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* AI Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bot className="w-5 h-5 text-purple-600 mr-2" />
                  AI Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {aiRecommendations.map((rec, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {rec.type}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{rec.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-green-600 font-medium text-sm">{rec.impact}</span>
                      <Button size="sm" variant="outline">Apply</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Properties List */}
            <Card>
              <CardHeader>
                <CardTitle>Your Properties</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {properties.map((property) => (
                  <div key={property.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{property.title}</h4>
                        <p className="text-gray-600 text-sm">{property.location}</p>
                      </div>
                      <Badge 
                        variant={property.status === 'occupied' ? 'default' : 'secondary'}
                        className={property.status === 'occupied' ? 'bg-green-600' : ''}
                      >
                        {property.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-gray-600">Next Booking</p>
                        <p className="font-medium">{property.nextBooking}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">This Month</p>
                        <p className="font-medium">${property.earnings}</p>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-3">
                      <div className="flex items-start">
                        <Sparkles className="w-4 h-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                        <p className="text-purple-700 text-sm">{property.aiOptimization}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Revenue Growth</span>
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span className="font-semibold">+23%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Booking Rate</span>
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span className="font-semibold">+15%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Guest Satisfaction</span>
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span className="font-semibold">+8%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Manage Calendar
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Guest Messages
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Pricing Tools
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Star className="w-4 h-4 mr-2" />
                  Reviews
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
