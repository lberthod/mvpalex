import { CATALOG } from './catalog.js'

const WEIGHTS = {
  careType: 3.5,
  urgency: 3,
  preference: 2.5,
  format: 2,
  availability: 1.5,
  additionalNeeds: 1
}

export function computeBestMatch(intake) {
  const scores = CATALOG.map(candidate => {
    let score = candidate.baseScore
    const reasons = []

    if (candidate.tags.includes(intake.careType)) {
      score += WEIGHTS.careType * 10
      reasons.push({
        key: 'careType',
        text: `Specialized in ${intake.careType.replace('_', ' ')} that you need`
      })
    }

    if (candidate.tags.includes(intake.urgency)) {
      score += WEIGHTS.urgency * 10
      reasons.push({
        key: 'urgency',
        text: `Available on your timeline: ${intake.urgency.replace('_', ' ')}`
      })
    }

    if (candidate.tags.includes(intake.preference)) {
      score += WEIGHTS.preference * 10
      reasons.push({
        key: 'preference',
        text: `Prioritizes ${intake.preference} which is important to you`
      })
    }

    if (candidate.tags.includes(intake.format)) {
      score += WEIGHTS.format * 10
      reasons.push({
        key: 'format',
        text: `Offers ${intake.format.replace('_', ' ')} appointments`
      })
    }

    if (candidate.tags.includes(intake.availability)) {
      score += WEIGHTS.availability * 10
      reasons.push({
        key: 'availability',
        text: `Appointments available during ${intake.availability.replace('_', ' ')}`
      })
    }

    if (intake.additionalNeeds) {
      const additionalNeedsKeys = Object.keys(intake.additionalNeeds)
      const matches = additionalNeedsKeys.filter(key => candidate.tags.includes(key))
      if (matches.length > 0) {
        score += WEIGHTS.additionalNeeds * matches.length * 8
        reasons.push({
          key: 'additionalNeeds',
          text: `Provides ${matches.map(m => m.replace('_', ' ')).join(', ')}`
        })
      }
    }

    return {
      candidate,
      score,
      reasons
    }
  })

  scores.sort((a, b) => b.score - a.score)
  const best = scores[0]

  const topReasons = best.reasons.slice(0, 4).map(r => r.text)

  return {
    matchId: best.candidate.id,
    title: best.candidate.title,
    summary: best.candidate.summary,
    why: topReasons,
    score: Math.round(best.score),
    intake: intake
  }
}
