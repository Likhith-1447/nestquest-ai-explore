
import React from 'react';
import { UserButton, useUser } from '@clerk/clerk-react';
import { User } from 'lucide-react';

export const UserMenu: React.FC = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm text-gray-600 hidden sm:block">
        Welcome, {user.firstName || user.emailAddresses[0].emailAddress}
      </span>
      <UserButton 
        appearance={{
          elements: {
            userButtonAvatarBox: "w-8 h-8",
            userButtonPopoverCard: "shadow-xl border-2 border-gray-100",
            userButtonPopoverActionButton: "hover:bg-purple-50 transition-colors"
          }
        }}
        afterSignOutUrl="/"
      />
    </div>
  );
};
