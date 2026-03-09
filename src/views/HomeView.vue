<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useArticleStore } from '../stores/article'
import ArticleCard from '../components/ArticleCard.vue'
import LoadingView from './LoadingView.vue'

const articleStore = useArticleStore()
const loadTrigger = ref<HTMLElement | null>(null)

function setupObserver() {
  const observer = new IntersectionObserver(async (entries) => {
    if (entries[0].isIntersecting && articleStore.page !== 1) {
      await articleStore.fetchArticles()
    }
  })

  if (loadTrigger.value) {
    observer.observe(loadTrigger.value)
  }
}

onMounted(async () => {
  articleStore.isLoading = true
  articleStore.resetFeaturesFunction()
  await articleStore.fetchArticles()
  console.log(articleStore.articles)
  setupObserver()
  articleStore.isLoading = false
})
</script>
<template>
  <div class="">
    <LoadingView v-if="articleStore.isLoading" />
    <div class="flex flex-col" v-if="articleStore.filteredArticles.length !== 0">
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 p-5">
        <ArticleCard />
      </div>
    </div>
    <div ref="loadTrigger" class="h-10"></div>
  </div>
</template>
