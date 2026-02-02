import { signInAnonymously } from 'firebase/auth'
import { auth } from './client'

export async function ensureAnonymousAuth() {
  if (auth.currentUser) {
    return auth.currentUser
  }
  
  try {
    const result = await signInAnonymously(auth)
    return result.user
  } catch (error) {
    console.error('Anonymous auth failed:', error)
    throw error
  }
}

export function getCurrentUser() {
  return auth.currentUser
}
