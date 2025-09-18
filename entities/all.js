// Central export file for all entities
// This file provides a single import point for all entity classes
import { BaseEntity, supabase } from './supabase'

export class User extends BaseEntity {
  static tableName = 'users'
  
  static async me() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null
    
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    
    // If user doesn't exist in users table, create it
    if (!data) {
      const newUser = {
        id: user.id,
        email: user.email,
        full_name: user.user_metadata?.full_name || user.email,
        weight: null,
        height: null,
        birth_date: null,
        gender: null
      }
      return await this.create(newUser)
    }
    
    return data
  }

  static async logout() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return true
  }

  static async updateMyUserData(data) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')
    
    return await this.update(user.id, data)
  }
}

export class UserGoal extends BaseEntity {
  static tableName = 'user_goals'
  
  static async filter(criteria) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')
    
    return await super.filter({ ...criteria, user_id: user.id })
  }
  
  static async create(data) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')
    
    return await super.create({ ...data, user_id: user.id })
  }
}

export class DailyProgress extends BaseEntity {
  static tableName = 'daily_progress'
  
  static async filter(criteria, order = null, limit = null) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')
    
    return await super.filter({ ...criteria, user_id: user.id }, order, limit)
  }
  
  static async create(data) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')
    
    return await super.create({ ...data, user_id: user.id })
  }
}

export class UserLevel extends BaseEntity {
  static tableName = 'user_levels'
  
  static async filter(criteria) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')
    
    return await super.filter({ ...criteria, user_id: user.id })
  }
  
  static async create(data) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')
    
    return await super.create({ ...data, user_id: user.id })
  }
}

export class Food extends BaseEntity {
  static tableName = 'foods'
}
