<div id="page-dashboard" class="page-view active">
    <!-- Stat Cards -->
    <div class="row g-3 mb-4">
        <div class="col-12 col-sm-6 col-xl-3">
            <div class="card custom-card stat-card p-3" style="border-left-color: #10B981;">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <span class="text-muted small fw-semibold">OCCUPIED ROOMS</span>
                        <h4 id="occupiedRooms" class="fw-bold mb-0 mt-1"></h4>
                    </div>
                    <div class="dashboard-stat-icon p-3 rounded-circle">
                        <i class="bi bi-person-check fs-3"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 col-sm-6 col-xl-3">
            <div class="card custom-card stat-card p-3" style="border-left-color: #3B82F6;">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <span class="text-muted small fw-semibold">TODAY'S BOOKINGS</span>
                        <h4 id="todaysBookings" class="fw-bold mb-0 mt-1"></h4>
                    </div>
                    <div class="dashboard-stat-icon p-3 rounded-circle">
                        <i class="bi bi-calendar-event fs-3"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 col-sm-6 col-xl-3">
            <div class="card custom-card stat-card p-3" style="border-left-color: #22C55E;">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <span class="text-muted small fw-semibold">TODAY'S ROOM CHARGES</span>
                        <h5 id="todaysRoomCharges" class="fw-bold mb-0 mt-1"></h5>
                    </div>
                    <div class="dashboard-stat-icon p-3 rounded-circle">
                        <i class="bi bi-cash-stack fs-3"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 col-sm-6 col-xl-3">
            <div class="card custom-card stat-card p-3" style="border-left-color: #8B5CF6;">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <span class="text-muted small fw-semibold">TODAY'S REVENUE</span>
                        <h5 id="todaysRevenue" class="fw-bold mb-0 mt-1"></h5>
                    </div>
                    <div class="dashboard-stat-icon p-3 rounded-circle">
                        <i class="bi bi-wallet2 fs-3"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="card custom-card mb-4">
        <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
            <h6 class="mb-0 fw-bold"><i class="bi bi-tags me-2 text-primary"></i>Today's Minibar Sales by Category</h6>
            <span class="small text-muted">Daily summary</span>
        </div>
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
                <thead class="table-light">
                    <tr style="text-align: center;">
                        <th>Category</th>
                        <th>Total Sales</th>
                    </tr>
                </thead>
                <tbody id="minibarCategorySummaryTableBody">
                    <tr>
                        <td colspan="2" class="text-center text-muted">Loading...</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Recent Bookings Table -->
    <div class="card custom-card mb-4">
        <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
            <h6 class="mb-0 fw-bold"><i class="bi bi-clock-history me-2 text-warning"></i>Recent Booking Operations</h6>
            <!-- <button class="btn btn-sm btn-gold" onclick="switchPage('booking')">View All</button> -->
        </div>
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
                <thead class="table-light">
                    <tr style="text-align: center;">
                        <th>Guest Name</th>
                        <th>Room No</th>
                        <th>Check In</th>
                        <th>Check Out</th>
                        <th>Status</th>
                        <th>Payment Status</th>
                    </tr>
                </thead>
                <tbody id="recentBookingsTableBody">
                    <!-- insert tr by javascript -->
                </tbody>
            </table>
        </div>
    </div>
</div>