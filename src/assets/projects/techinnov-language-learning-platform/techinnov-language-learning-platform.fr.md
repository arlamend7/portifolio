# TechInnov — Language Learning Platform

## Vue d’ensemble

Ce projet porte sur les modules d’apprentissage d’un service de formation linguistique en ligne. Les apprenants suivent des programmes, des unités et des activités d’anglais ou de français langue seconde. Les modules sont repensés pour le portail accessible de la plateforme, avec les WCAG 2.1 niveau AA comme objectif de conception et de test.

Le défi dépasse la présentation d’un exercice. Lorsqu’un apprenant termine une activité, la plateforme doit enregistrer son travail et le refléter de façon cohérente dans la progression, les avis de fin de programme et les rapports, même lorsque les anciens contenus et les contenus repensés coexistent.

![Vue conceptuelle des programmes, modules, unités et activités, puis du suivi, de la progression et des rapports.](images/module-structure-tracking.fr.svg)

Les comptes, les rôles et la réservation des séances sont présentés séparément dans [Account Management Platform](/projects/techinnov-account-management-platform).

## Ma contribution

La plateforme existait déjà lorsque j’ai commencé à contribuer à son évolution. En tant que **développeur et coordonnateur de l’assurance qualité**, j’ai participé directement au développement, accompagné l’équipe dans l’implémentation de fonctionnalités et contribué à la création de nouvelles activités d’apprentissage. J’ai également modifié et refactorisé le code et les processus pour améliorer leur stabilité et faciliter leur maintenance.

- **Nouvelles activités et fonctionnalités.** Création d’activités et collaboration à l’implémentation de nouvelles fonctionnalités dans la plateforme existante.
- **Refactorisation et stabilité.** Révision et réorganisation du code et des processus, notamment la préparation du matériel d’apprentissage et la sélection de la version et de la langue appropriées pour chaque apprenant.
- **Logique de progression.** Développement en C#/.NET du statut des activités, de la progression des modules et des avis de fin de programme, selon des règles discutées avec l’équipe produit.
- **Qualité des livraisons.** Coordination des tests, de leur documentation et des scénarios Playwright pour valider les nouvelles fonctionnalités et les comportements existants après les modifications.

## Faire évoluer une plateforme existante

Créer une nouvelle activité et refactoriser une activité existante demandent des précautions différentes. Dans le premier cas, il faut implémenter l’interaction et l’intégrer au fonctionnement de la plateforme. Dans le second, il faut améliorer la structure tout en préservant les comportements sur lesquels les apprenants comptent déjà.

Mon travail a couvert ces deux volets. En plus du développement et du soutien à l’implémentation, j’ai revu et modifié des processus pour les rendre plus stables. L’assurance qualité a complété ce travail en vérifiant que les changements fonctionnaient comme prévu et préservaient les parcours existants.

## Organiser l’apprentissage autour de types d’activités réutilisables

Un programme commence par un test de classement et suit une série de modules. Les modules contiennent des unités, qui regroupent des activités : questions à choix multiples, textes à trous, glisser-déposer, dialogues, quiz et exercices d’écoute où l’apprenant enregistre sa propre voix. Pronunciation Coach, présenté ci-dessous, enrichit cette expérience avec une évaluation de la prononciation assistée par l’IA.

J’aborde ces activités comme des types réutilisables plutôt que comme des pages indépendantes. Par exemple, définir une interaction ou une règle de validation commune à un type évite de maintenir une liste distincte d’exercices à chaque changement de contenu. Cela donne aussi à l’assurance qualité une base cohérente pour tester les activités existantes et futures.

## Pronunciation Coach : l’IA appliquée à la pratique orale

**Pronunciation Coach** utilise l’intelligence artificielle pour évaluer la prononciation et fournir aux apprenants un retour sur leur parole. Cette activité associe la pratique orale à un retour individuel, les aidant à identifier les points à améliorer.

J’ai contribué au développement de cette activité par un **accompagnement technique et un travail de revue**, en collaboration avec l’équipe chargée de l’implémentation. Cette contribution a enrichi mon expérience de l’IA appliquée à l’éducation, à travers son intégration à une expérience destinée aux apprenants.

## Définir ce que signifie terminer

SCORM permet la communication entre le contenu d’apprentissage et la plateforme qui l’héberge. Ici, le suivi des activités alimente les vues de progression, le statut des modules et les rapports. Un exercice qui fonctionne ne suffit pas si son résultat n’est pas enregistré.

Les critères de fin diffèrent selon les modules : certains comprennent une évaluation finale, d’autres servent à la révision ou à la simulation. Prenons un apprenant qui a terminé les exercices, mais pas encore l’évaluation. Le module doit-il apparaître comme terminé ? Cette décision produit doit être explicite avant d’être traduite en code.

J’ai documenté ces situations avec le statut attendu afin que l’équipe produit confirme les règles avant l’implémentation et les tests. La même vigilance s’applique lors d’une refonte du contenu : la progression doit rester cohérente entre les versions, sans être perdue ni comptée deux fois.

## Intégrer l’accessibilité à l’interaction

Une activité accessible demande davantage qu’une nouvelle présentation visuelle. Le glisser-déposer doit offrir un moyen d’utilisation au clavier; le focus doit rester visible; et le retour sur les actions doit être transmis aux technologies d’assistance, pas seulement affiché à l’écran.

Les exercices audio ajoutent d’autres vérifications. Le plan de test tient compte de l’autorisation du microphone, de la clarté des états d’enregistrement et de lecture, des différences entre navigateurs et de la conservation d’une tentative après le rechargement de la page. Ces contrôles relient l’accessibilité à la fiabilité concrète de l’expérience d’apprentissage.

## Tester le parcours, pas seulement l’écran

J’organise les tests manuels et les scénarios Playwright par type d’activité, ainsi que pour la navigation des modules et les évaluations. Les vérifications couvrent l’interaction et son intégration au suivi : après avoir terminé une activité, l’apprenant voit-il la progression attendue ?

La documentation commune regroupe les vérifications fonctionnelles, d’accessibilité, de langue, d’affichage adaptatif et de régression. Les tests automatisés aident à les répéter de façon cohérente; ils ne remplacent pas l’évaluation manuelle de l’accessibilité et ne démontrent pas une couverture complète.

## Technologies et pratiques

Angular · TypeScript · C# · .NET · Entity Framework · SQL Server · SCORM · enregistrement audio dans le navigateur · Playwright · critères WCAG 2.1 AA · localisation en anglais et en français.

## Ce que ce projet démontre

Ma contribution réunit le développement de nouvelles activités et fonctionnalités, le soutien à l’implémentation et la refactorisation du code et des processus d’une plateforme existante. La coordination de l’assurance qualité complète ce travail : elle aide à valider les changements et à préserver l’expérience d’apprentissage pendant l’évolution du produit.
