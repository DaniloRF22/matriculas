const express = require('express');
const router = express.Router();

const estudiantesRoutes = require('./estudiantes/estudiantes');
const aulasRoutes = require('./aulas/aulas');
const seccionesRoutes =require('./secciones/secciones');
const gradosRoutes =require('./grados/grados');
const maestrosRoutes =require('./maestros/maestros');
const jornadaRoutes = require ('./jornada/jornada');
const horarioRoutes = require ('./horario/horario');

const { verifyApiHeaderToken} = require('./headerVerifyMiddleware');

router.use('/estudiantes',verifyApiHeaderToken, estudiantesRoutes);
router.use('/aulas',verifyApiHeaderToken,aulasRoutes);
router.use('/secciones',verifyApiHeaderToken,seccionesRoutes);
router.use('/grados',verifyApiHeaderToken,gradosRoutes);
router.use('/maestros',verifyApiHeaderToken,maestrosRoutes);
router.use('/jornada',verifyApiHeaderToken,jornadaRoutes);
router.use('/horario',verifyApiHeaderToken,horarioRoutes);

module.exports= router;