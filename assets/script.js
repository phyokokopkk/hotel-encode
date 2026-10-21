//set globle variables
var enableChangeEvent_RTI = true;

// Sidebar Toggle for Mobile
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('toggleSidebar');
const sidebarClose = document.getElementById('closeSidebar');
const sidebarBackdrop = document.getElementById('sidebarBackdrop');

function setSidebarOpen(isOpen) {
    sidebar.classList.toggle('show', isOpen);
    sidebarBackdrop.classList.toggle('show', isOpen);
    sidebarToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('sidebar-open', isOpen && window.innerWidth < 992);
}

sidebarToggle.addEventListener('click', () => {
    setSidebarOpen(!sidebar.classList.contains('show'));
});
sidebarClose.addEventListener('click', () => setSidebarOpen(false));
sidebarBackdrop.addEventListener('click', () => setSidebarOpen(false));
document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && sidebar.classList.contains('show')) {
        setSidebarOpen(false);
        sidebarToggle.focus();
    }
});
window.addEventListener('resize', () => {
    if (window.innerWidth >= 992) {
        setSidebarOpen(false);
    }
});

// Toast alert message renderer replacing native alerts
function showAppToast(message) {
    document.getElementById('toastMessage').innerText = window.hotelTranslate ? window.hotelTranslate(message) : message;
    const toastEl = document.getElementById('appToast');
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}

//set adminName in top-nav-bar
function setAdminName(name) {
    document.getElementById('adminName').innerText = name || 'Admin';
}

window.loadHotelBranding = function() {
    $.ajax({
        url: 'server.php',
        type: 'POST',
        dataType: 'json',
        data: { action: 'getHotelBranding' },
        success: function(res) {
            if (!res.success) {
                return;
            }

            const hotelName = res.hotel_name || 'Hotel';
            $('#sidebarHotelName').text(hotelName);
            const titleSuffix = document.documentElement.lang === 'my' ? 'ဟိုတယ် စီမံခန့်ခွဲမှု စနစ်' : 'Hotel Management System';
            document.title = hotelName + ' - ' + titleSuffix;
        }
    });
};

const notificationReadStorageKey = 'hotelReadNotifications';
const notificationIcons = {
    booking: 'bi-calendar-plus text-primary',
    contact: 'bi-chat-dots text-info',
    payment: 'bi-cash-stack text-warning',
    minibar: 'bi-cup-straw text-success'
};
let currentNotifications = [];

function getReadNotificationIds() {
    try {
        const storedIds = localStorage.getItem(notificationReadStorageKey);
        if (!storedIds) {
            return [];
        }
        const ids = JSON.parse(storedIds);
        return Array.isArray(ids) ? ids : [];
    } catch (error) {
        console.error('Unable to read notification state from browser storage.', error);
        return [];
    }
}

function saveReadNotificationIds(ids) {
    try {
        localStorage.setItem(notificationReadStorageKey, JSON.stringify([...new Set(ids)]));
        return true;
    } catch (error) {
        console.error('Unable to save notification state to browser storage.', error);
        showAppToast('Unable to save notification read status in this browser.');
        return false;
    }
}

function renderNotifications() {
    const list = document.getElementById('notificationList');
    const badge = document.getElementById('notificationBadge');
    const markReadButton = document.getElementById('markNotificationsRead');
    const readIds = getReadNotificationIds();
    list.querySelectorAll('.notification-item').forEach(item => item.remove());

    const unreadCount = currentNotifications.filter(notification => !readIds.includes(notification.id)).length;
    badge.textContent = unreadCount > 99 ? '99+' : String(unreadCount);
    badge.classList.toggle('d-none', unreadCount === 0);
    markReadButton.disabled = unreadCount === 0;

    if (currentNotifications.length === 0) {
        const status = document.getElementById('notificationStatus');
        status.textContent = window.hotelTranslate ? window.hotelTranslate('You’re all caught up.') : 'You’re all caught up.';
        status.classList.remove('d-none');
        return;
    }

    document.getElementById('notificationStatus').classList.add('d-none');
    currentNotifications.forEach(notification => {
        const isUnread = !readIds.includes(notification.id);
        const item = document.createElement('li');
        item.className = 'notification-item';

        const button = document.createElement('button');
        button.type = 'button';
        button.className = `dropdown-item py-2 small d-flex gap-2 align-items-start${isUnread ? ' bg-light' : ''}`;
        button.dataset.notificationId = notification.id;
        button.dataset.notificationTarget = notification.target;

        const icon = document.createElement('i');
        icon.className = `bi ${notificationIcons[notification.type] || 'bi-bell text-secondary'} mt-1`;
        const content = document.createElement('span');
        content.className = 'flex-grow-1';
        const title = document.createElement('span');
        title.className = 'd-block fw-semibold';
        title.textContent = window.hotelTranslate ? window.hotelTranslate(notification.title) : notification.title;
        const message = document.createElement('span');
        message.className = 'd-block text-muted text-wrap';
        message.textContent = window.hotelTranslate ? window.hotelTranslate(notification.message) : notification.message;
        content.append(title, message);
        if (isUnread) {
            const unreadIndicator = document.createElement('span');
            unreadIndicator.className = 'rounded-circle bg-primary mt-2 flex-shrink-0';
            unreadIndicator.style.width = '7px';
            unreadIndicator.style.height = '7px';
            unreadIndicator.setAttribute('aria-label', window.hotelTranslate ? window.hotelTranslate('Unread') : 'Unread');
            button.append(icon, content, unreadIndicator);
        } else {
            button.append(icon, content);
        }
        item.appendChild(button);
        list.appendChild(item);
    });
}

