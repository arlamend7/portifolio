Une part importante de mon travail se déroule dans les échanges entre les personnes qui ont besoin d’une solution et celles qui vont la construire. Les clients, les responsables produit et les développeurs peuvent parler du même système tout en ayant des connaissances et des préoccupations différentes.

J’aide à relier ces perspectives : comprendre le besoin métier, organiser les informations et expliquer les aspects techniques d’une manière adaptée à mon interlocuteur. Pour cela, j’utilise des exemples du quotidien, des métaphores et une documentation adaptée au public.

## Une même solution doit répondre à des questions différentes

En proposant un système d’envoi de courriels utilisant un CMS, un outil de gestion de contenu, j’ai dû présenter la solution à deux publics : l’équipe qui allait la développer et les employés qui allaient l’utiliser.

Pour l’équipe technique, il fallait expliquer comment la proposition s’intégrerait au système existant. J’ai détaillé l’architecture en microservices — des services aux responsabilités définies qui fonctionnent ensemble — et le rôle de chacun. J’ai également documenté les points d’intégration : où commenceraient et se termineraient les responsabilités de la nouvelle solution, et comment elle se connecterait au système actuel. La proposition présentait aussi les types de services cloud prévus.

Le schéma d’architecture permettait de suivre ces relations. Au-delà du choix des technologies, je devais montrer le rôle de chaque partie et la manière dont elles fonctionneraient ensemble, afin de fournir une base de discussion pour la mise en œuvre.

Pour les employés, l’explication devait répondre à une autre question : comment utiliseraient-ils cette solution au travail ? J’ai préparé une présentation centrée sur l’utilisation et représenté le processus en BPMN, une notation visuelle permettant de montrer les activités et leur enchaînement. L’objectif était de leur permettre de suivre le processus sans avoir à connaître la structure interne du système.

| Public | Question principale | Support préparé |
| --- | --- | --- |
| Équipe technique | Comment construire et intégrer la solution ? | Documentation technique et schéma d’architecture |
| Employés | Comment utiliser la solution au travail ? | Explication de l’utilisation et déroulement des activités |

Les deux explications décrivaient la même proposition, mais partaient de questions différentes. C’est un choix que je fais lorsque je documente : sélectionner le contenu et le niveau de détail selon ce que chaque personne doit comprendre.

## Partir d’un exemple connu pour expliquer quelque chose de nouveau

Dans une autre situation, j’ai dû expliquer une accumulation de courriels en attente d’envoi. Notre système utilisait SendGrid, un service d’envoi de courriels, par l’intermédiaire du protocole SMTP. Il était important de distinguer la transmission d’un message au service de son acheminement effectif vers sa destination.

J’ai utilisé le fonctionnement de la poste comme métaphore : notre système préparait la lettre et la déposait à la poste ; SendGrid était chargé de l’acheminer. Déposer la lettre ne signifiait toutefois pas qu’elle était déjà arrivée chez son destinataire.

Pour représenter l’accumulation, j’ai comparé le traitement à une file d’attente. Dans cette analogie, ajouter dix ou cent lettres ne faisait pas disparaître celles qui attendaient déjà. Il s’agissait d’une simplification pour expliquer le retard, et non d’une description exacte de l’ordre de livraison du service.

Cette comparaison aidait à expliquer pourquoi interrompre les nouvelles demandes d’envoi ne rétablirait pas immédiatement un fonctionnement normal : cela pouvait limiter la croissance de la file, mais les messages en attente devaient encore être traités. L’explication distinguait ce que notre système avait déjà demandé de ce que le service devait encore accomplir.

![Analogie postale : notre système demande l’envoi, SendGrid traite les messages en attente et les achemine vers les destinataires. Ajouter des messages ne résorbe pas le retard ; suspendre les envois ne vide pas la file. L’ordre et le délai de livraison peuvent varier.](images/smtp-postal-analogy.fr.png)

C’est le rôle que je donne aux analogies : offrir un point de départ familier, puis expliquer les détails techniques nécessaires à la situation.

## La communication fonctionne dans les deux sens

Adapter le langage est également nécessaire au sein des équipes techniques. Un développeur junior et un architecte peuvent avoir des expériences différentes. Les équipes de développement, d’assurance qualité et d’infrastructure abordent aussi un problème selon des responsabilités distinctes.

Je fais souvent le lien entre ces personnes. J’aide celles qui sont plus proches des métiers à structurer leurs besoins de façon plus systématique et j’encourage les professionnels techniques à expliquer leur raisonnement sans dépendre uniquement des termes de leur spécialité.

Ce que j’observe dans ces échanges, c’est une meilleure perception de la manière de communiquer : ce qui doit être expliqué et le langage qui facilite la compréhension.

Pour moi, la clarté fait partie du travail technique. Je cherche à contribuer à la construction de la solution tout en aidant les personnes concernées à comprendre ce que nous construisons, pourquoi cela est nécessaire et comment la solution sera utilisée.
