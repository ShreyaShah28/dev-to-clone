<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ContentLoader } from 'vue-content-loader'

const gridLength = Array.from({ length: 9 })
const route = useRoute()

const loadStatus = computed(() => route.name)
</script>
<template>
  <div
    class="flex flex-col justify-center items-center gap-5 w-full h-fit"
    v-if="loadStatus === 'article'"
  >
    <ContentLoader viewBox="0 0 800 400" height="400" width="800">
      <!-- cover image -->
      <rect x="0" y="0" rx="8" ry="8" width="800" height="220" />

      <!-- author avatar -->
      <circle cx="40" cy="270" r="30" />

      <!-- author name -->
      <rect x="90" y="250" rx="4" ry="4" width="150" height="12" />

      <!-- publish date -->
      <rect x="90" y="270" rx="4" ry="4" width="120" height="10" />

      <!-- article title -->
      <rect x="0" y="320" rx="6" ry="6" width="600" height="22" />

      <!-- tags -->
      <rect x="0" y="360" rx="4" ry="4" width="80" height="12" />
      <rect x="100" y="360" rx="4" ry="4" width="80" height="12" />
      <rect x="200" y="360" rx="4" ry="4" width="80" height="12" />
      <rect x="300" y="360" rx="4" ry="4" width="80" height="12" />

      <!-- article text lines -->
      <rect x="0" y="400" rx="4" ry="4" width="750" height="12" />
      <rect x="0" y="420" rx="4" ry="4" width="650" height="12" />
      <rect x="0" y="440" rx="4" ry="4" width="650" height="12" />
      <rect x="0" y="460" rx="4" ry="4" width="500" height="12" />
      <rect x="0" y="500" rx="4" ry="4" width="750" height="12" />
      <rect x="0" y="520" rx="4" ry="4" width="600" height="12" />
      <rect x="0" y="540" rx="4" ry="4" width="600" height="12" />
    </ContentLoader>
  </div>

  <div class="flex flex-col" v-if="loadStatus === 'tag'">
    <ContentLoader viewBox="0 0 500 150" height="150" width="500">
      <rect x="20" y="20" rx="8" ry="8" width="460" height="120" />
    </ContentLoader>
  </div>

  <div
    class="flex flex-col justify-center items-center gap-5"
    v-if="loadStatus === 'user'"
  >
    <ContentLoader viewBox="0 0 400 200" height="200" width="400">
      <!-- avatar -->
      <circle cx="200" cy="60" r="60" />

      <!-- username -->
      <rect x="120" y="140" rx="6" ry="6" width="160" height="20" />

      <!-- stats -->
      <rect x="120" y="170" rx="10" ry="10" width="70" height="15" />
      <rect x="210" y="170" rx="6" ry="6" width="70" height="15" />
    </ContentLoader>
  </div>

  <div class="" v-if="loadStatus !== 'article'">
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-15 p-5">
      <ContentLoader
        v-for="(_, index) in gridLength"
        :key="index"
        viewBox="0 0 400 160"
        height="160"
        width="400"
      >
        <!-- avatar -->
        <rect x="0" y="0" rx="5" ry="5" width="60" height="60" />

        <!-- title -->
        <rect x="70" y="10" rx="4" ry="4" width="250" height="10" />

        <!-- subtitle -->
        <rect x="70" y="30" rx="4" ry="4" width="180" height="10" />

        <!-- body -->
        <rect x="0" y="80" rx="4" ry="4" width="350" height="12" />
        <rect x="0" y="100" rx="4" ry="4" width="300" height="12" />
      </ContentLoader>
    </div>
  </div>
</template>
