$(function(){
    function escapeHtml(value) {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    window.loadPendingCharges = function() {
        $("#pendingChargesTableBody").html('<tr><td colspan="6" class="text-center text-muted py-4">Loading...</td></tr>');
        $.ajax({
            url: 'server.php',
            type: 'POST',
            dataType: 'json',
            data: { action: 'getPendingMinibarCharges' },
            success: function(res) {
                var tbody = $('#pendingChargesTableBody');
                if (!res.success) {
                    tbody.html('<tr><td colspan="6" class="text-center text-danger py-4">' + escapeHtml(res.message || 'Unable to load pending charges.') + '</td></tr>');
                    $('#pendingChargesCount').text('0 item(s)');
                    return;
                }

                var charges = res.charges || [];
                $('#pendingChargesCount').text(charges.length + ' item(s)');

                if (!charges.length) {
                    tbody.html('<tr><td colspan="6" class="text-center text-muted py-4">No pending in-room charges found.</td></tr>');
                    return;
                }

                tbody.empty();
                $.each(charges, function(index, charge) {
                    var roomNumber = charge.room_number || 'N/A';
                    var guestName = charge.guest_name || 'Unknown Guest';
                    var phone = charge.phone || 'N/A';
                    var chargeType = charge.charge_type || 'Charge';
                    var amount = Number(charge.pending_amount || 0).toFixed(2);

                    var row = '<tr>' +
                        '<td class="fw-semibold">' + escapeHtml(roomNumber) + '</td>' +
                        '<td>' + escapeHtml(guestName) + '</td>' +
                        '<td>' + escapeHtml(phone) + '</td>' +
                        '<td><span class="badge rounded-pill bg-light text-dark border">' + escapeHtml(chargeType) + '</span></td>' +
                        '<td class="text-end fw-semibold text-primary">' + amount + ' Ks</td>' +
                        '<td class="text-center">' +
                            '<button type="button" class="btn btn-sm btn-outline-primary" onclick="openPendingChargePayment(' + (charge.booking_id || 0) + ')"><i class="bi bi-credit-card me-1"></i>Process Payment</button>' +
                        '</td>' +
                    '</tr>';
                    tbody.append(row);
                });
            },
            error: function() {
                $('#pendingChargesTableBody').html('<tr><td colspan="6" class="text-center text-danger py-4">Failed to load pending charges.</td></tr>');
                $('#pendingChargesCount').text('0 item(s)');
            }
        });
    };

    window.loadMinibarChargeRecords = function() {
        $("#minibarChargeRecordsTableBody").html('<tr><td colspan="8" class="text-center text-muted py-4">Loading...</td></tr>');
        $.ajax({
            url: 'server.php',
            type: 'POST',
            dataType: 'json',
            data: { action: 'getMinibarChargeRecords' },
            success: function(res) {
                var tbody = $('#minibarChargeRecordsTableBody');
                if (!res.success) {
                    tbody.html('<tr><td colspan="8" class="text-center text-danger py-4">' + escapeHtml(res.message || 'Unable to load minibar charge records.') + '</td></tr>');
                    $('#minibarChargeRecordsCount').text('0 record(s)');
                    return;
                }

                var records = res.records || [];
                $('#minibarChargeRecordsCount').text(records.length + ' record(s)');
                if (!records.length) {
                    tbody.html('<tr><td colspan="8" class="text-center text-muted py-4">No minibar charge records found.</td></tr>');
                    return;
                }

                tbody.empty();
                $.each(records, function(index, record) {
                    var row = '<tr>' +
                        '<td>' + escapeHtml(record.order_date) + '</td>' +
                        '<td>' + escapeHtml(record.buyer_type) + '</td>' +
                        '<td>' + escapeHtml(record.buyer_name) + '</td>' +
                        '<td>' + escapeHtml(record.buyer_reference) + '</td>' +
                        '<td>' + escapeHtml(record.item_name) + '</td>' +
                        '<td class="text-end">' + escapeHtml(record.quantity) + '</td>' +
                        '<td class="text-end">' + Number(record.unit_price || 0).toFixed(2) + ' Ks</td>' +
                        '<td class="text-end fw-semibold">' + Number(record.total_amount || 0).toFixed(2) + ' Ks</td>' +
                    '</tr>';
                    tbody.append(row);
                });
            },
            error: function() {
                $('#minibarChargeRecordsTableBody').html('<tr><td colspan="8" class="text-center text-danger py-4">Failed to load minibar charge records.</td></tr>');
                $('#minibarChargeRecordsCount').text('0 record(s)');
            }
        });
    };

    window.openPendingChargePayment = function(bookingId) {
        switchPage('payment', bookingId);
    };

    window.loadMinibarCategories = function(selectSelector, selectedCategoryId) {
        var $select = $(selectSelector);
        if (!$select.length) {
            return;
        }

        $.ajax({
            url:"server.php",
            type:"POST",
            dataType:"JSON",
            data:{action:"getMinibarCategories"},
            success:function(res){
                if(!res.success){
                    showAppToast(res.message || "Unable to load minibar categories.");
                    return;
                }

                var categories = res.categories || [];
                $select.empty();
                $.each(categories, function(index, category){
                    $select.append($('<option>', {
                        value: category.minibar_category_id,
                        text: category.category_name
                    }));
                });
                $select.append($('<option>', {
                    value: 'new',
                    text: 'Add New Category...'
                }));

                if (selectedCategoryId && $select.find('option[value="' + selectedCategoryId + '"]').length) {
                    $select.val(selectedCategoryId);
                }
                else if(selectedCategoryId === null) {
                    var uncategorizedOption = $select.find('option').filter(function() {
                        return $(this).text() === 'Uncategorized';
                    });
                    if (uncategorizedOption.length) {
                        $select.val(uncategorizedOption.val());
                    } else {
                        $select.val('');
                    }
                }
            }
        });
    };

    $(document).on("change", ".minibar-category-select", function(){
        if ($(this).val() !== "new") {
            return;
        }

        var categoryName = prompt("Enter a new minibar category name:");
        if (categoryName === null) {
            $(this).val($(this).data("selectedValue") || "");
            return;
        }

        categoryName = $.trim(categoryName);
        if (!categoryName) {
            showAppToast("Category name cannot be empty.");
            $(this).val($(this).data("selectedValue") || "");
            return;
        }

        var $select = $(this);
        $.ajax({
            url:"server.php",
            type:"POST",
            dataType:"JSON",
            data:{action:"addMinibarCategory", categoryName: categoryName},
            success:function(res){
                showAppToast(res.message || "Category saved.");
                if (res.success) {
                    loadMinibarCategories("#" + $select.attr("id"), res.categoryId);
                } else {
                    $select.val($select.data("selectedValue") || "");
                }
            }
        });
    });

    window.loadRoomMinibar = function() {

        loadPendingCharges();
        loadMinibarChargeRecords();

        $("#minibarTableBody").html('<tr><td colspan="6" class="text-center text-muted py-4">Loading...</td></tr>');
        $.ajax({
            url:"server.php",
            type:"POST",
            dataType:"JSON",
            data:{action:"getRoomMinibar"},
            success:function(res){
                if(res.success){
                    var tbody = $("#minibarTableBody");
                    tbody.empty();

                    if (!res.minibarItems || !res.minibarItems.length) {
                        tbody.append('<tr><td colspan="6" class="text-center text-muted py-4">No minibar items found.</td></tr>');
                        return;
                    }

                    $.each(res.minibarItems, function(index, item){
                        var row = '<tr>' +
                            '<td>' + item.item_name + '</td>' +
                            '<td>' + (item.category_name || 'Uncategorized') + '</td>' +
                            '<td>' + item.cost_price + '</td>' +
                            '<td>' + item.price + '</td>' +
                            '<td><span class="badge ' + (item.stock_qty < 10 ? 'bg-warning text-dark' : 'bg-success') + '">' + (item.stock_qty < 10 ? 'Low Stock (' + item.stock_qty + ')' : 'In Stock (' + item.stock_qty + ')') + '</span></td>' +
                            '<td>' +
                                '<button class="btn btn-sm btn-outline-primary" onclick="chargeToRoom(\'' + item.minibar_item_id + '\', \'' + item.item_name + '\', ' + item.cost_price + ',' + item.price +','+ item.stock_qty + ')" ' + (item.stock_qty < 1 ? 'disabled' : '') + '><i class="bi bi-plus-circle me-1"></i>Charge to Room</button>'+
                                '<button class="btn btn-sm btn-outline-secondary ms-2" onclick="editMinibarItem(\'' + item.minibar_item_id + '\', \'' + item.item_name + '\', ' + item.cost_price + ',' + item.price +','+ item.stock_qty + ', ' + (item.category_id || 0) + ')"><i class="bi bi-pencil-square me-1"></i>Edit</button>' +
                            '</td>' +
                        '</tr>';
                        tbody.append(row);
                    });
                }
                else{
                    $("#minibarTableBody").html('<tr><td colspan="6" class="text-center text-danger py-4">' + escapeHtml(res.message || 'Unable to load minibar items.') + '</td></tr>');
                }
            },
            error:function(xhr, status){
                var response = xhr.responseJSON;
                var message = response && response.message
                    ? response.message
                    : 'Failed to load minibar items (' + (xhr.status || status) + ').';
                $("#minibarTableBody").html('<tr><td colspan="6" class="text-center text-danger py-4">' + escapeHtml(message) + '</td></tr>');
            }

        });
    }

    function updateChargePurchaseFields() {
        var purchaseType = $("#purchaseTypeSelect").val() || "Room";
        var showRoom = purchaseType === "Room";
        var showStaff = purchaseType === "Staff";
        var showOther = purchaseType === "Other";

        $("#roomNumberChargeField").toggleClass("d-none", !showRoom).find("input").prop("required", showRoom);
        $("#staffBuyerField").toggleClass("d-none", !showStaff).find("input").prop("required", showStaff);
        $("#otherBuyerField").toggleClass("d-none", !showOther).find("input").prop("required", showOther);
        $("#buyerPhoneField").toggleClass("d-none", !(showStaff || showOther)).find("input").prop("required", showStaff || showOther);
        $("#buyerReferenceField").toggleClass("d-none", !(showStaff || showOther)).find("input").prop("required", showStaff || showOther);

        if (showRoom) {
            $("#buyerReferenceLabel").text("Room Reference");
        } else if (showStaff) {
            $("#buyerReferenceLabel").text("Staff ID / Department");
        } else {
            $("#buyerReferenceLabel").text("Customer / Reference");
        }
    }

    var recentRoomNumbersStorageKey = "roomMinibarRecentRoomNumbers";

    function loadRecentRoomNumbers() {
        try {
            var storedRoomNumbers = localStorage.getItem(recentRoomNumbersStorageKey);
            var roomNumbers = storedRoomNumbers ? JSON.parse(storedRoomNumbers) : [];
            if (!Array.isArray(roomNumbers)) {
                throw new Error("Stored room numbers are invalid.");
            }
            return roomNumbers.filter(function(roomNumber) {
                return typeof roomNumber === "string" && roomNumber.trim() !== "";
            });
        } catch (error) {
            showAppToast("Unable to load recent room numbers from this browser.");
            return [];
        }
    }

    function renderRecentRoomNumbers() {
        var $list = $("#recentRoomNumbersList");
        $list.empty();
        $.each(loadRecentRoomNumbers(), function(index, roomNumber) {
            $list.append($("<option>", { value: roomNumber }));
        });
    }

    function rememberRoomNumber(roomNumber) {
        var roomNumbers = loadRecentRoomNumbers().filter(function(recentRoomNumber) {
            return recentRoomNumber !== roomNumber;
        });
        roomNumbers.unshift(roomNumber);
        try {
            localStorage.setItem(recentRoomNumbersStorageKey, JSON.stringify(roomNumbers.slice(0, 10)));
        } catch (error) {
            showAppToast("Unable to save recent room numbers in this browser.");
            return;
        }
        renderRecentRoomNumbers();
    }

    $(document).on("change", "#purchaseTypeSelect", updateChargePurchaseFields);

    window.chargeToRoom = function(minibarItemId, itemName, itemCostPrice, itemPrice, itemStockQty) {
        $("#chargeToRoomForm")[0].reset();
        renderRecentRoomNumbers();
        $("#purchaseTypeSelect").val("Room");
        $("#itemIdInput").val(minibarItemId);
        $("#chargeItemName").val(itemName);
        $("#chargeItemPrice").val(itemPrice.toFixed(2));
        $("#itemNameInput").val(itemName);
        $("#itemCostPriceInput").val(itemCostPrice);
        $("#itemPriceInput").val(itemPrice);
        $("#quantityInput").attr("max", itemStockQty);
        updateChargePurchaseFields();
        $("#chargeToRoomModal").modal("show");
        
    }

    $("#chargeToRoomForm").submit(function(e){
        e.preventDefault();
        var purchaseType = $("#purchaseTypeSelect").val();
        var roomNumber = $("#roomNumberChargeInput").val().trim();
        var staffName = $("#staffBuyerNameInput").val().trim();
        var otherName = $("#otherBuyerNameInput").val().trim();
        var buyerPhone = $("#buyerPhoneInput").val().trim();
        var buyerReference = $("#buyerReferenceInput").val().trim();

        if (purchaseType === "Room" && roomNumber === "") {
            showAppToast("Room number is required for room charges.");
            $("#roomNumberChargeInput").focus();
            return;
        }
        if (purchaseType === "Staff" && staffName === "") {
            showAppToast("Staff name is required for staff purchases.");
            $("#staffBuyerNameInput").focus();
            return;
        }
        if (purchaseType === "Other" && otherName === "") {
            showAppToast("Buyer name is required for other purchases.");
            $("#otherBuyerNameInput").focus();
            return;
        }
        if ((purchaseType === "Staff" || purchaseType === "Other") && buyerReference === "") {
            showAppToast("Buyer reference is required.");
            $("#buyerReferenceInput").focus();
            return;
        }

        var formData = new FormData(this);
        formData.append('action', 'chargeMinibarItemToRoom');
        formData.set('purchaseType', purchaseType);
        formData.set('roomNumber', roomNumber);
        formData.set('staffName', staffName);
        formData.set('otherName', otherName);
        formData.set('buyerPhone', buyerPhone);
        formData.set('buyerReference', buyerReference);

        $.ajax({
            url:"server.php",
            type:"POST",
            data:formData,
            processData: false,
            contentType: false,
            dataType: "json",
            success:function(res){
                console.log(res.message);
                showAppToast(res.message);
                if(res.success){
                    if (purchaseType === "Room") {
                        rememberRoomNumber(roomNumber);
                    }
                    $("#chargeToRoomModal").modal("hide");
                    loadRoomMinibar();
                }
            }
        });
    });

    window.loadMinibarCategoryManager = function() {
        $.ajax({
            url:"server.php",
            type:"POST",
            dataType:"JSON",
            data:{action:"getMinibarCategories"},
            success:function(res){
                if(!res.success){
                    showAppToast(res.message || "Unable to load minibar categories.");
                    return;
                }

                var tbody = $("#minibarCategoryTableBody");
                tbody.empty();

                if (!res.categories || !res.categories.length) {
                    tbody.append('<tr><td colspan="2" class="text-center text-muted">No categories found.</td></tr>');
                    return;
                }

                $.each(res.categories, function(index, category){
                    var actionData ='<button type="button" class="btn btn-sm btn-outline-secondary me-2" data-category-id="' + category.minibar_category_id + '" data-category-name="' + category.category_name + '" data-action="rename-category"><i class="bi bi-pencil-square"></i> Rename</button>' +
                                    '<button type="button" class="btn btn-sm btn-outline-danger" data-category-id="' + category.minibar_category_id + '" data-category-name="' + category.category_name + '" data-action="delete-category"><i class="bi bi-trash"></i> Delete</button>';
                    if(category.category_name == 'Uncategorized'){ actionData = '<span class="text-secondary h6">No Actions</span>'; }
                    var row = '<tr>' +
                        '<td>' + category.category_name + '</td>' +
                        '<td class="text-center">' +
                            actionData +
                        '</td>' +
                    '</tr>';
                    tbody.append(row);
                });
            }
        });
    };

    $(document).on("click", "[data-action='rename-category']", function(){
        var categoryId = $(this).data("categoryId");
        var currentName = $(this).data("categoryName");
        var newName = prompt("Rename category:", currentName);
        if (newName === null) {
            return;
        }

        newName = $.trim(newName);
        if (!newName) {
            showAppToast("Category name cannot be empty.");
            return;
        }

        $.ajax({
            url:"server.php",
            type:"POST",
            dataType:"JSON",
            data:{action:"renameMinibarCategory", categoryId: categoryId, categoryName: newName},
            success:function(res){
                showAppToast(res.message || "Category updated.");
                if (res.success) {
                    loadMinibarCategoryManager();
                    loadRoomMinibar();
                    $(".minibar-category-select").each(function(){
                        var selected = $(this).val();
                        loadMinibarCategories("#" + $(this).attr("id"), selected || null);
                    });
                }
            }
        });
    });

    $(document).on("click", "[data-action='delete-category']", function(){
        var categoryId = $(this).data("categoryId");
        var categoryName = $(this).data("categoryName");

        if (!confirm("Delete category '" + categoryName + "'? Items in this category will be moved to Uncategorized.")) {
            return;
        }

        $.ajax({
            url:"server.php",
            type:"POST",
            dataType:"JSON",
            data:{action:"deleteMinibarCategory", categoryId: categoryId},
            success:function(res){
                showAppToast(res.message || "Category deleted.");
                if (res.success) {
                    loadMinibarCategoryManager();
                    loadRoomMinibar();
                    $(".minibar-category-select").each(function(){
                        var selected = $(this).val();
                        loadMinibarCategories("#" + $(this).attr("id"), selected || null);
                    });
                }
            }
        });
    });

    $("#manageMinibarCategoriesModal").on("show.bs.modal", function(){
        loadMinibarCategoryManager();
    });

    $("#addMinibarCategoryForm").submit(function(e){
        e.preventDefault();
        var formData = new FormData(this);
        formData.append('action', 'addMinibarCategory');

        $.ajax({
            url:"server.php",
            type:"POST",
            data:formData,
            processData:false,
            contentType:false,
            dataType:"json",
            success:function(res){
                showAppToast(res.message || "Category saved.");
                if (res.success) {
                    $("#addMinibarCategoryForm")[0].reset();
                    loadMinibarCategoryManager();
                    $(".minibar-category-select").each(function(){
                        var selected = $(this).val();
                        loadMinibarCategories("#" + $(this).attr("id"), selected || null);
                    });
                }
            }
        });
    });

    $("#addMinibarModal").on("show.bs.modal", function(){
        $("#addMinibarForm")[0].reset();
        $("#minibarCategorySelect").data("selectedValue", "");
        loadMinibarCategories("#minibarCategorySelect", null);
    });

    $("#addMinibarForm").submit(function(e){
        e.preventDefault();
        var formData = new FormData(this);
        formData.append('action', 'addMinibarItem');

        $.ajax({
            url:"server.php",
            type:"POST",
            data:formData,
            processData:false,
            contentType:false,
            dataType:"json",
            success:function(res){
                console.log(res.message);
                showAppToast(res.message);
                if(res.success){
                    $("#addMinibarModal").modal("hide");
                    loadRoomMinibar();
                }
                else{
                    if(res.message == "Item Name already exists."){
                        $("#minibarItemNameInput").val("").focus();
                    }
                }
            }
        });
    });

    window.editMinibarItem = function(minibarItemId, itemName, itemCostPrice, itemPrice, itemStockQty, categoryId) {
        $("#editMinibarForm")[0].reset();
        $("#editItemIdInput").val(minibarItemId);
        $("#editItemNameInput").val(itemName);
        $("#editItemCostPriceInput").val(itemCostPrice);
        $("#editItemPriceInput").val(itemPrice);
        $("#editItemStockQtyInput").val(itemStockQty);
        $("#editMinibarCategorySelect").data("selectedValue", categoryId || "");
        loadMinibarCategories("#editMinibarCategorySelect", categoryId || null);
        $("#editMinibarModal").modal("show");
    }

    $("#editMinibarForm").submit(function(e){
        e.preventDefault();
        var formData = new FormData(this);
        formData.append('action', 'updateMinibarItem');

        $.ajax({
            url:"server.php",
            type:"POST",
            data:formData,
            processData:false,
            contentType:false,
            dataType:"json",
            success:function(res){
                console.log(res.message);
                showAppToast(res.message);
                if(res.success){
                    $("#editMinibarModal").modal("hide");
                    loadRoomMinibar();
                }
            }
        });
    });


});