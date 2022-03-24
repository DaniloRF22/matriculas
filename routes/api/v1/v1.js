const express = require('express');
const router = express.Router();

const estudiantesRoutes = require('./estudiantes/estudiantes');
const aulasRoutes = require('./aulas/aulas');
const seccionesRoutes =require('./secciones/secciones');
const gradosRoutes =require('./grados/grados');
const maestrosRoutes =require('./maestros/maestros');
const jornadaRoutes = require ('./jornada/jornada');
const horarioRoutes = require ('./horario/horario');
const seguridadRoutes = require('./seguridad/seguridad');
const matriculasRoutes = require('./matricula/matricula');
const { verifyApiHeaderToken} = require('./headerVerifyMiddleware');
const {passport, jwtMiddleware} = require('./seguridad/jwtHelper');


router.use('/estudiantes',verifyApiHeaderToken,jwtMiddleware, estudiantesRoutes);
router.use('/aulas',verifyApiHeaderToken,jwtMiddleware,aulasRoutes);
router.use('/secciones',verifyApiHeaderToken,jwtMiddleware,seccionesRoutes);
router.use('/grados',verifyApiHeaderToken,jwtMiddleware,gradosRoutes);
router.use('/maestros',verifyApiHeaderToken,jwtMiddleware,maestrosRoutes);
router.use('/jornada',verifyApiHeaderToken,jwtMiddleware,jornadaRoutes);
router.use('/matricula',verifyApiHeaderToken,jwtMiddleware,matriculasRoutes);
router.use('/horario',verifyApiHeaderToken,jwtMiddleware,horarioRoutes);
router.use(passport.initialize());
router.use('/seguridad', verifyApiHeaderToken, seguridadRoutes);


module.exports= router;