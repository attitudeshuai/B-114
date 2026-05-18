<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

interface Feature {
  icon: string
  title: string
  description: string
}

const router = useRouter()
const loading = ref(true)
const features = ref<Feature[]>([])

const scrollToCTA = () => {
  document.querySelector('.cta')?.scrollIntoView({ behavior: 'smooth' })
}

const goToAbout = () => {
  router.push('/about')
}

// 模拟数据加载
onMounted(() => {
  setTimeout(() => {
    features.value = [
      { icon: '⚡', title: 'Vite 构建', description: '极速的热更新，闪电般的冷启动' },
      { icon: '🎯', title: 'TypeScript', description: '完整的类型支持，提升开发体验' },
      { icon: '📦', title: 'Pinia 状态管理', description: '下一代 Vue 状态管理方案' },
      { icon: '🛣️', title: 'Vue Router', description: '官方路由，支持动态路由匹配' },
      { icon: '🔌', title: 'Axios 封装', description: '请求拦截、响应处理一步到位' },
      { icon: '📱', title: '响应式设计', description: '完美适配桌面端与移动端' }
    ]
    loading.value = false
  }, 800)
})
</script>

<template>
  <div class="home-view">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container hero-content">
        <h1 class="hero-title">
          <span class="gradient-text">Vue3 Starter</span>
        </h1>
        <p class="hero-subtitle">
          现代化 Vue3 + TypeScript + Vite 项目模板
          <br />
          开箱即用，架构清晰，审美现代
        </p>
        <div class="hero-actions">
          <button class="btn btn-primary" @click="scrollToCTA">
            🚀 开始使用
          </button>
          <button class="btn btn-secondary" @click="goToAbout">
            📖 了解更多
          </button>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <h2 class="section-title">核心特性</h2>
        
        <!-- Loading State -->
        <div v-if="loading" class="features-grid">
          <div v-for="i in 6" :key="i" class="feature-card skeleton-card">
            <div class="skeleton skeleton-icon"></div>
            <div class="skeleton skeleton-title"></div>
            <div class="skeleton skeleton-text"></div>
          </div>
        </div>

        <!-- Content -->
        <div v-else class="features-grid">
          <div v-for="feature in features" :key="feature.title" class="feature-card card">
            <span class="feature-icon">{{ feature.icon }}</span>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-desc">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
      <div class="container cta-content">
        <h2 class="cta-title">准备开始了吗？</h2>
        <p class="cta-desc">只需几个命令，即可启动你的下一个项目</p>
        <div class="code-block">
          <code>npm install && npm run dev</code>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2xl);
}

/* Hero */
.hero {
  text-align: center;
  padding: var(--spacing-2xl) 0;
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-lg);
}

.hero-title {
  font-size: clamp(2rem, 8vw, 3.5rem);
  font-weight: 700;
  line-height: 1.2;
}

.gradient-text {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  max-width: 500px;
  line-height: 1.8;
}

.hero-actions {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
  justify-content: center;
}

/* Features */
.features {
  padding: var(--spacing-xl) 0;
}

.section-title {
  text-align: center;
  font-size: var(--font-size-2xl);
  margin-bottom: var(--spacing-xl);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-lg);
}

.feature-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--spacing-md);
}

.feature-icon {
  font-size: 40px;
}

.feature-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
}

.feature-desc {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

/* Skeleton */
.skeleton-card {
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
}

.skeleton-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.skeleton-title {
  width: 120px;
  height: 24px;
}

.skeleton-text {
  width: 180px;
  height: 16px;
}

/* CTA */
.cta {
  padding: var(--spacing-2xl) 0;
}

.cta-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--spacing-md);
}

.cta-title {
  font-size: var(--font-size-2xl);
}

.cta-desc {
  color: var(--text-secondary);
}

.code-block {
  background: var(--text-primary);
  color: #10b981;
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: var(--radius-md);
  font-family: 'Fira Code', monospace;
  font-size: var(--font-size-sm);
  margin-top: var(--spacing-md);
}

@media (max-width: 768px) {
  .hero {
    padding: var(--spacing-xl) 0;
  }
  
  .hero-actions {
    flex-direction: column;
    width: 100%;
    padding: 0 var(--spacing-md);
  }
  
  .hero-actions .btn {
    width: 100%;
  }
}
</style>
