const { check, validationResult } = require('express-validator')

const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (err) {
        res.status(403)
        res.send({ errors: err.array() })
    }
}


const validacionesInputs = [
    check('email')
    .exists()
    .not()
    .isEmpty()
    .isEmail(),
    check('usuario')
    .exists()
    .not()
    .isEmpty()
    .isAlphanumeric(),
    check('password')
    .exists()
    .not()
    .isEmpty()
    .isAlphanumeric(),
 

    (req, res, next) => {
       validateResult(req, res, next)
    }
 ]

const validacionLogin = [
    check('usuario')
    .exists()
    .not()
    .isEmpty()
    .isAlphanumeric(),
    check('password')
    .exists()
    .not()
    .isEmpty()
    .isAlphanumeric(),

    (req, res, next) => {
        validateResult(req, res, next)
     }
]


 module.exports = { validacionesInputs, validacionLogin }