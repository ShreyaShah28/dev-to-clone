<script lang="ts" setup>
import { useArticleStore } from '../stores/article'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const currentFilter = ref('')

function setFilter(filter: string) {
  currentFilter.value = filter
}

function activeButton(filter: string) {
  return currentFilter.value === filter
    ? 'px-4 py-2 font-semibold border-b-2 border-black dark:border-white'
    : 'px-4 py-2 text-gray-500 hover:text-black dark:hover:text-white'
}
const articleStore = useArticleStore()

watch(currentFilter, () => {
  articleStore.isLoading = true
  if (route.name === 'home') articleStore.fetchArticles(currentFilter.value)
  else if (route.name === 'tag')
    articleStore.fetchTagArticles(route.params.tag, currentFilter.value)
  else if (route.name === 'user') articleStore.filterUsers(currentFilter.value)
  articleStore.isLoading = false
})
</script>
<template>
  <div class="w-full flex flex-row justify-evenly items-center p-2">
    <router-link :to="`/`">
      <div
        class="bg-black text-white text-xl w-16 h-fit p-2 font-stretch-extra-condensed rounded-md"
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
        class="w-11/12 border-none outline-none focus:outline-none"
      />
    </div>
    <div class="flex flex-row gap-5 ml-2">
      <button
        @click="setFilter('new')"
        :class="activeButton('new')"
        class="py-2 px-5 shadow-xl/20 shadow-gray-800"
      >
        NEW
      </button>
      <button
        @click="setFilter('top')"
        :class="activeButton('top')"
        class="py-2 px-5 shadow-xl/20 shadow-gray-800"
      >
        TOP
      </button>
    </div>
  </div>
</template>
