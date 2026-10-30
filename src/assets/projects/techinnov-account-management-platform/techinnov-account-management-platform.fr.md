# TechInnov — Account Management Platform

## Vue d’ensemble

Cette plateforme constitue le portail d’un service d’apprentissage en ligne. C’est là que les apprenants, les tuteurs, les coordonnateurs et les administrateurs se connectent, gèrent leur compte, réservent des séances, suivent leurs progrès et reçoivent des rapports. Chaque rôle dispose de ses propres écrans et autorisations, et toute l’expérience doit fonctionner en anglais, en français et en chinois traditionnel.

Deux portails coexistent. Le **portail existant** regroupe des processus bien établis, construits avec .NET Framework et MVC. Le **portail accessible** offre l’expérience moderne et accessible vers laquelle la plateforme évolue. Le principal défi consiste à garder les processus existants fiables tout en transférant graduellement les expériences vers le portail accessible, sans perturber les personnes qui utilisent la plateforme chaque jour.

![Vue conceptuelle des rôles, des deux portails, des services communs, des données et des rapports.](images/platform-overview.fr.svg)

## Ma contribution

En tant que **développeur et coordonnateur de l’assurance qualité**, je relie l’implémentation au travail nécessaire pour la livrer de façon fiable. Je développe avec Angular, C#/.NET et SQL Server, je coordonne les tests manuels et automatisés et je transforme les besoins métier en propositions que le client peut évaluer.

Cela comprend la clarification du périmètre, l’estimation des changements importants et la documentation des décisions, afin que développeurs, testeurs et parties prenantes partagent la même compréhension.

## Transférer les expériences vers un portail accessible

Le transfert des expériences des tuteurs vers le portail accessible se fait en plusieurs étapes. J’ai contribué à l’estimation de cette transition et à la définition de sa portée : quels écrans migrer en premier, quelles dépendances en bloquent d’autres et comment garder les deux portails cohérents en cours de route.

Une décision revenait souvent : rediriger les utilisateurs vers des pages de l’ancien portail ou construire l’expérience directement dans le portail accessible. J’ai recommandé de construire directement dans le portail accessible lorsque c’est possible. La redirection est plus rapide à court terme, mais elle produit une expérience hybride pour l’utilisateur et oblige à maintenir le même parcours à deux endroits.

L’accessibilité fait partie de la définition de chaque fonctionnalité plutôt que d’une étape de finition. Les vues de calendrier, par exemple, sont définies séparément pour les apprenants et les tuteurs, avec des exigences d’accessibilité intégrées dès le départ.

## Des règles de réservation cohérentes selon les rôles et les fuseaux horaires

Vue de l’extérieur, la réservation semble simple, mais les règles s’influencent mutuellement. Les reports et les annulations dépendent de la proximité de la séance, la fin du mois influe sur le décompte des séances, et les apprenants et les tuteurs peuvent se trouver dans des fuseaux horaires différents.

Avant de modifier ces processus, j’ai examiné le comportement réel de l’implémentation existante afin que la refactorisation préserve les règles sur lesquelles les utilisateurs comptaient déjà.

## Améliorer la récupération des données

Sur un écran reposant sur des millions d’enregistrements, j’ai réduit le temps d’exécution de la requête d’environ **99 % dans ce cas précis**. Au lieu de préparer tous les détails avant de restreindre les résultats, j’ai réorganisé la requête pour filtrer d’abord, puis enrichir uniquement les lignes nécessaires.

Ce résultat concerne une requête, et non toute la plateforme. L’approche et ses compromis sont présentés dans [Ingénierie axée sur la performance](/capabilities/performance-engineering).

## Intégrer la qualité à la livraison

Une fonctionnalité n’est pas terminée simplement parce que le code est écrit. L’équipe doit aussi savoir ce qui a été vérifié, quelles incertitudes subsistent et qui doit valider le résultat. J’ai documenté le processus de livraison et créé des modèles réutilisables d’assurance qualité pour clarifier ces attentes.

Avec Playwright, je contribue à organiser les tests de régression, qui vérifient si une modification affecte les comportements existants, ainsi que des tests de bon fonctionnement (smoke tests) ciblant les parcours essentiels. Les scénarios tiennent compte des rôles, des tailles d’écran, des langues et de la navigation au clavier. L’automatisation soutient ce travail, sans remplacer l’évaluation manuelle de l’accessibilité.

![La livraison passe de la compréhension du besoin au développement, à la revue, aux tests et à la validation. Les preuves de test et la documentation soutiennent tout le processus.](images/delivery-quality-flow.fr.svg)

J’analyse également les rapports de test et compare l’implémentation à la documentation pour repérer les écarts. Le but est de rendre la qualité visible grâce à des preuves, sans supposer qu’une exécution réussie signifie une couverture complète.

## Technologies et pratiques

Angular · TypeScript · C# · .NET / .NET Framework · ASP.NET MVC · Entity Framework · SQL Server · Playwright · WCAG · SCORM · iTextSharp.

## Ce que ce projet démontre

Ma contribution réunit développement, analyse de performance, accessibilité et coordination de l’assurance qualité. Le défi principal est d’améliorer une plateforme établie tout en préservant les comportements sur lesquels les utilisateurs comptent déjà, et de donner à l’équipe le contexte nécessaire pour continuer à la faire évoluer.
