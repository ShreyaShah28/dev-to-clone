<script lang="ts" setup>
import { computed, watch } from 'vue'
import { useArticleStore } from '../stores/article'
import { useRoute } from 'vue-router'
import ArticleCard from '../components/ArticleCard.vue'
import LoadingView from './LoadingView.vue'

const route = useRoute()
// const tagname = computed(() => route.params.tag)
const articleStore = useArticleStore()
const tagArticles = computed(() => articleStore.currentTagArticles)

// async function loadInitialData() {
//   articleStore.isLoading = true
//   try {
//     const temp = await articleStore.fetchTagArticles(route.params.tag)
//     console.log('CurrentTagArticles: ', temp)
//   } catch (err) {
//     console.log(err)
//   } finally {
//     articleStore.isLoading = false
//   }
// }
watch(
  () => route.params.tag,
  async (newTag) => {
    articleStore.isLoading = true
    if (newTag) {
      await articleStore.fetchTagArticles(newTag as string)
    }
    articleStore.isLoading = false
  },
  { immediate: true } // runs first time also
)
// loadInitialData()
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
    <div class="grid grid-cols-1 gap-5 p-5">
      <ArticleCard v-for="article in tagArticles" :key="article.id" :article="article" />
    </div>
  </div>
</template>
