<?php
$currentRole = $_SESSION['admin_role'] ?? 'subscriber';
$allowedMenus = [
    'admin' => ['dashboard', 'room', 'booking', 'minibar', 'payment', 'contact', 'summary', 'users', 'settings'],
    'manager' => ['dashboard', 'room', 'booking', 'minibar', 'payment', 'contact', 'summary'],
    'receptionist' => ['dashboard', 'room', 'booking', 'minibar', 'payment', 'contact'],
    'subscriber' => ['dashboard', 'summary']
];
$visibleMenus = $allowedMenus[$currentRole] ?? ['dashboard'];
?>
<nav id="sidebar" aria-label="Main navigation">
    <div class="sidebar-main">
        <div class="brand-logo d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center gap-2">
                <i class="bi bi-building-fill text-warning fs-3"></i>
                <span id="sidebarHotelName" class="fs-5 fw-bold text-white tracking-wide">Hotel</span>
            </div>
            <button type="button" class="btn btn-link text-white d-lg-none p-0" id="closeSidebar" aria-label="Close navigation">
                <i class="bi bi-x-lg fs-5"></i>
            </button>
        </div>
        <div class="nav flex-column mt-3 px-2 sidebar-menu">
            <?php if (in_array('dashboard', $visibleMenus, true)): ?>
                <a href="#dashboard" class="nav-link active" onclick="switchPage('dashboard')">
                    <i class="bi bi-grid-1x2-fill"></i> Dashboard
                </a>
            <?php endif; ?>
            <?php if (in_array('room', $visibleMenus, true)): ?>
                <a href="#room" class="nav-link" onclick="switchPage('room')">
                    <i class="bi bi-door-open-fill"></i> Room Management
                </a>
            <?php endif; ?>
            <?php if (in_array('booking', $visibleMenus, true)): ?>
                <a href="#booking" class="nav-link" onclick="switchPage('booking')">
                    <i class="bi bi-calendar2-check-fill"></i> Bookings
                </a>
            <?php endif; ?>
            <?php if (in_array('minibar', $visibleMenus, true)): ?>
                <a href="#minibar" class="nav-link" onclick="switchPage('minibar')">
                    <i class="bi bi-box-seam-fill"></i> In-Room Minibar
                </a>
            <?php endif; ?>
            
            <?php if (in_array('payment', $visibleMenus, true)): ?>
                <a href="#payment" class="nav-link" onclick="switchPage('payment')">
                    <i class="bi bi-credit-card-2-front-fill"></i> Guest Payment
                </a>
            <?php endif; ?>
            <?php if (in_array('contact', $visibleMenus, true)): ?>
                <a href="#contact" class="nav-link" onclick="switchPage('contact')">
                    <i class="bi bi-headset"></i> Contact & Support
                </a>
            <?php endif; ?>
            <?php if (in_array('summary', $visibleMenus, true)): ?>
                <a href="#summary" class="nav-link" onclick="switchPage('summary')">
                    <i class="bi bi-graph-up"></i> Summary
                </a>
            <?php endif; ?>
            <?php if (in_array('users', $visibleMenus, true)): ?>
                <a href="#users" class="nav-link" onclick="switchPage('users')">
                    <i class="bi bi-people-fill"></i> Users
                </a>
            <?php endif; ?>
            <?php if (in_array('settings', $visibleMenus, true)): ?>
                <a href="#settings" class="nav-link" onclick="switchPage('settings')">
                    <i class="bi bi-gear-fill"></i> Settings
                </a>
            <?php endif; ?>
            <?php if ($currentRole === 'admin'): ?>
                <a href="license-checker.php" class="nav-link">
                    <i class="bi bi-patch-check-fill"></i>Check License
                </a>
            <?php endif; ?>
        </div>
    </div>
    <div class="p-3 border-top border-secondary sidebar-footer">
        <div class="d-flex align-items-center gap-2 mb-2">
            <i class="bi bi-shield-check text-success fs-5"></i>
            <span class="small text-muted">System Active v2.4</span>
        </div>
        <button type="button" class="btn btn-outline-light btn-sm w-100" onclick="logoutUser()">
            <i class="bi bi-box-arrow-right me-2"></i>Logout
        </button>
    </div>
</nav>
<button type="button" id="sidebarBackdrop" class="sidebar-backdrop" aria-label="Close navigation"></button>