export const saveBookToHistory = (book) => {
    const history = JSON.parse(localStorage.getItem("history")) || [];
    
    // Limitar a 5 libros en el historial
    if (history.length >= 5) {
        history.pop();
    }
    
    // Evitar duplicados - si ya existe, mover al inicio
    const filtered = history.filter(item => item.id !== book.id);
    
    // Agregar el nuevo libro al inicio
    filtered.unshift({
        id: book.id,
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors,
        publishedDate: book.volumeInfo.publishedDate,
        infoLink: book.volumeInfo.infoLink
    });
    
    localStorage.setItem("history", JSON.stringify(filtered));
};

export const getBookHistory = () => {
    return JSON.parse(localStorage.getItem("history")) || [];
};

export const clearBookHistory = () => {
    localStorage.setItem("history", JSON.stringify([]));
};

export const removeBookFromHistory = (bookId) => {
    const history = JSON.parse(localStorage.getItem("history")) || [];
    const filtered = history.filter(item => item.id !== bookId);
    localStorage.setItem("history", JSON.stringify(filtered));
};

export const formatBookData = (book) => {
    return {
        id: book.id,
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Autor desconocido",
        publishedDate: book.volumeInfo.publishedDate || "Fecha desconocida",
        link: book.volumeInfo.infoLink || "#"
    };
};
