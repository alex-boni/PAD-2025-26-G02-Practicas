import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import Result from './pages/Result';
import Home from './pages/Home';
import SearchHistory from './pages/SearchHistory';

export default function App() {
    const [isDark, setIsDark] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark';
    });

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    const toggleTheme = () => {
        setIsDark(!isDark);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <BrowserRouter>
            <div className="app-container">

                {/* HEADER/NAVEGACIÓN */}
                <header className="app-header">
                    <nav className="app-nav">
                        <div className='nav-left'>
                            <button onClick={toggleMenu} className="hamburger-menu">
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>
                            <Link to="/" className="nav-link">Buscador</Link>
                            <Link to="/history" className="nav-link">Historial</Link>
                        </div>
                        <div className='nav-middle'>
                            <h1 className="app-title">Buscador de Libros</h1>
                        </div>
                        <div className='nav-right'>
                            <button onClick={toggleTheme} className="theme-toggle">
                                {isDark ? '☀️' : '🌙'}
                            </button>
                        </div>

                    </nav>

                    {/* MENÚ DESPLEGABLE PARA MÓVIL */}
                    {isMenuOpen && (
                        <div className="mobile-menu active">
                            <Link to="/" className="mobile-menu-link" onClick={closeMenu}>Buscador</Link>
                            <Link to="/history" className="mobile-menu-link" onClick={closeMenu}>Historial</Link>
                        </div>
                    )}
                </header>

                {/* CONTENIDO DINÁMICO */}
                <main className="app-main">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/history" element={<SearchHistory />} />
                        <Route path="/search" element={<Result />} />
                    </Routes>
                </main>

                {/* FOOTER */}
                <footer className="app-footer">
                    <p>&copy; PAD 2025-2026 Grupo 2</p>
                </footer>

            </div>
        </BrowserRouter>
    );
}