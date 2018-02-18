 /*****************************************************************************
	CONTACT FORM - you can change your notification message here
*****************************************************************************/
   $(document).ready(function(){	
			$("#ajax-contact-form").submit(function() {
				var str = $(this).serialize();		
				$.ajax({
					type: "POST",
					url: "contact_form/contact_process.php",
					data: str,
					success: function(msg) {
						// Message Sent - Show the 'Thank You' message and hide the form
						if(msg == 'OK') {
							result = '<div class="notification_ok">Your message has been sent. Thank you!</div>';
							$("#fields").hide();
						} else {
							result = msg;
						}
						$('#note').html(result);
					}
				});
				return false;
			});	
			
// preloader
$(window).load(function() { $('#status').fadeOut();
	$('#preloader').delay(350).fadeOut('slow');
		$('body').delay(350).css({'overflow':'visible'});
		})
			
/*****************************************************************************
	CSS3 ANIMATIONS
*****************************************************************************/
	jQuery('.fadeIn').appear(function() {
		$('.fadeIn').each(function(){
			$(this).addClass("fadeIn");
		});
	});
	jQuery('.hi-icon-fade').appear(function() {
		$('.hi-icon-fade').each(function(){
			$(this).addClass("fadeIn");
		});
	});
	jQuery('.grida').appear(function() {
		$('.grida').each(function(){
			$(this).addClass("slideRight");
		});
	});
	jQuery('.pricing').appear(function() {
		$('.pricing').each(function(){
			$(this).addClass("slideRight");
		});
	});
	jQuery('.top').appear(function() {
		$('.top').each(function(){
			$(this).addClass("bounce");
		});
	});
	jQuery('.pie').appear(function() {
		$('.pie').each(function(){
			$(this).addClass("fadeIn");
		});
	});
	jQuery('.counter').appear(function() {
		$('.counter').each(function(){
			$(this).addClass("fadeIn");
		});
	});
	jQuery('.fadeit').appear(function() {
		$('.fadeit').each(function(){
			$(this).addClass("fadeIn");
		});
	});
	jQuery('.fadeit2').appear(function() {
		$('.fadeit2').each(function(){
			$(this).addClass("fadeIn");
		});
	});
	

/*****************************************************************************
	GOOGLE MAP - ADD YOUR ADDRESS HERE
******************************************************************************/	
$(window).load(function() {
	$(".google-maps").gmap3({
    marker:{     
address:"535, Mission, San Francisco",  options:{icon: "img/marker.png"}},
    map:{
      options:{
	zoom: 13,
	scrollwheel:false,
	mapTypeControl: false,
    scaleControl: false,
    zoomControl: true,
	disableDefaultUI: true,
	draggable: true}
		} });	
	});	
});

// header shrink
$(window).scroll(function () {
    if ($(document).scrollTop() == 0) {
        $('.header').removeClass('tiny');
    } else {
        $('.header').addClass('tiny');
    }
});
// navigation
$('.nav').localScroll(6000);
$('#top').localScroll(6000);
	

