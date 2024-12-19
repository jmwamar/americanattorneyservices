<?php
require 'vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $mail = new PHPMailer(true); 

    // Collecting form data
    $to = 'mnoblepcas@gmail.com';
    $email = htmlspecialchars($_POST['email']);
    $name = htmlspecialchars($_POST['name']);
    $message = htmlspecialchars($_POST['message']);
    $subject = htmlspecialchars($_POST['subject']);

    try {
        // SERVER SETTINGS
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'mjdez0612@gmail.com';  
        $mail->Password = 'btysjhtmubmftlky';    
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // SET EMAIL HEADERS
        $mail->setFrom('no-reply@mail.com', 'Website Message');  
        $mail->addAddress($to);  
        $mail->addReplyTo($email, $name);  
        $mail->addCustomHeader('X-Auto-Response-Suppress', 'All'); 

        // EMAIL CONTENT
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $message;

        // Send email
        if ($mail->send()) {
            echo "Message sent successfully!";
        }

    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }

} else {
    echo "Invalid request.";
}
?>
