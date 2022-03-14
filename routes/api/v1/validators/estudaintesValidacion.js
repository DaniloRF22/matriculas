const { check } = require("express-validator");
const { validateResult } = require("./validateHerper");

const validatebyId = [
    check('id')
    .exists()
    .not()
    .isEmpty(),
    (req, res, next) =>{
        validateResult(req, res, next)
    }
]

const validatenew = [
    check('identidad')
        .exists()
        .not()
        .isEmpty(),
    check('nombres')
        .exists()
        .not()
        .isEmpty(),
    check('apellidos')
        .exists()
        .not()
        .isEmpty(),
    check('edad')
        .exists()
        .not()
        .isEmpty(),
    check('grado')
        .exists()
        .not()
        .isEmpty(),
    check('seccion')
        .exists()
        .not()
        .isEmpty(),
    check('nombre_encargado')
        .exists()
        .not()
        .isEmpty(),
    check('telefono_encargado')
        .exists()
        .not()
        .isEmpty(),
     check('correo')
        .exists()
        .not()
        .isEmpty(),
    (req, res, next) =>{
        validateResult(req, res, next)
    }
]

const validateupdate = [
    check('identidad')
        .exists()
        .not()
        .isEmpty(),
    check('nombres')
        .exists()
        .not()
        .isEmpty(),
    check('apellidos')
        .exists()
        .not()
        .isEmpty(),
    check('edad')
        .exists()
        .not()
        .isEmpty(),
    check('grado')
        .exists()
        .not()
        .isEmpty(),
    check('seccion')
        .exists()
        .not()
        .isEmpty(),
    check('nombre_encargado')
        .exists()
        .not()
        .isEmpty(),
    check('telefono_encargado')
        .exists()
        .not()
        .isEmpty(),
     check('correo')
        .exists()
        .not()
        .isEmpty(),
    (req, res, next) =>{
        validateResult(req, res, next)
    }
]

const validatedelete = [
    check('id')
    .exists()
    .not()
    .isEmpty(),
    (req, res, next) =>{
        validateResult(req, res, next)
    }
]

module.exports = { validatebyId, validatenew, validateupdate, validatedelete  }