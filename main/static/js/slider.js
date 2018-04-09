var planetStatus = 0;

$('#container').imagesLoaded( { background: true }, function() {
    setTimeout(function(){
        $('body').removeClass('stop-scrolling');
        $('body').addClass('loaded');
        $( '#home' ).addClass('home-loaded');
    }, 0);
    

    function setPlanetOpacity0() {
        var tl = new TimelineLite({delay: .3}),
        planets = document.querySelectorAll('.home-back svg .planet-opacity');

        tl
        .to(planets, 0.3, {opacity: 0});
        if(planetStatus == 1) {
            tl
            .to(planets, 0.3, {opacity: 1});
        }
    }

    jQuery('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');
            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                // adding gal even class to make 2 and 4 element bigger
                if (imgURL.indexOf("values2.svg") >= 0 || 
                    imgURL.indexOf("values4.svg") >= 0 ){
                    $svg = $svg.attr('class', imgClass+' replaced-svg gal-even');
                } else {
                    $svg = $svg.attr('class', imgClass+' replaced-svg');
                }
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Replace image with new SVG
            $img.replaceWith($svg);
            if( !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) || window.width > 500 ) {
                if(imgURL == '/static/images/clouds/view1back.svg') {
                    var left_planet = $('circle#left_planet')
                    , left_line = $('circle#left_line')
                    , right_line = $('circle#right_line')
                    , small_planet = $('circle#small_planet')
                    , small_planet2 = $('circle#small_planet2')
                    , small_planet3 = $('circle#small_planet3')
                    , right_line2 = $('circle#right_line2')
                    , right_line3 = $('circle#right_line3');

                    setPlanetOpacity0();

                    //now call our Aimation at circle...
                    animateAtCircle(left_planet,left_line,50000, function(){console.log('finished');});
                    animateAtCircle(small_planet,right_line,15000, function(){console.log('finished');});
                    animateAtCircle(small_planet2,right_line2,20000, function(){console.log('finished');});
                    animateAtCircle(small_planet3,right_line3,35000, function(){console.log('finished');});
                }
            } else {
                if(imgURL == '/static/images/clouds/view1back.svg') {
                    planet1 = $('circle#mob-planet1')
                    , line1 = $('circle#mob-line1')
                    , planet2 = $('circle#mob-planet2')
                    , line2 = $('circle#mob-line2');

                    //now call our Aimation at circle...
                    animateAtCircle(planet1,line1,50000, function(){console.log('finished');});
                    animateAtCircle(planet2,line2,35000, function(){console.log('finished');});
                }
            }

        }, 'xml');

    });


    $('#menu-button').click(function() {
        $('body')[0].classList.toggle('stop-scrolling');
        $(this).context.parentElement.classList.toggle("menu-clicked");
    });

    // for menu links
    $('#menu-nav > a').on('click', function() {
        $('body')[0].classList.toggle('stop-scrolling');
        $('.menu')[0].classList.toggle("menu-clicked");
    });

    $('.bot').on('click', function() {
        $('.bot-chat').addClass('bot-open')
    });

    $('.bot-close-but').on('click', function() {
        $('.bot-chat').removeClass('bot-open');
    });

});

function checkForHover() {
    return ($('#home-process:hover').length === 1 ||
        $('#home-values:hover').length === 1 ||
        $('#home-open:hover').length === 1)
}

console.log('before animate circle');

var animateAtCircle = function (elementToAnimate, circlePath, duration, callback){
  //I would see:
  var imagesPerSecond = 60;
  //and calculate the sum of steps i need:
  var sumSteps = duration / (1000/imagesPerSecond);
  //an circle has 360 degrees
  //so my stepwidth is:
  var stepWidth = 360 / sumSteps;
  //let us begin with step 1
  var step = 1;
  //before, i need a Variable to store my Timeout
  var pathAnim;

  var len = 0;
  var slowmo = 3;
  //and begin with our animation function
  var anim=function(){

    if(checkForHover()) {
        len += stepWidth/slowmo;
        $('.home-back svg').css('opacity', '0.5');
    } else {
        len += stepWidth;
        $('.home-back svg').css('opacity', '1');
    }
    //rotate the circle relative
    //to the midpoint of circlePath
    elementToAnimate.attr("transform",`rotate(
      ${len},
      ${circlePath.attr('cx')},
      ${circlePath.attr('cy')}
      )`);

    //until step smaller then sumSteps
    if (true) {
      //set step to next step
      step ++
      //and wait for creating next rotation an call anim again...
      pathAnim = setTimeout(anim, 1000/imagesPerSecond);
    } else {
      //animation is finished;
      clearTimeout(pathAnim);
      //call callback function
      if (callback) return callback();
    }
  }
  //now call our anim loop function
  anim();
}

