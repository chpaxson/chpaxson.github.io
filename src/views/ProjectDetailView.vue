<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import { loadProject, type Project } from '@/utils/projects'

const route = useRoute()
const project = ref<Project | null>(null)
const loading = ref(true)
const error = ref('')

const projectId = computed(() => route.params.id as string)

const htmlContent = computed(() => {
  if (!project.value) return ''
  return marked(project.value.content)
})

onMounted(async () => {
  try {
    project.value = await loadProject(projectId.value)
    if (!project.value) {
      error.value = 'Project not found'
    }
  } catch (err) {
    console.error('Failed to load project:', err)
    error.value = 'Failed to load project'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="project-detail">
    <div class="container">
      <div v-if="loading" class="loading">Loading project...</div>
      
      <div v-else-if="error" class="error">
        <h2>{{ error }}</h2>
        <RouterLink to="/projects" class="back-link">← Back to Projects</RouterLink>
      </div>
      
      <article v-else-if="project" class="project-content">
        <header class="project-header">
          <RouterLink to="/projects" class="back-link">← Back to Projects</RouterLink>
          
          <h1>{{ project.metadata.title || project.id }}</h1>
          
          <div v-if="project.metadata.thumbnail" class="header-image">
            <img :src="project.metadata.thumbnail" :alt="project.metadata.title" />
          </div>
          
          <div class="meta">
            <p v-if="project.metadata.description" class="description">
              {{ project.metadata.description }}
            </p>
            
            <div v-if="project.metadata.date" class="date">
              {{ new Date(project.metadata.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              }) }}
            </div>
            
            <div v-if="project.metadata.tags" class="tags">
              <span v-for="tag in project.metadata.tags" :key="tag" class="tag">
                {{ tag }}
              </span>
            </div>
          </div>
        </header>
        
        <div class="markdown-body" v-html="htmlContent"></div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.project-detail {
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

.back-link {
  display: inline-block;
  margin-bottom: 2rem;
  color: var(--color-text);
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.back-link:hover {
  opacity: 0.7;
}

.project-header {
  margin-bottom: 3rem;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.header-image {
  width: 100%;
  max-height: 400px;
  overflow: hidden;
  border-radius: 12px;
  margin: 2rem 0;
}

.header-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.meta {
  margin-bottom: 2rem;
}

.description {
  font-size: 1.25rem;
  color: var(--color-text);
  margin-bottom: 1rem;
  line-height: 1.6;
}

.date {
  color: var(--color-text-muted);
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: var(--color-background-soft);
  padding: 0.5rem 1rem;
  border-radius: 999px;
  font-size: 0.9rem;
  color: var(--color-text);
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

@media (max-width: 768px) {
  .project-detail {
    padding: 1rem;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  .description {
    font-size: 1.1rem;
  }
}
</style>
