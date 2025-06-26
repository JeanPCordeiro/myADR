const serverless = require('serverless-http');
const App = require('./app');

// Créer l'instance de l'application
const app = new App();
const expressApp = app.getExpressApp();

// Exporter le handler pour AWS Lambda
module.exports.handler = serverless(expressApp);

