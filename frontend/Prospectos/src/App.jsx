// project/frontend/src/App.jsx
import React, { useState } from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import ArticleDisplay from './components/ArticleDisplay';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const [article, setArticle] = useState('');
  const [error, setError] = useState(null);

  return (
    <div>
      <Header />
      <ErrorMessage error={error} />
      <InputForm setArticle={setArticle} setError={setError} />
      <ArticleDisplay article={article} />
    </div>
  );
}

export default App;
