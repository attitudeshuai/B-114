<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isMenuOpen = ref(false)

const navLinks = [
  { name: '首页', path: '/' },
  { name: '关于', path: '/about' }
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const navigateTo = (path: string) => {
  router.push(path)
  isMenuOpen.value = false
}
</script>

<template>
  <header class="app-header">
    <div class="container header-content">
      <div class="logo" @click="navigateTo('/')">
        <span class="logo-icon">⚡</span>
        <span class="logo-text">Vue3 Starter</span>
      </div>
      
      <!-- Desktop Nav -->
      <nav class="nav-desktop hide-mobile">
        <RouterLink 
          v-for="link in navLinks" 
          :key="link.path" 
          :to="link.path"
          class="nav-link"
        >
          {{ link.name }}
        </RouterLink>
      </nav>

      <!-- Mobile Menu Button -->
      <button class="menu-btn hide-desktop" @click="toggleMenu" aria-label="菜单">
        <span class="menu-icon" :class="{ active: isMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
    </div>

    <!-- Mobile Nav -->
    <Transition name="slide">
      <nav v-if="isMenuOpen" class="nav-mobile hide-desktop">
        <a 
          v-for="link in navLinks" 
          :key="link.path"
          class="nav-link-mobile"
          @click="navigateTo(link.path)"
        >
          {{ link.name }}
        </a>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.app-header {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: pointer;
  transition: transform var(--transition-fast);
}

.logo:hover {
  transform: scale(1.02);
}

.logo-icon {
  font-size: 24px;
}

.logo-text {
  font-size: var(--font-size-lg);
  font-weight: 600;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-desktop {
  display: flex;
  gap: var(--spacing-lg);
}

.nav-link {
  color: var(--text-secondary);
  font-weight: 500;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--primary-color);
  background: var(--primary-light);
}

/* Mobile Menu Button */
.menu-btn {
  padding: var(--spacing-sm);
}

.menu-icon {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 24px;
}

.menu-icon span {
  display: block;
  height: 2px;
  background: var(--text-primary);
  border-radius: 2px;
  transition: all var(--transition-fast);
}

.menu-icon.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.menu-icon.active span:nth-child(2) {
  opacity: 0;
}

.menu-icon.active span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* Mobile Nav */
.nav-mobile {
  display: flex;
  flex-direction: column;
  padding: var(--spacing-md);
  background: var(--bg-primary);
  border-top: 1px solid var(--border-color);
}

.nav-link-mobile {
  padding: var(--spacing-md);
  color: var(--text-primary);
  font-weight: 500;
  border-radius: var(--radius-md);
  transition: background var(--transition-fast);
}

.nav-link-mobile:hover {
  background: var(--bg-secondary);
}

/* Transitions */
.slide-enter-active,
.slide-leave-active {
  transition: all var(--transition-normal);
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
