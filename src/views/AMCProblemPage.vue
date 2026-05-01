<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import { loadAMCProblem, type AMCProblem } from '@/utils/amc'

declare const MathJax: {
  typesetPromise: (nodes?: HTMLElement[]) => Promise<void>
  startup: { promise: Promise<void> }
}

const route = useRoute()
const problem = ref<AMCProblem | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const selectedAnswer = ref<number | null>(null) // 1-based, null = not yet chosen
const solutionOpen = ref(false)

const LABELS = ['(A)', '(B)', '(C)', '(D)', '(E)']

// Render inline markdown (no wrapping <p> for single-line strings)
function renderInline(src: string): string {
  return (marked.parse(src) as string).replace(/^<p>([\s\S]*?)<\/p>\s*$/, '$1')
}

const problemHtml = computed(() =>
  problem.value ? (marked.parse(problem.value.problem) as string) : ''
)

type DisplayPart =
  | { kind: 'markdown'; html: string }
  | { kind: 'iframe'; srcdoc: string; index: number }

const displayParts = computed((): DisplayPart[] => {
  if (!problem.value) return []
  let iframeIdx = 0
  return problem.value.solutionSegments.map((seg) => {
    if (seg.type === 'markdown') {
      return { kind: 'markdown' as const, html: marked.parse(seg.content) as string }
    }
    return { kind: 'iframe' as const, srcdoc: seg.html, index: iframeIdx++ }
  })
})

const iframeHeights = ref<Record<number, number>>({})

function onIframeMessage(e: MessageEvent) {
  if (typeof e.data?.iframeHeight !== 'number') return
  const frames = document.querySelectorAll<HTMLIFrameElement>('.amc-interactive-frame')
  frames.forEach((frame, i) => {
    if (frame.contentWindow === e.source) {
      iframeHeights.value = { ...iframeHeights.value, [i]: e.data.iframeHeight }
    }
  })
}

const answersHtml = computed(() =>
  problem.value ? problem.value.answers.map(renderInline) : []
)

const pageRef = ref<HTMLElement | null>(null)

async function typeset() {
  await nextTick()
  if (typeof MathJax !== 'undefined' && pageRef.value) {
    await MathJax.startup.promise
    await MathJax.typesetPromise([pageRef.value])
  }
}

async function loadProblem(id: string) {
  loading.value = true
  error.value = null
  selectedAnswer.value = null
  solutionOpen.value = false
  try {
    const p = await loadAMCProblem(id)
    if (!p) {
      error.value = `Problem "${id}" not found.`
    } else {
      problem.value = p
    }
  } catch (e) {
    error.value = String(e)
  } finally {
    loading.value = false
    await typeset()
  }
}

onMounted(() => {
  loadProblem(route.params.id as string)
  window.addEventListener('message', onIframeMessage)
})
onUnmounted(() => window.removeEventListener('message', onIframeMessage))
watch(() => route.params.id, (id) => id && loadProblem(id as string))
watch([selectedAnswer, solutionOpen], typeset)
</script>

<template>
  <main class="amc-page" ref="pageRef">
    <div v-if="loading" class="amc-loading">Loading…</div>
    <div v-else-if="error" class="amc-error">{{ error }}</div>

    <template v-else-if="problem">
      <!-- Header -->
      <header class="amc-header">
        <span class="amc-contest">{{ problem.metadata.contest }}</span>
        <span class="amc-problem-num">Problem {{ problem.metadata.problemNumber }}</span>
      </header>

      <!-- Problem statement -->
      <section class="amc-problem" v-html="problemHtml" />

      <!-- Answer choices table -->
      <table class="amc-answers">
        <tbody>
          <tr>
            <td
              v-for="(html, i) in answersHtml"
              :key="i"
              class="amc-answer-cell"
              :class="{
                'amc-answer-correct': selectedAnswer === i + 1 && i + 1 === problem.metadata.answer,
                'amc-answer-incorrect': selectedAnswer === i + 1 && i + 1 !== problem.metadata.answer,
              }"
              @click="selectedAnswer = selectedAnswer === null ? i + 1 : null"
            >
              <span class="amc-answer-label">{{ LABELS[i] }}</span>
              <span class="amc-answer-value" v-html="html" />
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Buttons row -->
      <div class="amc-controls">
        <button class="amc-btn" @click="solutionOpen = !solutionOpen">
          {{ solutionOpen ? '▲ Hide Solution' : '▼ Show Solution' }}
        </button>
      </div>

      <!-- Solution collapsible -->
      <div v-if="solutionOpen" class="amc-solution">
        <template v-for="(part, i) in displayParts" :key="i">
          <div v-if="part.kind === 'markdown'" class="amc-solution-text" v-html="part.html" />
          <iframe
            v-else-if="part.kind === 'iframe'"
            class="amc-interactive-frame"
            :srcdoc="part.srcdoc"
            sandbox="allow-scripts"
            scrolling="no"
            :style="{ height: (iframeHeights[part.index] ?? 520) + 'px' }"
          />
        </template>
      </div>
    </template>
  </main>
