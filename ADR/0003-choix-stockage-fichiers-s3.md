# 3. Choix du stockage des fichiers : S3

## Statut
Accepté

## Contexte
L'application de gestion des ADR doit stocker les fichiers bruts des ADR (syntaxe MADR) et les diagrammes C4 (PlantUML) associés. Ces fichiers doivent être accessibles de manière durable et scalable.

## Décision
Nous avons décidé d'utiliser Amazon S3 (Simple Storage Service) pour le stockage des fichiers bruts des ADR et des diagrammes.

## Conséquences
### Positives
* **Durabilité et Disponibilité** : S3 offre une durabilité et une disponibilité élevées pour les données, ce qui est crucial pour les documents d'architecture.
* **Scalabilité illimitée** : S3 est un service de stockage d'objets hautement scalable, capable de gérer des quantités massives de données.
* **Coût-efficacité** : Modèle de paiement à l'utilisation, très économique pour le stockage de données.
* **Intégration AWS** : Intégration native avec d'autres services AWS (Lambda, CloudFront, etc.).
* **Sécurité** : Offre de nombreuses options de sécurité (chiffrement, politiques d'accès).

### Négatives
* **Pas un système de fichiers traditionnel** : S3 est un stockage d'objets, pas un système de fichiers POSIX. Cela signifie que les opérations de lecture/écriture de fichiers doivent être adaptées à l'API S3.
* **Latence** : Bien que performant, S3 peut introduire une latence légèrement plus élevée que le stockage local pour des opérations très fréquentes sur de petits fichiers.

## Alternatives considérées
* **Stockage dans la base de données (DynamoDB)** : Non recommandé pour les fichiers de taille variable ou potentiellement volumineux. Moins économique et moins performant pour ce cas d'usage.
* **Système de fichiers sur EC2** : Introduirait de la complexité et des coûts de gestion de serveurs, allant à l'encontre de l'approche serverless.


