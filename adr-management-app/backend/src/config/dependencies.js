// Configuration des dépendances pour l'architecture hexagonale
const DynamoDBAdapter = require('../adapters/database/DynamoDBAdapter');
const S3Adapter = require('../adapters/storage/S3Adapter');
const GitAdapter = require('../adapters/vcs/GitAdapter');

const ADRService = require('../domain/services/ADRService');
const UserService = require('../domain/services/UserService');

const ADRController = require('../controllers/ADRController');
const UserController = require('../controllers/UserController');

class DependencyContainer {
  constructor() {
    this._initializeAdapters();
    this._initializeServices();
    this._initializeControllers();
  }

  _initializeAdapters() {
    // Adaptateurs (ports secondaires)
    this.dbAdapter = new DynamoDBAdapter();
    this.storageAdapter = new S3Adapter();
    this.vcsAdapter = new GitAdapter();
  }

  _initializeServices() {
    // Services du domaine
    this.adrService = new ADRService(
      this.dbAdapter,
      this.storageAdapter,
      this.vcsAdapter
    );
    
    this.userService = new UserService(this.dbAdapter);
  }

  _initializeControllers() {
    // Contrôleurs (ports primaires)
    this.adrController = new ADRController(this.adrService, this.userService);
    this.userController = new UserController(this.userService);
  }

  getADRController() {
    return this.adrController;
  }

  getUserController() {
    return this.userController;
  }

  getADRService() {
    return this.adrService;
  }

  getUserService() {
    return this.userService;
  }
}

module.exports = DependencyContainer;

