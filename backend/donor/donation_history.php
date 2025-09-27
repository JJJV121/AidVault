<?php
session_start();
include '../db_connect.php';

// Check if donor is logged in
if (!isset($_SESSION['user_id'])) {
    die(json_encode(["success" => false, "message" => "Please log in first"]));
}

$donor_id = $_SESSION['user_id'];

// Fetch all donations by this donor
$stmt = $conn->prepare("SELECT t.id, t.amount, t.tx_hash, t.status, t.timestamp, 
                               a.title AS aid_title, u.name AS beneficiary
                        FROM transactions t
                        JOIN aid_requests a ON t.request_id = a.id
                        JOIN users u ON a.user_id = u.id
                        WHERE t.donor_id=?
                        ORDER BY t.timestamp DESC");
$stmt->bind_param("i", $donor_id);
$stmt->execute();
$result = $stmt->get_result();

$donations = [];
while ($row = $result->fetch_assoc()) {
    $donations[] = $row;
}

header('Content-Type: application/json');
echo json_encode($donations);
$stmt->close();
?>
