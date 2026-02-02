import { ref, push, set, onValue, off } from 'firebase/database'
import { db } from './client'
import { getCurrentUser } from './auth'

export async function createSession(intakeData) {
  const user = getCurrentUser()
  if (!user) throw new Error('User not authenticated')

  const sessionRef = push(ref(db, 'sessions'))
  const sessionId = sessionRef.key

  const sessionData = {
    ownerUid: user.uid,
    createdAt: Date.now(),
    status: 'submitted',
    intake: intakeData
  }

  await set(sessionRef, sessionData)
  return sessionId
}

export function listenToSessionResult(sessionId, callback) {
  const resultRef = ref(db, `sessions/${sessionId}/result`)
  onValue(resultRef, (snapshot) => {
    callback(snapshot.val())
  })
  return () => off(resultRef)
}

export function listenToSessionStatus(sessionId, callback) {
  const statusRef = ref(db, `sessions/${sessionId}/status`)
  onValue(statusRef, (snapshot) => {
    callback(snapshot.val())
  })
  return () => off(statusRef)
}
