# 7. Approche CI/CD

## Statut
Accepté

## Contexte
Pour assurer un déploiement rapide, fiable et automatisé de l'application de gestion des ADR, une stratégie d'intégration et de déploiement continus est essentielle. L'entreprise utilise GitHub Actions pour sa CI/CD et privilégie le déploiement serverless sur AWS.

## Décision
Nous avons décidé d'implémenter une approche CI/CD en utilisant GitHub Actions pour l'intégration continue et le déploiement continu sur AWS en mode serverless (Lambda, S3, DynamoDB).

## Conséquences
### Positives
* **Automatisation** : Automatisation complète des étapes de build, test et déploiement, réduisant les erreurs manuelles et accélérant le cycle de livraison.
* **Fiabilité** : Les tests automatisés et les déploiements reproductibles augmentent la fiabilité des livraisons.
* **Rapidité** : Permet des livraisons fréquentes et rapides de nouvelles fonctionnalités ou de correctifs.
* **Cohérence avec les principes** : S'aligne parfaitement avec les principes de développement de l'entreprise (CI/CD avec GitHub Actions, déploiement serverless sur AWS).
* **Visibilité** : GitHub Actions offre une bonne visibilité sur l'état des builds et des déploiements.

### Négatives
* **Complexité de configuration initiale** : La mise en place des pipelines CI/CD peut être complexe au début, nécessitant une bonne connaissance de GitHub Actions et des services AWS.
* **Dépendance à GitHub** : Forte dépendance à la plateforme GitHub pour la CI/CD.
* **Gestion des secrets** : Nécessite une gestion rigoureuse des secrets et des informations d'identification AWS dans GitHub Actions.

## Alternatives considérées
* **AWS CodePipeline/CodeBuild/CodeDeploy** : Solution native AWS, mais GitHub Actions est déjà le standard de l'entreprise.
* **Jenkins** : Solution auto-hébergée, plus flexible mais nécessitant une gestion d'infrastructure dédiée, ce qui va à l'encontre de l'approche serverless.


