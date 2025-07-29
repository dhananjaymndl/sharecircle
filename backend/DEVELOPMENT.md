# ShareCircle MVP Development Guide

## Sprint 1 Status ✅

**Completed Features:**
- ✅ Backend API setup (Node.js + Express)
- ✅ Supabase (PostgreSQL) integration 
- ✅ Authentication system (JWT)
- ✅ User registration and login
- ✅ Database schema creation
- ✅ API structure and middleware
- ✅ Input validation and security

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (for PostgreSQL database)

### Backend Setup

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Configuration**
   - Copy `.env.example` to `.env`
   - Update the following required variables:
     - `SUPABASE_URL`: Your Supabase project URL
     - `SUPABASE_ANON_KEY`: Your Supabase anonymous key
     - `JWT_SECRET`: A strong secret for JWT tokens

3. **Database Setup**
   - Go to your Supabase dashboard
   - Navigate to SQL Editor
   - Run the SQL script from `database/schema.sql`
   - This will create all tables, indexes, and RLS policies

4. **Start Development Server**
   ```bash
   npm run dev
   ```
   Server will start on `http://localhost:5000`

### API Endpoints (Sprint 1)

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get current user profile (Protected)
- `PUT /api/auth/profile` - Update user profile (Protected)
- `PUT /api/auth/password` - Update password (Protected)

#### Health Check
- `GET /health` - Server health status

### Example API Usage

#### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123",
    "name": "John Doe",
    "phone": "+1234567890",
    "location": "New York, NY"
  }'
```

#### Login User  
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### Get Profile (with JWT token)
```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### Database Schema Overview

**Core Tables:**
- `users` - User accounts and profiles
- `categories` - Item categories (Electronics, Tools, etc.)
- `items` - Item listings for rent/sale/auction
- `bookings` - Rental bookings and management
- `messages` - Chat system
- `notifications` - Push notifications
- `reviews` - User ratings and reviews

### Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Input validation and sanitization
- ✅ Rate limiting (100 requests per 15 minutes)
- ✅ CORS protection
- ✅ Helmet.js security headers
- ✅ Row Level Security (RLS) in database

### Coming in Sprint 2 (Weeks 3-4)

- 🔄 Item listing CRUD APIs
- 🔄 Image upload (AWS S3) 
- 🔄 Search & Filters (category, location)
- 🔄 Frontend React application

### Coming in Sprint 3 (Weeks 5-6)

- 🔄 Booking system (conflict detection, rental logic)
- 🔄 Payment gateway (Stripe/PayPal) integration  
- 🔄 Notifications (Firebase Cloud Messaging)

### Coming in Sprint 4 (Weeks 7-8)

- 🔄 Real-time chat module (WebSockets)
- 🔄 User ratings system
- 🔄 Admin dashboard (basic)

### Coming in Sprint 5 (Weeks 9-10)

- 🔄 Testing (unit, integration, E2E)
- 🔄 Performance optimizations
- 🔄 Beta deployment
- 🔄 Bug fixes and polish

## Architecture Notes

The backend follows a **modular, microservices-ready architecture**:

```
src/
├── config/        # Database and service configurations
├── controllers/   # Request handling logic
├── middleware/    # Authentication, validation, etc.
├── models/        # Database models and operations
├── routes/        # API route definitions
├── services/      # Business logic and external integrations
└── utils/         # Helper functions and utilities
```

## Error Handling

All API responses follow a consistent format:
```json
{
  "success": true|false,
  "message": "Response message",
  "data": {...},  // Only on success
  "errors": [...] // Only on validation errors
}
```

## Testing

Run tests with:
```bash
npm test
```
*(Test suite will be implemented in Sprint 5)*

## Environment Variables

See `.env.example` for all required environment variables. Key variables:

- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `JWT_SECRET` - Secret for JWT token signing
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_ANON_KEY` - Supabase anonymous key

---

## Next Steps

1. **Set up Supabase database** - Run the schema.sql script
2. **Configure environment variables** - Update .env file
3. **Start the server** - `npm run dev`
4. **Test authentication** - Use the API examples above
5. **Begin Sprint 2** - Implement item listing features

For questions or issues, refer to the main README.md technical specification.
