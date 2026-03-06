<script lang="ts" setup>
import { watch } from 'vue'
import { useArticleStore } from '../stores/article'
import { useRoute } from 'vue-router'
import ArticleCard from '../components/ArticleCard.vue'
import LoadingView from './LoadingView.vue'

const route = useRoute()
const articleStore = useArticleStore()

watch(
  () => route.params.tag,
  async (newTag) => {
    articleStore.isLoading = true
    articleStore.filterType = ''
    if (newTag) {
      await articleStore.fetchTagArticles(route.params.tag, newTag as string)
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
  </div>
</template>
