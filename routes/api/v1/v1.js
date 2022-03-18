const express = require('express');
const router = express.Router();

const estudiantesRoutes = require('./estudiantes/estudiantes');
const aulasRoutes = require('./aulas/aulas');
const seccionesRoutes =require('./secciones/secciones');
const gradosRoutes =require('./grados/grados');
const jornadaRoutes = require ('./jornada/jornada');

const { verifyApiHeaderToken} = require('./headerVerifyMiddleware');

router.use('/estudiantes',verifyApiHeaderToken, estudiantesRoutes);
router.use('/aulas',verifyApiHeaderToken,aulasRoutes);
router.use('/secciones',verifyApiHeaderToken,seccionesRoutes);
router.use('/grados',verifyApiHeaderToken,gradosRoutes);
router.use('/jornada',verifyApiHeaderToken,jornadaRoutes);

module.exports= router;