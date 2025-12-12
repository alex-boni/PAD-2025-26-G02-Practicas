import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { searchBooks } from "./resultService";
import { addSearchQuery } from "./searchHistoryService";
import BookCard, { SkeletonCard } from "../components/BookCard"
import "./Result.css";

export default function Result() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [error, setError] = useState("");
    const [hasMoreResults, setHasMoreResults] = useState(true);
    const query = searchParams.get("title") || "";

    useEffect(() => {
        const fetchBooks = async () => {
            if (!query) {
                setIsLoading(false);
                return;
            }
            
            addSearchQuery(query);
            
            setIsLoading(true);
            setError("");
            setHasMoreResults(true);
            try {
                const response = await searchBooks(query, 0);
                setBooks(response);
                setHasMoreResults(response.length >= 12);
            } catch (err) {
                console.error(err);
                setError("Error al buscar libros");
            } finally {
                setIsLoading(false);
            }
        };
        fetchBooks();
    }, [query]);

    const handleLoadMore = async () => {
        setIsLoadingMore(true);
        try {
            const response = await searchBooks(query, books.length);
            if (response.length === 0) {
                setHasMoreResults(false);
            } else {
                setBooks([...books, ...response]);
                setHasMoreResults(response.length >= 12);
            }
        } catch (err) {
            console.error(err);
            setError("Error al cargar más libros");
        } finally {
            setIsLoadingMore(false);
        }
    }

    const onClick = (book) => {
        const queue = JSON.parse(localStorage.getItem("history")) || [];
        if (queue.length >= 5)
            queue.pop()
        queue.unshift({
            id: book.id,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            publishedDate: book.volumeInfo.publishedDate,
            infoLink: book.volumeInfo.infoLink
        });
        localStorage.setItem("history", JSON.stringify(queue));
        window.open(book.volumeInfo.infoLink, "_blank");
    }

    return (
        <div className="result-container">
            <div className="result-header">
                <button onClick={() => navigate(-1)} className="back-button">
                    ← Volver
                </button>
                {query && <h2>Resultados para: "{query}"</h2>}
            </div>

            {error && <p className="error-message">{error}</p>}

            {isLoading ? (
                <ul className="container max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[...Array(12)].map((_, i) => <SkeletonCard key={i} />)}
                </ul>
            ) : books.length > 0 ? (
                <div>
                    <ul className={`container max-w-6xl mx-auto grid gap-6 ${
                        books.length === 1 ? 'grid-cols-1' : books.length === 2 ? 'sm:grid-cols-2 lg:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'
                    }`}>
                        {books.map((book) => (
                            <BookCard
                                key={book.id}
                                title={book.volumeInfo.title}
                                author={book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Autor desconocido"}
                                publishedDate={book.volumeInfo.publishedDate || "Fecha desconocida"}
                                link={book.volumeInfo.infoLink || "#"}
                                onClick={() => onClick(book)} />
                        ))}
                    </ul>
                    {hasMoreResults ? (
                        <button onClick={handleLoadMore} className="load-more-button" disabled={isLoadingMore}>
                            {isLoadingMore ? "Cargando..." : "Cargar más"}
                        </button>
                    ) : (
                        <p className="no-more-results">No hay más resultados</p>
                    )}
                </div>
            ) : (
                <p className="no-results">No se encontraron libros.</p>
            )}
        </div>
    );
}