const { check } = require("express-validator");
const { validateResult } = require("./validateHerper");

const validatenew = [
    check('numero')
    .isEmpty()
    .isNumeric(),
    (req, res, next) =>{
        validateResult(req, res, next)
    }
]

const validateupdate = [
    check('numero')
    .exists()
    .isEmpty()
    .isNumeric()
    .isLength({max:2}),
    (req, res, next) =>{
        validateResult(req, res, next)
    }
]

module.exports = {validatenew, validateupdate}