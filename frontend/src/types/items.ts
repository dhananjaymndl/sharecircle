export interface ItemFilters {
  search?: string
  category_id?: string
  availability_type?: string
  condition?: string
  owner_id?: string
  is_available?: boolean
  sort_by?: 'created_at' | 'sale_price' | 'price_per_day' | 'title'
  sort_order?: 'asc' | 'desc'
  limit?: number
}

export interface CreateItemData {
  title: string
  description: string
  category_id?: string
  owner_id: string
  price_per_day?: number
  sale_price?: number
  deposit_amount?: number
  condition: string
  availability_type: 'rent' | 'sale' | 'both' | 'auction'
  location?: string
  latitude?: number
  longitude?: number
  images?: string[]
  tags?: string[]
}

export interface UpdateItemData {
  title?: string
  description?: string
  category_id?: string
  price_per_day?: number
  sale_price?: number
  deposit_amount?: number
  condition?: string
  availability_type?: 'rent' | 'sale' | 'both' | 'auction'
  is_available?: boolean
  location?: string
  latitude?: number
  longitude?: number
  images?: string[]
  tags?: string[]
}
