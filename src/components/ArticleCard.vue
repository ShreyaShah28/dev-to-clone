<script lang="ts" setup>
import { useArticleStore } from '../stores/article'

const articleStore = useArticleStore()

const props = defineProps({
  article: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="bg-gray-50 p-5 rounded-md">
    <router-link :to="`/user/${article.user.username}`">
      <div class="flex flex-row items-center gap-3">
        <img :src="article.user.profile_image_90" alt="" class="rounded-full h-8 w-8" />
        <div class="flex flex-col">
          <p class="text-gray-800/80 text-sm">{{ article.user.name }}</p>
          <p class="text-xs text-gray-500">{{ article.readable_publish_date }}</p>
        </div>
      </div>
    </router-link>
    <div class="flex flex-col justify-between ml-8">
      <p class="p-2 pr-8 text-3xl font-semibold hover:text-blue-800/90">
        <router-link :to="`/article/${article.id}`">
          {{ article.title }}
        </router-link>
      </p>
      <div class="flex flex-wrap sm:flex-row gap-2 sm:gap-5">
        <button
          v-for="(tag, index) in article.tag_list"
          :class="articleStore.buttonColorClass[index]"
          class="text-sm py-2 px-3 rounded-md"
        >
          <router-link :to="`/tag/${tag}`">
            <span>#</span><span class="text-black/80">{{ tag }}</span>
          </router-link>
        </button>
      </div>
      <div class="flex flex-row justify-between">
        <div class="flex flex-row gap-1 items-center text-sm text-gray-600">
          <i class="fa-regular fa-comment text-lg p-1"></i>
          <span>{{ `${article.comments_count} comments` }}</span>
        </div>
        <div class="flex flex-row items-center text-sm text-gray-500">
          <span>{{ `${article.reading_time_minutes} min read` }}</span>
          <!-- <i class="fa-regular fa-bookmark text-lg mx-5 text-black"></i> -->
        </div>
      </div>
    </div>
  </div>
</template>
