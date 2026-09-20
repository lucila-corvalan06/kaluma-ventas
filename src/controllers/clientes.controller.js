import {
  getClientes,
  getClientePorId,
  crearCliente,
  actualizarCliente,
} from '../services/clientes.service.js';

const CAMPOS_CLIENTE = ['nombre', 'foto', 'descripcion', 'email', 'telefono', 'direccion'];

function limpiarDatos(body) {
  const data = {};
  for (const campo of CAMPOS_CLIENTE) {
    if (body[campo] !== undefined) data[campo] = body[campo];
  }
  return data;
}

export async function listarClientes(req, res) {
  try {
    const clientes = await getClientes();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function obtenerCliente(req, res) {
  try {
    const cliente = await getClientePorId(req.params.id);
    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function crear(req, res) {
  try {
    const data = limpiarDatos(req.body);
    if (!data.nombre) {
      return res.status(400).json({ error: 'Falta el campo obligatorio: nombre' });
    }
    const nuevoCliente = await crearCliente(data);
    res.status(201).json(nuevoCliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function actualizar(req, res) {
  try {
    const data = limpiarDatos(req.body);
    const actualizado = await actualizarCliente(req.params.id, data);
    if (!actualizado) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json({ mensaje: 'Cliente actualizado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}