import "./BookCard.css"
type Book = {
    title: string;
    author: string;
    publishedDate: string;
    link: string;
};
export default function BookCard(book: Book) {
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