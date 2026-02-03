import { initializeApp, getApps } from 'firebase/app'
import { 
  getAuth, 
  signInAnonymously, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged 
} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// 应用 ID
export const APP_ID = 'life-archive-prod'

// 延迟初始化 Firebase（仅在配置存在时）
let app = null
let auth = null
let db = null

/**
 * 检查 Firebase 配置是否完整
 */
const hasFirebaseConfig = () => {
  const config = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  }
  
  return config.apiKey && 
         config.apiKey !== 'your_firebase_api_key' &&
         config.authDomain &&
         config.projectId
}

/**
 * 初始化 Firebase（仅在配置存在时）
 */
const initFirebase = () => {
  if (!hasFirebaseConfig()) {
    console.warn('Firebase 配置缺失，使用演示模式')
    return false
  }

  if (app) {
    return true // 已经初始化
  }

  try {
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
    }

    // 检查是否已经初始化
    const existingApps = getApps()
    if (existingApps.length > 0) {
      app = existingApps[0]
    } else {
      app = initializeApp(firebaseConfig)
    }

    auth = getAuth(app)
    db = getFirestore(app)
    return true
  } catch (error) {
    console.error('Firebase 初始化失败:', error)
    return false
  }
}

// 导出 auth 和 db（延迟初始化）
export const getAuthInstance = () => {
  if (!auth && hasFirebaseConfig()) {
    initFirebase()
  }
  return auth
}

export const getDbInstance = () => {
  if (!db && hasFirebaseConfig()) {
    initFirebase()
  }
  return db
}

/**
 * 监听认证状态变化
 * @param {Function} callback - 回调函数 (user) => void
 * @returns {Function} 取消监听的函数
 */
export const onAuthStateChange = (callback) => {
  if (!initFirebase()) {
    callback(null)
    return () => {}
  }

  return onAuthStateChanged(auth, (user) => {
    callback(user)
  })
}

/**
 * 邮箱密码登录
 * @param {string} email - 邮箱
 * @param {string} password - 密码
 * @returns {Promise<User>}
 */
export const loginWithEmail = async (email, password) => {
  if (!initFirebase()) {
    throw new Error('Firebase 未初始化')
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error) {
    let errorMessage = '登录失败'
    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage = '用户不存在'
        break
      case 'auth/wrong-password':
        errorMessage = '密码错误'
        break
      case 'auth/invalid-email':
        errorMessage = '邮箱格式不正确'
        break
      case 'auth/user-disabled':
        errorMessage = '用户已被禁用'
        break
      case 'auth/too-many-requests':
        errorMessage = '请求过于频繁，请稍后再试'
        break
      default:
        errorMessage = error.message || '登录失败'
    }
    throw new Error(errorMessage)
  }
}

/**
 * 邮箱密码注册
 * @param {string} email - 邮箱
 * @param {string} password - 密码
 * @returns {Promise<User>}
 */
export const registerWithEmail = async (email, password) => {
  if (!initFirebase()) {
    throw new Error('Firebase 未初始化')
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error) {
    let errorMessage = '注册失败'
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = '该邮箱已被注册'
        break
      case 'auth/invalid-email':
        errorMessage = '邮箱格式不正确'
        break
      case 'auth/weak-password':
        errorMessage = '密码过于简单，至少需要6个字符'
        break
      default:
        errorMessage = error.message || '注册失败'
    }
    throw new Error(errorMessage)
  }
}

/**
 * 登出
 * @returns {Promise<void>}
 */
export const logout = async () => {
  if (!initFirebase()) {
    return
  }

  try {
    await signOut(auth)
  } catch (error) {
    console.error('登出失败:', error)
    throw new Error('登出失败')
  }
}

/**
 * 匿名登录并返回用户 ID（向后兼容）
 * 支持从 URL 参数或 localStorage 获取初始 token
 */
export const initializeAuth = () => {
  return new Promise((resolve, reject) => {
    if (!initFirebase()) {
      // 配置缺失，返回演示用户 ID
      resolve('demo-user')
      return
    }

    // 检查是否已有用户
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        resolve(user.uid)
        return
      }

      // 如果没有用户，不自动匿名登录，返回null让用户手动登录
      resolve(null)
    })
  })
}

/**
 * 获取用户记录集合的路径段数组（用于 Firestore collection/doc）
 */
export const getRecordsPath = (userId) => {
  return ['artifacts', APP_ID, 'users', userId, 'records']
}
