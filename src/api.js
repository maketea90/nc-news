import axios from 'axios'

const myApi = axios.create({
    baseURL: 'https://cool-backend-project.herokuapp.com/api'
})

export const fetchAllArticles = () => {
    return myApi.get('/articles').then((res) => {
        console.log(res.data)
        return res.data
    })
}

export const fetchArticlesByTopic = (topic) => {
    return myApi.get(`/articles?topic=${topic}`).then((res) => {
        console.log(res.data)
        return res.data
    })
}

export const fetchArticleById = (id) => {
    return myApi.get(`/articles/${id}`).then((res) => {
        console.log(res.data)
        return res.data
    })
}

export const patchArticleById = (id, voteUpdate) =>  {
    return myApi.patch(`/articles/${id}`, voteUpdate).then((res) => {
        return res.data
    })
}