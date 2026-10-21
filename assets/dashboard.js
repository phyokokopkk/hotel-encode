$(function(){
    function renderMinibarCategorySummary(categories) {
        var tbody = $("#minibarCategorySummaryTableBody");
        tbody.empty();

        if (!categories || categories.length === 0) {
            tbody.append('<tr><td colspan="2" class="text-center text-muted">No minibar sales today.</td></tr>');
            return;
        }

        $.each(categories, function(index, category){
            tbody.append(`
                <tr>
                    <td class="fw-semibold">${category.category_name}</td>
                    <td class="text-end fw-bold text-success">${Number(category.total_amount || 0).toFixed(2)} Ks</td>
                </tr>
            `);
        });
    }

    window.loadDashboardPage = function(){

        //load dashboard stats
        $("#occupiedRooms, #todaysBookings, #todaysRoomCharges, #todaysRevenue").html('<span class="text-muted">Loading...</span>');
        $("#minibarCategorySummaryTableBody").html('<tr><td colspan="2" class="text-center text-muted">Loading...</td></tr>');

        $.ajax({
            url:"server.php",
            type:"POST",
            dataType:"JSON",
            data:{action:"getDashboardStats"},
            success:function(res){
                if(res.success){
                    // console.log(res.stats);
                    var occupancyRate = 0;
                    if(res.stats.totalRooms > 0){
                        occupancyRate = (res.stats.occupiedRooms / res.stats.totalRooms) * 100;
                    }
                    $("#occupiedRooms").html(res.stats.occupiedRooms + ' / ' + res.stats.totalRooms + ' <small class="fs-6 text-muted">(' + occupancyRate.toFixed(0) + '%)</small>');
                    $("#todaysBookings").text(res.stats.todaysBookings);
                    $("#todaysRoomCharges").text(res.stats.todaysRoomCharges || '0.00');
                    $("#todaysRevenue").text(res.stats.todaysRevenue);
                    renderMinibarCategorySummary(res.stats.minibarCategories || []);
                }
                else{
                    console.log(res.message);
                }
            }
        });

        //load recentBookingsTableBody
        $("#recentBookingsTableBody").html('<tr><td colspan="6" class="text-center text-muted">Loading...</td></tr>');
        $.ajax({
            url:"server.php",
            type:"POST",
            dataType:"JSON",
            data:{action:"getRecentBookings"},
            success:function(res){
                // console.log(res);
                if(res.success){
                    var tableBody = $("#recentBookingsTableBody");
                    tableBody.empty();
                    $.each(res.bookings, function(index, booking){
                        var row = `
                            <tr>
                                <td class="fw-semibold">${booking.full_name}</td>
                                <td><span class="badge bg-secondary">${booking.room_number} (${booking.type_name})</span></td>
                                <td>${booking.check_in_date}</td>
                                <td>${booking.check_out_date}</td>
                                <td><span class="badge bg-${booking.status === 'Checked-In' ? 'success' : booking.status === 'Pending' ? 'warning' : 'danger'} badge-status">${booking.status}</span></td>
                                <td><span class="badge bg-${booking.payment_status === 'Paid' ? 'success' : 'warning'}">${booking.payment_status}</span></td>
                            </tr>
                        `;
                        tableBody.append(row);
                    });
                }
                else{
                    console.log(res.message);
                }
            }
        });
    }

});