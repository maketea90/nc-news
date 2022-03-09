import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById } from "../api";

export default function ArticleById () {
    const {article_id} = useParams()
    const [article, setArticle] = useState([])

    useEffect(() => {
        fetchArticleById(article_id).then((data) => {
            setArticle(data)
        })
    }, [article_id])

    return(
        <>
        <article className='ArticleCard'>
        <h3>{article.title}</h3>
        <p>
            by {article.author}
        </p>
        <p>
            {article.body}
        </p>
        </article>
        </>
        // <LoneArticle key={article_id}/>
    )
}