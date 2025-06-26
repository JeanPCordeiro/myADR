Fonctionnalité: Création d'un Architecture Decision Record (ADR)
  En tant que Contributeur ADR
  Je veux créer un nouvel ADR
  Afin de documenter une décision architecturale

  Scénario: Création réussie d'un ADR avec les informations minimales
    Etant donné que je suis connecté en tant que "Contributeur ADR"
    Quand je navigue vers la page de création d'ADR
    Et que je saisis "Choix de la base de données" dans le champ "Titre"
    Et que je saisis "Nous avons décidé d'utiliser DynamoDB." dans le champ "Décision"
    Et que je clique sur le bouton "Créer"
    Alors un nouvel ADR intitulé "Choix de la base de données" devrait être créé
    Et son statut devrait être "Proposé"
    Et je devrais voir un message de succès "ADR créé avec succès."

  Scénario: Création réussie d'un ADR avec toutes les informations
    Etant donné que je suis connecté en tant que "Contributeur ADR"
    Quand je navigue vers la page de création d'ADR
    Et que je saisis "Choix du framework frontend" dans le champ "Titre"
    Et que je saisis "Le projet nécessite une interface utilisateur riche et interactive." dans le champ "Contexte"
    Et que je saisis "Nous avons décidé d'utiliser React." dans le champ "Décision"
    Et que je saisis "Améliore la performance et la maintenabilité." dans le champ "Conséquences Positives"
    Et que je saisis "Courbe d'apprentissage." dans le champ "Conséquences Négatives"
    Et que je saisis "Angular, Vue.js" dans le champ "Alternatives Considérées"
    Et que je clique sur le bouton "Créer"
    Alors un nouvel ADR intitulé "Choix du framework frontend" devrait être créé
    Et son statut devrait être "Proposé"
    Et je devrais voir un message de succès "ADR créé avec succès."

  Scénario: Tentative de création d'un ADR sans titre
    Etant donné que je suis connecté en tant que "Contributeur ADR"
    Quand je navigue vers la page de création d'ADR
    Et que je saisis "Une décision importante." dans le champ "Décision"
    Et que je clique sur le bouton "Créer"
    Alors je devrais voir un message d'erreur "Le titre est obligatoire."
    Et l'ADR ne devrait pas être créé

  Scénario: Tentative de création d'un ADR sans décision
    Etant donné que je suis connecté en tant que "Contributeur ADR"
    Quand je navigue vers la page de création d'ADR
    Et que je saisis "Titre de l'ADR" dans le champ "Titre"
    Et que je clique sur le bouton "Créer"
    Alors je devrais voir un message d'erreur "La décision est obligatoire."
    Et l'ADR ne devrait pas être créé


