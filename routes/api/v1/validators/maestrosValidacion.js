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
        .isEmpty()
        .isAlpha(),

    check('apellidos')
        .exists()
        .not()
        .isEmpty()
        .isAlpha(),
    check('email')
        .exists()
        .not()
        .isEmpty()
        .isEmail(),
    check('telefono')
        .exists()
        .not()
        .isEmpty()
        .isNumeric()
        .isLength({max: 8})
        .isLength({min: 8}),
    check('direccion')
        .exists()
        .not()
        .isEmpty(),
       
     
    check('materias')
        .exists()
        .not()
        .isEmpty(),
    check('grados')
        .exists()
        .not()
        .isEmpty()
        .isNumeric()
        .isLength({max: 1})
        .isLength({min: 1}),
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
        .isEmpty()
        .isAlpha(),

    check('apellidos')
        .exists()
        .not()
        .isEmpty()
        .isAlpha(),
    check('email')
        .exists()
        .not()
        .isEmpty()
        .isEmail(),
    check('telefono')
        .exists()
        .not()
        .isEmpty()
        .isNumeric()
        .isLength({max: 8})
        .isLength({min: 8}),
    check('direccion')
        .exists()
        .not()
        .isEmpty(),
       
     
    check('materias')
        .exists()
        .not()
        .isEmpty(),
    check('grados')
        .exists()
        .not()
        .isEmpty()
        .isNumeric()
        .isLength({max: 1})
        .isLength({min: 1}),
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