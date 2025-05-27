
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Settings, Heart, Calendar, Star, CreditCard, Shield, Bell, Sparkles, Bot, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  const user = {
    name: "Alex Thompson",
    email: "alex.thompson@email.com",
    joinDate: "March 2023",
    verified: true,
    profileImage: null,
    bio: "Travel enthusiast who loves discovering unique places and connecting with local communities.",
    preferences: {
      propertyType: "Cabin",
      location: "Mountain",
      priceRange: "$100-200",
      amenities: ["Wi-Fi", "Kitchen", "Pet-friendly"]
    }
  };

  const recentBookings = [
    {
      id: 1,
      property: "Mountain Cabin",
      location: "Aspen, CO",
      dates: "Dec 15-18, 2024",
      status: "upcoming",
      total: 540
    },
    {
      id: 2,
      property: "Beach Villa",
      location: "Malibu, CA",
      dates: "Nov 8-12, 2024",
      status: "completed",
      total: 1280
    }
  ];

  const savedProperties = [
    {
      id: 1,
      title: "Cozy Forest Retreat",
      location: "Portland, OR",
      price: 95,
      image: "https://images.unsplash.com/photo-1544967919-659d8ac8d0d8?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      title: "Urban Loft",
      location: "Brooklyn, NY",
      price: 125,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=200&fit=crop"
    }
  ];

  const aiInsights = [
    "You prefer mountain destinations 75% of the time",
    "Your ideal stay duration is 3-4 nights",
    "Properties with kitchens increase your satisfaction by 40%"
  ];

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'saved', label: 'Saved', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

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
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    {user.name.charAt(0)}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
                  <p className="text-gray-600">{user.email}</p>
                  <div className="flex items-center justify-center mt-2">
                    <Badge variant="secondary" className="text-xs">
                      <Shield className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                </div>

                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                          activeTab === tab.id
                            ? 'bg-purple-100 text-purple-700 border border-purple-200'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                {/* AI Travel Profile */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Bot className="w-5 h-5 text-purple-600 mr-2" />
                        AI Travel Profile
                      </div>
                      <Badge className="gradient-ai text-white">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Personalized
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Travel Insights</h4>
                        <ul className="space-y-2">
                          {aiInsights.map((insight, index) => (
                            <li key={index} className="flex items-start">
                              <Sparkles className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 text-sm">{insight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">Preferences</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Property Type:</span>
                            <span className="font-medium">{user.preferences.propertyType}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Location:</span>
                            <span className="font-medium">{user.preferences.location}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Price Range:</span>
                            <span className="font-medium">{user.preferences.priceRange}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Profile Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Profile Information
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        {isEditing ? 'Save' : 'Edit'}
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <Input
                          value={user.name}
                          disabled={!isEditing}
                          className={!isEditing ? 'bg-gray-50' : ''}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <Input
                          value={user.email}
                          disabled={!isEditing}
                          className={!isEditing ? 'bg-gray-50' : ''}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                      <Textarea
                        value={user.bio}
                        disabled={!isEditing}
                        className={!isEditing ? 'bg-gray-50' : ''}
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'bookings' && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Bookings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{booking.property}</h4>
                        <Badge 
                          variant={booking.status === 'upcoming' ? 'default' : 'secondary'}
                          className={booking.status === 'upcoming' ? 'bg-blue-600' : ''}
                        >
                          {booking.status}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{booking.location}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">{booking.dates}</span>
                        <span className="font-semibold">${booking.total}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {activeTab === 'saved' && (
              <Card>
                <CardHeader>
                  <CardTitle>Saved Properties</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {savedProperties.map((property) => (
                      <div key={property.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <img
                          src={property.image}
                          alt={property.title}
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-4">
                          <h4 className="font-semibold text-gray-900 mb-1">{property.title}</h4>
                          <p className="text-gray-600 text-sm mb-2">{property.location}</p>
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">${property.price}/night</span>
                            <Button size="sm" variant="outline">View</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Booking confirmations</p>
                        <p className="text-sm text-gray-600">Get notified when bookings are confirmed</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">AI recommendations</p>
                        <p className="text-sm text-gray-600">Receive personalized property suggestions</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Price alerts</p>
                        <p className="text-sm text-gray-600">Get notified of price drops on saved properties</p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Privacy & Security</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      <Shield className="w-4 h-4 mr-2" />
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Payment Methods
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <User className="w-4 h-4 mr-2" />
                      Privacy Settings
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
