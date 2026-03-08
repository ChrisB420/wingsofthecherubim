<?php
/**
 * Wings of the Cherubim – Contact Form Handler
 * Sends contact form submissions to the ministry email address.
 */

// Configuration
define('RECIPIENT_EMAIL', 'info@wingsofthecherubim.quest');
define('RECIPIENT_NAME',  'Wings of the Cherubim');

// Only process POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: pages/contact.html');
    exit;
}

// Sanitise and validate inputs
$name    = htmlspecialchars(trim($_POST['name']    ?? ''), ENT_QUOTES, 'UTF-8');
$email   = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$subject = htmlspecialchars(trim($_POST['subject'] ?? 'Contact Form Message'), ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars(trim($_POST['message'] ?? ''), ENT_QUOTES, 'UTF-8');

$errors = [];

if (empty($name)) {
    $errors[] = 'Name is required.';
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'A valid email address is required.';
}

if (empty($message)) {
    $errors[] = 'Message is required.';
}

if (!empty($errors)) {
    // Redirect back with error flag (simple fallback)
    header('Location: pages/contact.html?status=error');
    exit;
}

// Compose email
$emailSubject = '[Contact Form] ' . $subject;
$emailBody    = "Name: $name\n"
              . "Email: $email\n\n"
              . "Message:\n$message\n";

$headers  = "From: $name <$email>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Send via PHP mail() — swap for PHPMailer if SMTP credentials are available
$sent = mail(RECIPIENT_EMAIL, $emailSubject, $emailBody, $headers);

if ($sent) {
    header('Location: pages/contact.html?status=success');
} else {
    header('Location: pages/contact.html?status=error');
}
exit;
