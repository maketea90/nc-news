import { useEffect, useState } from "react"
import { fetchAllArticles } from "../api"
import ArticleCard from "./ArticleCard"
import { Link } from "react-router-dom"

export default function AllArticles () {
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [sortBy, setSortBy] = useState('created_at')
    const [order, setOrder] = useState('desc')
    const [commentCount, setCommentCount] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        fetchAllArticles(sortBy, order).then((data) => {
            if(commentCount === true){
                data.sort((a,b) => (Number(a.comment_count) < Number(b.comment_count)) ? 1 : -1)
            }
            console.log(data)
            setArticles(data)
            setIsLoading(false)
        })
    },[sortBy, order, commentCount])

    if(isLoading) {
        return (
            <h3>Loading</h3>
        )
    }
    else{
    return (
        <div>
        <br>
        </br>
        <section className="buttons">
            Sort by:
            <button onClick={() => {setSortBy('created_at')}}>date</button>
            <button onClick={() => {setSortBy('votes')}}>votes</button>
            <button onClick={() => {setCommentCount(true)}}>comment count</button>
            <br>
            </br>
            Order by:
            <button onClick={() => {setOrder('desc')}}>Descending order</button>
            <button onClick={() => {setOrder('asc')}}>Ascending order</button>
            {/* <button onClick={() => {setSortBy('')}}></button> */}
        </section>
        <br>
        </br>
        <section className="section__articles">
            {articles.map(({title, body, article_id, topic, author}) => {
                return (
                    <Link to={`/article/${article_id}`}>
                    <ArticleCard title={title} key={article_id} body={body} author={author}/>
                    </Link>
            )})}
        </section>
        </div>
    )
    }
}