var sel;
$('.values ul > li').click(function() {
    sel = `div[id="${$(this).attr('id')}"]`;
    if($(`div[id="${$(this).attr('id')}"] .val-text-info`).height() < 300) {
        $(`div[id="${$(this).attr('id')}"] .val-text-info`).addClass('centered-jobs');
    }
    $('.values .val-inner').css('transform', 'translateX(-200%)');
    $(sel).css('transform', 'translate(0%, 0%)');
});

$('.values .return').click(function() {
    $(sel).css('transform', 'translateX(+200%)')
    $('.values .val-inner').css('transform', 'translateX(0%)');
});


if($('.jobs-sections.job-sec-active').next()[0] == undefined)
    $('.values .butt').addClass('butt-disable');


// if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || document.documentElement.clientWidth < 500 ) {
if(document.documentElement.clientWidth < 500) { 
    $('.gal-items').flickity({
      // options
      cellAlign: 'left',
      contain: true
    });
    console.log('chromefix');
    var vhFix = new VHChromeFix([
      {
        selector: '.sections section',
        vh: 100
      },
      {
        selector: '.bg1 svg',
        vh: 100
      },
      {
        selector: '.bg1',
        vh: 100
      },
      {
        selector: '#prlx-scene',
        vh: 100
      }
    ]);

    $('#fullpage').fullpage({
        autoScrolling: false,

    });

    $('.top-logo').click(function() {
        $.fn.fullpage.moveTo(1);
    });

    $.fn.fullpage.setFitToSection(false);

}



