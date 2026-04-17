window.ScannerPage = {
  _scanning: false,
  _demo: ['valid','valid','valid','already_used','invalid','valid'],
  _demoIdx: 0,

  render() {
    return isMobile() ? this.renderMobile() : this.renderDesktop();
  },

  renderMobile() {
    const activeShow = D.shows.find(s => s.status === 'active') || D.shows[0];
    const checkedIn = 842, total = 1000;
    const pct = Math.round((checkedIn / total) * 100);

    return `
    <div style="background:#ECEEF5;min-height:100vh;padding-bottom:20px">

      <!-- Header -->
      <div style="background:#fff;padding:16px 20px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #f1f5f9">
        <button class="btn btn-ghost btn-sm" onclick="navigate('shows')">${icon('arrow-left',18)}</button>
        <div style="text-align:center">
          <div style="font-size:15px;font-weight:700;color:#3B4FDB">Ticket Validation</div>
          <div style="font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.05em">${activeShow.name.toUpperCase()}</div>
        </div>
        <button class="btn btn-ghost btn-sm">${icon('more-vertical',18)}</button>
      </div>

      <!-- Validation card -->
      <div style="margin:16px 16px 12px" id="mob-scan-card">
        <div style="background:linear-gradient(135deg,#3B4FDB,#5B6FEB);border-radius:24px;padding:32px 20px;text-align:center;color:#fff">
          <div style="width:72px;height:72px;background:rgba(255,255,255,0.2);border-radius:20px;display:flex;align-items:center;justify-content:center;margin:0 auto 16px">${icon('scan-line',36)}</div>
          <div style="font-size:22px;font-weight:800;margin-bottom:4px">Ready to Scan</div>
          <div style="font-size:14px;opacity:0.8">Tap the button below to validate a QR ticket</div>
        </div>
      </div>

      <div style="padding:0 16px">
        <!-- Entrance progress -->
        <div class="mob-card">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
            <div>
              <div style="font-size:13px;color:#64748b;margin-bottom:2px">Entrance Progress</div>
              <div style="font-size:22px;font-weight:800;color:#0F172A">${checkedIn} <span style="font-size:14px;font-weight:500;color:#94a3b8">/ ${total}</span></div>
            </div>
            <span style="display:flex;align-items:center;gap:6px;background:#dcfce7;color:#16a34a;font-size:12px;font-weight:700;padding:5px 12px;border-radius:20px">
              <span style="width:7px;height:7px;background:#16a34a;border-radius:50%;display:inline-block"></span> LIVE
            </span>
          </div>
          <div style="background:#e2e8f0;border-radius:6px;height:8px">
            <div style="background:#3B4FDB;width:${pct}%;height:100%;border-radius:6px"></div>
          </div>
        </div>

        <!-- Scan button -->
        <button class="mob-btn-primary" style="margin-bottom:12px;gap:10px" onclick="ScannerPage.simulateScan()">
          ${icon('scan-line',20)} Tap to Scan QR
        </button>

        <!-- Manual search -->
        <div class="mob-card">
          <div style="position:relative;margin-bottom:12px">
            <span style="position:absolute;left:14px;top:50%;transform:translateY(-50%);color:#94a3b8">${icon('search',16)}</span>
            <input class="input" id="manual-search" placeholder="Manual entry by Mobile or ID…" style="padding-left:42px;border-radius:30px;background:#f8fafc;border:1.5px solid #e2e8f0">
          </div>
          <button class="mob-btn-primary" style="background:#1e293b;border-radius:12px" onclick="ScannerPage.manualLookup()">
            ${icon('credit-card',18)} VALIDATE MANUALLY
          </button>
          <div id="manual-result" style="margin-top:12px"></div>
        </div>

        <!-- Bottom stats -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px">
          <div class="mob-card" style="margin-bottom:0">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;color:#64748b">${icon('clock',16)}<span style="font-size:10px;font-weight:700;letter-spacing:0.06em">AVG. WAIT</span></div>
            <div style="font-size:20px;font-weight:800;color:#0F172A">1.2 min</div>
          </div>
          <div class="mob-card" style="margin-bottom:0">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;color:#64748b">${icon('alert-circle',16)}<span style="font-size:10px;font-weight:700;letter-spacing:0.06em">FLAGGED</span></div>
            <div style="font-size:20px;font-weight:800;color:#0F172A">04 Cases</div>
          </div>
        </div>
      </div>
    </div>`;
  },

  renderDesktop() {
    const activeShow = D.shows.find(s=>s.status==='active') || D.shows[0];
    const checkedIn  = 412, total = activeShow.filled;
    const pct = Math.round((checkedIn/total)*100);

    return `
    <div style="max-width:640px;margin:0 auto">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:22px">
        <div>
          <h1 style="font-size:22px;font-weight:700;color:#1e293b">Gate Scanner</h1>
          <p style="font-size:13px;color:#94a3b8;margin-top:2px">Scan QR codes to validate entry at the venue.</p>
        </div>
        <button class="btn btn-ghost btn-sm" onclick="navigate('shows')">${icon('arrow-left',15)} Back</button>
      </div>

      <!-- Show selector -->
      <div class="card" style="padding:16px;margin-bottom:16px">
        <div style="font-size:12px;font-weight:600;color:#94a3b8;margin-bottom:6px">SCANNING FOR</div>
        <select class="select" style="width:100%">
          ${D.shows.filter(s=>s.status==='active').map(s=>`<option>${s.name} · ${s.date}</option>`).join('')}
        </select>
      </div>

      <!-- Live counters -->
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:16px">
        <div class="metric-card" style="text-align:center">
          <div style="font-size:11px;font-weight:600;color:#94a3b8;margin-bottom:4px">CHECKED-IN</div>
          <div style="font-size:28px;font-weight:800;color:#22c55e" data-count="${checkedIn}">0</div>
        </div>
        <div class="metric-card" style="text-align:center">
          <div style="font-size:11px;font-weight:600;color:#94a3b8;margin-bottom:4px">PENDING</div>
          <div style="font-size:28px;font-weight:800;color:#f97316" data-count="${total-checkedIn}">0</div>
        </div>
        <div class="metric-card" style="text-align:center">
          <div style="font-size:11px;font-weight:600;color:#94a3b8;margin-bottom:4px">ENTRY RATE</div>
          <div style="font-size:28px;font-weight:800;color:#2563eb">24/min</div>
        </div>
      </div>

      <!-- Progress -->
      <div class="card" style="padding:16px;margin-bottom:16px">
        <div style="display:flex;justify-content:space-between;margin-bottom:6px">
          <span style="font-size:13px;color:#374151">Entry Progress</span>
          <span style="font-size:13px;font-weight:600;color:#2563eb">${pct}%</span>
        </div>
        <div class="progress-bar" style="height:10px"><div class="progress-fill green" style="width:${pct}%"></div></div>
      </div>

      <!-- Scanner -->
      <div class="card" style="padding:24px;text-align:center;margin-bottom:16px">
        <div style="width:200px;height:200px;border:3px dashed #e2e8f0;border-radius:16px;margin:0 auto 20px;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#f8fafc" id="scanner-box">
          <div style="font-size:48px;margin-bottom:8px">📷</div>
          <div style="font-size:13px;color:#94a3b8">Camera preview</div>
          <div style="font-size:11px;color:#cbd5e1;margin-top:4px">(simulated in demo)</div>
        </div>
        <button id="scan-btn" class="btn btn-primary" style="padding:14px 40px;font-size:16px;border-radius:12px" onclick="ScannerPage.simulateScan()">
          ${icon('scan-line',20)} Tap to Scan QR
        </button>
        <div style="margin-top:12px;font-size:12px;color:#94a3b8">Point camera at the audience member's QR code</div>
      </div>

      <!-- Manual lookup -->
      <div class="card" style="padding:20px">
        <div style="font-size:14px;font-weight:600;color:#1e293b;margin-bottom:12px">Manual Lookup</div>
        <div style="font-size:13px;color:#64748b;margin-bottom:12px">If QR is damaged or forgotten, search by mobile number or Registration ID.</div>
        <div style="display:flex;gap:10px">
          <input class="input" id="manual-search" placeholder="Mobile number or Registration ID (e.g. DH-10231)" style="flex:1">
          <button class="btn btn-primary" onclick="ScannerPage.manualLookup()">${icon('search',15)} Lookup</button>
        </div>
        <div id="manual-result" style="margin-top:12px"></div>
      </div>

      <!-- Overlay (hidden) -->
      <div id="scan-result-overlay" style="display:none;position:fixed;inset:0;z-index:200;align-items:center;justify-content:center;flex-direction:column">
        <div id="scan-result-content" style="text-align:center;padding:40px"></div>
        <button onclick="ScannerPage.closeResult()" style="margin-top:20px;background:rgba(255,255,255,0.2);color:#fff;border:2px solid rgba(255,255,255,0.5);padding:12px 28px;border-radius:10px;font-size:16px;cursor:pointer">Scan Next →</button>
      </div>
    </div>`;
  },

  init() {
    initCounters();
  },

  simulateScan() {
    const scenarios = this._demo;
    const result = scenarios[this._demoIdx % scenarios.length];
    this._demoIdx++;
    this.showResult(result);
  },

  showResult(type) {
    const mobileCfg = {
      valid:        { bg:'linear-gradient(135deg,#16a34a,#22c55e)', ic:'check',   title:'Access Granted',      name:'Arjun Mehta',    sub:'Zone A · Seat 42' },
      already_used: { bg:'linear-gradient(135deg,#dc2626,#ef4444)', ic:'x',       title:'Already Checked-In',  name:'Invalid Ticket', sub:'Please direct guest to Help Desk' },
      invalid:      { bg:'linear-gradient(135deg,#dc2626,#ef4444)', ic:'x',       title:'Invalid Ticket',       name:'Unknown Token',  sub:'Ticket does not match any registration' },
    };

    if (isMobile()) {
      const card = document.getElementById('mob-scan-card');
      if (!card) return;
      const cfg = mobileCfg[type] || mobileCfg.invalid;
      card.innerHTML = `
        <div style="background:${cfg.bg};border-radius:24px;padding:32px 20px;text-align:center;color:#fff">
          <div style="width:72px;height:72px;background:rgba(255,255,255,0.25);border-radius:20px;display:flex;align-items:center;justify-content:center;margin:0 auto 16px">${icon(cfg.ic,36)}</div>
          <div style="font-size:22px;font-weight:800;margin-bottom:4px">${cfg.title}</div>
          <div style="font-size:15px;font-weight:600;opacity:0.9;margin-bottom:6px">${cfg.name}</div>
          <div style="font-size:13px;opacity:0.75">${cfg.sub}</div>
        </div>`;
      if (window.lucide) lucide.createIcons();
      if (type === 'valid') {
        setTimeout(() => {
          if (card) card.innerHTML = `
            <div style="background:linear-gradient(135deg,#3B4FDB,#5B6FEB);border-radius:24px;padding:32px 20px;text-align:center;color:#fff">
              <div style="width:72px;height:72px;background:rgba(255,255,255,0.2);border-radius:20px;display:flex;align-items:center;justify-content:center;margin:0 auto 16px">${icon('scan-line',36)}</div>
              <div style="font-size:22px;font-weight:800;margin-bottom:4px">Ready to Scan</div>
              <div style="font-size:14px;opacity:0.8">Tap the button below to validate a QR ticket</div>
            </div>`;
          if (window.lucide) lucide.createIcons();
        }, 2500);
      }
      return;
    }

    const overlay = document.getElementById('scan-result-overlay');
    const content = document.getElementById('scan-result-content');
    if (!overlay || !content) return;

    const cfg = {
      valid: {
        bg: '#16a34a',
        icon: '✅',
        title: 'Checked In!',
        name: 'Arjun Mehta',
        sub: 'DH-10231 · Neon Echoes Live Mumbai',
        extra: '<div style="margin-top:12px;font-size:14px;opacity:0.85">Entry recorded · 24 Oct 2025, 07:23 PM</div>'
      },
      already_used: {
        bg: '#dc2626',
        icon: '🔴',
        title: 'Already Checked-In',
        name: 'Rohan Kapoor',
        sub: 'DH-10233 · Entry recorded at 06:58 PM',
        extra: '<div style="margin-top:12px;font-size:14px;opacity:0.85">This QR was already used. Please refer to help desk.</div>'
      },
      invalid: {
        bg: '#dc2626',
        icon: '❌',
        title: 'Invalid QR Code',
        name: 'Unrecognised Token',
        sub: 'This ticket does not match any registration',
        extra: '<div style="margin-top:12px;font-size:14px;opacity:0.85">Possible reasons: wrong show, cancelled registration, or tampered QR.</div>'
      }
    }[type] || { bg:'#dc2626', icon:'❌', title:'Error', name:'Unknown', sub:'', extra:'' };

    overlay.style.background = cfg.bg;
    overlay.style.display = 'flex';
    content.innerHTML = `
      <div style="font-size:72px;margin-bottom:16px">${cfg.icon}</div>
      <div style="font-size:32px;font-weight:800;color:#fff;margin-bottom:8px">${cfg.title}</div>
      <div style="font-size:22px;font-weight:600;color:rgba(255,255,255,0.9);margin-bottom:4px">${cfg.name}</div>
      <div style="font-size:14px;color:rgba(255,255,255,0.7)">${cfg.sub}</div>
      ${cfg.extra}`;

    if (type === 'valid') {
      setTimeout(() => this.closeResult(), 2000);
    }
  },

  closeResult() {
    const overlay = document.getElementById('scan-result-overlay');
    if (overlay) overlay.style.display = 'none';
  },

  manualLookup() {
    const q = document.getElementById('manual-search')?.value?.trim();
    const result = document.getElementById('manual-result');
    if (!result) return;
    if (!q) { result.innerHTML = '<div style="color:#ef4444;font-size:13px">Please enter a mobile number or Registration ID.</div>'; return; }

    const reg = D.registrations.find(r => r.mobile.replace(/\s/g,'').includes(q.replace(/\s/g,'')) || r.id.toLowerCase()===q.toLowerCase());
    if (!reg) {
      result.innerHTML = `<div style="background:#fee2e2;border-radius:8px;padding:12px;font-size:13px;color:#dc2626">No registration found for "<strong>${q}</strong>". Please check the number or ID and try again.</div>`;
      return;
    }

    result.innerHTML = `
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:14px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
          <div>
            <div style="font-size:15px;font-weight:700;color:#1e293b">${reg.name}</div>
            <div style="font-size:12px;color:#64748b">${reg.mobile} · ${reg.id}</div>
          </div>
          <span class="badge ${reg.checkin==='checked_in'?'badge-green':'badge-gray'}">${reg.checkin==='checked_in'?'Checked-In':'Pending'}</span>
        </div>
        ${reg.checkin==='checked_in'
          ? `<div style="font-size:13px;color:#dc2626;margin-bottom:8px">⚠️ This user is already checked in.</div>`
          : `<button class="btn btn-primary" style="width:100%;justify-content:center" onclick="ScannerPage.manualCheckin('${reg.id}')">${icon('check',15)} Confirm Manual Check-In</button>`
        }
      </div>`;
  },

  manualCheckin(regId) {
    showModal(`
      <div style="text-align:center">
        <div style="font-size:40px;margin-bottom:8px">👤</div>
        <div style="font-size:17px;font-weight:700;color:#1e293b">Manual Check-In</div>
        <div style="font-size:14px;color:#64748b;margin-top:8px">This check-in will be flagged as <strong>manual</strong> and logged with your name. Proceed?</div>
        <div style="display:flex;gap:10px;margin-top:16px">
          <button class="btn btn-secondary" style="flex:1;justify-content:center" onclick="closeModal()">Cancel</button>
          <button class="btn btn-primary" style="flex:1;justify-content:center" onclick="closeModal();toast('Manual check-in recorded for ${regId}','success')">Confirm Check-In</button>
        </div>
      </div>
    `);
  }
};
