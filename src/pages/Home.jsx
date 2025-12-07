import BookCard from "../components/BookCard"
import "./Home.css"

export default function Home() {
    return (
        <div className="home-container">
            <h2>Bienvenido al Buscador de Libros</h2>
            <p>Utiliza la barra de búsqueda para encontrar tus libros favoritos.</p>
            <div className="book-search">
                <input
                    className="book-search-input"
                    placeholder="Introduce el título del libro..."
                />
                <button className="book-search-button">
                    Buscar
                </button>
            </div>

            <h2>Historial de Búsqueda</h2>
            <ul className="container max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Ejemplos de BookCard hardcodeados */}
                <BookCard title="El Quijote" author="Miguel de Cervantes" publishedDate="1605" link="#" />
                <BookCard title="El Quijote" author="Miguel de Cervantes" publishedDate="1605" link="#" />
                <BookCard title="El Quijote" author="Miguel de Cervantes" publishedDate="1605" link="#" />
                <BookCard title="El Quijote" author="Miguel de Cervantes" publishedDate="1605" link="#" />
                <BookCard title="El Quijote" author="Miguel de Cervantes" publishedDate="1605" link="#" />
                <BookCard title="El Quijote" author="Miguel de Cervantes" publishedDate="1605" link="#" />
                <BookCard title="El Quijote" author="Miguel de Cervantes" publishedDate="1605" link="#" />
                <BookCard title="El Quijote" author="Miguel de Cervantes" publishedDate="1605" link="#" />
                <BookCard title="El Quijote" author="Miguel de Cervantes" publishedDate="1605" link="#" />
                <BookCard title="El Quijote" author="Miguel de Cervantes" publishedDate="1605" link="#" />
                <BookCard title="El Quijote" author="Miguel de Cervantes" publishedDate="1605" link="#" />
                <BookCard title="El Quijote" author="Miguel de Cervantes" publishedDate="1605" link="#" />
                <BookCard title="El Quijote" author="Miguel de Cervantes" publishedDate="1605" link="#" />
                <BookCard title="El Quijote" author="Miguel de Cervantes" publishedDate="1605" link="#" />
                <BookCard title="El Quijote" author="Miguel de Cervantes" publishedDate="1605" link="#" />
            </ul>
        </div>
    )
}