import { Router } from 'express';
import {
  listarClientes,
  obtenerCliente,
  crear,
  actualizar,
} from '../controllers/clientes.controller.js';
import { getVentas } from '../services/ventas.service.js';

const router = Router();

router.get('/', listarClientes);
router.get('/:id', obtenerCliente);
router.post('/', crear);
router.put('/:id', actualizar);

router.get('/:id/ventas', async (req, res) => {
  try {
    const ventas = await getVentas({ clienteId: req.params.id });
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;