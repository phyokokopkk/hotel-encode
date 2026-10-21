$(function(){

    function escapeHtml(value) {
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    window.loadContactSupport = function (){
        $("#contactSupportForm")[0].reset();
        $("#contactSupportForm > div:first-child > input").focus();
        loadHotelContactInfo();
        loadContactTickets();
    }

    function loadHotelContactInfo() {
        var error = $('#hotelContactError');
        error.addClass('d-none').text('');
        $('#hotelContactName, #hotelContactPhone, #hotelContactAddress').text('Loading...');

        $.ajax({
            url: 'server.php',
            type: 'POST',
            data: { action: 'getHotelContactInfo' },
            dataType: 'json',
            success: function(res) {
                if (!res.success || !res.settings) {
                    error.text(res.message || 'Unable to load hotel contact details.').removeClass('d-none');
                    $('#hotelContactName, #hotelContactPhone, #hotelContactAddress').text('');
                    return;
                }

                $('#hotelContactName').text(res.settings.hotel_name || '');
                $('#hotelContactPhone').text(res.settings.hotel_phone || '');
                $('#hotelContactAddress').text(res.settings.hotel_address || '');
            },
            error: function() {
                error.text('Failed to load hotel contact details.').removeClass('d-none');
                $('#hotelContactName, #hotelContactPhone, #hotelContactAddress').text('');
            }
        });
    }

    window.loadContactTickets = function () {
        $.ajax({
            url: "server.php",
            type: "POST",
            data: { action: "getContactTickets" },
            dataType: "json",
            success: function(res){
                var list = $('#contactTicketsList');
                if (!res.success || !Array.isArray(res.tickets)) {
                    list.html('<div class="col-12"><div class="alert alert-warning mb-0">Unable to load contact logs.</div></div>');
                    return;
                }

                if (!res.tickets.length) {
                    list.html('<div class="col-12"><div class="alert alert-light border mb-0">No contact tickets have been logged yet.</div></div>');
                    return;
                }

                list.html(res.tickets.map(function(ticket){
                    var repliesHtml = '';
                    if (ticket.replies && ticket.replies.length) {
                        repliesHtml = '<div class="mt-3 border-top pt-3">' +
                            ticket.replies.map(function(reply){
                                return '<div class="contact-reply-card mb-2 small rounded p-2"><div class="contact-reply-author fw-semibold mb-1">' + escapeHtml(reply.reply_by || 'Front Desk') + '</div><div class="contact-reply-message">' + escapeHtml(reply.reply_message || '') + '</div></div>';
                            }).join('') +
                            '</div>';
                    }

                    var statusClass = 'bg-secondary';
                    if (ticket.status === 'New') statusClass = 'bg-warning text-dark';
                    if (ticket.status === 'Replied') statusClass = 'bg-primary';
                    if (ticket.status === 'Closed') statusClass = 'bg-success';

                    return '<div class="col-12">' +
                        '<div class="border rounded p-3 h-100">' +
                            '<div class="d-flex justify-content-between align-items-start gap-3">' +
                                '<div>' +
                                    '<div class="fw-bold">' + escapeHtml(ticket.subject || 'General Request') + '</div>' +
                                    '<div class="small text-muted">Room ' + escapeHtml(ticket.room_number || ticket.room_id) + ' • ' + escapeHtml(ticket.guest_name || 'Guest') + '</div>' +
                                '</div>' +
                                '<span class="badge ' + statusClass + '">' + escapeHtml(ticket.status || 'New') + '</span>' +
                            '</div>' +
                            '<div class="small text-muted mt-2">' + escapeHtml(ticket.phone || 'No phone') + ' • ' + escapeHtml(ticket.created_at || '') + '</div>' +
                            '<p class="mt-3 mb-2">' + escapeHtml(ticket.message || '') + '</p>' +
                            repliesHtml +
                            '<div class="d-flex gap-2 mt-3 flex-wrap">' +
                                '<button class="btn btn-sm btn-outline-primary reply-ticket-btn" data-id="' + ticket.contact_id + '">Reply</button>' +
                                '<button class="btn btn-sm btn-outline-secondary status-ticket-btn" data-id="' + ticket.contact_id + '" data-status="Closed">Close</button>' +
                                '<button class="btn btn-sm btn-outline-danger delete-ticket-btn" data-id="' + ticket.contact_id + '">Delete</button>' +
                            '</div>' +
                        '</div>' +
                    '</div>';
                }).join(''));
            }
        });
    }

    $('#contactTicketsList').on('click', '.reply-ticket-btn', function(){
        var contactId = $(this).data('id');
        var replyMessage = prompt('Enter the front desk reply:');
        if (replyMessage === null) return;

        replyMessage = $.trim(replyMessage);
        if (!replyMessage) {
            showAppToast('Reply message cannot be empty.');
            return;
        }

        $.ajax({
            url: 'server.php',
            type: 'POST',
            data: { action: 'addContactTicketReply', contactId: contactId, reply_message: replyMessage },
            dataType: 'json',
            success: function(res){
                showAppToast(res.message || 'Reply sent.');
                if (res.success) {
                    loadContactTickets();
                }
            }
        });
    });

    $('#contactTicketsList').on('click', '.status-ticket-btn', function(){
        var contactId = $(this).data('id');
        var status = $(this).data('status');

        $.ajax({
            url: 'server.php',
            type: 'POST',
            data: { action: 'updateContactTicket', contactId: contactId, status: status },
            dataType: 'json',
            success: function(res){
                showAppToast(res.message || 'Ticket updated.');
                if (res.success) {
                    loadContactTickets();
                }
            }
        });
    });

    $('#contactTicketsList').on('click', '.delete-ticket-btn', function(){
        var contactId = $(this).data('id');
        if (!confirm('Delete this ticket log?')) return;

        $.ajax({
            url: 'server.php',
            type: 'POST',
            data: { action: 'deleteContactTicket', contactId: contactId },
            dataType: 'json',
            success: function(res){
                showAppToast(res.message || 'Ticket deleted.');
                if (res.success) {
                    loadContactTickets();
                }
            }
        });
    });

    $("#contactSupportForm").submit(function(event){
        event.preventDefault();
        
        var formData = new FormData(this);
        formData.append('action', 'createContactSupport');

        $.ajax({
            url: "server.php",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            dataType: "json",
            success: function(res){
                console.log(res.message);
                showAppToast(res.message);
                if(res.success){
                    loadContactSupport();
                }
            }
        });
    });

});