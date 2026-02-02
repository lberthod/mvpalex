export const QUESTIONS = {
  careType: {
    label: 'What type of care do you need?',
    type: 'select',
    required: true,
    options: [
      { value: 'primary_care', label: 'Primary Care (General checkup)' },
      { value: 'specialist', label: 'Specialist Consultation' },
      { value: 'mental_health', label: 'Mental Health Support' },
      { value: 'urgent_care', label: 'Urgent Care' },
      { value: 'chronic_management', label: 'Chronic Condition Management' }
    ]
  },
  urgency: {
    label: 'How urgent is your need?',
    type: 'radio',
    required: true,
    options: [
      { value: 'immediate', label: 'Immediate (same day)' },
      { value: 'this_week', label: 'This week' },
      { value: 'flexible', label: 'Flexible (can wait)' }
    ]
  },
  preference: {
    label: 'What is most important to you?',
    type: 'select',
    required: true,
    options: [
      { value: 'cost', label: 'Affordable cost' },
      { value: 'convenience', label: 'Convenience (location/telehealth)' },
      { value: 'expertise', label: 'Specialist expertise' },
      { value: 'relationship', label: 'Ongoing doctor relationship' }
    ]
  },
  availability: {
    label: 'What is your availability?',
    type: 'radio',
    required: true,
    options: [
      { value: 'business_hours', label: 'Business hours (9am-5pm)' },
      { value: 'evenings', label: 'Evenings' },
      { value: 'weekends', label: 'Weekends' },
      { value: 'anytime', label: 'Anytime' }
    ]
  },
  format: {
    label: 'Preferred consultation format',
    type: 'radio',
    required: true,
    options: [
      { value: 'in_person', label: 'In-person visit' },
      { value: 'telehealth', label: 'Telehealth (video call)' },
      { value: 'either', label: 'Either works' }
    ]
  },
  additionalNeeds: {
    label: 'Additional needs (optional)',
    type: 'checkbox',
    required: false,
    options: [
      { value: 'language_support', label: 'Language support' },
      { value: 'insurance_accepted', label: 'Insurance accepted' },
      { value: 'accessible', label: 'Accessibility accommodations' },
      { value: 'family_friendly', label: 'Family-friendly' }
    ]
  }
}

export function validateIntake(data) {
  const errors = {}
  
  Object.entries(QUESTIONS).forEach(([key, config]) => {
    if (config.required && !data[key]) {
      errors[key] = 'This field is required'
    }
  })
  
  return {
    valid: Object.keys(errors).length === 0,
    errors
  }
}

export function formatIntakeForDB(formData) {
  const additionalNeedsMap = {}
  if (formData.additionalNeeds && Array.isArray(formData.additionalNeeds)) {
    formData.additionalNeeds.forEach(item => {
      additionalNeedsMap[item] = true
    })
  }

  return {
    careType: formData.careType || '',
    urgency: formData.urgency || '',
    preference: formData.preference || '',
    availability: formData.availability || '',
    format: formData.format || '',
    additionalNeeds: additionalNeedsMap
  }
}
