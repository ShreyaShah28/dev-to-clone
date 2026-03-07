<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useArticleStore } from '../stores/article'
import ArticleCard from '../components/ArticleCard.vue'

const articleStore = useArticleStore()
const loadTrigger = ref<HTMLElement | null>(null)

function loadMore() {
  if (articleStore.isLoading || !articleStore.hasMore) return

  articleStore.isLoading = true
  articleStore.fetchArticles(true)
  articleStore.isLoading = false
}

function setupObserver() {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      loadMore()
    }
  })

  if (loadTrigger.value) {
    observer.observe(loadTrigger.value)
  }
}

onMounted(async () => {
  articleStore.page = 1
  articleStore.filterType = ''
  await articleStore.fetchArticles()
  setupObserver()
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
      <div ref="loadTrigger" class="h-10"></div>
    </div>
  </div>
</template>
