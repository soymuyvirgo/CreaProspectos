import React, { useState } from 'react';
import axios from 'axios';

function InputForm({ setArticle, setError }) {
  const [url, setUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!url) {
      setError('Por favor, ingrese una URL válida.');
      return;
    }

    try {
      // Ajusta la ruta a tu backend
      const response = await axios.post('http://localhost:5000/api/generate-article', { url });
      setArticle(response.data.article);
    } catch (error) {
      // Log detallado para depuración
      console.error('Error del backend:', error.response?.data || error);
      setError(error.response?.data?.error || 'Ocurrió un error al generar el artículo.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Ingrese la URL del sitio web"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button type="submit">Generar Artículo</button>
    </form>
  );
}

export default InputForm;
