window.ScannerPage = {
  _scanning: false,
  _demo: ['valid','valid','valid','already_used','invalid','valid'],
  _demoIdx: 0,

  render() {
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

    // Auto-close valid scans after 2s
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
