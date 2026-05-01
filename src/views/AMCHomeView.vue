<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  loadAllAMCProblemsMeta,
  amcCategory,
  amcSortKey,
  type AMCProblemMeta,
} from '@/utils/amc'

const router = useRouter()
const allProblems = ref<AMCProblemMeta[]>([])
const loading = ref(true)

onMounted(async () => {
  const metas = await loadAllAMCProblemsMeta()
  allProblems.value = [...metas].sort((a, b) => {
    const ka = amcSortKey(a)
    const kb = amcSortKey(b)
    for (let i = 0; i < ka.length; i++) {
      const ai = ka[i] as string | number
      const bi = kb[i] as string | number
      if (ai < bi) return -1
      if (ai > bi) return 1
    }
    return 0
  })
  loading.value = false
})

const CATEGORIES = ['AMC8', 'AMC10', 'AMC12', 'Other'] as const

const grouped = computed(() => {
  const map: Record<string, AMCProblemMeta[]> = {}
  for (const cat of CATEGORIES) map[cat] = []
  for (const p of allProblems.value) {
    const cat = amcCategory(p.metadata.contest)
    ;(map[cat] ??= []).push(p)
  }
  return map
})
</script>

<template>
  <main class="amc-home">
    <header class="amc-home-header">
      <h1>AMC Problems</h1>
      <p class="amc-home-subtitle">Browse problems by competition</p>
    </header>

    <div v-if="loading" class="amc-home-loading">Loading…</div>

    <template v-else>
      <section
        v-for="cat in CATEGORIES"
        :key="cat"
        v-show="(grouped[cat] ?? []).length > 0"
        class="amc-category"
      >
        <h2 class="amc-category-title">{{ cat }}</h2>

        <!-- Group problems by contest within each category -->
        <template v-for="(contestProblems, contest) in groupByContest(grouped[cat] ?? [])" :key="contest">
          <h3 class="amc-contest-title">{{ contest }}</h3>
          <ul class="amc-problem-list">
            <li v-for="p in contestProblems" :key="p.id">
              <router-link :to="`/amc/${p.id}`" class="amc-problem-link">
                Problem {{ p.metadata.problemNumber }}
              </router-link>
            </li>
          </ul>
        </template>
      </section>
    </template>
  </main>
</template>

<script lang="ts">
// Helper outside setup so we can use it in the template
function groupByContest(problems: import('@/utils/amc').AMCProblemMeta[]) {
  const map: Record<string, import('@/utils/amc').AMCProblemMeta[]> = {}
  for (const p of problems) {
    const key = p.metadata.contest
    if (!map[key]) map[key] = []
    map[key].push(p)
  }
  return map
}
</script>

<style scoped>
.amc-home {
  max-width: 760px;
  margin: 2.5rem auto;
  padding: 0 1.5rem 4rem;
  font-family: inherit;
}

.amc-home-header {
  margin-bottom: 2rem;
  border-bottom: 2px solid var(--color-border, #ddd);
  padding-bottom: 1rem;
}

.amc-home-header h1 {
  margin: 0 0 0.25rem;
  font-size: 2rem;
  color: var(--color-heading, #222);
}

.amc-home-subtitle {
  margin: 0;
  color: var(--color-text-secondary, #666);
  font-size: 0.95rem;
}

.amc-home-loading {
  text-align: center;
  opacity: 0.6;
  margin-top: 3rem;
}

.amc-category {
  margin-bottom: 2.5rem;
}

.amc-category-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-heading, #222);
  margin-bottom: 0.75rem;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid var(--color-border, #eee);
}

.amc-contest-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text-secondary, #555);
  margin: 1rem 0 0.4rem;
}

.amc-problem-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.amc-problem-link {
  display: inline-block;
  padding: 0.35rem 0.85rem;
  border: 1.5px solid var(--color-border, #ccc);
  border-radius: 6px;
  font-size: 0.9rem;
  color: var(--color-text, #333);
  text-decoration: none;
  background: var(--color-background-soft, #f9f9f9);
  transition: background 0.18s, border-color 0.18s;
}

.amc-problem-link:hover {
  background: var(--color-background-mute, #efefef);
  border-color: #888;
}
</style>
