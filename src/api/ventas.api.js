import { Router } from 'express';
import {
  listarVentas,
  obtenerVenta,
  crear,
  actualizar,
  eliminar,
} from '../controllers/ventas.controller.js';

const router = Router();

router.get('/', listarVentas);
router.get('/:id', obtenerVenta);
router.post('/', crear);
router.put('/:id', actualizar);
router.delete('/:id', eliminar);

export default router;