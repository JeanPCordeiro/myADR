const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');

class UserService {
  constructor(dbAdapter) {
    this.dbAdapter = dbAdapter;
  }

  async createUser(userData) {
    const user = new User({
      id: uuidv4(),
      ...userData
    });

    const validationErrors = user.validate();
    if (validationErrors.length > 0) {
      throw new Error(validationErrors.join(' '));
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await this.dbAdapter.getUserByEmail(user.email);
    if (existingUser) {
      throw new Error('Un utilisateur avec cet email existe déjà.');
    }

    await this.dbAdapter.saveUser(user);
    return user;
  }

  async getUserById(id) {
    const user = await this.dbAdapter.getUserById(id);
    if (!user) {
      throw new Error('Utilisateur non trouvé.');
    }
    return user;
  }

  async getUserByEmail(email) {
    const user = await this.dbAdapter.getUserByEmail(email);
    if (!user) {
      throw new Error('Utilisateur non trouvé.');
    }
    return user;
  }

  async getAllUsers() {
    return await this.dbAdapter.getAllUsers();
  }

  async updateUser(id, updateData) {
    const existingUser = await this.getUserById(id);
    
    const updatedUser = new User({
      ...existingUser,
      ...updateData,
      id,
      updatedAt: new Date()
    });

    const validationErrors = updatedUser.validate();
    if (validationErrors.length > 0) {
      throw new Error(validationErrors.join(' '));
    }

    await this.dbAdapter.updateUser(id, updatedUser);
    return updatedUser;
  }

  async deleteUser(id) {
    const user = await this.getUserById(id);
    await this.dbAdapter.deleteUser(id);
    return true;
  }

  async authenticateUser(email, password) {
    // Pour cette démo, nous simulons l'authentification
    // Dans un vrai projet, il faudrait vérifier le mot de passe hashé
    const user = await this.getUserByEmail(email);
    return user;
  }
}

module.exports = UserService;

