<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/PHPMailer/Exception.php';
require __DIR__ . '/PHPMailer/PHPMailer.php';
require __DIR__ . '/PHPMailer/SMTP.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  exit('Method Not Allowed');
}

$name  = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  exit('Invalid email');
}

$mail = new PHPMailer(true);

try {
  // Gmail SMTP (recommended)
  $mail->isSMTP();
  $mail->Host       = 'smtp.gmail.com';
  $mail->SMTPAuth   = true;
  $mail->Username   = 'wingsofthecherubim01@gmail.com';
  $mail->Password   = 'PUT_YOUR_GMAIL_APP_PASSWORD_HERE';
  $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
  $mail->Port       = 587;

  $mail->setFrom('wingsofthecherubim01@gmail.com', 'Wings of the Cherubim');
  $mail->addAddress('wingsofthecherubim01@gmail.com');
  $mail->addReplyTo($email, $name !== '' ? $name : $email);

  $mail->Subject = 'New sign-up';
  $mail->Body    = "New sign-up:\n\nName: {$name}\nEmail: {$email}\n";

  $mail->send();

  header('Location: thank-you.html');
  exit;
} catch (Exception $e) {
  http_response_code(500);
  exit('Mailer Error: ' . $mail->ErrorInfo);
}
