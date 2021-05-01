const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const passwordValidator = require('../middleware/password-validator');

// Création d'un nouvel utilisateur

exports.signup = (req, res) => {
  if (passwordValidator.validate(req.body.password)) { // Si le mot de passe est validé.
  bcrypt.hash(req.body.password, 10) // Crypte le mot de passe.
  .then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user.save() // Sauvegarde l'utilisateur dans la base de donnée.
      .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
      .catch(error => res.status(400).json({ message: 'Utilisateur déjà existant' }));
  })
  .catch(error => res.status(500).json({ error }));
} else { // Si le mot de passe n'est pas validé.
  res.status(400).json({ message: "Votre mot de passe doit contenir entre 6 et 30 caractères et comporter au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial." });
  }
};

// Connexion d'un utilisateur

exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
  .then(user => {
    if (!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    }
    bcrypt.compare(req.body.password, user.password)
      .then(valid => {
        if (!valid) {
          return res.status(401).json({ error: 'Mot de passe incorrect !' });
        }
        res.status(200).json({
          userId: user._id,
          token: jwt.sign(
            { userId: user._id },
            'RANDOM_TOKEN_SECRET',
            {expiresIn: '24h'}
          ),
        });
    })
      .catch(error => res.status(500).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
};
