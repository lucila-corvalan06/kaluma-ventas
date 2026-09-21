import { Router } from 'express';
import { getVentas } from '../services/ventas.service.js';

const router = Router();

const SECCIONES = [
    { nombre: 'Cocina', slug: 'cocina'},
    { nombre: 'Baño', slug: 'bano'},
    { nombre: 'Textiles', slug: 'textiles'},
    { nombre: 'Decoración', slug: 'decoracion'},
    { nombre: 'Accesorios', slug: 'accesorios'},
    { nombre: 'Niños', slug: 'ninos'},
];

router.get('/', (req, res) =>{
    res.render('index', {secciones: SECCIONES});
});

router.get('/secciones/:slug', async (req, res) => {
    const slug = req.params.slug;
    const seccion = SECCIONES.find((s) => s.slug === slug);

    if(!seccion){
        return res.status(404).send('Sección no encontrada');
    }

    const ventas = await getVentas ({ seccion:slug });
    res.render('seccion', { seccion, ventas });
});

export default router;