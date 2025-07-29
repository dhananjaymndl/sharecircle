import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
  user_email: string;
  user_phone?: string;
  location?: string;
  status: string;
}

const ItemDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<Item | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showContactModal, setShowContactModal] = useState(false);

  useEffect(() => {
    fetchItem();
  }, [id]);

  const fetchItem = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/items/${id}`);
      const data = await response.json();

      if (data.success) {
        setItem(data.data);
      } else {
        setError(data.message || 'Item not found');
      }
    } catch (err) {
      setError('Failed to load item');
    } finally {
      setIsLoading(false);
    }
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

  const handleContact = () => {
    setShowContactModal(true);
  };

  const handleBooking = () => {
    // Navigate to booking page or show booking modal
    navigate(`/booking/${id}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-64px)] pt-8 px-6 bg-primary-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-[calc(100vh-64px)] pt-8 px-6 bg-primary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="h-16 w-16 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-primary-900 mb-2">Item not found</h3>
          <p className="text-primary-600 mb-4">{error}</p>
          <button onClick={() => navigate('/browse')} className="btn-primary">
            Back to Browse
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] pt-8 px-6 bg-primary-50">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/browse')}
          className="flex items-center text-primary-600 hover:text-primary-900 mb-6 transition-colors"
        >
          <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Browse
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-primary-100 rounded-lg flex items-center justify-center">
              <svg className="h-24 w-24 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>

            {/* Thumbnail placeholder */}
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((index) => (
                <div key={index} className="aspect-square bg-primary-100 rounded-lg"></div>
              ))}
            </div>
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getTypeColor(item.item_type)}`}>
                  {getTypeLabel(item.item_type)}
                </span>
                <span className="text-primary-500 text-sm">{item.condition}</span>
              </div>
              <h1 className="text-3xl font-semibold text-primary-900 mb-2">{item.title}</h1>
              <p className="text-3xl font-bold text-primary-900 mb-4">
                ${item.price}
                {item.item_type === 'rent' && <span className="text-lg font-normal text-primary-600">/day</span>}
              </p>
            </div>

            {/* Item Info */}
            <div className="card p-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-primary-600">Category:</span>
                  <span className="ml-2 font-medium text-primary-900">{item.category}</span>
                </div>
                <div>
                  <span className="text-primary-600">Condition:</span>
                  <span className="ml-2 font-medium text-primary-900">{item.condition}</span>
                </div>
                {item.location && (
                  <div className="col-span-2">
                    <span className="text-primary-600">Location:</span>
                    <span className="ml-2 font-medium text-primary-900">{item.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-primary-900 mb-3">Description</h3>
              <p className="text-primary-700 leading-relaxed">{item.description}</p>
            </div>

            {/* Seller Info */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-primary-900 mb-3">Seller Information</h3>
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-primary-200 rounded-full flex items-center justify-center">
                  <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-primary-900">{item.user_name}</p>
                  <p className="text-sm text-primary-600">Listed {new Date(item.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={handleBooking}
                className="w-full btn-primary text-lg py-3"
              >
                {item.item_type === 'auction' ? 'Place Bid' : item.item_type === 'rent' ? 'Rent Now' : 'Buy Now'}
              </button>
              <button
                onClick={handleContact}
                className="w-full btn-secondary text-lg py-3"
              >
                Contact Seller
              </button>
            </div>
          </div>
        </div>

        {/* Contact Modal */}
        {showContactModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-primary-900">Contact Seller</h3>
                <button
                  onClick={() => setShowContactModal(false)}
                  className="text-primary-400 hover:text-primary-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-primary-600">Name:</p>
                  <p className="font-medium text-primary-900">{item.user_name}</p>
                </div>
                <div>
                  <p className="text-sm text-primary-600">Email:</p>
                  <p className="font-medium text-primary-900">{item.user_email}</p>
                </div>
                {item.user_phone && (
                  <div>
                    <p className="text-sm text-primary-600">Phone:</p>
                    <p className="font-medium text-primary-900">{item.user_phone}</p>
                  </div>
                )}
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowContactModal(false)}
                  className="flex-1 btn-secondary"
                >
                  Close
                </button>
                <a
                  href={`mailto:${item.user_email}?subject=Interested in ${item.title}`}
                  className="flex-1 btn-primary text-center"
                >
                  Send Email
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemDetailPage;
