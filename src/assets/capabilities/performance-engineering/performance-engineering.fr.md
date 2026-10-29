## Des systèmes plus rapides, des résultats toujours fiables

Un écran lent ne signifie pas forcément que l’interface est lente. Le délai peut venir d’une API, de la logique applicative, d’une requête en base de données ou d’un service externe. Je commence par identifier où le temps est réellement passé avant de décider quoi modifier.

Mon travail sur l’interface, le backend et la base de données me permet de suivre la requête dans son ensemble. Mon expérience en assurance qualité guide aussi cette démarche : améliorer la vitesse compte, mais vérifier que l’utilisateur reçoit toujours les bonnes informations est tout aussi essentiel.

## Un exemple concret : moins de travail sur des millions d’enregistrements

Une liste avec recherche s’appuyait sur une table contenant des millions d’enregistrements. Pour afficher chaque résultat, la requête réunissait des informations provenant de tables liées et calculait des champs supplémentaires, comme des totaux et des statuts.

Le coût venait du volume de données traité. L’approche initiale enrichissait un grand ensemble d’enregistrements avant de le limiter aux résultats nécessaires. Une grande partie de ce travail était ensuite écartée, puisque l’écran n’affichait qu’une seule page.

J’ai modifié l’approche pour concentrer les opérations coûteuses sur un ensemble plus petit :

1. **Trouver les enregistrements correspondants.** Appliquer les critères de recherche avant de charger les détails inutiles à l’identification des résultats.
2. **Sélectionner la page.** Conserver les identifiants des enregistrements à afficher, en respectant l’ordre de tri requis.
3. **Ajouter les détails.** Récupérer les informations liées et calculer les champs restants pour ces enregistrements.

C’est comme préparer un rapport à partir de vastes archives : trouver d’abord les dossiers nécessaires, puis réunir leurs détails, plutôt que préparer un rapport complet pour chaque dossier existant.

![Comparaison entre une requête qui enrichit de nombreux enregistrements avant de filtrer et une requête qui filtre et sélectionne une page avant d’ajouter les détails.](images/filter-first.fr.svg)

Dans ce cas, le temps d’exécution a diminué d’environ **99 %, avec les mêmes données en résultat**. Ce chiffre concerne cette requête précise ; ce n’est pas une promesse pour tous les systèmes.

Le changement a également réduit la dépendance de cette requête aux index pour rester utilisable. Un index aide à trouver les enregistrements, comme l’index d’un livre, mais entraîne des coûts de stockage et de mise à jour. La leçon était de supprimer d’abord le travail inutile, puis d’évaluer les index selon la charge réelle, et non de cesser de les utiliser.

Cette approche demande de la rigueur : si une valeur liée détermine si un enregistrement correspond à la recherche ou sa position dans le tri, il faut la prendre en compte avant de sélectionner la page. Sinon, une requête plus rapide peut retourner des résultats incorrects.

## Comment je réduis le travail inutile

J’applique le même raisonnement aux API, aux écrans et aux traitements en arrière-plan. L’objectif est d’éviter les répétitions et de déplacer uniquement les données nécessaires à la tâche.

| Décision | Effet concret |
| --- | --- |
| Valider les entrées tôt | Rejeter les requêtes invalides avant un traitement coûteux, tout en conservant la validation définitive côté serveur. |
| Préparer la requête | Normaliser les entrées et réunir le contexte nécessaire pour éviter les recherches répétées. |
| Vérifier les autorisations au bon niveau | Réutiliser les contrôles communs lorsque c’est pertinent, sans perdre les règles propres à chaque enregistrement. |
| Regrouper les travaux indépendants | Traiter des groupes d’enregistrements et utiliser un parallélisme maîtrisé lorsque les dépendances et la capacité le permettent. |
| Filtrer près de la source | Éviter de charger un ensemble complet lorsque seules quelques lignes ou colonnes sont nécessaires. |
| Préparer la réponse avec discernement | Choisir où effectuer les calculs selon leur rôle, le volume de données et le coût mesuré. |

Je cherche également à concevoir des requêtes réutilisables pour plusieurs écrans grâce à des paramètres clairs. La réutilisation doit simplifier une fonctionnalité, pas créer un endpoint qui charge tout pour tout le monde. Il en va de même pour le code : je sépare l’accès aux données, les règles métier et la présentation sans fragmenter inutilement une opération simple.

## Ce que cela donne dans chaque partie du système

### Base de données : réduire les calculs répétés

