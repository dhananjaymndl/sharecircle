-- ShareCircle Database Schema
-- This script creates the database tables for the MVP

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable btree_gist extension for advanced data types
CREATE EXTENSION IF NOT EXISTS btree_gist;

-- Enable PostGIS for location-based queries (optional for future use)
CREATE EXTENSION IF NOT EXISTS postgis;

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    location TEXT,
    role VARCHAR(20) DEFAULT 'user',
    avatar_url TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Categories table for item classification
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert default categories
INSERT INTO categories (name, description, icon) VALUES
('Electronics', 'Electronic devices and gadgets', 'electronics'),
('Home & Garden', 'Home appliances and garden tools', 'home'),
('Tools', 'Hand tools and power tools', 'tools'),
('Sports & Outdoors', 'Sports equipment and outdoor gear', 'sports'),
('Books & Media', 'Books, DVDs, and media content', 'books'),
('Clothing & Accessories', 'Clothing and fashion accessories', 'clothing'),
('Vehicles', 'Cars, bikes, and other vehicles', 'vehicles'),
('Services', 'Service offerings', 'services'),
('Other', 'Miscellaneous items', 'other');

-- Items table for listings
CREATE TABLE items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
    price_per_day DECIMAL(10, 2),
    sale_price DECIMAL(10, 2),
    deposit_amount DECIMAL(10, 2),
    condition VARCHAR(20) DEFAULT 'good', -- new, excellent, good, fair, poor
    availability_type VARCHAR(20) NOT NULL, -- rent, sale, both, auction
    is_available BOOLEAN DEFAULT TRUE,
    location TEXT,
    -- Geolocation for future proximity searches
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    images TEXT[], -- Array of image URLs
    tags TEXT[], -- Array of search tags
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Bookings table for rental management
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    item_id UUID REFERENCES items(id) ON DELETE CASCADE,
    renter_id UUID REFERENCES users(id) ON DELETE CASCADE,
    owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    deposit_amount DECIMAL(10, 2),
    status VARCHAR(20) DEFAULT 'pending', -- pending, confirmed, active, completed, cancelled
    payment_status VARCHAR(20) DEFAULT 'pending', -- pending, paid, refunded, partial
    payment_intent_id VARCHAR(255), -- Stripe payment intent ID
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    -- Prevent double bookings for the same dates
    CONSTRAINT no_overlap EXCLUDE USING gist (
        item_id WITH =,
        daterange(start_date, end_date, '[]') WITH &&
    ) WHERE (status NOT IN ('cancelled', 'completed'))
);

-- Auctions table for bidding functionality (Phase 2)
CREATE TABLE auctions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    item_id UUID REFERENCES items(id) ON DELETE CASCADE,
    starting_price DECIMAL(10, 2) NOT NULL,
    current_price DECIMAL(10, 2) NOT NULL,
    buy_now_price DECIMAL(10, 2),
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(20) DEFAULT 'active', -- active, ended, cancelled
    winner_id UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Bids table for auction bids
CREATE TABLE bids (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    auction_id UUID REFERENCES auctions(id) ON DELETE CASCADE,
    bidder_id UUID REFERENCES users(id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Messages table for chat functionality
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL, -- Unique identifier for conversation between two users
    sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
    receiver_id UUID REFERENCES users(id) ON DELETE CASCADE,
    item_id UUID REFERENCES items(id) ON DELETE SET NULL,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Notifications table
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- booking_request, booking_confirmed, message, late_return, etc.
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    data JSONB, -- Additional data for the notification
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Reviews table for user ratings
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    reviewer_id UUID REFERENCES users(id) ON DELETE CASCADE,
    reviewee_id UUID REFERENCES users(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    -- Ensure one review per booking per reviewer
    UNIQUE(booking_id, reviewer_id)
);

-- Indexes for performance
CREATE INDEX idx_items_owner_id ON items(owner_id);
CREATE INDEX idx_items_category_id ON items(category_id);
CREATE INDEX idx_items_availability_type ON items(availability_type);
CREATE INDEX idx_items_is_available ON items(is_available);
CREATE INDEX idx_items_created_at ON items(created_at DESC);
CREATE INDEX idx_items_location ON items USING gin(to_tsvector('english', location));

CREATE INDEX idx_bookings_item_id ON bookings(item_id);
CREATE INDEX idx_bookings_renter_id ON bookings(renter_id);
CREATE INDEX idx_bookings_owner_id ON bookings(owner_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_dates ON bookings(start_date, end_date);

CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_receiver_id ON messages(receiver_id);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);

-- Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE items ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users can read their own profile and public profiles of others
CREATE POLICY "Users can view public profiles" ON users
    FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Items policies
CREATE POLICY "Anyone can view available items" ON items
    FOR SELECT USING (is_available = true);

CREATE POLICY "Owners can manage their items" ON items
    FOR ALL USING (auth.uid() = owner_id);

CREATE POLICY "Authenticated users can create items" ON items
    FOR INSERT WITH CHECK (auth.uid() = owner_id);

-- Bookings policies
CREATE POLICY "Users can view their bookings" ON bookings
    FOR SELECT USING (auth.uid() = renter_id OR auth.uid() = owner_id);

CREATE POLICY "Users can create bookings" ON bookings
    FOR INSERT WITH CHECK (auth.uid() = renter_id);

CREATE POLICY "Owners and renters can update booking status" ON bookings
    FOR UPDATE USING (auth.uid() = renter_id OR auth.uid() = owner_id);

-- Messages policies
CREATE POLICY "Users can view their messages" ON messages
    FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can send messages" ON messages
    FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Notifications policies
CREATE POLICY "Users can view their notifications" ON notifications
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their notifications" ON notifications
    FOR UPDATE USING (auth.uid() = user_id);

-- Reviews policies
CREATE POLICY "Anyone can view reviews" ON reviews
    FOR SELECT USING (true);

CREATE POLICY "Users can create reviews for their bookings" ON reviews
    FOR INSERT WITH CHECK (
        auth.uid() = reviewer_id AND
        EXISTS (
            SELECT 1 FROM bookings 
            WHERE id = booking_id 
            AND (renter_id = auth.uid() OR owner_id = auth.uid())
            AND status = 'completed'
        )
    );

-- Functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_items_updated_at BEFORE UPDATE ON items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_auctions_updated_at BEFORE UPDATE ON auctions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
