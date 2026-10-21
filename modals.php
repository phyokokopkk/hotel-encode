<div class="modal fade" id="addRoomModal" tabindex="-1" style="z-index: 1110;">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 id="addRoomModalLabel" class="modal-title fw-bold">Add New Hotel Room</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div class="modal-body">
                <form id="addRoomForm" autocomplete="off">
                    <input type="hidden" name="roomId" id="roomIdInput">
                    <div class="mb-3">
                        <label class="form-label">Room Number</label>
                        <input id="roomNumberInput" name="roomNumber" type="text" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Floor</label>
                        <input id="floorInput" name="floor" type="number" min="1" class="form-control" placeholder="e.g. 4" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Room Type</label>
                        <input id="roomTypeInput" name="type" type="text" class="form-control" list="roomTypeDataList" placeholder="e.g. Standard Room" required>
                        <datalist id="roomTypeDataList">
                            // Options will be populated dynamically by JavaScript
                        </datalist>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Max Occupancy</label>
                        <input id="maxOccupancyInput" name="maxOccupancy" type="number" min="1" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Features</label>
                        <textarea id="roomFeaturesInput" name="features" class="form-control" placeholder="e.g. Air conditioning, Free Wi-Fi"></textarea>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Price Per Night (Ks)</label>
                        <input id="pricePerNightInput" name="pricePerNight" type="number" min="0" class="form-control" step="1000" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Status</label>
                        <select id="statusInput" name="status" class="form-select" required>
                            <option value="Available" selected>Available</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Disabled">Disabled</option>
                        </select>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <input id="saveRoomBtn" type="submit" class="btn btn-gold" value="Save Room" form="addRoomForm">
            </div>
        </div>
    </div>
</div>

<!-- for edit room type modal table list -->
<div class="modal fade" id="editRoomTypeModal" tabindex="-1" style="z-index: 1100;">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title fw-bold">Edit Room Types</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <div class="d-flex justify-content-end mb-3">
                    <button id="addRoomTypeBtn" type="button" class="btn btn-primary">
                        <i class="fas fa-plus"></i> Add Room Type
                    </button>
                </div>
                <div class="table-responsive overflow-auto" style="max-height: calc(100vh - 180px);">
                    <table id="roomTypeTable" class="table table-bordered table-hover align-middle mb-0">
                        <thead class="table-light sticky-top">
                            <tr class="text-center">
                                <th scope="col">Room Type</th>
                                <th scope="col">Max</th>
                                <th scope="col">Features</th>
                                <th scope="col">Price/night</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody id="roomTypeTableBody">
                            <!-- insert tr by javascript -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- for room-minibar charge to room modal -->
<div class="modal fade" id="chargeToRoomModal" tabindex="-1" style="z-index: 1100;">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title fw-bold">Charge Item to Room</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <form id="chargeToRoomForm" autocomplete="off">
                    <input type="hidden" name="itemId" id="itemIdInput">
                    <input type="hidden" name="itemName" id="itemNameInput">
                    <input type="hidden" name="costPrice" id="itemCostPriceInput">
                    <input type="hidden" name="unitPrice" id="itemPriceInput">
                    <div class="mb-3">
                        <label class="form-label">Purchase Type</label>
                        <select id="purchaseTypeSelect" name="purchaseType" class="form-select" required>
                            <option value="Room">Room Charge</option>
                            <option value="Staff">Staff Purchase</option>
                            <option value="Other">Other / General Purchase</option>
                        </select>
                    </div>
                    <div class="mb-3" id="roomNumberChargeField">
                        <label class="form-label">Room Number</label>
                        <input id="roomNumberChargeInput" name="roomNumber" type="text" class="form-control" list="recentRoomNumbersList">
                        <datalist id="recentRoomNumbersList"></datalist>
                    </div>
                    <div class="mb-3 d-none" id="staffBuyerField">
                        <label class="form-label">Staff Name</label>
                        <input id="staffBuyerNameInput" name="staffName" type="text" class="form-control" placeholder="Enter staff name">
                    </div>
                    <div class="mb-3 d-none" id="otherBuyerField">
                        <label class="form-label">Buyer Name</label>
                        <input id="otherBuyerNameInput" name="otherName" type="text" class="form-control" placeholder="Enter buyer name">
                    </div>
                    <div class="mb-3 d-none" id="buyerPhoneField">
                        <label class="form-label">Buyer Phone</label>
                        <input id="buyerPhoneInput" name="buyerPhone" type="text" class="form-control" placeholder="Enter phone number">
                    </div>
                    <div class="mb-3 d-none" id="buyerReferenceField">
                        <label class="form-label" id="buyerReferenceLabel">Reference</label>
                        <input id="buyerReferenceInput" name="buyerReference" type="text" class="form-control" placeholder="Room number / staff ID / customer reference">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Item Name</label>
                        <input id="chargeItemName" type="text" class="form-control" disabled>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Unit Price (Ks)</label>
                        <input id="chargeItemPrice" type="number" class="form-control" disabled>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Quantity</label>
                        <input id="quantityInput" name="quantity" type="number" min="1" value="1" class="form-control" required>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <input id="chargeToRoomBtn" type="submit" class="btn btn-gold" value="Charge Item" form="chargeToRoomForm">
            </div>
        </div>
    </div>
