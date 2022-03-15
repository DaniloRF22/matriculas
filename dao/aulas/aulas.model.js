const ObjectId = require('mongodb').ObjectId;
const getDb = require('../mongodb');

let db = null;
class Aulas {
  collection = null;
  constructor() {
    getDb()
      .then((database) => {
        db = database;
        this.collection = db.collection('aulas');
        if (process.env.MIGRATE === 'true') {
          // Por Si se ocupa algo
        }
      })
      .catch((err) => { console.error(err) });
  }

  async new(numero) {
    const newAula = {
        numero
    };
    const rslt = await this.collection.insertOne(newAula);
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

  async updateOne(id,numero) {
    const filter = {_id: new ObjectId(id)};
    // UPDATE aulas SET campo=valor, campo=valor where id= id;
    const updateCmd = {
      '$set':{
        numero
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
}

module.exports = Aulas;