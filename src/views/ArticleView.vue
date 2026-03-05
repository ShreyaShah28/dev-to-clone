<script lang="ts" setup>
import { computed } from 'vue'
import { VMarkdownView } from 'vue3-markdown'
import 'vue3-markdown/dist/vue3-markdown.css'
import { useArticleStore } from '../stores/article'
import { useRoute } from 'vue-router'
import LoadingView from './LoadingView.vue'

const route = useRoute()

const mode = 'light'

const articleStore = useArticleStore()
const article = computed(() => articleStore.currentArticle)
const parsedMarkdown = computed(() => articleStore.currentArticle.body_markdown)

async function loadInitialData() {
  articleStore.isLoading = true
  const temp = await articleStore.fetchCurrentArticle(route.params.id)
  console.log(temp)
  articleStore.isLoading = false
}

loadInitialData()
</script>

<template>
  <div class="flex flex-col md:flex-row">
    <LoadingView v-if="articleStore.isLoading === true" />
    <div v-else class="p-10 bg-white">
      <img :src="article.cover_image" alt="" class="w-full" />
      <div class="px-10 py-5">
        <div class="flex flex-row items-center gap-3">
          <img
            :src="article.user.profile_image_90"
            alt=""
            class="w-10 h-10 rounded-full"
          />
          <div class="flex flex-col">
            <p class="text-black/80 text-md font-semibold">
              <router-link :to="`/user/${article.user.username}`">
                {{ article.user.name }}
              </router-link>
            </p>
            <p class="text-xs text-gray-500">
              Posted on {{ article.readable_publish_date }}
            </p>
          </div>
        </div>
        <p class="text-5xl font-bold py-5">{{ article.title }}</p>
        <div class="flex flex-row gap-5">
          <button
            v-for="(tag, index) in article.tags"
            :class="articleStore.buttonColorClass[index]"
            class="text-sm py-2 px-3 rounded-md"
          >
            <router-link :to="`/tag/${tag}`">
              <span>#</span><span class="text-black/80">{{ tag }}</span>
            </router-link>
          </button>
        </div>
        <!-- <div v-html="parsedMarkdown" class="prose dark:prose-invert"></div>-->
        <VMarkdownView :mode="mode" :content="parsedMarkdown"></VMarkdownView>
      </div>
    </div>
  </div>
</template>
