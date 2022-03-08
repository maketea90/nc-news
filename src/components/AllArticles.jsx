import { useEffect, useState } from "react"
import { fetchAllArticles } from "../api"
import ArticleCard from "./ArticleCard"

export default function AllArticles () {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        fetchAllArticles().then((data) => {
            
            setArticles(data)
        })
    },[])

    return (
        <section className="section__articles">
            {articles.map(({title, body, article_id, topic, author}) => {
                return (
                    <ArticleCard title={title} key={article_id} body={body} author={author}/>
            )})}
        </section>
    )
}