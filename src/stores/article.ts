import { defineStore } from 'pinia'
import axios from 'axios'
import { currentArticle, currentTagArticles } from '../stub/article'
import { currentUserArticles } from '../stub/article'

export const useArticleStore = defineStore('task', {

    state: () => ({
        isLoading: false,
        searchQuery: '',
        articles: [],
        currentArticle: {
            ...currentArticle
        },
        currentUserArticles: {
            ...currentUserArticles
        },
        currentUserInformation: {
            ...currentUserArticles.user
        },
        currentTagArticles: {
            ...currentTagArticles
        },
        buttonColorClass: [
            'hover:bg-purple-300/20 hover:border hover:border-purple-400/40 text-purple-500',
            'hover:bg-green-300/20 hover:border hover:border-green-400/40 text-green-500',
            'hover:bg-pink-300/20 hover:border hover:border-pink-400/40 text-pink-500',
            'hover:bg-blue-300/20 hover:border hover:border-blue-400/40 text-blue-500',
        ]
    }),
    getters: {
        filteredArticles:(state)=> {
            if (!state.searchQuery) return state.articles

            const query = this.searchQuery.toLowerCase()
            return state.articles.filter(article => 
                article.title?.toLowerCase().includes(query) ||
                article.description?.toLowerCase().includes(query) ||
                article.user?.name?.toLowerCase().includes(query) ||
                article.user?.username?.toLowerCase().includes(query) ||
                article.tag_list?.some(tag => tag.toLowerCase().includes(query))
            )
        }
    },
    actions: {
        fetchArticles() {
            return new Promise((resolve, reject) => {
                axios
                    .get(`https://dev.to/api/articles`)
                    .then((response) => {
                        this.articles = response.data
                        resolve(response)
                    })
                    .catch((err) => {
                        reject(err)
                    })
                    .finally(() => {
                        console.log(this.articles)
                    })
            })
        },
        fetchCurrentArticle(id: number) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`https://dev.to/api/articles/${id}`)
                    .then((response) => {
                        setTimeout(() => {
                            console.log("From currentArticle, Runs after 5 seconds")
                            this.currentArticle = response.data
                            resolve(response)
                        }, 1000)
                    })
                    .catch((err) => {
                        reject(err)
                    })
                    .finally(() => {
                        console.log(this.currentArticle)
                    })
            })
        },
        fetchUserArticles(user: string) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`https://dev.to/api/articles?username=${user}`)
                    .then((response) => {
                        setTimeout(() => {
                            console.log("From UserArticles, Runs after 5 seconds")
                            this.currentUserArticles = response.data
                            resolve(response)
                        }, 1000)
                    })
                    .catch((err) => {
                        reject(err)
                    })
            })
        },
        fetchTagArticles(tag: string) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`https://dev.to/api/articles?tag=${tag}`)
                    .then((response) => {
                        setTimeout(() => {
                            console.log("From TagArticles, Runs after 5 seconds")
                            this.currentTagArticles = response.data
                            resolve(response)
                        }, 1000)
                    })
                    .catch((err) => {
                        reject(err)
                    })
            })
        },
        fetchUserInformation(user: string) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`https://dev.to/api/articles?username=${user}`)
                    .then((response) => {
                        setTimeout(() => {
                            console.log("From UserInformation, Runs after 5 seconds")
                            this.currentUserInformation = response.data[0].user
                            resolve(response)
                        }, 1000)
                    })
                    .catch((err) => {
                        reject(err)
                    })
            })
        }
    }
})