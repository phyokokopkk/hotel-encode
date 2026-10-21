<div id="page-payment" class="page-view">
    <div class="mb-3">
        <h5 class="fw-bold mb-1">Guest Billing &amp; Payment</h5>
        <p class="text-muted small mb-0">Choose a booking to review its charges and collect the outstanding balance.</p>
    </div>
    <div class="card custom-card p-3 p-md-4 mb-3">
        <div class="row align-items-end g-3">
            <div class="col-12 col-md">
                <label class="form-label small fw-semibold" for="paymentHistoryGuestSelect">Select guest</label>
                <input type="text" class="form-control" id="paymentHistoryGuestSelect" list="paymentHistoryGuestOptions" placeholder="Search by guest name or NRC" autocomplete="off">
                <datalist id="paymentHistoryGuestOptions"></datalist>
            </div>
            <div class="col-12 col-md-auto">
                <button type="button" id="viewGuestPaymentHistoryBtn" class="btn btn-outline-primary w-100" onclick="openGuestPaymentHistory();" disabled>
                    <i class="bi bi-clock-history me-1"></i> View payment records
                </button>
            </div>
        </div>
    </div>
    <div class="row g-3 g-lg-4">
        <div class="col-12 col-lg-5">
            <div class="card custom-card p-3 p-md-4">
                <h6 class="fw-bold mb-1"><i class="bi bi-receipt-cutoff text-primary me-2"></i>Guest and stay details</h6>
                <p class="text-muted small mb-3">Select a booking to load its stay information and itemized charges.</p>
                <div class="row g-3">
                    <div class="col-md-6">
                        <label class="form-label small fw-semibold" for="billRoomSelect">Booking (room and guest)</label>
                        <select class="form-select" id="billRoomSelect" onchange="calculateTotalBill();">
                            <option disabled selected value="">Select a booking</option>
                        </select>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label small fw-semibold" for="billNights">Nights stayed</label>
                        <input disabled type="number" class="form-control" id="billNights" value="1" min="1">
                    </div>
                    <div class="col-md-6">
                        <label class="form-label small fw-semibold" for="checkInDate">Check-in date</label>
                        <input disabled type="date" class="form-control" id="checkInDate">
                    </div>
                    <div class="col-md-6">
                        <label class="form-label small fw-semibold" for="checkOutDate">Check-out date</label>
                        <input disabled type="date" class="form-control" id="checkOutDate">
                    </div>
                    <div class="col-md-6">
                        <label class="form-label small fw-semibold" for="roomType">Room type</label>
                        <input disabled type="text" class="form-control" id="roomType">
                    </div>
                    <div class="col-md-6">
                        <label class="form-label small fw-semibold" for="pricePerNight">Rate per night</label>
                        <input disabled type="text" class="form-control" id="pricePerNight" value="0.00 Ks">
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 col-lg-7">
            <div class="card custom-card payment-summary-card p-3 p-md-4 bg-white border">
                <h6 class="fw-bold mb-1">Payment summary</h6>
                <p class="text-muted small border-bottom pb-2 mb-3">Outstanding charges to be collected</p>
                <div class="d-flex justify-content-between my-2">
                    <span>Room charges due</span>
                    <span id="summaryRoom">0.00 Ks</span>
                </div>
                <div class="d-flex justify-content-between my-2">
                    <span>Service charges due</span>
                    <span id="summaryService">0.00 Ks</span>
                </div>
                <div class="mt-3">
                    <h6 class="fw-semibold">Room charge details</h6>
                    <div class="table-responsive payment-table-wrap" role="region" aria-label="Room charge details" tabindex="0">
                        <table class="table table-sm table-bordered align-middle mb-3 payment-detail-table payment-room-table">
                            <thead class="table-light">
                                <tr>
                                    <th scope="col">Description</th>
                                    <th scope="col" class="text-end">Nights</th>
                                    <th scope="col" class="text-end">Rate</th>
                                    <th scope="col" class="text-end">Original charge</th>
                                </tr>
                            </thead>
                            <tbody id="roomChargeDetailsBody">
                                <tr><td colspan="4" class="text-center text-muted">Select a booking to view charges.</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <h6 class="fw-semibold">Minibar and service charges</h6>
                    <p class="text-muted small mb-2">Amounts show the remaining balance; paid items show Ks0.00.</p>
                    <div class="table-responsive payment-table-wrap" role="region" aria-label="Minibar and service charge details" tabindex="0">
                        <table class="table table-sm table-bordered align-middle mb-3 payment-detail-table payment-minibar-table">
                            <thead class="table-light">
                                <tr>
                                    <th scope="col">Item</th>
                                    <th scope="col" class="text-end">Qty</th>
                                    <th scope="col" class="text-end">Unit price</th>
                                    <th scope="col" class="text-end">Amount due</th>
                                    <th scope="col">Payment status</th>
                                </tr>
                            </thead>
                            <tbody id="minibarChargeDetailsBody">
                                <tr><td colspan="5" class="text-center text-muted">Select a booking to view charges.</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div id="paymentDetailsError" class="small text-danger" role="alert"></div>
                </div>
                <hr>
                <div class="d-flex justify-content-between align-items-baseline gap-3 fs-5 fw-bold text-dark mb-3">
                    <span>Outstanding balance</span>
                    <span class="text-primary" id="summaryTotal">0.00 Ks</span>
                </div>
                <button id="printInvoiceBtn" class="btn btn-gold w-100 py-2 mb-2" onclick="printInvoice();" disabled><i class="bi bi-printer me-2"></i>Collect payment &amp; print receipt</button>
            </div>
        </div>
    </div>
</div>