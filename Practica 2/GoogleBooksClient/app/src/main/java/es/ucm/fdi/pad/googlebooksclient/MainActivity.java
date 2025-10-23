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
import android.view.View;
import android.view.inputmethod.InputMethodManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioGroup;
import android.widget.Toast;

import java.util.List;
import es.ucm.fdi.pad.googlebooksclient.modelo.*;

public class MainActivity extends AppCompatActivity implements LoaderManager.LoaderCallbacks<List<BookInfo>> {

    private static final int BOOK_LOADER_ID = 1;

    // Componentes de la UI
    private EditText titleEditText;
    private EditText authorEditText;
    private RadioGroup searchTypeRadioGroup;
    private Button searchButton;

    // RecyclerView y Adaptador
    private RecyclerView resultsRecyclerView;
    private BookAdapter bookAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Inicializar vistas
        titleEditText = findViewById(R.id.titleEditText);
        authorEditText = findViewById(R.id.authorEditText);
        searchTypeRadioGroup = findViewById(R.id.searchTypeRadioGroup);
        searchButton = findViewById(R.id.searchButton);
        resultsRecyclerView = findViewById(R.id.resultsRecyclerView);

        // Configurar RecyclerView
        bookAdapter = new BookAdapter(this);
        resultsRecyclerView.setAdapter(bookAdapter);
        resultsRecyclerView.setLayoutManager(new LinearLayoutManager(this));

        // Configurar el listener del botón de búsqueda
        searchButton.setOnClickListener(v -> searchBooks());

        // Reconectar al loader si ya existe
        if (LoaderManager.getInstance(this).getLoader(BOOK_LOADER_ID) != null) {

            LoaderManager.getInstance(this).initLoader(BOOK_LOADER_ID, null, this);
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
            Toast.makeText(this, "No hay conexión a internet", Toast.LENGTH_SHORT).show();
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
        }

        if (queryString.trim().isEmpty()) {
            Toast.makeText(this, "Por favor, introduce un título o autor", Toast.LENGTH_SHORT).show();
            return;
        }

        Bundle queryBundle = new Bundle();
        queryBundle.putString("queryString", queryString);
        queryBundle.putString("printType", printType);

        // Reiniciamos el loader
        LoaderManager.getInstance(this).restartLoader(BOOK_LOADER_ID, queryBundle, this);
    }


    /**
     * onCreateLoader ahora devuelve un Loader<List<BookInfo>>
     */
    @NonNull
    @Override
    public Loader<List<BookInfo>> onCreateLoader(int id, @Nullable Bundle args) {
        String queryString = "";
        String printType = "all";

        if (args != null) {
            queryString = args.getString("queryString");
            printType = args.getString("printType");
        }

        return new BookLoader(this, queryString, printType);
    }

    /**
     * onLoadFinished ahora recibe una List<BookInfo>
     */
    @Override
    public void onLoadFinished(@NonNull Loader<List<BookInfo>> loader, List<BookInfo> data) {
        // Limpiamos los resultados anteriores
        bookAdapter.clearBooks();

        if (data != null && !data.isEmpty()) {
            // Si tenemos datos, los añadimos al adaptador
            bookAdapter.setBooks(data);
        } else {
            // Si no hay datos (o hay error), mostramos un mensaje
            Toast.makeText(this, "No se encontraron resultados.", Toast.LENGTH_SHORT).show();
        }
    }

    /**
     * onLoaderReset limpia el adaptador
     */
    @Override
    public void onLoaderReset(@NonNull Loader<List<BookInfo>> loader) {
        bookAdapter.clearBooks();
    }
}