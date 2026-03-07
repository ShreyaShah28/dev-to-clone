<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useArticleStore } from '../stores/article'
import { useRoute } from 'vue-router'
import ArticleCard from '../components/ArticleCard.vue'
import LoadingView from './LoadingView.vue'

const route = useRoute()
const articleStore = useArticleStore()
const loadTrigger = ref<HTMLElement | null>(null)
const loading = computed(() => articleStore.isLoading)

function setupObserver() {
  const observer = new IntersectionObserver(async (entries) => {
    if (entries[0].isIntersecting) {
      await articleStore.fetchTagArticles(route.params.username, true)
    }
  })

  if (loadTrigger.value) {
    observer.observe(loadTrigger.value)
  }
}

onMounted(async () => {
  articleStore.page = 1
  articleStore.filterType = ''
  articleStore.articles = []
  setupObserver()
})

watch(
  () => route.params.tag,
  async (newTag) => {
    articleStore.isLoading = true
    articleStore.filterType = ''
    if (newTag) {
      setupObserver()
    }
    articleStore.isLoading = false
  },
  { immediate: true } // runs first time also
)
</script>

<template>
  <LoadingView v-if="articleStore.isLoading"></LoadingView>
  <div class="flex flex-col" v-else>
    <div
      class="flex flex-row bg-white rounded-lg m-5 border-t-20 border-blue-700 p-10 text-3xl"
    >
      <p class="text-gray-500 italic">#</p>
      <p class="font-semibold">{{ route.params.tag }}</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 p-5">
      <ArticleCard />
    </div>
    <div v-if="loading" class="loading">Loading more posts...</div>

    <div ref="loadTrigger" class="h-10"></div>
  </div>
</template>