</div>

<!-- for add minibar items -->
<div class="modal fade" id="addMinibarModal" tabindex="-1" style="z-index: 1100;">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title fw-bold">Add New Minibar Item</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <form id="addMinibarForm" autocomplete="off">
                    <input type="hidden" name="itemId" id="minibarItemIdInput">
                    <div class="mb-3">
                        <label class="form-label">Item Name</label>
                        <input id="minibarItemNameInput" name="itemName" type="text" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Category</label>
                        <select id="minibarCategorySelect" name="categoryId" class="form-select minibar-category-select" required>
                            <option value="">Select category</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Cost Price (Ks)</label>
                        <input id="minibarCostPriceInput" name="costPrice" type="number" min="0" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Unit Price (Ks)</label>
                        <input id="minibarUnitPriceInput" name="unitPrice" type="number" min="0" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Stock Level</label>
                        <input id="minibarStockLevelInput" name="stockLevel" type="number" min="1" class="form-control" required>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <input id="saveMinibarBtn" type="submit" class="btn btn-gold" value="Save Item" form="addMinibarForm">
            </div>
        </div>
    </div>
</div>

<!-- for edit minibar items -->
<div class="modal fade" id="editMinibarModal" tabindex="-1" style="z-index: 1100;">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title fw-bold">Edit Minibar Item</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <form id="editMinibarForm" autocomplete="off">
                    <input type="hidden" name="itemId" id="editItemIdInput">
                    <div class="mb-3">
                        <label class="form-label">Item Name</label>
                        <input id="editItemNameInput" name="itemName" type="text" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Category</label>
                        <select id="editMinibarCategorySelect" name="categoryId" class="form-select minibar-category-select" required>
                            <option value="">Select category</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Cost Price (Ks)</label>
                        <input id="editItemCostPriceInput" name="costPrice" type="number" min="0" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Unit Price (Ks)</label>
                        <input id="editItemPriceInput" name="unitPrice" type="number" min="0" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Stock Level</label>
                        <input id="editItemStockQtyInput" name="stockLevel" type="number" min="1" class="form-control" required>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <input id="updateMinibarBtn" type="submit" class="btn btn-gold" value="Update Item" form="editMinibarForm">
            </div>
        </div>
    </div>
</div>

