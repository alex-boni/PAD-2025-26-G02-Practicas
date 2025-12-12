'use client';
import axios from "axios";
const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

// Crear una instancia de Axios con la configuración base
const apiGoogleBooks = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // Tiempo de espera de 10 segundos
});

// Interceptor para agregar la clave de API a cada solicitud
apiGoogleBooks.interceptors.request.use((config) => {
  const apiKey = process.env.API_KEY_GOOGLE_BOOKS;
  if (apiKey) {
    config.params = config.params || {};
    config.params.key = apiKey;
  }
  return config;
});

// Interceptor para manejar errores de respuesta
apiGoogleBooks.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Google Books Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default apiGoogleBooks;
