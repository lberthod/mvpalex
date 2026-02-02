<template>
  <div class="home">
    <div class="hero">
      <div class="hero-content">
        <h1>Find Your Healthcare Option</h1>
        <p class="subtitle">
          Answer 5 questions. Get a personalized recommendation.
        </p>
        <button @click="startMatching" class="cta-button">
          Get Started →
        </button>
        <p class="note">No signup • Takes 30 seconds</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function startMatching() {
  router.push('/intake')
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafafa;
}

.hero {
  text-align: center;
  padding: 40px 24px;
}

.hero-content {
  max-width: 500px;
  margin: 0 auto;
}

h1 {
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #1a1a1a;
}

.subtitle {
  font-size: 18px;
  color: #666;
  margin-bottom: 32px;
  line-height: 1.5;
}

.cta-button {
  background: #000;
  color: #fff;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.cta-button:hover {
  opacity: 0.85;
}

.note {
  margin-top: 16px;
  font-size: 14px;
  color: #999;
}
</style>
