---
layout: post
title:  "Jekyll et Codekit"
date:   2016-01-26 22:58:30 +0100
categories: articles
excerpt_separator: <!--more-->
---

Parce que je suis un inconditionnel de SASS, que je ne voulais pas m'ennuyer à créer des tâches Gulp et à faire vivre tout ce beau monde en harmonie, j'ai voulu essayer Codekit.
<!--more-->
Codekit, c'est une app d'un gars de San Diego qui, comme moi, voulait pas se prendre la tête à compiler son SASS en ligne de commande ou encore écrire une soupe en JS pour faire tout ça. Il a donc créé Codekit.

Cette app permet grosso-modo de compiler à la volée votre SASS/LESS/Stylus et de rafraichir automatiquement votre navigateur quand il détecte des changements. Il compile d'autre trucs aussi, mais c'est pas le sujet.

Histoire de me jeter dans le bain, et rendre mon blog opérationnel tout de suite, j'ai donc utilisé le couple Jekyll/Codekit. Et bien ça marche pas comme on veut.

## C'est quoi le problème avec Jekyll et Codekit ?
Jekyll compile déjà de son côté le Markdown en HTML ce qui fait conflit avec Codekit. Concernant le SASS, je n'ai pas relevé de problème pour le moment, les deux cohabitent normalement.

Mais pour arriver à cela il faut être prudent et pas faire n'importe quoi ! Pas comme moi quoi...

En faisant mes petites recherches, je suis tombé sur le blog d'une certaine [Katrina Hussain](http://katrinahussain.com/) qui m'a mis sur une piste :

1. Générer son blog Jekyll et lancer `jekyll build --watch` en ligne de commande
2. Ajouter son projet dans Codekit, aller dans les options (petite roue dentée) et cliquer sur Browser Refreshing
3. Dans *Document-Root Subpath* indiquer le dossier `_site`de votre blog. Visiblement, le Markdown met plus de temps à se compiler qu'un autre (peut-être le compileur Jekyll), mettez alors le *Refresh Delay* à _0.25s_.

![Screenshot Document-Root Subpath](/assets/img/browser-refresh.png)

Là, on a dit à Codekit de rafraichier que le dossier `_site`, c'est déjà pas mal mais on a toujours une double compilation entre nos deux outils, dont une qui va se fourrer au mauvais endroit et qui vous met le bordel dans votre fil.

La solution la plus simple que j'ai trouvé c'est de désactiver la compilation Markdown de Codekit.

![Screenshot Markdown-disable](/assets/img/markdown-disable.png)

La solution est finalement toute bête et pourvu qu'elle marche.

Par ailleurs pendant mes recherches, je suis tombé sur une [request](https://github.com/bdkjones/CodeKit/issues/232) sur le repo GitHub de Codekit pour un support Jekyll. Datant de 2014, je doute que ça va se faire, d'autant plus que les developpeurs se sont plutôt penchés sur une autre solution...
Cela dit, j'y ai trouvé quelques éléments de réponses à mon problème, peut-être qu'en parcourant le thread vous aurez de meilleures idées que moi.
