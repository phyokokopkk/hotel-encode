<div id="page-room" class="page-view">
    <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
        <h5 class="fw-bold mb-0">Room Status & Directory</h5>
        <div class="d-flex flex-wrap gap-2">
            <div class="btn-group" role="group" aria-label="Room layout">
                <button id="btnRoomTableView" type="button" class="btn btn-outline-secondary active" aria-pressed="true">
                    <i class="bi bi-list-ul me-1"></i> Table
                </button>
                <button id="btnRoomCardView" type="button" class="btn btn-outline-secondary" aria-pressed="false">
                    <i class="bi bi-grid-3x3-gap me-1"></i> Cards
                </button>
            </div>
            <button id="btnShowAvailable" class="btn btn-secondary">
                <i class="bi bi-eye-slash me-1"></i> Show Only Available
            </button>
            <button id="btnEditRoomTypes" class="btn btn-gold" data-bs-toggle="modal" data-bs-target="#editRoomTypeModal">
                <i class="bi bi-pencil me-1"></i> Edit Room Types
            </button>
            <button id="btnAddNewRoom" class="btn btn-gold" data-bs-toggle="modal" data-bs-target="#addRoomModal">
                <i class="bi bi-plus-lg me-1"></i> Add New Room
            </button>
        </div>
    </div>
    <div class="table-responsive room-table-wrapper overflow-auto" style="max-height: calc(100vh - 180px);">
        <table class="table room-table table-bordered table-hover align-middle mb-0">
            <thead class="sticky-top">
                <tr class="text-center">
                    <th scope="col">Room</th>
                    <th scope="col">Floors</th>
                    <th scope="col">Max</th>
                    <th scope="col">Type</th>
                    <th scope="col">Features</th>
                    <th scope="col">Prices /night</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody id="roomTableBody">
                <!-- insert tr by javascript -->
            </tbody>
        </table>
    </div>
    <div id="roomCardGrid" class="row g-3 d-none" aria-live="polite"></div>
</div>