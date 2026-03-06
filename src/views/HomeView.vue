<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { useArticleStore } from '../stores/article'
import ArticleCard from '../components/ArticleCard.vue'

const articleStore = useArticleStore()
const articles = computed(() => articleStore.filteredArticles)
onMounted(() => {
  articleStore.isLoading = true
  articleStore.fetchArticles()
  articleStore.isLoading = false
})
</script>
<template>
  <div
    class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 p-5"
    v-if="articles.length !== 0"
  >
    <ArticleCard v-for="article in articles" :key="article.id" :article="article" />
  </div>
  <div
    class="text-6xl font-stretch-extra-condensed w-screen h-screen flex justify-center pt-[10%] font-serif text-gray-700"
    v-else
  >
    <p>No articles found!</p>
  </div>
</template>
