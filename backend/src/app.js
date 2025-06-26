const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const DependencyContainer = require('./config/dependencies');
const createADRRoutes = require('./routes/adrRoutes');
const createUserRoutes = require('./routes/userRoutes');

class App {
  constructor() {
    this.app = express();
    this.dependencies = new DependencyContainer();
    
    this._setupMiddleware();
    this._setupRoutes();
    this._setupErrorHandling();
  }

  _setupMiddleware() {
    // Sécurité
    this.app.use(helmet());
    
    // CORS - Permettre toutes les origines pour la démo
    this.app.use(cors({
      origin: true,
      credentials: true
    }));
    
    // Logging
    this.app.use(morgan('combined'));
    
    // Parsing JSON
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true }));
    
    // Middleware d'authentification simple pour la démo
    this.app.use((req, res, next) => {
      // Dans un vrai projet, on vérifierait le JWT ici
      // Pour la démo, on simule un utilisateur connecté
      req.user = { id: 'user-1' }; // Contributeur par défaut
      next();
    });
  }

  _setupRoutes() {
    // Route de santé
    this.app.get('/health', (req, res) => {
      res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        service: 'ADR Management API'
      });
    });

    // Routes API
    this.app.use('/api/adrs', createADRRoutes(this.dependencies.getADRController()));
    this.app.use('/api/users', createUserRoutes(this.dependencies.getUserController()));

    // Route par défaut
    this.app.get('/', (req, res) => {
      res.json({
        message: 'API de Gestion des ADR',
        version: '1.0.0',
        endpoints: {
          health: '/health',
          adrs: '/api/adrs',
          users: '/api/users'
        }
      });
    });
  }

  _setupErrorHandling() {
    // Gestion des routes non trouvées
    this.app.use((req, res, next) => {
      res.status(404).json({
        error: 'Route non trouvée',
        path: req.originalUrl
      });
    });

    // Gestion globale des erreurs
    this.app.use((error, req, res, next) => {
      console.error('Erreur non gérée:', error);
      
      res.status(500).json({
        error: 'Erreur interne du serveur',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Une erreur est survenue'
      });
    });
  }

  getExpressApp() {
    return this.app;
  }

  start(port = 3000) {
    return new Promise((resolve) => {
      const server = this.app.listen(port, '0.0.0.0', () => {
        console.log(`🚀 Serveur ADR Management API démarré sur le port ${port}`);
        console.log(`📖 Documentation API disponible sur http://localhost:${port}`);
        resolve(server);
      });
    });
  }
}

module.exports = App;

