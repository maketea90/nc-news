import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById, patchArticleById } from "../api";
import ErrorComponent from "./ErrorComponent";

export default function ArticleById () {
    const {article_id} = useParams()
    const [article, setArticle] = useState([])
    const [votes, setVotes] = useState(0)
    const [disable, setDisable] = useState(0)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchArticleById(article_id).then((data) => {
            setArticle(data)
            setVotes(data.votes)
        })
    }, [article_id])

    function voteCrement(amount) {
        patchArticleById(article_id, {inc_votes: amount}).catch((err) => {
            setError({err})
        })
        const crementedVotes = votes + amount
        setVotes(crementedVotes)
        const updateDisable = disable + amount
        setDisable(updateDisable)
    }


    if (error) {
        return <ErrorComponent message={error} />;
      }
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
        <span>Votes: {votes}</span>
        <button disabled={disable === 1} onClick={() => voteCrement(1)}>+</button>
        <button disabled={disable === -1} onClick={() => voteCrement(-1)}>-</button>
        </article>
        </>
        // <LoneArticle key={article_id}/>
    )
}