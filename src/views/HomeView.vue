<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="home">
    <div class="hero">
      <div class="container">
        <h1 class="title">Welcome to My Portfolio</h1>
        <p class="subtitle">
          Exploring the intersection of technology, design, and innovation.
        </p>
        <div class="cta-buttons">
          <RouterLink to="/projects" class="btn btn-primary">
            View Projects
          </RouterLink>
          <RouterLink to="/resume" class="btn btn-secondary">
            View Resume
          </RouterLink>
        </div>
      </div>
    </div>
    
    <section class="intro">
      <div class="container">
        <h2>About Me</h2>
        <p>
          I'm passionate about building innovative solutions and sharing my journey through this portfolio.
          Here you'll find a collection of my projects, experiences, and technical explorations.
        </p>
      </div>
    </section>
  </main>
</template>

<style scoped>
.home {
  min-height: calc(100vh - 100px);
}

.hero {
  padding: 4rem 2rem;
  text-align: center;
  background: linear-gradient(135deg, var(--color-background) 0%, var(--color-background-soft) 100%);
  border-bottom: 1px solid var(--color-border);
}

.container {
  max-width: 900px;
  margin: 0 auto;
}

.title {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--color-heading) 0%, var(--color-text) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 1.5rem;
  color: var(--color-text);
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 1rem 2rem;
  border-radius: 9999px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-block;
}

.btn-primary {
  background: var(--color-background-mute);
  color: var(--color-text);
  border: 2px solid var(--color-border);
}

.btn-primary:hover {
  background: var(--color-background);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-secondary {
  background: transparent;
  color: var(--color-text);
  border: 2px solid var(--color-border);
}

.btn-secondary:hover {
  background: var(--color-background-soft);
  transform: translateY(-2px);
}

.intro {
  padding: 4rem 2rem;
}

.intro h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.intro p {
  font-size: 1.2rem;
  line-height: 1.8;
  color: var(--color-text);
  text-align: center;
}

@media (max-width: 768px) {
  .hero {
    padding: 3rem 1rem;
  }
  
  .title {
    font-size: 2.5rem;
  }
  
  .subtitle {
    font-size: 1.2rem;
  }
  
  .btn {
    font-size: 1rem;
    padding: 0.875rem 1.5rem;
  }
  
  .intro h2 {
    font-size: 2rem;
  }
  
  .intro p {
    font-size: 1.1rem;
  }
}
</style>
