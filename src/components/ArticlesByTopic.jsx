import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import { fetchAllArticles } from '../api'
import ArticleCard from './ArticleCard'

export default function ArticlesByTopic () {
    const {topic} = useParams()
    const [articles, setArticles] = useState([])
    
    useEffect(() => {
        fetchAllArticles().then((data) => {
            const filteredByTopic = data.filter((article) => {
                return article.topic === topic
            })
            setArticles(filteredByTopic)
        })
    }, [topic])

    return (
        <section className="section__articles">
            {articles.map(({title, body, article_id, author}) => {
                return (
                    <ArticleCard title={title} key={article_id} body={body} author={author}/>
            )})}
        </section>
    )
}