package es.ucm.fdi.pad.googlebooksclient.modelo;

import android.os.Bundle;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.loader.app.LoaderManager;
import androidx.loader.content.Loader;

import java.util.List;

import es.ucm.fdi.pad.googlebooksclient.MainActivity;

public class BookLoaderCallbacks implements LoaderManager.LoaderCallbacks<List<BookInfo>> {

    private MainActivity myMainActivity;
    private static final int BOOK_LOADER_ID = 1;
    public static final String EXTRA_QUERY_STRING = "extra_query";
    public static final String EXTRA_PRINT_TYPE = "extra_print_type";

    public BookLoaderCallbacks(MainActivity mainActivity) {
        myMainActivity = mainActivity;
    }

    @NonNull
    @Override
    public Loader<List<BookInfo>> onCreateLoader(int id, @Nullable Bundle args) {
        String queryString = args.getString(EXTRA_QUERY_STRING);
        String printType = args.getString(EXTRA_PRINT_TYPE);
        //myMainActivity.setSatusText("Cargando libros...");
        if (id == BOOK_LOADER_ID)
            return new BookLoader(myMainActivity, queryString, printType);
        else
            throw new IllegalArgumentException("Loader id incorrecto. No pertenece a BOOK_LOADER_ID");
    }

    @Override
    public void onLoadFinished(@NonNull Loader<List<BookInfo>> loader, List<BookInfo> data) {
        //myMainActivity.updateBooksResultList(null);
        if(data!= null && !data.isEmpty()) {
            //myMainActivity.setStatusText("Resultados");
            //myMainActivity.updateBookList(data);
            Log.d("BookLoaderCallbacks", "Libros cargados: " + data.size());
        }else if (data != null && data.isEmpty()) {
            //myMainActivity.setStatusText("No se han encontrado resultados.");
            Log.d("BookLoaderCallbacks", "No se han encontrado resultados.");
        } else
            Log.d("BookLoaderCallbacks", "Error al cargar libros.");
    }

    @Override
    public void onLoaderReset(@NonNull Loader<List<BookInfo>> loader) {
        //myMainActivity.updateBookList(null);
        Log.d("BookLoaderCallbacks", "Loader reseteado.");
    }
}
