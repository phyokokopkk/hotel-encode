$(function(){

    $("#searchGuests input").on("input", filterActiveReservations);

    function filterActiveReservations(){
        var searchTerm = $("#searchGuests input").val().trim().toLowerCase();

        $("#bookingTableBody tr").each(function(){
            var roomNumber = $(this).find(".booking-room-number").text().toLowerCase();
            var guestName = $(this).find(".booking-guest-name").text().toLowerCase();
            $(this).toggle(roomNumber.includes(searchTerm) || guestName.includes(searchTerm));
        });
    }

    window.loadBookingPage = function(selectedRoomId = null){
        $("#bookingForm > div:first-child > input").focus();
        fetchAvailableRooms(selectedRoomId);
        fetchActiveReservations();
        
        $("#bookingForm .checkInDate").attr("min", new Date().toISOString().split("T")[0]);
        $("#bookingForm .checkOutDate").attr("min", new Date().toISOString().split("T")[0]);
    }

    // Fetch available rooms from the server and populate the select dropdown
    function fetchAvailableRooms(selectedRoomId = null){

        $("#bookingForm .chooseRooms").empty().append('<option disabled selected value="">Loading...</option>');

        $.ajax({
            url:"server.php",
            type:"POST",
            dataType:"JSON",
            data:{action:"getAvailableRooms"},
            success:function(res){
                if(res.success){
                    // console.log(res);
                    var roomSelect = $("#bookingForm .chooseRooms");
                    roomSelect.empty();
                    roomSelect.append('<option disabled selected value="">Select Room</option>')
                    $.each(res.rooms, function(index, room){
                        var selected = (selectedRoomId == room.room_id) ? 'selected' : '';
                        roomSelect.append('<option value="' + room.room_id + '" ' + selected + '>' + room.number + ' , floor ' + room.floor + ' - ' + room.price_per_night + ' Ks</option>');
                    });
                }
                else{
                    showAppToast(res.message);
                    console.log(res.message);
                }
            }
        });
    }

    window.updateBookingStatus = function(bookingId, status, paymentStatus, button){
        const confirmModal = new bootstrap.Modal(document.getElementById('bookingStatusConfirmModal'));
        const confirmTitle = document.getElementById('bookingStatusConfirmTitle');
        const confirmMessage = document.getElementById('bookingStatusConfirmMessage');
        const confirmActionBtn = document.getElementById('bookingStatusConfirmBtn');

        confirmTitle.textContent = 'Confirm Booking Action';
        confirmMessage.textContent = 'Are you sure you want to ' + status + ' this booking?';

        confirmActionBtn.onclick = function() {
            confirmModal.hide();

            if(status == "Checked-Out" && paymentStatus == "Pending"){
                const warningModal = new bootstrap.Modal(document.getElementById('checkoutPaymentWarningModal'));
                const confirmBtn = document.getElementById('checkoutPaymentConfirmBtn');
                confirmBtn.onclick = function() {
                    warningModal.hide();
                    paymentThisBooking(bookingId);
                };
                warningModal.show();
                return;
            }

            $.ajax({
                url: "server.php",
                type: "POST",
                data: { action: "updateBookingStatus", booking_id: bookingId, status: status },
                dataType: "json",
                success: function(res) {
                    showAppToast(res.message);
                    if(res.success) {
                        fetchAvailableRooms();
                        if(status == "Checked-In"){
                            $(button)
                                .attr("onclick", "updateBookingStatus(" + bookingId + ", 'Checked-Out', '" + paymentStatus + "', this);")
                                .removeClass("btn-outline-success")
                                .addClass("btn-outline-danger")
                                .text("Check-Out");
                        }
                        else if(status == "Checked-Out"){
                            $(button).closest("tr").remove();
                        }
                    }
                }
            });
        };

        confirmModal.show();
    }

    function fetchActiveReservations(){   
        
        $("#bookingTableBody").html('<tr><td colspan="4" class="text-center text-muted">Loading...</td></tr>');

        $.ajax({
            url: "server.php",
            type: "POST",
            data: { action: "getActiveBookings" },
            dataType: "json",
            success: function(res) {
                if(res.success) {

                    $("#bookingTableBody").empty();

                    if(res.bookings.length === 0) {
                        $("#bookingTableBody").append('<tr><td colspan="4" class="text-center">No active reservations found.</td></tr>');
                    }

                    $.each(res.bookings, function(index, booking) {

                        //check if check-out date is less than today, if yes, then update status to "Checked-Out"
                        var outOfDate = false;
                        var today = new Date();
                        var checkOutDate = new Date(booking.check_out_date);
                        
                        //add one day to checkOutDate to compare with today
                        checkOutDate.setDate(checkOutDate.getDate() + 1);

                        if(checkOutDate < today && booking.status != "Checked-Out" && booking.status != "Cancelled"){
                            outOfDate = true;
                        }

                        var actionElement = "";
                        if(booking.status == "Pending"){
                            actionElement = '<button onclick="updateBookingStatus(' + booking.booking_id + ', \'Checked-In\', \'' + booking.payment_status + '\', this);" style="width:90px; font-size:0.875rem; padding:0.25rem;" class="btn btn-sm btn-outline-success">Check-In</button>';
                        }
                        else if(booking.status == "Checked-In"){
                            actionElement = '<button onclick="updateBookingStatus(' + booking.booking_id + ', \'Checked-Out\', \'' + booking.payment_status + '\', this);" style="width:90px; font-size:0.875rem; padding:0.25rem;" class="btn btn-sm btn-outline-danger">Check-Out</button>';
                        }

                        actionElement += '<button onclick="paymentThisBooking(' + booking.booking_id + ');" style="width:35px; visibility:'+ (booking.payment_status == "Paid" ? 'hidden' : 'visible') +'" class="btn btn-sm btn-outline-primary ms-2 p-0 text-center" title="Payment"><i class="bi bi-credit-card fs-6"></i></button>';

                        var roomChargeIndicator = booking.room_payment_status == "Pending"
                            ? '<br><span class="badge text-bg-warning ms-1" title="Outstanding room charges"><i class="bi bi-exclamation-circle-fill me-1" aria-hidden="true"></i>Room balance due</span>'
                            : '';
                        var row = '<tr>' + 
                            '<td class="booking-room-number">' + booking.room_number + '</td>' +
                            '<td><span class="booking-guest-name">' + booking.full_name + '</span> ' + roomChargeIndicator + '</td>' +
                            '<td style="font-size:0.875rem;" class="' + (outOfDate ? 'text-danger' : '') + '">(' + booking.check_in_date + ') to (' + booking.check_out_date + ')</td>' +
                            '<td>' + actionElement + '</td>' +
                        '</tr>';

                        $("#bookingTableBody").append(row);
                    });
                    filterActiveReservations();
                }
                else{
                    showAppToast(res.message);
                    console.log(res.message);
                }
            }
        });
    }
    

   $("#bookingForm").submit(function(event){
        event.preventDefault();

        $("#bookingForm .submitBtn").prop("disabled", true).text("Processing...");
        
        var formData = new FormData(this);

        //append selected room id to formData
        var selectedRoomId = $("#bookingForm .chooseRooms").val();
        formData.append('room_id', selectedRoomId);

        formData.append('action', 'createBooking');
        
        // console.log("Form Data:", Array.from(formData.entries())); // Log form data for debugging

        $.ajax({
            url: "server.php",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            dataType: "json",
            success: function(res) {
                console.log(res.message);
                showAppToast(res.message);
                if(res.success) {
                    
                    $("#bookingForm")[0].reset();
                    fetchAvailableRooms();
                    $("#bookingForm .checkInDate").attr("min", new Date().toISOString().split("T")[0]);
                    $("#bookingForm .checkOutDate").attr("min", new Date().toISOString().split("T")[0]);

                    //Update Active Reservations List
                    fetchActiveReservations();
                }
                $("#bookingForm .submitBtn").prop("disabled", false).text("Create Reservation");
            }
            ,
            error: function(xhr, status, error) {
                console.error("AJAX Error: " + status + ": " + error, xhr.responseText);
                $("#bookingForm .submitBtn").prop("disabled", false).text("Create Reservation");
            }
        });

   });

   window.paymentThisBooking = function(bookingId){
        switchPage('payment', bookingId);
   }

});