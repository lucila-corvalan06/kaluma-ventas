import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import ventasApi from './api/ventas.api.js';
import clientesApi from './api/clientes.api.js';
import webRoutes from './routes/web.routes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/api/ventas', ventasApi);
app.use('/api/clientes', clientesApi);
app.use('/', webRoutes);

const PORT = process.env.PORT || 3333;

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

start();