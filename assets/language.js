(function() {
    const storageKey = 'hotelAppLanguage';
    const translations = {
        'System Settings': 'စနစ်ဆက်တင်များ',
        'Save Settings': 'ဆက်တင်များ သိမ်းရန်',
        'Display Language': 'ပြသမည့် ဘာသာစကား',
        'Choose the language used throughout this app. This preference is saved in this browser.': 'ဤအက်ပ်တစ်ခုလုံးတွင် အသုံးပြုမည့် ဘာသာစကားကို ရွေးချယ်ပါ။ ဤရွေးချယ်မှုကို ဤဘရောက်ဇာတွင် သိမ်းဆည်းပါမည်။',
        'Hotel Name': 'ဟိုတယ်အမည်',
        'Contact Phone': 'ဆက်သွယ်ရန် ဖုန်း',
        'Address': 'လိပ်စာ',
        'Database Backup': 'ဒေတာဘေ့စ် အရန်သိမ်းခြင်း',
        'Download Backup': 'အရန်ဖိုင် ဒေါင်းလုဒ်လုပ်ရန်',
        'Restore from backup': 'အရန်ဖိုင်မှ ပြန်လည်ရယူရန်',
        'Restore Database': 'ဒေတာဘေ့စ် ပြန်လည်ရယူရန်',
        'Restoring replaces the current database. Only SQL backups downloaded from this system are supported.': 'ပြန်လည်ရယူပါက လက်ရှိဒေတာဘေ့စ်ကို အစားထိုးပါမည်။ ဤစနစ်မှ ဒေါင်းလုဒ်လုပ်ထားသော SQL အရန်ဖိုင်များကိုသာ အသုံးပြုနိုင်ပါသည်။',
        'Grand Luxe Hotel': 'Grand Luxe ဟိုတယ်',
        'Hotel street address': 'ဟိုတယ်လိပ်စာ',
        'Dashboard': 'ဒက်ရှ်ဘုတ်',
        'Dashboard Overview': 'ဒက်ရှ်ဘုတ် အကျဉ်းချုပ်',
        'Room Management': 'အခန်း စီမံခန့်ခွဲမှု',
        'Bookings': 'ဘွတ်ကင်များ',
        'In-Room Minibar': 'အခန်းတွင်း မီနီဘား',
        'Guest Payment': 'ငွေပေးချေမှု',
        'Contact & Support': 'ဆက်သွယ်ရန်နှင့် အကူအညီ',
        'Summary': 'အကျဉ်းချုပ်',
        'Users': 'အသုံးပြုသူများ',
        'Settings': 'ဆက်တင်များ',
        'Check License': 'လိုင်စင် စစ်ဆေးရန်',
        'System Active v2.4': 'စနစ် အသုံးပြုနေသည် v2.4',
        'Logout': 'ထွက်ရန်',
        'Notifications': 'အသိပေးချက်များ',
        'Mark all read': 'အားလုံး ဖတ်ပြီးဟု မှတ်ရန်',
        'Loading notifications...': 'အသိပေးချက်များ ဖွင့်နေသည်...',
        'unread notifications': 'မဖတ်ရသေးသော အသိပေးချက်များ',
        'OCCUPIED ROOMS': 'လက်ရှိအသုံးပြုနေသော အခန်းများ',
        "TODAY'S BOOKINGS": 'ယနေ့ ဘွတ်ကင်များ',
        "TODAY'S ROOM CHARGES": 'ယနေ့ အခန်းခများ',
        "TODAY'S REVENUE": 'ယနေ့ ဝင်ငွေ',
        "Today's Minibar Sales by Category": 'ယနေ့ မီနီဘား အမျိုးအစားအလိုက် ရောင်းရငွေ',
        'Daily summary': 'နေ့စဉ် အကျဉ်းချုပ်',
        'Category': 'အမျိုးအစား',
        'Total Sales': 'စုစုပေါင်း ရောင်းရငွေ',
        'Loading...': 'ဖွင့်နေသည်...',
        'Recent Booking Operations': 'လတ်တလော ဘွတ်ကင် လုပ်ဆောင်မှုများ',
        'Guest Name': 'ဧည့်သည်အမည်',
        'Room No': 'အခန်းအမှတ်',
        'Check In': 'ဝင်ရောက်သည့်ရက်',
        'Check Out': 'ထွက်ခွာသည့်ရက်',
        'Status': 'အခြေအနေ',
        'Payment Status': 'ငွေပေးချေမှု အခြေအနေ',
        'Room Status & Directory': 'အခန်းအခြေအနေနှင့် စာရင်း',
        'Search rooms by number, type, status, or guest...': 'အခန်းနံပါတ်၊ အမျိုးအစား၊ အခြေအနေ သို့မဟုတ် ဧည့်သည်ဖြင့် ရှာပါ...',
        'Search rooms by number, type, status, or guest': 'အခန်းနံပါတ်၊ အမျိုးအစား၊ အခြေအနေ သို့မဟုတ် ဧည့်သည်ဖြင့် ရှာပါ',
        'Room layout': 'အခန်းပြသမှုပုံစံ',
        'Table': 'ဇယား',
        'Cards': 'ကတ်များ',
        'Price /night': 'တစ်ညတာ ဈေးနှုန်း',
        'Show Only Available': 'လွတ်နေသောအခန်းများသာ ပြရန်',
        'Edit Room Types': 'အခန်းအမျိုးအစား ပြင်ရန်',
        'Add New Room': 'အခန်းအသစ် ထည့်ရန်',
        'Room': 'အခန်း',
        'Staff': 'ဝန်ထမ်း',
        'Floors': 'အထပ်',
        'Max': 'အများဆုံး',
        'Type': 'အမျိုးအစား',
        'Features': 'အင်္ဂါရပ်များ',
        'Prices /night': 'တစ်ညတာ ဈေးနှုန်း',
        'Action': 'လုပ်ဆောင်ချက်',
        'New Reservation': 'ကြိုတင်မှာယူမှု အသစ်',
        'Guest Full Name': 'ဧည့်သည်အမည် အပြည့်အစုံ',
        'Guest NRC': 'ဧည့်သည် မှတ်ပုံတင်အမှတ်',
        'Guest Phone Number': 'ဧည့်သည် ဖုန်းနံပါတ်',
        'Room Selection': 'အခန်း ရွေးချယ်ရန်',
        'Select Room': 'အခန်း ရွေးပါ',
        'Check In Date': 'ဝင်ရောက်မည့်ရက်',
        'Check Out Date': 'ထွက်ခွာမည့်ရက်',
        'Create Reservation': 'ကြိုတင်မှာယူမှု ပြုလုပ်ရန်',
        'Active Reservations List': 'လက်ရှိ ကြိုတင်မှာယူမှုများ',
        'Guest': 'ဧည့်သည်',
        'Dates': 'ရက်စွဲများ',
        'Guest Billing & Payment': 'ဧည့်သည် ဘေလ်နှင့် ငွေပေးချေမှု',
        'Choose a booking to review its charges and collect the outstanding balance.': 'ကျသင့်ငွေများကို စစ်ဆေးပြီး ကျန်ငွေကောက်ခံရန် ဘွတ်ကင်တစ်ခုကို ရွေးပါ။',
        'Select guest': 'ဧည့်သည် ရွေးပါ',
        'Search by guest name or NRC': 'ဧည့်သည်အမည် သို့မဟုတ် မှတ်ပုံတင်အမှတ်ဖြင့် ရှာရန်',
        'View payment records': 'ငွေပေးချေမှု မှတ်တမ်းများ ကြည့်ရန်',
        'Guest and stay details': 'ဧည့်သည်နှင့် တည်းခိုမှု အသေးစိတ်',
        'Select a booking to load its stay information and itemized charges.': 'တည်းခိုမှုအချက်အလက်နှင့် ကျသင့်ငွေ အသေးစိတ်ကြည့်ရန် ဘွတ်ကင်တစ်ခု ရွေးပါ။',
        'Booking (room and guest)': 'ဘွတ်ကင် (အခန်း/ဧည့်သည်)',
        'Select a booking': 'ဘွတ်ကင် ရွေးပါ',
        'Nights stayed': 'တည်းခိုသည့် ညအရေအတွက်',
        'Check-in date': 'ဝင်ရောက်သည့်ရက်',
        'Check-out date': 'ထွက်ခွာသည့်ရက်',
        'Room type': 'အခန်းအမျိုးအစား',
        'Rate per night': 'တစ်ညတာ ဈေးနှုန်း',
        'Payment summary': 'ငွေပေးချေမှု အကျဉ်းချုပ်',
        'Outstanding charges to be collected': 'ကောက်ခံရန် ကျန်ရှိသော ကျသင့်ငွေ',
        'Room charges due': 'ပေးရန်ကျန် အခန်းခ',
        'Service charges due': 'ပေးရန်ကျန် ဝန်ဆောင်ခ',
        'Room charge details': 'အခန်းခ အသေးစိတ်',
        'Description': 'ဖော်ပြချက်',
        'Nights': 'ည',
        'Rate': 'နှုန်းထား',
        'Original charge': 'မူလကျသင့်ငွေ',
        'Select a booking to view charges.': 'ကျသင့်ငွေများကြည့်ရန် ဘွတ်ကင်တစ်ခု ရွေးပါ။',
        'Minibar and service charges': 'မီနီဘားနှင့် ဝန်ဆောင်ခများ',
        'Amounts show the remaining balance; paid items show Ks0.00.': 'ကျန်ငွေကို ပြထားပြီး ပေးချေပြီးသော ပစ္စည်းများတွင် Ks0.00 ပြပါမည်။',
        'Item': 'ပစ္စည်း',
        'Qty': 'အရေအတွက်',
        'Unit price': 'တစ်ခုချင်း ဈေးနှုန်း',
        'Amount due': 'ပေးရန်ကျန်ငွေ',
        'Outstanding balance': 'ပေးရန်ကျန်ငွေ စုစုပေါင်း',
        'Collect payment & print receipt': 'ငွေလက်ခံပြီး ပြေစာထုတ်ရန်',
        'In-Room Minibar Inventory & Room Charge': 'အခန်းတွင်း မီနီဘား စာရင်းနှင့် အခန်းခ',
        'Manage Categories': 'အမျိုးအစားများ စီမံရန်',
        'Add Item': 'ပစ္စည်း ထည့်ရန်',
        'Pending In-Room Charges': 'ပေးရန်ကျန် အခန်းတွင်း ကျသင့်ငွေများ',
        'Room and minibar charges waiting for payment': 'ငွေပေးချေရန် စောင့်ဆိုင်းနေသော အခန်းခနှင့် မီနီဘားခများ',
        'Phone': 'ဖုန်း',
        'Charge Type': 'ကျသင့်ငွေ အမျိုးအစား',
        'Amount': 'ပမာဏ',
        'Loading pending charges...': 'ပေးရန်ကျန်ငွေများ ဖွင့်နေသည်...',
        'Minibar Charge Records': 'မီနီဘား ကျသင့်ငွေ မှတ်တမ်းများ',
        'Recorded minibar purchases for rooms, staff, and other buyers': 'အခန်း၊ ဝန်ထမ်းနှင့် အခြားဝယ်ယူသူများ၏ မီနီဘား ဝယ်ယူမှုမှတ်တမ်းများ',
        'Date': 'ရက်စွဲ',
        'Buyer Type': 'ဝယ်ယူသူ အမျိုးအစား',
        'Buyer': 'ဝယ်ယူသူ',
        'Reference': 'ကိုးကားချက်',
        'Quantity': 'အရေအတွက်',
        'Unit Price': 'တစ်ခုချင်း ဈေးနှုန်း',
        'Loading minibar charge records...': 'မီနီဘား ကျသင့်ငွေမှတ်တမ်းများ ဖွင့်နေသည်...',
        'Item Name': 'ပစ္စည်းအမည်',
        'Cost Price': 'အရင်းဈေး',
        'Stock Level': 'လက်ကျန်အရေအတွက်',
        'Front Desk Contacts': 'ဧည့်ကြိုဌာန ဆက်သွယ်ရန်',
        'Guest Request / Support Ticket': 'ဧည့်သည် တောင်းဆိုချက် / အကူအညီ',
        'Guest Room': 'ဧည့်သည်အခန်း',
        'Room Number': 'အခန်းအမှတ်',
        'Subject': 'အကြောင်းအရာ',
        'Enter subject': 'အကြောင်းအရာ ထည့်ပါ',
        'Message / Request': 'စာတို / တောင်းဆိုချက်',
        'Type request or feedback...': 'တောင်းဆိုချက် သို့မဟုတ် အကြံပြုချက် ရေးပါ...',
        'Send Support Ticket': 'အကူအညီ တောင်းဆိုချက် ပို့ရန်',
        'Contact Logs & Replies': 'ဆက်သွယ်မှုမှတ်တမ်းနှင့် အကြောင်းပြန်ချက်များ',
        'Live ticket log': 'လတ်တလော တောင်းဆိုချက်မှတ်တမ်း',
        'FINANCE CONTROL ROOM': 'ဘဏ္ဍာရေး စီမံခန့်ခွဲမှု',
        'Hotel accounting overview': 'ဟိုတယ် စာရင်းအင်း အကျဉ်းချုပ်',
        'Track earned income, service activity, and payment follow-up in one place.': 'ဝင်ငွေ၊ ဝန်ဆောင်မှုလုပ်ဆောင်ချက်နှင့် ငွေပေးချေမှုများကို စောင့်ကြည့်ပါ။',
        'Export Excel': 'Excel ဖိုင် ထုတ်ယူရန်',
        'Reporting month': 'အစီရင်ခံမည့်လ',
        'Total income (Ks)': 'စုစုပေါင်း ဝင်ငွေ (ကျပ်)',
        'Room revenue (Ks)': 'အခန်း ဝင်ငွေ (ကျပ်)',
        'Service revenue (Ks)': 'ဝန်ဆောင်မှု ဝင်ငွေ (ကျပ်)',
        'Pending balance (Ks)': 'ပေးရန်ကျန်ငွေ (ကျပ်)',
        'Outstanding balance count': 'ပေးရန်ကျန်ငွေ အရေအတွက်',
        'Transaction count': 'ငွေလွှဲမှု အရေအတွက်',
        'Income record count': 'ဝင်ငွေ မှတ်တမ်း အရေအတွက်',
        'Monthly Revenue': 'လစဉ် ဝင်ငွေ',
        'Minibar Sales': 'မီနီဘား ရောင်းရငွေ',
        'Outstanding Balances': 'ပေးရန်ကျန်ငွေများ',
        'Daily Transactions': 'နေ့စဉ် ငွေလွှဲမှုများ',
        'Income Records': 'ဝင်ငွေ မှတ်တမ်းများ',
        'Month': 'လ',
        'Total revenue (Ks)': 'စုစုပေါင်း ဝင်ငွေ (ကျပ်)',
        'Total amount (Ks)': 'စုစုပေါင်း ပမာဏ (ကျပ်)',
        'Buyer type': 'ဝယ်ယူသူ အမျိုးအစား',
        'Amount (Ks)': 'ပမာဏ (ကျပ်)',
        'Service payment status': 'ဝန်ဆောင်ခ ပေးချေမှု အခြေအနေ',
        'Payment method': 'ငွေပေးချေမှု နည်းလမ်း',
        'Room charge (Ks)': 'အခန်းခ (ကျပ်)',
        'Service charge (Ks)': 'ဝန်ဆောင်ခ (ကျပ်)',
        'Grand total (Ks)': 'စုစုပေါင်း ကျသင့်ငွေ (ကျပ်)',
        'Room payment status': 'အခန်းခ ပေးချေမှု အခြေအနေ',
        'Payment Required': 'ငွေပေးချေမှု လိုအပ်သည်',
        'Please charge payment first before checking out this booking.': 'ဤဘွတ်ကင်ကို မထွက်ခွာမီ ငွေပေးချေမှုကို အရင်ကောက်ခံပါ။',
        'REPORTING MONTH': 'အစီရင်ခံမည့်လ',
        'Refresh': 'ပြန်လည်ဖွင့်ရန်',
        'TOTAL INCOME': 'စုစုပေါင်း ဝင်ငွေ',
        'Room and service income': 'အခန်းနှင့် ဝန်ဆောင်မှု ဝင်ငွေ',
        'ROOM REVENUE': 'အခန်း ဝင်ငွေ',
        'Accommodation charges': 'တည်းခိုခ',
        'SERVICE REVENUE': 'ဝန်ဆောင်မှု ဝင်ငွေ',
        'Minibar and room orders': 'မီနီဘားနှင့် အခန်းတွင်း မှာယူမှုများ',
        'PENDING BALANCE': 'ပေးရန်ကျန်ငွေ',
        'Requires collection': 'ကောက်ခံရန် လိုအပ်သည်',
        'Revenue performance': 'ဝင်ငွေ အခြေအနေ',
        'Last 12 months by income stream': 'ဝင်ငွေအမျိုးအစားအလိုက် ပြီးခဲ့သော ၁၂ လ',
        'Rooms': 'အခန်းများ',
        'Services': 'ဝန်ဆောင်မှုများ',
        'Income mix': 'ဝင်ငွေ အချိုးအစား',
        'Selected month composition': 'ရွေးချယ်ထားသောလ၏ အချိုးအစား',
        'total': 'စုစုပေါင်း',
        'Room income': 'အခန်း ဝင်ငွေ',
        'Minibar sales by category': 'မီနီဘား အမျိုးအစားအလိုက် ရောင်းရငွေ',
        'Selected month sales by item category': 'ရွေးချယ်ထားသောလအတွင်း ပစ္စည်းအမျိုးအစားအလိုက် ရောင်းရငွေ',
        'Loading minibar sales...': 'မီနီဘား ရောင်းရငွေ ဖွင့်နေသည်...',
        'Outstanding balances': 'ပေးရန်ကျန်ငွေများ',
        'Guests with unpaid room or service charges for the selected month': 'ရွေးချယ်ထားသောလအတွက် အခန်းခ သို့မဟုတ် ဝန်ဆောင်ခ ပေးရန်ကျန်သော ဧည့်သည်များ',
        'No outstanding balances for this month.': 'ဤလအတွက် ပေးရန်ကျန်ငွေ မရှိပါ။',
        'balance': 'လက်ကျန်',
        'balances': 'လက်ကျန်',
        'Loading outstanding balances...': 'ပေးရန်ကျန်ငွေများကို ဖွင့်နေသည်...',
        'Charge type': 'ကျသင့်ငွေ အမျိုးအစား',
        'Outstanding': 'ပေးရန်ကျန်',
        'Outstanding (Ks)': 'ပေးရန်ကျန် (ကျပ်)',
        'Daily transaction log': 'နေ့စဉ် ငွေလွှဲမှတ်တမ်း',
        'Every posted room and service transaction for the selected month': 'ရွေးချယ်ထားသောလအတွင်း အခန်းနှင့် ဝန်ဆောင်မှု ငွေလွှဲမှုအားလုံး',
        'Buyer / guest': 'ဝယ်ယူသူ / ဧည့်သည်',
        'Buyer / reference': 'ဝယ်ယူသူ / ကိုးကားချက်',
        'Report controls': 'အစီရင်ခံစာ ထိန်းချုပ်မှုများ',
        'Revenue performance chart': 'ဝင်ငွေ အခြေအနေ ဇယား',
        'No transactions recorded for this month.': 'ဤလအတွက် ငွေလွှဲမှတ်တမ်း မရှိပါ။',
        'Loading transactions...': 'ငွေလွှဲမှတ်တမ်းများ ဖွင့်နေသည်...',
        'entries': 'စာရင်းများ',
        'entry': 'စာရင်း',
        'item': 'ခု',
        'items': 'ခု',
        'of minibar sales': 'မီနီဘား ရောင်းရငွေ၏',
        'No minibar sales recorded for this month.': 'ဤလအတွက် မီနီဘား ရောင်းချမှု မရှိပါ။',
        'No income records for this month.': 'ဤလအတွက် ဝင်ငွေမှတ်တမ်း မရှိပါ။',
        'No report data available.': 'အစီရင်ခံစာ ဒေတာ မရရှိနိုင်ပါ။',
        'No revenue recorded yet': 'ဝင်ငွေ မှတ်တမ်း မရှိသေးပါ။',
        'The accounting report could not be loaded. Check the database connection.': 'စာရင်းအင်း အစီရင်ခံစာကို ဖွင့်၍ မရပါ။ ဒေတာဘေ့စ် ချိတ်ဆက်မှုကို စစ်ဆေးပါ။',
        'Load the accounting report before exporting it.': 'မထုတ်ယူမီ စာရင်းအင်း အစီရင်ခံစာကို ဖွင့်ပါ။',
        'Room guest': 'အခန်းတည်းခို ဧည့်သည်',
        'Customer': 'ဖောက်သည်',
        'Staff purchase': 'ဝန်ထမ်း ဝယ်ယူမှု',
        'Customer purchase': 'ဖောက်သည် ဝယ်ယူမှု',
        'Ref:': 'ကိုးကားချက်:',
        'Phone:': 'ဖုန်း:',
        'Time': 'အချိန်',
        'Income records': 'ဝင်ငွေ မှတ်တမ်းများ',
        'Payment ledger with guest and collection status': 'ဧည့်သည်နှင့် ငွေလက်ခံမှုအခြေအနေပါ ငွေပေးချေမှုစာရင်း',
        'Print report': 'အစီရင်ခံစာ ပုံနှိပ်ရန်',
        'Record': 'မှတ်တမ်း',
        'Guest / room': 'ဧည့်သည် / အခန်း',
        'Collection status': 'ငွေလက်ခံမှု အခြေအနေ',
        'Room revenue': 'အခန်း ဝင်ငွေ',
        'Service revenue': 'ဝန်ဆောင်မှု ဝင်ငွေ',
        'Total income': 'စုစုပေါင်း ဝင်ငွေ',
        'Payment ledger': 'ငွေပေးချေမှု စာရင်း',
        'Grand total': 'စုစုပေါင်း ကျသင့်ငွေ',
        'Finance Department': 'ဘဏ္ဍာရေးဌာန',
        'Cash': 'ငွေသား',
        'Credit Card': 'ခရက်ဒစ်ကတ်',
        'KBZPay': 'KBZPay',
        'WavePay': 'WavePay',
        'Service Charge': 'ဝန်ဆောင်ခ',
        'Minibar': 'မီနီဘား',
        'Menu': 'မီနူး',
        'payment record': 'ငွေပေးချေမှု မှတ်တမ်း',
        'payment records': 'ငွေပေးချေမှု မှတ်တမ်းများ',
        'fully paid record': 'အပြည့်အဝ ပေးချေပြီး မှတ်တမ်း',
        'fully paid records': 'အပြည့်အဝ ပေးချေပြီး မှတ်တမ်းများ',
        'Prepared by Grand Luxe Finance Department': 'Grand Luxe ဘဏ္ဍာရေးဌာနမှ ပြင်ဆင်သည်',
        'Generated': 'ထုတ်လုပ်သည့်အချိန်',
        'Amounts shown in Myanmar Kyat (Ks)': 'ပမာဏများကို မြန်မာကျပ်ဖြင့် ဖော်ပြထားသည်',
        'No income records for this reporting period.': 'ဤအစီရင်ခံကာလအတွက် ဝင်ငွေမှတ်တမ်း မရှိပါ။',
        'Method': 'နည်းလမ်း',
        'Full Name': 'အမည် အပြည့်အစုံ',
        'Username': 'အသုံးပြုသူအမည်',
        'Role': 'တာဝန်',
        'Created': 'ဖန်တီးသည့်ရက်',
        'Actions': 'လုပ်ဆောင်ချက်များ',
        'User accounts': 'အသုံးပြုသူ အကောင့်များ',
        'Users & Access Control': 'အသုံးပြုသူများနှင့် ဝင်ရောက်ခွင့် ထိန်းချုပ်မှု',
        'Add User': 'အသုံးပြုသူ ထည့်ရန်',
        'Loading users...': 'အသုံးပြုသူများ ဖွင့်နေသည်...',
        'No users found.': 'အသုံးပြုသူ မတွေ့ပါ။',
        'Unable to load users.': 'အသုံးပြုသူများ ဖွင့်၍ မရပါ။',
        'Failed to load users.': 'အသုံးပြုသူများ ဖွင့်၍ မရပါ။',
        'Admin accounts cannot be deactivated': 'စီမံခန့်ခွဲသူ အကောင့်များကို ပိတ်၍မရပါ',
        'Change Your Password': 'သင့်စကားဝှက် ပြောင်းရန်',
        'Change Password': 'စကားဝှက် ပြောင်းရန်',
        'New password': 'စကားဝှက်အသစ်',
        'Confirm new password': 'စကားဝှက်အသစ်ကို အတည်ပြုပါ',
        'Current password': 'လက်ရှိစကားဝှက်',
        "Target admin's current password": 'ပစ်မှတ်စီမံခန့်ခွဲသူ၏ လက်ရှိစကားဝှက်',
        "Enter the target admin account's current password to authorize this change.": 'ဤပြောင်းလဲမှုကို ခွင့်ပြုရန် ပစ်မှတ်စီမံခန့်ခွဲသူအကောင့်၏ လက်ရှိစကားဝှက်ကို ထည့်ပါ။',
        'The current password is incorrect.': 'လက်ရှိစကားဝှက် မှားယွင်းနေပါသည်။',
        "The target admin's current password is incorrect.": 'ပစ်မှတ်စီမံခန့်ခွဲသူ၏ လက်ရှိစကားဝှက် မှားယွင်းနေပါသည်။',
        'The passwords do not match.': 'စကားဝှက်များ ကိုက်ညီမှုမရှိပါ။',
        'A new password is required.': 'စကားဝှက်အသစ် ထည့်ရန် လိုအပ်ပါသည်။',
        'Password changed successfully.': 'စကားဝှက် ပြောင်းလဲပြီးပါပြီ။',
        'Unable to change password.': 'စကားဝှက် ပြောင်းလဲ၍ မရပါ။',
        'Failed to change password.': 'စကားဝှက် ပြောင်းလဲမှု မအောင်မြင်ပါ။',
        'User deleted successfully.': 'အသုံးပြုသူကို ဖျက်ပြီးပါပြီ။',
        'Unable to delete user.': 'အသုံးပြုသူကို ဖျက်၍ မရပါ။',
        'User created successfully.': 'အသုံးပြုသူကို ဖန်တီးပြီးပါပြီ။',
        'Unable to create user.': 'အသုံးပြုသူကို ဖန်တီး၍ မရပါ။',
        'User updated successfully.': 'အသုံးပြုသူ အချက်အလက်ကို ပြင်ဆင်ပြီးပါပြီ။',
        'Unable to update user.': 'အသုံးပြုသူ အချက်အလက်ကို ပြင်ဆင်၍ မရပါ။',
        'Role: Admin': 'တာဝန်: စီမံခန့်ခွဲသူ',
        'Role: Manager': 'တာဝန်: မန်နေဂျာ',
        'Role: Receptionist': 'တာဝန်: ဧည့်ကြိုဝန်ထမ်း',
        'Role: Subscriber': 'တာဝန်: စာရင်းသွင်းသူ',
        'The language could not be saved in this browser.': 'ဤဘရောက်ဇာတွင် ဘာသာစကားကို သိမ်းဆည်း၍ မရပါ။',
        'You’re all caught up.': 'ဖတ်ရန် အသိပေးချက်အသစ် မရှိပါ။',
        'Unable to load notifications.': 'အသိပေးချက်များ ဖွင့်၍ မရပါ။',
        'Unable to load notifications. Please try again.': 'အသိပေးချက်များ ဖွင့်၍ မရပါ။ ထပ်မံကြိုးစားပါ။',
        'Unread': 'မဖတ်ရသေး',
        'New booking #': 'ဘွတ်ကင်အသစ် #',
        'Overdue check-out': 'သက်တမ်းကျော်လွန်သော ထွက်ခွာရက်',
        'New guest message': 'ဧည့်သည်စာတိုအသစ်',
        'Outstanding payment': 'ပေးရန်ကျန် ငွေပေးချေမှု',
        'Outstanding minibar balance': 'ပေးရန်ကျန် မီနီဘားလက်ကျန်',
        'Support request': 'အကူအညီ တောင်းဆိုချက်',
        'Check-out date ': 'ထွက်ခွာရက် ',
        'Please enter username and password.': 'အသုံးပြုသူအမည်နှင့် စကားဝှက် ထည့်ပါ။',
        'Login failed.': 'ဝင်ရောက်၍ မရပါ။',
        'Login request failed. Please try again.': 'ဝင်ရောက်ရန် တောင်းဆိုမှု မအောင်မြင်ပါ။ ထပ်မံကြိုးစားပါ။',
        'Username': 'အသုံးပြုသူအမည်',
        'Password': 'စကားဝှက်',
        'Enter username': 'အသုံးပြုသူအမည် ထည့်ပါ',
        'Enter password': 'စကားဝှက် ထည့်ပါ',
        'Login': 'ဝင်ရောက်ရန်',
        'Hotel Admin Login': 'ဟိုတယ် စီမံခန့်ခွဲသူ ဝင်ရောက်ရန်',
        'Hotel Management System': 'ဟိုတယ် စီမံခန့်ခွဲမှု စနစ်',
        'Search guest or room...': 'ဧည့်သည် သို့မဟုတ် အခန်း ရှာရန်...',
        'Search bookings by guest name or room number': 'ဧည့်သည်အမည် သို့မဟုတ် အခန်းအမှတ်ဖြင့် ဘွတ်ကင် ရှာရန်',
        'Notifications': 'အသိပေးချက်များ',
        'Close': 'ပိတ်ရန်',
        'Add New Hotel Room': 'ဟိုတယ်အခန်းအသစ် ထည့်ရန်',
        'Floor': 'အထပ်',
        'e.g. 4': 'ဥပမာ ၄',
        'e.g. Standard Room': 'ဥပမာ ပုံမှန်အခန်း',
        'Max Occupancy': 'ဧည့်သည် အများဆုံးဆံ့မှု',
        'e.g. Air conditioning, Free Wi-Fi': 'ဥပမာ လေအေးပေးစက်၊ အခမဲ့ Wi-Fi',
        'Price Per Night (Ks)': 'တစ်ညတာ ဈေးနှုန်း (Ks)',
        'Available': 'လွတ်နေသည်',
        'Occupied': 'အသုံးပြုနေသည်',
        'Maintenance': 'ပြုပြင်ထိန်းသိမ်းနေသည်',
        'Disabled': 'အသုံးမပြုနိုင်ပါ',
        'Cancel': 'မလုပ်တော့ပါ',
        'Save Room': 'အခန်း သိမ်းရန်',
        'Add Room Type': 'အခန်းအမျိုးအစား ထည့်ရန်',
        'Room Type': 'အခန်းအမျိုးအစား',
        'Price/night': 'တစ်ညတာ ဈေးနှုန်း',
        'Charge Item to Room': 'ပစ္စည်းခကို အခန်းသို့ သွင်းရန်',
        'Purchase Type': 'ဝယ်ယူမှု အမျိုးအစား',
        'Room Charge': 'အခန်းခ',
        'Staff Purchase': 'ဝန်ထမ်း ဝယ်ယူမှု',
        'Other / General Purchase': 'အခြား / အထွေထွေ ဝယ်ယူမှု',
        'Staff Name': 'ဝန်ထမ်းအမည်',
        'Enter staff name': 'ဝန်ထမ်းအမည် ထည့်ပါ',
        'Buyer Name': 'ဝယ်ယူသူအမည်',
        'Enter buyer name': 'ဝယ်ယူသူအမည် ထည့်ပါ',
        'Buyer Phone': 'ဝယ်ယူသူ ဖုန်းနံပါတ်',
        'Enter phone number': 'ဖုန်းနံပါတ် ထည့်ပါ',
        'Room number / staff ID / customer reference': 'အခန်းအမှတ် / ဝန်ထမ်း ID / ဖောက်သည် ကိုးကားချက်',
        'Unit Price (Ks)': 'တစ်ခုချင်း ဈေးနှုန်း (Ks)',
        'Save Item': 'ပစ္စည်း သိမ်းရန်',
        'Select category': 'အမျိုးအစား ရွေးပါ',
        'Cost Price (Ks)': 'အရင်းဈေး (Ks)',
        'Update Item': 'ပစ္စည်း ပြင်ဆင်ရန်',
        'Manage Minibar Categories': 'မီနီဘား အမျိုးအစားများ စီမံရန်',
        'Add a new category': 'အမျိုးအစားအသစ် ထည့်ပါ',
        'Add': 'ထည့်ရန်',
        'Room Details': 'အခန်း အသေးစိတ်',
        'Price / night': 'တစ်ညတာ ဈေးနှုန်း',
        'Confirm Booking Action': 'ဘွတ်ကင် လုပ်ဆောင်ချက် အတည်ပြုရန်',
        'Are you sure you want to do this booking?': 'ဤဘွတ်ကင်အတွက် လုပ်ဆောင်မှုကို အတည်ပြုပါသလား။',
        'Confirm': 'အတည်ပြုရန်',
        'Go to Payment': 'ငွေပေးချေမှုသို့ သွားရန်',
        'Print layout': 'ပုံနှိပ်မည့် ပုံစံ',
        'Page orientation': 'စာမျက်နှာ အနေအထား',
        'Landscape - best for full ledger': 'အလျားလိုက် - စာရင်းအပြည့်အတွက် သင့်တော်သည်',
        'Portrait - narrow report': 'ဒေါင်လိုက် - ကျဉ်းသော အစီရင်ခံစာ',
        'Report detail': 'အစီရင်ခံစာ အသေးစိတ်',
        'Detailed - summary and full columns': 'အသေးစိတ် - အကျဉ်းချုပ်နှင့် ကော်လံအပြည့်',
        'Compact - smaller rows for more records': 'ကျစ်လျစ် - မှတ်တမ်းများ ပိုမိုဆံ့ရန်',
        'Print now': 'ယခုပုံနှိပ်ရန်',
        'Edit User': 'အသုံးပြုသူ ပြင်ရန်',
        'Leave blank to keep current password': 'လက်ရှိစကားဝှက်ကို ထားလိုပါက ဗလာထားပါ',
        'Admin': 'စီမံခန့်ခွဲသူ',
        'Manager': 'မန်နေဂျာ',
        'Receptionist': 'ဧည့်ကြိုဝန်ထမ်း',
        'Subscriber': 'စာရင်းသွင်းသူ',
        'Active': 'အသုံးပြုနေသည်',
        'Inactive': 'အသုံးမပြုပါ',
        'Save Changes': 'ပြောင်းလဲမှုများ သိမ်းရန်',
        'Create New User': 'အသုံးပြုသူအသစ် ဖန်တီးရန်',
        'Create User': 'အသုံးပြုသူ ဖန်တီးရန်',
        'Guest payment records': 'ဧည့်သည် ငွေပေးချေမှု မှတ်တမ်းများ',
        'Select a guest to view payment records.': 'ငွေပေးချေမှု မှတ်တမ်းများကြည့်ရန် ဧည့်သည်ကို ရွေးပါ။',
        'Payment': 'ငွေပေးချေမှု',
        'Outstanding room charges': 'ပေးရန်ကျန် အခန်းခများ',
        'Room balance due': 'ပေးရန်ကျန် အခန်းလက်ကျန်',
        'Check-In': 'ဝင်ရောက်ရန်',
        'Check-Out': 'ထွက်ခွာရန်',
        'Are you sure to delete?': 'ဖျက်ရန် သေချာပါသလား။',
        'Are you sure you want to log out?': 'ထွက်ရန် သေချာပါသလား။',
        'Restoring a backup will replace the current database. Continue?': 'အရန်ဖိုင်မှ ပြန်လည်ရယူပါက လက်ရှိဒေတာဘေ့စ်ကို အစားထိုးပါမည်။ ဆက်လုပ်မလား။',
        'Reply message cannot be empty.': 'အကြောင်းပြန်စာ မဖြစ်မနေ ထည့်ရပါမည်။',
        'Delete this ticket log?': 'ဤတောင်းဆိုချက်မှတ်တမ်းကို ဖျက်မလား။',
        'Unable to load room details.': 'အခန်းအသေးစိတ် ဖွင့်၍ မရပါ။',
        'Failed to load guests for payment history.': 'ငွေပေးချေမှုမှတ်တမ်းအတွက် ဧည့်သည်များ ဖွင့်၍ မရပါ။',
        'Failed to load bookings for payment.': 'ငွေပေးချေရန် ဘွတ်ကင်များ ဖွင့်၍ မရပါ။',
        'Select a guest and load payment details before processing payment.': 'ငွေပေးချေမှု မလုပ်မီ ဧည့်သည်ရွေးပြီး ငွေပေးချေမှုအသေးစိတ်ကို ဖွင့်ပါ။',
        'The receipt could not be opened. Please allow pop-ups and try again.': 'ပြေစာကို ဖွင့်၍ မရပါ။ ပေါ့ပ်အပ်များကို ခွင့်ပြုပြီး ထပ်မံကြိုးစားပါ။',
        'Payment could not be processed because the server could not be reached.': 'ဆာဗာသို့ ဆက်သွယ်၍ မရသောကြောင့် ငွေပေးချေမှု မလုပ်ဆောင်နိုင်ပါ။',
        'Please allow pop-ups to print the income report.': 'ဝင်ငွေအစီရင်ခံစာ ပုံနှိပ်ရန် ပေါ့ပ်အပ်များကို ခွင့်ပြုပါ။',
        'Failed to load system settings.': 'စနစ်ဆက်တင်များ ဖွင့်၍ မရပါ။',
        'Failed to save settings.': 'ဆက်တင်များ သိမ်းဆည်း၍ မရပါ။',
        'Category name cannot be empty.': 'အမျိုးအစားအမည် ဗလာမဖြစ်ရပါ။',
        'Room number is required for room charges.': 'အခန်းခအတွက် အခန်းအမှတ် လိုအပ်ပါသည်။',
        'Staff name is required for staff purchases.': 'ဝန်ထမ်းဝယ်ယူမှုအတွက် ဝန်ထမ်းအမည် လိုအပ်ပါသည်။',
        'Buyer name is required for other purchases.': 'အခြားဝယ်ယူမှုအတွက် ဝယ်ယူသူအမည် လိုအပ်ပါသည်။',
        'Buyer reference is required.': 'ဝယ်ယူသူ ကိုးကားချက် လိုအပ်ပါသည်။',
        'Delete category': 'အမျိုးအစား ဖျက်ရန်',
        'Items in this category will be moved to Uncategorized.': 'ဤအမျိုးအစားရှိ ပစ္စည်းများကို အမျိုးအစားမသတ်မှတ်ထားသို့ ရွှေ့ပါမည်။',
        'Failed to load user details.': 'အသုံးပြုသူ အသေးစိတ် ဖွင့်၍ မရပါ။',
        'Failed to delete user.': 'အသုံးပြုသူ ဖျက်၍ မရပါ။',
        'Failed to create user.': 'အသုံးပြုသူ ဖန်တီး၍ မရပါ။',
        'Failed to update user.': 'အသုံးပြုသူ ပြင်ဆင်၍ မရပါ။',
        'Food Order Modal Opened': 'အစားအသောက် မှာယူမှုပုံစံ ဖွင့်ပြီးပါပြီ',
        'Restaurant & Room Dining Menu': 'စားသောက်ဆိုင်နှင့် အခန်းတွင်း စားသောက်မှု မီနူး',
        'New Food Order': 'အစားအသောက် အသစ်မှာရန်',
        'Continental Breakfast': 'အနောက်တိုင်း နံနက်စာ',
        'Grilled Ribeye Steak': 'မီးကင် ရစ်ဘိုင်အသားကင်',
        'Seafood Fettuccine': 'ပင်လယ်စာ ဖက်တူချီနီ',
        'Juice & Beverage Bar': 'ဖျော်ရည်နှင့် အဖျော်ယမကာ',
        'Booking & Reservations': 'ဘွတ်ကင်နှင့် ကြိုတင်မှာယူမှုများ',
        'Food & Restaurant Services': 'အစားအသောက်နှင့် စားသောက်ဆိုင် ဝန်ဆောင်မှုများ',
        'Juice & Beverage Bar': 'ဖျော်ရည်နှင့် အဖျော်ယမကာ',
        'In-Room Minibar Management': 'အခန်းတွင်း မီနီဘား စီမံခန့်ခွဲမှု',
        'Contact & Support Center': 'ဆက်သွယ်ရန်နှင့် အကူအညီဌာန',
        'Summary & Reports': 'အကျဉ်းချုပ်နှင့် အစီရင်ခံစာများ',
        'User Management': 'အသုံးပြုသူ စီမံခန့်ခွဲမှု',
        'Available rooms only': 'လွတ်နေသောအခန်းများသာ',
        'Show all rooms': 'အခန်းအားလုံး ပြရန်',
        'Pending': 'စောင့်ဆိုင်းနေသည်',
        'Checked-In': 'ဝင်ရောက်ပြီး',
        'Checked-Out': 'ထွက်ခွာပြီး',
        'Cancelled': 'ပယ်ဖျက်ပြီး',
        'Paid': 'ပေးချေပြီး',
        'Refunded': 'ပြန်အမ်းပြီး',
        'New': 'အသစ်',
        'Replied': 'အကြောင်းပြန်ပြီး',
        'Closed': 'ပိတ်ပြီး',
        'Charge Item': 'ပစ္စည်းခ သွင်းရန်',
        'Add New Minibar Item': 'မီနီဘား ပစ္စည်းအသစ် ထည့်ရန်',
        'Edit Minibar Item': 'မီနီဘား ပစ္စည်း ပြင်ရန်',
        'Demo users:': 'စမ်းသပ်အသုံးပြုသူများ:',
        'Floor': 'အထပ်',
        'Stock Level': 'လက်ကျန်အရေအတွက်',
        'Select category': 'အမျိုးအစား ရွေးပါ',
        'Close': 'ပိတ်ရန်',
        'Email': 'အီးမေးလ်',
        'Password': 'စကားဝှက်'
    };
    const reverseTranslations = Object.keys(translations).reduce(function(result, english) {
        result[translations[english]] = english;
        return result;
    }, {});

    let language = 'en';

    function translate(value) {
        if (typeof value !== 'string') {
            return value;
        }
        const dictionary = language === 'my' ? translations : reverseTranslations;
        const leading = value.match(/^\s*/)[0];
        const trailing = value.match(/\s*$/)[0];
        const text = value.trim();
        const count = text.match(/^([\d,]+)\s+(balance|balances|entry|entries|item|items)$/);
        if (count && language === 'my') {
            const label = count[2] === 'balance' || count[2] === 'balances' ? 'balances' :
                (count[2] === 'entry' || count[2] === 'entries' ? 'entries' : count[2]);
            return leading + count[1] + ' ' + translations[label] + trailing;
        }
        const bookingAction = text.match(/^Are you sure you want to (.+) this booking\?$/);
        if (language === 'my' && bookingAction) {
            return leading + 'ဤဘွတ်ကင်ကို ' + (translations[bookingAction[1]] || bookingAction[1]) + ' လုပ်ရန် သေချာပါသလား။' + trailing;
        }
        const deleteUser = text.match(/^Are you sure you want to delete (.+)\?$/);
        if (language === 'my' && deleteUser) {
            return leading + deleteUser[1] + ' ကို ဖျက်ရန် သေချာပါသလား။' + trailing;
        }
        if (language === 'my' && text.startsWith('Delete category ')) {
            return leading + text.replace(/^Delete category /, 'အမျိုးအစား ').replace(/\? Items in this category will be moved to Uncategorized\.$/, ' ကို ဖျက်မလား။ ဤအမျိုးအစားရှိ ပစ္စည်းများကို အမျိုးအစားမသတ်မှတ်ထားသို့ ရွှေ့ပါမည်။') + trailing;
        }
        const notificationTitle = text.match(/^New booking #(\d+)$/);
        if (language === 'my' && notificationTitle) {
            return leading + 'ဘွတ်ကင်အသစ် #' + notificationTitle[1] + trailing;
        }
        if (language === 'my' && text === 'Overdue check-out') {
            return leading + 'သက်တမ်းကျော်လွန်သော ထွက်ခွာရက်' + trailing;
        }
        if (language === 'my' && text === 'New guest message') {
            return leading + 'ဧည့်သည်စာတိုအသစ်' + trailing;
        }
        if (language === 'my' && text === 'Outstanding payment') {
            return leading + 'ပေးရန်ကျန် ငွေပေးချေမှု' + trailing;
        }
        if (language === 'my' && text === 'Outstanding minibar balance') {
            return leading + 'ပေးရန်ကျန် မီနီဘားလက်ကျန်' + trailing;
        }
        const guestRoomMessage = text.match(/^(.+) - Room (.+)$/);
        if (language === 'my' && guestRoomMessage) {
            return leading + guestRoomMessage[1] + ' - အခန်း ' + guestRoomMessage[2] + trailing;
        }
        const roomSupportMessage = text.match(/^Room (.+) - (.+)$/);
        if (language === 'my' && roomSupportMessage) {
            return leading + 'အခန်း ' + roomSupportMessage[1] + ' - ' + (translations[roomSupportMessage[2]] || roomSupportMessage[2]) + trailing;
        }
        const overdueCheckoutMessage = text.match(/^(.+) - Room (.+) - Check-out date (.+)$/);
        if (language === 'my' && overdueCheckoutMessage) {
            return leading + overdueCheckoutMessage[1] + ' - အခန်း ' + overdueCheckoutMessage[2] + ' - ထွက်ခွာရက် ' + overdueCheckoutMessage[3] + trailing;
        }
        const minibarOutstandingMessage = text.match(/^(.+) - Room (.+) - ([\d,]+\.?\d*) Ks outstanding$/);
        if (language === 'my' && minibarOutstandingMessage) {
            return leading + minibarOutstandingMessage[1] + ' - အခန်း ' + minibarOutstandingMessage[2] + ' - ' + minibarOutstandingMessage[3] + ' ကျပ် ပေးရန်ကျန်' + trailing;
        }
        return Object.prototype.hasOwnProperty.call(dictionary, text)
            ? leading + dictionary[text] + trailing
            : value;
    }

    function translateNode(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            const translatedText = translate(node.nodeValue);
            if (translatedText !== node.nodeValue) {
                node.nodeValue = translatedText;
            }
            return;
        }
        if (node.nodeType !== Node.ELEMENT_NODE) {
            return;
        }

        ['placeholder', 'title', 'aria-label', 'alt'].forEach(function(attribute) {
            if (node.hasAttribute(attribute)) {
                const value = node.getAttribute(attribute);
                const translatedValue = translate(value);
                if (translatedValue !== value) {
                    node.setAttribute(attribute, translatedValue);
                }
            }
        });
        if (node.matches('input[type="button"], input[type="submit"], input[type="reset"]') && node.hasAttribute('value')) {
            const value = node.value;
            const translatedValue = translate(value);
            if (translatedValue !== value) {
                node.value = translatedValue;
            }
        }
        node.childNodes.forEach(translateNode);
    }

    function applyLanguage(nextLanguage) {
        language = nextLanguage === 'my' ? 'my' : 'en';
        document.documentElement.lang = language === 'my' ? 'my' : 'en';
        translateNode(document.body);
        const titleParts = document.title.split(' - ');
        const titleSuffix = titleParts[titleParts.length - 1];
        if (titleParts.length > 1 && ['Hotel Management System', 'ဟိုတယ် စီမံခန့်ခွဲမှု စနစ်'].includes(titleSuffix)) {
            titleParts[titleParts.length - 1] = language === 'my' ? 'ဟိုတယ် စီမံခန့်ခွဲမှု စနစ်' : 'Hotel Management System';
            document.title = titleParts.join(' - ');
        } else {
            document.title = translate(document.title);
        }

        const languageSelect = document.getElementById('appLanguage');
        if (languageSelect) {
            languageSelect.value = language;
        }
        window.dispatchEvent(new CustomEvent('hotelLanguageChanged', {detail: {language: language}}));
    }

    window.hotelTranslate = translate;
    window.hotelTranslateEnglish = function(value) {
        if (typeof value !== 'string') {
            return value;
        }
        const leading = value.match(/^\s*/)[0];
        const trailing = value.match(/\s*$/)[0];
        const text = value.trim();
        return leading + (Object.prototype.hasOwnProperty.call(reverseTranslations, text) ? reverseTranslations[text] : text) + trailing;
    };
    window.setHotelLanguage = function(nextLanguage) {
        const selectedLanguage = nextLanguage === 'my' ? 'my' : 'en';
        try {
            localStorage.setItem(storageKey, selectedLanguage);
        } catch (error) {
            console.error('Unable to save the language preference in browser storage.', error);
            if (typeof window.showAppToast === 'function') {
                window.showAppToast(translate('The language could not be saved in this browser.'));
            }
        }
        applyLanguage(selectedLanguage);
    };

    const nativeAlert = window.alert.bind(window);
    const nativeConfirm = window.confirm.bind(window);
    window.alert = function(message) {
        nativeAlert(translate(String(message)));
    };
    window.confirm = function(message) {
        return nativeConfirm(translate(String(message)));
    };

    let savedLanguage = 'en';
    try {
        savedLanguage = localStorage.getItem(storageKey) || 'en';
    } catch (error) {
        console.error('Unable to read the language preference from browser storage.', error);
    }
    applyLanguage(savedLanguage);

    document.addEventListener('change', function(event) {
        if (event.target && event.target.id === 'appLanguage') {
            window.setHotelLanguage(event.target.value);
        }
    });

    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'characterData') {
                translateNode(mutation.target);
            } else {
                mutation.addedNodes.forEach(translateNode);
            }
        });
    });
    observer.observe(document.body, { childList: true, characterData: true, subtree: true });
})();
