<script lang="ts" setup>
import { useArticleStore } from '../stores/article'
const articleStore = useArticleStore()
</script>
<template>
  <div class="w-full flex flex-row justify-center items-center p-2">
    <div
      class="bg-black text-white text-xl w-16 h-fit p-2 font-stretch-extra-condensed rounded-md"
    >
      <p class="w-fit h-fit">DEV.IO</p>
    </div>
    <div class="rounded-lg border border-gray-900 ml-10 p-2 w-full md:w-1/2">
      <i class="fa-solid fa-magnifying-glass text-xl mr-2"></i>
      <input
        type="text"
        v-model="articleStore.searchQuery"
        placeholder="Find related posts..."
        class="w-11/12 border-none outline-none focus:outline-none"
      />
    </div>
  </div>
</template>
