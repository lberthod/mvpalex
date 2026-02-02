<template>
  <div class="intake-page">
    <div class="header">
      <h1>Find Your Option</h1>
      <p class="subtitle">5 quick questions</p>
    </div>

    <form @submit.prevent="handleSubmit" class="intake-form">
      <div v-for="(config, key, index) in QUESTIONS" :key="key" class="form-group">
        <label :for="key">
          {{ index + 1 }}. {{ config.label }}
          <span v-if="!config.required" class="optional">(optional)</span>
        </label>

        <select v-if="config.type === 'select'" :id="key" v-model="formData[key]" :required="config.required">
          <option value="">Select...</option>
          <option v-for="opt in config.options" :key="opt.value" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>

        <div v-else-if="config.type === 'radio'" class="radio-group">
          <div v-for="opt in config.options" :key="opt.value" class="radio-option">
            <input
              type="radio"
              :id="`${key}_${opt.value}`"
              :name="key"
              :value="opt.value"
              v-model="formData[key]"
              :required="config.required"
            />
            <label :for="`${key}_${opt.value}`">{{ opt.label }}</label>
          </div>
        </div>

        <div v-else-if="config.type === 'checkbox'" class="checkbox-group">
          <div v-for="opt in config.options" :key="opt.value" class="checkbox-option">
            <input
              type="checkbox"
              :id="`${key}_${opt.value}`"
              :value="opt.value"
              v-model="formData[key]"
            />
            <label :for="`${key}_${opt.value}`">{{ opt.label }}</label>
          </div>
        </div>

        <textarea
          v-else-if="config.type === 'textarea'"
          :id="key"
          v-model="formData[key]"
          :required="config.required"
        ></textarea>

        <div v-if="errors[key]" class="error">{{ errors[key] }}</div>
      </div>

      <button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Processing...' : 'Get Recommendation' }}
      </button>

      <div v-if="errorMessage" class="error">
        {{ errorMessage }}
      </div>
    </form>
  </div>
</template>

<style scoped>
.intake-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 24px;
  min-height: 100vh;
}

.header {
  margin-bottom: 32px;
}

h1 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #1a1a1a;
}

.subtitle {
  color: #666;
  font-size: 16px;
}

.intake-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 500;
  margin-bottom: 8px;
  color: #1a1a1a;
  font-size: 15px;
}

.optional {
  color: #999;
  font-weight: 400;
  font-size: 14px;
  margin-left: 4px;
}

button[type="submit"] {
  margin-top: 16px;
  width: 100%;
  padding: 14px;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;
}

button[type="submit"]:hover:not(:disabled) {
  opacity: 0.85;
}

button[type="submit"]:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.error {
  margin-top: 12px;
  padding: 12px;
  background: #fef2f2;
  border: 1px solid #ef4444;
  border-radius: 4px;
  color: #dc2626;
  font-size: 14px;
}
</style>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { QUESTIONS, validateIntake, formatIntakeForDB } from '../domain/intake'
import { createSession } from '../firebase/db'

const router = useRouter()

const formData = ref({
  careType: '',
  urgency: '',
  preference: '',
  availability: '',
  format: '',
  additionalNeeds: []
})

const errors = ref({})
const isSubmitting = ref(false)
const errorMessage = ref('')

const completedQuestions = computed(() => {
  let count = 0
  if (formData.value.careType) count++
  if (formData.value.urgency) count++
  if (formData.value.preference) count++
  if (formData.value.availability) count++
  if (formData.value.format) count++
  return count
})

const progressPercentage = computed(() => {
  return (completedQuestions.value / 5) * 100
})

async function handleSubmit() {
  errors.value = {}
  errorMessage.value = ''
  
  const validation = validateIntake(formData.value)
  if (!validation.valid) {
    errors.value = validation.errors
    return
  }

  isSubmitting.value = true

  try {
    const intakeData = formatIntakeForDB(formData.value)
    const sessionId = await createSession(intakeData)
    router.push(`/result/${sessionId}`)
  } catch (error) {
    console.error('Failed to submit:', error)
    errorMessage.value = 'Something went wrong. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>
