<div id="page-users" class="page-view">
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="fw-bold mb-0">Users & Access Control</h5>
        <button class="btn btn-gold" aria-label="Add User" data-bs-toggle="modal" data-bs-target="#addUserModal">
            <i class="bi bi-person-plus me-1"></i> Add User
        </button>
    </div>

    <div class="card custom-card">
        <div class="table-responsive overflow-auto" style="max-height: calc(100vh - 180px);">
            <table class="table table-hover align-middle mb-0" aria-label="User accounts">
                <thead class="table-light sticky-top">
                    <tr class="text-center">
                        <th>Full Name</th>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Created</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="usersTableBody">
                    <tr>
                        <td colspan="6" class="text-center text-muted py-4">Loading users...</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
