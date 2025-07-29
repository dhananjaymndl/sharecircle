import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.')
  console.error('Required variables: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY')
}

// Use placeholder values that won't cause URL construction errors if env vars are missing
const fallbackUrl = 'https://placeholder.supabase.co'
const fallbackKey = 'placeholder-key'

export const supabase = createClient(
  supabaseUrl || fallbackUrl, 
  supabaseKey || fallbackKey
)

// Types for our database matching existing schema
export interface User {
  id: string
  email: string
  name: string
  phone?: string
  location?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  description?: string
  icon?: string
  created_at: string
}

export interface Item {
  id: string
  title: string
  description: string
  category_id?: string
  owner_id?: string
  price_per_day?: number
  sale_price?: number
  deposit_amount?: number
  condition: string // 'new' | 'excellent' | 'good' | 'fair' | 'poor'
  availability_type: 'rent' | 'sale' | 'both' | 'auction'
  is_available: boolean
  location?: string
  latitude?: number
  longitude?: number
  images?: string[]
  tags?: string[]
  created_at: string
  updated_at: string
  // Joined fields for convenience
  category?: Category
  owner?: User
}

export interface Database {
  public: {
    Tables: {
      users: {
        Row: User
        Insert: Omit<User, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<User, 'id' | 'created_at'>>
      }
      categories: {
        Row: Category
        Insert: Omit<Category, 'id' | 'created_at'>
        Update: Partial<Omit<Category, 'id' | 'created_at'>>
      }
      items: {
        Row: Item
        Insert: Omit<Item, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Item, 'id' | 'created_at'>>
      }
    }
  }
}
