import express from 'express';
import { connectDB } from './config/db.js';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3333;

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

start();