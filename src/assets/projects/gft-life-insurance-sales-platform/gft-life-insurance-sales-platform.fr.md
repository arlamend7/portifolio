# GFT — Plateforme de vente d’assurances vie

## Vue d’ensemble

Le projet a commencé avec un objectif précis : permettre aux entreprises partenaires de vendre un produit d’assurance au moyen d’une application web. Il a ensuite dû prendre en charge plusieurs fournisseurs, les particuliers et les entreprises, l’authentification entre systèmes partenaires et le reporting auprès d’une banque nationale.

Mon rôle a évolué avec ces besoins. Après la réaffectation de l’équipe d’architecture initiale, j’ai proposé des changements techniques et travaillé avec l’équipe de développement pour les évaluer et les mettre en œuvre. Le défi central était d’accueillir de nouveaux besoins métier tout en préservant les fonctionnalités déjà utilisées.

Le résultat le plus important a été la réutilisation d’une étape à l’autre. Les modules fournisseurs et les formulaires dynamiques introduits pour plusieurs assureurs ont ensuite servi aux ventes aux entreprises. Un parcours dédié à l’authentification et à la redirection a organisé l’entrée des partenaires, tandis qu’un traitement distinct du reporting a étendu l’utilisation de l’infrastructure Azure existante.

![Vue de l’architecture : les partenaires entrent par le SSO ; les applications Angular utilisent un backend .NET sur Azure Functions, avec des intégrations fournisseurs, Cosmos DB, Key Vault et un contexte privé dans Redis. Un flux distinct traite les changements des contrats et produit les fichiers bancaires.](images/architecture-overview.fr.svg)

### Fonctionnement de la plateforme

- **Entrer depuis un partenaire.** L’application SSO et de redirection identifie le partenaire d’origine, coordonne l’authentification et dirige l’utilisateur vers l’application de vente appropriée.
- **Réaliser une vente.** Les formulaires Angular s’adaptent aux particuliers ou aux entreprises et au fournisseur choisi. Le backend .NET, exécuté sur Azure Functions, applique les règles communes et délègue les opérations spécifiques au module concerné.
- **Séparer données et identifiants.** Cosmos DB conserve les informations des contrats, Key Vault stocke les identifiants des fournisseurs et Redis garde temporairement le contexte nécessaire pour poursuivre le parcours entre applications.
- **Signaler les modifications des contrats.** Un déclencheur Cosmos DB et une Azure Function lancent un traitement distinct. Les tâches en file sont traitées pour produire les fichiers à largeur fixe de l’intégration bancaire.

*Le diagramme présente les principales responsabilités et interactions. Il s’agit d’une vue conceptuelle, pas d’une topologie réseau ou de déploiement.*

## Accueillir davantage de fournisseurs sans dupliquer la plateforme

La première version utilisait Angular, .NET avec Azure Functions et Cosmos DB. Moins de deux mois après le début de la phase initiale, le périmètre s’est élargi à plusieurs assureurs. Chacun avait son propre contrat d’intégration, ses identifiants, ses champs obligatoires et ses règles de validation.

Reproduire un formulaire et un backend conçus pour un seul produit aurait augmenté la quantité de code à maintenir pour chaque fournisseur. J’ai proposé de séparer les opérations communes à la plateforme des détails propres à chaque intégration.

Un handler partagé reçoit la requête, identifie le fournisseur et applique les règles communes. Il appelle ensuite le module du fournisseur via une interface partagée : un contrat définissant des opérations telles que récupérer les informations requises, soumettre une demande, payer et confirmer. Chaque module implémente ces opérations selon l’API de son fournisseur.

![Intégration des fournisseurs : des valeurs prédéfinies alimentent un résolveur commun. Une interface partagée le relie à des modules et API indépendants, avec Cosmos DB pour les données et Key Vault pour les identifiants.](images/provider-modules.fr.svg)

Le smart enum regroupe les identifiants des fournisseurs et les valeurs prédéfinies d’intégration ; les secrets restent dans Key Vault. Côté frontend, des formulaires dynamiques ont remplacé le formulaire statique initial afin d’adapter les champs au fournisseur et au parcours métier.

L’équipe a évalué et mis en œuvre cette approche. Elle a donné aux nouvelles intégrations une place définie dans le système et réduit le besoin de dupliquer les comportements communs ou de modifier des modules sans rapport avec le fournisseur concerné.

## Poursuivre le parcours client en sécurité entre systèmes

Les ventes aux entreprises ont introduit d’autres champs et règles métier. Le travail antérieur sur les modules et les formulaires dynamiques a permis de réutiliser cette base. Le nouveau problème consistait à amener l’utilisateur d’un partenaire externe vers la bonne application, avec les informations nécessaires pour poursuivre son parcours.

Ces informations pouvaient comprendre l’entreprise d’origine, les données du vendeur et celles du client utilisées pour préremplir un formulaire. Les transmettre directement dans une URL publique aurait exposé des informations qui devaient circuler dans une communication contrôlée entre backends.

J’ai proposé un intégrateur SSO et un handler de redirection dédiés, avec des applications frontend et backend distinctes. Après avoir résolu l’authentification et le contexte du partenaire, la solution conservait temporairement ce contexte dans Redis, sur un réseau privé. Le navigateur recevait une clé de référence. Le backend cible utilisait cette clé, ses propres identifiants et des contrôles d’autorisation pour récupérer les informations.

Les applications disposaient ainsi d’un parcours commun d’entrée et de résolution du contexte, sans devoir chacune implémenter l’authentification et la redirection des partenaires.

## Transformer les changements des contrats en rapports bancaires cohérents

L’intégration suivante exigeait d’informer la banque des contrats confirmés, validés et annulés. Nous avons étendu le système avec un déclencheur Cosmos DB et une Azure Function, en maintenant ce reporting séparé du parcours principal de vente.

La difficulté résidait dans le contrat des fichiers. Dans un fichier à largeur fixe, chaque champ doit occuper une position et une longueur précises. Formater correctement une valeur peut nécessiter du remplissage, une troncature, une conversion numérique ou la suppression des accents. Les fichiers hebdomadaires et mensuels devaient aussi représenter les informations liées aux contrats de manière cohérente, même lorsqu’ils étaient générés à des moments différents.

J’ai proposé et implémenté un module dédié au formatage, en appliquant les principes de DDD pour réunir ces règles. Les transformations communes pouvaient être réutilisées, tandis que chaque format conservait ses exigences spécifiques. Cette organisation rendait la logique plus facile à comprendre que des règles dispersées dans le traitement d’intégration.

La validité dépendait des deux niveaux : chaque champ devait respecter sa spécification, et les fichiers liés devaient être cohérents sur les données des contrats.

## Ce que ce projet démontre

L’intégration bancaire a été livrée et l’institution a demandé une documentation technique comme référence pour d’autres entreprises. L’équipe a également été invitée à expliquer l’architecture et l’approche d’implémentation.

J’en retiens surtout la façon dont les décisions d’architecture se renforcent au fil du projet. Séparer le travail propre à chaque fournisseur a facilité les ventes aux entreprises par la suite ; isoler l’authentification et le reporting a donné une responsabilité claire à chaque flux. Ma contribution associait l’implémentation, la proposition de ces séparations et l’accord avec l’équipe sur leur réalisation.

### Crédits des icônes

Icônes Azure Functions, Cosmos DB et Key Vault : [Microsoft Azure Architecture Center](https://learn.microsoft.com/en-us/azure/architecture/icons/). Les couleurs officielles sont conservées. Les composants génériques n’indiquent pas un produit cloud particulier.
