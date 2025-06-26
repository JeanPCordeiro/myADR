# 4. Choix du système de gestion de versions : Git

## Statut
Accepté

## Contexte
Les Architecture Decision Records (ADR) sont des documents évolutifs qui capturent les décisions architecturales importantes. Pour assurer la traçabilité, la collaboration et l'historisation de ces décisions, un système de gestion de versions est nécessaire.

Les principes de développement de l'entreprise incluent l'utilisation de CI/CD avec Github Actions, ce qui implique une intégration naturelle avec Git.

## Décision
Nous avons décidé d'utiliser Git comme système de gestion de versions pour le stockage et la gestion des ADR.

## Conséquences
### Positives
* **Traçabilité et Historique** : Git offre un historique complet des modifications, permettant de suivre l'évolution des décisions architecturales et de comprendre pourquoi et quand une décision a été prise ou modifiée.
* **Collaboration** : Facilite la collaboration entre les architectes et les équipes de développement grâce aux branches, aux pull requests et aux revues de code.
* **Décentralisation** : Chaque développeur dispose d'une copie complète du dépôt, ce qui améliore la résilience et la vitesse des opérations.
* **Intégration CI/CD** : S'intègre parfaitement avec les outils de CI/CD comme GitHub Actions, permettant d'automatiser la validation et la publication des ADR.
* **Standard de l'industrie** : Git est le standard de facto pour le contrôle de version, ce qui assure une large connaissance et disponibilité des outils.

### Négatives
* **Complexité pour les débutants** : Peut être perçu comme complexe pour les utilisateurs non familiers avec ses concepts (branches, merges, rebase).
* **Gestion des conflits** : Les conflits de fusion peuvent survenir et nécessitent une résolution manuelle, bien que cela soit inhérent à la collaboration.

## Alternatives considérées
* **SVN (Subversion)** : Système centralisé, moins flexible pour la collaboration décentralisée et moins performant pour les opérations de branchement/fusion.
* **Mercurial** : Similaire à Git, mais moins répandu dans l'écosystème actuel, ce qui limiterait la disponibilité des outils et des compétences.


