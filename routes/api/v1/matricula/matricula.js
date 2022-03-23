const express= require('express');
const router = express.Router();

const {validatenew} = require('../validators/matriculasValidacion');
const {validateupdate} = require('../validators/matriculasValidacion');


const Matricula = require('../../../../dao/matricula/matricula.model');
const matriculaModel = new Matricula();
const Estudiantes = require('../../../../dao/estudiantes/estudiantes.model');
const estudiantesModel = new Estudiantes();
const Aulas = require('../../../../dao/aulas/aulas.model');
const aulasModel = new Aulas();
const Grados = require('../../../../dao/grados/grados.model');
const gradosModel = new Grados();
const Secciones = require('../../../../dao/secciones/secciones.model');
const seccionesModel = new Secciones();
const Horarios = require('../../../../dao/horario/horario.model');
const horariosModel = new Horarios();
const jornadas = require('../../../../dao/jornada/jornada.model');
const jornadaModel = new jornadas();
const Maestros = require('../../../../dao/maestros/mestros.model');
const maestrosModel = new Maestros();

router.get('/', (req, res)=> {
    res.status(200).json(
        {
            endpoid: 'Matricula',

        }
        );
});//Get/

router.get('/all', async (req, res) => {
    try {
      const rows = await matriculaModel.getAll();
      res.status(200).json({status:'ok', matricula: rows});
    } catch (ex) {
      console.log(ex);
      res.status(500).json({status:'failed'});
    }
  } );


// /byid/1;
router.get('/byid/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const row = await matriculaModel.getById(parseInt(id));
      res.status(200).json({ status: 'ok', matricula: row });
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
        const matricula = await matriculaModel.getFaceted(page, items);
        res.status(200).json({docs:matricula});
      } catch (ex) {
        console.log(ex);
        res.status(500).json({ status: 'failed' });
      }
    } else {
      return res.status(403).json({status:'error', msg:'Not a valid item value (10,15,20)'});
    }
  
  });

router.post('/new',validatenew, async (req, res) => {
    const { identidad_alumno, nombre_alumno, grado, seccion, jornada, horario, aula, nombre_maestro} = req.body;
    const busqueda = await estudiantesModel.detectedId(identidad_alumno)
    const busqueda2 = await estudiantesModel.detectednombrealumno(nombre_alumno)
    const busqueda3 = await gradosModel.detectedId(grado)
    const busqueda4 = await seccionesModel.detectedId(seccion)
    const busqueda5 = await jornadaModel.detectedId(jornada)
    const busqueda6 = await horariosModel.detectedId(horario)
    const busqueda7 = await aulasModel.detectedNumber(aula)
    const busqueda8 = await maestrosModel.detectednombremaestro(nombre_maestro)
    const bus = await matriculaModel.detectedId(identidad_alumno)

    try {
      if(!bus){
        if(busqueda){
            if(busqueda2){
                if(busqueda3){
                    if(busqueda4){
                        if(busqueda5){
                            if(busqueda6){
                                if(busqueda7){
                                    if(busqueda8){
                                        rslt = await matriculaModel.new( identidad_alumno, nombre_alumno, grado, seccion, jornada, horario, aula, nombre_maestro );
                                        res.status(200).json(
                                        {
                                            status: 'ok',
                                            result: rslt
                                        });
                                    }else{
                                        res.status(400).json({status:'Nombre del maestro no encontrado', error:7});
                                    }
                                }else{
                                    res.status(400).json({status:'Aula no encontrada', error:7});
                                }
                            }else{
                                res.status(400).json({status:'Horario no encontrada', error:6});
                            }
                        }else{
                            res.status(400).json({status:'Jornada no encontrada', error:5});
                        }
                    }else{
                        res.status(400).json({status:'Seccion no encontrada', error:4});
                    }
                }else{
                    res.status(400).json({status:'Grado no encontrado', error:3});
                }

            }else{
                res.status(400).json({status:'Nombre de estudiante no registrado', error:2});
            }
        }else{
          res.status(400).json({status:'Identidad del estudiante no encontrada', error:1});
        }
      }else{
        res.status(400).json({status:'Estudiante ya matriculado', error:0});
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
      const { identidad, nombre_Completo, edad, nombre_encargado, telefono_encargado, correo  } = req.body;
      const { id } = req.params;
      const result = await estudiantesModel.updateOne( id, identidad, nombre_Completo, edad, nombre_encargado, telefono_encargado, correo );
      res.status(200).json({
      status:'ok',
      result
      });
        res.status(400).json({status:'Estudiante con esta identidad ya fue ingresado', error:1});
      
    } catch(ex){
      console.log(ex);
      res.status(500).json({ status: 'failed' });
    }
  });

  //router.delete();
  router.delete('/delete/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await matriculaModel.deleteOne(id);
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