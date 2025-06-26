# 2. Choix de la base de données : DynamoDB

## Statut
Accepté

## Contexte
L'application de gestion des ADR nécessite une base de données pour stocker les métadonnées des ADR (titre, statut, associations, etc.) et les informations des utilisateurs. L'entreprise privilégie une architecture serverless sur AWS.

## Décision
Nous avons décidé d'utiliser Amazon DynamoDB comme base de données principale pour l'application.

## Conséquences
### Positives
* **Serverless et Scalabilité** : DynamoDB est une base de données NoSQL entièrement gérée par AWS, offrant une scalabilité horizontale automatique et une haute disponibilité sans gestion de serveurs.
* **Performance** : Offre des performances rapides et prévisibles à n'importe quelle échelle, avec des latences en millisecondes.
* **Coût** : Modèle de paiement à l'utilisation, ce qui est économique pour des charges de travail variables.
* **Intégration AWS** : Intégration native et facile avec d'autres services AWS (Lambda, S3, IAM).

### Négatives
* **Modélisation de données NoSQL** : Nécessite une approche de modélisation de données différente des bases de données relationnelles, ce qui peut être un défi pour les équipes habituées au SQL.
* **Requêtes complexes** : Moins adapté aux requêtes ad-hoc complexes ou aux jointures, bien que cela soit moins critique pour les besoins actuels de l'application.
* **Coût à grande échelle** : Peut devenir coûteux si les besoins en lecture/écriture provisionnés sont très élevés et constants.

## Alternatives considérées
* **Amazon RDS (PostgreSQL/MySQL)** : Base de données relationnelle, plus familière pour beaucoup, mais moins 

