import { useEffect, useState } from "react"
import { fetchAllArticles } from "../api"
import ArticleCard from "./ArticleCard"
import { Link } from "react-router-dom"

export default function AllArticles () {
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        fetchAllArticles().then((data) => {
            
            setArticles(data)
            setIsLoading(false)
        })
    },[])

    if(isLoading) {
        return (
            <h3>Loading</h3>
        )
    }
    else{
    return (
        <section className="section__articles">
            {articles.map(({title, body, article_id, topic, author}) => {
                return (
                    <Link to={`/article/${article_id}`}>
                    <ArticleCard title={title} key={article_id} body={body} author={author}/>
                    </Link>
            )})}
        </section>
    )
    }
}