/* ===========================================================
* jquery-simple-text-rotator.js v1
* ===========================================================
* Copyright 2013 Pete Rojwongsuriya.
* http://www.thepetedesign.com
* https://github.com/peachananr/simple-text-rotator
* ========================================================== */
!function($){var defaults={animation:"dissolve",separator:",",speed:2000};$.fx.step.textShadowBlur=function(fx){$(fx.elem).prop("textShadowBlur",fx.now).css({textShadow:"0 0 "+Math.floor(fx.now)+"px black"})};$.fn.textrotator=function(options){var settings=$.extend({},defaults,options);return this.each(function(){var el=$(this);var array=[];$.each(el.text().split(settings.separator),function(key,value){array.push(value)});el.text(array[0]);var rotate=function(){switch(settings.animation){case"dissolve":el.animate({textShadowBlur:20,opacity:0},500,function(){index=$.inArray(el.text(),array);if((index+1)==array.length){index=-1}el.text(array[index+1]).animate({textShadowBlur:0,opacity:1},500)});break;case"flip":if(el.find(".back").length>0){el.html(el.find(".back").html())}var initial=el.text();var index=$.inArray(initial,array);if((index+1)==array.length){index=-1}el.html("");$("<span class='front'>"+initial+"</span>").appendTo(el);$("<span class='back'>"+array[index+1]+"</span>").appendTo(el);el.wrapInner("<span class='rotating' />").find(".rotating").hide().addClass("flip").show().css({"-webkit-transform":" rotateY(-180deg)","-moz-transform":" rotateY(-180deg)","-o-transform":" rotateY(-180deg)",transform:" rotateY(-180deg)"});break;case"flipUp":if(el.find(".back").length>0){el.html(el.find(".back").html())}var initial=el.text();var index=$.inArray(initial,array);if((index+1)==array.length){index=-1}el.html("");$("<span class='front'>"+initial+"</span>").appendTo(el);$("<span class='back'>"+array[index+1]+"</span>").appendTo(el);el.wrapInner("<span class='rotating' />").find(".rotating").hide().addClass("flip up").show().css({"-webkit-transform":" rotateX(-180deg)","-moz-transform":" rotateX(-180deg)","-o-transform":" rotateX(-180deg)",transform:" rotateX(-180deg)"});break;case"flipCube":if(el.find(".back").length>0){el.html(el.find(".back").html())}var initial=el.text();var index=$.inArray(initial,array);if((index+1)==array.length){index=-1}el.html("");$("<span class='front'>"+initial+"</span>").appendTo(el);$("<span class='back'>"+array[index+1]+"</span>").appendTo(el);el.wrapInner("<span class='rotating' />").find(".rotating").hide().addClass("flip cube").show().css({"-webkit-transform":" rotateY(180deg)","-moz-transform":" rotateY(180deg)","-o-transform":" rotateY(180deg)",transform:" rotateY(180deg)"});break;case"flipCubeUp":if(el.find(".back").length>0){el.html(el.find(".back").html())}var initial=el.text();var index=$.inArray(initial,array);if((index+1)==array.length){index=-1}el.html("");$("<span class='front'>"+initial+"</span>").appendTo(el);$("<span class='back'>"+array[index+1]+"</span>").appendTo(el);el.wrapInner("<span class='rotating' />").find(".rotating").hide().addClass("flip cube up").show().css({"-webkit-transform":" rotateX(180deg)","-moz-transform":" rotateX(180deg)","-o-transform":" rotateX(180deg)",transform:" rotateX(180deg)"});break;case"spin":if(el.find(".rotating").length>0){el.html(el.find(".rotating").html())}index=$.inArray(el.text(),array);if((index+1)==array.length){index=-1}el.wrapInner("<span class='rotating spin' />").find(".rotating").hide().text(array[index+1]).show().css({"-webkit-transform":" rotate(0) scale(1)","-moz-transform":"rotate(0) scale(1)","-o-transform":"rotate(0) scale(1)",transform:"rotate(0) scale(1)"});break;case"fade":el.fadeOut(settings.speed,function(){index=$.inArray(el.text(),array);if((index+1)==array.length){index=-1}el.text(array[index+1]).fadeIn(settings.speed)});break}};setInterval(rotate,settings.speed*2)})}}(window.jQuery);
    $(".rotate").show();
		$(".rotate").textrotator({
	      animation: "fade",
	      separator: "*",
	      speed: 2000
	    });

//modal	
	;(function($){
	function update(modal) {
		modal.find('.modal-body').outerHeight(
			modal.innerHeight() -
			modal.find('.modal-header').outerHeight() -
			modal.find('.modal-footer').outerHeight()
		);
	}

	if ($.fn.modal) {
		var bigmodals = $(),
				modal;

		$(window).resize(function() {
			bigmodals.filter(':visible').each(function() {
				update($(this));
			});
		});

		$.fn.bigmodal = function(option) {
			var ret = $.fn.modal.apply(this, arguments);
			this.addClass('bigmodal');
			bigmodals = bigmodals.add(this);
			this.on('shown', function(){
				update($(this));
			});
			return ret;
		};
	}
	else {
		$.fn.bigmodal = function(option){
			return this;
		};
	}
}(window.jQuery));

