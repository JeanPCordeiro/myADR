const express = require('express');
const router = express.Router();

function createADRRoutes(adrController) {
  // Créer un nouvel ADR
  router.post('/', (req, res) => adrController.createADR(req, res));

  // Obtenir tous les ADR (avec filtres optionnels)
  router.get('/', (req, res) => adrController.getAllADRs(req, res));

  // Obtenir un ADR spécifique
  router.get('/:id', (req, res) => adrController.getADR(req, res));

  // Mettre à jour un ADR
  router.put('/:id', (req, res) => adrController.updateADR(req, res));

  // Approuver un ADR
  router.post('/:id/approve', (req, res) => adrController.approveADR(req, res));

  // Rejeter un ADR
  router.post('/:id/reject', (req, res) => adrController.rejectADR(req, res));

  // Supprimer un ADR
  router.delete('/:id', (req, res) => adrController.deleteADR(req, res));

  return router;
}

module.exports = createADRRoutes;

