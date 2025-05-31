
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, DollarSign, Home, Building, Sparkles, Calendar, MapPin, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const MarketTrends = () => {
  const [selectedCity, setSelectedCity] = useState('San Francisco');

  const priceData = [
    { month: 'Jan', price: 1200, volume: 45 },
    { month: 'Feb', price: 1250, volume: 52 },
    { month: 'Mar', price: 1180, volume: 48 },
    { month: 'Apr', price: 1320, volume: 61 },
    { month: 'May', price: 1380, volume: 67 },
    { month: 'Jun', price: 1425, volume: 72 }
  ];

  const propertyTypes = [
    { name: 'Single Family', value: 45, color: '#8B5CF6' },
    { name: 'Condos', value: 30, color: '#06B6D4' },
    { name: 'Townhomes', value: 20, color: '#10B981' },
    { name: 'Multi-Family', value: 5, color: '#F59E0B' }
  ];

  const marketMetrics = [
    {
      title: 'Median Home Price',
      value: '$1,425,000',
      change: '+8.2%',
      trend: 'up',
      icon: DollarSign
    },
    {
      title: 'Active Listings',
      value: '2,847',
      change: '-12.5%',
      trend: 'down',
      icon: Home
    },
    {
      title: 'Days on Market',
      value: '28 days',
      change: '-15.3%',
      trend: 'down',
      icon: Calendar
    },
    {
      title: 'Price per Sq Ft',
      value: '$842',
      change: '+5.7%',
      trend: 'up',
      icon: Building
    }
  ];

  const topCities = [
    { name: 'San Francisco', medianPrice: 1425000, change: 8.2 },
    { name: 'New York', medianPrice: 850000, change: 5.1 },
    { name: 'Los Angeles', medianPrice: 780000, change: 6.8 },
    { name: 'Seattle', medianPrice: 720000, change: 4.3 },
    { name: 'Austin', medianPrice: 550000, change: 12.5 },
    { name: 'Miami', medianPrice: 485000, change: 9.7 }
  ];

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
              <Link to="/neighborhoods" className="text-gray-700 hover:text-purple-600 transition-colors">Neighborhoods</Link>
              <Link to="/agents" className="text-gray-700 hover:text-purple-600 transition-colors">Agents</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Market Trends & Analytics</h2>
          <p className="text-gray-600">Real-time insights powered by AI analysis of market data</p>
        </div>

        {/* AI Insights Banner */}
        <Card className="mb-8 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Sparkles className="w-6 h-6 text-purple-600 mr-3" />
              <h3 className="text-lg font-semibold text-purple-800">AI Market Insights</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/60 rounded-lg p-4">
                <h4 className="font-medium text-purple-700 mb-2">Market Prediction</h4>
                <p className="text-sm text-purple-600">
                  Based on current trends, we predict a 3-5% price increase in the next quarter for {selectedCity}.
                </p>
              </div>
              <div className="bg-white/60 rounded-lg p-4">
                <h4 className="font-medium text-purple-700 mb-2">Best Time to Buy</h4>
                <p className="text-sm text-purple-600">
                  Our AI recommends the next 2-3 months as optimal for buyers in this market.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Market Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {marketMetrics.map((metric, index) => (
            <Card key={index} className="p-6">
              <CardContent className="p-0">
                <div className="flex items-center justify-between mb-2">
                  <metric.icon className="w-8 h-8 text-purple-600" />
                  <Badge variant={metric.trend === 'up' ? 'default' : 'secondary'} className={metric.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                    {metric.trend === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                    {metric.change}
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
                <div className="text-sm text-gray-600">{metric.title}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Price Trends Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Price Trends (6 Months)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={priceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}K`, 'Price']} />
                  <Line type="monotone" dataKey="price" stroke="#8B5CF6" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Sales Volume Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Home className="w-5 h-5 mr-2" />
                Sales Volume
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={priceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [value, 'Sales']} />
                  <Bar dataKey="volume" fill="#06B6D4" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Property Types Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="w-5 h-5 mr-2" />
                Property Types Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={propertyTypes}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {propertyTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Cities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Top Markets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCities.map((city, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{city.name}</div>
                      <div className="text-sm text-gray-600">
                        ${city.medianPrice.toLocaleString()}
                      </div>
                    </div>
                    <Badge variant={city.change > 0 ? 'default' : 'secondary'} className={city.change > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                      {city.change > 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                      {city.change > 0 ? '+' : ''}{city.change}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="mt-8 gradient-ai text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Get Personalized Market Reports</h3>
            <p className="text-purple-100 mb-6">
              Receive weekly AI-powered market analysis tailored to your interests and location preferences.
            </p>
            <Button className="bg-white text-purple-600 hover:bg-gray-100">
              Subscribe to Reports
              <Sparkles className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarketTrends;
