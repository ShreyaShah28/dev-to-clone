<script setup lang="ts">
import HeaderView from './views/HomeHeaderView.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <HeaderView
    class="sticky top-0 z-50 bg-white shadow h-36 md:h-18"
    v-if="route.name !== 'article'"
  />
  <div class="h-full w-full"><router-view /></div>
</template>
