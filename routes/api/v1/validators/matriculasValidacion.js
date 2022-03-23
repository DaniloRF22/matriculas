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
    check('identidad_alumno')
        .exists()
        .not()
        .isEmpty()
        .isNumeric()
        .isLength({max: 13})
        .isLength({min: 13}),
    check('nombre_alumno')
        .exists()
        .not()
        .isEmpty(),
    check('grado')
        .exists()
        .not()
        .isEmpty()
        .isNumeric()
        .isLength({max: 1})
        .isLength({min: 1}),
    check('seccion')
        .exists()
        .not()
        .isEmpty()
        .isAlpha()
        .isLength({max: 1})
        .isLength({min: 1}),
    check('jornada')
        .exists()
        .not()
        .isEmpty()
        .isAlpha()
        .isLength({max: 10}),
     check('horario')
        .exists()
        .not()
        .isEmpty()
        .isLength({max:7})
        .isLength({min:7}),
     check('aula')
        .exists()
        .not()
        .isEmpty()
        .isNumeric()
        .isLength({max:1})
        .isLength({min:1}),
     check('nombre_maestro')
        .exists()
        .not()
        .isEmpty()
        .isAlpha(),
    (req, res, next) =>{
        validateResult(req, res, next)
    }
]

const validateupdate = [
    check('identidad_alumno')
    .exists()
    .not()
    .isEmpty()
    .isNumeric()
    .isLength({max: 13})
    .isLength({min: 13}),
check('nombre_alumno')
    .exists()
    .not()
    .isEmpty(),
check('grado')
    .exists()
    .not()
    .isEmpty()
    .isNumeric()
    .isLength({max: 1})
    .isLength({min: 1}),
check('seccion')
    .exists()
    .not()
    .isEmpty()
    .isAlpha()
    .isLength({max: 1})
    .isLength({min: 1}),
check('jornada')
    .exists()
    .not()
    .isEmpty()
    .isAlpha()
    .isLength({max: 10}),
 check('horario')
    .exists()
    .not()
    .isEmpty()
    .isLength({max:7})
    .isLength({min:7}),
 check('aula')
    .exists()
    .not()
    .isEmpty()
    .isNumeric()
    .isLength({max:1})
    .isLength({min:1}),
 check('nombre_maestro')
    .exists()
    .not()
    .isEmpty()
    .isAlpha(),
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