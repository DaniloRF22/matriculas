const express= require('express');
const router = express.Router();
const {validatebyId} = require('../validators/estudaintesValidacion');
const {validatenew} = require('../validators/estudaintesValidacion');
const {validateupdate} = require('../validators/estudaintesValidacion');
const {validatedelete} = require('../validators/estudaintesValidacion');

const Estudiantes = require('../../../../dao/estudiantes/estudiantes.model');
const estudiantesModel = new Estudiantes();

router.get('/', (req, res)=> {
    res.status(200).json(
        {
            endpoid: 'Estudiantes',

        }
        );
});//Get/

router.get('/all', async (req, res) => {
    try {
      const rows = await estudaintesModel.getAll();
      res.status(200).json({status:'ok', estudiantes: rows});
    } catch (ex) {
      console.log(ex);
      res.status(500).json({status:'failed'});
    }
  } );


// /byid/1;
router.get('/byid/:id',validatebyId, async (req, res) => {
    try {
      const { id } = req.params;
      const row = await estudiantesModel.getById(parseInt(id));
      res.status(200).json({ status: 'ok', estudaintes: row });
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
        const estudaintes = await estudiantesModel.getFaceted(page, items);
        res.status(200).json({docs:estudaintes});
      } catch (ex) {
        console.log(ex);
        res.status(500).json({ status: 'failed' });
      }
    } else {
      return res.status(403).json({status:'error', msg:'Not a valid item value (10,15,20)'});
    }
  
  });

router.post('/new',validatenew, async (req, res) => {
    const { identidad, nombres, apellidos, edad, grado, seccion, nombre_encargado, telefono_encargado, correo } = req.body;
    try {
        rslt = await estudaintesModel.new( identidad, nombres, apellidos, edad, grado, seccion, nombre_encargado, telefono_encargado, correo );
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
router.put('/update/:id',validateupdate, async (req, res) => {
    try{
      const { identidad, nombres, apellidos, edad, grado, seccion, nombre_encargado, telefono_encargado, correo  } = req.body;
      const { id } = req.params;
      const result = await estudaintesModel.updateOne( id, identidad, nombres, apellidos, edad, grado, seccion, nombre_encargado, telefono_encargado, correo );
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
      const result = await estudaintesModel.deleteOne(id);
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