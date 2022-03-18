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
    check('tipojornada')
        .exists()
        .not()
        .isEmpty(),
    (req, res, next) =>{
        validateResult(req, res, next)
    }
]

const validateupdate = [
    check('tipojornada')
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