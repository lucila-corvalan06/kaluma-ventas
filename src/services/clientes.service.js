import { connectDB } from '../config/db.js';
import { ObjectId } from 'mongodb';

async function getCollection() {
  const db = await connectDB();
  return db.collection('clientes');
}

export async function getClientes() {
  const coll = await getCollection();
  return coll.find({}).toArray();
}

export async function getClientePorId(id) {
  const coll = await getCollection();
  return coll.findOne({ _id: new ObjectId(id) });
}

export async function crearCliente(data) {
  const coll = await getCollection();
  const resultado = await coll.insertOne(data);
  return { _id: resultado.insertedId, ...data };
}

export async function actualizarCliente(id, data) {
  const coll = await getCollection();
  const resultado = await coll.updateOne(
    { _id: new ObjectId(id) },
    { $set: data }
  );
  return resultado.modifiedCount > 0;
}