/*****************************************************************************
	PARALLAX BACKGROUNDS
******************************************************************************/
( function ( $ ) {
'use strict';
$(document).ready(function(){
$(window).bind('load', function () {
		parallaxInit();						  
	});
	function parallaxInit() {
		testMobile = isMobile.any();
		if (testMobile == null)
		{
	$('#Section-top .well').parallax("50%", 0.3); 
	$('#Section-1 .well').parallax("0%", 0.3); 
	$('#Section-2 .well').parallax("0%", 0.3); 
	$('#Section-bigstats .well').parallax("0%", 0.3); 
		}
	}	
	parallaxInit();	 
});	
//Mobile Detect
var testMobile;
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};
}( jQuery ));

/*******************************************************************************
	ONSCROLL
********************************************************************************/

$(document).ready(function(){       
   var scroll_start = 0;
   var startchange = $('#Section-top');
   var offset = startchange.offset();
    if (startchange.length){
   $(document).scroll(function() { 
      scroll_start = $(this).scrollTop();
      if(scroll_start > offset.top) {
          $(".header").css('background-color', 'transparent');
          // $("#Section-1").css('border-color', '#ffe14a');
       }
   });
    }
});

// navbar to yellow when gets to about me
// border color of about to yellow
$(document).ready(function(){       
   var scroll_start = 0;
   var startchange = $('#Section-1');
   var offset = startchange.offset();
    if (startchange.length){
   $(document).scroll(function() { 
      scroll_start = $(this).scrollTop();
      if(scroll_start > offset.top) {
          $(".header").css('background-color','transparent');
          // $("#Section-1").css('border-color', '#ffe141');
       }
   });
    }
});



// ---------------------------------------------------------------------
// Making arrays and objects for gird system

/* This function loofs through the objects in the above array and 
displayes them in the HTML where the corresponding id and classes are*/

 $(document).ready(function(){

 	// First I need to make an array of objects (creating the data that will be used)
// This array will have an object with an image, text for an h5 and text for an h3

var gridObject = [
	
	{

		image: 'url(img/work/sfdogs.jpg)',
		title: 'Bootstrap',
		info: 'Dog Grooming for People who Love their Dogs',
		id: '#sfdogs'
	},

	{
		image: 'url(img/work/todo.jpg)',
		title: 'Vue JS',
		info: 'Keep Track of Daily Tasks with Vue Js',
		id: '#todo'
	},

	{
		image: 'url(img/work/books.jpg)',
		title: 'JavaScript, CSS',
		info: 'Find a Book, Author or Genre to Explore',
		id: '#bookly'
	},

	{
		image: 'url(img/work/earth.jpg)',
		title: 'JavaScript',
		info: 'Play with a Virtual Spaceship',
		id: '#clock'
	},

	{
		image: 'url(img/work/sep.jpg)',
		title: 'HTML, CSS, Angular JS',
		info: 'An Old website Turned New',
		id: '#sep'
	},

	{
		image: 'url(img/work/music.jpg)',
		title: 'JavaScript',
		info: 'Challenge your Music Knowledge',
		id: '#quiz'
	},

	{
		image: 'url(img/work/zodiac.jpg)',
		title: 'JQuery',
		info: 'See your Zodiac Horoscope',
		id: '#zodiac'
	},

	{
		image: 'url(img/work/demfy.jpg)',
		title: 'Angular JS',
		info: 'Interactive login Application built with Angular',
		id: '#demfy'
	}, 

	{
		image: 'url(img/work/orange.jpg)',
		title: 'CSS, HTML',
		info: 'PSD Replication of an Amazing Website',
		id: '#orangejuice'
	},

	{
		image: 'url(img/work/typing.jpg)',
		title: 'JavaScript, CSS',
		info: 'Leave a Comment, Hide a Comment or Take Back what You Said',
		id: '#comment'
	}

];


	// This Puts the info from the array into the respected HTML elements
 	for (i = 0; i < gridObject.length; i++) {

 		$(gridObject[i].id).css("background-color", "#fff")
	 	$(gridObject[i].id).children('.img-here').css({"background-image": gridObject[i].image});
	 	$(gridObject[i].id).children('.proj-title').html(gridObject[i].title);
	 	$(gridObject[i].id).children('.proj-info').html(gridObject[i].info);

	 	// Gives COLOR to gridboxes when hovered
	 	$(gridObject[i].id).mouseenter(function() {
 		$(this).children('img').css({"filter":"grayscale(0%)", "background-size":"110% 110%"})
 	})
	 	// Makes Gridboxes greyscale when house leaves
	 	$(gridObject[i].id).mouseleave(function() {
 		$(this).children('img').css({"filter":"grayscale(95%)", "background-size":"100% 100%"})
 	})


 	};

 	


 })





