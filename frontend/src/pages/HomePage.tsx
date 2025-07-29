import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-500 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to <span className="text-accent-400">ShareCircle</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-primary-100">
              Your community marketplace for renting, buying, and sharing items locally. 
              Reduce waste, save money, and build connections.
            </p>
            <div className="space-x-4">
              {user ? (
                <Link
                  to="/dashboard"
                  className="bg-accent-500 hover:bg-accent-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-200"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="bg-accent-500 hover:bg-accent-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-200"
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/login"
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-200"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How ShareCircle Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A simple, secure platform for community-based item sharing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛒</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Buy & Sell</h3>
              <p className="text-gray-600">
                Find great deals on items in your community or sell things you no longer need.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-secondary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Rent & Borrow</h3>
              <p className="text-gray-600">
                Access tools and equipment when you need them without the full cost of ownership.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-accent-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚖️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Auction & Bid</h3>
              <p className="text-gray-600">
                Participate in community auctions to find unique items at competitive prices.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose ShareCircle?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-secondary-500 w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Secure Transactions</h4>
                    <p className="text-gray-600">
                      JWT-based authentication and secure payment processing
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-secondary-500 w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Community Trust</h4>
                    <p className="text-gray-600">
                      User ratings and reviews to build trust within your community
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-secondary-500 w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Real-time Chat</h4>
                    <p className="text-gray-600">
                      Communicate directly with other community members
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-secondary-500 w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Sustainable Living</h4>
                    <p className="text-gray-600">
                      Reduce waste and promote a circular economy in your area
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-center">Ready to Start?</h3>
              <p className="text-gray-600 text-center mb-6">
                Join thousands of community members already sharing and saving
              </p>
              {!user && (
                <div className="space-y-3">
                  <Link
                    to="/register"
                    className="w-full btn-primary block text-center"
                  >
                    Create Account
                  </Link>
                  <Link
                    to="/login"
                    className="w-full btn-secondary block text-center"
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
