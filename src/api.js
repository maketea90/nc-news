import axios from 'axios'

const myApi = axios.create({
    baseURL: 'https://backend-project-joero.herokuapp.com/api'
})

export const fetchAllArticles = (query, order) => {
    return myApi.get(`/articles?sort_by=${query}&order=${order}`).then((res) => {
        return res.data
    })
}

export const fetchArticlesByTopic = (topic, query, order) => {
    return myApi.get(`/articles?topic=${topic}&sortBy=${query}&order=${order}`).then((res) => {
        return res.data
    })
}

export const fetchArticleById = (id) => {
    return myApi.get(`/articles/${id}`).then((res) => {
        return res.data
    })
}

export const patchArticleById = (id, voteUpdate) =>  {
    return myApi.patch(`/articles/${id}`, voteUpdate).then((res) => {
        return res.data
    })
}

export const fetchCommentsById = (id) => {
    return myApi.get(`/articles/${id}/comments`).then((res) => {
        return res.data
    })
}

export const postCommentById = (id, body) => {
    return myApi.post(`/articles/${id}/comments`, body).then((res) => {
        return res.data
    })
}

export const deleteCommentById = (id) => {
    return myApi.delete(`/comments/${id}`).then((res) => {
        console.log('successfully deleted a comment')
        return res.data
    })
}

// export const fetchUsers = () => {

// }