/* This function puts the original content in divs then when button is clicked it changes div 
	content, then when clicked again it goes back to original content and then disables button */

 // I need to figure out how to make the button toggle between content and not get disabled


 // On document ready make the original 1st oject appear
 // $(document).ready(function() {
 // 	// I need to make an array of abjects with the paragraph in it and a background image property

 // 	var myArray = [
 // 		{
 // 			img: 'url(img/me.jpg)',
 // 			paragraph: 'I create groundbreaking user experiences with an empathetic approach to web applications. I Love to create! Making a website intuitive is my goal and I do this by keeping things simple and consistent. I enjoy working in teams and building an idea that will impact peoples lives. I have a knack for problem solving and creating something helpful.'
 // 		},

 // 		{
 // 			img: 'url(img/me2.jpg)', 
 // 			paragraph: 'Born and raised in San Francisco, I departed to the University of Nevada, Reno to study Chemical Engineering in fall 2010. After earning my bachelors degree I pursued an entrepreneurial opportunity in the Cannabis Industry that processed cannabis waste into an oil used for medicinal purposes. I stepped closer to my passion in 2016 after learning front-end development. The ability to create any idea I had was a dream form me. I have spent the last year freelancing, diving into Vue JS, UI/UX design, Artificial Intelligence, Blockchain and Creative Design.'
 // 		}
 // 	];

 // 	$('#my-info').html(myArray[0].paragraph);
 // 	document.getElementById('new-img').style.backgroundImage = myArray[0].img;
 // 	// ig button is clicked change picture and paragraph to snow boarding pic
 // 	document.getElementById('learnMore').addEventListener("click", function() {
 // 		$('#learnMore').css("margin-top", "1rem");
 // 		$('#my-info').hide();
 // 		$('#my-info').html(myArray[1].paragraph).show();
 // 		document.getElementById('new-img').style.backgroundImage = myArray[1].img;
 // 		// If button is clicked again change content back to original picture and paragraph
 // 		$('#learnMore').click(function() {
 // 			$('#my-info').html(myArray[0].paragraph);
 // 			document.getElementById('new-img').style.backgroundImage = myArray[0].img;
 // 		});
 // 	})
 // })

 // Array for content inside My Work
 var myWork = [
 	{
 		text: 'Portfolio',
 		image0: 'url(img/paint3.jpg)',
 		info0: ' I like to think! Using empathy, deep thought, and analytical thinking is how I solve a tough problem. As a Front-End Developer I emphasize an elegant UX & UI. I am proficent with the basics (JavaScript, HTML, CSS) while I am enhancing my MVC framework abilities. I have touched on Angular and Vue. Now I am learning React Redux, which I like a lot more.   <br><br> Artificial Intelligence, Blockchain, Advertising or any technology that can help impact peoples lives in a positive way are of interest to me.',
 		link: ""
 	},

 	{
 		text: 'Front-End Developer',
 		image0: 'url(img/work/sep.jpg)',
 		info0: 'South East Pathology specializes in selling and servicing refurbished histology equipment. I helped fix their website by redesigning and rebuilding layouts and functionality using HTML, CSS and JavaScript for southeastpathology.com. I also worked with Angular JS for two weeks to develop a routing enhancement for 80+ product instrument pages. I have been on this project for over 4 months, we are almost finished!',
 		link: "southeastpathology.com"
 	},

 	{
 		text: 'UX Designer',
 		image0: 'url(img/work/sfdogs.jpg)',
 		info0: 'Owned 3 month project building a responsive website including a interactive elements, contact forms and an image gallery with Bootstrap. Had ownership of UX Design and UX Research. I interviewed customers and monitored Google Analytics to gain user research to improve the products Mobile layout. This lead to an 80% increase in new users over 2 months. <br><br> I used media querries to enhance and maintain mobile functionality.',
 		link: "sfdogparlour.com"
 	},

 	{
 		text: 'Front-End Developer',
 		image0: 'url(img/work/audioist.png)',
 		info0: 'Lead a project in a team of 4 to the creation of a chat bot integrated with dialogflow. I also designed the conversation flow, personality, and overall emotional response generated while interacting with the bot. <br><br> Team members and I organized meetings and recruited technical talent to work on the project. This was a great experience working with other developers and learning how to respect each members role.',
 		link: "audioist.ai"
 	},

 	{
 		text: 'UX Designer',
 		image0: 'url(img/thumb.jpg)',
 		info0: 'The goal of my portfolio was to create an experience that virtually represents myself. I chose stimulating colors to attract colorful and uniquely cultured companies. <br><br> I build this portfolio from scratch using HTML, CSS, JavaScript and JQuery. Building this site has tested my design and programming skills but has given me confidence to want to build for others.',
 		link: ""
 	},
 	
 ];
 	


