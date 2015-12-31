$( document ).ready(function() {

	// mailchimp form submission
	$("#mc-form").formchimp({
		// sucesss
		// error
	});

	//show hide on sucsess
	$( document ).on( 'mailChimpSuccess', function() {
		$('#mc-form').hide();
		$('.sucsess').css('visibility','visible').hide().fadeIn('slow');
	});
	   
});






