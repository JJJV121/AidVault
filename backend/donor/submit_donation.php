<?php
session_start();
include '../db_connect.php';

// Check if donor is logged in
if (!isset($_SESSION['user_id'])) {
    die(json_encode(["success" => false, "message" => "Please log in first"]));
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $donor_id = $_SESSION['user_id'];
    $request_id = intval($_POST['request_id']);
    $amount = floatval($_POST['amount']);
    $tx_hash = trim($_POST['tx_hash']); // Blockchain transaction hash

    // Validate input
    if (empty($request_id) || empty($amount) || empty($tx_hash)) {
        die(json_encode(["success" => false, "message" => "All fields are required"]));
    }

    // Insert donation transaction
    $stmt = $conn->prepare("INSERT INTO transactions (request_id, donor_id, amount, tx_hash, status) VALUES (?, ?, ?, ?, 'completed')");
    $stmt->bind_param("iids", $request_id, $donor_id, $amount, $tx_hash);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Donation submitted successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to submit donation"]);
    }
    $stmt->close();
}
?>
