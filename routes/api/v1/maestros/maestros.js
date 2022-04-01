const express= require('express');
const router = express.Router();
const {validatebyId} = require('../validators/maestrosValidacion');
const {validatenew} = require('../validators/maestrosValidacion');
const {validateupdate} = require('../validators/maestrosValidacion');
const {validatedelete} = require('../validators/maestrosValidacion');

const Maestros = require('../../../../dao/maestros/mestros.model');
const maestrosModel = new Maestros();

router.get('/', (req, res)=> {
    res.status(200).json(
        {
            endpoid: 'Maestros',

        }
        );
});//Get/

router.get('/all', async (req, res) => {
    try {
      const rows = await maestrosModel.getAll();
      res.status(200).json({status:'ok', maestros: rows});
    } catch (ex) {
      console.log(ex);
      res.status(500).json({status:'failed'});
    }
  } );


// /byid/1;
router.get('/byid/:id',validatebyId, async (req, res) => {
    try {
      const { id } = req.params;
      const row = await maestrosModel.getById(parseInt(id));
      res.status(200).json({ status: 'ok', maestros: row });
    } catch (ex) {
      console.log(ex);
      res.status(500).json({ status: 'failed' });
    }
  });

  const allowedItemsNumber = [10, 15, 20];
  //facet search
  router.get('/facet/:page/:items', async (req, res) => {
    const page = parseInt(req.params.page, 10);
    const items = parseInt(req.params.items, 10);
    if (allowedItemsNumber.includes(items)) {
      try {
        const maestros = await maestrosModel.getFaceted(page, items);
        res.status(200).json({docs:maestros});
      } catch (ex) {
        console.log(ex);
        res.status(500).json({ status: 'failed' });
      }
    } else {
      return res.status(403).json({status:'error', msg:'Not a valid item value (10,15,20)'});
    }
  
  });

router.post('/new',validatenew, async (req, res) => {
    const { identidad, nombres, apellidos, email, telefono, direccion, materias, grados, estado } = req.body;
    const busqueda = await maestrosModel.detectedId(identidad)
    try {
        if(!busqueda){
          rslt = await maestrosModel.new( identidad, nombres, apellidos, email, telefono, direccion, materias, grados, estado );
          res.status(200).json(
          {
            status: 'ok',
            result: rslt
          });
        }else{
          res.status(400).json({status:'Maestro con esta identidad ya fue ingresado', error:1});
        }
        
      } catch (ex) {
        console.log(ex);
        res.status(500).json(
          {
            status: 'failed',
            result: {}
          });
      }
    });  //post/new


//router.put();
router.put('/update/:id',validateupdate, async (req, res) => {
    try{
      const { identidad, nombres, apellidos, email, telefono, direccion, materias,grados, estado  } = req.body;
      const { id } = req.params;
      const result = await maestrosModel.updateOne( id, identidad, nombres, apellidos, email, telefono, direccion, materias,grados, estado );
      res.status(200).json({
      status:'ok',
      result
      });
    } catch(ex){
      console.log(ex);
      res.status(500).json({ status: 'failed' });
    }
  });

  //router.delete();
  router.delete('/delete/:id', validatedelete, async (req, res) => {
    try {
      const { id } = req.params;
      const result = await maestrosModel.deleteOne(id);
      res.status(200).json({
        status: 'ok',
        result
      });
    } catch (ex) {
      console.log(ex);
      res.status(500).json({ status: 'failed' });
    }
  });


  module.exports = router;