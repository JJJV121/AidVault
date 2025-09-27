<?php
session_start();
include 'db_connect.php';

// Check if admin is logged in
if (!isset($_SESSION['role']) || $_SESSION['role'] != 'admin') {
    die("Access denied");
}

// Handle approval/rejection
if (isset($_POST['action']) && isset($_POST['request_id'])) {
    $request_id = intval($_POST['request_id']);
    $action = $_POST['action'] === 'approve' ? 'approved' : 'rejected';

    $stmt = $conn->prepare("UPDATE aid_requests SET status=? WHERE id=?");
    $stmt->bind_param("si", $action, $request_id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Request $action successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to update request"]);
    }
    $stmt->close();
    exit;
}

// Fetch all pending requests
$result = $conn->query("SELECT a.id, a.title, a.amount_requested, u.name AS requester
                        FROM aid_requests a
                        JOIN users u ON a.user_id = u.id
                        WHERE a.status='pending'");

$requests = [];
while ($row = $result->fetch_assoc()) {
    $requests[] = $row;
}

header('Content-Type: application/json');
echo json_encode($requests);
?>
