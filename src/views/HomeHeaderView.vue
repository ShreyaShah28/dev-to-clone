<script lang="ts" setup>
import { useArticleStore } from '../stores/article'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const currentFilter = ref('')

function setFilter(filter: string) {
  articleStore.filterType = filter
  currentFilter.value = filter
}

const articleStore = useArticleStore()

watch(currentFilter, () => {
  articleStore.page = 1
  articleStore.articles = []
  articleStore.isLoading = true
  if (route?.name === 'home') articleStore.fetchArticles()
  else if (route?.name === 'tag') articleStore.fetchTagArticles(route.params.tag)
  else if (route?.name === 'user') articleStore.fetchUserArticles(route.params.username)
  articleStore.isLoading = false
})
</script>
<template>
  <div class="w-full flex flex-col md:flex-row justify-evenly items-center p-2">
    <div class="flex flex-row justify-between md:justify-normal w-full md:w-4/5">
      <router-link :to="`/`">
        <div
          class="bg-black text-white text-xl w-fit h-fit p-2 font-stretch-extra-condensed rounded-md"
        >
          <p class="w-fit h-fit">DEV.IO</p>
        </div>
      </router-link>
      <div class="rounded-lg border border-gray-900 ml-10 p-2 w-full md:w-1/2">
        <i class="fa-solid fa-magnifying-glass text-xl mr-2"></i>
        <input
          type="text"
          v-model="articleStore.searchQuery"
          placeholder="Search related posts..."
          class="w-15/17 border-none outline-none focus:outline-none"
        />
      </div>
    </div>
    <div
      class="flex flex-row justify-between md:justify-normal gap-10 p-5 ml-2 w-full md:w-fit"
    >
      <button
        @click="setFilter('new')"
        class="py-2 px-5 w-1/2"
        :class="
          articleStore.filterType === 'new'
            ? 'shadow-inner shadow-gray-300'
            : 'shadow-xl/20 shadow-gray-800'
        "
      >
        NEW
      </button>
      <button
        @click="setFilter('top')"
        class="py-2 px-5 w-1/2"
        :class="
          articleStore.filterType === 'top'
            ? 'shadow-inner shadow-gray-300'
            : 'shadow-xl/20 shadow-gray-800'
        "
      >
        TOP
      </button>
    </div>
  </div>
</template>
