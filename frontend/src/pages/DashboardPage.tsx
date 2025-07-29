import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Item {
  id: string;
  title: string;
  description: string;
  price: number;
  item_type: 'sale' | 'rent' | 'auction';
  category: string;
  condition: string;
  images: string[];
  created_at: string;
  status: 'active' | 'inactive' | 'sold';
}

const DashboardPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [stats, setStats] = useState({
    totalItems: 0,
    activeItems: 0,
    soldItems: 0,
    totalEarnings: 0
  });

  // Mock data for now - you can replace this with actual API calls
  useEffect(() => {
    // Simulate fetching user's items
    const mockItems: Item[] = [
      {
        id: '1',
        title: 'MacBook Pro 2021',
        description: 'Excellent condition laptop',
        price: 1200,
        item_type: 'sale',
        category: 'Electronics',
        condition: 'Like New',
        images: [],
        created_at: '2024-01-15',
        status: 'active'
      },
      {
        id: '2',
        title: 'Mountain Bike',
        description: 'Great for trails',
        price: 50,
        item_type: 'rent',
        category: 'Sports',
        condition: 'Good',
        images: [],
        created_at: '2024-01-10',
        status: 'active'
      }
    ];
    
    setItems(mockItems);
    setStats({
      totalItems: mockItems.length,
      activeItems: mockItems.filter(item => item.status === 'active').length,
      soldItems: mockItems.filter(item => item.status === 'sold').length,
      totalEarnings: mockItems.reduce((sum, item) => sum + (item.status === 'sold' ? item.price : 0), 0)
    });
  }, []);

  return (
    <div className="min-h-[calc(100vh-64px)] pt-8 px-6 bg-primary-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-primary-900 mb-2">
            Welcome back, User!
          </h1>
          <p className="text-primary-600">Manage your items and track your activity</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-primary-600">Total Items</p>
                <p className="text-2xl font-semibold text-primary-900">{stats.totalItems}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-primary-600">Active Items</p>
                <p className="text-2xl font-semibold text-primary-900">{stats.activeItems}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-primary-600">Sold Items</p>
                <p className="text-2xl font-semibold text-primary-900">{stats.soldItems}</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-primary-600">Total Earnings</p>
                <p className="text-2xl font-semibold text-primary-900">${stats.totalEarnings}</p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card p-6 mb-8">
          <h2 className="text-xl font-semibold text-primary-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/items/new"
              className="flex items-center p-4 bg-primary-100 rounded-lg hover:bg-primary-200 transition-colors"
            >
              <div className="h-10 w-10 bg-primary-600 rounded-lg flex items-center justify-center mr-3">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-primary-900">Add New Item</p>
                <p className="text-sm text-primary-600">List something to sell or rent</p>
              </div>
            </Link>

            <Link
              to="/browse"
              className="flex items-center p-4 bg-green-100 rounded-lg hover:bg-green-200 transition-colors"
            >
              <div className="h-10 w-10 bg-green-600 rounded-lg flex items-center justify-center mr-3">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-primary-900">Browse Items</p>
                <p className="text-sm text-primary-600">Find items to buy or rent</p>
              </div>
            </Link>

            <Link
              to="/profile"
              className="flex items-center p-4 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
            >
              <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-primary-900">Edit Profile</p>
                <p className="text-sm text-primary-600">Update your information</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Items */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-primary-900">Your Recent Items</h2>
            <Link to="/items" className="link text-sm">
              View All
            </Link>
          </div>
          
          {items.length > 0 ? (
            <div className="space-y-4">
              {items.slice(0, 3).map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-primary-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-primary-200 rounded-lg flex items-center justify-center">
                      <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-primary-900">{item.title}</h3>
                      <p className="text-sm text-primary-600">
                        {item.item_type === 'sale' ? 'For Sale' : item.item_type === 'rent' ? 'For Rent' : 'Auction'} • 
                        ${item.price} • {item.condition}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      item.status === 'active' ? 'bg-green-100 text-green-800' :
                      item.status === 'sold' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                    <button className="text-primary-600 hover:text-primary-900">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <p className="text-primary-600 mb-4">You haven't listed any items yet</p>
              <Link to="/items/new" className="btn-primary inline-block">
                List Your First Item
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

