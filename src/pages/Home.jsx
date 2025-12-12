import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"
import BookCard from "../components/BookCard";

export default function Home() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ title: "" });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;
        if (!formData.title) {
            newErrors.title = true;
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) {
            document.getElementById("title").focus();
            return;
        }
        navigate(`/search?title=${encodeURIComponent(formData.title)}`);
    }

    return (
        <div className="home-container">
            <h2>Bienvenido al Buscador de Libros</h2>
            <p>Utiliza la barra de búsqueda para encontrar tus libros favoritos.</p>
            <form onSubmit={handleSubmit} className="book-search">
                <input
                    id="title"
                    value={formData.title}
                    onChange={(e) => {
                        setFormData({ ...formData, title: e.target.value });
                        setErrors({ ...errors, title: '' });
                    }}
                    className={`book-search-input ${errors.title ? 'input-error' : ''}`}
                    placeholder="Introduce el título del libro..."
                />
                <button type="submit" className="book-search-button">
                    Buscar
                </button>
            </form>

            <h2>Últimos 5 libros accedidos</h2>
            {(JSON.parse(localStorage.getItem("history")) || []).length === 0 ? (
                <p className="text-center text-gray-500">No hay historial de búsquedas</p>
            ) : (
                <ul className="container max-w-6xl mx-auto grid gap-6">
                    {(JSON.parse(localStorage.getItem("history")) || []).map((book) => (
                        <BookCard
                            title={book.title}
                            author={book.authors ? book.authors.join(", ") : "Autor desconocido"}
                            publishedDate={book.publishedDate || "Fecha desconocida"}
                            link={book.infoLink || "#"} />
                    ))}
                </ul>
            )}
        </div>
    )
}