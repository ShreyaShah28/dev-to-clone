import { defineStore } from 'pinia'
import axios from 'axios'
import { currentArticle, user } from '../stub/article'

export const useArticleStore = defineStore('article', {

    state: () => ({
        isLoading: false,
        isVisible: false,
        hasMore: true,
        filterType: '',
        page: 1,
        searchQuery: '',
        urlString: '',
        articles: [] as any[],
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
        fetchArticles(loadMore: boolean = false) {
            if (!this.hasMore) return
            return new Promise((resolve, reject) => {
                let url = `https://dev.to/api/articles?page=${this.page}&per_page=12`
                if (this.filterType === 'new') {
                    url = `https://dev.to/api/articles?page=${this.page}&per_page=12&state=fresh`
                }
                if (this.filterType === 'top') {
                    url = `https://dev.to/api/articles?page=${this.page}&per_page=12&top=7`
                }
                axios
                    .get(url)
                    .then((response) => {
                        setTimeout(() => {
                            const data = response.data
                            if (data.length < 0) {
                                this.hasMore = false
                            } else {
                                if (Array.isArray(data))
                                    this.articles.push(...data)
                            }
                            resolve(response)
                        }, 1000)

                    })
                    .catch((err) => {
                        reject(err)
                    })
                    .finally(() => {
                        this.page++
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
        filterUsers() {
            if (this.filterType === 'top') {
                this.articles = this.articles.sort(
                    (a, b) => b.public_reactions_count - a.public_reactions_count
                )
            }

            if (this.filterType === 'new') {
                this.articles = this.articles.sort(
                    (a, b) => new Date(b.published_at) - new Date(a.published_at)
                )
            }
        },
        fetchUserArticles(user: any) {
            if (!this.hasMore) return
            return new Promise((resolve, reject) => {
                let url = `https://dev.to/api/articles?username=${user}&page=${this.page}&per_page=12`
                if (this.filterType === 'new') {
                    url = `https://dev.to/api/articles?username=${user}&page=${this.page}&per_page=12&state=fresh`
                }
                else if (this.filterType === 'top') {
                    url = `https://dev.to/api/articles?username=${user}&page=${this.page}&per_page=12&top=7`
                }
                axios
                    .get(url)
                    .then((response) => {
                        setTimeout(() => {
                            const data = response.data
                            if (data.length < 0) {
                                this.hasMore = false
                            } else {
                                if (Array.isArray(data))
                                    this.articles = [...this.articles, ...data]
                            }
                            this.currentUserInformation = data[0]?.user

                            this.filterUsers()
                            resolve(response)
                        }, 1000)
                    })
                    .catch((err) => {
                        reject(err)
                    })
                    .finally(() => {
                        this.page++
                        console.log(this.articles)
                    })
            })
        },
        fetchTagArticles(tag: any, loadMore: boolean = false) {
            if (!this.hasMore) return
            return new Promise((resolve, reject) => {
                let url = `https://dev.to/api/articles?tag=${tag}&page=${this.page}&per_page=12`
                if (this.filterType === 'new') {
                    url = `https://dev.to/api/articles?tag=${tag}&page=${this.page}&per_page=12&state=fresh`
                }
                else if (this.filterType === 'top') {
                    url = `https://dev.to/api/articles?tag=${tag}&page=${this.page}&per_page=12&top=7`
                }
                axios
                    .get(url)
                    .then((response) => {
                        setTimeout(() => {
                            const data = response.data
                            if (loadMore === true) {
                                if (data.length === 0) {
                                    this.hasMore = false
                                } else {
                                    this.articles.push(...data)
                                }
                            } else {
                                this.articles = data
                            }
                            resolve(response)
                        }, 1000)
                    })
                    .catch((err) => {
                        reject(err)
                    })
                    .finally(() => {
                        this.page++
                        console.log(this.articles)
                    })
            })
        },

        resetFeaturesFunction() {
            this.page = 1
            this.filterType = ''
            this.hasMore = true
            this.articles = []
            this.currentUserInformation.profile_image = ''
            this.currentUserInformation.profile_image_90 = ''
        }
    }
})