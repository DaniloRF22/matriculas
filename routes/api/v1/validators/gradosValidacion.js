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
        .isAlpha(),
    (req, res, next) =>{
        validateResult(req, res, next)
    }
]

const validateupdate = [
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