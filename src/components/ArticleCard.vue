<script lang="ts" setup>
import { computed } from 'vue'
import { useArticleStore } from '../stores/article'

const articleStore = useArticleStore()
const articles = computed(() => articleStore.filteredArticles)
</script>

<template>
  <div v-for="(article, index) in articles" :key="article.id">
    <div class="bg-gray-50 p-5 rounded-md h-fit">
      <router-link :to="`/user/${article.user.username}`">
        <div class="flex flex-row items-center gap-3">
          <img :src="article.user.profile_image_90" alt="" class="rounded-full h-8 w-8" />
          <div class="flex flex-col">
            <p class="text-gray-800/80 text-sm">{{ article?.user?.name }}</p>
            <p class="text-xs text-gray-500">{{ article?.readable_publish_date }}</p>
          </div>
        </div>
      </router-link>
      <div class="flex flex-col justify-between ml-8">
        <router-link :to="`/article/${article?.id}`">
          <p
            class="p-2 pr-8 text-xl sm:text-2xl md:text-3xl font-semibold hover:text-blue-800/90"
          >
            {{ article?.title }}
          </p>
        </router-link>
        <div class="flex flex-wrap gap-2 sm:gap-5 mb-3">
          <div v-for="(tag, index) in article?.tag_list" :key="tag" class="">
            <router-link :to="`/tag/${tag}`">
              <button
                :class="articleStore.buttonColorClass[index]"
                class="text-sm py-2 px-3 rounded-md"
              >
                <span>#</span><span class="text-black/80">{{ tag }}</span>
              </button>
            </router-link>
          </div>
        </div>
        <div class="flex flex-row justify-between">
          <div class="flex flex-row gap-3">
            <div class="flex flex-row gap-1 items-center text-sm text-gray-600">
              <i
                class="fa-heart text-xl"
                :class="
                  article?.positive_reactions_count !== 0
                    ? 'fa-solid text-red-500'
                    : 'fa-regular text-gray-400'
                "
              ></i>
              <span>{{ `${article?.positive_reactions_count}` }}</span>
            </div>
            <div class="flex flex-row gap-1 items-center text-sm text-gray-600">
              <i class="fa-regular fa-comment text-lg"></i>
              <span>{{ `${article?.comments_count}` }}</span>
            </div>
          </div>
          <div class="flex flex-row items-center text-sm text-gray-500">
            <span>{{ `${article?.reading_time_minutes} min read` }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
