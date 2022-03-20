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
        .isEmpty()
        .isNumeric()
        .isLength({max: 13})
        .isLength({min: 13}),
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
        .isEmpty()
        .isNumeric()
        .isLength({max: 2})
        .isLength({min: 2}),
    check('grado')
        .exists()
        .not()
        .isEmpty()
        .isNumeric()
        .isLength({max: 2})
        .isLength({min: 2}),
    check('seccion')
        .exists()
        .not()
        .isEmpty()
        .isNumeric()
        .isLength({max: 1})
        .isLength({min: 1}),
    check('nombre_encargado')
        .exists()
        .not()
        .isEmpty(),
    check('telefono_encargado')
        .exists()
        .not()
        .isEmpty()
        .isNumeric()
        .isLength({max: 8})
        .isLength({min: 8}),
     check('correo')
        .exists()
        .not()
        .isEmpty()
        .isEmail(),
    (req, res, next) =>{
        validateResult(req, res, next)
    }
]

const validateupdate = [
    check('identidad')
    .exists()
    .not()
    .isEmpty()
    .isNumeric()
    .isLength({max: 13})
    .isLength({min: 13}),
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
    .isEmpty()
    .isNumeric()
    .isLength({max: 2})
    .isLength({min: 2}),
check('grado')
    .exists()
    .not()
    .isEmpty()
    .isNumeric()
    .isLength({max: 2})
    .isLength({min: 2}),
check('seccion')
    .exists()
    .not()
    .isEmpty()
    .isNumeric()
    .isLength({max: 1})
    .isLength({min: 1}),
check('nombre_encargado')
    .exists()
    .not()
    .isEmpty(),
check('telefono_encargado')
    .exists()
    .not()
    .isEmpty()
    .isNumeric()
    .isLength({max: 8})
    .isLength({min: 8}),
 check('correo')
    .exists()
    .not()
    .isEmpty()
    .isEmail(),
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