function loadNotifications() {
    $.ajax({
        url: 'server.php',
        type: 'POST',
        dataType: 'json',
        data: { action: 'getNotifications' },
        success: function(res) {
            if (!res.success) {
                const status = document.getElementById('notificationStatus');
                const fallbackMessage = res.message || 'Unable to load notifications.';
                status.textContent = window.hotelTranslate ? window.hotelTranslate(fallbackMessage) : fallbackMessage;
                status.classList.remove('d-none');
                return;
            }

            currentNotifications = Array.isArray(res.notifications) ? res.notifications : [];
            renderNotifications();
        },
        error: function() {
            const status = document.getElementById('notificationStatus');
            const fallbackMessage = 'Unable to load notifications. Please try again.';
            status.textContent = window.hotelTranslate ? window.hotelTranslate(fallbackMessage) : fallbackMessage;
            status.classList.remove('d-none');
        }
    });
}

function openNotificationTarget(target, targetId) {
    const pageByTarget = {
        booking: 'booking',
        contact: 'contact',
        payment: 'payment',
        minibar: 'minibar'
    };
    if (pageByTarget[target]) {
        const selectedBookingId = target === 'payment' && targetId ? Number(targetId) : null;
        switchPage(pageByTarget[target], selectedBookingId);
    }
}

$(document).ready(function() {
    loadHotelBranding();
    loadNotifications();

    document.getElementById('notificationList').addEventListener('click', function(event) {
        const button = event.target.closest('[data-notification-id]');
        if (!button) {
            return;
        }

        const notificationId = button.dataset.notificationId;
        const readIds = getReadNotificationIds();
        if (!readIds.includes(notificationId)) {
            saveReadNotificationIds([...readIds, notificationId]);
        }
        const target = button.dataset.notificationTarget;
        const targetId = button.dataset.notificationTargetId;
        renderNotifications();
        openNotificationTarget(target, targetId);
    });

    document.getElementById('markNotificationsRead').addEventListener('click', function() {
        const readIds = getReadNotificationIds();
        saveReadNotificationIds([...readIds, ...currentNotifications.map(notification => notification.id)]);
        renderNotifications();
    });

    document.getElementById('notificationButton').addEventListener('shown.bs.dropdown', loadNotifications);
});

window.logoutUser = function() {
    if (!confirm('Are you sure you want to log out?')) {
        return;
    }

    $.ajax({
        url: 'server.php',
        type: 'POST',
        dataType: 'json',
        data: { action: 'logout' },
        success: function(res) {
            if (res.success) {
                window.location.href = 'login.php';
            } else {
                showAppToast(res.message || 'Unable to log out.');
            }
        },
        error: function() {
            window.location.href = 'login.php';
        }
    });
};

// Page Switcher Navigation logic
function switchPage(pageId, selectedRoomId = null) {
    // Hide all pages
    const pages = document.querySelectorAll('.page-view');
    pages.forEach(page => page.classList.remove('active'));
    const selectedPage = document.getElementById('page-' + pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }

    const navLinks = document.querySelectorAll('#sidebar .nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + pageId) {
            link.classList.add('active');
        }
    });

    $("#searchGuests").toggleClass("d-none", pageId !== "booking");
    $("#searchRooms").toggleClass("d-none", pageId !== "room");
    if(pageId == "booking"){
        $("#searchGuests input").val("");
    }

    const titles = {
        'dashboard': 'Dashboard Overview',
        'room': 'Room Management',
        'booking': 'Booking & Reservations',
        'food': 'Food & Restaurant Services',
        'juice': 'Juice & Beverage Bar',
        'minibar': 'In-Room Minibar Management',
        'payment': 'Guest Billing & Payment',
        'contact': 'Contact & Support Center',
        'summary': 'Summary & Reports',
        'users': 'User Management',
        'settings': 'System Settings'
    };
    document.getElementById('pageTitle').innerText = titles[pageId] || 'Dashboard';

    if (pageId === 'dashboard') {
        loadDashboardPage();
    }
    else if (pageId === 'room') {
        const searchTerm = document.getElementById('roomSearchInput').value.trim();
        loadRoomPage(searchTerm === '' && window.roomAvailabilityFilter);
    }
    else if (pageId === 'booking') {
        loadBookingPage(selectedRoomId);
    }
    else if (pageId === 'minibar') {
        loadRoomMinibar();
    }
    else if (pageId === 'payment') {
        loadGuestPayment(selectedRoomId);
    }
    else if (pageId == 'contact') {
        loadContactSupport();
    }
    else if (pageId === 'summary') {
        loadSummaryPage();
    }
    else if (pageId === 'users') {
        loadUsersPage();
    }
    else if (pageId === 'settings') {
        loadSettingsPage();
    }

    if (window.innerWidth < 992) {
        setSidebarOpen(false);
    }
}

window.onload = function() {
    loadDashboardPage();
};