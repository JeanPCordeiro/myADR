const App = require('./app');

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    const app = new App();
    await app.start(PORT);
  } catch (error) {
    console.error('Erreur lors du démarrage du serveur:', error);
    process.exit(1);
  }
}

// Gestion gracieuse de l'arrêt
process.on('SIGTERM', () => {
  console.log('Signal SIGTERM reçu, arrêt du serveur...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('Signal SIGINT reçu, arrêt du serveur...');
  process.exit(0);
});

startServer();

