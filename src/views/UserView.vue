<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useArticleStore } from '../stores/article'
import { useRoute } from 'vue-router'
import ArticleCard from '../components/ArticleCard.vue'
import LoadingView from './LoadingView.vue'

const route = useRoute()
const articleStore = useArticleStore()
const userInformation = computed(() => articleStore.currentUserInformation)
const loadTrigger = ref<HTMLElement | null>(null)
const loading = computed(() => articleStore.isLoading)

function setupObserver() {
  const observer = new IntersectionObserver(async (entries) => {
    if (entries[0].isIntersecting && articleStore.page !== 1) {
      await articleStore.fetchUserArticles(route.params.username, true)
    }
  })

  if (loadTrigger.value) {
    observer.observe(loadTrigger.value)
  }
}

onMounted(async () => {
  articleStore.isLoading = true
  articleStore.resetFeaturesFunction()
  await articleStore.fetchUserArticles(route.params.username, false)
  setupObserver()
  articleStore.isLoading = false
})
</script>

<template>
  <LoadingView v-if="articleStore.isLoading" />
  <div class="flex flex-col" v-else>
    <div class="h-fit m-5 bg-white rounded-lg overflow-hidden">
      <div
        class="flex justify-center bg-linear-to-b from-blue-700 from-50% to-white to-50% p-5"
      >
        <div class="rounded-full bg-white border-8 border-blue-700 overflow-hidden">
          <img :src="userInformation.profile_image" alt="" class="w-40 h-40" />
        </div>
      </div>
      <p class="text-4xl text-center font-semibold">
        {{ userInformation.name }}
      </p>
      <div class="flex flex-row justify-center p-10 gap-3">
        <span
          v-if="userInformation.github_username"
          class="flex flex-row items-center gap-1"
        >
          <i class="fa-brands fa-github text-xl"></i>
          <p>{{ userInformation.github_username }}</p>
        </span>
        <span
          v-if="userInformation.twitter_username"
          class="flex flex-row items-center gap-1"
        >
          <i class="fa-brands fa-twitter text-xl"></i>
          <p>{{ userInformation.twitter_username }}</p>
        </span>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 p-5">
      <ArticleCard />
    </div>
    <div ref="loadTrigger" class="h-10"></div>
  </div>
</template>