$(document).ready(function() {
    console.log('new document width ', document.documentElement.clientWidth);
    if(document.documentElement.clientWidth > 500 ) {
        $('#fullpage').fullpage({
            //Navigation
            menu: '#left-nav',
            easingcss3: 'cubic-bezier(1.000, -0.440, 0.265, 1.385)',
            scrollingSpeed: 800,

            afterLoad: function(anchorLink, index){
                var loadedSection = $(this);
                var imgClass = $('#bg1').attr('class');

                var section = $('section')[index-1];
                $(section).find('.content-hidden').addClass('content-visible').removeClass('content-hidden');
                
                if(index >= 4 && index < 8) showUpSteps(index)
                else if(index==8) showUpIndex8();
                else if (index == 1) showUpPlanets();
                else if (index==2) showUpGallery();

                // controlling scroll down
                if(index > 1 && index != 8 && index != 3) {
                    $("#scroll-down").addClass("scroll-dis");
                } else if (index == 8) {
                    $("#scroll-down .scroll-down").css('display', 'none');
                    $("#scroll-down .scroll-up").css('display', 'block');
                    $("#scroll-down").removeClass("scroll-dis");
                } else {
                    $("#scroll-down").removeClass("scroll-dis");
                    $("#scroll-down .scroll-down").css('display', 'block');
                    $("#scroll-down .scroll-up").css('display', 'none');
                }

                if(index==8) disableSocial();
                else addSocial();

                if(index == 3) {
                    setTimeout(function(){
                        $('#bg-top').css('display', 'none');
                    }, 0); // change to 100

                    if(typeof imgClass !== 'undefined') {
                        $('#bg1').attr('class', imgClass+' bg1-changed');
                    }
                    // add class to style fixed section
                    $("#container").addClass('value-active');
                    $("body").css('background-color', "#ff5719");
                    $(".menu-content").addClass('menu-change3sec');
                }
            },
            onLeave: function(index, nextIndex, direction) {
                if($('#val-info:hover').length === 1 || $('.bot-chat:hover').length===1) {
                    return false;
                }
                var leavingSection = $(this);
                var imgClass = $('#bg1').attr('class');

                var section = $('section')[index-1];
                $(section).find('.content-visible').addClass('content-hidden').removeClass('content-visible');
                
                // $('.step-anim h2').css('opacity', '0');
                // $('.step-desc p').css('opacity', '0'),
                // $('.step-desc .step-hidden-delay').css('opacity', '0');

                //using index to change background styles for 3rd section
                if(index == 3) {
                    // super efekt
                    $('#bg1').attr("class", "");
                    $("body").css('background-color', "black");

                    $("#container").removeClass('value-active');
                    $(".menu-content").removeClass('menu-change3sec');

                    setTimeout(function(){
                        $('#bg-top').css('display', 'block');
                    }, 100); // change to 100

                }

                if(index >= 4 && index < 8) {
                    showDownIndexStep(index);
                } else if (index==8) {
                    showDownIndex8();
                } else if(index==1) {
                    showDownPlanets();
                } else if(index==2) {
                    showDownGallery();
                }

            }

        });

        function disableSocial() {
            console.log('siema this is antonich');
            $('.social-links').addClass('disable-social');
        }

        function addSocial() {
            $('.social-links').removeClass('disable-social');
        }

        function showUpGallery() {
            var tl = new TimelineLite({delay: 0}),
            tl1 = new TimelineLite({delay: 0});

            gallery_items = document.querySelectorAll('.gallery div.gal-item');
            text_slider_button = document.querySelectorAll('.gal-content button');

            tl
            .to(gallery_items[0], 0.1, {opacity: 1})
            .to(gallery_items[1], 0.2, {opacity: 1})
            .to(gallery_items[2], 0.2, {opacity: 1})
            .to(gallery_items[3], 0.2, {opacity: 1})
            .to(gallery_items[4], 0.2, {opacity: 1})

            tl1
            .to(text_slider_button[0], 0.1, {opacity: 1})
            .to(text_slider_button[1], 0.1, {opacity: 1});
        }

        function showDownGallery() {
            var tl = new TimelineLite({delay: 0}),
            tl1 = new TimelineLite({delay: 0});

            gallery_items = document.querySelectorAll('.gallery div.gal-item'),
            text_slider_button = document.querySelectorAll('.gal-content button');
            
            tl
            .to(gallery_items[4], 0, {opacity: 0})
            .to(gallery_items[3], 0.1, {opacity: 0})
            .to(gallery_items[2], 0.1, {opacity: 0})
            .to(gallery_items[1], 0.1, {opacity: 0})
            .to(gallery_items[0], 0.1, {opacity: 0});

            tl1
            .to(text_slider_button[0], 0.2, {opacity: 0})
            .to(text_slider_button[1], 0.1, {opacity: 0});

        }

        function showDownPlanets() {
            var tl = new TimelineLite({delay: .1}),
            tl1 = new TimelineLite({delay: 0}),
            planets = document.querySelectorAll('.home-back svg .planet-opacity');
            home_div = document.querySelectorAll('#home .home-nav div');

            tl
            .to(planets, 0.3, {opacity: 0});

            tl1
            .to(home_div[3], 0.1, {opacity: 0})
            .to(home_div[2], 0.1, {opacity: 0})
            .to(home_div[1], 0.1, {opacity: 0})

        }

        function showUpPlanets() {
            planetStatus = 1;
            var tl = new TimelineLite({delay: .1}),
            tl1 = new TimelineLite({delay: 0}),
            planets = document.querySelectorAll('.home-back svg .planet-opacity');
            home_div = document.querySelectorAll('#home .home-nav div');

            tl
            .to(planets, 0.3, {opacity: 1});

            tl1
            .to(home_div[1], 0.1, {opacity: 1})
            .to(home_div[2], 0.1, {opacity: 1})
            .to(home_div[3], 0.1, {opacity: 1})  
        }


        function showDownIndex8() {
            var tl = new TimelineLite({delay: 0}),
            tl1 = new TimelineLite({delay: 0}),
            word  = document.querySelectorAll('#contact .cont-info'),
            title = document.querySelectorAll('#contact h2.step-hidden-delay'),
            desc = document.querySelectorAll('#contact .cont-sec-anim'),
            cont_info = document.querySelectorAll('#contact .cont-third-anim');


            tl
            .to(title, 0.1, {opacity: 0})
            .to(word, 0.1, {opacity: 0})
            .to(cont_info, 0.1, {opacity: 0})

            tl1
            .to(desc, 0.1, {opacity: 0})
        }

        function showDownIndexStep(index) {
            var tl = new TimelineLite({delay: .1}),
            word  = document.querySelectorAll('#step'+(index-3)+' .step-anim h2'),
            p_tag = document.querySelectorAll('#step'+(index-3)+' .step-desc p'),
            span_tag = document.querySelectorAll('#step'+(index-3)+' .step-desc span.step-hidden-delay');

             tl
            .to(word, .1, {opacity:0})  
            .to(p_tag, .1, {opacity:0})
            .to(span_tag, .1, {opacity:0});
        }

        function showUpIndex8() {
            var tl = new TimelineLite({delay: 0.1}),
            tl1 = new TimelineLite({delay: 0.1}),
            word  = document.querySelectorAll('#contact .cont-info'),
            title = document.querySelectorAll('#contact h2.step-hidden-delay'),
            desc = document.querySelectorAll('#contact .cont-sec-anim'),
            cont_info = document.querySelectorAll('#contact .cont-third-anim');


            tl
            .to(title, .4, {opacity: 1})
            .to(word, .3, {opacity: 1})
            .to(cont_info, .2, {opacity: 1})

            tl1
            .to(desc, .4, {opacity: 1})
        }

        function showUpSteps(index) {
          var tl = new TimelineLite({delay: 0}),
            firstBg = document.querySelectorAll('#step'+(index-3)+' .text__first-bg'),
            word  = document.querySelectorAll('#step'+(index-3)+' .step-anim h2'),
            p_tag = document.querySelectorAll('#step'+(index-3)+' .step-desc p'),
            span_tag = document.querySelectorAll('#step'+(index-3)+' .step-desc span.step-hidden-delay');

            tl
            .to(word, .5, {opacity:1})  
            .to(p_tag, .5, {opacity:1})
            .to(span_tag, .5, {opacity:1});
        }

        var text = $("#step1 .step-desc");
        var span = $("#step1 .step-desc span");
        var div1 = $('.bg1');
        var div2 = $('.bg1-changed');

        $(document).on("mousemove",function(e) {  
          var ax = ($(window).innerWidth()/2- e.pageX)/15;
          var ay = ($(window).innerHeight()/2- e.screenY)/15;
          var ztext = 10;
          var z = 0;

          TweenMax.to('.bg1', .9, {
            x: ax/2,
            y: ay/2,
          });
          // TweenMax.to('#step1-plx', 0.7, {transform:"rotateX("+(-ay/2)+"deg) rotateY("+(ax/2)+"deg)"});
          tweenParallax('.step', 0.7, -ay/2, ax/2);
          tweenParallax('.cont-par', 1, -ay/5, ax/5);
          // tweenParallax('.par', 0.7, ay, ax);
        });

        function tweenParallax(elem, time, ay, ax) {
          TweenMax.to(elem, time, {transform:"rotateX("+(ay)+"deg) rotateY("+(ax)+"deg)"});
        }

        // control buttons for openings
        $('.values .butt').on('click', function() {
            var button = $(this);
            var activeSec = $('.jobs-sections.job-sec-active');
            if (button.attr('id') == 'val-but-down') {
                if(activeSec.next()[0]) {
                    activeSec.removeClass('job-sec-active');
                    activeSec.next().addClass('job-sec-active');
                }
                if($('.jobs-sections.job-sec-active').next()[0] == undefined)
                    button.addClass('butt-disable');
                if($('.jobs-sections.job-sec-active').prev()[0])
                    $('#val-but-up').removeClass('butt-disable');
            } else {
                if(activeSec.prev()[0]) {
                    activeSec.removeClass('job-sec-active');
                    activeSec.prev().addClass('job-sec-active');
                }
                if($('.jobs-sections.job-sec-active').prev()[0] == undefined)
                    $('#val-but-up').addClass('butt-disable');
                if($('.jobs-sections.job-sec-active').next()[0])
                    $('#val-but-down').removeClass('butt-disable');
            }
        });

        $('#scroll-down .scroll-down').on('click',function() {
            $.fn.fullpage.moveSectionDown();
        });

        $('#scroll-down .scroll-up').on('click',function() {
            $.fn.fullpage.moveTo(1);
        });

        $('.top-logo').click(function() {
            $.fn.fullpage.moveTo(1);
        });
    }

});

