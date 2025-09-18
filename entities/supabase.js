// Supabase client configuration
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Base class for all entities
export class BaseEntity {
  static tableName = ''
  
  static async list(orderBy = 'created_at', limit = null) {
    let query = supabase.from(this.tableName).select('*')
    
    if (orderBy.startsWith('-')) {
      query = query.order(orderBy.substring(1), { ascending: false })
    } else {
      query = query.order(orderBy)
    }
    
    if (limit) {
      query = query.limit(limit)
    }
    
    const { data, error } = await query
    if (error) throw error
    return data
  }
  
  static async filter(criteria, orderBy = null, limit = null) {
    let query = supabase.from(this.tableName).select('*')
    
    Object.entries(criteria).forEach(([key, value]) => {
      query = query.eq(key, value)
    })
    
    if (orderBy) {
      if (orderBy.startsWith('-')) {
        query = query.order(orderBy.substring(1), { ascending: false })
      } else {
        query = query.order(orderBy)
      }
    }
    
    if (limit) {
      query = query.limit(limit)
    }
    
    const { data, error } = await query
    if (error) throw error
    return data
  }
  
  static async create(data) {
    const { data: result, error } = await supabase
      .from(this.tableName)
      .insert([data])
      .select()
      .single()
    
    if (error) throw error
    return result
  }
  
  static async update(id, data) {
    const { data: result, error } = await supabase
      .from(this.tableName)
      .update(data)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return result
  }
  
  static async delete(id) {
    const { error } = await supabase
      .from(this.tableName)
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  }
}
