import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: '🛍️',
      title: 'Buy & Sell',
      description: 'Find amazing deals on items from your neighbors or sell things you no longer need.'
    },
    {
      icon: '🏠',
      title: 'Rent Locally',
      description: 'Rent tools, equipment, and items for short-term use instead of buying new.'
    },
    {
      icon: '🎯',
      title: 'Auction Bidding',
      description: 'Participate in exciting auctions to get the best deals on unique items.'
    },
    {
      icon: '🤝',
      title: 'Community First',
      description: 'Build connections with neighbors while practicing sustainable consumption.'
    }
  ];

  const categories = [
    {
      name: 'Electronics',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
      count: '1,200+ items'
    },
    {
      name: 'Furniture',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      count: '800+ items'
    },
    {
      name: 'Sports & Outdoors',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      count: '600+ items'
    },
    {
      name: 'Tools',
      image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop',
      count: '400+ items'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&h=1080&fit=crop" 
            alt="Community marketplace" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                Share, Connect,
                <span className="text-primary-200"> Thrive</span>
              </h1>
              <p className="text-xl lg:text-2xl text-primary-100 mb-8 leading-relaxed">
                Your neighborhood marketplace where community meets commerce. 
                Buy, sell, and rent locally while building meaningful connections.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/browse" className="bg-white text-primary-900 hover:bg-primary-50 font-semibold text-lg px-8 py-4 rounded-xl transition-colors inline-flex items-center justify-center">
                  <span className="mr-2">🔍</span>
                  Explore Marketplace
                </Link>
                <Link to="/items/new" className="border-2 border-white text-white hover:bg-white hover:text-primary-900 font-semibold text-lg px-8 py-4 rounded-xl transition-colors inline-flex items-center justify-center">
                  <span className="mr-2">➕</span>
                  List an Item
                </Link>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop" 
                alt="Happy community" 
                className="rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">✅</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">1000+ Items Listed</p>
                    <p className="text-sm text-gray-600">This month</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary-900 mb-6">
              Why Choose ShareCircle?
            </h2>
            <p className="text-xl text-primary-600 max-w-3xl mx-auto">
              We're more than just a marketplace - we're building sustainable communities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 transition-colors">
                  <span className="text-4xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-primary-900 mb-4">{feature.title}</h3>
                <p className="text-primary-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-primary-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary-900 mb-6">
              Popular Categories
            </h2>
            <p className="text-xl text-primary-600 max-w-3xl mx-auto">
              Discover thousands of items across all categories
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Link 
                key={index} 
                to={`/browse?category=${category.name}`}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                    <p className="text-primary-200">{category.count}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-primary-900 mb-2">10K+</div>
              <div className="text-primary-600 text-lg">Active Users</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-primary-900 mb-2">25K+</div>
              <div className="text-primary-600 text-lg">Items Listed</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-primary-900 mb-2">5K+</div>
              <div className="text-primary-600 text-lg">Successful Trades</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-primary-900 mb-2">50+</div>
              <div className="text-primary-600 text-lg">Cities Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary-900 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Join Our Community?
          </h2>
          <p className="text-xl text-primary-100 mb-8 leading-relaxed">
            Start buying, selling, and connecting with your neighbors today. 
            It's free, easy, and helps build a more sustainable future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="bg-white text-primary-900 hover:bg-primary-50 font-semibold text-lg px-8 py-4 rounded-xl transition-colors">
              Get Started Free
            </Link>
            <Link to="/browse" className="border-2 border-white text-white hover:bg-white hover:text-primary-900 font-semibold text-lg px-8 py-4 rounded-xl transition-colors">
              Browse First
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

