import { createClient } from '@supabase/supabase-js'

// Supabase 配置
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// 创建 Supabase 客户端
let supabase = null

/**
 * 获取 Supabase 客户端实例
 */
export const getSupabaseClient = () => {
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'your_supabase_url') {
    console.warn('Supabase 配置缺失，使用演示模式')
    return null
  }

  if (!supabase) {
    supabase = createClient(supabaseUrl, supabaseAnonKey)
  }

  return supabase
}

/**
 * 检查 Supabase 是否已配置
 */
export const isSupabaseConfigured = () => {
  return supabaseUrl && 
         supabaseAnonKey && 
         supabaseUrl !== 'your_supabase_url' &&
         supabaseAnonKey !== 'your_supabase_anon_key'
}

/**
 * 监听认证状态变化
 * @param {Function} callback - 回调函数 (user) => void
 * @returns {Function} 取消监听的函数
 */
export const onAuthStateChange = (callback) => {
  const client = getSupabaseClient()
  if (!client) {
    callback(null)
    return () => {}
  }

  const { data: { subscription } } = client.auth.onAuthStateChange((event, session) => {
    callback(session?.user || null)
  })

  // 立即检查当前用户
  client.auth.getSession().then(({ data: { session } }) => {
    callback(session?.user || null)
  })

  return () => {
    subscription.unsubscribe()
  }
}

/**
 * 邮箱密码登录
 * @param {string} email - 邮箱
 * @param {string} password - 密码
 * @returns {Promise<User>}
 */
export const loginWithEmail = async (email, password) => {
  const client = getSupabaseClient()
  if (!client) {
    throw new Error('Supabase 未初始化')
  }

  try {
    const { data, error } = await client.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      let errorMessage = '登录失败'
      switch (error.message) {
        case 'Invalid login credentials':
          errorMessage = '邮箱或密码错误'
          break
        case 'Email not confirmed':
          errorMessage = '请先验证邮箱'
          break
        default:
          errorMessage = error.message || '登录失败'
      }
      throw new Error(errorMessage)
    }

    return data.user
  } catch (error) {
    throw error
  }
}

/**
 * 邮箱密码注册
 * @param {string} email - 邮箱
 * @param {string} password - 密码
 * @returns {Promise<User>}
 */
export const registerWithEmail = async (email, password) => {
  const client = getSupabaseClient()
  if (!client) {
    throw new Error('Supabase 未初始化')
  }

  try {
    const { data, error } = await client.auth.signUp({
      email,
      password,
    })

    if (error) {
      let errorMessage = '注册失败'
      switch (error.message) {
        case 'User already registered':
          errorMessage = '该邮箱已被注册'
          break
        case 'Password should be at least 6 characters':
          errorMessage = '密码至少需要6个字符'
          break
        default:
          errorMessage = error.message || '注册失败'
      }
      throw new Error(errorMessage)
    }

    return data.user
  } catch (error) {
    throw error
  }
}

/**
 * 登出
 * @returns {Promise<void>}
 */
export const logout = async () => {
  const client = getSupabaseClient()
  if (!client) {
    return
  }

  try {
    const { error } = await client.auth.signOut()
    if (error) {
      throw error
    }
  } catch (error) {
    console.error('登出失败:', error)
    throw new Error('登出失败')
  }
}

/**
 * 获取用户记录集合的表名
 */
export const getRecordsTableName = () => {
  return 'life_events'
}
