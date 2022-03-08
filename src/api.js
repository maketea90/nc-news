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