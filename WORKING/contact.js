(function($){

	$(document).ready(function() {

		/* ---------------------------------------------- /*
		 * Contact form ajax
		/* ---------------------------------------------- */

		$('#contact-form').find('input,textarea').jqBootstrapValidation({
			preventSubmit: true,
			submitError: function($form, event, errors) {
				// additional error messages or events
			},
			submitSuccess: function($form, event) {
				event.preventDefault();

				var submit          = $('#contact-form submit');
				var ajaxResponse    = $('#contact-response');

				var name            = $("input#cname").val();
				var email           = $("input#cemail").val();
				var subject         = $("input#csubject").val();
				var message         = $("textarea#cmessage").val();

				$.ajax({
					type: 'POST',
					url: './php/contact.php',
					dataType: 'json',
					data: {
						name: name,
						email: email,
						subject: subject,
						message: message,
					},
					cache: false,
					beforeSend: function(result) {
						submit.empty();
						submit.append('<i class="fa fa-cog fa-spin"></i> Wait...');
					},
					success: function(result) {
						if(result.sendstatus == 1) {
							$form.fadeOut(500);
							setTimeout(function(){ 
								ajaxResponse.html(result.message);
								document.getElementById('contact-response').style.display = 'block';
							}, 500);
						} else {
							ajaxResponse.html(result.message);
						}
					}
				});
			}
		});

	});

})(jQuery);