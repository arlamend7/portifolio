Une grande partie de mon travail se situe entre les personnes qui ont besoin d’une solution et celles qui la construisent. Les clients, les responsables produit et les développeurs peuvent discuter du même système tout en ayant des connaissances et des préoccupations différentes.

J’aide à relier ces perspectives : comprendre le besoin métier, organiser les informations et expliquer les aspects techniques d’une manière adaptée à mon interlocuteur. J’utilise des exemples du quotidien, des métaphores et une documentation adaptée au public.

## Une même solution doit répondre à des questions différentes

En proposant un système d’envoi de courriels utilisant un CMS, un outil de gestion de contenu, j’ai dû présenter la solution à deux publics : l’équipe qui allait la développer et les employés qui allaient l’utiliser.

Pour l’équipe technique, il fallait expliquer comment la proposition s’intégrerait au système existant. J’ai décrit l’architecture en microservices — des services aux responsabilités définies qui fonctionnent ensemble — et le rôle de chacun. J’ai également documenté les points d’intégration : où commenceraient et se termineraient les responsabilités de la nouvelle solution, et comment elle se connecterait au système actuel.

Le schéma d’architecture permettait de suivre ces relations. Au-delà du choix des technologies, j’ai montré le rôle de chaque partie et la manière dont elles fonctionneraient ensemble, fournissant ainsi une base de discussion pour la mise en œuvre.

Pour les employés, l’explication devait répondre à une autre question : comment utiliseraient-ils cette solution au travail ? J’ai préparé une présentation centrée sur l’utilisation et représenté le processus en BPMN, une notation visuelle permettant de montrer les activités et leur enchaînement. L’objectif était de leur permettre de suivre le processus sans avoir à connaître la structure interne du système.

| Public | Question principale | Support préparé |
| --- | --- | --- |
| Équipe technique | Comment construire et intégrer la solution ? | Documentation technique et schéma d’architecture |
| Utilisateurs finaux | Comment utiliser la solution au travail ? | Explication de l’utilisation et déroulement des activités |

Les deux explications décrivaient la même proposition, mais partaient de questions différentes. Chaque groupe disposait ainsi des éléments nécessaires pour évaluer la proposition avant le début du développement. C’est un choix que je fais chaque fois que je documente : sélectionner le contenu et le niveau de détail selon ce que chaque personne doit comprendre.

## Partir d’un exemple connu pour expliquer quelque chose de nouveau

Dans une autre situation, j’ai dû expliquer le fonctionnement de la livraison des courriels une fois que notre système les avait transmis au service d’envoi. Notre système utilisait SendGrid, un service d’envoi de courriels, par l’intermédiaire du protocole SMTP. La distinction essentielle était entre transmettre un message au service et voir ce message arriver à destination.

J’ai utilisé le fonctionnement de la poste comme métaphore : notre système prépare une lettre et la remet à la poste ; SendGrid l’achemine. Remettre la lettre ne signifie toutefois pas qu’elle est arrivée chez son destinataire.

J’ai également comparé le traitement à une file d’attente : ajouter des lettres n’accélère pas le traitement de celles qui attendent déjà, et suspendre l’arrivée de nouvelles lettres ne vide pas immédiatement la file. Il s’agissait d’une simplification, et non d’une description exacte de l’ordre de livraison du service, mais elle donnait à chacun une représentation commune de ce que notre système contrôle et de ce que le service prend ensuite en charge.

![Analogie postale : notre système transmet les messages à SendGrid, qui les traite et les achemine vers les destinataires. Transmettre un message au service ne signifie pas le livrer ; l’ordre et le délai de livraison peuvent varier.](images/smtp-postal-analogy.fr.png)

Grâce à cette compréhension commune, la discussion pouvait passer du fonctionnement du service aux actions à envisager. C’est ainsi que j’utilise les analogies : pour établir un point de départ familier, puis expliquer les détails techniques nécessaires à la situation.

## La communication fonctionne dans les deux sens

Adapter le langage est également important au sein des équipes techniques. Un développeur junior et un architecte peuvent avoir des expériences différentes. Les équipes de développement, d’assurance qualité et d’infrastructure abordent aussi un problème selon des responsabilités distinctes.

Je fais souvent le lien entre ces personnes. Avec les clients, je transforme les besoins en propositions accompagnées de cas d’utilisation et de schémas, afin de permettre la validation des décisions avant le début du développement. Au sein de l’équipe, je rédige la documentation d’assurance qualité et des processus pour que les développeurs, les testeurs et les équipes d’infrastructure travaillent à partir d’une référence commune. J’encourage également les professionnels techniques à expliquer leur raisonnement sans dépendre uniquement des termes de leur spécialité.

Ces échanges continuent à m’apprendre ce qui doit être expliqué et quels mots facilitent la compréhension.

Pour moi, la clarté fait partie du travail technique. Je cherche à contribuer à la construction de la solution tout en aidant les personnes concernées à comprendre ce que nous construisons, pourquoi cela est nécessaire et comment la solution sera utilisée.
