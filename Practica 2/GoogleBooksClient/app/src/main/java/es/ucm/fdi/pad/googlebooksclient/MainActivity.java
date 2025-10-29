package es.ucm.fdi.pad.googlebooksclient;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.loader.app.LoaderManager;
import androidx.loader.content.Loader;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.inputmethod.InputMethodManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioGroup;
import android.widget.TextView;
import android.widget.Toast;

import java.util.List;

import es.ucm.fdi.pad.googlebooksclient.modelo.*;

public class MainActivity extends AppCompatActivity  {

    private static final int BOOK_LOADER_ID = 1;

    // Componentes de la UI
    private EditText titleEditText;
    private EditText authorEditText;
    private RadioGroup searchTypeRadioGroup;
    private Button searchButton;
    private TextView statusTextView;
    private BookLoaderCallbacks bookLoaderCallbacks;

    // RecyclerView y Adaptador
    private RecyclerView resultsRecyclerView;
    private BooksResultListAdapter booksResultListAdapter;
    private static final String LOG_TAG = MainActivity.class.getSimpleName();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Inicializar vistas
        titleEditText = findViewById(R.id.titleEditText);
        authorEditText = findViewById(R.id.authorEditText);
        searchTypeRadioGroup = findViewById(R.id.searchTypeRadioGroup);
        searchButton = findViewById(R.id.searchButton);
        statusTextView = findViewById(R.id.statusTextView);
        resultsRecyclerView = findViewById(R.id.resultsRecyclerView);

        // Configurar RecyclerView
        booksResultListAdapter = new BooksResultListAdapter(this);
        resultsRecyclerView.setAdapter(booksResultListAdapter);
        resultsRecyclerView.setLayoutManager(new LinearLayoutManager(this));


        // Configurar el listener del botón de búsqueda
        searchButton.setOnClickListener(v -> searchBooks());

        // Reconectar al loader si ya existe
        bookLoaderCallbacks = new BookLoaderCallbacks(this);
        if (LoaderManager.getInstance(this).getLoader(BOOK_LOADER_ID) != null) {
            Log.d(LOG_TAG, "Reconectando al loader existente");
            LoaderManager.getInstance(this).initLoader(BOOK_LOADER_ID, null, bookLoaderCallbacks);
        }
    }

    private void searchBooks() {
        // Ocultar el teclado
        InputMethodManager inputManager = (InputMethodManager)
                getSystemService(Context.INPUT_METHOD_SERVICE);
        if (inputManager != null && getCurrentFocus() != null) {
            inputManager.hideSoftInputFromWindow(getCurrentFocus().getWindowToken(),
                    InputMethodManager.HIDE_NOT_ALWAYS);
        }

        // Comprobar conexión de red
        ConnectivityManager connMgr = (ConnectivityManager)
                getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo networkInfo = (connMgr != null) ? connMgr.getActiveNetworkInfo() : null;

        if (networkInfo == null || !networkInfo.isConnected()) {
            Toast.makeText(this, getResources().getString(R.string.status_error_conexion), Toast.LENGTH_SHORT).show();
            return;
        }


        // --- Lógica de búsqueda (idéntica a la anterior) ---
        String title = titleEditText.getText().toString();
        String author = authorEditText.getText().toString();

        String queryString = title;
        if (!author.isEmpty()) {
            queryString += "+inauthor:" + author;
        }

        String printType = "all";
        int selectedRadioButtonId = searchTypeRadioGroup.getCheckedRadioButtonId();
        if (selectedRadioButtonId == R.id.booksRadioButton) {
            printType = "books";
        } else if (selectedRadioButtonId == R.id.magazinesRadioButton) {
            printType = "magazines";
        }else {
            printType = "all";
        }
        Log.d("MainActivity", "Consulta de búsqueda: " + queryString + ", Tipo de impresión: " + printType);

        if (queryString.trim().isEmpty()) {
            Toast.makeText(this, getResources().getString(R.string.req_bookTitle) , Toast.LENGTH_SHORT).show();
            return;
        }

        Bundle queryBundle = new Bundle();
        queryBundle.putString(BookLoaderCallbacks.EXTRA_QUERY_STRING, queryString);
        queryBundle.putString(BookLoaderCallbacks.EXTRA_PRINT_TYPE, printType);

        // Reiniciamos el loader
        LoaderManager.getInstance(this).restartLoader(BOOK_LOADER_ID, queryBundle, bookLoaderCallbacks);
    }

    public void setStatusText(String status) {
        if (statusTextView != null) {
            statusTextView.setText(status);
            statusTextView.setVisibility(View.VISIBLE);
        }
    }

    public void updateBooksResultList(List<BookInfo> books) {
        if (booksResultListAdapter != null) {
            booksResultListAdapter.setBooks(books);
            booksResultListAdapter.notifyDataSetChanged();
            if(books!=null && !books.isEmpty()) {
                statusTextView.setVisibility(View.VISIBLE);
                resultsRecyclerView.setVisibility(View.VISIBLE);
            } else {
                statusTextView.setVisibility(View.GONE);
                resultsRecyclerView.setVisibility(View.GONE);
            }
        }
    }

}