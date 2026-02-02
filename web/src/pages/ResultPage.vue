<template>
  <div class="result-page">
    <div class="header">
      <h1>Your Recommendation</h1>
    </div>

    <div v-if="loading" class="loading">
      <p>Finding your best option...</p>
    </div>

    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="retry">Try again</button>
    </div>

    <div v-else-if="result">
      <div class="result-card">
        <h2>{{ result.title }}</h2>
        <p class="summary">{{ result.summary }}</p>

        <div v-if="result.why && result.why.length > 0" class="why-section">
          <strong>Why this option:</strong>
          <ul>
            <li v-for="(reason, index) in result.why" :key="index">{{ reason }}</li>
          </ul>
        </div>

        <div v-if="result.aiExplanation" class="ai-section">
          <p>{{ result.aiExplanation }}</p>
        </div>
      </div>

      <button @click="startOver">Start Over</button>
    </div>
  </div>
</template>

<style scoped>
.result-page {
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
  color: #1a1a1a;
}

.loading {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.error {
  text-align: center;
  padding: 40px 20px;
}

.error p {
  color: #dc2626;
  margin-bottom: 16px;
}

.result-card {
  background: #fafafa;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
}

.result-card h2 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #1a1a1a;
}

.summary {
  color: #666;
  margin-bottom: 20px;
  line-height: 1.5;
}

.why-section {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
}

.why-section strong {
  display: block;
  margin-bottom: 12px;
  color: #1a1a1a;
}

.why-section ul {
  list-style: disc;
  padding-left: 20px;
}

.why-section li {
  margin-bottom: 8px;
  color: #666;
  line-height: 1.5;
}

.ai-section {
  margin-top: 20px;
  padding: 16px;
  background: #f0f9ff;
  border-left: 3px solid #0ea5e9;
  border-radius: 4px;
}

.ai-section p {
  color: #1a1a1a;
  line-height: 1.6;
  margin: 0;
  font-size: 15px;
}

button {
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

button:hover {
  opacity: 0.85;
}
</style>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { listenToSessionResult, listenToSessionStatus } from '../firebase/db'

const props = defineProps({
  sessionId: {
    type: String,
    required: true
  }
})

const router = useRouter()
const result = ref(null)
const loading = ref(true)
const error = ref('')
let unsubscribeResult = null
let unsubscribeStatus = null

onMounted(() => {
  unsubscribeResult = listenToSessionResult(props.sessionId, (data) => {
    if (data) {
      result.value = data
      loading.value = false
    }
  })

  unsubscribeStatus = listenToSessionStatus(props.sessionId, (status) => {
    if (status === 'error') {
      error.value = 'Something went wrong. Please try again.'
      loading.value = false
    }
  })
})

onUnmounted(() => {
  if (unsubscribeResult) unsubscribeResult()
  if (unsubscribeStatus) unsubscribeStatus()
})

function startOver() {
  router.push('/intake')
}

function retry() {
  router.push('/intake')
}
</script>
