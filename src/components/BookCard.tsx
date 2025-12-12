import "./BookCard.css"
type Book = {
    title: string;
    author: string;
    publishedDate: string;
    link: string;
    onClick?: () => void;
};

export function SkeletonCard() {
    return (
        <li className="book-card">
            <div className="skeleton-title"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text"></div>
        </li>
    );
}

export default function BookCard(book: Book) {
    return (
        <li className="book-card" onClick={book.onClick ?? (() => window.open(book.link, "_blank"))}>
            <h3>{book.title}</h3>
            <p>Autor: {book.author}</p>
            <p>Publicado: {book.publishedDate}</p>
        </li>
    );
}