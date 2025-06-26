Fonctionnalité: Consultation d'un Architecture Decision Record (ADR)
  En tant que Lecteur ADR
  Je veux consulter les détails d'un ADR existant
  Afin de comprendre une décision architecturale

  Scénario: Consultation réussie d'un ADR existant
    Etant donné qu'un ADR intitulé "Choix de la base de données" existe avec le statut "Accepté"
    Et que je suis connecté en tant que "Lecteur ADR"
    Quand je navigue vers la page de détail de l'ADR "Choix de la base de données"
    Alors je devrais voir le titre "Choix de la base de données"
    Et je devrais voir le statut "Accepté"
    Et je devrais voir la décision "Nous avons décidé d'utiliser DynamoDB."

  Scénario: Consultation d'un ADR introuvable
    Etant donné que je suis connecté en tant que "Lecteur ADR"
    Quand je navigue vers la page de détail de l'ADR "ADR Inexistant"
    Alors je devrais voir un message d'erreur "ADR non trouvé."
    Et je devrais être redirigé vers la page de liste des ADR

  Scénario: Consultation d'un ADR avec diagramme C4
    Etant donné qu'un ADR intitulé "Architecture Système" existe avec un diagramme C4 attaché
    Et que je suis connecté en tant que "Lecteur ADR"
    Quand je navigue vers la page de détail de l'ADR "Architecture Système"
    Alors je devrais voir le diagramme C4 affiché