/* This function will change the width of the left box and right box while changing the 
background-color of the left box and changing the picture in the right box. It will also 
display a next and previous button at the bottom of the left box for the slide show.
It will also display an X at the top right of the left box to exit out of the slide show and go 
back to the original display*/

$(document).ready(function() {
	$('.fa-times, .x, .prev, .next').hide();
	$('#workDescription').html(myWork[0].info0);
	$('.right-side2').css("background-image", "url('img/paint3.jpg')")
	
	// Function for ViewSlideshow Button
	$('#viewSlides').on("click", function(slides) {
		$('.fa-times, .x, .prev, .next').show();
		$('#viewSlides').hide();
		$('.left-side2').toggleClass("col-md-5, col-lg-5");
		$('.left-side2').css({"background-color":"#ffe14a", "transition":".5s"});
		$('.left-side2').children('h2').css("color", "#fff");
		$('#workHead').css("color", "rgb(29, 33, 36)")
	
		$('#workDescription').css("color", "#828e96");
		$('.right-side2').removeClass("col-md-6, col-lg-6");
		$('.right-side2').toggleClass("col-md-7, col-lg-7");
		$('#workHead').html(myWork[1].text)
	$('.right-side2').css("background-image", myWork[1].image0)
	$('#workDescription').html(myWork[1].info0);
	$('#site-link').html(myWork[1].link);
	$('#site-link').attr({'href':'http://rabinowitzwebdesign.com/', 'target':'_blank'});
	});

	// Function for box shadow on about me picture
	$('.left-side').hover(function() {
		$('.right-side').css({"box-shadow":"0px 0px 0px #fff", "transition":".5s"}); 
		}, function() {
			$('.right-side').css({"box-shadow":"0px 7px 300px #fff", "transition":"2s" });
	});






	// Exit Button
	$('.x').click(function() {
		$('#workDescription').html(myWork[0].info0);
		$('.right-side2').css("background-image", "url('img/paint3.jpg')");
		$('.x, .prev, .next').hide();
		$('#viewSlides').show();
		$('.left-side2').removeClass("col-md-5, col-lg-5");
		$('.left-side2').toggleClass("col-md-6, col-lg-6");
		$('.left-side2').css("background-color", "#ffe14a");
		$('#workDescription').css("color", "black");
		$('.right-side2').removeClass("col-md-7, col-lg-7");
		$('.right-side2').toggleClass("col-md-6, col-lg-6");
		$('.left-side2').children('h2').css("color", "#565c64");
		$('#workHead').html("Portfolio");
		$('#site-link').html(myWork[0].link);
	});

	// SlideShow Boxes
	$('.blue1').click(function() {
		$('#workHead').html(myWork[1].text);
		$('.right-side2').css("background-image", myWork[1].image0);
		$('#workDescription').html(myWork[1].info0);
		$('#site-link').html(myWork[1].link);
		$('#site-link').attr({'href':'http://rabinowitzwebdesign.com/', 'target':'_blank'});

	});
	$('.blue2').click(function() {
		$('#workHead').html(myWork[2].text);
		$('.right-side2').css("background-image", myWork[2].image0);
		$('#workDescription').html(myWork[2].info0);
		$('#site-link').html(myWork[2].link);
		$('#site-link').attr({'href':'http://sfdogparlour.com/', 'target':'_blank'});
	});

	$('.g1').click(function() {
		$('#workHead').html(myWork[3].text);
		$('.right-side2').css("background-image", myWork[3].image0);
		$('#workDescription').html(myWork[3].info0);
		$('#site-link').html(myWork[3].link);
		
	});

	$('.g2').click(function() {
		$('#workHead').html(myWork[4].text);
		$('.right-side2').css("background-image", myWork[4].image0);
		$('#workDescription').html(myWork[4].info0);
		$('#site-link').html(myWork[4].link);
		$('#site-link').attr({'href':'http://audioist.ai/', 'target':'_blank'});
	});

	// $('.red-btn').click(function() {
	// 	$('#workHead').html(myWork[5].text);
	// 	$('.right-side2').css("background-image", myWork[5].image0);
	// 	$('#workDescription').html(myWork[5].info0);
	// });



});


