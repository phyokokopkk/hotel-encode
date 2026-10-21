<div id="page-booking" class="page-view">
    <div class="row g-4">
        <div class="col-12 col-lg-4 overflow-auto" style="max-height: calc(100vh - 150px);">
            <div class="card custom-card p-3">
                <h6 class="fw-bold mb-3"><i class="bi bi-plus-circle text-primary me-2"></i>New Reservation</h6>
                <form id="bookingForm" autocomplete="off">
                    <div class="mb-3">
                        <label class="form-label small fw-semibold">Guest Full Name</label>
                        <input name="guest_name" type="text" class="form-control" required >
                    </div>
                    <div class="mb-3">
                        <label class="form-label small fw-semibold">Guest NRC</label>
                        <!-- <input type="text" class="form-control" pattern="([1-9]|1[0-4])\/[A-Za-z]{6}\((Naing|Ea|E|Pyae)\)[0-9]{6}" placeholder="5/AaAaAa(Naing)123456" required > -->
                        <input name="guest_nrc" type="text" class="form-control" placeholder="5/AaAaAa(Naing)123456" required >
                    </div>
                    <div class="mb-3">
                        <label class="form-label small fw-semibold">Guest Phone Number</label>
                        <!-- <input name="guest_phone" type="tel" class="form-control" pattern="(09|09-|\+959)[0-9]{7,9}" placeholder="start with  09...   or   +959..." required > -->
                        <input name="guest_phone" type="tel" class="form-control" >
                    </div>
                    <div class="mb-3">
                        <label class="form-label small fw-semibold">Room Selection</label>
                        <select class="form-select chooseRooms" required>
                            <option disabled selected value="">Select Room</option>
                            <!-- Add option here by javascript -->
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label small fw-semibold">Check In Date</label>
                        <input name="check_in_date" type="date" class="form-control checkInDate" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label small fw-semibold">Check Out Date</label>
                        <input name="check_out_date" type="date" class="form-control checkOutDate" required>
                    </div>
                    <button type="submit" class="submitBtn btn btn-gold w-100">Create Reservation</button>
                </form>
            </div>
        </div>
        <div class="col-12 col-lg-8">
            <div class="card custom-card p-3">
                <h6 class="fw-bold mb-3"><i class="bi bi-card-list text-primary me-2"></i>Active Reservations List</h6>
                <div class="table-responsive overflow-auto" style="max-height: calc(100vh - 180px);">
                    <table class="table table-bordered table-hover align-middle">
                        <thead class="table-light sticky-top">
                            <tr style="text-align: center;">
                                <th>Room</th>
                                <th>Guest</th>
                                <th>Dates</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody id="bookingTableBody">
                            <!-- add table rows here by javascript -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>