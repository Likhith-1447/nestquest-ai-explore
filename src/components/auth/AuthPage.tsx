
import React from 'react';
import { SignIn, SignUp } from '@clerk/clerk-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles } from 'lucide-react';

export const AuthPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 gradient-ai rounded-xl flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                NestQuest AI
              </h1>
            </div>
          </div>
          <p className="text-gray-600">
            Join the future of AI-powered real estate
          </p>
        </div>

        {/* Auth Forms */}
        <Card className="border-2 border-gray-100 shadow-xl">
          <CardContent className="p-0">
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 rounded-none rounded-t-lg">
                <TabsTrigger value="signin" className="rounded-none rounded-tl-lg">
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="signup" className="rounded-none rounded-tr-lg">
                  Sign Up
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin" className="p-6 m-0">
                <SignIn 
                  fallbackRedirectUrl="/"
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      card: "shadow-none border-none p-0",
                      headerTitle: "hidden",
                      headerSubtitle: "hidden",
                      socialButtonsBlockButton: "border-2 border-gray-200 hover:border-purple-300 transition-colors",
                      formButtonPrimary: "gradient-ai hover:opacity-90 transition-opacity"
                    }
                  }}
                />
              </TabsContent>
              
              <TabsContent value="signup" className="p-6 m-0">
                <SignUp 
                  fallbackRedirectUrl="/"
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      card: "shadow-none border-none p-0",
                      headerTitle: "hidden",
                      headerSubtitle: "hidden",
                      socialButtonsBlockButton: "border-2 border-gray-200 hover:border-purple-300 transition-colors",
                      formButtonPrimary: "gradient-ai hover:opacity-90 transition-opacity"
                    }
                  }}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
    </div>
  );
};
