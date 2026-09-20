import express from 'express';
import { connectDB } from './config/db.js';
import ventasApi from './api/ventas.api.js';
import clientesApi from './api/clientes.api.js';

const app = express();
app.use(express.json());

app.use('/api/ventas', ventasApi);
app.use('/api/clientes', clientesApi);

const PORT = process.env.PORT || 3333;

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

start();