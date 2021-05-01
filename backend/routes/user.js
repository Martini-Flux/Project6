const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');


router.post('/signup', userCtrl.signup); // Création de compte.
router.post('/login', userCtrl.login); // Connexion au compte.

module.exports = router;
