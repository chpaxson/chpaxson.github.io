<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import NavigationBar from './components/NavigationBar.vue'

const route = useRoute()
const showNav = computed(() => !route.path.startsWith('/amc'))
</script>

<template>
  <div class="app-container">
    <NavigationBar v-if="showNav" />
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}
</style>
