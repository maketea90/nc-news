import {useParams, Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import { fetchArticlesByTopic } from '../api'
import ArticleCard from './ArticleCard'

export default function ArticlesByTopic () {
    const {topic} = useParams()
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [sortBy, setSortBy] = useState('created_at')
    const [order, setOrder] = useState('desc')
    
    useEffect(() => {
        setIsLoading(true)
        fetchArticlesByTopic(topic, sortBy, order).then((data) => {
            
            setArticles(data)
            setIsLoading(false)
        })
    }, [topic, sortBy, order])

    if(isLoading) {
        return (
            <h3>Loading</h3>
        )
    }

    else {

    
    return (
        <div>
            <br>
        </br>
        <section className="buttons">
            Sort by:
            <button onClick={() => {setSortBy('created_at')}}>date</button>
            <button onClick={() => {setSortBy('votes')}}>votes</button>
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
            {articles.map(({title, body, article_id, author}) => {
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