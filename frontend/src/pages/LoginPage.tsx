import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-16 px-6">
      <div className="w-full max-w-sm animate-fade-in">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-semibold text-primary-900 mb-2">
            Welcome back
          </h1>
          <p className="text-sm text-primary-600">
            Sign in to continue to ShareCircle
          </p>
        </div>
        
        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="error-message animate-slide-up">
                {error}
              </div>
            )}
            
            <div className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-primary-700 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="input-field"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-primary-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="input-field"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="loading-spinner h-4 w-4 mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </button>
          </form>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-sm text-primary-600">
            Don't have an account?{' '}
            <Link to="/register" className="link">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