<!-- for minibar category management -->
<div class="modal fade" id="manageMinibarCategoriesModal" tabindex="-1" style="z-index: 1100;">
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title fw-bold">Manage Minibar Categories</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <form id="addMinibarCategoryForm" class="row g-2 mb-3" autocomplete="off">
                    <div class="col-md-9">
                        <input id="newMinibarCategoryInput" name="categoryName" type="text" class="form-control" placeholder="Add a new category" required>
                    </div>
                    <div class="col-md-3 d-grid">
                        <button type="submit" class="btn btn-primary">Add</button>
                    </div>
                </form>

                <div class="table-responsive">
                    <table class="table table-bordered align-middle mb-0">
                        <thead class="table-light">
                            <tr class="text-center">
                                <th style="width: 60%;">Category</th>
                                <th style="width: 40%;">Actions</th>
                            </tr>
                        </thead>
                        <tbody id="minibarCategoryTableBody"></tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="roomInfoModal" tabindex="-1" aria-labelledby="roomInfoModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow">
            <div class="modal-header">
                <h5 class="modal-title fw-bold" id="roomInfoModalLabel">Room Details</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row g-3">
                    <div class="col-6">
                        <span class="text-muted small">Room</span>
                        <div id="roomInfoNumber" class="fw-bold fs-5"></div>
                    </div>
                    <div class="col-6">
                        <span class="text-muted small">Floor</span>
                        <div id="roomInfoFloor" class="fw-bold"></div>
                    </div>
                    <div class="col-6">
                        <span class="text-muted small">Type</span>
                        <div id="roomInfoType" class="fw-bold"></div>
                    </div>
                    <div class="col-6">
                        <span class="text-muted small">Status</span>
                        <div><span id="roomInfoStatus" class="badge"></span></div>
                    </div>
                    <div class="col-6">
                        <span class="text-muted small">Max Occupancy</span>
                        <div id="roomInfoMax" class="fw-bold"></div>
                    </div>
                    <div class="col-6">
                        <span class="text-muted small">Price / night</span>
                        <div id="roomInfoPrice" class="fw-bold text-primary"></div>
                    </div>
                    <div class="col-12">
                        <span class="text-muted small">Features</span>
                        <div id="roomInfoFeatures" class="fw-bold"></div>
                    </div>
                    <div class="col-6">
                        <span class="text-muted small">Guest Name</span>
                        <div id="roomInfoGuestName" class="fw-bold"></div>
                    </div>
                    <div class="col-6">
                        <span class="text-muted small">Phone</span>
                        <div id="roomInfoGuestPhone" class="fw-bold"></div>
                    </div>
                    <div class="col-6">
                        <span class="text-muted small">Check-In</span>
                        <div id="roomInfoCheckIn" class="fw-bold"></div>
                    </div>
                    <div class="col-6">
                        <span class="text-muted small">Check-Out</span>
                        <div id="roomInfoCheckOut" class="fw-bold"></div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="bookingStatusConfirmModal" tabindex="-1" aria-labelledby="bookingStatusConfirmTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow">
            <div class="modal-header">
                <h5 class="modal-title fw-bold" id="bookingStatusConfirmTitle">Confirm Booking Action</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p class="mb-0" id="bookingStatusConfirmMessage">Are you sure you want to do this booking?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" id="bookingStatusConfirmBtn" class="btn btn-gold">Confirm</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="checkoutPaymentWarningModal" tabindex="-1" aria-labelledby="checkoutPaymentWarningLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow">
            <div class="modal-header bg-warning-subtle">
                <h5 class="modal-title fw-bold text-warning" id="checkoutPaymentWarningLabel"><i class="bi bi-exclamation-triangle me-2"></i>Payment Required</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p class="mb-0">Please charge payment first before checking out this booking.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" id="checkoutPaymentConfirmBtn" class="btn btn-gold">Go to Payment</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="incomePrintOptionsModal" tabindex="-1" aria-labelledby="incomePrintOptionsLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content border-0 shadow">
            <div class="modal-header">
                <h6 class="modal-title fw-bold" id="incomePrintOptionsLabel"><i class="bi bi-printer me-2 text-warning"></i>Print layout</h6>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <label class="form-label small fw-semibold" for="incomePrintOrientation">Page orientation</label>
                <select id="incomePrintOrientation" class="form-select form-select-sm mb-3">
                    <option value="landscape" selected>Landscape - best for full ledger</option>
                    <option value="portrait">Portrait - narrow report</option>
                </select>
                <label class="form-label small fw-semibold" for="incomePrintDensity">Report detail</label>
                <select id="incomePrintDensity" class="form-select form-select-sm">
                    <option value="detailed" selected>Detailed - summary and full columns</option>
                    <option value="compact">Compact - smaller rows for more records</option>
                </select>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-light" data-bs-dismiss="modal">Cancel</button>
                <button type="button" id="confirmIncomePrint" class="btn btn-sm btn-gold"><i class="bi bi-printer me-1"></i>Print now</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="editUserModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title fw-bold">Edit User</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="editUserForm" autocomplete="off">
                    <input type="hidden" name="user_id">
                    <div class="mb-3">
                        <label class="form-label">Full Name</label>
                        <input type="text" name="full_name" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Username</label>
                        <input type="text" name="username" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Password</label>
                        <input type="password" name="password" class="form-control" placeholder="Leave blank to keep current password">
                    </div>
                    <div class="mb-3 d-none" id="adminPasswordVerification">
                        <label class="form-label">Target admin's current password</label>
                        <input type="password" name="current_password" class="form-control" autocomplete="current-password">
                        <div class="form-text">Enter the target admin account's current password to authorize this change.</div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Role</label>
                        <select name="role" class="form-select" required>
                            <option value="admin">Admin</option>
                            <option value="manager">Manager</option>
                            <option value="receptionist">Receptionist</option>
                            <option value="subscriber">Subscriber</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Status</label>
                        <select name="status" class="form-select" required>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-gold" form="editUserForm">Save Changes</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="changeOwnPasswordModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title fw-bold">Change Your Password</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form id="changeOwnPasswordForm" autocomplete="off">
                <div class="modal-body">
                    <div class="mb-3">
                        <label class="form-label">New password</label>
                        <input type="password" name="password" class="form-control" autocomplete="new-password" required>
                    </div>
                    <div class="mb-3 d-none" id="ownAdminPasswordVerification">
                        <label class="form-label">Current password</label>
                        <input type="password" name="current_password" class="form-control" autocomplete="current-password">
                    </div>
                    <div>
                        <label class="form-label">Confirm new password</label>
                        <input type="password" name="confirm_password" class="form-control" autocomplete="new-password" required>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-gold">Change Password</button>
                </div>
            </form>
        </div>
    </div>
