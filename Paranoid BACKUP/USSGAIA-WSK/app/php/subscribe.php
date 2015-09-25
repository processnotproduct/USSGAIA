<?php

	// MailChimp
	$APIKey = 'f4d7d4205f9a4134c84a6df1c516e748-us10';
	$listID = 'c04b9adf26';

	$email   = $_POST['email'];

	require_once('inc/MCAPI.class.php');

	$api = new MCAPI($APIKey);
	$list_id = $listID;

	if($api->listSubscribe($list_id, $email) === true) {
		$sendstatus = 1;
		$message = 'Success! Check your email to confirm sign up.';
	} else {
		$sendstatus = 0;
		$message = 'Error: ' . $api->errorMessage;
	}

	$result = array(
		'sendstatus' => $sendstatus,
		'message' => $message
	);

	echo json_encode($result);

?>