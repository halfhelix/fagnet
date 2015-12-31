$( document ).ready(function() {

	// mailchimp form submission
	$('#mc-form').ajaxChimp({
		// some callbacks should go here!
	});

	// show / hide on sumbit
	$('.mailchimp').click(function() {
		$('#mc-form').hide();
		$('.sucsess').css('visibility','visible').hide().fadeIn('slow');
	});
   
});




