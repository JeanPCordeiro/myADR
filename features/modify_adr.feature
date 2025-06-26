Fonctionnalité: Modification d'un Architecture Decision Record (ADR)
  En tant que Contributeur ADR
  Je veux modifier un ADR existant
  Afin de mettre à jour ou corriger une décision architecturale

  Scénario: Modification réussie du titre et de la décision d'un ADR
    Etant donné qu'un ADR intitulé "Ancien Titre" existe avec la décision "Ancienne Décision"
    Et que je suis connecté en tant que "Contributeur ADR"
    Quand je navigue vers la page d'édition de l'ADR "Ancien Titre"
    Et que je saisis "Nouveau Titre" dans le champ "Titre"
    Et que je saisis "Nouvelle Décision." dans le champ "Décision"
    Et que je clique sur le bouton "Enregistrer"
    Alors l'ADR intitulé "Nouveau Titre" devrait exister
    Et son statut devrait rester "Proposé"
    Et je devrais voir un message de succès "ADR mis à jour avec succès."

  Scénario: Tentative de modification d'un ADR sans titre
    Etant donné qu'un ADR intitulé "ADR à Modifier" existe
    Et que je suis connecté en tant que "Contributeur ADR"
    Quand je navigue vers la page d'édition de l'ADR "ADR à Modifier"
    Et que je vide le champ "Titre"
    Et que je clique sur le bouton "Enregistrer"
    Alors je devrais voir un message d'erreur "Le titre est obligatoire."
    Et l'ADR ne devrait pas être modifié

  Scénario: Tentative de modification d'un ADR sans décision
    Etant donné qu'un ADR intitulé "ADR à Modifier" existe
    Et que je suis connecté en tant que "Contributeur ADR"
    Quand je navigue vers la page d'édition de l'ADR "ADR à Modifier"
    Et que je vide le champ "Décision"
    Et que je clique sur le bouton "Enregistrer"
    Alors je devrais voir un message d'erreur "La décision est obligatoire."
    Et l'ADR ne devrait pas être modifié


