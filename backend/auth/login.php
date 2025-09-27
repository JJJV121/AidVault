<?php
session_start();
require_once '../config/db_connect.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    if (empty($email) || empty($password)) {
        header("Location: ../../frontend/login.html?error=empty_fields");
        exit();
    }

    $stmt = $conn->prepare("SELECT id, name, email, password_hash, role, wallet_address FROM users WHERE email=?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password_hash'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['name'] = $user['name'];
            $_SESSION['email'] = $user['email'];
            $_SESSION['role'] = $user['role'];
            $_SESSION['wallet_address'] = $user['wallet_address'];

            // Redirect to index.html instead of dashboard
            header("Location: ../../frontend/index.html");
            exit();
        } else {
            header("Location: ../../frontend/login.html?error=wrong_password");
            exit();
        }
    } else {
        header("Location: ../../frontend/login.html?error=no_user");
        exit();
    }

    $stmt->close();
    $conn->close();
} else {
    header("Location: ../../frontend/login.html?error=invalid_request");
    exit();
}
?>
