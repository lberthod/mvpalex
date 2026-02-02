import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function generatePersonalizedExplanation(intake, match) {
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your-api-key-here') {
    console.log('⚠️  OpenAI API key not configured, using fallback explanation')
    return generateFallbackExplanation(intake, match)
  }

  try {
    const prompt = `Patient needs: ${intake.careType.replace('_', ' ')}, urgency: ${intake.urgency}, prefers ${intake.preference}, ${intake.format.replace('_', ' ')} format, available ${intake.availability.replace('_', ' ')}.

Recommended option: ${match.title} - ${match.summary}

Write a concise, professional 2-sentence explanation of why this is a good fit. Be factual and specific. Focus on the most relevant factors. Avoid phrases like "you're in good hands" or overly cheerful language.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-5-nano-2025-08-07',
      messages: [
        {
          role: 'system',
          content: 'You are a clinical healthcare navigator. Provide clear, concise, fact-based guidance. Be professional and direct without excessive warmth or sales language.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 100,
      temperature: 0.5
    })

    const explanation = completion.choices[0].message.content.trim()
    console.log('✅ OpenAI explanation generated')
    return explanation

  } catch (error) {
    console.error('❌ OpenAI API error:', error.message)
    return generateFallbackExplanation(intake, match)
  }
}

function generateFallbackExplanation(intake, match) {
  const careTypeLabels = {
    primary_care: 'primary care',
    specialist: 'specialist care',
    mental_health: 'mental health support',
    urgent_care: 'urgent care',
    chronic_management: 'chronic condition management'
  }

  const preferenceLabels = {
    cost: 'affordability',
    convenience: 'convenience',
    expertise: 'specialist expertise',
    relationship: 'ongoing care relationship'
  }

  const careType = careTypeLabels[intake.careType] || intake.careType
  const preference = preferenceLabels[intake.preference] || intake.preference

  return `Based on your need for ${careType} and focus on ${preference}, we recommend ${match.title}. This option fits your ${intake.urgency} timeline and offers ${intake.format.replace('_', ' ')} appointments.`
}
