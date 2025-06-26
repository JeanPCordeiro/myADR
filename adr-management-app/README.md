# Application de Gestion des ADR (Architecture Decision Records)

## Vue d'ensemble

Cette application permet de gérer les Architecture Decision Records (ADR) selon le format MADR (Markdown Architectural Decision Records) pour une organisation bancaire. Elle respecte les principes de développement modernes et s'intègre dans une architecture agile organisée en squads, tribus et pôles produits.

## Fonctionnalités

### Gestion des ADR
- ✅ Création d'ADR au format MADR
- ✅ Consultation et recherche d'ADR
- ✅ Modification et mise à jour d'ADR
- ✅ Workflow d'approbation/rejet
- ✅ Historique et versioning
- ✅ Export au format Markdown

### Gestion des utilisateurs
- ✅ Authentification et autorisation
- ✅ Rôles et permissions (Lecteur, Contributeur, Approbateur, Admin)
- ✅ Gestion des profils utilisateur

### Intégrations
- ✅ Stockage des fichiers sur S3
- ✅ Versioning Git automatique
- ✅ API REST complète

## Architecture

### Principes de développement respectés
1. **ADR en syntaxe MADR** : Toutes les décisions architecturales documentées
2. **Modélisation C4** : Architecture documentée avec diagrammes C4-PlantUML
3. **Test First** : BDD puis TDD avec Jest
4. **Architecture hexagonale** : Séparation claire des couches métier et infrastructure
5. **CI/CD** : Pipeline automatisé avec GitHub Actions
6. **AWS Serverless** : Déploiement sur Lambda, S3, DynamoDB
7. **Node.js** : Stack technique moderne

### Structure du projet

```
adr-management-app/
├── backend/                 # API Node.js avec architecture hexagonale
│   ├── src/
│   │   ├── domain/         # Logique métier (services, modèles)
│   │   ├── adapters/       # Adaptateurs (DB, Storage, VCS)
│   │   ├── controllers/    # Contrôleurs REST
│   │   └── config/         # Configuration et injection de dépendances
│   ├── tests/              # Tests unitaires et d'intégration
│   └── serverless.yml     # Configuration AWS Serverless
├── frontend/               # Interface React
│   ├── src/
│   │   ├── components/     # Composants React
│   │   ├── hooks/          # Hooks personnalisés
│   │   └── lib/           # Utilitaires et API client
├── ADR/                    # Architecture Decision Records
├── c4_model/              # Diagrammes d'architecture C4
├── features/              # Spécifications BDD (Gherkin)
└── .github/workflows/     # Pipeline CI/CD
```

## Technologies utilisées

### Backend
- **Node.js 20** : Runtime JavaScript
- **Express.js** : Framework web
- **AWS Lambda** : Exécution serverless
- **DynamoDB** : Base de données NoSQL
- **S3** : Stockage de fichiers
- **Jest** : Tests unitaires

### Frontend
- **React 19** : Framework UI
- **Vite** : Build tool moderne
- **Tailwind CSS** : Framework CSS
- **React Query** : Gestion d'état et cache
- **React Router** : Navigation

### DevOps
- **GitHub Actions** : CI/CD
- **Serverless Framework** : Déploiement AWS
- **AWS CloudFormation** : Infrastructure as Code

## Installation et développement

### Prérequis
- Node.js 20+
- pnpm (pour le frontend)
- AWS CLI (pour le déploiement)

### Installation

```bash
# Cloner le repository
git clone <repository-url>
cd adr-management-app

# Backend
cd backend
npm install

# Frontend
cd ../frontend
pnpm install
```

### Développement local

```bash
# Démarrer le backend (port 3000)
cd backend
npm run dev

# Démarrer le frontend (port 5173)
cd frontend
pnpm run dev
```

### Tests

```bash
# Tests backend
cd backend
npm test

# Tests frontend
cd frontend
pnpm test
```

## Déploiement

Voir le fichier [DEPLOYMENT.md](./DEPLOYMENT.md) pour les instructions détaillées de déploiement.

### Environnements
- **Staging** : Déploiement automatique sur push vers `develop`
- **Production** : Déploiement automatique sur push vers `main`

## Documentation

### Architecture Decision Records
Consultez le dossier [ADR/](./ADR/) pour toutes les décisions architecturales documentées au format MADR.

### Modélisation C4
Les diagrammes d'architecture sont disponibles dans [c4_model/](./c4_model/).

### Spécifications BDD
Les fonctionnalités sont spécifiées en Gherkin dans [features/](./features/).

## Contribution

### Workflow de développement
1. Créer une branche feature depuis `develop`
2. Développer en suivant les principes TDD/BDD
3. Créer une Pull Request vers `develop`
4. Tests automatiques et review
5. Merge vers `develop` puis `main` pour la production

### Standards de code
- **ESLint** : Linting JavaScript
- **Prettier** : Formatage de code
- **Conventional Commits** : Format des messages de commit
- **Tests obligatoires** : Couverture minimale de 80%

## Support

### Contacts
- **Équipe de développement** : squad-adr@banque.com
- **Chapitre Architecture** : architecture@banque.com
- **Support technique** : support-it@banque.com

### Issues et bugs
Utiliser le système d'issues GitHub pour reporter les bugs et demander des fonctionnalités.

## Licence

Propriété de la banque - Usage interne uniquement.

## Changelog

Voir [CHANGELOG.md](./CHANGELOG.md) pour l'historique des versions et modifications.

