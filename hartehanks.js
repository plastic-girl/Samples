$(function() {       
	
	
	//console.log('captcha.length: ' + $('#captcha').length);
	if ($('#captcha').length > 0) {
		$('#captcha').s3Capcha();	
		
		// uncheck radio buttons (because i'm getting phantom checks somehow)
		$('#capContainer').find('input').removeAttr('checked');	
	}
	
	
	/**
	 *  PROCESSES FORM
	**/     
	// validates on change
	$('form#contact .required').each(function() {
		
		// quick client side captcha validation (basically clears error if something has been checked)
		if ($(this).parents('#capContainer').length > 0) {
			$(this).bind('click', function() {
				$('#capContainer').find('input').removeAttr('checked');	// resets all captcha inputs as unchecked
				$(this).find('input').attr('checked','checked');	// sets clicked one as checked
				$('#capError').css('display', 'none');	// removes error
			});
		} else {
			$(this).change(function() {
				form.fieldValidate($(this));
			});
		}
		
	});	  
	
	// validates full form on submit
	$('#submit').click(function(e) { 
		e.preventDefault();
		
		form.fullValidate(e, 'form#contact', function() {
			//alert('yey no errors');
			//console.log('ok to submit');
			
			// disable submit button
			//$('#submit').attr('disabled', true);
			
			var formData = $('form#contact').serialize();  
			
			/*
			$.post('php/config.php?action=checkVars', formData, function(what) {
				var r = confirm(what);
				if (r == true) {
				*/
					$.post('php/config.php?action=addLead&userEmail=true', formData, function(data) {
						//console.log(data);

						if (data == 'fail') {
							//console.log('failed, need to display error');
							$('#capError').css('display','block');
						} else {
							//console.log('yey!');
							window.location='http://info.citdb.com/thankyou.html';
						}

					});
					/*
				}
			});
			*/
			
		});

	});
	

   
	
});		// ends init function       



var form = { 
	
	fieldValidate: function(el){ 

		// class names for various errors
		var inputError = 'inputError';
		var labelError = 'labelError';   
		var missingError = 'missingError';   
		var invalidError = 'invalidError';   
		var submitError = 'submitError';   
		
		
		if (el.val() == '' || el.val() == el.attr('title')) {
			
			// if blank, add missing error
			$(el).addClass(inputError);
			$(el).siblings('label').addClass(labelError);  
			$(el).siblings('.' + missingError).css('display', 'inline'); 
			$(el).siblings('.' + invalidError).css('display', 'none');  			
		} else {
			// if not blank, remove missing errors, check for valid inputs   
			$(el).removeClass(inputError);
			$(el).siblings('label').removeClass(labelError);  
			$(el).siblings('.' + missingError).css('display', 'none'); 
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
			} else if ($(el).attr('id') == 'website') {
				// checks for valid website
				if ($(el).val() != $(el).val().match(/.+\..+/)) {
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
		//console.log('in fullValidate');

		// class names for various errors
		var inputError = 'inputError';
		var labelError = 'labelError';   
		var missingError = 'missingError';   
		var invalidError = 'invalidError';   
		var submitError = 'submitError';    
		
		var errorCount = 0;    
		
		$(formID).find('.required').each(function() {   
			
			if ($(this).parents('#capContainer').length == 0) {
				//console.log('this is not captcha');
				
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
					$(this).siblings('.' + missingError).css('display', 'none'); 
					$(this).siblings('.' + invalidError).css('display', 'none'); 

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
					} else if ($(this).attr('id') == 'website') {
						// checks for valid website
						if ($(this).val() != $(this).val().match(/.+\..+/)) {
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
			} else {
				//console.log('must be captcha');
				
			}
			
		});		// ends .each 
		
		
		// checks if any captcha picture is selected
		//console.log('size: ' + $('#capContainer').find('input:checked').size());
		if ($('#capContainer').find('input:checked').size() != 1) {
			$('#capError').css('display', 'block');
			errorCount++;
		}
		
		//console.log('error count: ' + errorCount);
		if (errorCount > 0) {
			e.preventDefault();      
			$('#submit').siblings('.' + submitError).css('display', 'inline');
		} else {    
			
			$('#submit').siblings('.' + submitError).css('display', 'none'); 
			if ($.isFunction(callback)) {
				callback();
			}
		}
         
	}
	
};	// ends form obj       

