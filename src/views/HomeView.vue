<script lang="ts" setup>
import { onMounted } from 'vue'
import { useArticleStore } from '../stores/article'
import ArticleCard from '../components/ArticleCard.vue'

const articleStore = useArticleStore()

onMounted(() => {
  articleStore.page = 1
  articleStore.filterType = ''
  articleStore.fetchArticles()
})
</script>
<template>
  <div class="">
    <div class="flex flex-col" v-if="articleStore.filteredArticles.length !== 0">
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 p-5">
        <ArticleCard />
        <!-- <div
          class="h-20 flex justify-center items-center"
          v-observe-visibility="
            articleStore.articleIndex === articles.length - 1 ? loadMore : false
          "
        ></div> -->
      </div>
    </div>
    <div
      class="text-6xl font-stretch-extra-condensed w-screen h-screen flex justify-center pt-[10%] font-serif text-gray-700"
      v-else
    >
      <p>No articles found!</p>
    </div>
  </div>
</template>
