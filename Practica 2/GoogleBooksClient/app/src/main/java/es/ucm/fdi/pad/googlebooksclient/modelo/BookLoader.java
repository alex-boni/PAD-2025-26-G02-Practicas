package es.ucm.fdi.pad.googlebooksclient.modelo;

import android.content.Context;
import android.net.Uri;
import android.text.TextUtils;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.loader.content.AsyncTaskLoader;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

// Cambiamos el tipo genérico de String a List<BookInfo>
public class BookLoader extends AsyncTaskLoader<List<BookInfo>> {

    private String queryString;
    private String printType;

    private static final String BASE_URL = "https://www.googleapis.com/books/v1/volumes?";
    private static final String QUERY_PARAM = "q";
    private static final String MAX_RESULTS = "maxResults";
    private static final String PRINT_TYPE = "printType";
    private static final String API_KEY_PARAM = "key";

    // Esta clave es importante. No estoy seguro de si funcionara en dispositivos distintos
    private static final String API_KEY = "AIzaSyBZzkg05uUyZBsFPyxZ5EReXv1dGUTJMvQ";

    public BookLoader(@NonNull Context context, String queryString, String printType) {
        super(context);
        this.queryString = queryString;
        this.printType = printType;
    }

    @Override
    protected void onStartLoading() {
        super.onStartLoading();
        forceLoad();
    }

    /**
     * Este método ahora obtiene el JSON y lo parsea.
     * @return Una lista de objetos BookInfo, o null si hay error.
     */
    @Nullable
    @Override
    public List<BookInfo> loadInBackground() {
        String jsonResult = getBookInfoJson(queryString, printType);
        if (jsonResult == null) {
            return null;
        }
        return parseJsonToBookList(jsonResult);
    }

    /**
     * Parsea el String JSON y lo convierte en una lista de BookInfo.
     * @param jsonResult El String JSON recibido de la API.
     * @return Lista de BookInfo.
     */
    private List<BookInfo> parseJsonToBookList(String jsonResult) {
        ArrayList<BookInfo> books = new ArrayList<>();

        try {
            JSONObject root = new JSONObject(jsonResult);
            // Comprobamos si existe la clave "items"
            if (!root.has("items")) {
                Log.w("BookLoader", "No se encontraron 'items' en la respuesta JSON.");
                return books; // Devuelve lista vacía
            }

            JSONArray items = root.getJSONArray("items");

            for (int i = 0; i < items.length(); i++) {
                JSONObject item = items.getJSONObject(i);
                JSONObject volumeInfo = item.getJSONObject("volumeInfo");

                // 1. Obtener Título
                String title = volumeInfo.optString("title", "Título no disponible");

                // 2. Obtener Autores
                String authors = null;
                // Las revistas no tienen 'authors' según el requisito
                if (volumeInfo.has("authors")) {
                    JSONArray authorsArray = volumeInfo.getJSONArray("authors");
                    // Unimos todos los autores en un solo String
                    authors = TextUtils.join(", ", jsonArrayToStringArray(authorsArray));
                }

                // 3. Obtener Info Link
                String infoLink = volumeInfo.optString("infoLink", "http://books.google.com");

                // Añadimos el libro a la lista
                books.add(new BookInfo(title, authors, infoLink));
            }

        } catch (JSONException e) {
            e.printStackTrace();
            Log.e("BookLoader", "Error parseando el JSON", e);
            return null;
        }

        return books;
    }

    /**
     * Método de ayuda para convertir un JSONArray de Strings a un List<String>
     * (útil para TextUtils.join)
     */
    private ArrayList<String> jsonArrayToStringArray(JSONArray jsonArray) throws JSONException {
        ArrayList<String> stringList = new ArrayList<>();
        if (jsonArray != null) {
            for (int j = 0; j < jsonArray.length(); j++) {
                stringList.add(jsonArray.getString(j));
            }
        }
        return stringList;
    }


    /**
     * Realiza la petición a la API de Google Books y devuelve la respuesta JSON.
     * (Este método es idéntico al de la etapa anterior)
     */
    private String getBookInfoJson(String queryString, String printType) {
        HttpURLConnection urlConnection = null;
        BufferedReader reader = null;
        String bookJSONString = null;

        try {
            Uri builtURI = Uri.parse(BASE_URL).buildUpon()
                    .appendQueryParameter(QUERY_PARAM, queryString)
                    .appendQueryParameter(MAX_RESULTS, "10")
                    .appendQueryParameter(PRINT_TYPE, printType)
                    .appendQueryParameter(API_KEY_PARAM, API_KEY)
                    .build();

            URL requestURL = new URL(builtURI.toString());
            urlConnection = (HttpURLConnection) requestURL.openConnection();
            urlConnection.setRequestMethod("GET");
            urlConnection.connect();

            InputStream inputStream = urlConnection.getInputStream();
            reader = new BufferedReader(new InputStreamReader(inputStream));
            StringBuilder builder = new StringBuilder();

            String line;
            while ((line = reader.readLine()) != null) {
                builder.append(line);
                builder.append("\n");
            }

            if (builder.length() == 0) {
                return null;
            }

            bookJSONString = builder.toString();

        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (urlConnection != null) {
                urlConnection.disconnect();
            }
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        Log.d("BookLoader", "JSON Result: " + bookJSONString);
        return bookJSONString;
    }
}
