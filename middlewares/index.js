
const fieldsValidate = require('../middlewares/fields-validate');
const jwtValidate  = require('../middlewares/jwt-validate');
const rolValidate = require('../middlewares/rols-validate');

module.exports = {
    ...fieldsValidate,
    ...jwtValidate,
    ...rolValidate
}