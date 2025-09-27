<?php
session_start();

// Destroy all session data
$_SESSION = [];
session_destroy();

echo json_encode(["success" => true, "message" => "Logged out successfully"]);
?>
