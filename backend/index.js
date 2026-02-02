import { db } from './firebaseAdmin.js'
import { computeBestMatch } from './matching/matcher.js'
import { generatePersonalizedExplanation } from './ai/openai.js'
import dotenv from 'dotenv'

dotenv.config()

console.log('🚀 Backend started - listening for new sessions...')
console.log('🤖 OpenAI integration:', process.env.OPENAI_API_KEY ? 'enabled' : 'disabled (using fallback)')

const sessionsRef = db.ref('sessions')

sessionsRef.on('child_added', async (snapshot) => {
  const sessionId = snapshot.key
  const sessionData = snapshot.val()

  if (!sessionData || !sessionData.intake) {
    return
  }

  if (sessionData.status !== 'submitted') {
    return
  }

  if (sessionData.result) {
    return
  }

  console.log(`\n📥 New session received: ${sessionId}`)
  console.log(`   Care type: ${sessionData.intake.careType}`)
  console.log(`   Urgency: ${sessionData.intake.urgency}`)
  console.log(`   Preference: ${sessionData.intake.preference}`)

  try {
    const result = computeBestMatch(sessionData.intake)

    console.log(`   ✨ Recommendation found: ${result.title} (score: ${result.score})`)

    const aiExplanation = await generatePersonalizedExplanation(sessionData.intake, result)
    result.aiExplanation = aiExplanation

    await snapshot.ref.child('result').set(result)
    await snapshot.ref.child('status').set('completed')

    console.log(`   ✅ Result written to database`)
    console.log(`   📊 Session ${sessionId} completed\n`)

  } catch (error) {
    console.error(`   ❌ Error processing session ${sessionId}:`, error.message)
    
    await snapshot.ref.child('status').set('error')
  }
})

process.on('SIGINT', () => {
  console.log('\n👋 Shutting down gracefully...')
  process.exit(0)
})

process.on('uncaughtException', (error) => {
  console.error('💥 Uncaught exception:', error)
  process.exit(1)
})
