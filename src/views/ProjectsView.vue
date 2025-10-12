<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { loadProjects, type Project } from '@/utils/projects'

const projects = ref<Project[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const loadedProjects = await loadProjects()
    // Sort by date, newest first (descending)
    projects.value = loadedProjects.sort((a, b) => {
      const dateA = a.metadata.date ? new Date(a.metadata.date).getTime() : 0
      const dateB = b.metadata.date ? new Date(b.metadata.date).getTime() : 0
      return dateB - dateA
    })
  } catch (error) {
    console.error('Failed to load projects:', error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="projects">
    <div class="container">
      <h1>Projects</h1>
      
      <div v-if="loading" class="loading">Loading projects...</div>
      
      <div v-else-if="projects.length === 0" class="empty">
        No projects found. Add markdown files to the src/projects folder.
      </div>
      
      <div v-else class="projects-grid">
        <div 
          v-for="project in projects" 
          :key="project.id" 
          class="project-card"
        >
          <RouterLink :to="`/projects/${project.id}`" class="project-link">
            <div class="thumbnail-container">
              <img 
                v-if="project.metadata.thumbnail" 
                :src="project.metadata.thumbnail" 
                :alt="project.metadata.title"
                class="thumbnail"
              />
              <div v-else class="thumbnail-placeholder">
                <span>{{ project.metadata.title?.charAt(0) || '?' }}</span>
              </div>
            </div>
            
            <div class="project-content">
              <div class="title-row">
                <h2 class="project-title">
                  {{ project.metadata.title || project.id }}
                  <span class="arrow">→</span>
                </h2>
                <span v-if="project.metadata.date" class="project-date">
                  {{ new Date(project.metadata.date).getFullYear() }}
                </span>
              </div>
              
              <p class="description">{{ project.metadata.description }}</p>
              
              <div v-if="project.metadata.tags" class="tags">
                <span v-for="tag in project.metadata.tags" :key="tag" class="tag">
                  {{ tag }}
                </span>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.projects {
  padding: 2rem;
  min-height: calc(100vh - 100px);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
}

.loading,
.empty {
  text-align: center;
  padding: 3rem;
  color: var(--color-text-muted);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.project-card {
  background: var(--color-background-soft);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.project-link {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  flex: 1;
}

.thumbnail-container {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: var(--color-background-mute);
}

.thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-card:hover .thumbnail {
  transform: scale(1.05);
}

.thumbnail-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  font-weight: bold;
  color: var(--color-text-muted);
  background: linear-gradient(135deg, var(--color-background-mute) 0%, var(--color-background-soft) 100%);
}

.project-content {
  padding: 1.5rem;
}

.title-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.project-title {
  font-size: 1.5rem;
  margin: 0;
  color: var(--color-heading);
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
}

.project-date {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  white-space: nowrap;
  font-weight: 500;
  background: var(--color-background-mute);
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--color-border);
}

.arrow {
  display: inline-block;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
  font-size: 1.2rem;
}

.project-card:hover .arrow {
  opacity: 1;
  transform: translateX(0);
}

.project-card:hover .project-title {
  color: var(--color-text);
}

.description {
  color: var(--color-text);
  margin-bottom: 1rem;
  line-height: 1.6;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0;
}

.tag {
  background: var(--color-background-mute);
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.85rem;
  color: var(--color-text);
}

@media (max-width: 768px) {
  .projects {
    padding: 1rem;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
  }
  
  h1 {
    font-size: 2rem;
  }
}
</style>
