$( document ).ready(function() {

	// mailchimp form submission
	$('#mc-form').ajaxChimp({
		// some callbacks should go here!
	});

	$('.sucsess').hide();
	$('.mailchimp').click(function() {
		$('#mc-form').hide();
		$('.sucsess').fadeIn();
	});
   
});




