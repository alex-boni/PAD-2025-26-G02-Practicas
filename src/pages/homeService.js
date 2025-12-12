import apiGoogleBooks from "../services/apiGoogleBooks"


export const searchBooks = async (titulo, startIndex = 0) => {
    try {
        const response = await apiGoogleBooks.get("", {
            params: {
                q: titulo,
                maxResults: 12,
                startIndex: startIndex,
                printType: "books",
            },
        });
        return response.data.items || [];
    } catch (error) {
        console.error("Error fetching books:", error);
        return [];
    }
}