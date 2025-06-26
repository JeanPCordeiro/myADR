## Phase 1: Analyse des besoins et conception fonctionnelle
- [ ] Définir les fonctionnalités clés de l'application de gestion des ADR.
- [ ] Identifier les acteurs et leurs rôles.
- [ ] Établir les cas d'utilisation principaux.
- [ ] Esquisser l'interface utilisateur (wireframes simples).
- [ ] Valider la compréhension des besoins avec l'utilisateur.



### Fonctionnalités clés de l'application de gestion des ADR :
- Création, lecture, mise à jour et suppression (CRUD) des ADR.
- Recherche et filtrage des ADR par titre, statut, date, produit, solution, etc.
- Visualisation des ADR en syntaxe MADR.
- Historique des modifications pour chaque ADR.
- Gestion des statuts des ADR (proposé, accepté, rejeté, obsolète).
- Association des ADR à des produits et solutions existants.
- Possibilité d'attacher des diagrammes C4 (PlantUML) aux ADR.
- Intégration avec un système de gestion de versions (ex: Git) pour le stockage des ADR.
- Interface utilisateur simple et intuitive.




### Acteurs et rôles :
- **Contributeur ADR** : Peut créer, modifier et proposer des ADR.
- **Approbateur ADR** : Peut réviser, accepter ou rejeter des ADR. Généralement un membre du chapitre architecture ou un architecte produit.
- **Lecteur ADR** : Peut consulter tous les ADR.
- **Administrateur** : Gère les utilisateurs, les produits et les solutions.




### Cas d'utilisation principaux :
1. **Créer un nouvel ADR** : Un contributeur rédige un nouvel ADR, spécifie son titre, son contexte, sa décision, ses conséquences, et le soumet pour approbation.
2. **Modifier un ADR existant** : Un contributeur met à jour un ADR existant (par exemple, pour ajouter des détails ou corriger des erreurs) et le soumet à nouveau si nécessaire.
3. **Consulter les ADR** : Un lecteur recherche et visualise les détails d'un ou plusieurs ADR.
4. **Approuver/Rejeter un ADR** : Un approbateur examine un ADR soumis, ajoute des commentaires et décide de l'approuver ou de le rejeter.
5. **Changer le statut d'un ADR** : Un approbateur ou un administrateur peut modifier le statut d'un ADR (par exemple, le marquer comme obsolète).
6. **Associer un ADR à un produit/solution** : Un contributeur ou un administrateur associe un ADR à un ou plusieurs produits et solutions du SI.
7. **Générer un rapport d'ADR** : Un utilisateur peut générer un rapport ou une liste filtrée d'ADR.




### Esquisse de l'interface utilisateur (wireframes simples) :
- **Page d'accueil/Tableau de bord** : Vue d'ensemble des ADR récents, des ADR en attente d'approbation, et des statistiques.
- **Liste des ADR** : Tableau avec filtres et recherche, affichant les ADR avec leurs titres, statuts, dates, produits/solutions associés.
- **Détail d'un ADR** : Affichage du contenu complet d'un ADR (titre, contexte, décision, conséquences, statut, historique), avec possibilité de modifier ou d'ajouter des commentaires.
- **Formulaire de création/édition d'ADR** : Champs pour saisir les informations de l'ADR, y compris un éditeur de texte pour la syntaxe MADR et un champ pour l'intégration C4 PlantUML.
- **Gestion des utilisateurs/rôles** (pour les administrateurs).
- **Gestion des produits/solutions** (pour les administrateurs).




## Phase 2: Modélisation architecture avec C4 Model
- [x] Définir le contexte du système (System Context diagram).
- [x] Définir les conteneurs (Container diagram).
- [x] Définir les composants (Component diagram).
- [x] Générer les diagrammes C4 en utilisant PlantUML.
- [x] Intégrer les diagrammes dans la documentation.




## Phase 3: Création des ADR de conception
- [ ] Créer un répertoire ADR.
- [x] Rédiger l'ADR pour le choix de la technologie backend (Node.js).
- [x] Rédiger l'ADR pour le choix de la base de données (DynamoDB).
- [x] Rédiger l'ADR pour le choix du stockage des fichiers (S3).
- [x] Rédiger l'ADR pour le choix du système de gestion de versions (Git).
- [x] Rédiger l'ADR pour le choix du framework frontend (React).
- [x] Rédiger l'ADR pour l'architecture hexagonale.
- [x] Rédiger l'ADR pour l'approche CI/CD.




## Phase 4: Spécifications BDD et tests
- [x] Définir les fonctionnalités BDD (Gherkin) pour la création d'un ADR.
- [x] Définir les fonctionnalités BDD (Gherkin) pour la consultation d'un ADR.
- [x] Définir les fonctionnalités BDD (Gherkin) pour la modification d'un ADR.
- [x] Définir les fonctionnalités BDD (Gherkin) pour l'approbation/rejet d'un ADR.
- [ ] Esquisser la stratégie de test (unitaires, intégration, end-to-end).




### Stratégie de test :
- **Tests Unitaires** : Couvrir la logique métier des services et adaptateurs (architecture hexagonale) en utilisant un framework de test comme Jest.
- **Tests d'Intégration** : Vérifier l'interaction entre les composants (API et base de données, API et S3, API et VCS) en utilisant des mocks ou des environnements de test légers.
- **Tests End-to-End (E2E)** : Simuler les scénarios utilisateur complets via l'interface utilisateur (frontend et backend) en utilisant des outils comme Cypress ou Playwright.
- **Tests de Performance** : Évaluer la réactivité et la scalabilité de l'application sous charge.
- **Tests de Sécurité** : Identifier les vulnérabilités potentielles (OWASP Top 10).



## Phase 5: Développement de l'application
- [x] Créer la structure du projet backend (Node.js avec architecture hexagonale).
- [x] Implémenter les services métier (ADR Service, User Service).
- [x] Implémenter les adaptateurs (DB Adapter, Storage Adapter, VCS Adapter).
- [x] Implémenter les contrôleurs REST (ADR Controller, User Controller).
- [x] Créer la structure du projet frontend (React).
- [x] Implémenter les composants React pour la gestion des ADR.
- [x] Implémenter l'authentification et l'autorisation.
- [x] Tester l'application localement.


## Phase 6: Configuration CI/CD et déploiement AWS
- [x] Créer les workflows GitHub Actions pour CI/CD.
- [x] Configurer les tests automatisés.
- [x] Préparer les fichiers de configuration pour le déploiement serverless.
- [x] Créer la documentation de déploiement.
- [x] Tester le pipeline CI/CD.


## Phase 7: Livraison et documentation finale
- [x] Créer le document de livraison complet.
- [x] Générer la documentation technique finale.
- [x] Préparer le guide d'utilisation.
- [x] Créer le rapport de projet.
- [x] Livrer tous les livrables à l'utilisateur.

