<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="home">
    <div class="hero">
      <div class="container">
        <div class="hero-content">
          <img src="/assets/images/headshot.jpg" alt="Headshot" class="headshot" />
          
          <div class="hero-text">
            <h1 class="title">Hi! I'm Charles Paxson!</h1>
            <p class="subtitle">
              I'm graduating with my M.S. in Mechanical Engineering soon!
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
      </div>
    </div>
  </main>
</template>

<style scoped>
.home {
  min-height: auto;
}

.hero {
  padding: 4rem 2rem;
  background: linear-gradient(135deg, var(--color-background) 0%, var(--color-background-soft) 100%);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  min-height: auto;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
}

.hero-content {
  display: flex;
  align-items: center;
  gap: 3rem;
}

.headshot {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  border: 4px solid var(--color-background);
}

.hero-text {
  flex: 1;
  text-align: left;
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

@media (max-width: 768px) {
  .hero {
    padding: 3rem 1rem;
    min-height: auto;
  }
  
  .hero-content {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }
  
  .hero-text {
    text-align: center;
  }
  
  .headshot {
    width: 180px;
    height: 180px;
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
  
  .cta-buttons {
    justify-content: center;
  }
}
</style>
