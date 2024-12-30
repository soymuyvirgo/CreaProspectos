// project/frontend/src/components/ArticleDisplay.jsx
import React from 'react';

function ArticleDisplay({ article }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(article);
    alert('Artículo copiado al portapapeles');
  };

  if (!article) return null;

  return (
    <div>
      <h2>Artículo Generado</h2>
      <p>{article}</p>
      <button onClick={handleCopy}>Copiar Artículo</button>
    </div>
  );
}

export default ArticleDisplay;
