import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export interface TodoItem {
  id: string
  text: string
  completed: boolean
  createdAt: number
}

const STORAGE_KEY = 'todo-list-data'

function loadTodos(): TodoItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<TodoItem[]>(loadTodos())

  const pendingTodos = computed(() =>
    todos.value.filter((t) => !t.completed).sort((a, b) => b.createdAt - a.createdAt)
  )

  const completedTodos = computed(() =>
    todos.value.filter((t) => t.completed).sort((a, b) => b.createdAt - a.createdAt)
  )

  watch(
    todos,
    (val) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
    },
    { deep: true }
  )

  const addTodo = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    todos.value.push({
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      text: trimmed,
      completed: false,
      createdAt: Date.now()
    })
  }

  const toggleTodo = (id: string) => {
    const item = todos.value.find((t) => t.id === id)
    if (item) item.completed = !item.completed
  }

  const removeTodo = (id: string) => {
    const idx = todos.value.findIndex((t) => t.id === id)
    if (idx !== -1) todos.value.splice(idx, 1)
  }

  return { todos, pendingTodos, completedTodos, addTodo, toggleTodo, removeTodo }
})
