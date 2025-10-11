<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { marked } from 'marked'

const resumeContent = ref('')
const loading = ref(true)
const error = ref('')

const htmlContent = computed(() => {
  if (!resumeContent.value) return ''
  return marked(resumeContent.value)
})

onMounted(async () => {
  try {
    // Import the resume markdown file
    const module = await import('@/resume.md?raw')
    resumeContent.value = module.default
  } catch (err) {
    console.error('Failed to load resume:', err)
    error.value = 'Failed to load resume. Make sure resume.md exists in the src folder.'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="resume">
    <div class="container">
      <div v-if="loading" class="loading">Loading resume...</div>
      
      <div v-else-if="error" class="error">
        <h2>{{ error }}</h2>
        <p>Create a <code>resume.md</code> file in the <code>src/</code> folder to get started.</p>
      </div>
      
      <div v-else class="markdown-body" v-html="htmlContent"></div>
    </div>
  </div>
</template>

<style scoped>
.resume {
  padding: 2rem;
  min-height: calc(100vh - 100px);
}

.container {
  max-width: 900px;
  margin: 0 auto;
}

.loading,
.error {
  text-align: center;
  padding: 3rem;
}

.error {
  color: var(--color-text-muted);
}

.error code {
  background: var(--color-background-soft);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
}

.markdown-body {
  line-height: 1.8;
  color: var(--color-text);
}

.markdown-body :deep(h1),
.markdown-body :deep(h2),
.markdown-body :deep(h3),
.markdown-body :deep(h4),
.markdown-body :deep(h5),
.markdown-body :deep(h6) {
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;
  line-height: 1.25;
  color: var(--color-heading);
}

.markdown-body :deep(h1) {
  font-size: 2.5rem;
  border-bottom: 2px solid var(--color-border);
  padding-bottom: 0.5rem;
  margin-top: 0;
}

.markdown-body :deep(h2) {
  font-size: 2rem;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 0.5rem;
}

.markdown-body :deep(h3) {
  font-size: 1.5rem;
}

.markdown-body :deep(p) {
  margin-bottom: 1rem;
}

.markdown-body :deep(ul),
.markdown-body :deep(ol) {
  margin-bottom: 1rem;
  padding-left: 2rem;
}

.markdown-body :deep(li) {
  margin-bottom: 0.5rem;
}

.markdown-body :deep(code) {
  background: var(--color-background-soft);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
}

.markdown-body :deep(pre) {
  background: var(--color-background-soft);
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  margin-bottom: 1rem;
}

.markdown-body :deep(pre code) {
  background: none;
  padding: 0;
}

.markdown-body :deep(blockquote) {
  border-left: 4px solid var(--color-border);
  padding-left: 1rem;
  margin: 1rem 0;
  color: var(--color-text-muted);
}

.markdown-body :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1rem 0;
}

.markdown-body :deep(a) {
  color: var(--color-text);
  text-decoration: underline;
}

.markdown-body :deep(a:hover) {
  opacity: 0.7;
}

.markdown-body :deep(hr) {
  border: none;
  border-top: 2px solid var(--color-border);
  margin: 2rem 0;
}

.markdown-body :deep(strong) {
  font-weight: 600;
}

.markdown-body :deep(em) {
  font-style: italic;
}

@media (max-width: 768px) {
  .resume {
    padding: 1rem;
  }
  
  .markdown-body :deep(h1) {
    font-size: 2rem;
  }
  
  .markdown-body :deep(h2) {
    font-size: 1.75rem;
  }
}
</style>
