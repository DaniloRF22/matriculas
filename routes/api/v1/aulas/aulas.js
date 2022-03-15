const express= require('express');
const router = express.Router();
/* const {validatenew} = require('../validators/aulasValidacion');
const {validateupdate} = require('../validators/aulasValidacion'); */
const Aulas = require('../../../../dao/aulas/aulas.model');
const aulasModel = new Aulas();

router.get('/', (req, res)=> {
    res.status(200).json(
        {
            endpoid: 'Aulas',

        }
        );
});//Get/

router.get('/all', async (req, res) => {
    try {
      const rows = await aulasModel.getAll();
      res.status(200).json({status:'ok', aulas: rows});
    } catch (ex) {
      console.log(ex);
      res.status(500).json({status:'failed'});
    }
  } );


// /byid/1;
router.get('/byid/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const row = await aulasModel.getById(id);
        res.status(200).json({ status: 'ok', aulas: row });
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
        const estudaintes = await aulasModel.getFaceted(page, items);
        res.status(200).json({docs:estudaintes});
      } catch (ex) {
        console.log(ex);
        res.status(500).json({ status: 'failed' });
      }
    } else {
      return res.status(403).json({status:'error', msg:'Not a valid item value (10,15,20)'});
    }
  });

router.post('/new', async (req, res) => {
    const { numero } = req.body;
    try {
        rslt = await aulasModel.new(numero);
        res.status(200).json(
          {
            status: 'ok',
            result: rslt
          });
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
router.put('/update/:id', async (req, res) => {
    try{
      const { numero } = req.body;
      const { id } = req.params;
      const result = await aulasModel.updateOne( id, numero);
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
  router.delete('/delete/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await aulasModel.deleteOne(id);
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