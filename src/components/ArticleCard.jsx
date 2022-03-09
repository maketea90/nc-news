export default function ArticleCard ({title, body, author}) {
    return (
        <article className='ArticleCard'>
        <h3>{title}</h3>
        <p>
            by {author}
        </p>
        </article>
    )
}