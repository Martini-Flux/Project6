const passwordValidator = require('password-validator');

const validPassword = new passwordValidator();

validPassword
.is()
.min(6)
.max(30)
.has()
.lowercase()
.uppercase()
.digits()
.symbols()

module.exports = validPassword;
