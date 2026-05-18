import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export interface TodoItem {
  id: string
  text: string
  completed: boolean
  createdAt: number
}

const STORAGE_KEY = 'vue3-starter-todos'

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<TodoItem[]>([])

  const activeTodos = computed(() => todos.value.filter(todo => !todo.completed))
  const completedTodos = computed(() => todos.value.filter(todo => todo.completed))

  const loadFromStorage = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        todos.value = JSON.parse(stored)
      }
    } catch (e) {
      console.error('Failed to load todos from localStorage:', e)
    }
  }

  const saveToStorage = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.value))
    } catch (e) {
      console.error('Failed to save todos to localStorage:', e)
    }
  }

  const addTodo = (text: string) => {
    if (!text.trim()) return
    const newTodo: TodoItem = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      createdAt: Date.now()
    }
    todos.value.unshift(newTodo)
  }

  const toggleTodo = (id: string) => {
    const todo = todos.value.find(t => t.id === id)
    if (todo) {
      todo.completed = !todo.completed
    }
  }

  const deleteTodo = (id: string) => {
    const index = todos.value.findIndex(t => t.id === id)
    if (index > -1) {
      todos.value.splice(index, 1)
    }
  }

  const clearCompleted = () => {
    todos.value = todos.value.filter(t => !t.completed)
  }

  loadFromStorage()

  watch(todos, saveToStorage, { deep: true })

  return {
    todos,
    activeTodos,
    completedTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted
  }
})
