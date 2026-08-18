/* ═══════════════════════════════════════════════
   JATIS FMCG Cloud — Application Logic
   ═══════════════════════════════════════════════ */
const App = (() => {
  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);
  const D = window.DATA;
  const state = { session: null, view: 'dashboard', authMode: 'login', cwStep: 1, cwData: {}, botConversation: [], inboxSelected: null, safetyHandled: {} };

  const fmt = {
    num: v => new Intl.NumberFormat('id-ID').format(v),
    rupiah: v => 'Rp ' + new Intl.NumberFormat('id-ID').format(v),
    juta: v => (v / 1000000).toFixed(1).replace('.', ',') + ' jt',
    milliard: v => 'Rp ' + (v / 1000000000).toFixed(1).replace('.', ',') + ' M',
  };

  /* ───────── Toast ───────── */
  function toast(msg, type = 'success') {
    const root = $('#toast-root');
    const el = document.createElement('div');
    const icon = type === 'success' ? '✅' : type === 'error' ? '⛔' : '💡';
    el.className = `toast t-${type}`;
    el.innerHTML = `<span class="t-ico">${icon}</span><span>${msg}</span>`;
    root.appendChild(el);
    setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 320); }, 3600);
  }

  /* ───────── Router ───────── */
  function go(target, params = {}) {
    if (target === 'auth' && params.mode) { state.authMode = params.mode; }
    if (target === 'landing' || target === 'auth') {
      if (state.session) target = 'dashboard';
    }
    if (target === 'landing') { $('#landing').hidden = false; $('#auth').hidden = true; $('#portal').hidden = true; window.scrollTo(0, 0); }
    else if (target === 'auth') {
      if (state.session) return go('dashboard');
      $('#landing').hidden = true; $('#auth').hidden = false; $('#portal').hidden = true;
      setAuthMode(state.authMode); window.scrollTo(0, 0);
    } else {
      $('#landing').hidden = true; $('#auth').hidden = true; $('#portal').hidden = false;
      showView(target);
    }
  }

  /* ───────── Landing ───────── */
  function renderLanding() {
    // features
    const fg = $('#features-grid');
    fg.innerHTML = D.features.map(f => `
      <div class="feature-card glass reveal">
        <span class="fc-tag">${f.tag}</span>
        <div class="fc-icon" style="--glow-c:${f.glow}">${f.ico}</div>
        <h3>${f.title}</h3><p>${f.desc}</p>
      </div>`).join('');

    // pricing
    renderPricing('monthly');

    // rotating words
    const words = ['dari WhatsApp.', 'dari satu dashboard.', 'dari warung ke warung.', 'dalam hitungan detik.', 'dengan data real-time.', 'tanpa ribet.'];
    let wi = 0;
    setInterval(() => { wi = (wi + 1) % words.length; const el = $('#rotating-word'); el.style.opacity = 0; setTimeout(() => { el.textContent = words[wi]; el.style.opacity = 1; }, 250); }, 2800);

    // counters
    $$('[data-count]').forEach(el => {
      const target = +el.dataset.count; const dur = 1600; const t0 = performance.now();
      const tick = now => {
        const p = Math.min((now - t0) / dur, 1);
        el.textContent = Math.floor(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });

    // reveal on scroll
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); } }), { threshold: 0.12 });
    $$('.reveal').forEach(el => io.observe(el));

    // demo chat
    setTimeout(() => { $('#demo-typing').hidden = true; $('#demo-msg1').hidden = false; }, 1400);
    setTimeout(() => { $('#demo-msg2').hidden = false; }, 3200);
    setTimeout(() => { const t = $('#demo-typing'); t.hidden = false; }, 4200);
    setTimeout(() => { $('#demo-typing').hidden = true; $('#demo-msg3').hidden = false; }, 5400);
  }

  function renderPricing(period) {
    const grid = $('#pricing-grid');
    grid.innerHTML = D.pricing.map(p => {
      const price = p.custom ? 'Custom' : fmt.rupiah(period === 'annual' ? p.annual : p.monthly) + '<small>/bln</small>';
      const per = p.custom ? 'per tahun · kontrak & volume' : period === 'annual' ? 'ditagih tahunan' : 'ditagih bulanan';
      return `
      <div class="price-card glass ${p.popular ? 'popular' : ''}">
        ${p.popular ? '<span class="pop-tag">⭐ Paling Populer</span>' : ''}
        <div class="price-name">${p.name}</div>
        <div class="price-desc">${p.tagline}</div>
        <div class="price-amt">${price}</div>
        <div class="price-per">${per}</div>
        <ul class="price-feats">${p.feats.map(f => `<li><span>✅</span>${f}</li>`).join('')}</ul>
        <button class="btn ${p.popular ? 'btn-primary glow' : 'btn-ghost'} btn-block" onclick="App.go('auth',{mode:'register'})">${p.custom ? 'Hubungi Sales' : 'Mulai Uji Coba'}</button>
      </div>`;
    }).join('');
  }

  /* ───────── Auth ───────── */
  function setAuthMode(mode) {
    state.authMode = mode;
    $$('.auth-tab').forEach(t => t.classList.toggle('active', t.dataset.mode === mode));
    $('#reg-fields').hidden = mode !== 'register';
    $('#otp-step').hidden = true;
    $('#auth-submit').textContent = mode === 'login' ? 'Masuk →' : 'Daftar & Verifikasi OTP →';
  }

  function demoLogin() {
    state.session = { name: D.user.name, email: D.user.email, role: D.user.role, company: D.tenant.name };
    localStorage.setItem('jatis_session', JSON.stringify(state.session));
    go('dashboard');
    toast('Selamat datang, ' + D.user.name.split(' ')[0] + '! 👋');
  }

  function logout() { state.session = null; localStorage.removeItem('jatis_session'); go('landing'); toast('Anda telah keluar. Sampai jumpa!', 'info'); }

  /* ───────── Portal shell ───────── */
  function showView(view) {
    state.view = view;
    $$('.view-sec').forEach(s => s.hidden = s.id !== 'view-' + view);
    $$('.nav-item').forEach(n => n.classList.toggle('active', n.dataset.view === view));
    window.scrollTo({ top: 0 });
    renderers[view] && renderers[view]();
    const names = { dashboard: 'Dashboard', channels: 'Channels', bot: 'Chatbot Studio', campaigns: 'Kampanye', inbox: 'Agent Inbox', otp: 'OTP Service', loyalty: 'Loyalty & Trade', analytics: 'Analytics', billing: 'Billing & Usage', safety: 'Content Safety', admin: 'Admin Console', settings: 'Pengaturan' };
    document.title = names[view] + ' · JATIS FMCG Cloud';
  }

  function toggleSidebar(open) {
    $('#sidebar').classList.toggle('open', open);
    $('.sidebar-backdrop').classList.toggle('show', open);
  }

  /* ───────── Renderers ───────── */
  const renderers = {};

  function kpiHTML(k) {
    let val;
    if (k.format === 'num') val = fmt.num(k.val);
    else if (k.format === 'juta') val = (k.val) + ' jt';
    else if (k.format === 'miliar') val = k.val + ' M';
    else if (k.format === 'rp') val = fmt.rupiah(k.val);
    else val = k.val;
    return `<div class="kpi glass reveal" style="--kg:${k.kg || 'rgba(16,185,129,.12)'}">
      <div class="k-label"><span class="k-ico">${k.ico}</span>${k.label}</div>
      <div class="k-val">${val}</div>
      <span class="k-delta ${k.dir}">${k.dir === 'up' ? '▲' : '▼'} ${k.delta}</span></div>`;
  }

  renderers.dashboard = () => {
    $('#dash-name').textContent = (state.session?.name || D.user.name).split(' ')[0];
    $('#dash-date').textContent = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    $('#kpi-grid').innerHTML = D.kpis.map(kpiHTML).join('');
    Charts.area($('#chart-volume'), D.volume, { color: '#10b981' });
    Charts.donut($('#chart-donut'), D.donut);
    $('#donut-legend').innerHTML = D.donut.map(d => `<div class="dl"><i style="background:${d.color}"></i>${d.label}<b>${d.val}%</b></div>`).join('');
    $('#channels-health').innerHTML = D.healthChannels.map(h => `
      <div class="health-row"><span class="h-name">${h.name}</span>
      <div class="hbar"><i style="width:${h.val}%;background:${h.color}"></i></div>
      <span class="h-val">${h.txt}</span></div>`).join('');
    $('#activity-feed').innerHTML = D.activities.map(a => `
      <div class="act-item"><span class="act-ico">${a.ico}</span><div>${a.txt}<div class="act-t">${a.t}</div></div></div>`).join('');
  };

  renderers.channels = () => {
    $('#channels-grid').innerHTML = D.channels.map(ch => `
      <div class="channel-card glass">
        <div class="ch-head">
          <span class="ch-logo ${ch.cls}">${ch.logo}</span>
          <div><h4>${ch.name}</h4><div class="ch-meta">${ch.phone}</div></div>
          <span class="ch-status ${ch.status === 'active' ? 's-active' : ch.status === 'error' ? 's-error' : 's-warn'}" style="margin-left:auto">${ch.status === 'active' ? '●' : ch.status === 'error' ? '⚠' : '◐'} ${ch.statusTxt}</span>
        </div>
        <div class="ch-meta">${ch.meta}</div>
        <div class="ch-stats">${ch.stats.map(s => `<div class="ch-stat"><b>${s[0]}</b><small>${s[1]}</small></div>`).join('')}</div>
        <div class="ch-actions">
          <button class="btn btn-ghost btn-sm" onclick="App.channelAction('${ch.id}')">⚙️ Kelola</button>
          <button class="btn btn-ghost btn-sm" onclick="App.channelAction('${ch.id}', 'test')">🧪 Test Kirim</button>
        </div>
      </div>`).join('');
    $('#templates-table').innerHTML = `<div class="tbl-wrap"><table class="tbl">
      <tr><th>ID Template</th><th>Nama</th><th>Status</th></tr>
      ${D.templates.map(t => `<tr><td class="tnum">${t[0]}</td><td>${t[1]}</td><td><span class="chip ${t[3] === 'ok' ? 'live' : 'warn-chip'}">${t[2]}</span></td></tr>`).join('')}
    </table></div>`;
  };

  renderers.bot = () => {
    $('#kb-list').innerHTML = D.kbItems.map(k => `
      <div class="kb-item"><span class="kb-ico">${k.ico}</span>
      <div><b>${k.name}</b><small>${k.type}</small></div>
      <span class="kb-stat">${k.stat}</span>
      <button class="btn btn-ghost btn-sm" onclick="App.kbAction()">⋯</button></div>`).join('');
    state.botConversation = [
      { d: 'in', m: 'cek stok indomie goreng' },
      { d: 'out', m: '✅ Stok <b>Indomie Goreng (Dus)</b>: <b>1.240 dus</b> — Gudang Cikarang. Mau pesan?<br><small>1. Ya, pesan 2. Tidak</small>' },
    ];
    renderBotChat();
  };

  function renderBotChat() {
    $('#bot-test-chat').innerHTML = state.botConversation.map(m => `<div class="msg ${m.d}">${m.m}</div>`).join('');
    $('#bot-test-chat').scrollTop = 99999;
  }

  function botTest() {
    const inp = $('#bot-test-input'); const q = inp.value.trim(); if (!q) return; inp.value = '';
    state.botConversation.push({ d: 'in', m: q });
    renderBotChat();
    setTimeout(() => {
      state.botConversation.push({ d: 'out', m: '🤔 Saya cek dulu di sistem ya…' });
      renderBotChat();
      setTimeout(() => {
        const low = q.toLowerCase();
        let reply = '✅ Stok <b>Indomie Goreng (Dus)</b>: <b>1.240 dus</b> — Gudang Cikarang.<br><small>Harga: Rp 102.500/dus · khusus distributor wilayah JKT</small>';
        if (low.includes('harga')) reply = '🏷️ <b>Harga per volume (distributor JKT):</b><br>10-50 dus: Rp 104.000<br>51-200 dus: Rp 102.500<br>201+ dus: Rp 100.000<br><small>Harga berlaku per 12 Agustus 2026</small>';
        else if (low.includes('order') || low.includes('pesan')) reply = '📦 <b>Pesanan #ORD-88325</b> diterima!<br>Status: <b>Diproses</b> · estimasi sampai besok 14.00';
        else if (low.includes('cs') || low.includes('komplain') || low.includes('orang')) reply = '🎧 Baik, saya sambungkan ke Customer Service. Mohon tunggu sebentar ya!';
        state.botConversation.push({ d: 'out', m: reply });
        renderBotChat();
      }, 900);
    }, 600);
  }

  renderers.campaigns = () => {
    renderCampaignList();
  };

  function renderCampaignList() {
    const list = $('#campaign-list');
    list.innerHTML = D.campaigns.map(c => {
      const rp = Math.round(c.delivered / Math.max(c.recipients, 1) * 100);
      return `<div class="campaign-card glass">
        <span class="camp-icon">${c.icon}</span>
        <div class="camp-main"><b>${c.name}</b><div class="camp-meta">${c.id} · ${c.channel} · ${fmt.num(c.recipients)} penerima</div></div>
        <div class="camp-progress"><div class="pct-label"><span>${c.statusTxt}</span><span>${c.pct}%</span></div>
          <div class="progress"><i style="width:${c.pct}%;background:${c.status === 'done' ? 'var(--emerald)' : c.status === 'sending' ? 'var(--grad)' : 'var(--muted-2)'}"></i></div></div>
        <div class="camp-stats">
          <div><b>${fmt.num(c.delivered)}</b>Terkirim</div>
          <div><b>${c.status === 'done' || c.status === 'sending' ? rp + '%' : '—'}</b>Delivery</div>
          <div><b>${c.replied ? fmt.num(c.replied) : '—'}</b>Replies</div>
          <div><b>${c.optout}</b>Opt-out</div>
        </div>
        <button class="btn btn-ghost btn-sm" onclick="App.toast('📊 Detail kampanye ${c.id} (demo)')">Detail</button>
      </div>`;
    }).join('');
  }

  /* ───── Campaign wizard ───── */
  function captureCwStep() {
    const name = $('#cw-name')?.value, rec = $('#cw-recipients')?.value, chan = $('#cw-body select')?.value;
    if (name) state.cwData.name = name;
    if (rec) state.cwData.recipients = rec;
    if (chan) state.cwData.channel = chan;
  }
  function openCampaignWizard() { state.cwStep = 1; state.cwData = {}; $('#campaign-wizard').hidden = false; cwRender(); $('#campaign-wizard').scrollIntoView({ behavior: 'smooth' }); }
  function cwNav(dir) {
    const max = 4;
    captureCwStep();
    if (dir > 0 && state.cwStep === max) {
      D.campaigns.unshift({ id: 'CMP-2026-0' + (18), name: state.cwData.name || 'Kampanye Baru', channel: state.cwData.channel || 'WhatsApp', icon: '📣', recipients: +state.cwData.recipients || 1000, sent: 0, delivered: 0, replied: 0, optout: 0, status: 'review', statusTxt: 'Menunggu approval', pct: 0 });
      toast('🎉 Kampanye dibuat & dikirim untuk approval (MFA step-up).');
      $('#campaign-wizard').hidden = true; renderCampaignList(); return;
    }
    state.cwStep = Math.min(max, Math.max(1, state.cwStep + dir));
    cwRender();
  }
  function cwRender() {
    const b = $('#cw-body');
    $('#cw-step-label').textContent = `Langkah ${state.cwStep}/4 · ${['Konten', 'Segmen', 'Jadwal', 'Review'][state.cwStep - 1]}`;
    $$('.ws').forEach((w, i) => { w.classList.toggle('active', i === state.cwStep - 1); if (i < state.cwStep - 1) w.classList.add('done'); });
    $('#cw-prev').style.visibility = state.cwStep === 1 ? 'hidden' : 'visible';
    $('#cw-next').textContent = state.cwStep === 4 ? '🚀 Kirim untuk Approval' : 'Lanjut →';

    if (state.cwStep === 1) b.innerHTML = `
      <label class="field"><span>Nama Kampanye</span><input id="cw-name" placeholder="cth: Promo Lebaran Gelombang 3"></label>
      <label class="field"><span>Pilih Template Pesan</span></label>
      <div class="tpl-grid">
        ${['promo_ramadhan', 'launching_produk', 'info_harga', 'ucapan_event'].map((t, i) => `
          <div class="tpl-card ${i === 0 ? 'on' : ''}" onclick="cwPickTpl(this)"><b>${['🌙 Promo Musiman', '🚀 Launching Produk', '🏷️ Info Harga', '🎉 Ucapan Event'][i]}</b><p>${['Kupon & diskon musiman', 'Pengenalan produk baru', 'Update harga per wilayah', 'Sambutan hari besar'][i]}</p></div>`).join('')}
      </div>
      <label class="field" style="margin-top:12px"><span>Kanal</span>
        <select><option>WhatsApp</option><option>WhatsApp + SMS</option><option>SMS</option><option>Email</option></select></label>`;
    else if (state.cwStep === 2) b.innerHTML = `
      <label class="field"><span>Jumlah Penerima</span><input id="cw-recipients" type="number" value="25000"></label>
      <label class="field"><span>Segmen</span></label>
      <div class="seg-pills" id="cw-segs">
        ${['Semua Kontak', 'Member Loyalty', 'Distributor Aktif', 'Retailer Wilayah JKT', 'Konsumen × Pembelian > 2x', 'Pelanggan Promo Sebelumnya'].map((s, i) => `<span class="seg-pill ${i < 3 ? 'on' : ''}" onclick="this.classList.toggle('on')">${s}</span>`).join('')}
      </div>
      <p style="font-size:12px;color:var(--muted-2);margin-top:10px">💡 Opt-out akan dihormati otomatis. Moderasi konten berjalan sebelum kirim.</p>`;
    else if (state.cwStep === 3) b.innerHTML = `
      <label class="field"><span>Jadwal</span>
        <select><option>Kirim Sekarang</option><option>Terjadwal — 2026-08-20 09:00 WIB</option><option>Terjadwal — 2026-08-20 19:00 WIB</option><option>Custom…</option></select></label>
      <div class="setting-row"><span>🕘 Kirim hanya 09.00–20.00 waktu lokal</span><label class="switch"><input type="checkbox" checked><i></i></label></div>
      <div class="setting-row"><span>⚡ Throttling (50 msg/detik)</span><label class="switch"><input type="checkbox" checked><i></i></label></div>
      <div class="setting-row"><span>🔁 Auto retry 3x untuk gagal sementara</span><label class="switch"><input type="checkbox" checked><i></i></label></div>`;
    else b.innerHTML = `
      <div class="card" style="background:rgba(139,92,246,.08);border:1px solid rgba(139,92,246,.3);margin-bottom:14px">
        <b>Ringkasan Kampanye</b><br>
        <div style="font-size:13px;color:var(--muted);margin-top:8px">
        Nama: <b style="color:#fff">${state.cwData.name || 'Promo Lebaran Gelombang 3'}</b><br>
        Penerima: <b style="color:#fff">${fmt.num(+state.cwData.recipients || 25000)}</b> · Kanal: ${state.cwData.channel || 'WhatsApp'}<br>
        Jadwal: Kirim Sekarang · Throttling aktif</div></div>
      <div class="setting-row"><span>🛡️ Moderasi konten: <b style="color:var(--emerald)">Lolos</b></span><span class="chip live">Scan otomatis</span></div>
      <div class="setting-row"><span>🔐 Approval MFA step-up (Company Admin)</span><span class="chip">Wajib</span></div>
      <p style="font-size:12px;color:var(--muted-2)">Setelah submit, Company Admin akan menerima notifikasi approval via WhatsApp & email.</p>`;
  }
  window.cwPickTpl = el => { $$('.tpl-card').forEach(t => t.classList.remove('on')); el.classList.add('on'); };

  /* ───── Inbox ───── */
  renderers.inbox = () => { renderInboxList(); selectInbox(state.inboxSelected || D.conversations[0].id); };

  function renderInboxList() {
    $('#inbox-list').innerHTML = D.conversations.map(c => `
      <div class="inbox-item ${state.inboxSelected === c.id ? 'active' : ''}" onclick="App.selectInbox('${c.id}')">
        <span class="i-avatar">${c.avatar}</span>
        <div class="i-main">
          <div class="i-top"><b>${c.name}</b><span class="i-time">${c.time}</span></div>
          <div class="i-msg">${c.last}</div>
          <small style="color:var(--muted-2);font-size:10.5px">${c.type}</small>
        </div>
        ${c.unread ? `<span class="i-unread">${c.unread}</span>` : ''}
      </div>`).join('');
  }

  function selectInbox(id) {
    state.inboxSelected = id;
    renderInboxList();
    const c = D.conversations.find(x => x.id === id);
    if (!c) return;
    const d = $('#inbox-detail'); d.hidden = false; $('#inbox-detail-empty').hidden = true;
    $('#inbox-detail-head').innerHTML = `<span class="avatar av4">${c.avatar}</span><div><b>${c.name}</b><small style="display:block;color:var(--muted)">${c.type} · ${c.phone}</small></div><span class="chip" style="margin-left:auto">SLA: 12:34</span>`;
    $('#inbox-context').innerHTML = c.context.map(x => `<span class="ctx-chip">${x[0]}: <b>${x[1]}</b></span>`).join('');
    $('#inbox-thread').innerHTML = c.thread.map(m => `<div class="msg ${m.d}">${m.tag === 'bot' ? '<small style="color:#a7f3d0">🤖 bot</small><br>' : ''}${m.m}</div>`).join('');
    $('#inbox-thread').scrollTop = 99999;
  }

  function sendReply() {
    const inp = $('#inbox-reply-input'); const m = inp.value.trim(); if (!m) return; inp.value = '';
    const c = D.conversations.find(x => x.id === state.inboxSelected);
    c.thread.push({ d: 'out', m });
    selectInbox(c.id);
    toast('Balasan terkirim ke ' + c.name + ' 📨');
  }

  /* ───── OTP ───── */
  renderers.otp = () => {
    Charts.area($('#chart-otp'), D.otpSeries, { color: '#06b6d4' });
    $('#otp-log').innerHTML = D.otpLog.map(o => `
      <div class="log-item"><span class="lg-ico">${o.ico}</span>
        <div><b>${o.name}</b><small>${o.purpose} · ${o.phone} · ${o.t}</small></div>
        <span class="lg-status ${o.status === 'ok' ? 'lg-ok' : o.status === 'warn' ? 'lg-warn' : 'lg-err'}">${o.st}</span></div>`).join('');
  };

  function sendOtpDemo() {
    openModal(`
      <h3>📱 Kirim OTP Uji</h3>
      <p class="m-sub">Kode 6 digit akan dikirim ke nomor tujuan via SMS/WhatsApp.</p>
      <label class="field"><span>Nomor Tujuan (E.164)</span><input id="mo-phone" value="+62 812-3456-7890"></label>
      <label class="field"><span>Tujuan Verifikasi</span><select><option>Klaim insentif</option><option>Login portal</option><option>Konfirmasi order</option><option>Redeem poin</option></select></label>
      <label class="field"><span>Kanal</span><select><option>SMS (default)</option><option>WhatsApp</option></select></label>
      <button class="btn btn-primary btn-block glow" onclick="App.modalOtpSend()">Kirim OTP →</button>`, 'otp');
  }
  function modalOtpSend() {
    closeModal();
    setTimeout(() => {
      const otp = String(Math.floor(100000 + Math.random() * 900000));
      openModal(`
        <h3>🔐 Kode OTP Terkirim</h3>
        <p class="m-sub">Simulasi — pada produksi, kode dikirim via SMS/WhatsApp ke penerima.</p>
        <div style="text-align:center;padding:18px;background:rgba(6,182,212,.08);border:1px solid rgba(6,182,212,.3);border-radius:14px;font-family:var(--font-mono);font-size:34px;letter-spacing:10px;font-weight:700;color:#67e8f9">${otp}</div>
        <p style="font-size:12px;color:var(--muted-2);text-align:center;margin-top:12px">Berlaku 5 menit · 5 percobaan · resend maks 3x/10 menit</p>
        <button class="btn btn-primary btn-block glow" style="margin-top:14px" onclick="App.closeModal();App.toast('✅ OTP terverifikasi — log tercatat')">Verifikasi (Simulasi)</button>`, 'otp');
    }, 700);
  }

  /* ───── Loyalty ───── */
  renderers.loyalty = () => {
    $('#loyalty-kpi').innerHTML = D.loyaltyKpi.map(kpiHTML).join('');
    renderClaims();
    $('#members-table').innerHTML = `<div class="tbl-wrap"><table class="tbl">
      <tr><th>Member</th><th>ID</th><th>Wilayah</th><th>Poin</th><th>Order</th><th>Tier</th></tr>
      ${D.members.map(m => `<tr><td><b>${m.name}</b></td><td class="tnum">${m.id}</td><td>${m.region}</td><td>${fmt.num(m.poin)}</td><td>${m.order}x</td><td><span class="chip ${m.tier === 'Gold' ? 'warn-chip' : ''}">${m.tier}</span></td></tr>`).join('')}
    </table></div>`;
  };

  function renderClaims() {
    const pending = D.claims.filter(c => c.status === 'Pending' || c.status === 'Review');
    $('#claim-count').textContent = pending.length + ' klaim';
    $('#claims-table').innerHTML = `<div class="tbl-wrap"><table class="tbl">
      <tr><th>ID Klaim</th><th>Member</th><th>Jenis</th><th>Nilai</th><th>Verifikasi</th><th>Status</th><th>Aksi</th></tr>
      ${D.claims.map(c => `<tr>
        <td class="tnum">${c.id}</td><td><b>${c.member}</b><br><small style="color:var(--muted-2)">${c.region} · ${c.achievement}</small></td>
        <td>${c.type}</td><td><b>${c.amount}</b></td>
        <td>${c.otp}</td>
        <td><span class="chip ${c.status === 'Paid' ? 'live' : c.status === 'Approved' ? 'live' : c.status === 'Review' ? 'warn-chip' : ''}">${c.status}</span></td>
        <td>${c.status === 'Pending' ? `<button class="action-btn ab-ok" onclick="App.claimAction('${c.id}','approve')">✓ Setujui</button> <button class="action-btn ab-no" onclick="App.claimAction('${c.id}','reject')">✕</button>` : c.status === 'Review' ? `<button class="action-btn ab-rev" onclick="App.claimAction('${c.id}','review')">🔍 Review</button>` : '<span style="color:var(--muted-2)">—</span>'}</td>
      </tr>`).join('')}
    </table></div>`;
  }

  function claimAction(id, act) {
    const c = D.claims.find(x => x.id === id);
    if (act === 'approve') { c.status = 'Approved'; toast('✅ Klaim ' + id + ' disetujui — payout akan diproses.'); }
    if (act === 'reject') { c.status = 'Rejected'; toast('⛔ Klaim ' + id + ' ditolak.', 'error'); }
    if (act === 'review') { c.status = 'Pending'; c.achievement = 'Manual check — pola normal'; toast('🔍 Klaim ' + id + ' di-review: pola normal, lanjut proses.'); }
    renderClaims();
  }

  /* ───── Analytics ───── */
  renderers.analytics = () => {
    Charts.bars($('#chart-campaign'), D.campaignPerf.labels, [D.campaignPerf.delivery, D.campaignPerf.reply], { colors: ['#10b981', '#8b5cf6'] });
    Charts.bars($('#chart-cs'), D.csMetrics.labels, [D.csMetrics.handled, D.csMetrics.bot], { colors: ['#8b5cf6', '#06b6d4'] });
    Charts.hbars($('#chart-cost'), D.costData.map(c => ({ label: c.label, pct: c.val, sub: 'Rp ' + c.val.toFixed(1).replace('.', ',') + ' jt bulan ini' })), { color: 'linear-gradient(90deg,#059669,#8b5cf6)' });
  };
  function exportReport() {
    const csv = 'modul,pesan,delivered\nWhatsApp,231200,98.2%\nSMS,74800,99.1%\nEmail,34000,89.3%';
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'jatis_fmcg_report.csv'; a.click();
    toast('📊 Laporan CSV diunduh');
  }

  /* ───── Billing ───── */
  renderers.billing = () => {
    $('#billing-kpi').innerHTML = [
      { label: 'Sisa Saldo', ico: '💰', val: 4200000, format: 'rp', delta: 'Top-up terakhir 3 hari lalu', dir: 'up', kg: 'rgba(16,185,129,.14)' },
      { label: 'Estimasi Tagihan Bulan Ini', ico: '🧾', val: 12500000, format: 'rp', delta: '+8% vs bulan lalu', dir: 'up', kg: 'rgba(139,92,246,.14)' },
      { label: 'Sisa Kuota Pesan', ico: '📬', val: 160000, format: 'num', delta: '68% terpakai', dir: 'up', kg: 'rgba(6,182,212,.14)' },
    ].map(k => kpiHTML({ ...k, val: k.val })).join('');
    Charts.hbars($('#usage-bars'), D.usage.map(u => ({ label: u.label, used: u.used, total: u.total, sub: fmt.num(u.used) + ' / ' + fmt.num(u.total) + ' ' + u.unit })));
    $('#invoice-table').innerHTML = `<div class="tbl-wrap"><table class="tbl">
      <tr><th>Invoice</th><th>Periode</th><th>Jumlah</th><th>Status</th></tr>
      ${D.invoices.map(i => `<tr><td class="tnum">${i.id}</td><td>${i.period}</td><td><b>${i.amount}</b></td><td><span class="lg-status ${i.statusCls}">${i.status}</span></td></tr>`).join('')}
    </table></div>`;
    const t = D.tenant;
    $('#quota-pct').textContent = Math.round(t.quota.used / t.quota.total * 100) + '%';
    $('#quota-bar').style.width = Math.round(t.quota.used / t.quota.total * 100) + '%';
    $('#tb-credit').textContent = fmt.rupiah(t.credit);
  };

  function topUp() {
    openModal(`
      <h3>💰 Top-up Saldo</h3>
      <p class="m-sub">Saldo dipakai untuk pesan outbound di luar kuota & add-on. Aktivasi otomatis setelah pembayaran tervalidasi.</p>
      <div class="seg-pills" style="margin-bottom:14px">
        ${['Rp 1.000.000', 'Rp 2.500.000', 'Rp 5.000.000', 'Rp 10.000.000'].map((v, i) => `<span class="seg-pill ${i === 1 ? 'on' : ''}" onclick="document.querySelectorAll('.modal .seg-pill').forEach(e=>e.classList.remove('on'));this.classList.add('on');App.cwData.topup='${v}'">${v}</span>`).join('')}
      </div>
      <label class="field"><span>Metode Pembayaran</span><select><option>Transfer Bank (VA) — BCA</option><option>Transfer Bank (VA) — Mandiri</option><option>QRIS</option><option>Kartu Kredit</option></select></label>
      <button class="btn btn-primary btn-block glow" onclick="App.modalTopUp()">Bayar Sekarang →</button>`, 'billing');
  }
  function modalTopUp() {
    closeModal();
    toast('🧾 Invoice VA dibuat — menunggu pembayaran…', 'info');
    setTimeout(() => toast('✅ Pembayaran tervalidasi! Saldo bertambah Rp 2.500.000.'), 2600);
  }

  /* ───── Content Safety ───── */
  renderers.safety = () => {
    $('#safety-summary').innerHTML = D.safetySummary.map(s => `
      <div class="safety-item glass"><span class="lvl ${s.cls}">${s.lvl}</span><b>${s.val}</b><small>${s.label}</small></div>`).join('');
    renderSafetyQueue();
  };
  function renderSafetyQueue() {
    const items = D.safetyQueue.filter(i => !state.safetyHandled[i.id]);
    $('#safety-queue').innerHTML = items.length === 0
      ? '<div class="inbox-empty">🎉 Antrian bersih! Semua konten sudah direview.</div>'
      : items.map(s => `
      <div class="sq-item glass">
        <div class="sq-main">
          <b>${s.cat}</b> <span class="lvl ${s.sevCls}">${s.sev}</span>
          <p>${s.content}</p>
          <div class="sq-meta">${s.meta}</div>
        </div>
        <button class="action-btn ab-ok" onclick="App.safetyAction('${s.id}','approve')">✓ Approve</button>
        <button class="action-btn ab-no" onclick="App.safetyAction('${s.id}','block')">⛔ Block</button>
      </div>`).join('');
  }
  function safetyAction(id, act) {
    state.safetyHandled[id] = act;
    if (act === 'approve') toast('✅ Konten disetujui & dilanjutkan ke pengiriman.');
    else toast('⛔ Konten diblokir + dicatat di audit log. Banding tersedia.', 'info');
    renderSafetyQueue();
  }

  /* ───── Admin ───── */
  renderers.admin = () => {
    $('#admin-kpi').innerHTML = D.adminKpi.map(kpiHTML).join('');
    $('#admin-tenants').innerHTML = `<div class="tbl-wrap"><table class="tbl">
      <tr><th>Tenant</th><th>Paket</th><th>Status</th><th>Pesan (30d)</th><th>MRR</th><th>Health</th><th></th></tr>
      ${D.tenants.map(t => `<tr>
        <td><b>${t[0]}</b></td><td>${t[1]}</td>
        <td><span class="chip ${t[2] === 'Aktif' ? 'live' : t[2] === 'Trial' ? '' : 'warn-chip'}">${t[2]}</span></td>
        <td class="tnum">${t[3]}%</td><td class="tnum">${t[4]}</td>
        <td><div class="hbar"><i style="width:${t[3]}%;background:${t[5] === 'err' ? 'var(--red)' : t[5] === 'warn' ? 'var(--amber)' : 'var(--emerald)'}"></i></div></td>
        <td><button class="btn btn-ghost btn-sm" onclick="App.toast('🖥️ Detail tenant ${t[0]} (demo)')">Kelola</button></td>
      </tr>`).join('')}
    </table></div>`;
    $('#admin-fraud').innerHTML = D.fraud.map(f => `
      <div class="log-item"><span class="lg-ico">${f.ico}</span><div>${f.txt}</div><span class="lg-status ${f.cls === 'ab-ok' ? 'lg-ok' : f.cls === 'ab-no' ? 'lg-err' : 'lg-warn'}">${f.st}</span></div>`).join('');
  };

  /* ───── Settings ───── */
  renderers.settings = () => {
    $('#team-list').innerHTML = D.team.map(t => `
      <div class="team-row"><span class="avatar av4" style="width:34px;height:34px;font-size:12px">${t.name.split(' ').map(w => w[0]).join('').slice(0, 2)}</span>
      <div><b>${t.name}</b><small>${t.email}</small></div><span class="t-role">${t.role}</span></div>`).join('');
    $('#api-keys').innerHTML = D.apiKeys.map(k => `
      <div class="key-row"><b>${k.name}</b><span class="kr-key">${k.key}</span><span class="chip">${k.scope}</span>
      <button class="icon-btn" style="width:30px;height:30px;font-size:12px" onclick="App.copyKey('${k.key}')">📋</button></div>`).join('');
    $('#webhook-list').innerHTML = D.webhooks.map(w => `
      <div class="key-row"><b>${w.ev}</b><span class="kr-key">${w.url}</span><span class="chip live">HMAC ✓</span></div>`).join('');
  };

  function copyKey(key) { navigator.clipboard?.writeText('jmk_live_…' + key).catch(() => {}); toast('🔑 API key disalin (demo)'); }
  function newApiKey() { toast('🔑 API key baru dibuat & dicatat di audit log.'); }

  /* ───── Channel modal ───── */
  function connectChannel() {
    openModal(`
      <h3>📡 Hubungkan Kanal Baru</h3>
      <p class="m-sub">Verifikasi nomor WhatsApp bisnis dalam 3 langkah.</p>
      <div class="setting-row"><span>1️⃣ Pilih kanal</span><span class="chip">WhatsApp Business</span></div>
      <div class="setting-row"><span>2️⃣ Verifikasi nomor</span><span class="chip live">✓ Nomor tersedia</span></div>
      <div class="setting-row"><span>3️⃣ Scan QR / OTP</span><span class="chip warn-chip">Menunggu</span></div>
      <label class="field" style="margin-top:14px"><span>Nomor WhatsApp Bisnis</span><input placeholder="+62 812-XXXX-XXXX"></label>
      <label class="field"><span>Nama Tampilan</span><input placeholder="Makanan Nusantara Official"></label>
      <button class="btn btn-primary btn-block glow" onclick="App.modalConnect()">Verifikasi Sekarang →</button>`, 'channel');
  }
  function modalConnect() {
    closeModal();
    const fakeQr = Array.from({ length: 120 }, (_, i) => `<rect x="${(i % 12) * 12}" y="${Math.floor(i / 12) * 12}" width="10" height="10" fill="${Math.random() > 0.5 ? '#10b981' : '#0b1120'}" rx="2"/>`).join('');
    openModal(`
      <h3>📱 Scan QR dengan WhatsApp</h3>
      <p class="m-sub">Buka WhatsApp → Pengaturan → Perangkat Tertaut → Tautkan Perangkat.</p>
      <div style="display:flex;justify-content:center;padding:12px;background:#fff;border-radius:14px;width:180px;margin:0 auto">
        <svg viewBox="0 0 144 144" width="150" height="150">${fakeQr}</svg>
      </div>
      <button class="btn btn-primary btn-block glow" style="margin-top:16px" onclick="App.modalConnected()">Saya Sudah Scan ✓</button>`, 'channel');
  }
  function modalConnected() {
    closeModal();
    setTimeout(() => {
      toast('✅ Nomor +62 812-3456-7890 terhubung & kanal AKTIF!');
      D.channels.push({ id: 'wa2', name: 'WhatsApp Business (2)', logo: '💬', cls: 'ch-wa', status: 'active', statusTxt: 'Aktif', phone: '+62 812-9876-5432', meta: 'Template: sync dari nomor utama', stats: [['0', 'Pesan'], ['—', 'Deliver'], ['—', 'Latensi']] });
      showView('channels');
    }, 900);
  }

  function channelAction(id, test) {
    if (test) { toast('🧪 Test message terkirim via ' + id + ' — status: DELIVERED'); return; }
    toast('⚙️ Pengaturan kanal ' + id + ' (demo)');
  }

  /* ───── Bot actions ───── */
  function deployBot() { toast('🚀 Bot v2.5 di-deploy ke produksi. Rollback tersedia 1 klik.'); }
  function uploadKB() { toast('📄 Dokumen diupload — scan antivirus: CLEAN. Proses indexing…', 'info'); setTimeout(() => toast('✅ Knowledge base diperbarui (1.240 chunks).'), 2200); }
  function kbAction() { toast('⋯ Menu knowledge base (demo)'); }

  /* ───── Modal engine ───── */
  function openModal(html, ctx) {
    const root = $('#modal-root');
    root.innerHTML = `<div class="modal-backdrop"><div class="modal glass-strong">${html}<button class="icon-btn modal-close" onclick="App.closeModal()">✕</button></div></div>`;
    root.querySelector('.modal-backdrop').addEventListener('click', e => { if (e.target === e.currentTarget) closeModal(); });
    document.body.classList.add('lock');
    const inp = root.querySelector('input'); inp && inp.focus();
  }
  function closeModal() { $('#modal-root').innerHTML = ''; document.body.classList.remove('lock'); }

  /* ───── Command palette ───── */
  function initPalette() {
    const views = { dashboard: ['Dashboard', '📊'], channels: ['Channels', '📡'], bot: ['Chatbot Studio', '🤖'], campaigns: ['Kampanye', '📣'], inbox: ['Agent Inbox', '💬'], otp: ['OTP Service', '🔐'], loyalty: ['Loyalty & Trade', '🏆'], analytics: ['Analytics', '📈'], billing: ['Billing', '💳'], safety: ['Content Safety', '🛡️'], admin: ['Admin Console', '🖥️'], settings: ['Pengaturan', '⚙️'] };
    const actions = [['Kirim OTP uji', '🔐', () => sendOtpDemo()], ['Buat kampanye', '📣', () => { go('campaigns'); openCampaignWizard(); }], ['Top-up saldo', '💰', () => topUp()], ['Hubungkan kanal', '📡', () => connectChannel()], ['Ekspor laporan', '📈', () => exportReport()], ['Uji chatbot', '🤖', () => go('bot')]];
    document.addEventListener('keydown', e => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); togglePalette(); }
      if (e.key === 'Escape') { closeModal(); closePalette(); }
    });
    function togglePalette() {
      const p = $('#cmd-palette'); const on = p.hidden;
      p.hidden = !on; p.innerHTML = '';
      if (!on) return;
      p.className = 'cmd-palette glass-strong';
      p.innerHTML = `<input id="cp-input" placeholder="Ketik perintah atau buka menu…"><div class="cmd-results" id="cp-results"></div>`;
      const inp = $('#cp-input'); inp.focus();
      const render = () => {
        const q = inp.value.toLowerCase();
        const v = Object.entries(views).filter(([id, [n]]) => n.toLowerCase().includes(q));
        const a = actions.filter(([n]) => n.toLowerCase().includes(q));
        $('#cp-results').innerHTML = [
          ...v.map(([id, [n, ico]]) => `<div class="cmd-item" data-go="${id}"><span class="ci-ico">${ico}</span>${n}<small>menu</small></div>`),
          ...a.map(([n, ico, fn], i) => `<div class="cmd-item" data-act="${i}"><span class="ci-ico">${ico}</span>${n}<small>aksi</small></div>`),
        ].join('') || '<div style="padding:14px;color:var(--muted-2);font-size:13px">Tidak ditemukan</div>';
        $('#cp-results').querySelectorAll('.cmd-item').forEach(el => el.onclick = () => {
          if (el.dataset.go) { closePalette(); go(el.dataset.go); }
          else { const i = +el.dataset.act; closePalette(); actions[i][2](); }
        });
      };
      inp.addEventListener('input', render); render();
    }
    function closePalette() { $('#cmd-palette').hidden = true; }
  }

  /* ───── Init ───── */
  function init() {
    // restore session
    try { state.session = JSON.parse(localStorage.getItem('jatis_session')); } catch (e) {}

    // nav events
    $$('.nav-item').forEach(n => n.addEventListener('click', () => { go(n.dataset.view); toggleSidebar(false); }));
    $$('.auth-tab').forEach(t => t.addEventListener('click', () => setAuthMode(t.dataset.mode)));
    $$('.tg-btn').forEach(b => b.addEventListener('click', () => { $$('.tg-btn').forEach(x => x.classList.remove('active')); b.classList.add('active'); renderPricing(b.dataset.period); }));
    $('#auth-form').addEventListener('submit', e => {
      e.preventDefault();
      if (state.authMode === 'register' && $('#otp-step').hidden) {
        $('#otp-step').hidden = false;
        const box = $('#otp-box'); box.innerHTML = '';
        for (let i = 0; i < 6; i++) { const inp = document.createElement('input'); inp.maxLength = 1; inp.inputMode = 'numeric'; inp.dataset.i = i; inp.addEventListener('input', function () { this.value = this.value.replace(/\D/g, ''); if (this.value && i < 5) box.children[i + 1].focus(); }); box.appendChild(inp); }
        $('#auth-submit').textContent = 'Verifikasi & Selesai 🎉';
        box.children[0].focus();
        return;
      }
      state.session = { name: $('#f-name')?.value || 'Budi Santoso', email: $('#f-email').value, role: 'Company Admin', company: $('#f-company')?.value || 'PT Makanan Nusantara' };
      localStorage.setItem('jatis_session', JSON.stringify(state.session));
      go('dashboard');
      toast('🎉 Selamat datang di JATIS FMCG Cloud, ' + state.session.name.split(' ')[0] + '!');
    });

    renderLanding();
    initPalette();
    if (state.session) go('dashboard'); else go('landing');
  }

  return {
    go, toast, demoLogin, logout, toggleSidebar, selectInbox, sendReply, botTest, deployBot, uploadKB, kbAction,
    channelAction, connectChannel, modalConnect, modalConnected, sendOtpDemo, modalOtpSend, claimAction,
    exportReport, topUp, modalTopUp, safetyAction, copyKey, newApiKey, openCampaignWizard, cwNav, cwData: state.cwData,
    openModal, closeModal, init,
  };
})();
document.addEventListener('DOMContentLoaded', App.init);
