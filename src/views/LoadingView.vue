<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
// const gridLength = ['', '', '', '', '', '', '', '', '']
const gridLength = Array(9).fill(null)
const route = useRoute()

const loadStatus = computed(() => route.name)
</script>
<template>
  <div
    class="flex flex-col justify-center items-center gap-5 w-full"
    v-if="loadStatus === 'article'"
  >
    <div class="animate-pulse bg-gray-300 w-full md:w-3/4 xl:w-1/2 h-80 mt-10"></div>
    <div class="flex flex-col px-10 w-full md:w-3/4 xl:w-1/2 gap-10">
      <div class="flex flex-row gap-5">
        <div class="animate-pulse bg-gray-300 w-18 h-18 rounded-full"></div>
        <div class="flex flex-col justify-around">
          <div class="animate-pulse bg-gray-300 w-28 h-4 rounded-lg"></div>
          <div class="animate-pulse bg-gray-300 w-24 h-3 rounded-lg"></div>
        </div>
      </div>
      <div class="flex flex-col gap-5">
        <div class="animate-pulse bg-gray-300 w-full h-20 rounded-lg"></div>
        <div class="flex flex-row justify-between w-4/5">
          <div class="animate-pulse bg-gray-300 w-1/6 h-5 rounded-lg"></div>
          <div class="animate-pulse bg-gray-300 w-1/6 h-5 rounded-lg"></div>
          <div class="animate-pulse bg-gray-300 w-1/6 h-5 rounded-lg"></div>
          <div class="animate-pulse bg-gray-300 w-1/6 h-5 rounded-lg"></div>
        </div>
        <div class="animate-pulse bg-gray-300 w-1/6 h-5 rounded-lg"></div>
        <div class="animate-pulse bg-gray-300 w-full h-5 rounded-lg"></div>
        <div class="animate-pulse bg-gray-300 w-1/2 h-5 rounded-lg"></div>
        <div class="animate-pulse bg-gray-300 w-1/2 h-5 rounded-lg"></div>
        <div class="animate-pulse bg-gray-300 w-1/6 h-5 rounded-lg"></div>
        <div class="animate-pulse bg-gray-300 w-full h-5 rounded-lg"></div>
        <div class="animate-pulse bg-gray-300 w-1/2 h-5 rounded-lg"></div>
        <div class="animate-pulse bg-gray-300 w-1/2 h-5 rounded-lg"></div>
      </div>
    </div>
  </div>

  <div class="flex flex-col" v-if="loadStatus === 'tag'">
    <div class="animate-pulse bg-gray-300 w-4/5 h-32 m-5"></div>
  </div>

  <div
    class="flex flex-col justify-center items-center gap-5"
    v-if="loadStatus === 'user'"
  >
    <div class="animate-pulse bg-gray-300 w-32 h-32 rounded-full m-5"></div>
    <div class="animate-pulse bg-gray-300 w-1/7 h-12 rounded-lg"></div>
    <div class="flex flex-row w-full justify-center items-center gap-5">
      <div class="animate-pulse bg-gray-300 w-1/9 h-5 rounded-full"></div>
      <div class="animate-pulse bg-gray-300 w-1/9 h-5 rounded-lg"></div>
    </div>
  </div>

  <div class="" v-if="loadStatus !== 'article'">
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-15 p-5">
      <div v-for="value in gridLength" class="">
        <div class="flex flex-row gap-2 w-full">
          <div class="animate-pulse bg-gray-300 w-18 h-18 rounded-lg"></div>
          <div class="flex flex-col w-full gap-2">
            <div class="animate-pulse bg-gray-300 w-4/5 h-5 rounded-lg"></div>
            <div class="animate-pulse bg-gray-300 w-5/6 h-20 rounded-lg"></div>
            <div class="flex flex-row justify-between w-4/5">
              <div class="animate-pulse bg-gray-300 w-1/6 h-5 rounded-lg"></div>
              <div class="animate-pulse bg-gray-300 w-1/6 h-5 rounded-lg"></div>
              <div class="animate-pulse bg-gray-300 w-1/6 h-5 rounded-lg"></div>
              <div class="animate-pulse bg-gray-300 w-1/6 h-5 rounded-lg"></div>
            </div>
            <div class="flex flex-row justify-between w-5/6">
              <div class="animate-pulse bg-gray-300 w-1/6 h-5 rounded-lg"></div>
              <div class="animate-pulse bg-gray-300 w-1/6 h-5 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
