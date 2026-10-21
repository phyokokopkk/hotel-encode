<div id="page-contact" class="page-view">
    <div class="row g-4">
        <div class="col-12 col-md-5">
            <div class="card custom-card p-4">
                <h5 class="fw-bold mb-3"><i class="bi bi-headset text-warning me-2"></i>Front Desk Contacts</h5>
                <div id="hotelContactError" class="alert alert-warning d-none" role="alert"></div>
                <p class="mb-2"><i class="bi bi-building me-2 text-primary"></i><span id="hotelContactName">Loading...</span></p>
                <p class="mb-2"><i class="bi bi-telephone me-2 text-primary"></i><span id="hotelContactPhone">Loading...</span></p>
                <!-- <p class="mb-2"><i class="bi bi-envelope me-2 text-primary"></i> support@grandluxehotel.com</p> -->
                <p class="mb-0"><i class="bi bi-geo-alt me-2 text-primary"></i><span id="hotelContactAddress">Loading...</span></p>
            </div>
        </div>
        <div class="col-12 col-md-7">
            <div class="card custom-card p-4">
                <h5 class="fw-bold mb-3">Guest Request / Support Ticket</h5>
                <form id="contactSupportForm" autoComplete="off">
                    <div class="mb-3">
                        <label class="form-label small fw-semibold">Guest Room</label>
                        <input type="text" name="guest_room" class="form-control" placeholder="Room Number" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label small fw-semibold">Subject</label>
                        <input type="text" name="subject" class="form-control" placeholder="Enter subject" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label small fw-semibold">Message / Request</label>
                        <textarea class="form-control" name="message" rows="4" placeholder="Type request or feedback..." required></textarea>
                    </div>
                    <button type="submit" class="btn btn-gold">Send Support Ticket</button>
                </form>
            </div>
        </div>
    </div>

    <div class="card custom-card p-4 mt-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="fw-bold mb-0"><i class="bi bi-card-list me-2 text-primary"></i>Contact Logs & Replies</h5>
            <span class="badge bg-light text-dark">Live ticket log</span>
        </div>
        <div id="contactTicketsList" class="row g-3"></div>
    </div>
</div>