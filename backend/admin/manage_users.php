<?php
session_start();
include 'db_connect.php';

// Check if admin is logged in
if (!isset($_SESSION['role']) || $_SESSION['role'] != 'admin') {
    die("Access denied");
}

// Delete user
if (isset($_POST['delete_user_id'])) {
    $user_id = intval($_POST['delete_user_id']);
    
    // Delete user
    $stmt = $conn->prepare("DELETE FROM users WHERE id=?");
    $stmt->bind_param("i", $user_id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "User deleted successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to delete user"]);
    }
    $stmt->close();
    exit;
}

// Fetch all users
$result = $conn->query("SELECT id, name, email, wallet_address, role FROM users");
$users = [];
while ($row = $result->fetch_assoc()) {
    $users[] = $row;
}

header('Content-Type: application/json');
echo json_encode($users);
?>
