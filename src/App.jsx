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

    return (
        <BrowserRouter>
            <div className="app-container">

                {/* HEADER/NAVEGACIÓN */}
                <header className="app-header">
                    <nav className="app-nav">
                        <div className='nav-left'>
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