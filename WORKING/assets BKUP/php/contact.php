<?php
/* Set e-mail recipient */
$myemail = "hello@ussgaia.com";

/* Check all form inputs using check_input function */
$name = $_REQUEST['name']; 
$email = $_REQUEST['email']; 
$subject = $_REQUEST['subject']; 
$message = $_REQUEST['message']; 

/* If e-mail is not valid show error message */
// if (!preg_match("/([\w\-]+\@[\w\-]+\.[\w\-]+)/", $email))
// {
// show_error("Invalid e-mail address");
// }
/* Let's prepare the message for the e-mail */

// $subject = "Someone sent you a message using the USSGAIA contact form";

$message = "

Someone sent you a message using the USSGAIA contact form:

Name: $name
Email: $email
Subject: $subject

Message:
$message

";

/* Send the message using mail() function */
mail($myemail, $subject, $message);

/* Redirect visitor to the thank you page */
// header('Location: index.htm');
// exit();

/* Functions we used */
// function check_input($data, $problem='')
// {
// $data = trim($data);
// $data = stripslashes($data);
// $data = htmlspecialchars($data);
// if ($problem && strlen($data) == 0)
// {
// show_error($problem);
// }
// return $data;
// }

// function show_error($myError)
// {
?>