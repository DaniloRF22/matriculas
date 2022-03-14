const express = require('express');
const router = express.Router();
const { verifyApiHeaderToken} = require('./headerVerifyMiddleware');
const {passport, jwtMiddleware} = require('./seguridad/jwtHelper');


const estudiantesRoutes= require('./estudiantes/estudiantes');




router.use('/estudiantes',verifyApiHeaderToken, jwtMiddleware , estudaintesRoutes);
