const express= require('express');
const router = express.Router();
const {validatebyId} = require('../validators/horarioValidacion');
const {validatenew} = require('../validators/horarioValidacion');
const {validateupdate} = require('../validators/horarioValidacion');
const {validatedelete} = require('../validators/horarioValidacion');

const Horarios = require('../../../../dao/horario/horario.model');
const horariosModel = new Horarios();

router.get('/', (req, res)=> {
    res.status(200).json(
        {
            endpoid: 'Horarios',

        }
        );
});

router.get('/all', async (req, res) => {
    try {
        const rows = await horariosModel.getAll();
        res.status(200).json({status:'ok', horarios: rows});
    } catch (ex) {
        console.log(ex);
        res.status(500).json({status:'failed'});
    }
    } );


router.get('/byid/:id',validatebyId, async (req, res) => {
    try {
      const { id } = req.params;
      const row = await horariosModel.getById(parseInt(id));
      res.status(200).json({ status: 'ok', horarios: row });
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
        const horarios = await horariosModel.getFaceted(page, items);
        res.status(200).json({docs:horarios});
      } catch (ex) {
        console.log(ex);
        res.status(500).json({ status: 'failed' });
      }
    } else {
      return res.status(403).json({status:'error', msg:'Not a valid item value (10,15,20)'});
    }
  
  });

router.post('/new',validatenew, async (req, res) => {
    const { hora} = req.body;
    const busqueda = await horariosModel.detectedId(hora)
    try {
        if(!busqueda){
          rslt = await horariosModel.new( hora);
          res.status(200).json(
          {
            status: 'ok',
            result: rslt
          });
        }else{
          res.status(400).json({status:'Ya existe esta hora', error:1});
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
      const { hora } = req.body;
      const { id } = req.params;
      const busqueda = await horariosModel.detectedId(hora)
      if(!busqueda){
        const result = await horariosModel.updateOne( id, hora );
        res.status(200).json(
        {
          status: 'ok',
          result
        });
      }else{
        res.status(400).json({status:'Ya existe esta hora', error:1});
      }
    } catch(ex){
      console.log(ex);
      res.status(500).json({ status: 'failed' });
    }
  });

    router.delete('/delete/:id', validatedelete, async (req, res) => {
    try {
      const { id } = req.params;
      const result = await horariosModel.deleteOne(id);
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