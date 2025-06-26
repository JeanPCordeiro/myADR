const express = require('express');
const router = express.Router();

function createUserRoutes(userController) {
  // Connexion
  router.post('/login', (req, res) => userController.login(req, res));

  // Obtenir l'utilisateur actuel
  router.get('/me', (req, res) => userController.getCurrentUser(req, res));

  // Créer un nouvel utilisateur
  router.post('/', (req, res) => userController.createUser(req, res));

  // Obtenir tous les utilisateurs
  router.get('/', (req, res) => userController.getAllUsers(req, res));

  // Obtenir un utilisateur spécifique
  router.get('/:id', (req, res) => userController.getUser(req, res));

  // Mettre à jour un utilisateur
  router.put('/:id', (req, res) => userController.updateUser(req, res));

  // Supprimer un utilisateur
  router.delete('/:id', (req, res) => userController.deleteUser(req, res));

  return router;
}

module.exports = createUserRoutes;

