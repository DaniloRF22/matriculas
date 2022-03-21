const express= require('express');
const router = express.Router();
const {validatebyId} = require('../validators/gradosValidacion');
const {validatenew} = require('../validators/gradosValidacion');
const {validateupdate} = require('../validators/gradosValidacion');
const {validatedelete} = require('../validators/gradosValidacion');

const Grados = require('../../../../dao/grados/grados.model');
const gradosModel = new Grados();

router.get('/', (req, res)=> {
    res.status(200).json(
        {
            endpoid: 'Grados',

        }
        );
});

router.get('/all', async (req, res) => {
    try {
        const rows = await gradosModel.getAll();
        res.status(200).json({status:'ok', grados: rows});
    } catch (ex) {
        console.log(ex);
        res.status(500).json({status:'failed'});
    }
    } );


router.get('/byid/:id',validatebyId, async (req, res) => {
    try {
      const { id } = req.params;
      const row = await gradosModel.getById(parseInt(id));
      res.status(200).json({ status: 'ok', grados: row });
    } catch (ex) {
      console.log(ex);
      res.status(500).json({ status: 'failed' });
    }
  });

  const allowedItemsNumber = [10, 15, 20];
  router.get('/facet/:page/:items', async (req, res) => {
    const page = parseInt(req.params.page, 10);
    const items = parseInt(req.params.items, 10);
    if (allowedItemsNumber.includes(items)) {
      try {
        const grados = await gradosModel.getFaceted(page, items);
        res.status(200).json({docs:grados});
      } catch (ex) {
        console.log(ex);
        res.status(500).json({ status: 'failed' });
      }
    } else {
      return res.status(403).json({status:'error', msg:'Not a valid item value (10,15,20)'});
    }
  
  });

router.post('/new',validatenew, async (req, res) => {
    const { grado} = req.body;
    const busqueda = await gradosModel.detectedId(grado)
    try {
        if(!busqueda){
          rslt = await gradosModel.new( grado);
          res.status(200).json(
          {
            status: 'ok',
            result: rslt
          });
        }else{
          res.status(400).json({status:'Ya existe este grado', error:1});
        }
        
      } catch (ex) {
        console.log(ex);
        res.status(500).json(
          {
            status: 'failed',
            result: {}
          });
      }
    });


router.put('/update/:id',validateupdate, async (req, res) => {
    try{
      const { grado } = req.body;
      const { id } = req.params;
      const busqueda = await gradosModel.detectedId(grado)
      if(!busqueda){
        const result = await gradosModel.updateOne( id, grado );
        res.status(200).json(
        {
          status: 'ok',
          result
        });
      }else{
        res.status(400).json({status:'Ya existe este grado', error:1});
      }
    } catch(ex){
      console.log(ex);
      res.status(500).json({ status: 'failed' });
    }
  });

    router.delete('/delete/:id', validatedelete, async (req, res) => {
    try {
      const { id } = req.params;
      const result = await gradosModel.deleteOne(id);
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