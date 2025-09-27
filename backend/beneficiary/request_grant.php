<?php
session_start();
include '../db_connect.php';

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    die(json_encode(["success" => false, "message" => "Please log in first"]));
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $user_id = $_SESSION['user_id'];
    $title = trim($_POST['title']);
    $description = trim($_POST['description']);
    $amount_requested = floatval($_POST['amount_requested']);

    // Validate input
    if (empty($title) || empty($amount_requested)) {
        die(json_encode(["success" => false, "message" => "Title and amount are required"]));
    }

    // Insert aid request
    $stmt = $conn->prepare("INSERT INTO aid_requests (user_id, title, description, amount_requested) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("issd", $user_id, $title, $description, $amount_requested);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Aid request submitted successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to submit request"]);
    }
    $stmt->close();
}
?>
