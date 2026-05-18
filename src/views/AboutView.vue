<script setup lang="ts">
</script>

<template>
  <div class="about-view">
    <div class="container">
      <section class="about-hero">
        <h1 class="page-title">关于项目</h1>
        <p class="page-desc">
          这是一个基于 Vue3 + TypeScript + Vite 的现代化前端项目模板，
          遵循最佳实践，助你快速启动新项目。
        </p>
      </section>

      <section class="tech-stack">
        <h2 class="section-title">技术栈</h2>
        <div class="tech-grid">
          <div class="tech-card card">
            <div class="tech-header">
              <span class="tech-icon">💚</span>
              <h3>Vue 3</h3>
            </div>
            <p>渐进式 JavaScript 框架，采用 Composition API</p>
          </div>
          <div class="tech-card card">
            <div class="tech-header">
              <span class="tech-icon">🔷</span>
              <h3>TypeScript</h3>
            </div>
            <p>JavaScript 的超集，提供静态类型检查</p>
          </div>
          <div class="tech-card card">
            <div class="tech-header">
              <span class="tech-icon">⚡</span>
              <h3>Vite</h3>
            </div>
            <p>下一代前端构建工具，极速冷启动</p>
          </div>
          <div class="tech-card card">
            <div class="tech-header">
              <span class="tech-icon">🍍</span>
              <h3>Pinia</h3>
            </div>
            <p>Vue 官方推荐的状态管理库</p>
          </div>
        </div>
      </section>

      <section class="project-structure">
        <h2 class="section-title">项目结构</h2>
        <div class="code-block">
          <pre>
src/
├── api/          # API 请求封装
├── components/   # 公共组件
├── layouts/      # 布局组件
├── router/       # 路由配置
├── stores/       # Pinia 状态管理
├── styles/       # 全局样式
├── views/        # 页面视图
├── App.vue       # 根组件
└── main.ts       # 入口文件
          </pre>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.about-view {
  padding: var(--spacing-lg) 0;
}

.about-hero {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
}

.page-title {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-md);
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-desc {
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.8;
}

.section-title {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-lg);
  text-align: center;
}

.tech-stack {
  margin-bottom: var(--spacing-2xl);
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--spacing-lg);
}

.tech-card {
  padding: var(--spacing-lg);
}

.tech-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
}

.tech-icon {
  font-size: 24px;
}

.tech-card h3 {
  font-size: var(--font-size-lg);
}

.tech-card p {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

.project-structure .code-block {
  background: var(--text-primary);
  color: #e5e7eb;
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  overflow-x: auto;
}

.project-structure pre {
  margin: 0;
  font-family: 'Fira Code', monospace;
  font-size: var(--font-size-sm);
  line-height: 1.6;
  white-space: pre;
}
</style>
