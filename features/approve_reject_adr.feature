Fonctionnalité: Approbation et Rejet d'un Architecture Decision Record (ADR)
  En tant qu'Approbateur ADR
  Je veux pouvoir approuver ou rejeter un ADR
  Afin de valider ou refuser une décision architecturale

  Scénario: Approbation réussie d'un ADR
    Etant donné qu'un ADR intitulé "Choix de la technologie backend" existe avec le statut "Proposé"
    Et que je suis connecté en tant que "Approbateur ADR"
    Quand je navigue vers la page de détail de l'ADR "Choix de la technologie backend"
    Et que je clique sur le bouton "Approuver"
    Alors le statut de l'ADR "Choix de la technologie backend" devrait être "Accepté"
    Et je devrais voir un message de succès "ADR approuvé avec succès."

  Scénario: Rejet réussi d'un ADR avec commentaire
    Etant donné qu'un ADR intitulé "Choix de la base de données" existe avec le statut "Proposé"
    Et que je suis connecté en tant que "Approbateur ADR"
    Quand je navigue vers la page de détail de l'ADR "Choix de la base de données"
    Et que je saisis "La décision ne prend pas en compte les contraintes de sécurité." dans le champ "Commentaire de rejet"
    Et que je clique sur le bouton "Rejeter"
    Alors le statut de l'ADR "Choix de la base de données" devrait être "Rejeté"
    Et je devrais voir un message de succès "ADR rejeté avec succès."

  Scénario: Tentative d'approbation par un non-approbateur
    Etant donné qu'un ADR intitulé "Choix du framework frontend" existe avec le statut "Proposé"
    Et que je suis connecté en tant que "Contributeur ADR"
    Quand je navigue vers la page de détail de l'ADR "Choix du framework frontend"
    Alors je ne devrais pas voir le bouton "Approuver"
    Et je ne devrais pas voir le bouton "Rejeter"


