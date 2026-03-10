<script lang="ts" setup>
import { nextTick, onMounted, ref, watch } from 'vue'
import { useArticleStore } from '../stores/article'
import { useRoute } from 'vue-router'
import ArticleCard from '../components/ArticleCard.vue'
import LoadingView from './LoadingView.vue'

const route = useRoute()
const articleStore = useArticleStore()
const loadTrigger = ref<HTMLElement | null>(null)

function setupObserver() {
  const observer = new IntersectionObserver(async (entries) => {
    if (entries[0].isIntersecting && articleStore.page !== 1) {
      await articleStore.fetchTagArticles(route.params.tag, true)
    }
  })

  if (loadTrigger.value) {
    observer.observe(loadTrigger.value)
  }
}

watch(
  () => route.params.tag,
  async () => {
    articleStore.isLoading = true
    articleStore.resetFeaturesFunction()
    // if (newTag) {
    await articleStore.fetchTagArticles(route.params.tag, true)
    // }
    articleStore.isLoading = false
    await nextTick()
    setupObserver()
  },
  { immediate: true } // runs first time also
)

onMounted(async () => {
  articleStore.isLoading = true
  articleStore.resetFeaturesFunction()
  await articleStore.fetchTagArticles(route.params.tag, true)
  setupObserver()
  articleStore.isLoading = false
})
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
    <div ref="loadTrigger" class="h-10 text-center">
      <span v-if="articleStore.hasMore">Loading...</span>
    </div>
  </div>
</template>
