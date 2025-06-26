class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async createUser(req, res) {
    try {
      const currentUserId = req.user?.id || 'user-1';
      const currentUser = await this.userService.getUserById(currentUserId);
      
      if (!currentUser.canAdministrate()) {
        return res.status(403).json({ 
          error: 'Vous n\'avez pas les permissions pour créer un utilisateur.' 
        });
      }

      const user = await this.userService.createUser(req.body);
      res.status(201).json({ 
        message: 'Utilisateur créé avec succès.',
        user 
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getUser(req, res) {
    try {
      const { id } = req.params;
      const user = await this.userService.getUserById(id);
      res.json(user);
    } catch (error) {
      if (error.message === 'Utilisateur non trouvé.') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async getAllUsers(req, res) {
    try {
      const currentUserId = req.user?.id || 'user-1';
      const currentUser = await this.userService.getUserById(currentUserId);
      
      if (!currentUser.canAdministrate()) {
        return res.status(403).json({ 
          error: 'Vous n\'avez pas les permissions pour lister les utilisateurs.' 
        });
      }

      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const currentUserId = req.user?.id || 'user-1';
      const currentUser = await this.userService.getUserById(currentUserId);
      
      // Un utilisateur peut modifier ses propres informations ou un admin peut modifier n'importe qui
      if (currentUserId !== id && !currentUser.canAdministrate()) {
        return res.status(403).json({ 
          error: 'Vous n\'avez pas les permissions pour modifier cet utilisateur.' 
        });
      }

      const user = await this.userService.updateUser(id, req.body);
      res.json({ 
        message: 'Utilisateur mis à jour avec succès.',
        user 
      });
    } catch (error) {
      if (error.message === 'Utilisateur non trouvé.') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(400).json({ error: error.message });
      }
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const currentUserId = req.user?.id || 'user-1';
      const currentUser = await this.userService.getUserById(currentUserId);
      
      if (!currentUser.canAdministrate()) {
        return res.status(403).json({ 
          error: 'Vous n\'avez pas les permissions pour supprimer un utilisateur.' 
        });
      }

      await this.userService.deleteUser(id);
      res.json({ message: 'Utilisateur supprimé avec succès.' });
    } catch (error) {
      if (error.message === 'Utilisateur non trouvé.') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      
      if (!email) {
        return res.status(400).json({ error: 'L\'email est obligatoire.' });
      }

      const user = await this.userService.authenticateUser(email, password);
      
      // Dans un vrai projet, on générerait un JWT ici
      res.json({ 
        message: 'Connexion réussie.',
        user,
        token: 'demo-token' // Token de démo
      });
    } catch (error) {
      res.status(401).json({ error: 'Identifiants invalides.' });
    }
  }

  async getCurrentUser(req, res) {
    try {
      const userId = req.user?.id || 'user-1'; // Utilisateur par défaut pour la démo
      const user = await this.userService.getUserById(userId);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = UserController;

