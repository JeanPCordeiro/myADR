# 1. Choix de la technologie backend : Node.js

## Statut
Accepté

## Contexte
Le projet nécessite un backend pour gérer les opérations CRUD sur les ADR, l'authentification, et l'intégration avec les services AWS (DynamoDB, S3) et le système de gestion de versions (Git).

Les principes de développement de l'entreprise incluent l'utilisation de NodeJS comme langage de prédilection.

## Décision
Nous avons décidé d'utiliser Node.js comme technologie principale pour le développement du backend.

## Conséquences
### Positives
* **Cohérence avec les principes de l'entreprise** : S'aligne avec la préférence de l'entreprise pour NodeJS, facilitant la réutilisation des compétences et des outils.
* **Performance** : Node.js est performant pour les applications I/O-bound, ce qui est adapté pour une API REST.
* **Écosystème riche** : Vaste écosystème de packages (npm) pour le développement rapide.
* **Serverless-friendly** : Excellente intégration avec AWS Lambda pour une architecture serverless.

### Négatives
* **Calcul intensif** : Moins adapté pour les opérations CPU-bound intensives, bien que cela ne soit pas le cas principal de cette application.
* **Gestion des erreurs** : La gestion des erreurs asynchrones peut être complexe si elle n'est pas bien structurée.

## Alternatives considérées
* **Python (Flask/Django)** : Bonne intégration AWS, mais moins de cohérence avec la préférence NodeJS.
* **Java (Spring Boot)** : Très robuste pour les applications d'entreprise, mais plus lourd et moins adapté à une approche serverless rapide pour ce type de projet.


