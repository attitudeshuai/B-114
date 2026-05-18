<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTodoStore } from '@/stores'

interface Feature {
  icon: string
  title: string
  description: string
}

const router = useRouter()
const loading = ref(true)
const features = ref<Feature[]>([])

const todoStore = useTodoStore()
const newTodoText = ref('')

const handleAddTodo = () => {
  if (newTodoText.value.trim()) {
    todoStore.addTodo(newTodoText.value)
    newTodoText.value = ''
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    handleAddTodo()
  }
}

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

    <!-- Todo Section -->
    <section class="todo">
      <div class="container">
        <h2 class="section-title">📝 待办清单</h2>
        <div class="todo-container card">
          <div class="todo-input-wrap">
            <input
              v-model="newTodoText"
              type="text"
              class="todo-input"
              placeholder="输入新的待办事项，按回车添加..."
              @keydown="handleKeydown"
            />
            <button class="btn btn-primary todo-add-btn" @click="handleAddTodo">
              添加
            </button>
          </div>

          <div class="todo-lists">
            <div class="todo-list-section">
              <h3 class="todo-list-title">
                待完成
                <span class="todo-count">{{ todoStore.activeTodos.length }}</span>
              </h3>
              <div v-if="todoStore.activeTodos.length === 0" class="todo-empty">
                暂无待办事项，添加一个吧～
              </div>
              <ul v-else class="todo-list">
                <li
                  v-for="todo in todoStore.activeTodos"
                  :key="todo.id"
                  class="todo-item"
                >
                  <label class="todo-checkbox">
                    <input
                      type="checkbox"
                      :checked="todo.completed"
                      @change="todoStore.toggleTodo(todo.id)"
                    />
                    <span class="checkmark"></span>
                  </label>
                  <span class="todo-text">{{ todo.text }}</span>
                  <button
                    class="todo-delete-btn"
                    @click="todoStore.deleteTodo(todo.id)"
                    title="删除"
                  >
                    ×
                  </button>
                </li>
              </ul>
            </div>

            <div class="todo-list-section">
              <div class="todo-list-header">
                <h3 class="todo-list-title">
                  已完成
                  <span class="todo-count">{{ todoStore.completedTodos.length }}</span>
                </h3>
                <button
                  v-if="todoStore.completedTodos.length > 0"
                  class="todo-clear-btn"
                  @click="todoStore.clearCompleted"
                >
                  清空已完成
                </button>
              </div>
              <div v-if="todoStore.completedTodos.length === 0" class="todo-empty">
                暂无已完成的任务
              </div>
              <ul v-else class="todo-list">
                <li
                  v-for="todo in todoStore.completedTodos"
                  :key="todo.id"
                  class="todo-item completed"
                >
                  <label class="todo-checkbox">
                    <input
                      type="checkbox"
                      :checked="todo.completed"
                      @change="todoStore.toggleTodo(todo.id)"
                    />
                    <span class="checkmark"></span>
                  </label>
                  <span class="todo-text">{{ todo.text }}</span>
                  <button
                    class="todo-delete-btn"
                    @click="todoStore.deleteTodo(todo.id)"
                    title="删除"
                  >
                    ×
                  </button>
                </li>
              </ul>
            </div>
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

/* Todo */
.todo {
  padding: var(--spacing-xl) 0;
}

.todo-container {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-xl);
}

.todo-input-wrap {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
}

.todo-input {
  flex: 1;
  padding: var(--spacing-md) var(--spacing-lg);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: var(--font-size-md);
  background: var(--bg-primary);
  color: var(--text-primary);
  transition: border-color 0.2s;
}

.todo-input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.todo-add-btn {
  white-space: nowrap;
}

.todo-lists {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.todo-list-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.todo-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.todo-list-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.todo-count {
  background: var(--primary-color);
  color: white;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: var(--font-size-sm);
  font-weight: 500;
}

.todo-clear-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  cursor: pointer;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  transition: color 0.2s, background 0.2s;
}

.todo-clear-btn:hover {
  color: var(--danger-color);
  background: var(--bg-secondary);
}

.todo-empty {
  color: var(--text-secondary);
  text-align: center;
  padding: var(--spacing-lg);
  font-size: var(--font-size-sm);
}

.todo-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.todo-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  transition: background 0.2s;
}

.todo-item:hover {
  background: var(--bg-tertiary);
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: var(--text-secondary);
}

.todo-checkbox {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.todo-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  height: 22px;
  width: 22px;
  background-color: var(--bg-primary);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-sm);
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.todo-checkbox input:checked ~ .checkmark {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.checkmark:after {
  content: '';
  display: none;
  width: 6px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg) translate(-1px, -1px);
}

.todo-checkbox input:checked ~ .checkmark:after {
  display: block;
}

.todo-text {
  flex: 1;
  font-size: var(--font-size-md);
}

.todo-delete-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 24px;
  cursor: pointer;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  transition: color 0.2s, background 0.2s;
  line-height: 1;
}

.todo-delete-btn:hover {
  color: var(--danger-color);
  background: var(--bg-primary);
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

  .todo-container {
    padding: var(--spacing-lg);
  }

  .todo-input-wrap {
    flex-direction: column;
  }

  .todo-add-btn {
    width: 100%;
  }
}
</style>
