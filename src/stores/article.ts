import { defineStore } from 'pinia'
import axios from 'axios'
import { currentArticle, user } from '../stub/article'

export const useArticleStore = defineStore('task', {

    state: () => ({
        isLoading: false,
        page: 1,
        searchQuery: '',
        urlString: '',
        articles: [],
        currentArticle: {
            ...currentArticle
        },
        currentUserInformation: {
            ...user
        },
        buttonColorClass: [
            'hover:bg-purple-300/20 hover:border hover:border-purple-400/40 text-purple-500',
            'hover:bg-green-300/20 hover:border hover:border-green-400/40 text-green-500',
            'hover:bg-pink-300/20 hover:border hover:border-pink-400/40 text-pink-500',
            'hover:bg-blue-300/20 hover:border hover:border-blue-400/40 text-blue-500',
        ]
    }),
    getters: {
        filteredArticles: (state) => {
            if (!state.searchQuery) return state.articles

            const query = state.searchQuery.toLowerCase()
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
        fetchArticles(filterType: string, loadMore: boolean = false) {
            return new Promise((resolve, reject) => {
                let url = `https://dev.to/api/articles?page=${this.page}&per_page=10`
                if (filterType === "new") {
                    url = `https://dev.to/api/articles?page=${this.page}&per_page=10&state=fresh`
                }

                if (filterType === "top") {
                    url = `https://dev.to/api/articles?page=${this.page}&per_page=10&top=30`
                }
                axios
                    .get(url)
                    .then((response) => {
                        if (loadMore) {
                            // append articles (infinite scroll)
                            this.articles.push(...response.data)
                        } else {
                            // replace articles (first load / filter change)
                            this.articles = response.data
                        }

                        this.page++

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
        filterUsers(filterType: string) {
            if (filterType === "top") {
                this.articles = this.articles.sort(
                    (a, b) => b.public_reactions_count - a.public_reactions_count
                )
            }

            if (filterType === "new") {
                this.articles = this.articles.sort(
                    (a, b) => new Date(b.published_at) - new Date(a.published_at)
                )
            }
        },
        fetchUserArticles(user: any) {
            return new Promise((resolve, reject) => {
                let url = `https://dev.to/api/articles?username=${user}`
                axios
                    .get(url)
                    .then((response) => {
                        setTimeout(() => {
                            console.log("From UserArticles, Runs after 5 seconds")
                            this.articles = response.data
                            this.currentUserInformation = response.data[0]?.user
                            resolve(response)
                        }, 1000)
                    })
                    .catch((err) => {
                        reject(err)
                    })
            })
        },
        fetchTagArticles(tag: any, filterType: string) {
            return new Promise((resolve, reject) => {
                let url = `https://dev.to/api/articles?tag=${tag}`
                if (filterType === "new") {
                    url = `https://dev.to/api/articles?tag=${tag}&state=fresh`
                }
                else if (filterType === "top") {
                    url = `https://dev.to/api/articles?tag=${tag}&top=30`
                }
                axios
                    .get(url)
                    .then((response) => {
                        setTimeout(() => {
                            console.log("From TagArticles, Runs after 5 seconds")
                            this.articles = response.data
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