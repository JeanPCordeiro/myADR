# Guide d'Utilisation - Application de Gestion des ADR

## Introduction

L'application de gestion des ADR (Architecture Decision Records) permet aux équipes de documenter, suivre et approuver les décisions architecturales selon le format MADR (Markdown Architectural Decision Records).

## Accès à l'application

### URL d'accès
- **Production** : https://adr.banque.com
- **Staging** : https://staging-adr.banque.com

### Authentification
L'accès à l'application nécessite une authentification avec vos identifiants d'entreprise.

## Rôles et permissions

### Lecteur ADR
- ✅ Consulter tous les ADR
- ✅ Rechercher et filtrer les ADR
- ❌ Créer ou modifier des ADR

### Contributeur ADR
- ✅ Toutes les permissions du Lecteur
- ✅ Créer de nouveaux ADR
- ✅ Modifier ses propres ADR
- ❌ Approuver ou rejeter des ADR

### Approbateur ADR
- ✅ Toutes les permissions du Contributeur
- ✅ Approuver ou rejeter des ADR
- ✅ Modifier tous les ADR
- ❌ Gérer les utilisateurs

### Administrateur
- ✅ Toutes les permissions
- ✅ Gérer les utilisateurs et leurs rôles
- ✅ Accès aux fonctions d'administration

## Fonctionnalités principales

### 1. Consultation des ADR

#### Page d'accueil
La page d'accueil affiche la liste de tous les ADR avec :
- Titre et description courte
- Statut (Proposé, Accepté, Rejeté, Obsolète)
- Dates de création et modification
- Auteur

#### Filtres et recherche
- **Recherche textuelle** : Rechercher dans les titres et descriptions
- **Filtre par statut** : Afficher uniquement les ADR d'un statut donné
- **Tri** : Par date de création, modification ou titre

#### Détail d'un ADR
Cliquer sur un ADR pour voir :
- Informations complètes au format MADR
- Contexte et justification
- Décision prise
- Conséquences positives et négatives
- Alternatives considérées
- Historique des modifications

### 2. Création d'un ADR

#### Étapes de création
1. Cliquer sur "Nouvel ADR" depuis la page d'accueil
2. Remplir le formulaire :
   - **Titre** (obligatoire) : Titre descriptif de la décision
   - **Contexte** : Situation qui a mené à cette décision
   - **Décision** (obligatoire) : Description de la décision prise
   - **Conséquences positives** : Avantages attendus
   - **Conséquences négatives** : Inconvénients ou risques
   - **Alternatives considérées** : Autres options évaluées
3. Cliquer sur "Sauvegarder"

#### Statut initial
Tous les nouveaux ADR sont créés avec le statut "Proposé" et nécessitent une approbation.

### 3. Modification d'un ADR

#### Qui peut modifier
- **Contributeurs** : Leurs propres ADR uniquement
- **Approbateurs et Administrateurs** : Tous les ADR

#### Processus de modification
1. Ouvrir l'ADR à modifier
2. Cliquer sur "Modifier"
3. Apporter les modifications nécessaires
4. Sauvegarder les changements

#### Versioning
Toutes les modifications sont automatiquement versionnées et sauvegardées.

### 4. Workflow d'approbation

#### Approbation d'un ADR
1. Ouvrir un ADR au statut "Proposé"
2. Examiner le contenu
3. Cliquer sur "Approuver" ou "Rejeter"
4. Le statut change automatiquement

#### Statuts possibles
- **Proposé** : ADR créé, en attente d'approbation
- **Accepté** : ADR approuvé et applicable
- **Rejeté** : ADR refusé avec justification
- **Obsolète** : ADR remplacé par une nouvelle décision

### 5. Recherche avancée

#### Critères de recherche
- **Texte libre** : Recherche dans tous les champs
- **Statut** : Filtrer par statut spécifique
- **Auteur** : Rechercher par créateur
- **Date** : Filtrer par période de création

#### Conseils de recherche
- Utiliser des mots-clés spécifiques
- Combiner plusieurs filtres pour affiner les résultats
- Utiliser les guillemets pour rechercher une expression exacte

## Bonnes pratiques

### Rédaction d'un ADR

#### Titre
- Utiliser un titre clair et descriptif
- Commencer par un verbe d'action (ex: "Adopter", "Utiliser", "Migrer vers")
- Éviter les acronymes sans explication

#### Contexte
- Expliquer la situation actuelle
- Décrire les contraintes et exigences
- Mentionner les parties prenantes impliquées

#### Décision
- Être précis et sans ambiguïté
- Expliquer le "quoi" et le "pourquoi"
- Inclure les détails d'implémentation si nécessaire

#### Conséquences
- Lister objectivement les avantages et inconvénients
- Considérer l'impact à court et long terme
- Mentionner les risques et leur mitigation

### Workflow organisationnel

#### Avant de créer un ADR
1. Discuter avec l'équipe et les parties prenantes
2. Évaluer les alternatives disponibles
3. Consulter les ADR existants pour éviter les doublons

#### Processus d'approbation
1. Révision par les pairs de l'équipe
2. Validation par le chapitre architecture
3. Approbation finale par un approbateur désigné

#### Après approbation
1. Communiquer la décision aux équipes concernées
2. Mettre à jour la documentation technique
3. Planifier l'implémentation si nécessaire

## Intégrations

### Git
- Tous les ADR sont automatiquement sauvegardés dans Git
- Chaque modification crée un commit avec l'historique
- Possibilité de consulter l'historique complet

### Export
- Export individuel au format Markdown
- Génération automatique de rapports
- Intégration avec les outils de documentation

## Support et assistance

### Problèmes techniques
- **Support IT** : support-it@banque.com
- **Documentation** : Consulter le README du projet
- **Issues** : Utiliser le système de tickets interne

### Questions fonctionnelles
- **Chapitre Architecture** : architecture@banque.com
- **Formation** : Demander une session de formation à votre manager
- **Bonnes pratiques** : Consulter les ADR existants comme exemples

### Amélirations et suggestions
- Utiliser le système de feedback intégré
- Contacter l'équipe produit : squad-adr@banque.com
- Participer aux sessions de retour utilisateur

## FAQ

### Comment retrouver un ADR spécifique ?
Utilisez la fonction de recherche avec des mots-clés du titre ou de la technologie concernée.

### Puis-je modifier un ADR déjà approuvé ?
Oui, mais cela nécessite une nouvelle approbation et peut impacter les équipes qui l'appliquent.

### Que faire si je ne suis pas d'accord avec une décision ?
Contactez l'auteur ou le chapitre architecture pour discuter. Vous pouvez proposer un nouvel ADR si nécessaire.

### Comment savoir quels ADR s'appliquent à mon projet ?
Consultez les ADR par domaine fonctionnel ou technologique, et filtrez par statut "Accepté".

### Puis-je créer un ADR pour annuler une décision précédente ?
Oui, créez un nouvel ADR qui référence l'ancien et explique pourquoi la décision change.

## Raccourcis clavier

- **Ctrl + K** : Ouvrir la recherche rapide
- **Ctrl + N** : Créer un nouvel ADR
- **Ctrl + S** : Sauvegarder (en mode édition)
- **Échap** : Fermer les modales et formulaires

## Mise à jour de ce guide

Ce guide est mis à jour régulièrement. Consultez la version en ligne pour les dernières informations.

**Dernière mise à jour** : 26 juin 2025
**Version de l'application** : 1.0.0

