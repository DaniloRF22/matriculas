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
    check('hora')
        .exists()
        .not()
        .isEmpty()
        .isLength({max:7})
        .isLength({min:7}),
    (req, res, next) =>{
        validateResult(req, res, next)
    }
]

const validateupdate = [
    check('hora')
        .exists()
        .not()
        .isEmpty()
        .isLength({max:7})
        .isLength({min:7}),
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