import React, { useState, useEffect } from 'react';

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
  user_name: string;
  location?: string;
}

const BrowsePage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  
  const categories = ['Electronics', 'Furniture', 'Clothing', 'Sports', 'Books', 'Tools', 'Other'];
  const itemTypes = ['sale', 'rent', 'auction'];

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockItems: Item[] = [
      {
        id: '1',
        title: 'MacBook Pro 2021',
        description: 'Excellent condition M1 MacBook Pro with 16GB RAM and 512GB SSD. Perfect for work or school.',
        price: 1200,
        item_type: 'sale',
        category: 'Electronics',
        condition: 'Like New',
        images: [],
        created_at: '2024-01-15',
        user_name: 'John Doe',
        location: 'San Francisco, CA'
      },
      {
        id: '2',
        title: 'Mountain Bike',
        description: 'Trek mountain bike, great for trails and city riding. Recently serviced.',
        price: 50,
        item_type: 'rent',
        category: 'Sports',
        condition: 'Good',
        images: [],
        created_at: '2024-01-10',
        user_name: 'Sarah Smith',
        location: 'Austin, TX'
      },
      {
        id: '3',
        title: 'Vintage Camera',
        description: 'Canon AE-1 film camera in working condition. Great for photography enthusiasts.',
        price: 150,
        item_type: 'auction',
        category: 'Electronics',
        condition: 'Good',
        images: [],
        created_at: '2024-01-12',
        user_name: 'Mike Johnson',
        location: 'Portland, OR'
      },
      {
        id: '4',
        title: 'Designer Sofa',
        description: 'Modern 3-seater sofa in excellent condition. Moving sale.',
        price: 800,
        item_type: 'sale',
        category: 'Furniture',
        condition: 'Excellent',
        images: [],
        created_at: '2024-01-08',
        user_name: 'Emily Chen',
        location: 'Seattle, WA'
      },
      {
        id: '5',
        title: 'Power Drill Set',
        description: 'Professional power drill with bits and case. Perfect for DIY projects.',
        price: 25,
        item_type: 'rent',
        category: 'Tools',
        condition: 'Good',
        images: [],
        created_at: '2024-01-14',
        user_name: 'David Wilson',
        location: 'Denver, CO'
      }
    ];
    
    setItems(mockItems);
    setFilteredItems(mockItems);
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = items;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(item => item.item_type === selectedType);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'newest':
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

    setFilteredItems(filtered);
  }, [items, searchTerm, selectedCategory, selectedType, sortBy]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'sale':
        return 'bg-green-100 text-green-800';
      case 'rent':
        return 'bg-blue-100 text-blue-800';
      case 'auction':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'sale':
        return 'For Sale';
      case 'rent':
        return 'For Rent';
      case 'auction':
        return 'Auction';
      default:
        return type;
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] pt-8 px-6 bg-primary-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-primary-900 mb-2">
            Browse Items
          </h1>
          <p className="text-primary-600">Discover amazing items from your community</p>
        </div>

        {/* Search and Filters */}
        <div className="card p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-primary-700 mb-2">
                Search
              </label>
              <div className="relative">
                <input
                  id="search"
                  type="text"
                  placeholder="Search items..."
                  className="input-field pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-primary-700 mb-2">
                Category
              </label>
              <select
                id="category"
                className="input-field"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Type */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-primary-700 mb-2">
                Type
              </label>
              <select
                id="type"
                className="input-field"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="all">All Types</option>
                {itemTypes.map(type => (
                  <option key={type} value={type}>{getTypeLabel(type)}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label htmlFor="sort" className="block text-sm font-medium text-primary-700 mb-2">
                Sort By
              </label>
              <select
                id="sort"
                className="input-field"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-primary-600">
            Showing {filteredItems.length} of {items.length} items
          </p>
        </div>

        {/* Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="card overflow-hidden hover:shadow-medium transition-shadow">
                {/* Image placeholder */}
                <div className="h-48 bg-primary-100 flex items-center justify-center">
                  <svg className="h-12 w-12 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>

                <div className="p-4">
                  {/* Type badge */}
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(item.item_type)}`}>
                      {getTypeLabel(item.item_type)}
                    </span>
                    <span className="text-primary-500 text-sm">{item.condition}</span>
                  </div>

                  {/* Title and price */}
                  <h3 className="font-semibold text-primary-900 mb-1">{item.title}</h3>
                  <p className="text-xl font-bold text-primary-900 mb-2">
                    ${item.price}
                    {item.item_type === 'rent' && <span className="text-sm font-normal text-primary-600">/day</span>}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-primary-600 mb-3 line-clamp-2">
                    {item.description}
                  </p>

                  {/* User and location */}
                  <div className="flex items-center justify-between text-sm text-primary-500 mb-4">
                    <span>{item.user_name}</span>
                    {item.location && <span>{item.location}</span>}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="flex-1 bg-primary-900 hover:bg-primary-800 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors">
                      {item.item_type === 'auction' ? 'Place Bid' : item.item_type === 'rent' ? 'Rent Now' : 'Buy Now'}
                    </button>
                    <button className="p-2 text-primary-600 hover:text-primary-900 hover:bg-primary-100 rounded-lg transition-colors">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="h-16 w-16 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-primary-900 mb-2">No items found</h3>
            <p className="text-primary-600 mb-4">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedType('all');
              }}
              className="btn-secondary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowsePage;
