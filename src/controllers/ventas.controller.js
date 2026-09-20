import { ObjectId } from 'mongodb';
import {
  getVentas,
  getVentaPorId,
  crearVenta,
  actualizarVenta,
  eliminarVenta,
} from '../services/ventas.service.js';

const CAMPOS_VENTA = ['nombre', 'descripcion', 'precio', 'foto', 'link', 'seccion', 'clienteId', 'pedidoId'];

function limpiarDatos(body) {
  const data = {};
  for (const campo of CAMPOS_VENTA) {
    if (body[campo] !== undefined) data[campo] = body[campo];
  }
  return data;
}

export async function listarVentas(req, res) {
  try {
    const ventas = await getVentas(req.query);
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function obtenerVenta(req, res) {
  try {
    const venta = await getVentaPorId(req.params.id);
    if (!venta) return res.status(404).json({ error: 'Venta no encontrada' });
    res.json(venta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function crear(req, res) {
  try {
    const data = limpiarDatos(req.body);
    if (data.clienteId) data.clienteId = new ObjectId(data.clienteId);
    if (!data.nombre || !data.precio || !data.seccion) {
      return res.status(400).json({ error: 'Faltan campos obligatorios (nombre, precio, seccion)' });
    }
    const nuevaVenta = await crearVenta(data);
    res.status(201).json(nuevaVenta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function actualizar(req, res) {
  try {
    const data = limpiarDatos(req.body);
    if (data.clienteId) data.clienteId = new ObjectId(data.clienteId);
    const actualizado = await actualizarVenta(req.params.id, data);
    if (!actualizado) return res.status(404).json({ error: 'Venta no encontrada' });
    res.json({ mensaje: 'Venta actualizada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function eliminar(req, res) {
  try {
    const eliminado = await eliminarVenta(req.params.id);
    if (!eliminado) return res.status(404).json({ error: 'Venta no encontrada' });
    res.json({ mensaje: 'Venta eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}