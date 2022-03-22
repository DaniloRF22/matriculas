const ObjectId = require('mongodb').ObjectId;
const getDb = require('../mongodb');

let db = null;
class Maestros {
  collection = null;
  constructor() {
    getDb()
      .then((database) => {
        db = database;
        this.collection = db.collection('maestros');
        if (process.env.MIGRATE === 'true') {
          // Por Si se ocupa algo
        }
      })
      .catch((err) => { console.error(err) });
  }

  async new(identidad, nombres, apellidos, email, telefono, direccion, materias, grados) {
    const newMaestro = {
        identidad,
        nombres,
        apellidos,
        email,
        telefono,
        direccion,
        materias,
        grados
    };
    const rslt = await this.collection.insertOne(newMaestro);
    return rslt;
  }

  async getAll() {
    const cursor = this.collection.find({});
    const documents = await cursor.toArray();
    return documents;
  }
  async getFaceted(page, items, filter = {}) {
    const cursor = this.collection.find(filter);
    const totalItems = await cursor.count();
    cursor.skip((page -1) * items);
    cursor.limit(items);
    const resultados = await cursor.toArray();
    return {
      totalItems,
      page,
      items,
      totalPages: (Math.ceil(totalItems / items)),
      resultados
    };
  }
  async getById(id) {
    const _id = new ObjectId(id);
    const filter = {_id};
    console.log(filter);
    const myDocument = await this.collection.findOne(filter);
    return myDocument;
  }

  async updateOne(id, identidad, nombres, apellidos, email, telefono, direccion, materias,grados ) {
    const filter = {_id: new ObjectId(id)};
    // UPDATE MAESTROS SET campo=valor, campo=valor where id= id;
    const updateCmd = {
      '$set':{
        identidad,
        nombres,
        apellidos,
        email,
        telefono,
        direccion,
        materias,
        grados
      }
    };
    return await this.collection.updateOne(filter, updateCmd);
  }

  async deleteOne(id) {
    const _id = new ObjectId(id);
    const filter = {_id};
    console.log(filter);
    const myDocument = await this.collection.deleteOne(filter);
    return myDocument;
  }

  async detectedId (identidad){
    const filter = {identidad};
    return await this.collection.findOne(filter);
  }
}

module.exports = Maestros;