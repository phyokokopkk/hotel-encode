<div id="page-minibar" class="page-view">
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="fw-bold ">In-Room Minibar Inventory & Room Charge</h5>
        <div class="d-flex gap-2">
            <button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#manageMinibarCategoriesModal">
                <i class="bi bi-tags"></i> Manage Categories
            </button>
            <button type="button" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#addMinibarModal">
                <i class="bi bi-plus-lg"></i> Add Item
            </button>
        </div>
    </div>

    <div class="card custom-card p-3 mb-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <div>
                <h6 class="fw-bold mb-1">Pending In-Room Charges</h6>
                <small class="text-muted">Room and minibar charges waiting for payment</small>
            </div>
            <span id="pendingChargesCount" class="badge rounded-pill bg-warning text-dark">0 item(s)</span>
        </div>
        <div class="table-responsive overflow-auto" style="max-height: 300px;">
            <table class="table table-bordered table-hover align-middle mb-0">
                <thead class="table-light sticky-top">
                    <tr class="text-center align-middle">
                        <th>Room</th>
                        <th>Guest Name</th>
                        <th>Phone</th>
                        <th>Charge Type</th>
                        <th>Amount</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody id="pendingChargesTableBody">
                    <tr>
                        <td colspan="6" class="text-center text-muted py-4">Loading pending charges...</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="table-responsive room-table-wrapper overflow-auto mb-4" style="max-height: calc(100vh - 180px);">
        <table  class="table room-table table-bordered table-hover align-middle mb-0">
            <thead class="table-light sticky-top">
                <tr class="text-center align-middle">
                    <th>Item Name</th>
                    <th>Category</th>
                    <th>Cost Price</th>
                    <th>Unit Price</th>
                    <th>Stock Level</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody id="minibarTableBody">
                
            </tbody>
        </table>
    </div>

    <div class="card custom-card p-3">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <div>
                <h6 class="fw-bold mb-1">Minibar Charge Records</h6>
                <small class="text-muted">Recorded minibar purchases for rooms, staff, and other buyers</small>
            </div>
            <span id="minibarChargeRecordsCount" class="badge rounded-pill bg-light text-dark border">0 record(s)</span>
        </div>
        <div class="table-responsive overflow-auto" style="max-height: 350px;">
            <table class="table table-bordered table-hover align-middle mb-0">
                <thead class="table-light sticky-top">
                    <tr class="text-center align-middle">
                        <th>Date</th>
                        <th>Buyer Type</th>
                        <th>Buyer</th>
                        <th>Reference</th>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody id="minibarChargeRecordsTableBody">
                    <tr>
                        <td colspan="8" class="text-center text-muted py-4">Loading minibar charge records...</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

</div>