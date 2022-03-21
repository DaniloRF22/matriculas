const express= require('express');
const router = express.Router();
const {validatebyId} = require('../validators/seccionesValidacion');
const {validatenew} = require('../validators/seccionesValidacion');
const {validateupdate} = require('../validators/seccionesValidacion');
const {validatedelete} = require('../validators/seccionesValidacion');

const Secciones = require('../../../../dao/secciones/secciones.model');
const seccionesModel = new Secciones();

router.get('/', (req, res)=> {
    res.status(200).json(
        {
            endpoid: 'Secciones',

        }
        );
});//Get/

router.get('/all', async (req, res) => {
    try {
      const rows = await seccionesModel.getAll();
      res.status(200).json({status:'ok', secciones: rows});
    } catch (ex) {
      console.log(ex);
      res.status(500).json({status:'failed'});
    }
  } );


// /byid/1;
router.get('/byid/:id',validatebyId, async (req, res) => {
    try {
      const { id } = req.params;
      const row = await seccionesModel.getById(parseInt(id));
      res.status(200).json({ status: 'ok', secciones: row });
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
        const secciones = await seccionesModel.getFaceted(page, items);
        res.status(200).json({docs:secciones});
      } catch (ex) {
        console.log(ex);
        res.status(500).json({ status: 'failed' });
      }
    } else {
      return res.status(403).json({status:'error', msg:'Not a valid item value (10,15,20)'});
    }
  
  });

router.post('/new',validatenew, async (req, res) => {
    const { seccion } = req.body;
    const busqueda = await seccionesModel.detectedId(seccion)
    try {
        if(!busqueda){
          rslt = await seccionesModel.new( seccion);
          res.status(200).json(
          {
            status: 'ok',
            result: rslt
          });
        }else{
          res.status(400).json({status:'Ya existe una seccion como la que desea ingresar', error:1});
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
    const { seccion } = req.body;
    const { id } = req.params;
    const busqueda = await seccionesModel.detectedId(seccion)
    if(!busqueda){
      const result = await seccionesModel.updateOne( id, seccion);
      res.status(200).json({
      status:'ok',
      result
    });
    }else{
      res.status(400).json({status:'Ya existe una seccion como la que desea ingresar', error:1});
    }

    
  } catch(ex){
    console.log(ex);
    res.status(500).json({ status: 'failed' });
  }
});

  //router.delete();
  router.delete('/delete/:id', validatedelete, async (req, res) => {
    try {
      const { id } = req.params;
      const result = await seccionesModel.deleteOne(id);
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