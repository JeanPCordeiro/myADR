# 6. Architecture Hexagonale

## Statut
Accepté

## Contexte
Pour garantir la maintenabilité, la testabilité et la flexibilité de l'application de gestion des ADR, il est crucial d'adopter une architecture qui sépare clairement la logique métier des détails techniques d'implémentation (base de données, UI, services externes).

Les principes de développement de l'entreprise incluent l'architecture hexagonale.

## Décision
Nous avons décidé d'adopter l'architecture hexagonale (Ports and Adapters) pour structurer le backend de l'application.

## Conséquences
### Positives
* **Séparation des préoccupations** : La logique métier (domaine) est isolée des technologies d'infrastructure, ce qui la rend plus facile à comprendre, à modifier et à tester.
* **Testabilité accrue** : Les tests unitaires et d'intégration peuvent être effectués sur la logique métier sans dépendre de l'infrastructure réelle (bases de données, API externes), en utilisant des implémentations de ports (adaptateurs) en mémoire ou des mocks.
* **Flexibilité technologique** : Il est plus facile de changer les technologies d'infrastructure (par exemple, passer de DynamoDB à une autre base de données) sans impacter la logique métier.
* **Maintenabilité** : Le code est plus organisé et les dépendances sont claires, ce qui réduit la complexité et facilite la maintenance à long terme.
* **Alignement avec les principes** : S'aligne avec les principes de développement de l'entreprise.

### Négatives
* **Complexité initiale** : L'adoption de l'architecture hexagonale peut introduire une complexité initiale due à la nécessité de définir des ports et des adaptateurs, et de comprendre les flux de dépendances.
* **Boilerplate** : Peut générer un peu plus de code 

