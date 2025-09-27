<?php
// register.php

// Include database connection
require_once '../config/db_connect.php';

// Check if form is submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get form values and sanitize
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $password = trim($_POST['password']); // raw password
    $role = trim($_POST['role']);

    // Basic validation
    if (empty($name) || empty($email) || empty($password) || empty($role)) {
        die("All fields are required.");
    }

    // Hash the password
    $password_hash = password_hash($password, PASSWORD_BCRYPT);

    // Generate wallet_address automatically
    $wallet_address = '0x' . bin2hex(random_bytes(16)); // Example: 0x + 32 hex chars

    // Prepare the SQL statement
    $stmt = $conn->prepare("INSERT INTO users (name, email, password_hash, wallet_address, role) VALUES (?, ?, ?, ?, ?)");
    if (!$stmt) {
        die("Prepare failed: " . $conn->error);
    }

    // Bind parameters and execute
    $stmt->bind_param("sssss", $name, $email, $password_hash, $wallet_address, $role);

    if ($stmt->execute()) {
        // Redirect to login.html after successful registration
        header("Location: ../../frontend/login.html");
        exit(); // Always call exit after header redirect
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
} else {
    echo "Invalid request method.";
}
?>
