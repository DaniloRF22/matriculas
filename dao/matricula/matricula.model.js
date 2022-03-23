const ObjectId = require('mongodb').ObjectId;
const getDb = require('../mongodb');

let db = null;
class Matricula {
  collection = null;
  constructor() {
    getDb()
      .then((database) => {
        db = database;
        this.collection = db.collection('matricula');
        if (process.env.MIGRATE === 'true') {
          // Por Si se ocupa algo
        }
      })
      .catch((err) => { console.error(err) });
  }

  async new(identidad_alumno, nombre_alumno, grado, seccion, jornada, horario, aula, nombre_maestro) {
    const newMatricula = {
        identidad_alumno,
        nombre_alumno,
        grado,
        seccion,
        jornada,
        horario,
        aula,
        nombre_maestro
    };
    const rslt = await this.collection.insertOne(newMatricula);
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

  async updateOne(id, identidad_alumno, nombre_alumno, grado, seccion, jornada, horario, aula, nombre_maestro) {
    const filter = {_id: new ObjectId(id)};
    // UPDATE ESTUDIANTES SET campo=valor, campo=valor where id= id;
    const updateCmd = {
      '$set':{
        identidad_alumno,
        nombre_alumno,
        grado,
        seccion,
        jornada,
        horario,
        aula,
        nombre_maestro
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
  async detectedId (identidad_alumno){
    const filter = {identidad_alumno};
    return await this.collection.findOne(filter);
  }
}

module.exports = Matricula;