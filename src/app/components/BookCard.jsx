import "./BookCard.css"

export default function BookCard(book) {
    return (
        <a href={book.link}>
            <li className="book-card">
                <h3>{book.title}</h3>
                <p>Autor: {book.author}</p>
                <p>Publicado: {book.publishedDate}</p>
            </li>
        </a>
    );
}