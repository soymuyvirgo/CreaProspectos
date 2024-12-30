import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import openaiHandler from './openaiHandler.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/generate-article', openaiHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
