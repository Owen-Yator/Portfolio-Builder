import React from 'react';

interface HeaderProps {
  user?: {
    name: string;
    profilePicture?: string;
  };
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-indigo-600">
                Portfolio Builder
              </h1>
            </div>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a
              href="/"
              className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </a>
            <a
              href="/dashboard"
              className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Dashboard
            </a>
            <a
              href="/templates"
              className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Templates
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user.profilePicture || '/default-avatar.png'}
                    alt={user.name}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className="text-gray-500 hover:text-gray-900 text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <a
                  href="/login"
                  className="text-gray-500 hover:text-gray-900 text-sm font-medium"
                >
                  Sign in
                </a>
                <a
                  href="/signup"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Sign up
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
