import axios from 'axios';
import dotenv from 'dotenv';

// Cargar variables de entorno desde .env
dotenv.config();

// Verificar si la clave API se está cargando correctamente
console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY);

(async () => {
  try {
    // Llamada al endpoint correcto para modelos de chat
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions', // Cambiado a chat/completions
      {
        model: 'gpt-3.5-turbo', // O usa 'gpt-4' si tienes acceso
        messages: [
          { role: 'system', content: 'Eres un asistente útil.' },
          { role: 'user', content: 'Prueba de conexión con OpenAI.' }
        ],
        max_tokens: 10,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Respuesta de OpenAI:', response.data);
  } catch (error) {
    // Capturar y mostrar errores si ocurre un problema
    console.error('Error al conectar con OpenAI:', error.response?.data || error.message);
  }
})();
