$(function(){
	const translateText = value => typeof window.hotelTranslate === 'function' ? window.hotelTranslate(value) : value;
	const translateEnglish = value => typeof window.hotelTranslateEnglish === 'function' ? window.hotelTranslateEnglish(value) : value;
	const formatMoney = value => Number(value || 0).toLocaleString('en-US', {maximumFractionDigits: 0}) + ' Ks';
	const escapeHtml = value => $('<div>').text(value == null ? '' : value).html();

	window.loadSummaryPage = function(){
		const monthInput = $('#summaryMonth');
		if(!monthInput.val()) monthInput.val(new Date().toISOString().slice(0, 7));
		$('#summaryAlert').addClass('d-none').text('');
		window.summaryReport = null;
		$('#exportSummaryExcel').prop('disabled', true);

		$.ajax({url: 'server.php', type: 'POST', dataType: 'json', data: {action: 'getAccountingSummary', month: monthInput.val()}})
			.done(function(res){
				if(!res.success){ showSummaryError(translateText(res.message)); return; }
				window.summaryReport = res.summary;
				$('#exportSummaryExcel').prop('disabled', false);
				renderSummary(res.summary);
			})
			.fail(function(){ showSummaryError('The accounting report could not be loaded. Check the database connection.'); });
	};

    $("#summaryRefresh").on('click', function(){
        loadSummaryPage();
    });

    $("#summaryMonth").on('change', function(){
        loadSummaryPage();
    });

	function showSummaryError(message){
		window.summaryReport = null;
		$('#exportSummaryExcel').prop('disabled', true);
		$('#summaryAlert').removeClass('d-none').text(translateText(message));
		$('#outstandingBalancesBody, #dailyTransactionsBody, #incomeRecordsBody').html('<tr><td colspan="8" class="text-center text-muted py-4">' + escapeHtml(translateText('No report data available.')) + '</td></tr>');
	}

	$('#exportSummaryExcel').on('click', function(){
		if(!window.summaryReport){
			showAppToast('Load the accounting report before exporting it.');
			return;
		}

		const summary = window.summaryReport;
		const kpis = summary.kpis || {};
		const balances = summary.outstandingBalances || [];
		const transactions = summary.daily || [];
		const records = summary.incomeRecords || [];
		const monthly = summary.monthly || [];
		const categories = summary.minibarCategories || [];
		const textCell = value => ({type: 'String', value: value == null ? '' : String(value)});
		const numberCell = value => {
			const numericValue = Number(value);
			return Number.isFinite(numericValue) ? {type: 'Number', value: numericValue} : textCell(value);
		};
		const worksheet = (name, headers, rows) => ({
			name: translateEnglish(name),
			rows: [headers.map(header => textCell(translateEnglish(header)))].concat(rows)
		});
		const sheets = [
			worksheet('Summary', ['Reporting month', 'Total income (Ks)', 'Room revenue (Ks)', 'Service revenue (Ks)', 'Pending balance (Ks)', 'Outstanding balance count', 'Transaction count', 'Income record count'], [[
				textCell(summary.month),
				numberCell(kpis.total),
				numberCell(kpis.room),
				numberCell(kpis.services),
				numberCell(kpis.pending),
				numberCell(balances.length),
				numberCell(transactions.length),
				numberCell(records.length)
			]]),
			worksheet('Monthly Revenue', ['Month', 'Room revenue (Ks)', 'Service revenue (Ks)', 'Total revenue (Ks)'], monthly.map(item => [
				textCell(item.month),
				numberCell(item.room),
				numberCell(item.services),
				numberCell(item.total)
			])),
			worksheet('Minibar Sales', ['Category', 'Quantity', 'Total amount (Ks)'], categories.map(item => [
				textCell(item.category_name),
				numberCell(item.quantity),
				numberCell(item.total_amount)
			])),
			worksheet('Outstanding Balances', ['Guest', 'Room', 'Phone', 'Charge type', 'Outstanding (Ks)'], balances.map(item => [
				textCell(item.full_name),
				textCell(item.room_number),
				textCell(item.phone),
				textCell(translateEnglish(item.charge_type)),
				numberCell(item.outstanding_amount)
			])),
			worksheet('Daily Transactions', ['Date', 'Time', 'Buyer type', 'Buyer', 'Room', 'Phone', 'Reference', 'Category', 'Amount (Ks)', 'Service payment status'], transactions.map(item => [
				textCell(item.transaction_date),
				textCell(item.transaction_time),
				textCell(translateEnglish(item.buyer_type)),
				textCell((item.buyer_type || 'Room') === 'Room' ? (item.guest_name || item.full_name) : (item.buyer_name || item.full_name)),
				textCell(item.room_number),
				textCell(item.buyer_phone),
				textCell(item.buyer_reference),
				textCell(translateEnglish(item.category)),
				numberCell(item.amount),
				textCell(translateEnglish(item.service_payment_status))
			])),
			worksheet('Income Records', ['Record', 'Date', 'Guest', 'Room', 'Payment method', 'Room charge (Ks)', 'Service charge (Ks)', 'Grand total (Ks)', 'Room payment status', 'Service payment status', 'Collection status'], records.map(item => [
				textCell('#PAY-' + item.record_id),
				textCell(item.record_date),
				textCell(item.full_name),
				textCell(item.room_number),
				textCell(translateEnglish(item.payment_method)),
				numberCell(item.room_charge),
				numberCell(item.service_charge),
				numberCell(item.grand_total),
				textCell(translateEnglish(item.room_payment_status)),
				textCell(translateEnglish(item.service_payment_status)),
				textCell(translateEnglish(item.room_payment_status === 'Paid' && item.service_payment_status === 'Paid' ? 'Paid' : 'Pending'))
			]))
		];
		const xmlEscape = value => Array.from(String(value)).filter(character => {
			const codePoint = character.codePointAt(0);
			return codePoint === 9 || codePoint === 10 || codePoint === 13 || (codePoint >= 32 && codePoint <= 0xD7FF) || (codePoint >= 0xE000 && codePoint <= 0xFFFD) || (codePoint >= 0x10000 && codePoint <= 0x10FFFF);
		}).join('').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
		const workbookXml = '<?xml version="1.0" encoding="UTF-8"?>' +
			'<?mso-application progid="Excel.Sheet"?>' +
			'<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40">' +
			sheets.map(sheet => '<Worksheet ss:Name="' + xmlEscape(sheet.name) + '"><Table>' + sheet.rows.map(row =>
				'<Row>' + row.map(cell => '<Cell><Data ss:Type="' + cell.type + '">' + xmlEscape(cell.value) + '</Data></Cell>').join('') + '</Row>'
			).join('') + '</Table></Worksheet>').join('') +
			'</Workbook>';
		const blob = new Blob(['\ufeff', workbookXml], {type: 'application/vnd.ms-excel;charset=utf-8'});
		const downloadUrl = URL.createObjectURL(blob);
		const link = document.createElement('a');
		const reportMonth = summary.month || $('#summaryMonth').val() || new Date().toISOString().slice(0, 7);
		link.href = downloadUrl;
		link.download = 'hotel-summary-' + reportMonth + '.xls';
		document.body.appendChild(link);
		link.click();
		link.remove();
		window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 0);
	});

	window.addEventListener('hotelLanguageChanged', function(){
		if(window.summaryReport) renderSummary(window.summaryReport);
	});

	function renderSummary(summary){
		const kpis = summary.kpis || {};
		$('#accountingTotal').text(formatMoney(kpis.total));
		$('#accountingRoom').text(formatMoney(kpis.room));
		$('#accountingServices').text(formatMoney(kpis.services));
		$('#accountingPending').text(formatMoney(kpis.pending));
		$('#accountingMixTotal').text(formatMoney(kpis.total));

		const total = Number(kpis.total || 0);
		const roomPercent = total ? Math.round(Number(kpis.room || 0) / total * 100) : 0;
		$('#accountingMixRoom').text(roomPercent + '%');
		$('#accountingMixServices').text((100 - roomPercent) + '%');
		$('#incomeMixChart').css('background', 'conic-gradient(var(--summary-room-color) 0 ' + roomPercent + '%, var(--summary-service-color) ' + roomPercent + '% 100%)');
		renderRevenueChart(summary.monthly || []);
		renderMinibarCategorySales(summary.minibarCategories || []);
		renderOutstandingBalances(summary.outstandingBalances || []);
		renderTransactions(summary.daily || []);
		renderIncomeRecords(summary.incomeRecords || []);
	}

	function renderOutstandingBalances(balances){
		$('#outstandingBalanceCount').text(balances.length + ' ' + translateText(balances.length === 1 ? 'balance' : 'balances'));
		if(!balances.length){ $('#outstandingBalancesBody').html('<tr><td colspan="5" class="text-center text-muted py-4">' + escapeHtml(translateText('No outstanding balances for this month.')) + '</td></tr>'); return; }
		$('#outstandingBalancesBody').html(balances.map(item => {
			return '<tr><td><strong>' + escapeHtml(item.full_name) + '</strong></td><td>' + escapeHtml(item.room_number) + '</td><td>' + escapeHtml(item.phone || '-') + '</td><td><span class="badge bg-warning-subtle text-warning-emphasis">' + escapeHtml(translateText(item.charge_type)) + '</span></td><td class="text-end fw-semibold text-danger">' + formatMoney(item.outstanding_amount) + '</td></tr>';
		}).join(''));
	}

	function renderMinibarCategorySales(categories){
		const total = categories.reduce((sum, category) => sum + Number(category.total_amount || 0), 0);
		$('#minibarCategoryTotal').text(formatMoney(total));
		if(!categories.length){ $('#minibarCategorySales').html('<div class="text-center text-muted py-3">' + escapeHtml(translateText('No minibar sales recorded for this month.')) + '</div>'); return; }
		$('#minibarCategorySales').html(categories.map(category => {
			const amount = Number(category.total_amount || 0);
			const percent = total ? amount / total * 100 : 0;
			const quantity = Number(category.quantity || 0);
			return '<div class="minibar-category-row"><div class="minibar-category-label"><strong>' + escapeHtml(category.category_name) + '</strong><span class="small text-muted">' + quantity.toLocaleString('en-US') + ' ' + translateText(quantity === 1 ? 'item' : 'items') + '</span></div><div class="minibar-category-track" role="img" aria-label="' + escapeHtml(category.category_name) + ': ' + Math.round(percent) + '% ' + escapeHtml(translateText('of minibar sales')) + '"><span style="width:' + percent + '%"></span></div><strong class="minibar-category-amount">' + formatMoney(amount) + '</strong></div>';
		}).join(''));
	}

	function renderRevenueChart(months){
		const svg = $('#revenueChart');
		svg.empty();
		const width = 760, height = 260, left = 48, right = 18, top = 18, bottom = 34;
		const max = Math.max(...months.map(item => Number(item.total || 0)), 1);
		const chartWidth = width - left - right, chartHeight = height - top - bottom;
		let markup = '';
		for(let i = 0; i < 4; i++){
			const y = top + (chartHeight / 3) * i;
			const value = Math.round(max - (max / 3) * i);
			markup += '<line x1="' + left + '" y1="' + y + '" x2="' + (width - right) + '" y2="' + y + '" class="chart-grid"/><text x="' + (left - 8) + '" y="' + (y + 4) + '" text-anchor="end" class="chart-label">' + compactMoney(value) + '</text>';
		}
		const roomPoints = [], servicePoints = [];
		months.forEach(function(item, index){
			const x = left + (months.length > 1 ? chartWidth / (months.length - 1) * index : chartWidth / 2);
			roomPoints.push(x + ',' + (top + chartHeight - (Number(item.room || 0) / max * chartHeight)));
			servicePoints.push(x + ',' + (top + chartHeight - (Number(item.services || 0) / max * chartHeight)));
			markup += '<text x="' + x + '" y="' + (height - 10) + '" text-anchor="middle" class="chart-label">' + escapeHtml((item.month || '').slice(5)) + '</text>';
		});
		if(months.length){
			markup += '<polyline points="' + roomPoints.join(' ') + '" class="chart-line chart-room"/><polyline points="' + servicePoints.join(' ') + '" class="chart-line chart-services"/>';
			roomPoints.forEach(point => { const parts = point.split(','); markup += '<circle cx="' + parts[0] + '" cy="' + parts[1] + '" r="3.5" class="chart-dot-room"/>'; });
			servicePoints.forEach(point => { const parts = point.split(','); markup += '<circle cx="' + parts[0] + '" cy="' + parts[1] + '" r="3.5" class="chart-dot-services"/>'; });
		} else { markup += '<text x="380" y="130" text-anchor="middle" class="chart-label">' + escapeHtml(translateText('No revenue recorded yet')) + '</text>'; }
		svg.html(markup);
	}

	function compactMoney(value){
		if(value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
		if(value >= 1000) return Math.round(value / 1000) + 'K';
		return Math.round(value);
	}

	function renderTransactions(transactions){
		$('#transactionCount').text(transactions.length + ' ' + translateText('entries'));
		if(!transactions.length){ $('#dailyTransactionsBody').html('<tr><td colspan="5" class="text-center text-muted py-4">' + escapeHtml(translateText('No transactions recorded for this month.')) + '</td></tr>'); return; }
		$('#dailyTransactionsBody').html(transactions.map(item => {
			const buyerType = item.buyer_type || 'Room';
			const buyerName = (buyerType === 'Room') ? (item.guest_name || item.full_name || 'Room guest') : (item.buyer_name || item.full_name || 'Customer');
			let details = [];
			if (buyerType === 'Staff') {
				details.push(translateText('Staff purchase'));
				if (item.buyer_reference) details.push(translateText('Ref:') + ' ' + item.buyer_reference);
				if (item.buyer_phone) details.push(translateText('Phone:') + ' ' + item.buyer_phone);
			} else {
				details.push(translateText('Customer purchase'));
				if (item.buyer_reference) details.push(translateText('Ref:') + ' ' + item.buyer_reference);
				if (item.buyer_phone) details.push(translateText('Phone:') + ' ' + item.buyer_phone);
			}
			return '<tr><td>' + escapeHtml(item.transaction_date) + '</td><td>' + escapeHtml(item.transaction_time) + '</td><td><strong>' + escapeHtml(buyerName) + '</strong>' + (details.length ? '<small class="d-block text-muted">' + escapeHtml(details.join(' · ')) + '</small>' : '') + '</td><td><span class="category-dot"></span>' + escapeHtml(translateText(item.category)) + '</td><td class="text-end fw-semibold">' + formatMoney(item.amount) + '</td></tr>';
		}).join(''));
	}

	function renderIncomeRecords(records){
		window.summaryIncomeRecords = records;
		if(!records.length){ $('#incomeRecordsBody').html('<tr><td colspan="8" class="text-center text-muted py-4">' + escapeHtml(translateText('No income records for this month.')) + '</td></tr>'); return; }
		$('#incomeRecordsBody').html(records.map(item => {
			const paid = item.room_payment_status === 'Paid' && item.service_payment_status === 'Paid';
			return '<tr><td class="fw-semibold">#PAY-' + escapeHtml(item.record_id) + '</td><td>' + escapeHtml(item.record_date) + '</td><td><strong>' + escapeHtml(item.full_name) + '</strong><small class="d-block text-muted">' + escapeHtml(translateText('Room')) + ' ' + escapeHtml(item.room_number) + '</small></td><td>' + escapeHtml(translateText(item.payment_method)) + '</td><td class="text-end">' + formatMoney(item.room_charge) + '</td><td class="text-end">' + formatMoney(item.service_charge) + '</td><td class="text-end fw-bold">' + formatMoney(item.grand_total) + '</td><td><span class="badge income-status-badge ' + (paid ? 'income-status-paid' : 'income-status-pending') + '">' + escapeHtml(translateText(paid ? 'Paid' : 'Pending')) + '</span></td></tr>';
		}).join(''));
	}

	$("#printIncomeRecords").on('click', function(){
		$('#incomePrintOptionsModal').modal('show');
	});

	$("#confirmIncomePrint").on('click', function(){
		const orientation = $('#incomePrintOrientation').val();
		const density = $('#incomePrintDensity').val();
		$('#incomePrintOptionsModal').modal('hide');
		const records = window.summaryIncomeRecords || [];
		const reportMonth = $('#summaryMonth').val() || new Date().toISOString().slice(0, 7);
		const monthLabel = new Date(reportMonth + '-01T00:00:00').toLocaleDateString('en-US', {month: 'long', year: 'numeric'});
		const generatedAt = new Date().toLocaleString('en-US', {dateStyle: 'medium', timeStyle: 'short'});
		const totalRoom = records.reduce((sum, record) => sum + Number(record.room_charge || 0), 0);
		const totalServices = records.reduce((sum, record) => sum + Number(record.service_charge || 0), 0);
		const totalIncome = records.reduce((sum, record) => sum + Number(record.grand_total || 0), 0);
		const paidCount = records.filter(record => record.room_payment_status === 'Paid' && record.service_payment_status === 'Paid').length;
		const pendingCount = records.length - paidCount;
		const printWindow = window.open('', '_blank', 'width=1200,height=850');

		if(!printWindow){
			showAppToast('Please allow pop-ups to print the income report.');
			return;
		}

		const tableRows = records.length ? records.map(record => {
			const paid = record.room_payment_status === 'Paid' && record.service_payment_status === 'Paid';
			return '<tr>' +
				'<td><strong>#PAY-' + escapeHtml(record.record_id) + '</strong></td>' +
				'<td>' + escapeHtml(record.record_date) + '</td>' +
				'<td><strong>' + escapeHtml(record.full_name) + '</strong><small>Room ' + escapeHtml(record.room_number) + '</small></td>' +
				'<td>' + escapeHtml(translateEnglish(record.payment_method)) + '</td>' +
				'<td class="number">' + formatMoney(record.room_charge) + '</td>' +
				'<td class="number">' + formatMoney(record.service_charge) + '</td>' +
				'<td class="number total">' + formatMoney(record.grand_total) + '</td>' +
				'<td><span class="status ' + (paid ? 'paid' : 'pending') + '">' + escapeHtml(translateEnglish(paid ? 'Paid' : 'Pending')) + '</span></td>' +
			'</tr>';
		}).join('') : '<tr><td colspan="8" class="empty">No income records for this reporting period.</td></tr>';

		printWindow.document.write('<!doctype html><html><head><meta charset="utf-8"><title>Grand Luxe - Income Records</title><style>' +
			'@page{size:A4 ' + orientation + ';margin:14mm}*{box-sizing:border-box}body{font-family:Arial,Helvetica,sans-serif;color:#172033;margin:0;font-size:' + (density === 'compact' ? '9px' : '11px') + ';background:#fff}' +
			'.report{max-width:1180px;margin:0 auto}.brand{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:3px solid #D97706;padding-bottom:16px}' +
			'.brand h1{font-size:24px;letter-spacing:2px;margin:0 0 5px;color:#0F172A}.brand p{margin:0;color:#64748B;font-size:11px}.report-title{text-align:right}.report-title h2{font-size:20px;margin:0 0 5px;color:#0F172A}.report-title p{margin:0;color:#64748B}' +
			'.overview{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:18px 0}.metric{border:1px solid #E2E8F0;border-left:4px solid #D97706;padding:' + (density === 'compact' ? '7px 9px' : '11px 13px') + ';background:#F8FAFC}.metric.services{border-left-color:#0F766E}.metric.pending{border-left-color:#DC2626}.metric span{display:block;color:#64748B;text-transform:uppercase;font-size:9px;letter-spacing:1px;font-weight:bold}.metric strong{display:block;color:#0F172A;font-size:17px;margin-top:5px}.metric small{display:block;color:#64748B;margin-top:4px}' +
			'.section-heading{display:flex;justify-content:space-between;align-items:end;border-bottom:1px solid #CBD5E1;padding-bottom:7px;margin:22px 0 8px}.section-heading h3{font-size:13px;margin:0;text-transform:uppercase;letter-spacing:.8px;color:#0F172A}.section-heading span{color:#64748B;font-size:10px}' +
			'table{border-collapse:collapse;width:100%}th{background:#0F172A;color:#fff;text-align:left;font-size:9px;text-transform:uppercase;letter-spacing:.7px;padding:' + (density === 'compact' ? '6px' : '9px 8px') + '}td{border-bottom:1px solid #E2E8F0;padding:' + (density === 'compact' ? '5px' : '8px') + ';color:#334155;vertical-align:top}td small{display:block;color:#64748B;margin-top:3px}.number{text-align:right;white-space:nowrap}.total{font-weight:bold;color:#0F172A}.status{display:inline-block;border-radius:12px;padding:4px 8px;font-size:9px;font-weight:bold}.status.paid{background:#DCFCE7;color:#166534}.status.pending{background:#FEF3C7;color:#92400E}.empty{text-align:center;color:#64748B;padding:24px}.footer{display:flex;justify-content:space-between;border-top:1px solid #CBD5E1;color:#64748B;font-size:9px;margin-top:22px;padding-top:9px}' +
			'@media print{.report{max-width:none}tr{page-break-inside:avoid}.no-print{display:none}}' +
			'</style></head><body><main class="report">' +
			'<header class="brand"><div><h1>GRAND LUXE</h1><p>Hotel Management System &bull; Finance Department</p></div><div class="report-title"><h2>Income Records</h2><p>' + escapeHtml(monthLabel) + '</p></div></header>' +
			'<section class="overview"><div class="metric"><span>Total income</span><strong>' + formatMoney(totalIncome) + '</strong><small>' + records.length + ' payment record' + (records.length === 1 ? '' : 's') + '</small></div>' +
			'<div class="metric"><span>Room revenue</span><strong>' + formatMoney(totalRoom) + '</strong><small>Accommodation charges</small></div>' +
			'<div class="metric services"><span>Service revenue</span><strong>' + formatMoney(totalServices) + '</strong><small>Minibar and room orders</small></div>' +
			'<div class="metric pending"><span>Collection status</span><strong>' + pendingCount + ' Pending</strong><small>' + paidCount + ' fully paid record' + (paidCount === 1 ? '' : 's') + '</small></div></section>' +
			'<div class="section-heading"><h3>Payment ledger</h3><span>Amounts shown in Myanmar Kyat (Ks)</span></div>' +
			'<table><thead><tr><th>Record</th><th>Date</th><th>Guest / room</th><th>Method</th><th style="text-align:right">Room</th><th style="text-align:right">Services</th><th style="text-align:right">Grand total</th><th>Status</th></tr></thead><tbody>' + tableRows + '</tbody></table>' +
			'<footer class="footer"><span>Prepared by Grand Luxe Finance Department</span><span>Generated ' + escapeHtml(generatedAt) + '</span></footer>' +
			'</main></body></html>');
		printWindow.document.close();
		printWindow.focus();
		printWindow.onload = function(){ printWindow.print(); };
	});

});
