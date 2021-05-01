const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');
const sauceCtrl = require('../controllers/sauce');

const router = express.Router();

// Gestion des routes

router.post('/', auth, multer, sauceCtrl.createSauce); // Crée une nouvelle sauce.
router.put('/:id', auth, multer, sauceCtrl.modifySauce); // Récupère toutes les sauces.
router.delete('/:id', auth, sauceCtrl.deleteSauce); // Récupère une sauce.
router.get('/:id', auth, sauceCtrl.getOneSauce); // Modifie une sauce.
router.get('/', auth, sauceCtrl.getAllSauces); // Supprime la sauce.
router.post('/:id/like', auth, sauceCtrl.likeSauce); // Like/Dislike de la sauce.

module.exports = router;
