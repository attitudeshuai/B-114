<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="not-found-view">
    <div class="container content">
      <div class="error-code">404</div>
      <h1 class="error-title">页面未找到</h1>
      <p class="error-desc">抱歉，您访问的页面不存在或已被移除。</p>
      <button class="btn btn-primary" @click="goHome">
        返回首页
      </button>
    </div>
  </div>
</template>

<style scoped>
.not-found-view {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

.content {
  text-align: center;
}

.error-code {
  font-size: clamp(80px, 20vw, 150px);
  font-weight: 700;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.error-title {
  font-size: var(--font-size-2xl);
  margin: var(--spacing-md) 0;
}

.error-desc {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xl);
}
</style>
