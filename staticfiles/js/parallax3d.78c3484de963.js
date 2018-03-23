// why it doesn't work on firefox?
var card = $(".card");

var text = $("p");
var h1 = $('h1');
var div1 = $('#bg1');
var div2 = $('#bg2');

$(document).on("mousemove",function(e) {  
  var ax = -($(window).innerWidth()/2- e.pageX)/140;
  var ay = ($(window).innerHeight()/2- e.pageY)/150;
  // card.attr("style", "transform: rotateY("+ax+"deg) rotateX("+ay+"deg);-webkit-transform: rotateY("+ax+"deg) rotateX("+ay+"deg);-moz-transform: rotateY("+ax+"deg) rotateX("+ay+"deg)");
  text.attr("style", "transform: rotateY("+ax+"deg) rotateX("+ay+"deg) translateZ(80px);")
  h1.attr("style", "transform: rotateY("+ax+"deg) rotateX("+ay+"deg) translateZ(80px);")
  div1.attr("style", "transform: rotateY("+ax+"deg) rotateX("+(-ay)+"deg) translateZ(40px);")
  div2.attr("style", "transform: rotateY("+(ax)+"deg) rotateX("+(-ay)+"deg) translateZ(40px);")
});