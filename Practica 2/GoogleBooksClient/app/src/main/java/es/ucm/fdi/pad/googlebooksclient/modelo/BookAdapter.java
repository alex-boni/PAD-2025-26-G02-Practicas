package es.ucm.fdi.pad.googlebooksclient.modelo;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;
import java.util.List;

import es.ucm.fdi.pad.googlebooksclient.R;

public class BookAdapter extends RecyclerView.Adapter<BookAdapter.BookViewHolder> {

    private List<BookInfo> books;
    private LayoutInflater inflater;

    public BookAdapter(Context context) {
        this.inflater = LayoutInflater.from(context);
        this.books = new ArrayList<>();
    }

    @NonNull
    @Override
    public BookViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View itemView = inflater.inflate(R.layout.list_item_book, parent, false);
        return new BookViewHolder(itemView);
    }

    @Override
    public void onBindViewHolder(@NonNull BookViewHolder holder, int position) {
        BookInfo currentBook = books.get(position);
        holder.bind(currentBook);
    }

    @Override
    public int getItemCount() {
        return books.size();
    }

    /**
     * Actualiza la lista de libros en el adaptador.
     * @param newBooks La nueva lista de libros.
     */
    public void setBooks(List<BookInfo> newBooks) {
        this.books = newBooks;
        notifyDataSetChanged(); // Notifica al RecyclerView que los datos han cambiado
    }

    /**
     * Limpia la lista de libros.
     */
    public void clearBooks() {
        this.books.clear();
        notifyDataSetChanged();
    }


    /**
     * ViewHolder para cada ítem de libro.
     */
    class BookViewHolder extends RecyclerView.ViewHolder {
        private final TextView titleTextView;
        private final TextView authorsTextView;
        private final TextView infoLinkTextView;

        public BookViewHolder(@NonNull View itemView) {
            super(itemView);
            titleTextView = itemView.findViewById(R.id.bookTitle);
            authorsTextView = itemView.findViewById(R.id.bookAuthors);
            infoLinkTextView = itemView.findViewById(R.id.bookInfoLink);
        }

        /**
         * Rellena la vista con la información del libro.
         * @param book El objeto BookInfo para esta posición.
         */
        public void bind(BookInfo book) {
            titleTextView.setText(book.getTitle());
            infoLinkTextView.setText(book.getInfoLink());

            // Gestiona el caso de revistas (sin autor)
            if (book.getAuthors() != null && !book.getAuthors().isEmpty()) {
                authorsTextView.setText(book.getAuthors());
                authorsTextView.setVisibility(View.VISIBLE);
            } else {
                // Oculta el TextView si no hay autores (ej. una revista)
                authorsTextView.setText("");
                authorsTextView.setVisibility(View.GONE);
            }
        }
    }
}
