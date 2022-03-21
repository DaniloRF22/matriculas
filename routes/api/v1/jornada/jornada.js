const express= require('express');
const router = express.Router();
const {validatebyId} = require('../validators/jornadaValidacion');
const {validatenew} = require('../validators/jornadaValidacion');
const {validateupdate} = require('../validators/jornadaValidacion');
const {validatedelete} = require('../validators/jornadaValidacion');

const jornadas = require('../../../../dao/jornada/jornada.model');
const jornadaModel = new jornadas();

router.get('/', (req, res)=> {
    res.status(200).json(
        {
            endpoid: 'jornadas',

        }
        );
});

router.get('/all', async (req, res) => {
    try {
      const rows = await jornadaModel.getAll();
      res.status(200).json({status:'ok', jornadas: rows});
    } catch (ex) {
      console.log(ex);
      res.status(500).json({status:'failed'});
    }
  } );

router.get('/byid/:id',validatebyId, async (req, res) => {
    try {
      const { id } = req.params;
      const row = await jornadaModel.getById(parseInt(id));
      res.status(200).json({ status: 'ok', jornadas: row });
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
        const jornadas = await jornadaModel.getFaceted(page, items);
        res.status(200).json({docs:jornadas});
      } catch (ex) {
        console.log(ex);
        res.status(500).json({ status: 'failed' });
      }
    } else {
      return res.status(403).json({status:'error', msg:'Not a valid item value (10,15,20)'});
    }
  
  });

router.post('/new',validatenew, async (req, res) => {
    const { tipojornada } = req.body;
    const busqueda = await jornadaModel.detectedId(tipojornada)
    try {
        if(!busqueda){
          rslt = await jornadaModel.new( tipojornada );
          res.status(200).json(
          {
            status: 'ok',
            result: rslt
          });
        }else{
          res.status(400).json({status:'Ya existe la jornada', error:1});
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
      const { tipojornada} = req.body;
      const { id } = req.params;
      const busqueda = await jornadaModel.detectedId(tipojornada)
      if(!busqueda){
        const result = await jornadaModel.updateOne( id, tipojornada );
        res.status(200).json(
        {
          status: 'ok',
          result
        });
      }else{
        res.status(400).json({status:'Ya existe la jornada', error:1});
      }
    } catch(ex){
      console.log(ex);
      res.status(500).json({ status: 'failed' });
    }
  });

  router.delete('/delete/:id', validatedelete, async (req, res) => {
    try {
      const { id } = req.params;
      const result = await jornadaModel.deleteOne(id);
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