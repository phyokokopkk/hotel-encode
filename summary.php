<div id="page-summary" class="page-view summary-page">
    <header class="summary-page-header mb-4">
        <div class="summary-page-intro">
            <span class="summary-kicker">FINANCE CONTROL ROOM</span>
            <h4 class="fw-bold mb-1">Hotel accounting overview</h4>
            <p class="text-muted mb-0">Track earned income, service activity, and payment follow-up in one place.</p>
        </div>
        <div class="summary-toolbar" aria-label="Report controls">
            <div class="summary-month-control">
                <label for="summaryMonth" class="form-label small fw-semibold text-muted mb-1">REPORTING MONTH</label>
                <input id="summaryMonth" class="form-control summary-month" type="month">
            </div>
            <button id="exportSummaryExcel" type="button" class="btn btn-outline-success" disabled><i class="bi bi-file-earmark-excel me-1"></i>Export Excel</button>
            <button id="summaryRefresh" type="button" class="btn btn-gold"><i class="bi bi-arrow-clockwise me-1"></i>Refresh</button>
        </div>
    </header>

    <div id="summaryAlert" class="alert alert-warning d-none" role="alert"></div>

    <div class="row g-3 mb-4">
        <div class="col-12 col-sm-6 col-xl-3"><div class="card custom-card summary-stat summary-stat-income p-3"><div class="summary-stat-top"><span class="summary-stat-label">TOTAL INCOME</span><i class="bi bi-cash-stack"></i></div><strong id="accountingTotal" class="summary-stat-value">0 Ks</strong><span class="small text-muted">Room and service income</span></div></div>
        <div class="col-12 col-sm-6 col-xl-3"><div class="card custom-card summary-stat p-3"><div class="summary-stat-top"><span class="summary-stat-label">ROOM REVENUE</span><i class="bi bi-door-open"></i></div><strong id="accountingRoom" class="summary-stat-value">0 Ks</strong><span class="small text-muted">Accommodation charges</span></div></div>
        <div class="col-12 col-sm-6 col-xl-3"><div class="card custom-card summary-stat summary-stat-services p-3"><div class="summary-stat-top"><span class="summary-stat-label">SERVICE REVENUE</span><i class="bi bi-cup-hot"></i></div><strong id="accountingServices" class="summary-stat-value">0 Ks</strong><span class="small text-muted">Minibar and room orders</span></div></div>
        <div class="col-12 col-sm-6 col-xl-3"><div class="card custom-card summary-stat summary-stat-alert p-3"><div class="summary-stat-top"><span class="summary-stat-label">PENDING BALANCE</span><i class="bi bi-exclamation-circle"></i></div><strong id="accountingPending" class="summary-stat-value">0 Ks</strong><span class="small text-muted">Requires collection</span></div></div>
    </div>

    <div class="row g-3 mb-4">
        <div class="col-12 col-xl-8"><section class="card custom-card summary-panel p-3 p-lg-4 h-100"><div class="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-3"><div><h6 class="fw-bold mb-1">Revenue performance</h6><span class="small text-muted">Last 12 months by income stream</span></div><span class="summary-chart-key"><i class="key-room"></i>Rooms <i class="key-services"></i>Services</span></div><div class="summary-chart-wrap"><svg id="revenueChart" viewBox="0 0 760 260" role="img" aria-label="Revenue performance chart"></svg></div></section></div>
        <div class="col-12 col-xl-4"><section class="card custom-card summary-panel p-3 p-lg-4 h-100"><h6 class="fw-bold mb-1">Income mix</h6><span class="small text-muted">Selected month composition</span><div class="mix-chart-area"><div id="incomeMixChart" class="mix-donut"><div><strong id="accountingMixTotal">0 Ks</strong><small>total</small></div></div></div><div class="mix-legend"><span><i class="key-room"></i>Room income <strong id="accountingMixRoom">0%</strong></span><span><i class="key-services"></i>Services <strong id="accountingMixServices">0%</strong></span></div></section></div>
    </div>

    <section class="card custom-card summary-panel p-3 p-lg-4 mb-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <div><h6 class="fw-bold mb-1">Minibar sales by category</h6><span class="small text-muted">Selected month sales by item category</span></div>
            <strong id="minibarCategoryTotal" class="small text-muted">0 Ks</strong>
        </div>
        <div id="minibarCategorySales" class="minibar-category-sales" aria-live="polite">
            <div class="text-center text-muted py-3">Loading minibar sales...</div>
        </div>
    </section>

    <section class="card custom-card summary-panel mb-4"><div class="card-header summary-card-header">
        <div><h6 class="mb-1 fw-bold"><i class="bi bi-exclamation-circle me-2 text-danger"></i>Outstanding balances</h6><span class="small text-muted">Guests with unpaid room or service charges for the selected month</span></div>
        <span id="outstandingBalanceCount" class="badge rounded-pill text-bg-light">0 balances</span>
    </div>
        <div class="table-responsive summary-table-wrap" style="max-height: 400px; overflow-y: auto;">
            <table class="table table-hover align-middle mb-0 summary-table summary-table-balances">
                <thead class="table-light sticky-top">
                    <tr>
                        <th>Guest</th><th>Room</th><th>Phone</th><th>Charge type</th><th class="text-end">Outstanding</th>
                    </tr>
                </thead>
                <tbody id="outstandingBalancesBody">
                    <tr><td colspan="5" class="text-center text-muted py-4">Loading outstanding balances...</td></tr>
                </tbody>
            </table>
        </div>
    </section>

    <section class="card custom-card summary-panel mb-4"><div class="card-header summary-card-header">
        <div>
            <h6 class="mb-1 fw-bold"><i class="bi bi-calendar3 me-2 text-warning"></i> Daily transaction log </h6>
            <span class="small text-muted">Every posted room and service transaction for the selected month</span>
        </div>
        <span id="transactionCount" class="badge rounded-pill text-bg-light">0 entries</span>
    </div>

        <div class="table-responsive summary-table-wrap" style="max-height: 400px; overflow-y: auto;">
            <table class="table table-hover align-middle mb-0 summary-table summary-table-transactions">
                <thead class="table-light sticky-top">
                    <tr>
                        <th>Date</th><th>Time</th><th>Buyer / guest</th><th>Category</th><th class="text-end">Amount</th>
                    </tr>
                </thead>
                <tbody id="dailyTransactionsBody">
                    <tr><td colspan="5" class="text-center text-muted py-4">Loading transactions...</td></tr>
                </tbody>
            </table>
        </div>
    </section>

    <section class="card custom-card summary-panel"><div class="card-header summary-card-header"><div><h6 class="mb-1 fw-bold"><i class="bi bi-journal-text me-2 text-warning"></i>Income records</h6><span class="small text-muted">Payment ledger with guest and collection status</span></div><button id="printIncomeRecords" class="btn btn-sm btn-outline-secondary" type="button"><i class="bi bi-printer me-1"></i>Print report</button></div>
        <div class="table-responsive summary-table-wrap" style="max-height: 400px; overflow-y: auto;">
            <table id="incomeRecordsTable" class="table table-hover align-middle mb-0 summary-table summary-table-income">
                <thead class="table-light sticky-top"><tr><th>Record</th><th>Date</th><th>Guest / room</th><th>Method</th><th class="text-end">Room</th><th class="text-end">Services</th><th class="text-end">Total</th><th>Status</th></tr></thead>
                <tbody id="incomeRecordsBody"><tr><td colspan="8" class="text-center text-muted py-4">Loading income records...</td></tr></tbody>
            </table>
        </div>
    </section>

</div>