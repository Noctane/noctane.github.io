---
layout: post
title:  "FadeOut et FadeIn au changement de page"
date:   2016-02-07 12:00 +0100
categories: articles
excerpt_separator: <!--more-->
---

Un effet sympa et pas compliqué à faire avec jQuery, c'est le fondu au changement de page. En plus de l'effet de style, cela rend la navigation plus agréable dans la mesure ou la durée du fondu n'est pas trop longue...
<!--more-->

Pour commencer il faut encapsuler le contenu de votre site dans une div et lui donner un ID.

{% highlight html %}
<div id="fade">
  <!-- Contenu -->
</div>
{% endhighlight %}

Il faut ensuite mettre un `display: none` à cette div

{% highlight css %}
#fade {
  display: none;
}
{% endhighlight %}

Si vous rechargez votre page, vous ne voyez rien. Pas de panique c'est normal.
Tout d'abord rajoutez la librairie jQuery à votre site, créez un fichier `app.js` et appelez les avant la fermeture de votre balise `</body>` :

{% highlight html %}
`<script src="chemin/jquery-2.2.0.min.js"></script>
<script src="chemin/app.js"></script>`
{% endhighlight %}

Maintenant la partie rigolote, on va commencer par mettre en place le fadeIn au chargement de la page.
Avant d'utiliser jQuery, il faut lui dire d'attendre que le DOM soit complètement chargé. Dans notre fichier `app.js` nous allons écrire :

{% highlight javascript %}
$(document).ready(function(){
    //Quand le DOM est chargé, faire ce qui suit

  });
{% endhighlight %}

Et on ajoute le fadeIn au chargement :

{% highlight javascript %}
$(document).ready(function(){
    //Quand le DOM est chargé, faire ce qui suit

    $("#fade").fadeIn(800);

  });
{% endhighlight %}

Analysons la ligne que nous venons de rajouter :

* `$("#fade")` cible la div avec l'ID "fade", remarquez le "#" devant fade, comme en CSS.
* `.fadeIn(800)` est l'instruction jQuery où le nombre entre parenthèse correspond à la durée de l'effet en milliseconde, ici 800ms.
* `;` ferme l'instruction. Comme un point à la fin d'une phrase.

Afin de s'aider à comprendre une ligne de code (ou un pavé), il est intéressant de lui donner une forme littéraire. On peut traduire l'exemple précédent comme suit :

> Sélectionne l'élément #fade et applique lui l'effet "fadeIn" pour une durée de 800ms

Non seulement vous comprendrez mieux le code que vous lisez, mais vous utiliserez également cette technique pour vous aider à créer vos propre instructions. C'est ce que nous allons faire pour la suite de notre script.

Décrivons ce que nous voulons :

> Quand je clique sur mon lien, je veux que la page en cours fadeOut et que la page de destination fadeIn.

Ici nous avons déjà d'ores-et-déjà réglé le problème du fadeIn de la page de destination. Pourquoi ?
Tout simplement, quand nous cliquant sur un lien de manière générale, le DOM va changer et donc se recharger. Du coup notre première instruction (voir plus haut) fonctionne toujours, pas besoin de la répéter.

> DRY ou Don't Repeat Yourself est une règle d'or quand on fait de la programmation. Votre code doit pouvoir être réutilisable et modulable.

Passons donc à la partie "je clique sur mon lien".
Tout d'abord, donner un ID au lien sur lequel vous souhaitez appliquer l'effet. Ici, nous allons lui donner l'ID `#link`
Nous l'avons vu sur la première instruction, nous sélectionnons d'abord l'élément avant de lui appliquer un effet ou un évènement. Voici ce que ça donne :

{% highlight javascript %}

  $("#link").click();

{% endhighlight %}

Ici nous avons sélectionné l'élément et nous lui avons indiqué de surveiller quand un clic aura lieu sur cet élément. Il nous reste à lui dire quoi faire. Pour cela nous allons passer une fonction comme argument à l'instruction `.click`.

