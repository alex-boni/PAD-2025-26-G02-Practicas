"use client";

import { useEffect, useState } from "react";
import BookCard from "@/app/components/BookCard"; 
import apiGoogleBooks from "@/app/services/apiGoogleBooks";

export default function Home() {
  const [formData, setFormData] = useState({ title: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooksResult] = useState([]);
  
  const [isDark, setIsDark] = useState(false);
  
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    // Si hay tema guardado es 'dark', o si el sistema prefiere oscuro
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const searchBooks = async (titulo) => {
    try {
        const response = await apiGoogleBooks.get("", {
            params: {
                q: titulo,
                maxResults: 10, 
                printType: "books",
            },
        });
        return response.data.items || [];
    } catch (error) {
        console.error("Error fetching books:", error);
        return [];
    }
  }

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    if (!formData.title) {
      newErrors.title = "El título es obligatorio";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      const errorField = Object.keys(errors)[0];
      if (errorField) document.getElementById(errorField)?.focus();
      return;
    }
    setIsLoading(true);
    try {
      setErrors({});
      setBooksResult([]);
      const response = await searchBooks(formData.title);
      setBooksResult(response);
    } catch (error) {
      console.error(error.message);
      setErrors({ submit: "Error al buscar libros" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* HEADER */}
      <header className="app-header">
        <nav className="app-nav">
          <div className="nav-middle">
            <h1 className="app-title">Buscador de Libros</h1>
          </div>
          <div className="nav-right">
            <button onClick={toggleTheme} className="theme-toggle">
              {isDark ? "☀️" : "🌙"}
            </button>
          </div>
        </nav>
      </header>

    {/* CONTENDOR PRINCIPAL */}
    <main className="app-main">
      <div className="home-container">
        <h2>Bienvenido al Buscador de Libros</h2>
        <p>Utiliza la barra de búsqueda para encontrar tus libros favoritos.</p>
        <form onSubmit={handleSubmit} className="book-search">
          {errors.submit && (
            <p className="text-sm text-red-600" aria-live="assertive">
              {errors.submit}
            </p>
          )}
          <input
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="book-search-input"
            placeholder="Introduce el título del libro..."
          />
          {errors.title && (
            <p className="text-sm text-red-600" aria-live="assertive">
              {errors.title}
            </p>
          )}
          <button
            type="submit"
            className="book-search-button"
            disabled={isLoading}
          >
            {isLoading ? <p>Cargando...</p> : "Buscar"}
          </button>
        </form>

        <h2>Historial de Búsqueda</h2>
        {books.length > 0 ? (
          <ul className="container max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <BookCard
                key={book.id}
                title={book.volumeInfo.title}
                author={
                  book.volumeInfo.authors
                    ? book.volumeInfo.authors.join(", ")
                    : "Autor desconocido"
                }
                publishedDate={
                  book.volumeInfo.publishedDate || "Fecha desconocida"
                }
                link={book.volumeInfo.infoLink || "#"}
              />
            ))}
          </ul>
        ) : (
          <p>No se encontraron libros.</p>
        )}
      </div>
    </main>
      
      {/* FOOTER */}
      <footer className="app-footer">
        <p>&copy; PAD 2025-2026 Grupo 2</p>
      </footer>
    </div>
  );
}