// Typing function *******************

var TxtType = function (el, toRotate, period) {
            this.toRotate = toRotate;
            this.el = el;
            this.loopNum = 0;
            this.period = parseInt(period, 10) || 1000;
            this.txt = '';
            this.tick();
            this.isDeleting = false;
        };

        TxtType.prototype.tick = function () {
            var i = this.loopNum % this.toRotate.length;
            var fullTxt = this.toRotate[i];

            if (this.isDeleting) {
                this.txt = fullTxt.substring(0, this.txt.length - 1);
            } else {
                this.txt = fullTxt.substring(0, this.txt.length + 1);
            }

            this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

            var that = this;
            // The amount of time elapsing between deleting and typing each letter 
            var delta = 200;
             // var delta = 150 - Math.random() * 100;

            if (this.isDeleting) {
                delta /= 2;
            }

            // This is responsible for deleting and repeating
            // if (!this.isDeleting && this.txt === fullTxt) {
            //     delta = this.period;
            //     this.isDeleting = true;
            // } else if (this.isDeleting && this.txt === '') {
            //     this.isDeleting = false;
            //     this.loopNum++;
            //     delta = 500;
            // }


            setTimeout(function () {
                that.tick();
            }, delta);
        };

        window.onload = function () {
            var elements = document.getElementsByClassName('typewrite');
            for (var i = 0; i < elements.length; i++) {
                var toRotate = elements[i].getAttribute('data-type');
                var period = elements[i].getAttribute('data-period');
                if (toRotate) {
                    new TxtType(elements[i], JSON.parse(toRotate), period);

                }
            }
            
        };
 // INJECT CSS
            // var css = document.createElement("style");
            // css.type = "text/css";
            // css.innerHTML = ".typewrite > .wrap { border-right: 0.02em solid #fff}";
            // document.body.appendChild(css);

// Scroll for down button

// $(".fa-chevron-circle-down").hover(function(){
//         return.scrollTo(0, 600); 
//     });

$(document).ready(function() {
	$('.fa-chevron-circle-down').click(function() {
		var elmt = document.getElementById('about_me_section');
		elmt.scrollIntoView();
	});

	$('#caps1').click(function() {
		var caps1 = document.getElementById('about_me_section');
		caps1.scrollIntoView();
	});

	$('#caps2').click(function() {
		var caps2 = document.getElementById('work_experience');
		caps2.scrollIntoView();
	});

	$('#caps3').click(function() {
		var caps3 = document.getElementById('my_work');
		caps3.scrollIntoView();
	});

	$('#caps4').click(function() {
		var caps4 = document.getElementById('contact_me');
		caps4.scrollIntoView();
	});

		
});












