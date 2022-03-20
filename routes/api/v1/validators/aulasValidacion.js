const { check } = require("express-validator");
const { validateResult } = require("./validateHerper");

const validatenew = [
    check('numero')
    .exists()
    .not()
    .isEmpty()
    .isNumeric()
    .isLength({max:1})
    .isLength({min:1}),
    (req, res, next) =>{
        validateResult(req, res, next)
    }
]

const validateupdate = [
    check('numero')
    .exists()
    .not()
    .isEmpty()
    .isNumeric()
    .isLength({max:1})
    .isLength({min:1}),
    (req, res, next) =>{
        validateResult(req, res, next)
    }
]

module.exports = {validatenew, validateupdate}