{% highlight javascript %}

  $("#link").click(function() {
    // Faire quelque chose
    });

{% endhighlight %}

Nous allons être confronter à un premier problème qui fait que lorsqu'on clique sur un lien il nous emmène sur la page souhaitée. C'est ce qu'on veut, mais avant ça, nous voulons un fadeOut sur la page. Nous allons donc demander à jQuery d'enlever le comportement initial du lien :

{% highlight javascript %}

  $("#link").click(function() {
    event.preventDefault();
    });

{% endhighlight %}

Le lien ne fonctionnant plus, nous pouvons rajouter le fadeOut à la page.

{% highlight javascript %}

  $("#link").click(function() {
    event.preventDefault();
    $("#fade").fadeOut(400);
    });

{% endhighlight %}

Le fadeOut fonctionne mais nous avons une page vide quand nous cliquons sur notre lien. Il faut donc rajouter une instruction pour que l'évènement nous charge la page souhaitée.

Les instructions Javascript se font dans l'ordre où nous les indiquons, c'est-à-dire qu'elles vont s'executer les une après les autres suivant l'ordre où elles sont écrites. En l'occurence, sur le script ci-dessus nous supprimons le comportement par défault du lien __et ensuite__ nous masquons le contenu de la page, donc plus de lien à la dernière étape du script pour naviguer sur la page de destination.

Etant donné que nous avons supprimé le comportement par défaut du lien, nous allons établir la navigation à l'aide de Javascript.
Javascript nous permet de cibler les attributs de certains éléments HTML, or la balise `<a>` dispose de l'attribut indispensable pour naviguer : `href`.

Pour rétablir notre navigation nous allons récupérer la valeur de l'attribut `href` avant la disparition de la page et nous allons le stocker dans une variable que nous allons appeler `dest` :

{% highlight javascript %}

  $("#link").click(function() {
    event.preventDefault();
    var dest = this.href;
    $("#fade").fadeOut(400);
    });

{% endhighlight %}

Le mot-clé `this` fait référence à l'objet sur lequel nous travaillons, dans notre cas il s'agit de `#link`.

L'instruction `.fadeOut()` peut prendre un deuxième paramètre en plus de la durée de l'effet. Ce deuxième paramètre est une fonction à appeler une fois que l'animation est terminée. Dans notre cas nous allons rajouter la fonction permettant de nous emmener vers la page de destination.

{% highlight javascript %}

  $("#link").click(function() {
    event.preventDefault();
    var dest = this.href;
    $("#fade").fadeOut(400, function(){
      window.location = dest;
      });
    });

{% endhighlight %}

`window.location` fait référence à l'url spécifiée dans la fenêtre ou l'onglet de votre navigateur. Dans notre cas nous indiquons que cette url doit correspondre à la variable `dest` que nous avons indiqué plus haut, donc la valeur de l'attribut `href` du lien cliqué.

Voici le script en entier :

{% highlight javascript %}

$(document).ready(function(){

    $("#fade").fadeIn(800);

    $("#link").click(function() {
      event.preventDefault();
      var dest = this.href;
      $("#fade").fadeOut(400, function(){
        window.location = dest;
        });
      });
});

{% endhighlight %}

On peut l'écrire littéralement comme suit :

> Faire apparaître le contenu de la page.
> Quand on clique sur le lien, on supprime son comportement par défaut, on stocke l'attribut href du lien dans une variable, on masque la page, et on remplace l'url dans la fenêtre par celle stockée dans la variable 'dest'.

Et voilà, un petit script simple pour donner un effet sympathique à vos pages. A noter cependant que ce genre de pratique n'est pas très "user-friendly" si on l'utilise telle quelle. Le fait est que si une personne a désactivé le Javascript de son navigateur, il n'aura pas la possibilité de voir la page. De plus, nous supprimons le comportement par défaut de la balise `<a>` ce qui n'est pas une bonne pratique en terme d'accessibilité web.
