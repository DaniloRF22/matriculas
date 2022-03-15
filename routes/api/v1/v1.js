const express = require('express');
const router = express.Router();

const estudiantesRoutes = require('./estudiantes/estudiantes');
const aulasRoutes = require('./aulas/aulas');

const { verifyApiHeaderToken} = require('./headerVerifyMiddleware');

router.use('/estudiantes',verifyApiHeaderToken, estudiantesRoutes);
router.use('/aulas',verifyApiHeaderToken,aulasRoutes);

module.exports= router;