<script setup lang="ts">
import { ref } from 'vue'
import { useTodoStore } from '@/stores/todo'

const store = useTodoStore()
const newTodo = ref('')
const showCompleted = ref(true)

const handleAdd = () => {
  store.addTodo(newTodo.value)
  newTodo.value = ''
}

const handleKeyup = (e: KeyboardEvent) => {
  if (e.key === 'Enter') handleAdd()
}
</script>

<template>
  <section class="todo-section">
    <div class="container">
      <h2 class="section-title">📝 待办清单</h2>

      <div class="todo-input-row">
        <input
          v-model="newTodo"
          class="todo-input"
          type="text"
          placeholder="输入新的待办事项..."
          @keyup="handleKeyup"
        />
        <button class="btn btn-primary todo-add-btn" @click="handleAdd">
          添加
        </button>
      </div>

      <div v-if="store.pendingTodos.length" class="todo-list">
        <div class="todo-list-header">
          <h3 class="todo-list-title">待完成 ({{ store.pendingTodos.length }})</h3>
        </div>
        <transition-group name="todo-item" tag="ul" class="todo-items">
          <li
            v-for="item in store.pendingTodos"
            :key="item.id"
            class="todo-item"
          >
            <label class="todo-checkbox-label">
              <input
                type="checkbox"
                class="todo-checkbox"
                :checked="item.completed"
                @change="store.toggleTodo(item.id)"
              />
              <span class="todo-checkmark"></span>
              <span class="todo-text">{{ item.text }}</span>
            </label>
            <button class="todo-delete" @click="store.removeTodo(item.id)" title="删除">
              ✕
            </button>
          </li>
        </transition-group>
      </div>

      <div v-if="store.completedTodos.length" class="todo-list todo-list-completed">
        <div class="todo-list-header" @click="showCompleted = !showCompleted">
          <h3 class="todo-list-title">已完成 ({{ store.completedTodos.length }})</h3>
          <span class="todo-toggle-icon" :class="{ collapsed: !showCompleted }">▾</span>
        </div>
        <transition-group v-if="showCompleted" name="todo-item" tag="ul" class="todo-items">
          <li
            v-for="item in store.completedTodos"
            :key="item.id"
            class="todo-item completed"
          >
            <label class="todo-checkbox-label">
              <input
                type="checkbox"
                class="todo-checkbox"
                :checked="item.completed"
                @change="store.toggleTodo(item.id)"
              />
              <span class="todo-checkmark"></span>
              <span class="todo-text">{{ item.text }}</span>
            </label>
            <button class="todo-delete" @click="store.removeTodo(item.id)" title="删除">
              ✕
            </button>
          </li>
        </transition-group>
      </div>

      <div v-if="!store.todos.length" class="todo-empty">
        <span class="todo-empty-icon">🎯</span>
        <p>暂无待办事项，添加一条开始吧</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.todo-section {
  padding: var(--spacing-xl) 0;
}

.section-title {
  text-align: center;
  font-size: var(--font-size-2xl);
  margin-bottom: var(--spacing-xl);
}

.todo-input-row {
  display: flex;
  gap: var(--spacing-sm);
  max-width: 600px;
  margin: 0 auto var(--spacing-xl);
}

.todo-input {
  flex: 1;
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-md);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--bg-primary);
  color: var(--text-primary);
  outline: none;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.todo-input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--primary-light);
}

.todo-input::placeholder {
  color: var(--text-muted);
}

.todo-add-btn {
  flex-shrink: 0;
}

.todo-list {
  max-width: 600px;
  margin: 0 auto var(--spacing-lg);
}

.todo-list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-sm) 0;
  cursor: default;
}

.todo-list-completed .todo-list-header {
  cursor: pointer;
  user-select: none;
}

.todo-list-title {
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--text-secondary);
}

.todo-toggle-icon {
  font-size: var(--font-size-md);
  color: var(--text-muted);
  transition: transform var(--transition-fast);
}

.todo-toggle-icon.collapsed {
  transform: rotate(-90deg);
}

.todo-items {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.todo-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--bg-primary);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  transition: all var(--transition-fast);
}

.todo-item:hover {
  border-color: var(--primary-light);
  box-shadow: var(--shadow-sm);
}

.todo-item.completed {
  opacity: 0.6;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: var(--text-muted);
}

.todo-checkbox-label {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  flex: 1;
  cursor: pointer;
  min-width: 0;
}

.todo-checkbox {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.todo-checkmark {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  border: 2px solid var(--border-color);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
  position: relative;
}

.todo-checkbox:checked + .todo-checkmark {
  background: var(--primary-color);
  border-color: var(--primary-color);
}

.todo-checkbox:checked + .todo-checkmark::after {
  content: '✓';
  color: white;
  font-size: 12px;
  font-weight: bold;
}

.todo-checkbox:focus-visible + .todo-checkmark {
  box-shadow: 0 0 0 3px var(--primary-light);
}

.todo-text {
  flex: 1;
  min-width: 0;
  word-break: break-word;
  font-size: var(--font-size-sm);
  line-height: 1.5;
}

.todo-delete {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  font-size: 12px;
  transition: all var(--transition-fast);
  opacity: 0;
}

.todo-item:hover .todo-delete {
  opacity: 1;
}

.todo-delete:hover {
  background: #fee2e2;
  color: #ef4444;
}

.todo-empty {
  text-align: center;
  padding: var(--spacing-2xl);
  color: var(--text-muted);
}

.todo-empty-icon {
  font-size: 48px;
  display: block;
  margin-bottom: var(--spacing-sm);
}

.todo-empty p {
  font-size: var(--font-size-sm);
}

.todo-item-enter-active,
.todo-item-leave-active {
  transition: all var(--transition-normal);
}

.todo-item-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.todo-item-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

@media (max-width: 768px) {
  .todo-delete {
    opacity: 1;
  }
}
</style>
