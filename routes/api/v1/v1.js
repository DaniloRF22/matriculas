const express = require('express');
const router = express.Router();

const estudiantesRoutes = require('./estudiantes/estudiantes');
const aulasRoutes = require('./aulas/aulas');
const seccionesRoutes =require('./secciones/secciones');

const { verifyApiHeaderToken} = require('./headerVerifyMiddleware');

router.use('/estudiantes',verifyApiHeaderToken, estudiantesRoutes);
router.use('/aulas',verifyApiHeaderToken,aulasRoutes);
router.use('/secciones',verifyApiHeaderToken,seccionesRoutes)

module.exports= router;