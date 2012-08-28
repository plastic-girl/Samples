var active_color = '#000'; // Colour of user provided text
var inactive_color = '#555'; // Colour of default text
var submit_color = '#fff';

$(document).ready(function(){
	
		$("form#form").reset();
		
		/*
		if ($('#playbook-download').length > 0) {
			// automatically downloads pdf when window is loaded (and all images)
			$(window).load(function() {
				window.location.href = "/pdf/Principal-Playbook.pdf";
			});
			
			// downloads pdf on click of button
			$('#pdfDownload').bind('click', function() {
				window.location.href = "/pdf/Principal-Playbook.pdf";
			});
		}
		*/

		
		$('p.text_input input').each(function() {  // Used to remove and add titles of fields upon typing
			var default_value = this.value;
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
		
		$('a.lightrules').click(function(e){
				$.colorbox({href:"../rules.php", fixed:true, escKey:true, overlayClose:true, width:957, height:500});
				$("#cboxClose").css("display" , "inline");
		});


		/*
		// live site!
		$('#pdfDownload').click(function(e){
			  	//e.preventDefault();
				var entryID = $("#entryID").attr('data-entryID');
				$.post('php/config.php?pdfSiteDownload=true&entryID='+entryID, function(data) {
					//window.location.href = "/pdf/Principal-Playbook.pdf";
				});
		 });
		*/
				
		// live site!
		$('#download').click(function(e){
			  	//e.preventDefault();
				var entryID = $("#entryID").attr('data-entryID');
				$.post('php/config.php?pdfSiteDownload=true&entryID='+entryID, function(data) {
					//window.location.href = "/pdf/Principal-Playbook.pdf";
				});
		 });
		
		
		// tracks clicks of facebook contest share button
		$('.fb-share').live("click", function(e) {
		  	e.preventDefault();
			var entryID = $("#entryID").attr('data-entryID');
			var location = $(this).data('location');
			fb.shareContest(entryID,location);
			$.post('php/config.php?fbClick=true&entryID='+entryID, function(data) { 
				//fb.shareContest(entryID,location);
			});
		});
		
		// tracks clicks of facebook playbook share button
		$('.fb-share-playbook').live("click", function(e) {
		  	e.preventDefault();
			var entryID = $("#entryID").attr('data-entryID');
			fb.sharePlaybook(entryID);
			$.post('php/config.php?fbClickPlaybook=true&entryID='+entryID, function(data) { 
				//fb.sharePlaybook(entryID);
			});
		});		
		
		
		
		
		
		$('.noThanks').live("click", function(e){
			e.preventDefault();
			var entryID = $("#entryID").attr('data-entryID');
			var url = $(this).find('a').attr('href');
			$.post('php/config.php?noThanks=true&entryID='+entryID, function(data) {
					window.location.href = url;
				});
		 });		
		
		
		$('#find, #connect').click(function(e){
			var labelError = 'labelError'; 
			e.preventDefault();
			if($('.checkbox_input #contactMe').is(':checkbox') && !$('.checkbox_input #contactMe').is(':checked')){
				$('.checkbox_input #contactMe').siblings('label').addClass(labelError);
			} else if($('.checkbox_input #contactMe').is(':checkbox') && $('.checkbox_input #contactMe').is(':checked')){
				$('.checkbox_input #contactMe').siblings('label').removeClass(labelError); 
				
				var entryID = $("#entryID").attr('data-entryID');
				$.post('php/config.php?contactAdvisorSite=true&entryID='+entryID, function(data) {
						$(".change_ty").html("<h2>Thank You</h2> <p>A representative from The Principal will contact you using the information you have provided.</p>");
						//window.location.href = "thankyou.php";
					});
			}
			
		 });
	
		$('.checkbox_input #contactMe').change(function() {
			var labelError = 'labelError';
			if($('.checkbox_input #contactMe').is(':checkbox') && !$('.checkbox_input #contactMe').is(':checked')){
				$('.checkbox_input #contactMe').siblings('label').addClass(labelError);
			} else if($('.checkbox_input #contactMe').is(':checkbox') && $('.checkbox_input #contactMe').is(':checked')){
				$('.checkbox_input #contactMe').siblings('label').removeClass(labelError);
			}
		});


		
		/** PROCESSES FORM **/     
		
		// validates on chan ge
		$('form#form .required, form#form .not_required').each(function() {
			$(this).change(function() {
				form.fieldValidate($(this));
			});
		});	  

		// validates full form on submit
		$('#submit_button').click(function(e) { 
			e.preventDefault();
			form.fullValidate(e, 'form#form', function() {
				var formData = $('form#form').serialize(); 
				$.post('php/config.php?entry=true&cache=' + $.now(), formData, function(id) {
					$.colorbox({href:"../share.php?id=" + id, fixed:true, escKey:false, overlayClose:false, width:957, height:500});
					$("#cboxClose").css("display" , "none");
				});
				
			});
			
		
		});	
		
		$('#playbook_submit_button').click(function(e) { 
			e.preventDefault();
			form.fullValidate(e, 'form#form', function() {
				var formData = $('form#form').serialize(); 
				$.post('php/config.php?entry=true&cache=' + $.now(), formData, function(id) {
					window.location.href = "gp-thankyou.php";
					//$.colorbox({href:"../share-play.php?id=" + id, fixed:true, opacity:0.99, escKey:false, overlayClose:false, width:957, height:500});
					//$("#cboxClose").css("display" , "none");
				});

			});
		});	
		
		
		//async load of twitter JS
		var e = document.createElement('script'); e.type="text/javascript"; e.async = true;
		e.src = 'https://platform.twitter.com/widgets.js';
		(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(e);

		$(e).load(function() {

			function clickEventToAnalytics(intent_event) {

				if (intent_event) {
					if ($(intent_event.target).parents('.playbook').length > 0) {
						// tweeting about playbook
						var entryID = $("#entryID").attr('data-entryID');
						$.post('php/config.php?twClickPlaybook=true&entryID='+entryID, function(data) { });
						
					} else {
						// tweeting about contest
						var entryID = $("#entryID").attr('data-entryID');
						$.post('php/config.php?twClick=true&entryID='+entryID, function(data) { });
					}
				}
			}
			function tweetIntentToAnalytics(intent_event) {
				if (intent_event) {
					if ($(intent_event.target).parents('.playbook').length > 0) {
						// tweeting about playbook
						var entryID = $("#entryID").attr('data-entryID');
						$.post('php/config.php?twSharePlaybook=true&entryID='+entryID, function(data) { 
								if ($('#lb-share').length > 0) {
									window.location.href = "thankyou.php";
								}
						});
					} else {
						// tweeting about contest
						var entryID = $("#entryID").attr('data-entryID');
						$.post('php/config.php?twShare=true&entryID='+entryID, function(data) { 
								if ($('#lb-share').length > 0) {
									window.location.href = "thankyou.php";
								}
						});
					}
				}
			}
			function favIntentToAnalytics(intent_event) {tweetIntentToAnalytics(intent_event);}
			function retweetIntentToAnalytics(intent_event) {
				if (intent_event) {var label = intent_event.data.source_tweet_id;}
			}
			function followIntentToAnalytics(intent_event) {
				if (intent_event) {var label = intent_event.data.user_id + " (" + intent_event.data.screen_name + ")";}
			}
			
			twttr.events.bind('click', clickEventToAnalytics);
			twttr.events.bind('tweet', tweetIntentToAnalytics);
			twttr.events.bind('retweet', retweetIntentToAnalytics);
			twttr.events.bind('favorite', favIntentToAnalytics);
			twttr.events.bind('follow', followIntentToAnalytics);
			
		});
		
		/*
		$(window.__twitterIntentHandler).unload(function() {
		  alert('Handler for .unload() called.');
		});
		*/
		
		
		
		// preloads colorbox background?
		$('<img/>').attr('id','colorboxBG').attr('src', 'images/chalkboard.png').load();
		
		
		
		// checks for sharing links from email
		/*
		var get = getQueryParams(document.location.search);

		if (get.share) {
			console.log('share is in url and equals ' + get.share);
			
			if (get.share == 'facebook') {
				$('#share .fb-share').trigger('click');
				console.log('should have triggered facebook?');
			} else if (get.share == 'twitter') {
				//$('#share iframe.twitter-share-button').find('a.btn').trigger('click');
				$('#share iframe.twitter-share-button').find('a.btn').trigger('click');
				console.log('should have triggered twitter?');
			}
		} else {
			console.log('variable is not in url');
		}
		*/
		
		

		
		
		

});



$.fn.reset = function () {
  $(this).each (function() { this.reset(); });
}



function getQueryParams(qs) {
    qs = qs.split("+").join(" ");
    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])]
            = decodeURIComponent(tokens[2]);
    }

    return params;
}



