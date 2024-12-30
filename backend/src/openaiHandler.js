import axios from 'axios';
import metascraper from 'metascraper';
import metascraperTitle from 'metascraper-title';
import metascraperDescription from 'metascraper-description';
import { JSDOM } from 'jsdom';
import got from 'got';

const openaiHandler = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'No se ha proporcionado una URL válida.' });
    }

    const { body: html } = await got(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
    });

    // Extraer metadatos con metascraper
    const metadata = await metascraper({ html, url });

    // Usar jsdom para extraer más información del contenido HTML
    const dom = new JSDOM(html);
    const textContent = dom.window.document.body.textContent;
    const firstParagraph = textContent.trim().split('\n').find((p) => p.length > 100); // Extrae el primer párrafo significativo

    const prompt = `
    Título: ${metadata.title || 'Sin título'}
    Descripción: ${metadata.description || 'Sin descripción'}
    Contenido relevante extraído del sitio web:
    ${firstParagraph || 'No se encontró contenido relevante.'}
    
    Basándote en esta información, redacta un artículo que incluya:
    1. Una descripción general de la empresa y su actividad principal.
    2. Posibles necesidades que podrían derivarse de la información encontrada en su sitio web.
    3. Oportunidades para ofrecer servicios o soluciones que beneficien a la empresa en sus operaciones, ventas o interacción con clientes.
    El artículo debe ser informativo y enfocado en identificar necesidades y soluciones prácticas.
    `;

    // Llamada al modelo OpenAI
    const openaiResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'Eres un asistente útil que analiza páginas web para identificar oportunidades de ventas y redactar artículos informativos.',
          },
          { role: 'user', content: prompt },
        ],
        max_tokens: 500,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const article = openaiResponse.data.choices[0].message.content.trim();
    return res.json({ article });
  } catch (error) {
    // Agregar logs detallados
    console.error('Error completo:', error);
    console.error('Detalles de la respuesta de OpenAI:', error.response?.data); // Si es un error de OpenAI
    console.error('Mensaje del error:', error.message);

    // Respuesta al cliente
    return res.status(500).json({
      error: 'Ocurrió un error al generar el artículo.',
      details: error.message || 'Error no especificado',
    });
  }
};

export default openaiHandler;
