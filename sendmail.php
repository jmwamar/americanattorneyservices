<?php
require 'vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $mail = new PHPMailer(true); 

    // Collecting form data
    $to = 'mnoblepcas@gmail.com';
    $email = htmlspecialchars($_POST['email']);
    $name = htmlspecialchars($_POST['name']);
    $contact = htmlspecialchars($_POST['contact']);
    $priority = htmlspecialchars($_POST['priority']);
    $city = htmlspecialchars($_POST['city']); 

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
        $mail->setFrom('no-reply@mail.com', 'Request Quote Details');  
        $mail->addAddress($to);  
        $mail->addReplyTo($email, $name);  
        $mail->addCustomHeader('X-Auto-Response-Suppress', 'All'); 

        // EMAIL CONTENT
        $mail->isHTML(true);
        $mail->Subject = 'Request Quote Details';
        $mail->Body = '
            <h3>Request Quote Details</h3>
            <p><strong>Name:</strong> ' . $name . '</p>
            <p><strong>Email Address:</strong> ' . $email . '</p>
            <p><strong>Contact Number:</strong> ' . $contact . '</p>
            <p><strong>Urgency Level:</strong> ' . $priority . '</p>
            <p><strong>City & Zip:</strong> ' . $city . '</p>
        ';

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