var fb = {
	
	shareContest: function(entryID, location){
		FB.ui({
			method: 'feed',
			name: 'The Principal Big Ten Championship Sweepstakes',
			link: 'https://big10.principal.com',
		   	picture: 'https://big10.principal.com/images/FB_big10.jpg',
			caption: 'Win a trip to the Big Ten Championship Game in The Principal Big Ten Championship Sweepstakes',
		 	description: 'We\'re giving away a trip for two to Indianapolis including airfare, hotel and tickets to the big game on December 1, 2012.  Enter to win now!'
			//redirect_uri: 'https://www.facebook.com/ColdEEZE?sk=app_232801673461079' 
			//message: 'Facebook Dialogs are easy!'
		},
		function(response) {  
			if (response && response.post_id) {
		   		$.post('php/config.php?fbShare=true&entryID='+entryID, function(data) {
					if (location !="") {window.location.href = location};				                 
	 			});

	 		} else {
				// Post was not published
				$.post('php/config.php?fbCancel=true&entryID='+entryID, function(data) {
					//if (location !="") {window.location.href = location};
				});
	 		}
		});
	},
	

	sharePlaybook: function(entryID){
		FB.ui({
			method: 'feed',
			name: 'The Principal Big Ten Financial Playbook',
			link: 'https://big10.principal.com',
		   	picture: 'https://big10.principal.com/images/FB_playbook_big10.jpg',
			caption: 'Get the Principal Big 10 Financial Playbook now.  You can even you enter to win a trip to the Big Ten Championship Game!',
		 	description: 'The Principal Big 10 Financial Playbook provides strategies designed to turn your dreams into a game plan to help you achieve your financial goals.'
			//redirect_uri: 'https://www.facebook.com/ColdEEZE?sk=app_232801673461079' 
			//message: 'Facebook Dialogs are easy!'
		},
		function(response) {  
			if (response && response.post_id) {
		   		$.post('php/config.php?fbSharePlaybook=true&entryID='+entryID, function(data) {});

	 		} else {
				// Post was not published
				$.post('php/config.php?fbCancelPlaybook=true&entryID='+entryID, function(data) {});
	 		}
		});
	}
		
	
}





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
	

	fullValidate: function(e, formID, callback) { 
		
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
				$('.rules label').css('color' , 'white');
				$(this).siblings('label').removeClass(labelError);   
				$(this).siblings('.' + invalidError).css('display', 'none'); 
				$(this).siblings('.' + missingError).css('display', 'none'); 
				
				if ($(this).attr('id') == 'email') {
					// checks for valid email
					if ($(this).val() != $(this).val().match(/.+@.+\..+/)) {
						$(this).addClass(inputError);
						$(this).siblings('label').addClass(labelError);   
						$(this).siblings('.' + invalidError).css('display', 'inline');   
						$(this).siblings('.' + missingError).css('display', 'inline'); 
						errorCount++;    											
					} else {
						$(this).removeClass(inputError);
						$(this).siblings('label').removeClass(labelError);   
						$(this).siblings('.' + missingError).css('display', 'none'); 
						$(this).siblings('.' + invalidError).css('display', 'none'); 
					}
				} else if ($(this).attr('id') == 'phone') {
					// checks for valid phone
					if ($(this).val() != $(this).val().match(/[0-9-\/\(\) ]{7,20}/)) {
						$(this).addClass(inputError);
						$(this).siblings('label').addClass(labelError);   
						$(this).siblings('.' + invalidError).css('display', 'inline');   
						$(this).siblings('.' + missingError).css('display', 'inline'); 
						errorCount++;    											
					} else {
						$(this).removeClass(inputError);
						$(this).siblings('label').removeClass(labelError);   
						$(this).siblings('.' + invalidError).css('display', 'none'); 
						$(this).siblings('.' + missingError).css('display', 'none'); 
					}
				} else if ($(this).attr('id') == 'rules'){
					// checks for selected rule
	                       if($(this).is(':checkbox') && !$(this).is(':checked')){
						$(this).siblings('label').addClass(labelError);
						errorCount++;
	                       }else if($(this).is(':checkbox') && $(this).is(':checked')){
	                             	$(this).siblings('label').removeClass(labelError); 
	                       }
				}// end rules		
			}	// ends if blank		

			
		});		// ends .each 
		
		
		if (errorCount > 0) {
			e.preventDefault();         
			$('#submit_button, #playbook_submit_button').siblings('.' + submitError).css('display', 'inline');
		} else {      
			$('#submit_button, #playbook_submit_button').siblings('.' + submitError).css('display', 'none'); 
			if ($.isFunction(callback)) {
				callback();
			}
		}
             
	}
	
};	// ends form obj