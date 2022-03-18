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
        .isEmpty(),
    check('seccion')
        .exists()
        .not()
        .isEmpty(),
    (req, res, next) =>{
        validateResult(req, res, next)
    }
]

const validateupdate = [
    check('grado')
        .exists()
        .not()
        .isEmpty(),
    check('seccion')
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