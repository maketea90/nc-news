import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById, fetchCommentsById, patchArticleById, postCommentById, deleteCommentById } from "../api";
import ErrorComponent from "./ErrorComponent";
import { UserContext } from "../contexts/loggedInUser";

export default function ArticleById () {
    const user = useContext(UserContext)
    const {article_id} = useParams()
    const [article, setArticle] = useState([])
    const [votes, setVotes] = useState(0)
    const [disable, setDisable] = useState(0)
    const [error, setError] = useState(null)
    const [comments, setComments] = useState([])
    //const [input, setInput] = useState('')
    const [newComment, setNewComment] = useState('')

    useEffect(() => {
        fetchArticleById(article_id).then((data) => {
            setArticle(data)
            setVotes(data.votes)
        })
        fetchCommentsById(article_id).then((data) => {
            setComments(data)
        })
    }, [article_id])

    const handleSubmit = (comment) => {
        postCommentById(article_id, 
            {username: user, body: comment}).then((comment) => {
            setComments([...comments, comment[0]])
        })
    }

    const deleteComment = (id) => {
        deleteCommentById(id).then((response) => {
            const updatedComments = comments.filter((comment) => {
                return comment.comment_id !== id
            })
            setComments(updatedComments)
        })
    }

    const onSubmit = (event) => {
        event.preventDefault()
    
        handleSubmit(newComment)
        setNewComment('')
      }

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
                if(comment.author === user){
                    return (
                        <article>
                        <li key={comment.comment_id}>
                        {comment.body}
                        </li>
                        <button onClick={() => {deleteComment(comment.comment_id)}}>X</button>
                        </article>
                    )
                } else {
                return (
                    <li key={comment.comment_id}>
                        {comment.body}
                    </li>
                )
                }
            })}
            </ul>
            <form onSubmit={onSubmit}>
                <input  value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder='Add a comment'/>
                <br></br>
                <button type='submit' className='button'>Add a comment</button>
            </form>
        </section>
        </section>
        // <LoneArticle key={article_id}/>
    )
}
// const AddTodo = (props) => {
//     const [newItem, setNewItem] = useState('')
//     const handleSubmit = (event) => {
//       event.preventDefault()
  
//       props.setTodos((currentTodos) => {
//         return [newItem, ...currentTodos]
//       })
  
//       setNewItem('')
//     }
//     return (
//       <form onSubmit={handleSubmit}>
//         <label>add a new item
//           <input 
//           value={newItem}
//           onChange={(event) => {setNewItem(event.target.value)}}/>
//         </label>
//         <br></br>
//         <button type='submit' className='button'>Add item</button>
//       </form>
//     )
//     // return <button onClick={() => addListItem()} className='button'>Add item</button>
//   }