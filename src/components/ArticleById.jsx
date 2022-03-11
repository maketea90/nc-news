import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById, fetchCommentsById, patchArticleById } from "../api";
import ErrorComponent from "./ErrorComponent";

export default function ArticleById () {
    const {article_id} = useParams()
    const [article, setArticle] = useState([])
    const [votes, setVotes] = useState(0)
    const [disable, setDisable] = useState(0)
    const [error, setError] = useState(null)
    const [comments, setComments] = useState([])

    useEffect(() => {
        fetchArticleById(article_id).then((data) => {
            setArticle(data)
            setVotes(data.votes)
        })
        fetchCommentsById(article_id).then((data) => {
            setComments(data)
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
        <section className='section__articles'>
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
        <section className='ArticleCard CommentCard' >
            <h3>
                Comment Section
            </h3>
            <ul>
            {comments.map((comment) => {
                return (
                    <li key={comment.comment_id}>
                        {comment.body}
                    </li>
                )
            })}
            </ul>
        </section>
        </section>
        // <LoneArticle key={article_id}/>
    )
}