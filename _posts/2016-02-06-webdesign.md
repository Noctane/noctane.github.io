---
layout: post
title:  "Un peu de WebDesign"
date:   2016-02-06 12:00 +0100
categories: articles
excerpt_separator: <!--more-->
---

La semaine passé je n’ai pas posté d’articles. J’ai réglé de nouveaux soucis avec Jekyll et Codekit puis je me suis penché sur le design du blog.

Comme vous le voyez (ce n’est pas terminé…) j’ai souhaité donner un style épuré, sobre et donnant la priorité au contenu.
<!--more-->

Evidemment je m’inspire largement de la lecture zen du site du Monde par exemple, mais aussi du site Medium que je vous invite à parcourir.

Mais j’aimerais surtout vous parler de l’organisation des feuilles de style de Jekyll (et donc de ce blog).

Jekyll dispose d’un dossier `_sass` contenant trois fichiers SCSS :

+ `_base.scss`
+ `_layout.scss`
+ `_syntax-highlighting.scss`

Et d’un dossier `css` contenant le fichier `main.scss` qui importe les fichiers cités précédemment.

Ces fichiers regroupe tout les styles de base de Jekyll et, bien qu’elles soient relativement brèves, il n’est pas évident de s’y retrouver.

## Un zeste de structure

Depuis que j’utilise SASS, j’ai pris cette habitude d’organiser mon style dans plusieurs fichiers bien spécifiques aux éléments que je met en forme. Par exemple, j’aime bien avoir une feuille de style pour mon header, une feuille pour le footer et autant de feuilles qui mettrons en forme chaque modules dont j’aurais besoin.

Quand j’ai commencé à travaillé le design de ce blog, je me suis pas trop préoccupé des styles de base de Jekyll (police, rythme vertical, etc…). J’ai commencé par réagencer le composants comme le header et l’affichage des posts.
J’ai alors créé les fichiers `_header.sass` et `_posts-list.sass`. Ces deux fichiers mettront en forme que ces deux composants et j’en ferai de même pour les autres.

L’avantage de cette pratique dans un environnement de développement est d’éviter d’avoir une seule feuille de style de six pieds de long. Compartimenter son design permet de s’y retrouver rapidement, de réutiliser des modules et de gagner en efficacité dans la conception et le débugage.
