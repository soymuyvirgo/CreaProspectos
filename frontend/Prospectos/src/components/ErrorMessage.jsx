// project/frontend/src/components/ErrorMessage.jsx
import React from 'react';

function ErrorMessage({ error }) {
  if (!error) return null;
  return (
    <div style={{ color: 'red' }}>
      <p>{error}</p>
    </div>
  );
}

export default ErrorMessage;
