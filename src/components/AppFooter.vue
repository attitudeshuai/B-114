<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="app-footer">
    <div class="container footer-content">
      <p class="copyright">
        © {{ currentYear }} Vue3 Starter. All rights reserved.
      </p>
      <div class="footer-links">
        <a href="https://vuejs.org" target="_blank" rel="noopener">Vue.js</a>
        <a href="https://vitejs.dev" target="_blank" rel="noopener">Vite</a>
        <a href="https://pinia.vuejs.org" target="_blank" rel="noopener">Pinia</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  background: var(--bg-primary);
  border-top: 1px solid var(--border-color);
  padding: var(--spacing-lg) 0;
  margin-top: auto;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
  text-align: center;
}

.copyright {
  color: var(--text-muted);
  font-size: var(--font-size-sm);
}

.footer-links {
  display: flex;
  gap: var(--spacing-lg);
}

.footer-links a {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  transition: color var(--transition-fast);
}

.footer-links a:hover {
  color: var(--primary-color);
}

@media (min-width: 769px) {
  .footer-content {
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
