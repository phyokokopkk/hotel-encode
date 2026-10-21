$(function(){
    var canManageRooms = ["admin", "manager"].includes(document.body.dataset.currentUserRole);
    var roomViewStorageKey = "hotelAppRoomManagementView";
    var roomSearchTimer;
    var latestRoomPageRequest = 0;
    window.roomAvailabilityFilter = true;
    if (!canManageRooms) {
        $("#btnEditRoomTypes, #btnAddNewRoom, #addRoomTypeBtn").remove();
    }

    $("#btnShowAvailable").click(function() {
        window.roomAvailabilityFilter = !window.roomAvailabilityFilter;
        var hasSearch = $("#roomSearchInput").val().trim() !== "";
        loadRoomPage(!hasSearch && window.roomAvailabilityFilter);
    });

    $("#roomSearchInput").on("input", function() {
        clearTimeout(roomSearchTimer);
        var hasSearch = $(this).val().trim() !== "";
        roomSearchTimer = setTimeout(function() {
            loadRoomPage(!hasSearch && window.roomAvailabilityFilter);
        }, 250);
    });

    function setRoomView(showCards) {
        $("#roomCardGrid").toggleClass("d-none", !showCards);
        $("#page-room .room-table-wrapper").toggleClass("d-none", showCards);
        $("#btnRoomTableView").toggleClass("active", !showCards).attr("aria-pressed", String(!showCards));
        $("#btnRoomCardView").toggleClass("active", showCards).attr("aria-pressed", String(showCards));
    }

    var savedRoomView = "table";
    try {
        savedRoomView = localStorage.getItem(roomViewStorageKey) || "table";
    } catch (error) {
        console.error("Unable to read the room layout preference from browser storage.", error);
    }
    setRoomView(savedRoomView === "cards");

    $("#btnRoomTableView, #btnRoomCardView").click(function() {
        var showCards = this.id === "btnRoomCardView";
        setRoomView(showCards);
        try {
            localStorage.setItem(roomViewStorageKey, showCards ? "cards" : "table");
        } catch (error) {
            console.error("Unable to save the room layout preference in browser storage.", error);
            showAppToast("The room layout preference could not be saved in this browser.");
        }
    });

    // Reset the form when the modal is closed
    $('#addRoomModal').on('hidden.bs.modal', function () {
        $("#roomNumberInput").closest("div").show();
        $("#floorInput").closest("div").show();
        $("#statusInput").closest("div").show();
        resetAddRoomModal();
    });

    // Update modal title and button text when the modal is shown
    $('#addRoomModal').on('show.bs.modal', function () {
        $('#addRoomModalLabel').text('Add New Hotel Room');
        $('#saveRoomBtn').val('Save Room');
    });

    $("#addRoomTypeBtn").on("click",function(){
        if (!canManageRooms) {
            showAppToast("Only managers and administrators can manage room types.");
            return;
        }

        $("#roomNumberInput").closest("div").hide();
        $("#floorInput").closest("div").hide();
        $("#statusInput").closest("div").hide();
        $("#roomNumberInput, #floorInput, #statusInput").prop("disabled", true);
        $("#addRoomModal").modal("show");
        $('#addRoomModalLabel').text('Add New Room Type');
        $('#saveRoomBtn').val('Save Room Type');
    });

    $("#editRoomTypeModal").on('show.bs.modal', function () {
        loadRoomTypeDetailsTable();
    });

    function resetAddRoomModal() {
        enableChangeEvent_RTI = true;
        $("#roomTypeInput").attr("list","roomTypeDataList");
        $("#addRoomForm")[0].reset();
        $("#roomNumberInput").prop("disabled", false);
        $("#floorInput").prop("disabled", false);
        $("#roomTypeInput").prop("disabled", false);
        $("#maxOccupancyInput").prop("disabled", false);
        $("#roomFeaturesInput").prop("disabled", false);
        $("#pricePerNightInput").prop("disabled", false);
        $("#statusInput").prop("disabled", false);
        $("#saveRoomBtn").prop("disabled", false);
    }

    window.editRoomType = function(button, roomTypeId) {
        if (!canManageRooms) {
            showAppToast("Only managers and administrators can manage room types.");
            return;
        }
        
        $("#roomNumberInput").closest("div").hide();
        $("#floorInput").closest("div").hide();
        $("#statusInput").closest("div").hide();
        $("#roomNumberInput, #floorInput, #statusInput").prop("disabled", true);
        $("#roomIdInput").val(roomTypeId);
        
        $("#addRoomModal").modal("show");
        $('#addRoomModalLabel').text('Edit Room Type');
        $('#saveRoomBtn').val('Update Room Type');

        $("#roomTypeInput").val($(button).closest("tr").find("td:first").text());
        $("#roomTypeInput").trigger("change");

        enableChangeEvent_RTI = false;
        $("#roomTypeInput").attr("list","");
    }

    window.loadRoomTypeDetailsTable = function() {
        
        $("#roomTypeTableBody").html('<tr><td colspan="5" class="text-center text-muted">Loading...</td></tr>');
        
        $.ajax({
            url: "server.php",
            type: "POST",
            data: { action: "getAllRoomTypes" },
            dataType: "json",
            success: function(res) {
                if(res.success) {
                    // Populate the room type table with the retrieved data
                    var roomTypes = res.roomTypes;
                    var tbody = $("#roomTypeTableBody");
                    tbody.empty();
                    $.each(roomTypes, function(index, roomType) {
                        var row = `<tr>
                            <td>${roomType.type_name}</td>
                            <td>${roomType.max_occupancy}</td>
                            <td>${roomType.description}</td>
                            <td>${roomType.price_per_night}</td>
                            <td>${canManageRooms ? `<button class="btn btn-sm btn-primary" onclick="editRoomType(this,${roomType.room_type_id})">Edit</button>` : ""}</td>
                        </tr>`;
                        tbody.append(row);
                    });
                }
                else{
                    console.log(res.message);   
                }
            }
        });
    }

    window.deleteRoom = function(roomId){
        if (!canManageRooms) {
            showAppToast("Only managers and administrators can delete rooms.");
            return;
        }

        if(confirm("Are you sure to delete?")){
            $.ajax({
                url: "server.php",
                type: "POST",
                data: { action: "deleteRoom", roomId: roomId },
                dataType: "json",
                success: function(res){
                    showAppToast(res.message);
                    loadRoomPage();
                }
            });
        }
    }

    window.editRoom = function(roomId){
        if (!canManageRooms) {
            showAppToast("Only managers and administrators can edit rooms.");
            return;
        }

        $.ajax({
            url: "server.php",
            type: "POST",
            data: { action: "getRoomDetails", roomId: roomId },
            dataType: "json",
            success: function(res) {
                if(res.success) {
                    var room = res.roomDetails;
                    $("#roomIdInput").val(roomId);
                    $("#roomNumberInput").val(room.number).prop("disabled", false);
                    $("#floorInput").val(room.floor);
                    $("#roomTypeInput").val(room.type_name);
                    $("#maxOccupancyInput").val(room.max_occupancy).prop("disabled", true);
                    $("#roomFeaturesInput").val(room.description).prop("disabled", true);
                    $("#pricePerNightInput").val(room.price_per_night).prop("disabled", true);
                    $("#statusInput").val(room.status);

                    $('#addRoomModal').modal('show');
                    $('#addRoomModalLabel').text('Edit Hotel Room');
                    $('#saveRoomBtn').val('Update Room');
                    
                }
                else{ console.log(res.message); }
            }
        });
    }

    window.showInfo = function(roomId){
        $.ajax({
            url: "server.php",
            type: "POST",
            data: { action: "getRoomDetails", roomId: roomId },
            dataType: "json",
            success: function(res) {
                if(res.success) {
                    var room = res.roomDetails;
                    $("#roomInfoNumber").text(room.number);
                    $("#roomInfoFloor").text(room.floor);
                    $("#roomInfoType").text(room.type_name);
                    $("#roomInfoMax").text(room.max_occupancy);
                    $("#roomInfoFeatures").text(room.description || 'No features listed');
                    $("#roomInfoPrice").text(room.price_per_night + ' Ks');

                    $("#roomInfoGuestName").text(room.guest_name || 'No guest assigned');
                    $("#roomInfoGuestPhone").text(room.guest_phone || 'N/A');
                    $("#roomInfoCheckIn").text(room.check_in_date || 'N/A');
                    $("#roomInfoCheckOut").text(room.check_out_date || 'N/A');

                    var statusClass = room.status === 'Available' ? 'bg-success' : room.status === 'Occupied' ? 'bg-danger' : room.status === 'Maintenance' ? 'bg-warning text-dark' : 'bg-secondary';
                    $("#roomInfoStatus").removeClass('bg-success bg-danger bg-warning bg-secondary text-dark').addClass(statusClass).text(room.status);

                    $("#roomInfoModal").modal('show');
                }
                else{
                    showAppToast(res.message || 'Room details are unavailable.');
                }
            },
            error: function(){
                showAppToast('Unable to load room details.');
            }
        });
    }

    $("#roomTypeInput").on('change', function() {

        if(!enableChangeEvent_RTI){ return; }

        var selectedRoomType = $(this).val();

        $.ajax({
            url: "server.php",
            type: "POST",
            data: { action: "getRoomTypeDetails", roomType: selectedRoomType },
            dataType: "json",
            success: function(res) {
                if(res.success) {
                    $("#maxOccupancyInput").val(res.roomTypeDetails.max_occupancy);
                    $("#roomFeaturesInput").val(res.roomTypeDetails.description);
                    $("#pricePerNightInput").val(res.roomTypeDetails.price_per_night);

                    if($("#saveRoomBtn").val() == "Save Room Type"){
                        $("#saveRoomBtn").prop("disabled", true);
                    }

                    if($("#saveRoomBtn").val() == "Update Room Type"){
                        $("#maxOccupancyInput, #roomFeaturesInput, #pricePerNightInput").prop("disabled", false);
                    }
                    else{ $("#maxOccupancyInput, #roomFeaturesInput, #pricePerNightInput").prop("disabled", true); }
                }
                else {
                    $("#maxOccupancyInput").val("").prop("disabled", false);
                    $("#roomFeaturesInput").val("").prop("disabled", false);
                    $("#pricePerNightInput").val("").prop("disabled", false);
                    $("#saveRoomBtn").prop("disabled", false);
                }
            }
        });
    });

    function openRoomBooking(roomId, roomStatus) {
        if (roomStatus === "Available") {
            switchPage("booking", roomId);
            return;
        }

        showAppToast("Only available rooms can be booked.");
    }

    $("#roomTableBody, #roomCardGrid").on("dblclick", "[data-room-id]", function() {
        openRoomBooking(Number($(this).data("roomId")), $(this).data("roomStatus"));
    });

    function escapeRoomText(value) {
        return $("<div>").text(value == null ? "" : String(value)).html()
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    function applyRoomSearch() {
        var searchTerm = $("#roomSearchInput").val().trim().toLocaleLowerCase();
        var matchCount = 0;
        var roomRows = $("#roomTableBody > tr[data-room-id]");
        var roomCards = $("#roomCardGrid article[data-room-search]");

        roomRows.each(function() {
            var matches = !searchTerm || (this.getAttribute("data-room-search") || "").toLocaleLowerCase().includes(searchTerm);
            $(this).toggle(matches);
            if (matches) {
                matchCount++;
            }
        });

        roomCards.each(function() {
            var matches = !searchTerm || (this.getAttribute("data-room-search") || "").toLocaleLowerCase().includes(searchTerm);
            $(this).closest(".col-12").toggle(matches);
        });

        $("#roomSearchEmptyRow").remove();
        $("#roomSearchEmpty").remove();
        if (searchTerm && roomRows.length > 0 && matchCount === 0) {
            $("#roomTableBody").append('<tr id="roomSearchEmptyRow"><td colspan="8" class="text-center text-muted py-4">No rooms match your search.</td></tr>');
            $("#roomCardGrid").append('<div id="roomSearchEmpty" class="col-12 text-center text-muted py-4">No rooms match your search.</div>');
        }
    }

    function roomActionMarkup(room) {
        return '<div class="d-flex justify-content-center gap-3 room-actions">' +
            (room.status === "Available" ? '<i class="bi bi-calendar2-check-fill text-primary" onclick="switchPage(\'booking\', ' + Number(room.room_id) + ')" title="Book Room"></i>' : '') +
            (room.status === "Booked" || room.status === "Occupied" ? '<i onclick="showInfo(' + Number(room.room_id) + ')" style="transform: scale(1.3);" class="bi bi-info-circle-fill text-info" title="Show Info"></i>' : '') +
            (canManageRooms && (room.status === "Available" || room.status === "Maintenance" || room.status === "Disabled") ? '<i onclick="editRoom(' + Number(room.room_id) + ')" class="bi bi-pencil text-warning" title="Edit Room"></i>' : '') +
            (canManageRooms && (room.status === "Available" || room.status === "Maintenance") ? '<i onclick="deleteRoom(' + Number(room.room_id) + ')" class="bi bi-trash text-danger" title="Delete Room"></i>' : '') +
            '</div>';
    }

    window.loadRoomPage = function(filterAvailable = $("#roomSearchInput").val().trim() === "" && window.roomAvailabilityFilter) {
        var requestId = ++latestRoomPageRequest;

        $("#roomTableBody").html('<tr><td colspan="8" class="text-center text-muted">Loading...</td></tr>');
        $("#roomCardGrid").html('<div class="col-12 text-center text-muted py-4">Loading...</div>');

        $.ajax({
            url: "server.php",
            type: "POST",
            data: { action: "getRoomsAllDetail", filterAvailable },
            dataType: "json",
            success: function(res) {
                if (requestId !== latestRoomPageRequest) {
                    return;
                }
                if(res.success) {
                    $("#roomTableBody").empty();
                    $("#roomCardGrid").empty();

                    if(res.rooms.length === 0) {
                        var emptyMessage = $("#roomSearchInput").val().trim() ? "No rooms match your search." : "No rooms found.";
                        var noDataRow = '<tr><td colspan="8" class="text-center">' + emptyMessage + '</td></tr>';
                        $("#roomTableBody").append(noDataRow);
                        $("#roomCardGrid").append('<div class="col-12 text-center text-muted py-4">' + emptyMessage + '</div>');
                    }

                    $.each(res.rooms, function(index, room) {
                        var roomId = Number(room.room_id);
                        var roomNumber = escapeRoomText(room.roomNumber);
                        var floor = escapeRoomText(room.floor);
                        var maxOccupancy = escapeRoomText(room.max_occupancy);
                        var typeName = escapeRoomText(room.type_name);
                        var description = escapeRoomText(room.description || "No features listed");
                        var price = escapeRoomText(room.price_per_night);
                        var status = escapeRoomText(room.status);
                        var guestName = escapeRoomText(room.guest_name || "No active guest");
                        var roomSearchValue = escapeRoomText([room.roomNumber, room.type_name, room.status, room.guest_name].join(" "));
                        var statusClass = room.status === "Available" ? "bg-success" : room.status === "Occupied" ? "bg-danger" : room.status === "Maintenance" ? "bg-warning text-dark" : "bg-secondary";
                        var row = '<tr data-room-id="' + roomId + '" data-room-status="' + status + '" data-room-search="' + roomSearchValue + '">' +
                                    '<th scope="row">' + roomNumber + '</th>' +
                                    '<td>' + floor + '</td>' +
                                    '<td>' + maxOccupancy + '</td>' +
                                    '<td>' + typeName + '</td>' +
                                    '<td>' + description + '</td>' +
                                    '<td class="fw-bold text-primary">' + price + '</td>' +
                                    '<td><span class="badge ' + statusClass + ' badge-status">' + status + '</span></td>' +
                                    '<td class="text-center">' + roomActionMarkup(room) + '</td>' +
                                    '</tr>';
                        $("#roomTableBody").append(row);

                        var card = '<div class="col-12 col-md-6 col-xl-4">' +
                            '<article class="card h-100 room-directory-card" data-room-id="' + roomId + '" data-room-status="' + status + '" data-room-search="' + roomSearchValue + '" title="Double click to book">' +
                                '<div class="card-body">' +
                                    '<div class="d-flex justify-content-between align-items-start mb-3">' +
                                        '<h6 class="card-title fw-bold mb-0">Room ' + roomNumber + '</h6>' +
                                        '<span class="badge ' + statusClass + ' badge-status">' + status + '</span>' +
                                    '</div>' +
                                    '<dl class="row mb-0">' +
                                        '<dt class="col-5">Floors</dt><dd class="col-7">' + floor + '</dd>' +
                                        '<dt class="col-5">Max</dt><dd class="col-7">' + maxOccupancy + '</dd>' +
                                        '<dt class="col-5">Type</dt><dd class="col-7">' + typeName + '</dd>' +
                                        '<dt class="col-5">Guest</dt><dd class="col-7">' + guestName + '</dd>' +
                                        '<dt class="col-5">Features</dt><dd class="col-7">' + description + '</dd>' +
                                        '<dt class="col-5">Price /night</dt><dd class="col-7 fw-bold text-primary">' + price + '</dd>' +
                                    '</dl>' +
                                '</div>' +
                                '<div class="card-footer">' + roomActionMarkup(room) + '</div>' +
                            '</article>' +
                            '</div>';
                        $("#roomCardGrid").append(card);
                    });

                    if(window.roomAvailabilityFilter){
                        $("#btnShowAvailable").removeClass("btn-secondary").addClass("btn-info").html('<i class="bi bi-eye me-1"></i> Show All Rooms');
                    }
                    else{
                        $("#btnShowAvailable").removeClass("btn-info").addClass("btn-secondary").html('<i class="bi bi-eye-slash me-1"></i> Show Only Available');
                    }
                    applyRoomSearch();

                    // Populate room types in the datalist
                    $("#roomTypeDataList").empty();
                    $.each(res.roomTypes, function(index, roomType) {
                        var option = '<option value="' + roomType.type_name + '">';
                        $("#roomTypeDataList").append(option);
                    });
                }
                else{
                    console.log(res.message);
                }
            }
        });

    }

    $("#addRoomForm").submit(function(e) {
        e.preventDefault();
        var formData = new FormData(this);
        var formAction = $("#saveRoomBtn").val();

        if (!canManageRooms && ["Save Room", "Update Room", "Save Room Type", "Update Room Type"].includes(formAction)) {
            showAppToast("Only managers and administrators can add or edit rooms and room types.");
            return;
        }

        if(formAction == "Save Room"){
            formData.append('action', 'addNewRoom');
        }
        else if(formAction == "Update Room"){
            formData.append('action', 'updateRoom');
        }
        else if(formAction == "Save Room Type"){
            formData.append('action', 'addNewRoomType');
        }
        else if(formAction == "Update Room Type"){
            formData.append('action', 'updateRoomType');
        }
        
        // console.log("Form Data:", Array.from(formData.entries())); // Log form data for debugging
        
        $.ajax({
            url: "server.php",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            dataType: "json",
            success: function(res) {
                showAppToast(res.message);
                let resetModal = false;
                if(res.success) {
                    resetModal = true;
                }
                else{
                    console.log(res.message);
                    $("#roomNumberInput").val("").focus();
                }
                if(resetModal){
                    resetAddRoomModal();
                    $("#addRoomModal").modal("hide");
                    if(res.message == "New room type added successfully." || res.message == "Room type updated successfully."){
                        loadRoomTypeDetailsTable();
                    }
                    loadRoomPage();
                }
            }
        });
    });

    
});