import { supabase } from '../lib/supabase'
import type { Item, Category } from '../lib/supabase'
import type { ItemFilters, CreateItemData, UpdateItemData } from '../types/items'

class ItemsService {
  // CREATE - Add new item
  async createItem(itemData: CreateItemData): Promise<Item> {
    const { data, error } = await supabase
      .from('items')
      .insert([itemData])
      .select()
      .single()

    if (error) {
      console.error('Error creating item:', error)
      throw new Error(error.message)
    }

    return data
  }

  // READ - Get all items with filters and joins
  async getItems(filters: ItemFilters = {}): Promise<Item[]> {
    let query = supabase
      .from('items')
      .select(`
        *,
        categories (id, name, description, icon),
        users (id, name, email, location, avatar_url)
      `)
      .eq('is_available', true)

    // Apply search filter
    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
    }

    // Apply category filter
    if (filters.category_id && filters.category_id !== 'all') {
      query = query.eq('category_id', filters.category_id)
    }

    // Apply availability type filter
    if (filters.availability_type && filters.availability_type !== 'all') {
      query = query.eq('availability_type', filters.availability_type)
    }

    // Apply condition filter
    if (filters.condition) {
      query = query.eq('condition', filters.condition)
    }

    // Apply owner filter
    if (filters.owner_id) {
      query = query.eq('owner_id', filters.owner_id)
    }

    // Apply availability filter
    if (filters.is_available !== undefined) {
      query = query.eq('is_available', filters.is_available)
    }

    // Apply sorting
    const sortBy = filters.sort_by || 'created_at'
    const sortOrder = filters.sort_order || 'desc'
    query = query.order(sortBy, { ascending: sortOrder === 'asc' })

    // Apply limit
    if (filters.limit) {
      query = query.limit(filters.limit)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching items:', error)
      throw new Error(error.message)
    }

    return data || []
  }

  // Get all categories for dropdown filters
  async getCategories(): Promise<Category[]> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')

    if (error) {
      console.error('Error fetching categories:', error)
      throw new Error(error.message)
    }

    return data || []
  }

  // READ - Get single item by ID
  async getItemById(id: string): Promise<Item | null> {
    const { data, error } = await supabase
      .from('items')
      .select('*')
      .eq('id', id)
      .eq('is_available', true)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null // Item not found
      }
      console.error('Error fetching item:', error)
      throw new Error(error.message)
    }

    return data
  }

  // UPDATE - Update existing item
  async updateItem(id: string, updates: UpdateItemData): Promise<Item> {
    const { data, error } = await supabase
      .from('items')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating item:', error)
      throw new Error(error.message)
    }

    return data
  }

  // DELETE - Soft delete item (set is_available to false)
  async deleteItem(id: string): Promise<void> {
    const { error } = await supabase
      .from('items')
      .update({ 
        is_available: false,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)

    if (error) {
      console.error('Error deleting item:', error)
      throw new Error(error.message)
    }
  }

  // DELETE - Permanently delete item (use with caution)
  async permanentlyDeleteItem(id: string): Promise<void> {
    const { error } = await supabase
      .from('items')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error permanently deleting item:', error)
      throw new Error(error.message)
    }
  }

  // UTILITY - Get items by user
  async getItemsByUser(userId: string): Promise<Item[]> {
    const { data, error } = await supabase
      .from('items')
      .select('*')
      .eq('owner_id', userId)
      .eq('is_available', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching user items:', error)
      throw new Error(error.message)
    }

    return data || []
  }

  // UTILITY - Toggle item availability status
  async toggleItemStatus(id: string): Promise<Item> {
    // First get the current status
    const { data: currentItem, error: fetchError } = await supabase
      .from('items')
      .select('is_available')
      .eq('id', id)
      .single()

    if (fetchError) {
      throw new Error(fetchError.message)
    }

    // Toggle the status
    const { data, error } = await supabase
      .from('items')
      .update({ 
        is_available: !currentItem.is_available,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error toggling item status:', error)
      throw new Error(error.message)
    }

    return data
  }
}

export const itemsService = new ItemsService()
export default itemsService

// Re-export types to ensure they're available
export type { ItemFilters, CreateItemData, UpdateItemData }
