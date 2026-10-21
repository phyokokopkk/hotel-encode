<?php
session_start();
if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
    header('Location: index.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hotel Admin Login</title>
    <link rel="icon" href="assets/favicon.png" type="image/x-icon">
    <link rel="stylesheet" href="plugin/bootstrap.min.css">
    <link rel="stylesheet" href="plugin/bootstrap-icons-1.13.1/bootstrap-icons.css">
    <link rel="stylesheet" href="assets/style.css">
    <style>
        body {
            background: linear-gradient(135deg, #f8f7f2 0%, #e8dcc2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Segoe UI', sans-serif;
        }
        .login-card {
            width: min(100%, 420px);
            background: rgba(255,255,255,0.9);
            border: 1px solid rgba(0,0,0,0.05);
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(18, 26, 33, 0.14);
            padding: 30px;
        }
        .brand {
            text-align: center;
            margin-bottom: 24px;
        }
        .brand i {
            font-size: 2.3rem;
            color: #d4a949;
        }
        .brand h3 {
            margin-top: 10px;
            font-weight: 800;
            letter-spacing: 1px;
        }
    </style>
</head>
<body>
    <div class="login-card">
        <div class="brand">
            <i class="bi bi-building-fill"></i>
            <h3>GRAND LUXE</h3>
            <small class="text-muted">Hotel Management System</small>
        </div>

        <form id="loginForm" autocomplete="off">
            <div class="mb-3">
                <label class="form-label fw-semibold">Username</label>
                <input type="text" id="username" name="username" class="form-control form-control-lg" placeholder="Enter username" required>
            </div>

            <div class="mb-3">
                <label class="form-label fw-semibold">Password</label>
                <input type="password" id="password" name="password" class="form-control form-control-lg" placeholder="Enter password" required>
            </div>

            <div class="d-grid mt-4">
                <button type="submit" class="btn btn-gold btn-lg">Login</button>
            </div>

            <div class="mt-3 text-center small text-muted">
                Demo users:<br>
                <strong>admin</strong> / <strong>admin123</strong><br>
                <strong>manager</strong> / <strong>manager123</strong><br>
                <strong>receptionist</strong> / <strong>reception123</strong><br>
                <strong>subscriber</strong> / <strong>subscriber123</strong>
            </div>
        </form>
    </div>

    <script src="plugin/jquery-3.7.1.min.js"></script>
    <script src="plugin/bootstrap.bundle.min.js"></script>
    <script src="assets/language.js"></script>
    <script>
        $('#loginForm').on('submit', function(e){
            e.preventDefault();

            const username = $('#username').val().trim();
            const password = $('#password').val();

            if (!username || !password) {
                alert('Please enter username and password.');
                return;
            }

            $('body').css('cursor', 'wait');

            $.ajax({
                url: 'server.php',
                type: 'POST',
                dataType: 'json',
                data: {
                    action: 'login',
                    username: username,
                    password: password
                },
                success: function(res) {
                    $('body').css('cursor', 'default');
                    
                    if (res.success) {
                        window.location.href = res.redirect || 'index.php';
                    } else {
                        alert(res.message || 'Login failed.');
                        $('#loginForm')[0].reset();
                        $('#username').focus();
                    }
                },
                error: function() {
                    $('body').css('cursor', 'default');
                    alert('Login request failed. Please try again.');
                    $('#loginForm')[0].reset();
                    $('#username').focus();
                }
            });
        });
    </script>
</body>
</html>
