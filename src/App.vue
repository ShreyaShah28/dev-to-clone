<script setup lang="ts">
import HeaderView from './views/HomeHeaderView.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// import { ref } from 'vue'

// const show = ref(true)
// const isVisible = ref(true)

// function visibilityChanged(isVisible, entry) {
//   isVisible.value = isVisible
//   console.log(entry)
// }
</script>
<template>
  <!-- <button @click="show = !show">Toggle</button>
  <label> <input type="checkbox" v-if="isVisible" disabled /> Is visible? </label>
  <div ref="test" v-show="show" v-observe-visibility="visibilityChanged">
    Hello world!
  </div> -->

  <HeaderView
    class="sticky top-0 z-50 bg-white shadow h-32 sm:h-18"
    v-if="route.name !== 'article'"
  />
  <div class="h-full w-full">
    <router-view />
  </div>
</template>
