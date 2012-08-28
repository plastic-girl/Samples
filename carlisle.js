var active_color = '#000'; // Colour of user provided text
var inactive_color = '#666'; // Colour of default text

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
					$(el).siblings('.' + missingError).css('display', 'inline');
					$(el).siblings('.' + invalidError).css('display', 'inline');   
				} else {
					$(el).removeClass(inputError);
					$(el).siblings('label').removeClass(labelError);   
					$(el).siblings('.' + missingError).css('display', 'none');
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
				}	// ends if phone				
			}	// ends if blank		
		});		// ends .each 
		
		if (errorCount > 0) {
			e.preventDefault();         
			$('#submit-home').siblings('.' + submitError).css('display', 'inline');
		} else {      
			$('#submit-home').siblings('.' + submitError).css('display', 'none'); 
			if ($.isFunction(callback)) {
				callback();
			}
		}
             
	}
	
};	// ends form obj

$(function() {
	
	// Gallery
	    if($("#gallery").length){
			
	        // Declare variables
	        var totalImages = $("#gallery > li").length,
	            imageWidth = $("#gallery > li:first").outerWidth(true),
	            totalWidth = imageWidth * totalImages,
	            visibleImages = Math.round($("#gallery-wrap").width() / imageWidth),
	            visibleWidth = visibleImages * imageWidth,
	            stopPosition = (visibleWidth - totalWidth),
				reset = (totalWidth-visibleWidth);
				counter = (0 + visibleImages);

	        $("#gallery").width(totalWidth);

	        $("#gallery-prev").click(function(){
	            if($("#gallery").position().left < 0 && !$("#gallery").is(":animated")){
	                $("#gallery").animate({left : "+=" + imageWidth + "px"});
	            }
	            return false;
	        });

	        $("#gallery-next").click(function(){
	            if($("#gallery").position().left > stopPosition && !$("#gallery").is(":animated")){
	                $("#gallery").animate({left : "-=" + imageWidth + "px"});
					counter++;
						if(counter == totalImages) {
							$("#gallery").animate({left : "-=" + -reset + "px"});
							counter = (0 + visibleImages);
						}
	            }
	            return false;
	        });
	    }
	

	 		$('.thumbnail').live("click", function() {
				$('#imageWrap').show();
		        $('#mainImage').hide();
				$('#video').hide();
		        $('#imageWrap').css('background', "url('images/ajax-loader.gif') center no-repeat");
				$('#over_text').css('display', 'none');
				var copy = $(this).attr('alt');
		        var i = $('<img />').attr('src',this.href).load(function() {
		            $('#mainImage').attr('src', i.attr('src'));
		            $('#imageWrap').css('background', "url('images/frame.png') center no-repeat");
					$('#over_text p').text(copy);
		            $('#mainImage, #frame').fadeIn('slow');
					$('#over_text').slideDown('slow');
		        });
		        return false; 
		    });
		});
		
			$('.thumbnail_video').live("click", function() {
		        $('#mainImage').hide();
				$('.lp3').hide();
				$('#video').fadeIn();
		    });

	
	$('input').each(function() {  // Used to remove and add titles of fields upon typing
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


/**
	 *  PROCESSES FORM
	**/     
	// validates on change
	$('form#freeform .required, form#freeform .not_required').each(function() {
		$(this).change(function() {
			form.fieldValidate($(this));
		});
	});	  

	// validates full form on submit
	$('#submit-home').click(function(e) { 
		e.preventDefault();
		
		form.fullValidate(e, 'form#freeform', function() {
			
			// added to prevent titles of non-required fields from going into database
			if ($('#freeform').find('input[name=street2]').val() == $('#freeform').find('input[name=street2]').attr('title')) {
				$('#freeform').find('input[name=street2]').val('');
			}
			
			if ($('#freeform').find('input[name=phone]').val() == $('#freeform').find('input[name=phone]').attr('title')) {
				$('#freeform').find('input[name=phone]').val('');
			}
			
			
			$('form#freeform').submit();

	});

});