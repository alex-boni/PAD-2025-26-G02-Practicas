package es.ucm.fdi.pad.googlebooksclient.modelo;

public class BookInfo {

    private String title;
    private String authors; // Autores concatenados en un solo String
    private String infoLink;

    public BookInfo(String title, String authors, String infoLink) {
        this.title = title;
        this.authors = authors;
        this.infoLink = infoLink;
    }

    // Getters
    public String getTitle() {
        return title;
    }

    public String getAuthors() {
        return authors;
    }

    public String getInfoLink() {
        return infoLink;
    }
}
