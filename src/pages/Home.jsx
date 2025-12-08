import { useState } from "react";
import { searchBooks } from "./homeService"
import "./Home.css"
import BookCard from "../components/BookCard"

export default function Home() {

    const [formData, setFormData] = useState({ title: "" });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [books, setBooksResult] = useState([]);

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;
        if(!formData.title ){
            newErrors.title = "El título es obligatorio";
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(!validateForm()){
            const errorField = Object.keys(errors)[0];
            if(errorField) document.getElementById(errorField).focus();
            return;
        }
        setIsLoading(true);
        try {
            setErrors({});
            // Limpiar resultados anteriores
            setBooksResult([]);
            // Llamada al servicio para buscar libros
            const response = await searchBooks(formData.title);
            setBooksResult(response);
        } catch (error) {
            console.error(error.message);
            setErrors({ submit: "Error al buscar libros" });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="home-container">
            <h2>Bienvenido al Buscador de Libros</h2>
            <p>Utiliza la barra de búsqueda para encontrar tus libros favoritos.</p>
            <form onSubmit={handleSubmit} className="book-search">
                {errors.submit && <p className="text-sm text-red-600" aria-live="assertive">{errors.submit}</p>}
                <input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="book-search-input"
                    placeholder="Introduce el título del libro..."
                />
                {errors.title && <p className="text-sm text-red-600" aria-live="assertive">{errors.title}</p>}
                <button type="submit" className="book-search-button"
                disabled={isLoading}>
                    {isLoading ? (
                        <p>Cargando...</p>
                    ) : ('Buscar')}
                </button>

            </form>

            <h2>Historial de Búsqueda</h2>
            {books.length > 0 ? (
                <ul className="container max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {books.map((book) => (
                        <BookCard
                            key={book.id}
                            title={book.volumeInfo.title}
                            author={book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Autor desconocido"}
                            publishedDate={book.volumeInfo.publishedDate || "Fecha desconocida"}
                            link={book.volumeInfo.infoLink || "#"}
                        />
                    ))}
                </ul>
            ) : (
                <p>No se encontraron libros.</p>
            )}
        </div>
    )
}