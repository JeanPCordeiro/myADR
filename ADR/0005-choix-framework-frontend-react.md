# 5. Choix du framework frontend : React

## Statut
Accepté

## Contexte
L'application de gestion des ADR nécessite une interface utilisateur riche et interactive pour permettre la création, la consultation, la modification et la recherche des ADR, ainsi que la visualisation des diagrammes C4.

## Décision
Nous avons décidé d'utiliser React comme framework principal pour le développement du frontend.

## Conséquences
### Positives
* **Popularité et Écosystème** : React est l'un des frameworks frontend les plus populaires, avec une vaste communauté, de nombreuses bibliothèques et outils, et une grande disponibilité de ressources et de développeurs.
* **Composants Réutilisables** : L'approche basée sur les composants facilite le développement modulaire et la réutilisation du code, ce qui accélère le développement et améliore la maintenabilité.
* **Performance** : Grâce au Virtual DOM, React optimise les mises à jour de l'interface utilisateur, offrant une expérience fluide et réactive.
* **Développement Déclaratif** : Le style de programmation déclaratif de React rend le code plus prévisible et plus facile à déboguer.
* **Intégration Facile** : Peut être facilement intégré avec d'autres bibliothèques JavaScript et des APIs RESTful.

### Négatives
* **Courbe d'apprentissage** : Bien que puissant, React peut avoir une courbe d'apprentissage initiale pour les développeurs non familiers avec ses concepts (JSX, gestion d'état, hooks).
* **Complexité de l'écosystème** : Le grand nombre de bibliothèques et d'approches peut parfois rendre le choix difficile et introduire une certaine complexité dans la configuration du projet.

## Alternatives considérées
* **Angular** : Framework complet avec une structure plus opinionated, mais potentiellement plus lourd pour une application de cette taille.
* **Vue.js** : Plus léger et plus facile à prendre en main que React ou Angular, mais avec un écosystème légèrement moins vaste.


