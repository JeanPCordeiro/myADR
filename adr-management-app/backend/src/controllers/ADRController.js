const ADR = require('../domain/models/ADR');

class ADRController {
  constructor(adrService, userService) {
    this.adrService = adrService;
    this.userService = userService;
  }

  async createADR(req, res) {
    try {
      const userId = req.user?.id || 'user-1'; // Utilisateur par défaut pour la démo
      const user = await this.userService.getUserById(userId);
      
      if (!user.canCreateADR()) {
        return res.status(403).json({ 
          error: 'Vous n\'avez pas les permissions pour créer un ADR.' 
        });
      }

      const adr = await this.adrService.createADR(req.body, userId);
      res.status(201).json({ 
        message: 'ADR créé avec succès.',
        adr 
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getADR(req, res) {
    try {
      const { id } = req.params;
      const adr = await this.adrService.getADRById(id);
      res.json(adr);
    } catch (error) {
      if (error.message === 'ADR non trouvé.') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async getAllADRs(req, res) {
    try {
      const filters = {
        status: req.query.status,
        productId: req.query.productId,
        solutionId: req.query.solutionId
      };
      
      // Supprimer les filtres vides
      Object.keys(filters).forEach(key => {
        if (!filters[key]) delete filters[key];
      });

      const adrs = await this.adrService.getAllADRs(filters);
      res.json(adrs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateADR(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user?.id || 'user-1'; // Utilisateur par défaut pour la démo
      const user = await this.userService.getUserById(userId);
      
      if (!user.canCreateADR()) {
        return res.status(403).json({ 
          error: 'Vous n\'avez pas les permissions pour modifier un ADR.' 
        });
      }

      const adr = await this.adrService.updateADR(id, req.body, userId);
      res.json({ 
        message: 'ADR mis à jour avec succès.',
        adr 
      });
    } catch (error) {
      if (error.message === 'ADR non trouvé.') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(400).json({ error: error.message });
      }
    }
  }

  async approveADR(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user?.id || 'user-2'; // Approbateur par défaut pour la démo
      const user = await this.userService.getUserById(userId);
      
      if (!user.canApproveADR()) {
        return res.status(403).json({ 
          error: 'Vous n\'avez pas les permissions pour approuver un ADR.' 
        });
      }

      const adr = await this.adrService.updateADRStatus(id, ADR.STATUSES.ACCEPTED, userId);
      res.json({ 
        message: 'ADR approuvé avec succès.',
        adr 
      });
    } catch (error) {
      if (error.message === 'ADR non trouvé.') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(400).json({ error: error.message });
      }
    }
  }

  async rejectADR(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user?.id || 'user-2'; // Approbateur par défaut pour la démo
      const user = await this.userService.getUserById(userId);
      
      if (!user.canApproveADR()) {
        return res.status(403).json({ 
          error: 'Vous n\'avez pas les permissions pour rejeter un ADR.' 
        });
      }

      const adr = await this.adrService.updateADRStatus(id, ADR.STATUSES.REJECTED, userId);
      res.json({ 
        message: 'ADR rejeté avec succès.',
        adr 
      });
    } catch (error) {
      if (error.message === 'ADR non trouvé.') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(400).json({ error: error.message });
      }
    }
  }

  async deleteADR(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user?.id || 'user-1'; // Utilisateur par défaut pour la démo
      const user = await this.userService.getUserById(userId);
      
      if (!user.canAdministrate()) {
        return res.status(403).json({ 
          error: 'Vous n\'avez pas les permissions pour supprimer un ADR.' 
        });
      }

      await this.adrService.deleteADR(id);
      res.json({ message: 'ADR supprimé avec succès.' });
    } catch (error) {
      if (error.message === 'ADR non trouvé.') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }
}

module.exports = ADRController;

