import "./globals.css";
import ServiceWorkerRegister from '@/app/components/ServiceWorkerRegister';

export const metadata = {
  title: "Buscador de Libros",
  description: "Aplicación para buscar libros usando la API de Google Books",};

export default function RootLayout({ children }) {
  
  return (
    <html lang="es">
      <ServiceWorkerRegister /> 
      <body>{children}</body>
    </html>
  );
}