</div>

<div class="modal fade" id="addUserModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title fw-bold">Create New User</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">
                <form id="createUserForm" autocomplete="off">
                    <div class="mb-3">
                        <label class="form-label">Full Name</label>
                        <input type="text" name="full_name" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Username</label>
                        <input type="text" name="username" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Password</label>
                        <input type="password" name="password" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Role</label>
                        <select name="role" class="form-select" required>
                            <option value="admin">Admin</option>
                            <option value="manager">Manager</option>
                            <option value="receptionist">Receptionist</option>
                            <option value="subscriber">Subscriber</option>
                        </select>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-gold" form="createUserForm">Create User</button>
            </div>
        </div>
    </div>
</div>

<style>
/* Wider guest payment history modal for clearer tables */
.guest-payment-modal { max-width: 1200px; }
.guest-payment-modal .modal-content { overflow: visible; }
.guest-payment-modal .table { white-space: nowrap; }
.guest-payment-modal .table-responsive { overflow-x: auto; }
.guest-payment-modal .card { margin-bottom: 0; }

.guest-payment-summary-stat {
    background: #f8fafc;
    border: 1px solid #dbe3ee;
    border-left: 4px solid #2563eb;
    border-radius: 0.75rem;
    color: #0f172a;
    height: 100%;
    padding: 0.8rem 0.9rem;
}
.guest-payment-summary-stat .label {
    display: block;
    color: #475569;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    margin-bottom: 0.35rem;
    text-transform: uppercase;
}
.guest-payment-summary-stat strong {
    color: #0f172a;
    display: block;
    font-size: 1.05rem;
    line-height: 1.3;
}
.guest-payment-summary-stat.balance {
    background: #fff1f2;
    border-color: #fecdd3;
    border-left-color: #dc2626;
}
.guest-payment-summary-stat.balance strong {
    color: #b91c1c;
}
.guest-payment-summary-stat.success {
    background: #ecfdf5;
    border-color: #bbf7d0;
    border-left-color: #16a34a;
}
.guest-payment-summary-stat.success strong {
    color: #166534;
}
.guest-payment-summary-stat.warning {
    background: #fff7ed;
    border-color: #fed7aa;
    border-left-color: #f59e0b;
}
.guest-payment-summary-stat.warning strong {
    color: #92400e;
}
</style>
<div class="modal fade" id="guestPaymentHistoryModal" tabindex="-1" aria-labelledby="guestPaymentHistoryTitle" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-scrollable guest-payment-modal">
        <div class="modal-content">
            <div class="modal-header">
                <div>
                    <h5 class="modal-title fw-bold" id="guestPaymentHistoryTitle">Guest payment records</h5>
                    <p class="text-muted small mb-0" id="guestPaymentHistorySubtitle"></p>
                </div>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div id="guestPaymentHistoryMessage" class="small text-muted mb-2" role="status"></div>
                <div id="guestPaymentHistorySummary" class="row g-2 mb-3" aria-live="polite"></div>
                <div id="guestPaymentHistoryBody" class="d-grid gap-3">
                    <div class="text-center text-muted py-3">Select a guest to view payment records.</div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>