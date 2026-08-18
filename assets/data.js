/* ═══════════════════════════════════════════════
   JATIS FMCG Cloud — Mock Data (Demo)
   Konteks: tenant demo "PT Makanan Nusantara"
   ═══════════════════════════════════════════════ */
window.DATA = {
  tenant: {
    name: 'PT Makanan Nusantara',
    plan: 'FMCG Growth',
    planTier: 'growth',
    email: 'admin@makanannusantara.co.id',
    wa: '+62 812-3456-7890',
    quota: { total: 500000, used: 340000 },
    credit: 4200000,
  },
  user: { name: 'Budi Santoso', role: 'Company Admin', email: 'budi@makanannusantara.co.id' },

  kpis: [
    { label: 'Pesan Bulan Ini', ico: '💬', val: 340000, format: 'num', delta: '+12,4%', dir: 'up', kg: 'rgba(16,185,129,.14)' },
    { label: 'Bot Percakapan', ico: '🤖', val: 42850, format: 'num', delta: '+18,2%', dir: 'up', kg: 'rgba(139,92,246,.14)' },
    { label: 'OTP Terverifikasi', ico: '🔐', val: 12680, format: 'num', delta: '+6,1%', dir: 'up', kg: 'rgba(6,182,212,.14)' },
    { label: 'Kampanye Aktif', ico: '📣', val: 6, format: 'num', delta: '2 selesai hari ini', dir: 'up', kg: 'rgba(245,158,11,.14)' },
  ],

  volume: [42, 48, 45, 52, 58, 54, 61, 66, 63, 70, 74, 69, 78, 82, 79, 85, 88, 84, 92, 96, 90, 98, 104, 101, 108, 112, 107, 116, 121, 118],
  otpSeries: [3.1, 3.4, 3.2, 3.8, 4.0, 3.7, 4.3, 4.6, 4.4, 5.0, 5.2, 4.9, 5.5],

  donut: [
    { label: 'WhatsApp', val: 68, color: '#25d366' },
    { label: 'SMS', val: 22, color: '#3b82f6' },
    { label: 'Email', val: 10, color: '#8b5cf6' },
  ],

  channels: [
    { id: 'wa', name: 'WhatsApp Business', logo: '💬', cls: 'ch-wa', status: 'active', statusTxt: 'Aktif', phone: '+62 812-3456-7890', meta: 'Template: 12 approved · 2 review', stats: [['231.200', 'Pesan'], ['98,2%', 'Deliver'], ['1,2 s', 'Latensi']] },
    { id: 'sms', name: 'SMS OTP Gateway', logo: '📱', cls: 'ch-sms', status: 'active', statusTxt: 'Aktif', phone: 'Sender ID: MKN-NUS', meta: 'Provider: Telkomsel · Indosat', stats: [['74.800', 'SMS'], ['99,1%', 'Deliver'], ['2,4 s', 'Latensi']] },
    { id: 'email', name: 'Email Broadcast', logo: '📧', cls: 'ch-em', status: 'error', statusTxt: 'Perlu Perhatian', phone: 'no-reply@mkn.co.id', meta: 'SPF/DKIM valid · bounce 4,2%', stats: [['34.000', 'Email'], ['89,3%', 'Deliver'], ['4,8%', 'Bounce']] },
  ],

  templates: [
    ['stock_check', 'Cek Stok — realtime', 'Approved', 'ok'],
    ['price_check', 'Cek Harga — per volume', 'Approved', 'ok'],
    ['order_confirmation', 'Konfirmasi Pesanan', 'Approved', 'ok'],
    ['promo_ramadhan', 'Promo Ramadhan 2026', 'Pending review', 'warn'],
    ['claim_otp', 'Kode OTP Klaim Insentif', 'Pending review', 'warn'],
  ],

  activities: [
    { ico: '📦', txt: 'Pesanan #ORD-88321 dikonfirmasi — Distributor Jaya Abadi', t: '2 menit lalu' },
    { ico: '🤖', txt: 'Bot menjawab 1.240 percakapan cek stok', t: '28 menit lalu' },
    { ico: '🔐', txt: 'OTP klaim insentif terverifikasi — Warung Sumber Rejeki', t: '1 jam lalu' },
    { ico: '📣', txt: 'Kampanye "Promo Lebaran Gelombang 2" selesai · 24.500 terkirim', t: '3 jam lalu' },
    { ico: '🛡️', txt: '2 konten di-hold moderasi (L2 review)', t: '4 jam lalu' },
    { ico: '📉', txt: 'Bounce rate email naik 4,8% — cek daftar tidak valid', t: '5 jam lalu' },
  ],

  healthChannels: [
    { name: 'WhatsApp Business', val: 98.2, color: '#25d366', txt: 'Deliver 98,2%' },
    { name: 'SMS Gateway', val: 99.1, color: '#3b82f6', txt: 'Deliver 99,1%' },
    { name: 'Email', val: 89.3, color: '#8b5cf6', txt: 'Deliver 89,3%' },
    { name: 'AI Chatbot', val: 97.4, color: '#10b981', txt: 'Uptime 97,4%' },
    { name: 'ERP Integration', val: 92.0, color: '#f59e0b', txt: 'Uptime 92,0%' },
  ],

  conversations: [
    { id: 'c1', name: 'Bu Ratna', phone: '+62 813-XX', avatar: 'BR', type: 'Retailer · Warung Sumber Rejeki', unread: 2, time: '12:04', last: 'Kak, klaim bonus bulan ini bisa dibantu?', context: [['Member', 'LTY-00241'], ['Poin', '1.280'], ['Order', '23x bulan ini'], ['Wilayah', 'Bekasi']], thread: [
      { d: 'in', m: 'Kak, klaim bonus bulan ini bisa dibantu? 🙏' },
      { d: 'out', m: 'Bisa Bu! Saya cek dulu status pencapaiannya ya…' },
      { d: 'in', m: 'Siap kak, makasih' },
      { d: 'out', m: '✅ Pencapaian volume Anda 108% dari target. Klaim Rp 850.000 bisa diproses. Mohon konfirmasi kode OTP yang kami kirim ke WhatsApp Anda.', tag: 'bot' },
      { d: 'in', m: 'Kode OTP: 482913' },
    ]},
    { id: 'c2', name: 'Distributor Jaya Abadi', phone: '+62 811-XX', avatar: 'JA', type: 'Distributor · Jakarta', unread: 1, time: '11:32', last: 'Untuk pesanan 100 dus tadi, bisa sekalian ongkir dihitung?', context: [['Distributor', 'DST-0011'], ['Region', 'Jakarta'], ['Order Aktif', '3'], ['Saldo', 'Rp 12,4 jt']], thread: [
      { d: 'in', m: 'Untuk pesanan 100 dus tadi, bisa sekalian ongkir dihitung?' },
      { d: 'out', m: 'Bisa. Ongkir ke Gudang Jaya Abadi (Cakung): Rp 850.000. Mau kami tambahkan ke #ORD-88321?', tag: 'bot' },
    ]},
    { id: 'c3', name: 'Konsumen: Dina', phone: '+62 856-XX', avatar: 'DN', type: 'Konsumen · Jakarta Selatan', unread: 3, time: '10:58', last: 'Kok pesanan saya belum sampai? Ini sudah 3 hari 😢', context: [['Order', '#ORD-87990'], ['Status', 'Dikirim'], ['Kurir', 'J&T · JX-88213'], ['Metode', 'COD']], thread: [
      { d: 'in', m: 'Kok pesanan saya belum sampai? Ini sudah 3 hari 😢' },
      { d: 'out', m: 'Mohon maaf atas keterlambatannya 🙏 Saya lacak ya kak.' },
    ]},
    { id: 'c4', name: 'Toko Kelontong Bahagia', phone: '+62 822-XX', avatar: 'TK', type: 'Retailer · Depok', unread: 0, time: '09:41', last: 'Ok kak, nanti sore saya transfer', context: [['Member', 'LTY-00311'], ['Poin', '640'], ['Wilayah', 'Depok']], thread: [
      { d: 'in', m: 'Ok kak, nanti sore saya transfer' },
      { d: 'out', m: 'Baik, pesanan kami proses setelah pembayaran dikonfirmasi 👍' },
    ]},
    { id: 'c5', name: 'Distributor Sinar Mas Food', phone: '+62 815-XX', avatar: 'SM', type: 'Distributor · Bandung', unread: 1, time: '08:15', last: 'Harga Indomie naik? Kok beda dari minggu lalu', context: [['Distributor', 'DST-0023'], ['Region', 'Bandung'], ['Histori Harga', '3x ubah 30 hari']], thread: [
      { d: 'in', m: 'Harga Indomie naik? Kok beda dari minggu lalu' },
    ]},
  ],

  otpLog: [
    { ico: '✅', name: 'Warung Sumber Rejeki', phone: '+62 813-…-9012', purpose: 'Klaim insentif', status: 'ok', st: 'Terverifikasi', t: '1 jam lalu' },
    { ico: '✅', name: 'Toko Kelontong Bahagia', phone: '+62 822-…-4433', purpose: 'Login portal', status: 'ok', st: 'Terverifikasi', t: '3 jam lalu' },
    { ico: '🔄', name: 'Distributor Jaya Abadi', phone: '+62 811-…-7788', purpose: 'Konfirmasi order', status: 'warn', st: 'Resend (2x)', t: '5 jam lalu' },
    { ico: '⛔', name: '+62 877-…-1122', phone: '-', purpose: 'Login', status: 'err', st: 'Diblokir (5x gagal)', t: '7 jam lalu' },
    { ico: '✅', name: 'Kios Pak Herman', phone: '+62 812-…-3456', purpose: 'Tukar poin', status: 'ok', st: 'Terverifikasi', t: 'kemarin' },
  ],

  loyaltyKpi: [
    { label: 'Member Aktif', ico: '👥', val: 4820, format: 'num', delta: '+214 minggu ini', dir: 'up' },
    { label: 'Poin Beredar', ico: '⭐', val: 1284000, format: 'num', delta: '+3,1%', dir: 'up' },
    { label: 'Klaim Bulan Ini', ico: '🧾', val: 342, format: 'num', delta: 'Rp 96,4 jt dibayarkan', dir: 'up' },
  ],

  claims: [
    { id: 'CLM-8841', member: 'Warung Sumber Rejeki', region: 'Bekasi', type: 'Bonus Volume', amount: 'Rp 850.000', status: 'Pending', otp: '✓ OTP verified', achievement: '108% target' },
    { id: 'CLM-8840', member: 'Toko Kelontong Bahagia', region: 'Depok', type: 'Cashback Q2', amount: 'Rp 410.000', status: 'Pending', otp: '✓ OTP verified', achievement: '92% target' },
    { id: 'CLM-8839', member: 'Kios Pak Herman', region: 'Tangerang', type: 'Tukar Poin', amount: '64.000 poin', status: 'Review', otp: '⚠ anomaly — klaim 3x/hari', achievement: 'Flag fraud engine' },
    { id: 'CLM-8838', member: 'Warung Bu Ani', region: 'Jakarta Timur', type: 'Bonus Volume', amount: 'Rp 320.000', status: 'Approved', otp: '✓ OTP verified', achievement: '101% target' },
    { id: 'CLM-8837', member: 'Toko Berkah Jaya', region: 'Bogor', type: 'Cashback Q2', amount: 'Rp 275.000', status: 'Paid', otp: '✓ OTP verified', achievement: '96% target' },
  ],

  members: [
    { name: 'Warung Sumber Rejeki', id: 'LTY-00241', region: 'Bekasi', poin: 1280, order: 23, tier: 'Gold' },
    { name: 'Toko Kelontong Bahagia', id: 'LTY-00311', region: 'Depok', poin: 640, order: 17, tier: 'Silver' },
    { name: 'Kios Pak Herman', id: 'LTY-00520', region: 'Tangerang', poin: 210, order: 9, tier: 'Silver' },
    { name: 'Warung Bu Ani', id: 'LTY-00198', region: 'Jakarta Timur', poin: 1520, order: 28, tier: 'Gold' },
    { name: 'Toko Berkah Jaya', id: 'LTY-00387', region: 'Bogor', poin: 940, order: 19, tier: 'Gold' },
  ],

  campaigns: [
    { id: 'CMP-2026-014', name: 'Promo Lebaran Gelombang 2', channel: 'WhatsApp', icon: '🌙', recipients: 24500, sent: 24500, delivered: 24110, replied: 3821, optout: 112, status: 'done', statusTxt: 'Selesai', pct: 100 },
    { id: 'CMP-2026-015', name: 'Launching Produk Baru: Mi Sedaap Goreng', channel: 'WhatsApp + SMS', icon: '🚀', recipients: 50000, sent: 32100, delivered: 31400, replied: 5210, optout: 84, status: 'sending', statusTxt: 'Mengirim…', pct: 64 },
    { id: 'CMP-2026-016', name: 'Info Harga Juli — Semua Distributor', channel: 'SMS', icon: '🏷️', recipients: 12300, sent: 0, delivered: 0, replied: 0, optout: 0, status: 'approved', statusTxt: 'Menunggu jadwal', pct: 0 },
    { id: 'CMP-2026-017', name: 'Ucapan Idul Adha — Konsumen', channel: 'WhatsApp', icon: '🎉', recipients: 64000, sent: 0, delivered: 0, replied: 0, optout: 0, status: 'review', statusTxt: 'Menunggu approval', pct: 0 },
    { id: 'CMP-2026-013', name: 'Promo Lebaran Gelombang 1', channel: 'WhatsApp', icon: '🌙', recipients: 21000, sent: 21000, delivered: 20580, replied: 2900, optout: 98, status: 'done', statusTxt: 'Selesai', pct: 100 },
  ],

  campaignPerf: {
    labels: ['Gel 1', 'Gel 2', 'Launching', 'Info Harga', 'Idul Adha'],
    delivery: [98.0, 98.4, 97.8, 0, 0],
    reply: [13.8, 15.6, 16.2, 0, 0],
  },

  csMetrics: {
    labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
    handled: [420, 460, 438, 512, 548, 610, 380],
    bot: [290, 320, 301, 365, 392, 448, 265],
  },

  costData: [
    { label: 'WhatsApp', val: 38.4 },
    { label: 'SMS OTP', val: 21.2 },
    { label: 'AI Chatbot', val: 16.8 },
    { label: 'Email', val: 6.1 },
    { label: 'Integrasi', val: 4.5 },
  ],

  usage: [
    { label: 'WhatsApp Outbound', used: 231200, total: 300000, unit: 'pesan' },
    { label: 'SMS OTP', used: 74800, total: 100000, unit: 'pesan' },
    { label: 'AI Conversation', used: 42850, total: 75000, unit: 'percakapan' },
    { label: 'Email', used: 34000, total: 60000, unit: 'email' },
  ],

  invoices: [
    { id: 'INV-2026-08', period: 'Agustus 2026', amount: 'Rp 12.850.000', status: 'Paid', statusCls: 'lg-ok', date: '1 Agu 2026' },
    { id: 'INV-2026-07', period: 'Juli 2026', amount: 'Rp 11.720.000', status: 'Paid', statusCls: 'lg-ok', date: '1 Jul 2026' },
    { id: 'INV-2026-06', period: 'Juni 2026', amount: 'Rp 10.450.000', status: 'Paid', statusCls: 'lg-ok', date: '1 Jun 2026' },
  ],

  safetySummary: [
    { lvl: 'L1', cls: 'lvl-l1', label: 'Flag Review', val: 14 },
    { lvl: 'L2', cls: 'lvl-l2', label: 'Manual Review', val: 2 },
    { lvl: 'L3', cls: 'lvl-l3', label: 'Block Otomatis', val: 3 },
    { lvl: 'L4', cls: 'lvl-l4', label: 'Suspend Review', val: 0 },
  ],

  safetyQueue: [
    { id: 'SQ-441', cat: 'Hoaks / klaim tidak berdasar', sev: 'L2', sevCls: 'lvl-l2', content: '"Mi ini menyembuhkan maag dalam 3 hari!" — template kampanye distributor', meta: 'Template: promosi_produk · diajukan 4 jam lalu', actions: ['approve', 'block'] },
    { id: 'SQ-440', cat: 'Penipuan / phishing', sev: 'L3', sevCls: 'lvl-l3', content: 'Broadcast berisi link "klaim hadiah" mencurigakan (bit.ly/xxx)', meta: 'Kampanye CMP-2026-017 · diajukan 2 jam lalu', actions: ['block'] },
    { id: 'SQ-439', cat: 'Konten promosi berlebihan (spam)', sev: 'L1', sevCls: 'lvl-l1', content: 'Pesan berantai promo ke 40+ nomor dalam 1 menit', meta: 'Channel WhatsApp · 1 jam lalu', actions: ['approve', 'block'] },
    { id: 'SQ-438', cat: 'Klaim produk tidak berdasar', sev: 'L2', sevCls: 'lvl-l2', content: '"Turunkan gula darah instan" — klaim produk tanpa izin BPOM', meta: 'Template: produk_baru · diajukan 6 jam lalu', actions: ['approve', 'block'] },
  ],

  adminKpi: [
    { label: 'Total Tenant', ico: '🏢', val: 23, format: 'num', delta: '+3 bulan ini', dir: 'up' },
    { label: 'Pesan (Agregat)', ico: '💬', val: 92, format: 'juta', delta: '+8,1% vs bulan lalu', dir: 'up' },
    { label: 'MRR', ico: '💰', val: 4.8, format: 'miliar', delta: '+12%', dir: 'up' },
    { label: 'Alert Terbuka', ico: '🚨', val: 3, format: 'num', delta: '2 payment overdue', dir: 'down' },
  ],

  tenants: [
    ['PT Beras Nusantara', 'Enterprise', 'Aktif', 98, '12,4 jt', 'ok'],
    ['PT Minuman Segar Tbk', 'Growth', 'Aktif', 84, '8,9 jt', 'ok'],
    ['PT Snack Lezat', 'Growth', 'Aktif', 76, '7,2 jt', 'ok'],
    ['PT Kopi Nusantara', 'Starter', 'Trial', 41, '1,2 jt', 'warn'],
    ['PT Mie Makmur', 'Enterprise', 'Aktif', 92, '15,8 jt', 'ok'],
    ['PT Cokelat Manis', 'Starter', 'Overdue', 0, 'Rp 0', 'err'],
  ],

  fraud: [
    { ico: '⚠️', txt: 'Anomali klaim — 3 klaim/hari dari 1 nomor (Kios Pak Herman)', st: 'Review', cls: 'ab-rev' },
    { ico: '🚫', txt: 'OTP brute-force terdeteksi — 5x gagal dari +62 877-…-1122', st: 'Diblokir', cls: 'ab-no' },
    { ico: '✅', txt: 'Pola payout ganda terverifikasi aman — distributor Sinar Mas', st: 'Bersih', cls: 'ab-ok' },
  ],

  team: [
    { name: 'Budi Santoso', email: 'budi@makanannusantara.co.id', role: 'Company Admin' },
    { name: 'Sari Wulandari', email: 'sari@makanannusantara.co.id', role: 'Campaign Manager' },
    { name: 'Andi Pratama', email: 'andi@makanannusantara.co.id', role: 'Chatbot Builder' },
    { name: 'Rina Kartika', email: 'rina@makanannusantara.co.id', role: 'Sales / Trade Admin' },
    { name: 'Joko Susilo', email: 'joko@makanannusantara.co.id', role: 'CS Agent' },
  ],

  apiKeys: [
    { name: 'ERP Production', key: 'jmk_live_9f2c…a41b', scope: 'pesan · order · katalog' },
    { name: 'Loyalty Service', key: 'jmk_live_71ad…c02e', scope: 'member · klaim · poin' },
    { name: 'Sandbox Testing', key: 'jmk_test_3b88…f91d', scope: 'semua (sandbox)' },
  ],

  webhooks: [
    { ev: 'message.inbound', url: 'https://erp.mkn.co.id/hooks/wa' },
    { ev: 'order.updated', url: 'https://wms.mkn.co.id/webhook/jatis' },
    { ev: 'delivery.status', url: 'https://crm.mkn.co.id/jatis/callback' },
  ],

  kbItems: [
    { ico: '📄', name: 'Katalog_Produk_Q3_2026.pdf', type: 'PDF · 4,2 MB', stat: '1.240 chunks · deployed' },
    { ico: '🧾', name: 'FAQ_Retailer_Program.docx', type: 'DOCX · 1,1 MB', stat: '310 chunks · deployed' },
    { ico: '📊', name: 'Daftar_Harga_Distributor.csv', type: 'CSV · 890 KB', stat: 'sync ERP · live' },
    { ico: '🌐', name: 'Halaman_Produk_mkn.co.id', type: 'URL · 6 halaman', stat: 'crawl harian · deployed' },
  ],

  features: [
    { tag: 'Modul Inti', ico: '📡', glow: 'rgba(16,185,129,.12)', title: 'Channel Management', desc: 'Koneksikan WhatsApp Business, SMS, dan Email dalam hitungan menit dengan verifikasi QR.' },
    { tag: 'AI', ico: '🤖', glow: 'rgba(139,92,246,.12)', title: 'AI Chatbot Studio', desc: 'Bangun alur percakapan tanpa coding. Jawaban grounded dari knowledge base — tidak mengarang.' },
    { tag: 'B2B', ico: '📦', glow: 'rgba(6,182,212,.12)', title: 'Sales Interactive Messaging', desc: 'Bot cek stok, cek harga, dan ajukan pesanan — terintegrasi ERP/WMS real-time.' },
    { tag: 'Jualan', ico: '🛒', glow: 'rgba(245,158,11,.12)', title: 'Chat Commerce', desc: 'Konsumen belanja langsung dari chat: katalog, keranjang, pembayaran, sampai tracking.' },
    { tag: 'Jangkauan', ico: '📣', glow: 'rgba(16,185,129,.12)', title: 'Broadcast Kampanye', desc: 'Segmen presisi, personalisasi per kontak, approval flow, dan moderasi sebelum kirim.' },
    { tag: 'Keamanan', ico: '🔐', glow: 'rgba(59,130,246,.12)', title: 'OTP & Verifikasi', desc: 'SMS OTP & WhatsApp OTP dengan rate limit, anti-brute-force, dan audit lengkap.' },
    { tag: 'Loyalitas', ico: '🏆', glow: 'rgba(139,92,246,.12)', title: 'Loyalty & Trade Program', desc: 'Insentif retailer & warung yang aman: klaim terverifikasi, anti-fraud, payout teraudit.' },
    { tag: 'CS', ico: '🎧', glow: 'rgba(6,182,212,.12)', title: 'Agent Inbox 24/7', desc: 'Semua percakapan satu tempat dengan konteks lengkap — pelanggan tak perlu mengulang cerita.' },
    { tag: 'Keputusan', ico: '📈', glow: 'rgba(16,185,129,.12)', title: 'Analytics Real-time', desc: 'Volume, kampanye, CS, biaya per pesan — semua terukur dan bisa diekspor.' },
    { tag: 'Integrasi', ico: '🔗', glow: 'rgba(245,158,11,.12)', title: 'ERP / WMS / CRM', desc: 'API & webhook standar, atau CSV. Stok, harga, dan pesanan jadi real-time.' },
    { tag: 'Kepatuhan', ico: '🛡️', glow: 'rgba(59,130,246,.12)', title: 'Content Safety', desc: 'Moderasi L0–L4 sebelum broadcast: spam, scam, hoaks, dan konten ilegal diblokir.' },
    { tag: 'Skala', ico: '☁️', glow: 'rgba(139,92,246,.12)', title: 'Data Residency Indonesia', desc: 'ISO 27001, MFA, audit trail append-only. Data Anda di Indonesia, sesuai regulasi PDP.' },
  ],

  pricing: [
    { name: 'FMCG Starter', tagline: 'Distributor Enablement', monthly: 1490000, annual: 1190000, popular: false, feats: ['1 nomor WhatsApp + SMS', '100.000 pesan / bulan', 'Chatbot: template + alur dasar', 'Cek stok & harga (1 integrasi ERP)', '3 agent inbox', 'Broadcast 10.000 / kampanye', 'Support 8x5'] },
    { name: 'FMCG Growth', tagline: 'Consumer Engagement', monthly: 4900000, annual: 3920000, popular: true, feats: ['2 nomor WhatsApp + SMS + Email', '500.000 pesan / bulan', 'Full Chatbot Studio + knowledge base', 'Chat Commerce penuh', '10 agent inbox · SLA 24x7', 'Broadcast 100.000 / kampanye', 'OTP 25.000 / bulan', 'Laporan & ekspor lanjutan'] },
    { name: 'Enterprise', tagline: 'Loyalty & Trade Program', monthly: 0, annual: 0, custom: true, popular: false, feats: ['Unlimited nomor & kanal', 'Volume custom (usage-based)', 'Loyalty & Trade penuh + OTP unlimited', 'Integration Hub + sandbox API', 'Dedicated CSM · SLA API', 'A/B test & custom model AI', 'Data residency & audit enterprise', 'Data retention 24+ bulan'] },
  ],

  scenarios: [
    { n: 'A', title: 'Distributor Enablement', icon: '🏭', desc: 'Bot cek stok & harga real-time, pemesanan terintegrasi ERP, notifikasi promo per wilayah.', tags: ['cek stok', 'cek harga', 'order B2B', 'ERP/WMS'], impact: 'Pemesanan 4x lebih cepat' },
    { n: 'B', title: 'Consumer Engagement', icon: '🧑', desc: 'AI chatbot edukasi produk, promo personal, chat commerce, dan CS 24/7 di WhatsApp.', tags: ['AI chatbot', 'promo', 'chat commerce', 'CS 24/7'], impact: 'Engagement +38% · CS cost −60%' },
    { n: 'C', title: 'Loyalty & Trade Program', icon: '🏪', desc: 'Insentif retailer yang aman: OTP, klaim teraudit, notifikasi tiap transaksi, anti-fraud.', tags: ['OTP', 'klaim', 'poin', 'anti-fraud'], impact: 'Fraud −70% · partisipasi naik' },
  ],
};
