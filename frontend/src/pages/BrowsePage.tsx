import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Item } from '../lib/supabase';
import itemsService from '../services/itemsService';
import type { CreateItemData, UpdateItemData } from '../types/items';

const BrowsePage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState<'created_at' | 'sale_price' | 'price_per_day' | 'title'>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingItem, setDeletingItem] = useState<Item | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<CreateItemData>({
    title: '',
    description: '',
    owner_id: 'current-user-id', // TODO: Get from auth context
    availability_type: 'sale',
    condition: 'Good',
    location: ''
  });
  
  const categories = ['Electronics', 'Furniture', 'Clothing', 'Sports', 'Books', 'Tools', 'Other'];
  const itemTypes = ['sale', 'rent', 'auction'];
  const conditions = ['New', 'Like New', 'Good', 'Fair', 'Poor'];

  // Load items from Supabase
  useEffect(() => {
    loadItems();
  }, [searchTerm, selectedCategory, selectedType, sortBy, sortOrder]);

  const loadItems = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // For demo purposes, use mock data directly
      // In production, you would uncomment the API call below
      /*
      const filters = {
        search: searchTerm || undefined,
        category_id: selectedCategory !== 'all' ? selectedCategory : undefined,
        availability_type: selectedType !== 'all' ? selectedType : undefined,
        sort_by: sortBy,
        sort_order: sortOrder
      };
      
      const fetchedItems = await itemsService.getItems(filters);
      if (fetchedItems.length > 0) {
        setItems(fetchedItems);
        return;
      }
      */
      
      // Mock data for demonstration
      const mockItems: Item[] = [
        {
          id: '1',
          title: 'MacBook Pro 2021',
          description: 'Excellent condition M1 MacBook Pro with 16GB RAM and 512GB SSD.',
          sale_price: 1200,
          availability_type: 'sale',
          condition: 'Excellent',
          is_available: true,
          images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop'],
          created_at: '2024-01-15T10:00:00Z',
          updated_at: '2024-01-15T10:00:00Z',
          location: 'San Francisco, CA'
        },
        {
          id: '2',
          title: 'Mountain Bike',
          description: 'Trek mountain bike, great for trails and city riding.',
          price_per_day: 50,
          availability_type: 'rent',
          condition: 'Good',
          is_available: true,
          images: ['https://images.unsplash.com/photo-1601972590961-1b5b4517ad7e?w=400\u0026h=300\u0026fit=crop'],
          created_at: '2024-01-10T10:00:00Z',
          updated_at: '2024-01-10T10:00:00Z',
          location: 'Austin, TX'
        },
        {
          id: '3',
          title: 'Gaming PC',
          description: 'High-performance gaming PC with latest NVIDIA RTX graphics card.',
          sale_price: 1500,
          availability_type: 'sale',
          condition: 'Like New',
          is_available: true,
          images: ['https://images.unsplash.com/photo-1561154464-e6832c194a72?w=400\u0026h=300\u0026fit=crop'],
          created_at: '2024-01-20T10:00:00Z',
          updated_at: '2024-01-20T10:00:00Z',
          location: 'New York, NY'
        },
        {
          id: '4',
          title: 'Acoustic Guitar',
          description: 'Yamaha acoustic guitar in great condition, perfect for beginners.',
          sale_price: 200,
          availability_type: 'sale',
          condition: 'Good',
          is_available: true,
          images: ['https://images.unsplash.com/photo-1543699565-4bcdce961c7f?w=400&h=300&fit=crop'],
          created_at: '2024-02-05T10:00:00Z',
          updated_at: '2024-02-05T10:00:00Z',
          location: 'Los Angeles, CA'
        },
        {
          id: '5',
          title: 'Electric Drill',
          description: 'Bosch cordless electric drill with a full set of drill bits.',
          sale_price: 100,
          availability_type: 'sale',
          condition: 'Fair',
          is_available: true,
          images: ['https://images.unsplash.com/photo-1589319745646-a93ace643a21?w=400\u0026h=300\u0026fit=crop'],
          created_at: '2024-03-01T10:00:00Z',
          updated_at: '2024-03-01T10:00:00Z',
          location: 'Chicago, IL'
        },
        {
          id: '6',
          title: 'Tent',
          description: '4-person tent, great for camping during all seasons.',
          price_per_day: 30,
          availability_type: 'rent',
          condition: 'Excellent',
          is_available: true,
          images: ['https://images.unsplash.com/photo-1618229426311-2e6538af3ab7?w=400&h=300&fit=crop'],
          created_at: '2024-03-10T10:00:00Z',
          updated_at: '2024-03-10T10:00:00Z',
          location: 'Denver, CO'
        },
        {
          id: '7',
          title: 'Vintage Sofa',
          description: 'Elegant vintage sofa that adds character to any living room.',
          sale_price: 400,
          availability_type: 'sale',
          condition: 'Fair',
          is_available: true,
          images: ['https://images.unsplash.com/photo-1593642634367-d91a135587b5?w=400\u0026h=300\u0026fit=crop'],
          created_at: '2024-03-15T10:00:00Z',
          updated_at: '2024-03-15T10:00:00Z',
          location: 'Portland, OR'
        },
        {
          id: '8',
          title: 'Canon DSLR Camera',
          description: 'Canon EOS R5 with 24-70mm lens. Professional photography equipment.',
          price_per_day: 75,
          availability_type: 'rent',
          condition: 'Like New',
          is_available: true,
          images: ['https://images.unsplash.com/photo-1602394643174-6999dc7bf5cf?w=400&h=300&fit=crop'],
          created_at: '2024-03-20T10:00:00Z',
          updated_at: '2024-03-20T10:00:00Z',
          location: 'Seattle, WA'
        },
        {
          id: '9',
          title: 'Winter Jacket',
          description: 'North Face winter jacket, size M. Perfect for cold weather.',
          sale_price: 150,
          availability_type: 'sale',
          condition: 'Good',
          is_available: true,
          images: ['https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=300&fit=crop'],
          created_at: '2024-03-25T10:00:00Z',
          updated_at: '2024-03-25T10:00:00Z',
          location: 'Boston, MA'
        },
        {
          id: '10',
          title: 'Stand Mixer',
          description: 'KitchenAid stand mixer with multiple attachments. Perfect for baking.',
          sale_price: 300,
          availability_type: 'sale',
          condition: 'Excellent',
          is_available: true,
          images: ['https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&h=300&fit=crop'],
          created_at: '2024-04-01T10:00:00Z',
          updated_at: '2024-04-01T10:00:00Z',
          location: 'Miami, FL'
        },
        {
          id: '11',
          title: 'Exercise Bike',
          description: 'Peloton-style exercise bike with built-in screen and programs.',
          price_per_day: 25,
          availability_type: 'rent',
          condition: 'Good',
          is_available: true,
          images: ['https://images.unsplash.com/photo-1605296867304-46d5465a13f2?w=400\u0026h=300\u0026fit=crop'],
          created_at: '2024-04-05T10:00:00Z',
          updated_at: '2024-04-05T10:00:00Z',
          location: 'Phoenix, AZ'
        },
        {
          id: '12',
          title: 'Programming Books Set',
          description: 'Collection of 10 programming books including JavaScript, Python, and React.',
          sale_price: 120,
          availability_type: 'sale',
          condition: 'Like New',
          is_available: true,
          images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop'],
          created_at: '2024-04-10T10:00:00Z',
          updated_at: '2024-04-10T10:00:00Z',
          location: 'San Jose, CA'
        }
      ];
      setItems(mockItems);
    } finally {
      setLoading(false);
    }
  };

  // CRUD Operations
  const handleCreateItem = async () => {
    try {
      setLoading(true);
      const newItem = await itemsService.createItem(formData);
      setItems(prev => [newItem, ...prev]);
      setShowAddModal(false);
      resetForm();
    } catch (err) {
      console.error('Error creating item:', err);
      setError('Failed to create item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateItem = async () => {
    if (!editingItem) return;
    
    try {
      setLoading(true);
      const updates: UpdateItemData = {
        title: formData.title,
        description: formData.description,
        availability_type: formData.availability_type,
        condition: formData.condition,
        location: formData.location
      };
      
      const updatedItem = await itemsService.updateItem(editingItem.id, updates);
      setItems(prev => prev.map(item => item.id === editingItem.id ? updatedItem : item));
      setShowEditModal(false);
      setEditingItem(null);
      resetForm();
    } catch (err) {
      console.error('Error updating item:', err);
      setError('Failed to update item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async () => {
    if (!deletingItem) return;
    
    try {
      setLoading(true);
      await itemsService.deleteItem(deletingItem.id);
      setItems(prev => prev.filter(item => item.id !== deletingItem.id));
      setShowDeleteModal(false);
      setDeletingItem(null);
    } catch (err) {
      console.error('Error deleting item:', err);
      setError('Failed to delete item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Form helpers
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      owner_id: 'current-user-id',
      availability_type: 'sale',
      condition: 'Good',
      location: ''
    });
  };

  const openEditModal = (item: Item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      owner_id: item.owner_id || 'current-user-id',
      availability_type: item.availability_type,
      condition: item.condition,
      location: item.location || ''
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (item: Item) => {
    setDeletingItem(item);
    setShowDeleteModal(true);
  };

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
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold text-primary-900 mb-2">
              Browse Items
            </h1>
            <p className="text-primary-600">Discover amazing items from your community</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Item
          </button>
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

          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-primary-600">
            Showing {items.length} items
          </p>
        </div>

        {/* Items Grid */}
        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <Link 
                key={item.id} 
                to={`/items/${item.id}`}
                className="card overflow-hidden hover:shadow-medium transition-shadow cursor-pointer block"
              >
                {/* Image */}
                <div className="h-48 bg-primary-100 overflow-hidden">
                  {item.images && item.images.length > 0 ? (
                    <img 
                      src={item.images[0]} 
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="h-12 w-12 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  {/* Type badge */}
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(item.availability_type)}`}>
                      {getTypeLabel(item.availability_type)}
                    </span>
                    <span className="text-primary-500 text-sm">{item.condition}</span>
                  </div>

                  {/* Title and price */}
                  <h3 className="font-semibold text-primary-900 mb-1">{item.title}</h3>
                  <p className="text-xl font-bold text-primary-900 mb-2">
                    ${item.availability_type === 'sale' ? item.sale_price : item.price_per_day}
                    {item.availability_type === 'rent' && <span className="text-sm font-normal text-primary-600">/day</span>}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-primary-600 mb-3 line-clamp-2">
                    {item.description}
                  </p>

                  {/* User and location */}
                  <div className="flex items-center justify-between text-sm text-primary-500 mb-4">
                    <span>{item.owner?.name || 'User'}</span>
                    {item.location && <span>{item.location}</span>}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="flex-1 bg-primary-900 hover:bg-primary-800 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors">
                      {item.availability_type === 'auction' ? 'Place Bid' : item.availability_type === 'rent' ? 'Rent Now' : 'Buy Now'}
                    </button>
                    <button className="p-2 text-primary-600 hover:text-primary-900 hover:bg-primary-100 rounded-lg transition-colors">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </Link>
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
