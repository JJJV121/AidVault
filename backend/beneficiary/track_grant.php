<?php
session_start();
include '../db_connect.php';

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    die(json_encode(["success" => false, "message" => "Please log in first"]));
}

$user_id = $_SESSION['user_id'];

// Fetch all aid requests by this user
$stmt = $conn->prepare("SELECT id, title, description, amount_requested, status, created_at 
                        FROM aid_requests 
                        WHERE user_id=? 
                        ORDER BY created_at DESC");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$requests = [];
while ($row = $result->fetch_assoc()) {
    $requests[] = $row;
}

header('Content-Type: application/json');
echo json_encode($requests);
$stmt->close();
?>
