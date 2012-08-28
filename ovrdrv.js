var active_color = '#000'; // Colour of user provided text
var inactive_color = '#666'; // Colour of default text

// default global vars for logo slider
var speed = 30;
var pic, numImgs, arrLeft, i, totalWidth, n, myInterval;


$(document).ready(function(){
	
	$("form#form").reset();
	
    $('li.nav').mouseover(function(){
		$(this).addClass('selected');
		var toShow = '#' + $(this).attr('data-name');
       /* var toShow = '#' + $(this).attr('class').split(" ")[0]; */
        $(toShow).show();
    })
    $('.transMenu').mouseover(function(){
		var liClass = '.' + $(this).attr('Id');
		$(liClass).addClass('selected');
        var forMenu = '#' + $(this).attr('Id');
        $(forMenu).show();
    })
	$('.top_nav').mouseout(function(){
        $('.transMenu').hide();
		$('li.nav').removeClass('selected');
    }) 
	
	$('.transMenu').mouseout(function(){
        $('.transMenu').hide();
		$('li.nav').removeClass('selected');
    })

	/* chiclet menu */

    $('.chiclets ul li').mouseover(function(){
	/*	$(this).addClass('selected'); */
		var toShow = '#' + $(this).attr('data-name');
       /* var toShow = '#' + $(this).attr('class').split(" ")[0]; */
        $(toShow).show();
    })
    $('.shareMenu').mouseover(function(){
		var liClass = '.' + $(this).attr('Id');
		$(liClass).addClass('selected');
        var forMenu = '#' + $(this).attr('Id');
        $(forMenu).show();
    })
	$('.chiclets').mouseout(function(){
        $('.shareMenu').hide();
	/*	$('chiclets ul li').removeClass('selected'); */
    }) 
	
	$('.shareMenu').mouseout(function(){
        $('.shareMenu').hide();
	/*	$('chiclets ul li').removeClass('selected'); */
    })

	/* case study gallery */

	$('.drawstring').click(function(){
		$('.imgContainer').slideDown();
		$("p.action").text("Collapse Slideshow");
		$('.prevArrow, .nextArrow, .drawstringTwo').css('display','block');
		$('.drawstring').css('display','none');
		$('.image1').slideDown();
    })
	
	$('.drawstringTwo').click(function(){
		$('.imgContainer').slideUp();
		$('.imgContainer ul li').slideUp();
		$('.prevArrow, .nextArrow, .drawstringTwo').css('display','none');
		$('.drawstring').css('display','block');
		$("p.action").text("Expand Slideshow");
    })
	
	$(".awardToggle").hide();
	$(".firstActive").show();
	$("h2.expand").click(function(){
        $(this).next(".awardToggle").slideToggle("slow");
	});
	
	$('.hp_video').colorbox({fixed:true});
	$('.video-button').colorbox({iframe:true, innerWidth:480, innerHeight:360});		
	
	var list = $("ul.large");
	var li = list.children();
	var lengthMinusOne = li.length - 1;
	var index = 0;
	var num = $("ul.large li").length;

	var prevLi = $(li[0]).css("display", "block");

	$(".nextArrow").click(function(){
	   index++;
	   if (index > lengthMinusOne) index = 0;
	   prevLi.css("display","none");
	   prevLi = $(li[index]).css("display", "block");
	});
	$(".prevArrow").click(function(){
	   index--;
	   if (index < 0) index = lengthMinusOne;
	   prevLi.css("display","none");
	   prevLi = $(li[index]).css("display", "block");
	});
	
	$('#gallery ul.thumbs li').click(function(){
		var displayImg = 'li.' + $(this).attr('alt');
		$("p.action").text("Collapse Slideshow"); {
		
			if($(".imgContainer").is(":visible") == true) {
				$('.imgContainer ul li').hide();
				$('.prevArrow, .nextArrow, .drawstringTwo').css('display','block');
				$('.drawstring').css('display','none');
			    $(displayImg).show();
			}
			else {
				$(".imgContainer").slideDown();
				$('.prevArrow, .nextArrow').css('display','block');
			    $(displayImg).slideDown();
			}
		}
		
    })


	/**
	 * LOGO SLIDER
	**/
	pic = $('#logos ul').children('li');
	numImgs = pic.length; 
	position = new Array(numImgs);

	for (i=0; i<numImgs; i++) {  
		totalWidth = 0;    
		for (n=0; n<i; n++) {  
			totalWidth += $(pic[n]).width();  
		}                  
		position[i] = totalWidth;  
		$(pic[i]).css('left', totalWidth); 
	} 

	/* $('#logos ul').width(totalWidth); */
	myInterval = setInterval('slideIt()', speed);   

	// pause on hover
	$('#logos ul').hover(function() { 
		myInterval = clearInterval(myInterval);
	}, function() {            
		myInterval = setInterval('slideIt()', speed); 
	});


	form.checkText('form#form input');
	
	//fill-in drop downs for industry and roles in forms
	if ($('#form').length)
	{
		formFields.industry();
		formFields.role();
		formFields.department();
	}

	
	/**
	 *  PROCESSES FORM
	**/     
	// validates on change
	$('form#form .required, form#form .not_required').each(function() {
		$(this).change(function() {
			form.fieldValidate($(this));
		});
	});	  

	// validates full form on submit
	$('#submit_button').click(function(e) { 
		e.preventDefault();

		form.fullValidate('form#form', function() {
			$('form#form').submit();
		});
	
	});



	


	/**
	 *  GETS FACEBOOK & TWITTER FEEDS
	**/
	
	//console.log('$(#social .feed).length: ' + $('#social .feed').length);
	if ($('#social .feed').length > 0) {
		
		// starting to consolidate calls, clearly needs more work...
		$.ajax({
			url: 'php/feeds.php?feed=true',
			dataType: 'json',
			error: function(jqXHR, textStatus, errorThrown) {
				console.log('tmp.js ERROR!');
				console.log(jqXHR);
				console.log(textStatus);
				console.log(errorThrown);
			},
			success: function(data) {
				console.log('success!');
				console.log(data);	
				
				// twitter
				var twitterDate = prettyDate(data.twitter[0].date);
				$('#social .twitter p.mins').html(twitterDate);

				var latestTW = createLink(data.twitter[0].post);	
				latestTW = boldTags(latestTW);	
				$('#social .twitter p.content').html(latestTW + ' ' + latestTW + ' ' + latestTW);
				//$('#social .twitter p.content').html(latestTW);
				
				// grows facebook & team insight feed divs if twitter is more than 200px tall (initial height)
				if ($('#social .twitter').height() > 200) {
					$('#social .feed').animate({ height: $('#social .twitter').height() });
				}
				
				
				// facebook
				var facebookDate = prettyDate(data.facebook[0].date);
				$('#social .facebook p.mins').html(facebookDate);

				var latestFB = createLink(data.facebook[0].post);	
				$('#social .facebook p.content').html(latestFB);
						

			}

		});




		/*
		// gets latest Facebook post
		$.ajax({
			//url: 'http://www.socialeye.com/api/overdrive/facebook.php?callback=?',
			url: 'php/feeds.php?feed=facebook',
			dataType: 'json',
			error: function(jqXHR, textStatus, errorThrown) {
				console.log('tmp.js ERROR!');
				console.log(jqXHR);
				console.log(textStatus);
				console.log(errorThrown);
			},
			success: function(data) {
				//console.log('tmp.js success!');
				//console.log(data);			

				// post content
				//console.log(data[0].post);
				//$('#social .facebook p.content').html(data[0].post);
				var postContent = createLink(data[0].post);	
				//var postContent = createLink("We're hiring! We're looking for a Search Marketing Specialist to join our hard working team. We're hiring! We're looking for a Search Marketing Specialist to join our hard working team. View the job description and apply here: http://linkd.in/LCcbPG");	

				$('#social .facebook p.content').html(postContent);

				if ($('#social .facebook p.content').height() > 101) {
					console.log('too big!');

					var words = $('#social .facebook p.content').text().split(' ');
					$('#social .facebook p.content').empty();
					$.each(words, function() {
						//$('#social .facebook p.content').append('<span>' + this + '</span> ');
						console.log('this word: ' + this);
						console.log(($('#social .facebook p.content span').length == 0 ? '0000' : $('#social .facebook p.content span').last().position().top));


						if ($('#social .facebook p.content span').length == 0 || $('#social .facebook p.content span').last().position().top < 80) {
							$('#social .facebook p.content').append('<span>' + this + ' </span>');
						} else {
							return false;	// breaks loop
						}

					});
					//$('#social .facebook p.content').replace(/ $/,'');	// trying to remove trailing space
					$('#social .facebook p.content').append('...');	// this should be a link to post/FB




				} else {
					console.log('all set');
				}




				// time posted
				console.log('facebook data[0].date: ' + data[0].date);
				var postDate = prettyDate(data[0].date);
				//var postDate = prettyDate('2012-07-09 12:01:03');
				console.log('facebook postDate: ' + postDate);
				$('#social .facebook p.mins').html(postDate);



			}

		});


		// gets latest Twitter post
		$.ajax({
			url: 'php/feeds.php?feed=twitter',
			dataType: 'json',
			error: function(jqXHR, textStatus, errorThrown) {
				console.log('tmp.js ERROR!');
				console.log(jqXHR);
				console.log(textStatus);
				console.log(errorThrown);
			},
			success: function(data) {
				//console.log('tmp.js success!');
				//console.log(data);			



				// post content
				//console.log(data[0].post);			
				//$('#social .twitter p.content').html(data[0].post);
				//var postContent = createLink(data[0].post);
				var postContent = createLink('The Fancy, "#Pinterest for e-commerce" now has an incentive for @users to share products. @ovrdrv How you can make money: http://t.co/4VrWzcY1');			
				//var postContent = createLink("MWMWM WMWMW mwmwm wmwmw MWMWM WMWMW mwmwm wmwmw MWMWM WMWMW mwmwm wmwmw MWMWM WMWMW mwmwm wmwmw MWMWM WMWMW mwmwm wmwmw");
				postContent = boldTags(postContent);	
				$('#social .twitter p.content').html(postContent);			


				// time posted
				console.log('twitter data[0].date: ' + data[0].date);
				var postDate = prettyDate(data[0].date);
				//var postDate = prettyDate('2012-07-09 12:01:03');
				console.log('twitter postDate: ' + postDate);
				$('#social .twitter p.mins').html(postDate);


			}

		});
		*/
		
		
	}
	
	
	
	 



});	// ends document.ready



