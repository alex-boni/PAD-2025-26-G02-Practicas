import apiGoogleBooks from "../services/apiGoogleBooks"


export const searchBooks = async (titulo) => {
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