import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
    getSearchQueries, 
    deleteSearchQuery, 
    deleteAllSearchQueries 
} from "./searchHistoryService";
import "./SearchHistory.css";

export default function SearchHistory() {
    const navigate = useNavigate();
    const [searchQueries, setSearchQueries] = useState(() => getSearchQueries());

    const handleDeleteQuery = (index) => {
        const updatedQueries = deleteSearchQuery(index);
        setSearchQueries(updatedQueries);
    };

    const handleDeleteAll = () => {
        if (window.confirm("¿Estás seguro de que quieres borrar todo el historial de búsquedas?")) {
            deleteAllSearchQueries();
            setSearchQueries([]);
        }
    };

    const handleSearch = (query) => {
        navigate(`/search?title=${encodeURIComponent(query)}`);
    };

    return (
        <div className="search-history-container">
            <h2>Historial de Búsquedas</h2>
            
            {searchQueries.length === 0 ? (
                <p className="empty-message">No hay búsquedas en el historial</p>
            ) : (
                <div className="history-content">
                    <ul className="history-list">
                        {searchQueries.map((query, index) => (
                            <li 
                                key={index} 
                                className="history-item"
                                onClick={() => handleSearch(query)}
                            >
                                <span className="history-query">
                                    {query}
                                </span>
                                <button
                                    className="delete-button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteQuery(index);
                                    }}
                                    title="Borrar esta búsqueda"
                                >
                                    ✕
                                </button>
                            </li>
                        ))}
                    </ul>
                    
                    <button 
                        className="delete-all-button"
                        onClick={handleDeleteAll}
                    >
                        Borrar Todo
                    </button>
                </div>
            )}
        </div>
    );
}