//
$.fn.reset = function () {
  $(this).each (function() { this.reset(); });
}


// function for sliding logos
function slideIt() {

  for (i=0; i<numImgs; i++) { 
    position[i] -= 1; 

    if (position[i] == -($(pic[i]).width())) { 
      totalWidth = 0;
      for (n=0; n<numImgs; n++) {
        if (n != i) {
          totalWidth += $(pic[n]).width();
        }
      }
      position[i] = totalWidth;
    }              
    $(pic[i]).css('left', position[i]); 
  } 
} 

// function for formatting facebook&twitter times posted
function prettyDate(date_str){
	var time_formats = [
	//[60, 'just now', 1], // 60
	[60, 'seconds', 1], // 60
	[120, '1 minute ago', '1 minute from now'], // 60*2
	[3600, 'minutes', 60], // 60*60, 60
	[7200, '1 hour ago', '1 hour from now'], // 60*60*2
	[86400, 'hours', 3600], // 60*60*24, 60*60
	[172800, 'yesterday', 'tomorrow'], // 60*60*24*2
	[604800, 'days', 86400], // 60*60*24*7, 60*60*24
	[1209600, 'last week', 'next week'], // 60*60*24*7*4*2
	[2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
	[4838400, 'last month', 'next month'], // 60*60*24*7*4*2
	[29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
	[58060800, 'last year', 'next year'], // 60*60*24*7*4*12*2
	[2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
	[5806080000, 'last century', 'next century'], // 60*60*24*7*4*12*100*2
	[58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
	];
	var time = ('' + date_str).replace(/-/g,"/").replace(/[TZ]/g," ").replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	if(time.substr(time.length-4,1)==".") time =time.substr(0,time.length-4);
	var seconds = (new Date - new Date(time)) / 1000;
	var token = 'ago', list_choice = 1;
	if (seconds < 0) {
		seconds = Math.abs(seconds);
		token = 'from now';
		list_choice = 2;
	}
	var i = 0, format;
	while (format = time_formats[i++])
		if (seconds < format[0]) {
			if (typeof format[2] == 'string')
				return format[list_choice];
			else
				return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
		}
	return time;
};

// creates actual links for facebook&twitter posts
function createLink(text) {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(exp,"<a href='$1' target='_blank'>$1</a>"); 
}

// bolds hashtags and usernames for twitter feed
function boldTags(text) {
    var exp = /((#|@).+?) /ig;
    var result = text.replace(exp,"<span class='bold'><a href='http://twitter.com/search/$1' target='_blank'>$1</a></span> ");
	result = result.replace('twitter.com/search/#','twitter.com/search/%23');
	result = result.replace('twitter.com/search/@','twitter.com/search/%40');
	return result;
}




// validates form
var form = { 

	fieldValidate: function(el){ 

		// class names for various errors
		var inputError = 'inputError';
		var labelError = 'labelError';  
		var missingError = 'missingError';  
		var invalidError = 'invalidError';  
		var submitError = 'submitError';  

		// reset all errors to not display
		$(el).removeClass(inputError);
		$(el).siblings('label').removeClass(labelError);               
		$(el).siblings('.' + missingError).css('display', 'none'); 
		$(el).siblings('.' + invalidError).css('display', 'none'); 

		if (el.val() == '' || el.val() == el.attr('title')) {
			// if blank, add missing error
			$(el).addClass(inputError);
			$(el).siblings('label').addClass(labelError); 
			$(el).siblings('.' + missingError).css('display', 'inline'); 			
		} else {
			// if not blank, remove missing errors, check for valid inputs  
			$(el).removeClass(inputError);
			$(el).siblings('label').removeClass(labelError); 
			$(el).siblings('.' + invalidError).css('display', 'none'); 	 

			if ($(el).attr('id') == 'email') {
				// checks for valid email
				if ($(el).val() != $(el).val().match(/.+@.+\..+/)) {
					$(el).addClass(inputError);
					$(el).siblings('label').addClass(labelError); 
					$(el).siblings('.' + invalidError).css('display', 'inline'); 
				} else {
					$(el).removeClass(inputError);
					$(el).siblings('label').removeClass(labelError); 
					$(el).siblings('.' + invalidError).css('display', 'none'); 
				}
			} else if ($(el).attr('id') == 'phone') {
				// checks for valid phone
				if ($(el).val() != $(el).val().match(/[0-9-\/\(\) ]{7,20}/)) {
					$(el).addClass(inputError);
					$(el).siblings('label').addClass(labelError); 
					$(el).siblings('.' + invalidError).css('display', 'inline'); 
				} else {
					$(el).removeClass(inputError);
					$(el).siblings('label').removeClass(labelError); 
					$(el).siblings('.' + invalidError).css('display', 'none'); 
				}
			}
		} 

		// check if there are any more errors (based on label errors)  
		if ($('.' + labelError).length == 0) {
			$('.' + submitError).css('display', 'none');
		} else {
			$('.' + submitError).css('display', 'inline');
		}

	},	// ends fieldValidate


	fullValidate: function(formID, callback) { 

		// class names for various errors
		var inputError = 'inputError';
		var labelError = 'labelError';  
		var missingError = 'missingError';  
		var invalidError = 'invalidError';  
		var submitError = 'submitError';  

		var errorCount = 0;  

		$(formID).find('.required').each(function() {  

			// reset all errors to not display
			$(this).removeClass(inputError);
			$(this).siblings('label').removeClass(labelError);               
			$(this).siblings('.' + missingError).css('display', 'none'); 
			$(this).siblings('.' + invalidError).css('display', 'none');  

			if ($(this).val() == '' || $(this).val() == $(this).attr('title')) {
				// if blank, add missing error
				$(this).addClass(inputError);
				$(this).siblings('label').addClass(labelError); 
				$(this).siblings('.' + missingError).css('display', 'inline'); 
				errorCount++;  											
			} else {
				// if not blank, remove missing errors, check for valid inputs  
				$(this).removeClass(inputError);
				$(this).siblings('label').removeClass(labelError); 
				$(this).siblings('.' + invalidError).css('display', 'none'); 
				$(this).siblings('.' + missingError).css('display', 'none'); 

				if ($(this).attr('id') == 'email') {
					// checks for valid email
					if ($(this).val() != $(this).val().match(/.+@.+\..+/)) {
						$(this).addClass(inputError);
						$(this).siblings('label').addClass(labelError); 
						$(this).siblings('.' + invalidError).css('display', 'inline'); 
						errorCount++;
					} else {
						$(this).removeClass(inputError);
						$(this).siblings('label').removeClass(labelError); 
						$(this).siblings('.' + invalidError).css('display', 'none'); 
					}
				} else if ($(this).attr('id') == 'phone') {
					// checks for valid phone
					if ($(this).val() != $(this).val().match(/[0-9-\/\(\) ]{7,20}/)) {
						$(this).addClass(inputError);
						$(this).siblings('label').addClass(labelError); 
						$(this).siblings('.' + invalidError).css('display', 'inline'); 
						errorCount++;
					} else {
						$(this).removeClass(inputError);
						$(this).siblings('label').removeClass(labelError); 
						$(this).siblings('.' + invalidError).css('display', 'none'); 
					}
				}	// ends if phone
			}	// ends if blank		
		});		// ends .each 

		if (errorCount > 0) {
		//	e.preventDefault();   
			$('.' + submitError).css('display', 'inline');
		} else {  
			$('.' + submitError).css('display', 'none'); 
			if ($.isFunction(callback)) {
				callback();
			}
		}

	},
	
	// Used to remove and add titles of fields upon typing
	checkText: function(el)
	{
		$(el).each(function() {  
			var default_value = this.title;
			$(this).focus(function() {
				if(this.value === default_value) {
					this.value = '';
					this.style.color = active_color;
				}
			});
			$(this).blur(function() {
				if(this.value === '') {
					this.value = default_value;
					this.style.color = inactive_color;
				}
			});
		});
	}

};	// ends form obj


var formFields = { 

	industry: function()
	{ 
		var industries = new Array(
			'Aerospace &amp; Defense',
			'Agriculture',
			'Automotive &amp; Transport',
			'Banking',
			'Beverages',
			'Business Services',
			'Charitable Organizations',
			'Chemicals',
			'Computer Hardware',
			'Computer Services',
			'Computer Software',
			'Construction',
			'Consumer Products Manufacturers',
			'Consumer Services',
			'Cultural Institutions',
			'Education',
			'Electronics',
			'Energy &amp; Utilities',
			'Entertainment',
			'Environmental Services &amp; Equipment',
			'Financial Services',
			'Food',
			'Foundations',
			'Government',
			'Health Care',
			'Industrial Manufacturing',
			'Insurance',
			'Leisure',
			'Media',
			'Membership Organizations',
			'Metals &amp; Mining',
			'Pharmaceuticals',
			'Real Estate',
			'Retail',
			'Security Products &amp; Services',
			'Telecommunications Equipment',
			'Telecommunications Services',
			'Transportation Services',
			'Technology',
			'Other'
		);
		
		$('#industry').append('<option value="">- Select Industry -</option>');
		$.each(industries, function(index, value)
		{
			$('#industry').append('<option value="' + value + '">' + value + '</option>');
		});
	},
	role: function()
	{ 
		var roles = new Array(
			'Owner/C-level/Executive Management',
			'Vice President',
			'Director',
			'Manager',
			'Coordinator',
			'Consultant',
			'Other'
		);
		
		$('#role').append('<option value="">- Select Role -</option>');
		$.each(roles, function(index, value)
		{
			$('#role').append('<option value="' + value + '">' + value + '</option>');
		});
	},
	department: function()
	{ 
		var departments = new Array(
			'Marketing',
			'Communications',
			'Sales',
			'Operations',
			'Customer Support',
			'Procurement',
			'Engineering/IT',
			'Finances/Legal/HR',
			'Other'
		);
		
		$('#department').append('<option value="">- Select Department -</option>');
		$.each(departments, function(index, value)
		{
			$('#department').append('<option value="' + value + '">' + value + '</option>');
		});
	}
}