import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import path from 'path'; // Necesario para manejar rutas absolutas
import openaiHandler from './openaiHandler.js';

const app = express();

// Configuración de middleware
app.use(cors());
app.use(express.json());

// Ruta de la API
app.post('/api/generate-article', openaiHandler);

// Sirve los archivos estáticos del frontend
const __dirname = path.resolve(); // Obtiene el directorio base
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// Maneja todas las demás rutas devolviendo el archivo index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'));
});

// Inicio del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
