import { ObjectId } from 'mongodb';
import { connectDB } from '../config/db.js';

async function getCollection(){
    const db = await connectDB();
    return db.collection('ventas');
}

export async function getVentas(filtros = {}) {
    const coll = await getCollection();
    const query = {};

    if (filtros.seccion) query.seccion = filtros.seccion;
    if (filtros.clienteId) query.clienteId = new ObjectId(filtros.clienteId);

    return coll.find(query) . toArray();
}

export async function getVentaPorId(id) {
  const coll = await getCollection();
  return coll.findOne({ _id: new ObjectId(id) });
}

export async function crearVenta(data) {
  const coll = await getCollection();
  const resultado = await coll.insertOne(data);
  return { _id: resultado.insertedId, ...data };
}

export async function actualizarVenta(id, data) {
  const coll = await getCollection();
  const resultado = await coll.updateOne(
    { _id: new ObjectId(id) },
    { $set: data }
  );
  return resultado.modifiedCount > 0;
}

export async function eliminarVenta(id) {
  const coll = await getCollection();
  const resultado = await coll.deleteOne({ _id: new ObjectId(id) });
  return resultado.deletedCount > 0;
}