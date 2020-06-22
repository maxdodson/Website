//reveal .hideme elements when they enter the window
var registerReq = 0

function requestNotif() {
	registerReq=1;
	$('#contactq').attr('placeholder', 'Request to be notified when registration opens.');
	$('#contactq').val('');
	$('#contactq').prop('readonly', 'true');
	$('a[href^="#contactScroll"]').trigger("click");
	setTimeout(function() {
		document.getElementById("emailf").classList.add('contacthl');
		document.getElementById("namef").classList.add('contacthl');
		document.getElementById("contactq").classList.add('contactc');
	}, 1500);
}

function contactSubmit() {
	alert($('#emailf').val());
	return;
	var name = escape($('#namef').val().replace(/\s/g, "+"));
	var email = escape($('#emailf').val().replace(/\s/g, "+"));
	var question = escape($('#contactq').val().replace(/\s/g, "+"));

	if ((registerReq == 0 && question == "") || name == "" || email == "") {
		alert("Please enter a value for all fields");
	}
	else {
		if (registerReq == 1) {
			registerReq = 0;
			$.ajax({
				'async': false,
				'type': 'POST',
				//'url': 'https://script.google.com/macros/s/AKfycbyWmBdqNOtAiWIsw2iRL7Vl00TxHjHNmx5ZLKKyO4m8K7h2nc4/exec?function=requestRegistrationNotification&name=' + name + '&email=' + email
			});
			$('#emailf, #namef').css({'box-shadow': 'none'});
			$('#contactq').prop('readonly', false);
			$('#contactq').prop('placeholder', 'Question');
		}
		else {
			$.ajax({
				'async': false,
				'type': 'POST',
				//'url': 'https://script.google.com/macros/s/AKfycbyWmBdqNOtAiWIsw2iRL7Vl00TxHjHNmx5ZLKKyO4m8K7h2nc4/exec?function=contact&name=' + name + '&email=' + email + '&question=' + question
			});
		}

		$('#contactsubmit').text('Sent');
		$('#contactsubmit').attr("disabled", true);
		document.getElementById("contactform").reset();
		setTimeout(function() { $('#contactsubmit').removeAttr("disabled"); $('#contactsubmit').text('Submit'); }, 2500);

	}
	return;

}

function notifSubmit() {
	return;
	$('#btnsubmit').text('Working..');
	var name = escape($('#namei').val().replace(/\s/g, "+"));
	var email = escape($('#emaili').val().replace(/\s/g, "+"));

	$.ajax({
		'type': 'POST',
		//'url': 'https://script.google.com/macros/s/AKfycbxedUj20c_jqyXlqyHYnBghGP3QIMvoSaAcJHv5A-Q_jgWoGkCq/exec?name=' + name + '&email=' + email,
		crossDomain: true,
		contentType: false,
		dataType: 'text/javascript',
		processData: false,
		beforeSend: function() {
			$('#btnsubmit').text('Working..');
		},
		statusCode: {
			200: function() {
				$('#btnsubmit').text('Thank you!');
				setTimeout(function() {
					$('#roboticsModal').modal('toggle');
				}, 1000);
			}
		}
	});
}

function clearForm() {
	document.getElementById("contactform").reset();
	if (registerReq != 0) {
		$('#contactq').prop('readonly', false);
		$('#contactq').prop('placeholder', 'Question');
		document.getElementById("emailf").classList.remove('contacthl');
		document.getElementById("namef").classList.remove('contacthl');
		document.getElementById("contactq").classList.remove('contactc');
		registerReq = 0;
	}
	return;
}

$(document).ready(function() {
	if (window.innerWidth > 767) { // Load video if on desktop
		$('video').append('<source src="HackBIShort.mp" type="video/mp4">');
		$('video').css('opacity', '.89');
		$('video').get(0).load();
	}
	else { // Else keep poster image
		$('video').css('opacity', '.95');
	}
});
