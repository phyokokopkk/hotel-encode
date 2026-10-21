$(function() {
    var currentPaymentDetails = null;
    var currentMinibarItems = [];
    var paymentHistoryGuests = [];
    var selectedPaymentHistoryGuestId = '';

    function escapeHtml(value) {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function formatMoney(value) {
        return Number(value || 0).toFixed(2);
    }

    function loadPaymentHistoryGuests() {
        var $input = $('#paymentHistoryGuestSelect');
        paymentHistoryGuests = [];
        selectedPaymentHistoryGuestId = '';
        $('#paymentHistoryGuestOptions').empty();
        $input.val('');
        $('#viewGuestPaymentHistoryBtn').prop('disabled', true);

        $.ajax({
            url: 'server.php',
            type: 'POST',
            data: {action: 'getPaymentHistoryGuests'},
            dataType: 'json',
            success: function(res) {
                if (!res.success) {
                    showAppToast(res.message || 'Unable to load guests.');
                    return;
                }
                paymentHistoryGuests = res.guests || [];
                renderPaymentHistoryGuestOptions();
            },
            error: function() {
                showAppToast('Failed to load guests for payment history.');
            }
        });
    }

    function renderPaymentHistoryGuestOptions() {
        var $input = $('#paymentHistoryGuestSelect');
        var $options = $('#paymentHistoryGuestOptions');
        var inputValue = String($input.val() || '').trim();
        var search = inputValue.toLocaleLowerCase();
        var filteredGuests = paymentHistoryGuests.filter(function(guest) {
            return String(guest.full_name || '').toLocaleLowerCase().includes(search) ||
                String(guest.nrc || '').toLocaleLowerCase().includes(search);
        });

        $options.empty();
        $.each(filteredGuests, function(index, guest) {
            var nrc = String(guest.nrc || '').trim();
            var label = String(guest.full_name || '') + (nrc ? ' - NRC: ' + nrc : '');
            $options.append($('<option>', {value: label}));
        });

        var matchedGuest = paymentHistoryGuests.find(function(guest) {
            var nrc = String(guest.nrc || '').trim();
            var label = String(guest.full_name || '') + (nrc ? ' - NRC: ' + nrc : '');
            return label.toLocaleLowerCase() === inputValue.toLocaleLowerCase();
        });
        selectedPaymentHistoryGuestId = matchedGuest ? String(matchedGuest.guest_id) : '';
        $('#viewGuestPaymentHistoryBtn').prop('disabled', !selectedPaymentHistoryGuestId);
    }

    window.openGuestPaymentHistory = function() {
        var guestId = selectedPaymentHistoryGuestId;
        if (!guestId) {
            return;
        }

        $('#guestPaymentHistorySubtitle').text('');
        $('#guestPaymentHistoryMessage').text('Loading payment records...');
        $('#guestPaymentHistorySummary').empty();
        $('#guestPaymentHistoryBody').html('<div class="text-center text-muted py-3">Loading...</div>');
        bootstrap.Modal.getOrCreateInstance(document.getElementById('guestPaymentHistoryModal')).show();

        $.ajax({
            url: 'server.php',
            type: 'POST',
            data: {action: 'getGuestPaymentHistory', guestId: guestId},
            dataType: 'json',
            success: function(res) {
                if (selectedPaymentHistoryGuestId !== String(guestId)) {
                    return;
                }
                if (!res.success) {
                    $('#guestPaymentHistoryMessage').text(res.message || 'Unable to load payment records.');
                    $('#guestPaymentHistoryBody').html('<div class="text-center text-danger py-3">Payment records could not be loaded.</div>');
                    return;
                }

                $('#guestPaymentHistorySubtitle').text(res.guest.full_name);
                var payments = res.payments || [];
                var totals = payments.reduce(function(summary, payment) {
                    var roomCharge = Number(payment.room_charge || 0);
                    var serviceCharge = Number(payment.service_charge || 0);
                    var roomStatus = payment.room_payment_status || 'Pending';
                    var serviceStatus = payment.service_payment_status || 'Pending';
                    summary.roomCharges += roomCharge;
                    summary.serviceCharges += serviceCharge;
                    summary.billed += Number(payment.grand_total || 0);
                    if (roomStatus === 'Pending') {
                        summary.balanceDue += roomCharge;
                    }
                    if (serviceStatus === 'Pending') {
                        summary.balanceDue += Number(payment.remain_service_charge || 0);
                    }
                    return summary;
                }, {roomCharges: 0, serviceCharges: 0, billed: 0, balanceDue: 0});

                $('#guestPaymentHistorySummary').html(
                    '<div class="col-6 col-md"><div class="guest-payment-summary-stat">' +
                        '<span class="label">Payment records</span><strong>' + payments.length + '</strong></div></div>' +
                    '<div class="col-6 col-md"><div class="guest-payment-summary-stat warning">' +
                        '<span class="label">Room charges</span><strong>' + formatMoney(totals.roomCharges) + ' Ks</strong></div></div>' +
                    '<div class="col-6 col-md"><div class="guest-payment-summary-stat warning">' +
                        '<span class="label">Service charges</span><strong>' + formatMoney(totals.serviceCharges) + ' Ks</strong></div></div>' +
                    '<div class="col-6 col-md"><div class="guest-payment-summary-stat success">' +
                        '<span class="label">Total billed</span><strong>' + formatMoney(totals.billed) + ' Ks</strong></div></div>' +
                    '<div class="col-6 col-md"><div class="guest-payment-summary-stat balance">' +
                        '<span class="label">Outstanding balance</span><strong>' + formatMoney(totals.balanceDue) + ' Ks</strong></div></div>'
                );
                if (!payments.length) {
                    $('#guestPaymentHistoryMessage').text('');
                    $('#guestPaymentHistoryBody').html('<div class="text-center text-muted py-3">No payment records found for this guest.</div>');
                    return;
                }

                $('#guestPaymentHistoryMessage').text(payments.length + ' payment record' + (payments.length === 1 ? '' : 's'));
                $('#guestPaymentHistoryBody').html(payments.map(function(payment) {
                    var roomStatus = payment.room_payment_status || 'Pending';
                    var serviceStatus = payment.service_payment_status || 'Pending';
                    var roomCharge = Number(payment.room_charge || 0);
                    var serviceCharge = Number(payment.service_charge || 0);
                    var nights = Number(payment.nights_stayed || 0);
                    var balanceDue = (roomStatus === 'Pending' ? roomCharge : 0) +
                        (serviceStatus === 'Pending' ? Number(payment.remain_service_charge || 0) : 0);
                    var minibarItems = payment.minibar_items || [];
                    var remainingPaidService = serviceStatus === 'Paid'
                        ? serviceCharge
                        : Math.max(0, serviceCharge - Number(payment.remain_service_charge || 0));
                    minibarItems = minibarItems.map(function(item) {
                        var itemAmount = Number(item.subtotal || 0);
                        var paidItemAmount = Math.min(itemAmount, remainingPaidService);
                        remainingPaidService -= paidItemAmount;
                        item.outstanding_amount = Math.max(0, itemAmount - paidItemAmount);
                        return item;
                    });
                    var itemizedServiceTotal = minibarItems.reduce(function(total, item) {
                        return total + Number(item.subtotal || 0);
                    }, 0);
                    var unitemizedService = Math.max(0, serviceCharge - itemizedServiceTotal);
                    var roomUnitRate = nights > 0 ? roomCharge / nights : 0;
                    var minibarRows = minibarItems.map(function(item) {
                        var itemPending = Number(item.outstanding_amount || 0) > 0;
                        var amountClass = itemPending ? 'text-danger fw-semibold' : '';
                        return '<tr>' +
                            '<td>' + escapeHtml(item.item_name) + '<br><span class="text-muted small">' + escapeHtml(item.order_date) + '</span></td>' +
                            '<td class="text-end">' + escapeHtml(item.quantity) + '</td>' +
                            '<td class="text-end ' + amountClass + '">' + formatMoney(item.unit_price) + ' Ks</td>' +
                            '<td class="text-end ' + amountClass + '">' + formatMoney(item.subtotal) + ' Ks' +
                                (itemPending ? '<br><span class="small">Pending</span>' : '') + '</td>' +
                        '</tr>';
                    }).join('');
                    if (unitemizedService > 0) {
                        var unitemizedPending = serviceStatus === 'Pending';
                        minibarRows += '<tr><td>Other service charges</td><td class="text-end">-</td><td class="text-end">-</td>' +
                            '<td class="text-end ' + (unitemizedPending ? 'text-danger fw-semibold' : '') + '">' +
                                formatMoney(unitemizedService) + ' Ks' + (unitemizedPending ? '<br><span class="small">Pending</span>' : '') +
                            '</td></tr>';
                    }
                    if (!minibarRows) {
                        minibarRows = '<tr><td colspan="4" class="text-center text-muted">No itemized minibar charges recorded.</td></tr>';
                    }
                    var roomChargeClass = roomStatus === 'Pending' ? 'text-danger fw-semibold' : '';

                    return '<article class="card guest-payment-record-card border shadow-sm">' +
                        '<div class="card-header bg-light d-flex flex-wrap justify-content-between align-items-center gap-2">' +
                            '<div><div class="fw-semibold">Payment #' + escapeHtml(payment.payment_id) + ' · Room ' + escapeHtml(payment.room_number) + '</div>' +
                                '<div class="small text-muted">Recorded ' + escapeHtml(payment.payment_date) + '</div></div>' +
                            '<div class="d-flex flex-wrap gap-2"><span class="badge ' + (roomStatus === 'Paid' ? 'bg-success' : 'bg-warning text-dark') + '">Room: ' + escapeHtml(roomStatus) + '</span>' +
                                '<span class="badge ' + (serviceStatus === 'Paid' ? 'bg-success' : 'bg-warning text-dark') + '">Services: ' + escapeHtml(serviceStatus) + '</span></div>' +
                        '</div>' +
                        '<div class="card-body">' +
                            '<div class="row g-3">' +
                                '<div class="col-12 col-lg-5">' +
                                    '<h6 class="fw-semibold mb-2">Stay and room charges</h6>' +
                                    '<div class="small text-muted mb-2">' + escapeHtml(payment.type_name) + ' · ' + escapeHtml(payment.check_in_date) + ' to ' + escapeHtml(payment.check_out_date) + '</div>' +
                                    '<div class="table-responsive"><table class="table table-sm align-middle mb-0"><thead><tr><th>Room charge</th><th class="text-end">Nights</th><th class="text-end">Avg. / night</th><th class="text-end">Amount</th></tr></thead>' +
                                    '<tbody><tr><td>Room stay</td><td class="text-end">' + escapeHtml(nights) + '</td><td class="text-end">' + formatMoney(roomUnitRate) + ' Ks</td><td class="text-end ' + roomChargeClass + '">' + formatMoney(roomCharge) + ' Ks' +
                                        (roomStatus === 'Pending' ? '<br><span class="small">Pending</span>' : '') + '</td></tr></tbody></table></div>' +
                                '</div>' +
                                '<div class="col-12 col-lg-7">' +
                                    '<h6 class="fw-semibold mb-2">Minibar and service charges</h6>' +
                                    '<div class="table-responsive"><table class="table table-sm table-striped align-middle mb-0"><thead><tr><th>Item</th><th class="text-end">Qty</th><th class="text-end">Unit price</th><th class="text-end">Amount</th></tr></thead><tbody>' +
                                    minibarRows + '</tbody><tfoot><tr><th colspan="3">Minibar / service total</th><th class="text-end ' +
                                        (serviceStatus === 'Pending' && Number(payment.remain_service_charge || 0) > 0 ? 'text-danger fw-semibold' : '') + '">' +
                                        formatMoney(serviceCharge) + ' Ks</th></tr></tfoot></table></div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="row g-2 border-top mt-3 pt-3 align-items-center">' +
                                '<div class="col-6 col-md"><span class="small text-muted d-block">Payment method</span><span class="fw-semibold">' + escapeHtml(payment.payment_method) + '</span></div>' +
                                '<div class="col-6 col-md text-md-end"><span class="small text-muted d-block">Total billed</span><span class="fw-semibold">' + formatMoney(payment.grand_total) + ' Ks</span></div>' +
                                '<div class="col-12 col-md text-md-end"><span class="small text-muted d-block">Outstanding balance</span><span class="fw-bold ' + (balanceDue > 0 ? 'text-danger' : 'text-success') + '">' + formatMoney(balanceDue) + ' Ks</span></div>' +
                            '</div>' +
                        '</div>' +
                    '</article>';
                }).join(''));
            },
            error: function() {
                $('#guestPaymentHistoryMessage').text('Failed to load payment records from the server.');
                $('#guestPaymentHistoryBody').html('<div class="text-center text-danger py-3">Payment records could not be loaded.</div>');
            }
        });
    };

    function clearPaymentDetails(message) {
        currentPaymentDetails = null;
        currentMinibarItems = [];
        $('#billNights, #checkInDate, #checkOutDate, #roomType').val('');
        $('#pricePerNight').val('0.00 Ks');
        $('#summaryRoom, #summaryService, #summaryTotal').text('0.00 Ks');
        $('#roomChargeDetailsBody').html('<tr><td colspan="4" class="text-center text-muted">' + escapeHtml(message || 'Select a booking to view charges.') + '</td></tr>');
        $('#minibarChargeDetailsBody').html('<tr><td colspan="5" class="text-center text-muted">' + escapeHtml(message || 'Select a booking to view charges.') + '</td></tr>');
        $('#paymentDetailsError').text('');
        $('#printInvoiceBtn').prop('disabled', true);
    }

    window.loadGuestPayment = function(selectedBookingId) {
        loadPaymentHistoryGuests();
        clearPaymentDetails();
        $('#billRoomSelect').empty().append($('<option>', {
            value: '',
            text: 'Select a booking',
            disabled: true,
            selected: true
        }));

        $.ajax({
            url: 'server.php',
            type: 'POST',
            data: {action: 'getActiveBookings'},
            dataType: 'json',
            success: function(res) {
                if (!res.success) {
                    showAppToast(res.message || 'Unable to load bookings.');
                    return;
                }

                $.each(res.bookings || [], function(index, booking) {
                    if (booking.payment_status === 'Pending') {
                        $('#billRoomSelect').append($('<option>', {
                            value: booking.booking_id,
                            text: booking.room_number + ' - ' + booking.full_name
                        }));
                    }
                });

                if (selectedBookingId != null) {
                    $('#billRoomSelect').val(String(selectedBookingId));
                    if ($('#billRoomSelect').val()) {
                        calculateTotalBill();
                    }
                }
            },
            error: function() {
                showAppToast('Failed to load bookings for payment.');
            }
        });
    };

    $('#paymentHistoryGuestSelect').on('input change', renderPaymentHistoryGuestOptions);

    window.calculateTotalBill = function() {
        var selectedBookingId = $('#billRoomSelect').val();
        clearPaymentDetails();
        if (!selectedBookingId) {
            return;
        }

        $.ajax({
            url: 'server.php',
            type: 'POST',
            data: {action: 'getBookingPaymentDetails', bookingId: selectedBookingId},
            dataType: 'json',
            success: function(res) {
                if (!res.success) {
                    $('#paymentDetailsError').text(res.message || 'Unable to load payment details.');
                    return;
                }

                if ($('#billRoomSelect').val() !== String(selectedBookingId)) {
                    return;
                }

                var details = res.paymentDetails;
                var minibarItems = res.minibarItems || [];
                var nights = Number(details.nights_stayed || 0);
                var pricePerNight = Number(details.price_per_night || 0);
                var originalRoomCharge = Number(details.room_charge || 0);
                var roomPaid = details.room_payment_status === 'Paid';
                var servicePaid = details.service_payment_status === 'Paid';
                var roomChargeDue = roomPaid ? 0 : originalRoomCharge;
                var serviceChargeDue = servicePaid ? 0 : Number(details.remain_service_charge || 0);
                var paidServiceAmount = servicePaid
                    ? Number(details.service_charge || 0)
                    : Math.max(0, Number(details.service_charge || 0) - Number(details.remain_service_charge || 0));
                var outstandingMinibarTotal = 0;
                // Settlements are stored as a service balance, so apply the paid amount to older minibar items first.
                minibarItems = minibarItems.map(function(item) {
                    var itemAmount = Number(item.subtotal || 0);
                    var paidItemAmount = Math.min(itemAmount, paidServiceAmount);
                    paidServiceAmount -= paidItemAmount;
                    item.is_paid = paidItemAmount >= itemAmount;
                    item.outstanding_amount = Math.max(0, itemAmount - paidItemAmount);
                    outstandingMinibarTotal += item.outstanding_amount;
                    return item;
                });
                var otherServiceDue = Math.max(0, serviceChargeDue - outstandingMinibarTotal);

                currentPaymentDetails = details;
                currentMinibarItems = minibarItems;

                $('#billNights').val(nights);
                $('#checkInDate').val(details.check_in_date);
                $('#checkOutDate').val(details.check_out_date);
                $('#roomType').val(details.type_name);
                $('#pricePerNight').val(formatMoney(pricePerNight) + ' Ks');
                $('#summaryRoom').text(formatMoney(roomChargeDue) + ' Ks');
                $('#summaryService').text(formatMoney(serviceChargeDue) + ' Ks');
                $('#summaryTotal').text(formatMoney(roomChargeDue + serviceChargeDue) + ' Ks');
                $('#roomChargeDetailsBody').html(
                    '<tr>' +
                        '<td>' + escapeHtml(details.type_name || 'Room stay') + '</td>' +
                        '<td class="text-end">' + escapeHtml(nights) + '</td>' +
                        '<td class="text-end">' + formatMoney(pricePerNight) + ' Ks</td>' +
                        '<td class="text-end">' + formatMoney(originalRoomCharge) + ' Ks' + (roomPaid ? ' <span class="badge bg-success">Paid</span>' : '') + '</td>' +
                    '</tr>'
                );

                if (minibarItems.length) {
                    var minibarRows = minibarItems.map(function(item) {
                        return '<tr>' +
                            '<td>' + escapeHtml(item.item_name || 'Minibar item') + '</td>' +
                            '<td class="text-end">' + escapeHtml(item.quantity) + '</td>' +
                            '<td class="text-end">' + formatMoney(item.unit_price) + ' Ks</td>' +
                            '<td class="text-end">' + formatMoney(item.outstanding_amount) + ' Ks</td>' +
                            '<td>' + (item.is_paid ? '<span class="badge bg-success">Paid</span>' : '<span class="badge bg-warning text-dark">Pending</span>') + '</td>' +
                        '</tr>';
                    }).join('');
                    if (otherServiceDue > 0) {
                        minibarRows += '<tr><td colspan="3">Other service charges due</td><td class="text-end">' + formatMoney(otherServiceDue) + ' Ks</td><td><span class="badge bg-warning text-dark">Pending</span></td></tr>';
                    }
                    $('#minibarChargeDetailsBody').html(minibarRows);
                } else if (serviceChargeDue > 0) {
                    $('#minibarChargeDetailsBody').html('<tr><td colspan="3">Other service charges due</td><td class="text-end">' + formatMoney(serviceChargeDue) + ' Ks</td><td><span class="badge bg-warning text-dark">Pending</span></td></tr>');
                } else {
                    $('#minibarChargeDetailsBody').html('<tr><td colspan="5" class="text-center text-muted">No minibar charges recorded.</td></tr>');
                }

                $('#paymentDetailsError').text('');
                $('#printInvoiceBtn').prop('disabled', false);
            },
            error: function() {
                $('#paymentDetailsError').text('Failed to load payment details.');
            }
        });
    };

    window.printInvoice = function() {
        if (!currentPaymentDetails) {
            showAppToast('Select a guest and load payment details before processing payment.');
            return;
        }

        var printWindow = window.open('', '_blank');
        if (!printWindow) {
            showAppToast('The receipt could not be opened. Please allow pop-ups and try again.');
            return;
        }

        var bookingId = $('#billRoomSelect').val();
        var guestLabel = $('#billRoomSelect option:selected').text();
        var details = currentPaymentDetails;
        var minibarItems = currentMinibarItems.slice();
        var roomPaid = details.room_payment_status === 'Paid';
        var servicePaid = details.service_payment_status === 'Paid';
        var roomCharge = roomPaid ? 0 : Number(details.room_charge || 0);
        var serviceCharge = servicePaid ? 0 : Number(details.remain_service_charge || 0);
        var outstandingMinibarTotal = minibarItems.reduce(function(total, item) {
            return total + Number(item.outstanding_amount || 0);
        }, 0);
        var otherServiceDue = Math.max(0, serviceCharge - outstandingMinibarTotal);
        var $button = $('#printInvoiceBtn').prop('disabled', true);

        $.ajax({
            url: 'server.php',
            type: 'POST',
            data: {action: 'markBookingAsPaid', bookingId: bookingId},
            dataType: 'json',
            success: function(res) {
                if (!res.success) {
                    printWindow.close();
                    showAppToast(res.message || 'Payment could not be processed.');
                    $button.prop('disabled', false);
                    return;
                }

                var rows = function(label, value) {
                    return '<tr><td class="label">' + escapeHtml(label) + '</td><td class="colon">:</td><td>' + escapeHtml(value) + '</td></tr>';
                };
                var itemRows = minibarItems.filter(function(item) {
                    return Number(item.outstanding_amount || 0) > 0;
                }).map(function(item) {
                    return '<tr><td>' + escapeHtml(item.item_name || 'Minibar item') + ' × ' + escapeHtml(item.quantity) + '</td><td class="text-end">' +
                        escapeHtml(formatMoney(item.outstanding_amount)) + ' Ks</td></tr>';
                }).join('');
                if (otherServiceDue > 0) {
                    itemRows += '<tr><td>Other service charges</td><td class="text-end">' + escapeHtml(formatMoney(otherServiceDue)) + ' Ks</td></tr>';
                }
                if (!itemRows && serviceCharge > 0) {
                    itemRows = '<tr><td colspan="2">No itemized minibar charges recorded.</td></tr>';
                }
                var roomRows = '';
                if (!roomPaid) {
                    roomRows = rows('Room Type', details.type_name) +
                        rows('Nights Stayed', details.nights_stayed) +
                        rows('Price Per Night', formatMoney(details.price_per_night) + ' Ks') +
                        rows('Room Charge', formatMoney(roomCharge) + ' Ks');
                }

                printWindow.document.write(
                    '<html><head><title>Hotel Invoice</title><style>' +
                    'body{font-family:Arial,sans-serif;width:700px;margin:30px auto;color:#222}' +
                    'h2{text-align:center;margin-bottom:25px}table{width:100%;border-collapse:collapse}' +
                    'td{padding:8px 4px;vertical-align:top}.label{width:180px;font-weight:bold}' +
                    '.colon{width:20px;text-align:center}.summary{border-top:1px solid #999;margin-top:20px;padding-top:10px}' +
                    '.total{font-size:18px;font-weight:bold;border-top:2px solid #222}' +
                    '</style></head><body><h2>Hotel Invoice</h2><table>' +
                    rows('Room / Guest', guestLabel) +
                    rows('Check In Date', details.check_in_date) +
                    rows('Check Out Date', details.check_out_date) +
                    roomRows +
                    '</table><div class="summary"><table>' +
                    (serviceCharge > 0
                        ? '<tr><td colspan="2"><strong>Minibar / Service Charge Details</strong></td></tr>' +
                            itemRows +
                            '<tr><td class="label">Minibar / Service Charges</td><td class="text-end">' + escapeHtml(formatMoney(serviceCharge)) + ' Ks</td></tr>'
                        : '') +
                    '<tr class="total"><td class="label">Grand Total</td><td class="text-end">' + escapeHtml(formatMoney(roomCharge + serviceCharge)) + ' Ks</td></tr>' +
                    '</table></div></body></html>'
                );
                printWindow.document.close();
                printWindow.focus();
                printWindow.print();
                printWindow.close();
                showAppToast(res.message || 'Payment processed and receipt printed.');
                loadGuestPayment();
            },
            error: function() {
                printWindow.close();
                showAppToast('Payment could not be processed because the server could not be reached.');
                $button.prop('disabled', false);
            }
        });
    };
});