if(document.documentElement.clientWidth > 500 ) {
    (function(){
        console.log('self function');
        var items = $('.gal-item');
        var pos = [];
        
        // when loaded positions are calculated
        var widthItems = $('.gal-items')[0].offsetWidth;
        var widthItem = $('.gal-item')[2].offsetWidth;
        var marginForFirst = (widthItems - (widthItems - (widthItems/5) + widthItem))/2;

        items.css('left', function(index) {
            // should include margins
            var widthItems = $('.gal-items')[0].offsetWidth / 5;
            var widthItem = $('.gal-item')[2].offsetWidth;
            pos.push((index * widthItems) + marginForFirst);
            return (pos[index]);
        });


        $($('.gal-item > p')[1]).css('display', 'block');
        $($('.gal-item > p')[3]).css('display', 'block');

        // place slider element before so can start from click prev
        var slides = $('.slider');
        slides.first().before(slides.last());

        // on button press
        $('.gal-btn > button').on('click', function() {
            var items = $('.gal-item');
            var trans_zero = 0;
            var items = $('.gal-item');
            // Register button
            var button = $(this);
            // Register active slide
            var activeSlide = $('.gal-center');

            slides = $('.slider');
            var activeSlide = $('.activeSlide');

            // Next function
            if (button.attr('id') == 'next') {
                var last_elem = $('.gal-item:eq(0)').clone(true);
                items.last().after(last_elem);
                items = $('.gal-item');
                items.last().css('left', '+100%');

                // Move first slide to the end so the user can keep going forward
                for(var i = 0; i < 5; i++) {
                    if(i == 0) {
                        items.first().css('left', '-100%');
                    } else if(i == 2) {
                        $(items[i]).css('left', pos[i-1]);
                        $(items[i]).removeClass('gal-center');
                    } else if (i == 3) {
                        $(items[i]).css('left', pos[i-1]);
                        $(items[i]).addClass('gal-center');
                    } else {
                        $(items[i]).css('left', pos[i-1]);
                    }
                    $($(items[i]).context.childNodes[3]).css('display', 'none');
                    $($($('.gal-item > svg')[i])[0]).context.classList.remove('gal-even');
                }
                setTimeout(function(){
                    // last element with timeout to add transition
                    $(items[i]).css('left', pos[i-1]);
                    items.first().remove();
                }, 50); // change to 100

                slides.last().after(slides.first());
                // Move active class to the right
                activeSlide.removeClass('activeSlide').next('.slider').addClass('activeSlide');

                // after clicking add text under svg only after 2 and 4
                $($(items[2]).context.childNodes[3]).css('display', 'block');
                $($(items[4]).context.childNodes[3]).css('display', 'block');

                // the same with colors
                $($($('.gal-item > svg')[2])[0]).context.classList.add('gal-even');
                $($($('.gal-item > svg')[4])[0]).context.classList.add('gal-even');

            } else if(button.attr('id') == 'prev') {
                var first_elem = $('.gal-item:eq(4)').clone(true);
                items.first().before(first_elem);
                first_elem.css('left', '-10%');
                items = $('.gal-item');
                // Move first slide to the end so the user can keep going forward
                for(var i = 5; i > 0; i--) {
                    if(i == 5) {
                        items.last().css('left', '+100%');
                    } else if(i == 2) {
                        $(items[i]).css('left', pos[i]);
                        $(items[i]).addClass('gal-center');
                    } else if(i == 3) {
                        $(items[i]).css('left', pos[i]);
                        $(items[i]).removeClass('gal-center');
                    } else {
                        $(items[i]).css('left', pos[i]);
                    }
                    $($(items[i]).context.childNodes[3]).css('display', 'none');
                    $($($('.gal-item > svg')[i])[0]).context.classList.remove('gal-even');
                }
                setTimeout(function(){
                    $(items[0]).css('left', pos[0]);
                    items.last().remove();
                }, 50);

                slides.first().before(slides.last());
                activeSlide.removeClass('activeSlide').prev('.slider').addClass('activeSlide');
                // Move active class to the left

                // after clicking add text under svg only after 2 and 4
                $($(items[1]).context.childNodes[3]).css('display', 'block');
                $($(items[3]).context.childNodes[3]).css('display', 'block');

                // the same with colors
                $($($('.gal-item > svg')[1])[0]).context.classList.add('gal-even');
                $($($('.gal-item > svg')[3])[0]).context.classList.add('gal-even');
            }

        });

        // recalc on resize
        $( window ).resize(function() {
            var widthItems = $('.gal-items')[0].offsetWidth;
            var widthItem = $('.gal-item')[2].offsetWidth;
            var marginForFirst = (widthItems - (widthItems - (widthItems/5) + widthItem))/2;
            items = $('.gal-item');
            items.css('left', function(index) {
                widthItems = $('.gal-items')[0].offsetWidth / 5;
                widthItem = $('.gal-item')[2].offsetWidth;
                // pos.push((index * widthItems) + marginForFirst);
                pos[index] = (index * widthItems) + marginForFirst;
                return (pos[index]);
            });
        });

    })();
}