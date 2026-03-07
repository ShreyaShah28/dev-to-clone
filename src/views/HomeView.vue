<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useArticleStore } from '../stores/article'
import ArticleCard from '../components/ArticleCard.vue'

const articleStore = useArticleStore()
const loadTrigger = ref<HTMLElement | null>(null)
const loading = computed(() => articleStore.isLoading)

function setupObserver() {
  const observer = new IntersectionObserver(async (entries) => {
    if (entries[0].isIntersecting) {
      await articleStore.fetchArticles(true)
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
</script>
<template>
  <div class="">
    <div class="flex flex-col" v-if="articleStore.filteredArticles.length !== 0">
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 p-5">
        <ArticleCard />
      </div>
    </div>
    <div v-if="loading" class="loading">Loading more posts...</div>

    <div ref="loadTrigger" class="h-10"></div>
  </div>
</template>
