import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () =e {
  const features = [
    {
      icon: '🛍️',
      title: 'Buy 6 Sell',
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
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=4006h=3006fit=crop',
      count: '1,200+ items'
    },
    {
      name: 'Furniture',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=4006h=3006fit=crop',
      count: '800+ items'
    },
    {
      name: 'Sports 6 Outdoors',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=4006h=3006fit=crop',
      count: '600+ items'
    },
    {
      name: 'Tools',
      image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=4006h=3006fit=crop',
      count: '400+ items'
    }
  ];

  return (
    cdiv className="min-h-screen"e
      {/* Hero Section */}
      csection className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white overflow-hidden"e
        {/* Background Image */}
        cdiv className="absolute inset-0 opacity-20"e
          cimg 
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=19206h=10806fit=crop" 
            alt="Community marketplace" 
            className="w-full h-full object-cover"
          /e
        c/dive
        
        cdiv className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32"e
          cdiv className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"e
            cdive
              ch1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight"e
                Share, Connect,
                cspan className="text-primary-200"e Thrivec/spane
              c/h1e
              cp className="text-xl lg:text-2xl text-primary-100 mb-8 leading-relaxed"e
                Your neighborhood marketplace where community meets commerce. 
                Buy, sell, and rent locally while building meaningful connections.
              c/pe
              cdiv className="flex flex-col sm:flex-row gap-4"e
                cLink to="/browse" className="bg-white text-primary-900 hover:bg-primary-50 font-semibold text-lg px-8 py-4 rounded-xl transition-colors inline-flex items-center justify-center"e
                  cspan className="mr-2"e🔍c/spane
                  Explore Marketplace
                c/Linke
                cLink to="/items/new" className="border-2 border-white text-white hover:bg-white hover:text-primary-900 font-semibold text-lg px-8 py-4 rounded-xl transition-colors inline-flex items-center justify-center"e
                  cspan className="mr-2"e➕c/spane
                  List an Item
                c/Linke
              c/dive
            c/dive
            cdiv className="relative"e
              cimg 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=6006h=4006fit=crop" 
                alt="Happy community" 
                className="rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300"
              /e
              cdiv className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg"e
                cdiv className="flex items-center gap-3"e
                  cdiv className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center"e
                    cspan className="text-2xl"e✅c/spane
                  c/dive
                  cdive
                    cp className="font-semibold text-gray-900"e1000+ Items Listedc/pe
                    cp className="text-sm text-gray-600"eThis monthc/pe
                  c/dive
                c/dive
              c/dive
            c/dive
          c/dive
        c/dive
      c/sectione

      {/* Features Section */}
      csection className="py-24 bg-white"e
        cdiv className="max-w-7xl mx-auto px-6"e
          cdiv className="text-center mb-16"e
            ch2 className="text-4xl lg:text-5xl font-bold text-primary-900 mb-6"e
              Why Choose ShareCircle?
            c/h2e
            cp className="text-xl text-primary-600 max-w-3xl mx-auto"e
              We're more than just a marketplace - we're building sustainable communities
            c/pe
          c/dive
          
          cdiv className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"e
            {features.map((feature, index) =e (
              cdiv key={index} className="text-center group hover:scale-105 transition-transform duration-300"e
                cdiv className="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 transition-colors"e
                  cspan className="text-4xl"e{feature.icon}c/spane
                c/dive
                ch3 className="text-xl font-semibold text-primary-900 mb-4"e{feature.title}c/h3e
                cp className="text-primary-600 leading-relaxed"e{feature.description}c/pe
              c/dive
            ))}
          c/dive
        c/dive
      c/sectione

      {/* Categories Section */}
      csection className="py-24 bg-primary-50"e
        cdiv className="max-w-7xl mx-auto px-6"e
          cdiv className="text-center mb-16"e
            ch2 className="text-4xl lg:text-5xl font-bold text-primary-900 mb-6"e
              Popular Categories
            c/h2e
            cp className="text-xl text-primary-600 max-w-3xl mx-auto"e
              Discover thousands of items across all categories
            c/pe
          c/dive
          
          cdiv className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"e
            {categories.map((category, index) =e (
              cLink 
                key={index} 
                to={`/browse?category=${category.name}`}
                className="group cursor-pointer"
              e
                cdiv className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300"e
                  cimg 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  /e
                  cdiv className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"ec/dive
                  cdiv className="absolute bottom-6 left-6 text-white"e
                    ch3 className="text-2xl font-bold mb-2"e{category.name}c/h3e
                    cp className="text-primary-200"e{category.count}c/pe
                  c/dive
                c/dive
              c/Linke
            ))}
          c/dive
        c/dive
      c/sectione

      {/* Stats Section */}
      csection className="py-24 bg-white"e
        cdiv className="max-w-7xl mx-auto px-6"e
          cdiv className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center"e
            cdive
              cdiv className="text-4xl lg:text-5xl font-bold text-primary-900 mb-2"e10K+c/dive
              cdiv className="text-primary-600 text-lg"eActive Usersc/dive
            c/dive
            cdive
              cdiv className="text-4xl lg:text-5xl font-bold text-primary-900 mb-2"e25K+c/dive
              cdiv className="text-primary-600 text-lg"eItems Listedc/dive
            c/dive
            cdive
              cdiv className="text-4xl lg:text-5xl font-bold text-primary-900 mb-2"e5K+c/dive
              cdiv className="text-primary-600 text-lg"eSuccessful Tradesc/dive
            c/dive
            cdive
              cdiv className="text-4xl lg:text-5xl font-bold text-primary-900 mb-2"e50+c/dive
              cdiv className="text-primary-600 text-lg"eCities Servedc/dive
            c/dive
          c/dive
        c/dive
      c/sectione

      {/* CTA Section */}
      csection className="py-24 bg-gradient-to-r from-primary-900 to-primary-800 text-white"e
        cdiv className="max-w-4xl mx-auto px-6 text-center"e
          ch2 className="text-4xl lg:text-5xl font-bold mb-6"e
            Ready to Join Our Community?
          c/h2e
          cp className="text-xl text-primary-100 mb-8 leading-relaxed"e
            Start buying, selling, and connecting with your neighbors today. 
            It's free, easy, and helps build a more sustainable future.
          c/pe
          cdiv className="flex flex-col sm:flex-row gap-4 justify-center"e
            cLink to="/register" className="bg-white text-primary-900 hover:bg-primary-50 font-semibold text-lg px-8 py-4 rounded-xl transition-colors"e
              Get Started Free
            c/Linke
            cLink to="/browse" className="border-2 border-white text-white hover:bg-white hover:text-primary-900 font-semibold text-lg px-8 py-4 rounded-xl transition-colors"e
              Browse First
            c/Linke
          c/dive
        c/dive
      c/sectione
    c/dive
  );
};

export default HomePage;
