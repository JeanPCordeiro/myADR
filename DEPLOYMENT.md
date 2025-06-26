# Guide de Déploiement - Application de Gestion des ADR

## Vue d'ensemble

Cette application suit une architecture serverless sur AWS avec un pipeline CI/CD automatisé via GitHub Actions.

## Architecture de Déploiement

### Backend (Serverless)
- **AWS Lambda** : Exécution du code Node.js
- **API Gateway** : Exposition des endpoints REST
- **DynamoDB** : Base de données NoSQL pour les ADR et utilisateurs
- **S3** : Stockage des fichiers ADR au format Markdown

### Frontend
- **S3** : Hébergement des fichiers statiques React
- **CloudFront** : CDN pour la distribution globale

## Prérequis

### Outils requis
- Node.js 20+
- AWS CLI configuré
- Serverless Framework
- pnpm (pour le frontend)

### Secrets GitHub Actions
Configurer les secrets suivants dans le repository GitHub :

```
AWS_ACCESS_KEY_ID=<votre-access-key>
AWS_SECRET_ACCESS_KEY=<votre-secret-key>
AWS_REGION=eu-west-1

# Staging
STAGING_S3_BUCKET=adr-management-frontend-staging
STAGING_CLOUDFRONT_ID=<distribution-id-staging>

# Production
PRODUCTION_S3_BUCKET=adr-management-frontend-production
PRODUCTION_CLOUDFRONT_ID=<distribution-id-production>
PRODUCTION_API_URL=https://api.adr-management.com
```

## Configuration des Environnements

### Staging (branche develop)
- **Backend** : `adr-management-backend-staging`
- **Frontend** : Bucket S3 staging
- **Base de données** : Tables DynamoDB avec suffixe `-staging`

### Production (branche main)
- **Backend** : `adr-management-backend-production`
- **Frontend** : Bucket S3 production
- **Base de données** : Tables DynamoDB avec suffixe `-production`

## Déploiement Manuel

### Backend

```bash
cd backend
npm install
npm install -g serverless

# Déploiement en staging
serverless deploy --stage staging

# Déploiement en production
serverless deploy --stage production
```

### Frontend

```bash
cd frontend
pnpm install
pnpm build

# Upload vers S3 (remplacer par le bon bucket)
aws s3 sync dist/ s3://adr-management-frontend-production --delete

# Invalidation CloudFront
aws cloudfront create-invalidation --distribution-id <DISTRIBUTION_ID> --paths "/*"
```

## Pipeline CI/CD

### Déclencheurs
- **Push sur develop** : Déploiement automatique en staging
- **Push sur main** : Déploiement automatique en production
- **Pull Request** : Tests uniquement

### Étapes du Pipeline

1. **Tests Backend**
   - Installation des dépendances
   - Exécution des tests unitaires
   - Vérification du linting

2. **Tests Frontend**
   - Installation des dépendances
   - Exécution des tests (si configurés)
   - Build de production

3. **Déploiement**
   - Configuration des credentials AWS
   - Déploiement du backend via Serverless
   - Build et upload du frontend vers S3
   - Invalidation du cache CloudFront

## Configuration AWS

### Permissions IAM
L'utilisateur de déploiement doit avoir les permissions suivantes :

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "lambda:*",
        "apigateway:*",
        "dynamodb:*",
        "s3:*",
        "cloudfront:*",
        "iam:*",
        "cloudformation:*"
      ],
      "Resource": "*"
    }
  ]
}
```

### Ressources créées automatiquement
- Tables DynamoDB pour les ADR et utilisateurs
- Bucket S3 pour le stockage des fichiers
- Fonctions Lambda pour l'API
- API Gateway pour l'exposition REST
- Rôles IAM pour les permissions

## Variables d'Environnement

### Backend
```bash
NODE_ENV=production
ADR_TABLE_NAME=adr-management-backend-production-adrs
USER_TABLE_NAME=adr-management-backend-production-users
S3_BUCKET_NAME=adr-management-backend-production-storage
```

### Frontend
```bash
VITE_API_URL=https://api.adr-management.com
```

## Monitoring et Logs

### CloudWatch
- Logs des fonctions Lambda
- Métriques de performance
- Alertes en cas d'erreur

### Surveillance recommandée
- Taux d'erreur des API
- Latence des requêtes
- Utilisation des ressources DynamoDB
- Coûts AWS

## Rollback

### Backend
```bash
# Lister les déploiements
serverless deploy list --stage production

# Rollback vers une version précédente
serverless rollback --timestamp <timestamp> --stage production
```

### Frontend
```bash
# Restaurer depuis une sauvegarde S3 ou redéployer une version précédente
git checkout <previous-commit>
cd frontend && pnpm build
aws s3 sync dist/ s3://adr-management-frontend-production --delete
```

## Sécurité

### Bonnes pratiques
- Rotation régulière des clés AWS
- Chiffrement des données sensibles
- Validation des entrées utilisateur
- Authentification et autorisation appropriées
- Audit des accès et modifications

### CORS
Le backend est configuré pour accepter les requêtes cross-origin du frontend uniquement.

## Support et Maintenance

### Logs d'erreur
- CloudWatch Logs pour le backend
- Console du navigateur pour le frontend

### Mise à jour des dépendances
- Vérification mensuelle des vulnérabilités
- Mise à jour des packages Node.js
- Tests de régression après mise à jour

## Contacts

- **Équipe DevOps** : devops@banque.com
- **Chapitre Architecture** : architecture@banque.com
- **Support Technique** : support-it@banque.com

