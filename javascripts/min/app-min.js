$(document).ready(function(){$("#page").fadeIn(800),$(".page-link, .post-link, .readmore-link").click(function(){event.preventDefault();var e=this.href;$("#page").fadeOut(400,function(){window.location=e})})});