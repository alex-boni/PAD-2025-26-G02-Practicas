const SEARCH_QUERIES_KEY = "searchQueries";

export const getSearchQueries = () => {
    return JSON.parse(localStorage.getItem(SEARCH_QUERIES_KEY)) || [];
};

export const addSearchQuery = (query) => {
    const savedQueries = getSearchQueries();
    if (!savedQueries.includes(query)) {
        savedQueries.unshift(query);
        localStorage.setItem(SEARCH_QUERIES_KEY, JSON.stringify(savedQueries));
    }
};

export const deleteSearchQuery = (index) => {
    const updatedQueries = getSearchQueries().filter((_, i) => i !== index);
    localStorage.setItem(SEARCH_QUERIES_KEY, JSON.stringify(updatedQueries));
    return updatedQueries;
};

export const deleteAllSearchQueries = () => {
    localStorage.setItem(SEARCH_QUERIES_KEY, JSON.stringify([]));
};

export const clearSearchHistory = () => {
    deleteAllSearchQueries();
};