J’ai remplacé des calculs exécutés séparément pour chaque enregistrement par des opérations sur un ensemble de lignes. J’examine aussi les sous-requêtes qui dépendent de chaque ligne du résultat et les compare à des jointures ou à des totaux regroupés lorsque ces alternatives réduisent le travail.

Dans les procédures stockées complexes — des programmes enregistrés dans la base — je recherche les conditions accumulées qui compliquent l’optimisation. Des requêtes plus ciblées peuvent rendre le traitement plus facile à comprendre et à ajuster.

Les tables temporaires constituent une autre option lorsque la base a besoin de meilleures informations sur des résultats intermédiaires. Les statistiques de SQL Server l’aident à estimer les volumes et à choisir un plan d’exécution. Les variables de table ne disposent pas de statistiques de distribution par colonne, même si des fonctionnalités récentes améliorent leurs estimations du nombre de lignes. J’évalue le plan et la charge sans supposer qu’une structure soit toujours meilleure.

### Backend : rendre l’accès aux données explicite

Avec des outils comme Entity Framework, le code peut masquer le moment où une requête s’exécute ou le volume de données chargé. Je rends cette frontière explicite : filtrer dans la base lorsque c’est pertinent, récupérer uniquement les champs utiles et séparer l’accès aux données des règles métier.

Les valeurs destinées à la présentation, comme les libellés formatés, peuvent souvent être préparées dans l’API. Les calculs nécessaires au filtrage, au tri ou à l’agrégation peuvent relever de la base. Le choix dépend de l’opération, pas d’une règle absolue sur la couche la plus rapide.

### Interface : charger ce dont l’utilisateur a besoin

Un écran n’a pas besoin de tout récupérer à l’ouverture. Je diffère le chargement des données réservées à des actions occasionnelles et limite les requêtes au périmètre visible, par exemple les dates affichées dans un calendrier.

Des composants de saisie partagés détectent tôt les problèmes de format. Les textes de référence stables peuvent être générés à l’avance lorsqu’ils ne nécessitent pas de recherche à l’exécution. Ces choix évitent les requêtes inutiles et allègent la première interaction.

## Un code lisible rend le travail coûteux plus visible

L’étude de DDD, de SOLID et d’Object Calisthenics, ainsi que de techniques comme les objets littéraux et les closures, a influencé ma façon d’organiser le code. J’en retiens notamment que comprendre une fonction, c’est comprendre à la fois son objectif et la manière dont son travail augmente lorsqu’elle reçoit davantage de données. Ces approches aident à raisonner sur la conception ; elles ne rendent pas automatiquement le code plus rapide.

La complexité algorithmique, souvent exprimée avec la **notation Big O**, décrit cette croissance plutôt qu’un temps d’exécution exact. Pour un travail en **O(n)**, doubler le nombre d’éléments revient approximativement à doubler le travail. En **O(n²)**, celui-ci peut approximativement quadrupler. Par exemple, comparer chaque élément à tous les autres peut devenir coûteux lorsque la liste grandit, même si le traitement semble instantané sur un petit échantillon.

C’est pourquoi je recherche les recherches répétées, les boucles imbriquées et les appels à la base cachés dans le traitement de chaque élément. J’évite aussi les imbrications inutiles pour garder le chemin d’exécution facile à suivre. L’indentation ne détermine pas, à elle seule, la complexité : une expression courte peut masquer un travail coûteux, tandis que des conditions imbriquées peuvent être peu coûteuses.

Je n’applique pas ces idées de façon rigide. Une solution quadratique simple peut convenir à une entrée petite et bornée. Le choix dépend du volume attendu, des mesures réelles et du coût d’une alternative plus complexe.

La lisibilité reste essentielle dans tous les cas. Des noms clairs, des responsabilités explicites et un chemin d’exécution visible aident le prochain développeur à comprendre l’intention avant de modifier le code. Lorsqu’un compromis de performance est nécessaire, je veux qu’il soit expliqué, et non dissimulé dans une implémentation difficile à suivre.

## Vérifier que l’amélioration est sûre

Avant de modifier un processus, j’établis ses performances actuelles et les résultats attendus. Ensuite, je compare les deux : le temps nécessaire et les informations retournées dans des conditions comparables.

Les tests de régression, les critères d’acceptation clairs et les preuves documentées relient ce travail à l’assurance qualité. L’objectif est un système qui répond plus vite, conserve ses règles métier et reste compréhensible pour la personne qui en assurera la maintenance.

### Références techniques

- [Microsoft : requêtes efficaces avec Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/performance/efficient-querying)
- [Microsoft : compilation différée des variables de table](https://learn.microsoft.com/en-us/sql/relational-databases/performance/intelligent-query-processing-details#table-variable-deferred-compilation)
