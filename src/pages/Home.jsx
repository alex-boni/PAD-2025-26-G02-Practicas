import "./Home.css"

export default function Home() {
    return <div className="home-container">
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
    </div>
}