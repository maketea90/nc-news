import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import { fetchArticlesByTopic } from '../api'
import ArticleCard from './ArticleCard'

export default function ArticlesByTopic () {
    const {topic} = useParams()
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        setIsLoading(true)
        fetchArticlesByTopic(topic).then((data) => {
            
            setArticles(data)
            setIsLoading(false)
        })
    }, [topic])

    if(isLoading) {
        return (
            <h3>Loading</h3>
        )
    }

    else {

    
    return (
        <section className="section__articles">
            {articles.map(({title, body, article_id, author}) => {
                return (
                    <ArticleCard title={title} key={article_id} body={body} author={author}/>
            )})}
        </section>
    )
    }
}