</template>

<style scoped>
.amc-page {
  max-width: 820px;
  margin: 2rem auto;
  padding: 0 1.5rem 3rem;
  font-family: inherit;
  line-height: 1.7;
}

.amc-loading,
.amc-error {
  text-align: center;
  margin-top: 4rem;
  opacity: 0.6;
  font-size: 1.1rem;
}

.amc-header {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 1.25rem;
  border-bottom: 2px solid var(--color-border, #ddd);
  padding-bottom: 0.5rem;
}

.amc-contest {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-heading, #333);
}

.amc-problem-num {
  font-size: 0.9rem;
  color: var(--color-text-secondary, #666);
}

/* Problem statement */
.amc-problem {
  margin-bottom: 1.5rem;
  font-size: 1.05rem;
}

/* Answer choices */
.amc-answers {
  width: 100%;
  border-collapse: separate;
  border-spacing: 6px 0;
  margin-bottom: 1rem;
}

.amc-answer-cell {
  padding: 0.5rem 0.75rem;
  border: 2px solid transparent;
  border-radius: 6px;
  background: var(--color-background-soft, #f5f5f5);
  white-space: nowrap;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.25s, background 0.25s, opacity 0.25s;
}

.amc-answer-cell:hover:not(.amc-answer-selected) {
  border-color: var(--color-border, #bbb);
}

/* When any answer is selected, dim all cells by default... */
.amc-answer-cell.amc-answer-selected {
  opacity: 0.45;
  cursor: pointer;
}

/* ...then un-dim and highlight the correct one */
.amc-answer-cell.amc-answer-correct {
  border-color: #2a9d4e;
  background: #eafaf1;
  color: #166534;
  font-weight: 600;
  opacity: 1;
}

/* Highlight the wrong chosen answer in red */
.amc-answer-cell.amc-answer-incorrect {
  border-color: #dc2626;
  background: #fef2f2;
  color: #991b1b;
  font-weight: 600;
  opacity: 1;
}

.amc-answer-label {
  font-weight: 600;
  margin-right: 0.35em;
  color: var(--color-text-secondary, #555);
}

/* Buttons */
.amc-controls {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.amc-btn {
  width: 160px;
  padding: 0.45rem 0;
  border: 2px solid var(--color-border, #bbb);
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
  font-size: 0.95rem;
  font-family: inherit;
  color: var(--color-text-secondary, #bbb);
  text-align: center;
  transition: background 0.2s, border-color 0.2s;
}

.amc-btn:hover {
  background: var(--color-background-mute, #e8e8e8);
  border-color: #888;
}

/* Solution */
.amc-solution {
  border-left: 4px solid var(--color-border, #ccc);
  background: var(--color-background-soft, #fafafa);
  border-radius: 0 6px 6px 0;
  overflow: hidden;
}

.amc-solution-text {
  padding: 1rem 1.25rem;
  font-size: 1rem;
}

.amc-interactive-frame {
  display: block;
  width: 100%;
  border: none;
  transition: height 0.2s ease;
}
</style>
