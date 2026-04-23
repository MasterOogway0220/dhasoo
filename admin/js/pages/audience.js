window.AudiencePage = {

  // ── State ────────────────────────────────────────────────────────────────
  _filter: 'all',   // 'all' | 'active' | 'blacklisted'
  _search: '',

  render(params) {
    return isMobile() ? this.renderMobile(params) : this.renderDesktop(params);
  },

  // ── Helper: generate a stable BaRCo from user id ─────────────────────────
  _barco(user) {
    if (user.activeShow && user.activeShow.regId) return user.activeShow.regId;
    // derive a stable code from the user id string
    const seed = (user.id || '').replace(/\D/g, '') || '000001';
    return 'DTAU-' + seed.padStart(6, '0');
  },

  // ── Build the user list (D.users augmented with D.audience data) ──────────
  _getUsers() {
    // D.users is the primary list; merge any extra audience entries by id
    const audienceMap = {};
    (D.audience || []).forEach(u => { audienceMap[u.id] = u; });
    return (D.users || []).map(u => Object.assign({}, audienceMap[u.id] || {}, u));
  },

  // =========================================================================
  //  LIST VIEW
  // =========================================================================

  showAudienceList() {
    const container = document.getElementById('app') || document.body;
    if (isMobile()) {
      container.innerHTML = this._renderMobileList();
    } else {
      container.innerHTML = this._renderDesktopList();
    }
    this._bindListEvents();
    if (window.lucide) lucide.createIcons();
  },

  _filteredUsers() {
    const users = this._getUsers();
    const q = (this._search || '').toLowerCase();
    return users.filter(u => {
      const matchFilter =
        this._filter === 'all' ||
        (this._filter === 'active'      && u.status !== 'blacklist') ||
        (this._filter === 'blacklisted' && u.status === 'blacklist');
      const matchSearch = !q ||
        (u.name   || '').toLowerCase().includes(q) ||
        (u.mobile || '').includes(q) ||
        (u.city   || '').toLowerCase().includes(q) ||
        (u.email  || '').toLowerCase().includes(q);
      return matchFilter && matchSearch;
    });
  },

  _statusBadge(status) {
    if (status === 'blacklist') {
      return `<span style="background:#fee2e2;color:#dc2626;font-size:11px;font-weight:700;padding:2px 9px;border-radius:20px">Blacklisted</span>`;
    }
    return `<span style="background:#dcfce7;color:#16a34a;font-size:11px;font-weight:700;padding:2px 9px;border-radius:20px">Active</span>`;
  },

  _renderDesktopList() {
    const users = this._filteredUsers();
    const total = this._getUsers().length;
    const chips = [
      { key: 'all',         label: 'All' },
      { key: 'active',      label: 'Active' },
      { key: 'blacklisted', label: 'Blacklisted' },
    ].map(c => {
      const active = this._filter === c.key;
      return `<button
        onclick="AudiencePage._filter='${c.key}';AudiencePage.showAudienceList()"
        style="padding:5px 14px;border-radius:20px;border:1.5px solid ${active ? '#3B4FDB' : '#e2e8f0'};
               background:${active ? '#3B4FDB' : '#fff'};color:${active ? '#fff' : '#64748b'};
               font-size:12px;font-weight:600;cursor:pointer">${c.label}</button>`;
    }).join('');

    const rows = users.map(u => `
      <tr onclick="AudiencePage.showAudienceDetail('${u.id}')"
          style="cursor:pointer;transition:background .15s"
          onmouseover="this.style.background='#f8fafc'"
          onmouseout="this.style.background=''">
        <td style="padding:12px 16px">
          <div style="display:flex;align-items:center;gap:10px">
            <div class="avatar ${u.avatar || 'av-indigo'}" style="width:34px;height:34px;font-size:12px;flex-shrink:0">${u.initials}</div>
            <div>
              <div style="font-size:13px;font-weight:600;color:#1e293b">${u.name}</div>
              <div style="font-size:11px;color:#94a3b8">${u.email || ''}</div>
            </div>
          </div>
        </td>
        <td style="padding:12px 16px;font-size:13px;color:#374151">${u.mobile}</td>
        <td style="padding:12px 16px;font-size:13px;color:#374151">${u.city}</td>
        <td style="padding:12px 16px;font-size:12px;color:#64748b;font-family:monospace">${this._barco(u)}</td>
        <td style="padding:12px 16px;font-size:12px;color:#94a3b8">${u.regDate || u.memberSince || '—'}</td>
        <td style="padding:12px 16px;font-size:13px;font-weight:700;color:#1e293b;text-align:center">${u.attended || u.totalShows || 0}</td>
        <td style="padding:12px 16px">${this._statusBadge(u.status)}</td>
      </tr>`).join('');

    const emptyRow = users.length === 0
      ? `<tr><td colspan="7" style="padding:40px;text-align:center;color:#94a3b8;font-size:13px">No users found</td></tr>`
      : '';

    return `
    <div style="max-width:1100px;margin:0 auto">
      <!-- Header -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px">
        <div style="display:flex;align-items:center;gap:10px">
          <h1 style="font-size:22px;font-weight:800;color:#0F172A;margin:0">Users</h1>
          <span style="background:#EEF0FB;color:#3B4FDB;font-size:12px;font-weight:700;padding:3px 10px;border-radius:20px">${total}</span>
        </div>
        <button class="btn btn-primary btn-sm" onclick="AudiencePage._exportCSV()">${icon('download',14)} Export CSV</button>
      </div>

      <!-- Search + Filters -->
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;flex-wrap:wrap">
        <div style="position:relative;flex:1;min-width:200px;max-width:320px">
          <span style="position:absolute;left:10px;top:50%;transform:translateY(-50%);color:#94a3b8">${icon('search',14)}</span>
          <input class="input" type="text" placeholder="Search name, mobile, city…"
            value="${this._search}"
            oninput="AudiencePage._search=this.value;AudiencePage.showAudienceList()"
            style="padding-left:32px;font-size:13px">
        </div>
        <div style="display:flex;gap:8px">${chips}</div>
      </div>

      <!-- Table -->
      <div class="card" style="padding:0;overflow:hidden">
        <table style="width:100%;border-collapse:collapse">
          <thead>
            <tr style="background:#f8fafc;border-bottom:1px solid #f1f5f9">
              <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:0.06em">NAME</th>
              <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:0.06em">MOBILE</th>
              <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:0.06em">CITY</th>
              <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:0.06em">BaRCo</th>
              <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:0.06em">REGISTERED ON</th>
              <th style="padding:10px 16px;text-align:center;font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:0.06em">SHOWS</th>
              <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:0.06em">STATUS</th>
            </tr>
          </thead>
          <tbody>${rows}${emptyRow}</tbody>
        </table>
      </div>
    </div>`;
  },

  _renderMobileList() {
    const users = this._filteredUsers();
    const total = this._getUsers().length;
    const chips = [
      { key: 'all',         label: 'All' },
      { key: 'active',      label: 'Active' },
      { key: 'blacklisted', label: 'Blacklisted' },
    ].map(c => {
      const active = this._filter === c.key;
      return `<button
        onclick="AudiencePage._filter='${c.key}';AudiencePage.showAudienceList()"
        style="padding:5px 14px;border-radius:20px;border:1.5px solid ${active ? '#3B4FDB' : '#e2e8f0'};
               background:${active ? '#3B4FDB' : '#fff'};color:${active ? '#fff' : '#64748b'};
               font-size:12px;font-weight:600;cursor:pointer;white-space:nowrap">${c.label}</button>`;
    }).join('');

    const cards = users.map(u => `
      <div onclick="AudiencePage.showAudienceDetail('${u.id}')"
           class="mob-card" style="display:flex;align-items:center;gap:12px;cursor:pointer;margin-bottom:8px">
        <div class="avatar ${u.avatar || 'av-indigo'}" style="width:42px;height:42px;font-size:14px;flex-shrink:0">${u.initials}</div>
        <div style="flex:1;min-width:0">
          <div style="font-size:14px;font-weight:700;color:#0F172A;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${u.name}</div>
          <div style="font-size:12px;color:#64748b">${u.mobile} · ${u.city}</div>
          <div style="font-size:11px;color:#94a3b8;margin-top:2px">${u.attended || u.totalShows || 0} shows</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px;flex-shrink:0">
          ${this._statusBadge(u.status)}
          <span style="color:#cbd5e1">${icon('chevron-right',14)}</span>
        </div>
      </div>`).join('');

    const empty = users.length === 0
      ? `<div style="text-align:center;padding:40px;color:#94a3b8;font-size:13px">No users found</div>`
      : '';

    return `
    <div style="background:#ECEEF5;min-height:100vh;padding-bottom:80px">
      <!-- Header -->
      <div style="background:#fff;padding:16px 16px 0;box-shadow:0 2px 8px rgba(0,0,0,0.06)">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
          <div style="display:flex;align-items:center;gap:8px">
            <span style="font-size:18px;font-weight:800;color:#0F172A">Users</span>
            <span style="background:#EEF0FB;color:#3B4FDB;font-size:11px;font-weight:700;padding:2px 8px;border-radius:20px">${total}</span>
          </div>
          <button class="mob-btn-primary" style="padding:6px 12px;font-size:12px" onclick="AudiencePage._exportCSV()">${icon('download',13)} Export</button>
        </div>
        <div style="position:relative;margin-bottom:12px">
          <span style="position:absolute;left:10px;top:50%;transform:translateY(-50%);color:#94a3b8">${icon('search',14)}</span>
          <input class="input" type="text" placeholder="Search…" value="${this._search}"
            oninput="AudiencePage._search=this.value;AudiencePage.showAudienceList()"
            style="padding-left:32px;font-size:13px">
        </div>
        <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:12px;scrollbar-width:none">${chips}</div>
      </div>

      <div style="padding:12px 16px">${cards}${empty}</div>
    </div>`;
  },

  _bindListEvents() {
    // Nothing extra needed — all events are inline onclick
  },

  // =========================================================================
  //  DETAIL VIEW
  // =========================================================================

  showAudienceDetail(userId) {
    const users = this._getUsers();
    // look up in combined list; fall back to D.audience then D.users
    let user = users.find(u => u.id === userId);
    if (!user) user = (D.audience || []).find(u => u.id === userId);
    if (!user) user = (D.users  || []).find(u => u.id === userId);
    if (!user) { toast('User not found', 'error'); return; }

    const container = document.getElementById('app') || document.body;
    if (isMobile()) {
      container.innerHTML = this._renderMobileDetail(user);
    } else {
      container.innerHTML = this._renderDesktopDetail(user);
    }
    if (window.lucide) lucide.createIcons();
  },

  _renderDesktopDetail(user) {
    const repColor = (user.reputation >= 800 || user.reputation === 'Excellent')
      ? '#22c55e'
      : (user.reputation >= 600 || user.reputation === 'Good')
        ? '#f97316'
        : '#ef4444';
    const repScore = typeof user.reputation === 'number' ? user.reputation : { Excellent: 900, Good: 700, Flagged: 400, Poor: 200, New: 500 }[user.reputation] || 500;

    const historyRows = (user.history || []).map(h => {
      const badge = h.status === 'attended' ? 'badge-green' : 'badge-red';
      const label = h.status === 'attended' ? 'Attended' : 'No-Show';
      return `
        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid #f8fafc">
          <div>
            <div style="font-size:13px;font-weight:600;color:#1e293b">${h.show}</div>
            <div style="font-size:12px;color:#94a3b8">${h.date}</div>
          </div>
          <span class="badge ${badge}" style="font-size:11px">${label}</span>
        </div>`;
    }).join('') || `<div style="font-size:13px;color:#94a3b8;padding:12px 0">No attendance history</div>`;

    const logItems = (user.callLog || []).map(l => {
      const cfg = {
        confirmed: { color: 'bg-green-100 text-green-600', ic: 'check-circle', label: 'Verification Call' },
        sms:       { color: 'bg-blue-100 text-blue-600',   ic: 'message-square', label: 'Auto Confirmation Message' },
        reminder:  { color: 'bg-yellow-100 text-yellow-600', ic: 'bell', label: 'Reminder Call' },
      }[l.outcome] || { color: 'bg-gray-100 text-gray-600', ic: 'phone', label: 'Call' };

      return `
        <div class="log-item">
          <div class="log-dot ${cfg.color}" style="width:30px;height:30px">${icon(cfg.ic, 14)}</div>
          <div style="flex:1">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
              <div style="font-size:13px;font-weight:600;color:#1e293b">${cfg.label}</div>
              <div style="font-size:11px;color:#94a3b8">${l.date}</div>
            </div>
            <div style="font-size:12px;color:#64748b;margin-bottom:4px">Agent: ${l.agent}</div>
            <div style="font-size:13px;color:#374151;background:#f8fafc;padding:8px;border-radius:8px">${l.remark}</div>
          </div>
        </div>`;
    }).join('') || `<div style="font-size:13px;color:#94a3b8;padding:12px 0">No communication log</div>`;

    const activeShow = user.activeShow;
    const activeShowSection = activeShow ? `
      <div class="card" style="padding:18px;margin-bottom:14px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
          <span style="font-size:13px;font-weight:600;color:#1e293b">Active Registration</span>
          <span class="badge badge-green">ACTIVE REGISTRATION</span>
        </div>
        <div style="font-size:17px;font-weight:700;color:#1e293b;margin-bottom:8px">${activeShow.name}</div>
        <div style="font-size:13px;color:#64748b;margin-bottom:10px">Reg ID: ${activeShow.regId} · Ticket: <span class="badge badge-blue">${(activeShow.ticketStatus || 'pending').toUpperCase()}</span></div>
        <div style="background:#f0fdf4;border-radius:10px;padding:16px;text-align:center;margin-bottom:12px">
          <div style="font-size:11px;color:#94a3b8;margin-bottom:8px">QR TICKET PREVIEW</div>
          <div style="width:80px;height:80px;background:#1e293b;border-radius:8px;margin:0 auto;display:flex;align-items:center;justify-content:center;font-size:28px">🎟️</div>
          <div style="font-size:11px;color:#94a3b8;margin-top:6px">${activeShow.regId}</div>
        </div>
        <div style="display:flex;gap:8px">
          <button class="btn btn-secondary btn-sm" onclick="toast('Ticket resent via SMS','success')">${icon('send', 13)} Resend SMS</button>
          <button class="btn btn-secondary btn-sm" onclick="toast('Ticket resent via WhatsApp','success')">${icon('message-circle', 13)} WhatsApp</button>
          <button class="btn btn-danger btn-sm" onclick="toast('Registration cancelled','error')">${icon('x', 13)} Cancel</button>
        </div>
      </div>` : `
      <div class="card" style="padding:18px;margin-bottom:14px">
        <div style="font-size:13px;font-weight:600;color:#1e293b;margin-bottom:8px">Active Registration</div>
        <div style="font-size:13px;color:#94a3b8">No active registration</div>
      </div>`;

    return `
    <div style="max-width:1100px;margin:0 auto">
      <button class="btn btn-ghost btn-sm" style="margin-bottom:16px" onclick="AudiencePage.showAudienceList()">${icon('arrow-left', 15)} Back to Users</button>

      <div style="display:grid;grid-template-columns:300px 1fr 220px;gap:18px;align-items:start">

        <!-- Left: Profile -->
        <div>
          <div class="card" style="padding:20px;text-align:center;margin-bottom:14px">
            <div style="position:relative;display:inline-block;margin-bottom:12px">
              <div class="avatar ${user.avatar || 'av-indigo'}" style="width:72px;height:72px;font-size:22px;margin:0 auto">${user.initials}</div>
              <div style="position:absolute;bottom:0;right:0;width:18px;height:18px;background:#22c55e;border-radius:50%;border:2px solid #fff"></div>
            </div>
            <div style="font-size:17px;font-weight:700;color:#1e293b">${user.name}</div>
            <div style="font-size:12px;color:#94a3b8;margin-top:2px">Member since ${user.memberSince || user.regDate || '—'}</div>

            <div style="display:flex;justify-content:center;gap:10px;margin:14px 0">
              <button class="btn btn-primary btn-sm" onclick="toast('Opening dialler…','info')">${icon('phone', 14)} Call</button>
              <button class="btn" style="background:#25D366;color:#fff;padding:5px 12px;font-size:13px" onclick="toast('Opening WhatsApp…','info')">${icon('message-circle', 14)} WhatsApp</button>
            </div>

            <div style="text-align:left;border-top:1px solid #f1f5f9;padding-top:14px">
              <div style="font-size:12px;color:#94a3b8;margin-bottom:10px;font-weight:600">PROFILE DETAILS</div>
              ${[
                ['Age / Gender', `${user.age || '—'} / ${user.gender || '—'}`],
                ['City',         user.city || '—'],
                ['Mobile',       user.mobile],
                ['Email',        user.email || '—'],
                ['DOB',          user.dob || '—'],
              ].map(([k, v]) => `
                <div style="display:flex;justify-content:space-between;margin-bottom:8px">
                  <span style="font-size:12px;color:#94a3b8">${k}</span>
                  <span style="font-size:13px;color:#374151;font-weight:500">${v}</span>
                </div>`).join('')}
            </div>

            <div style="background:#f8fafc;border-radius:10px;padding:12px;margin-top:10px">
              <div style="font-size:11px;color:#94a3b8;font-weight:600;margin-bottom:6px">REPUTATION SCORE</div>
              <div style="font-size:32px;font-weight:800;color:${repColor}">${repScore}</div>
              <div class="progress-bar" style="margin-top:6px"><div class="progress-fill green" style="width:${repScore / 10}%"></div></div>
              <div style="display:flex;justify-content:space-between;margin-top:4px;font-size:11px;color:#94a3b8"><span>0</span><span>1000</span></div>
            </div>
          </div>

          <!-- Stats -->
          <div class="card" style="padding:16px">
            <div style="font-size:13px;font-weight:600;color:#1e293b;margin-bottom:12px">Attendance Stats</div>
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;text-align:center">
              <div><div style="font-size:20px;font-weight:700;color:#1e293b">${user.totalShows || (user.attended || 0) + (user.noShows || 0)}</div><div style="font-size:11px;color:#94a3b8">Total</div></div>
              <div><div style="font-size:20px;font-weight:700;color:#22c55e">${user.attended || 0}</div><div style="font-size:11px;color:#94a3b8">Attended</div></div>
              <div><div style="font-size:20px;font-weight:700;color:#ef4444">${user.noShows || 0}</div><div style="font-size:11px;color:#94a3b8">No-Shows</div></div>
            </div>
          </div>
        </div>

        <!-- Centre: Active show + Log -->
        <div>
          ${activeShowSection}

          <!-- Call Log -->
          <div class="card" style="padding:18px;margin-bottom:14px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
              <div style="font-size:15px;font-weight:600;color:#1e293b">Call &amp; Communication Log</div>
              <button class="btn btn-primary btn-sm" onclick="AudiencePage.openCallLog()">+ Add Note</button>
            </div>
            ${logItems}
          </div>

          <!-- Past Attendance -->
          <div class="card" style="padding:18px">
            <div style="font-size:15px;font-weight:600;color:#1e293b;margin-bottom:12px">Past Attendance</div>
            ${historyRows}
          </div>
        </div>

        <!-- Right: Internal Notes + Next Action -->
        <div>
          <div class="card" style="padding:16px;margin-bottom:14px">
            <div style="font-size:13px;font-weight:600;color:#1e293b;margin-bottom:10px">Internal Notes</div>
            <textarea class="input" rows="6" style="font-size:13px;resize:none" placeholder="Add a quick note about this audience member…"></textarea>
            <button class="btn btn-primary" style="width:100%;justify-content:center;margin-top:10px" onclick="toast('Note saved','success')">Save Note</button>
          </div>

          <!-- Next Action -->
          <div class="card" style="padding:16px;background:#f0fdf4;border:1px solid #bbf7d0">
            <div style="font-size:12px;font-weight:600;color:#16a34a;margin-bottom:8px">NEXT ACTION RECOMMENDATION</div>
            <div style="font-size:13px;color:#374151;margin-bottom:10px">Based on past data, this user is a <strong>${user.reputation === 'Excellent' || repScore >= 800 ? 'reliable attendee' : 'standard member'}</strong>. ${repScore >= 800 ? 'A reminder SMS 24h before the show is sufficient.' : 'A confirmation call is recommended.'}</div>
            <div style="font-size:26px;font-weight:800;color:#22c55e;text-align:center;margin-bottom:4px">${Math.min(99, Math.round(repScore / 10))}%</div>
            <div style="font-size:11px;color:#94a3b8;text-align:center">Predicted show-up probability</div>
          </div>
        </div>
      </div>
    </div>`;
  },

  _renderMobileDetail(user) {
    const repColor = (user.reputation >= 800 || user.reputation === 'Excellent')
      ? '#22c55e'
      : '#f97316';

    const logItems = (user.callLog || []).map(l => {
      const cfg = {
        confirmed: { ic: 'phone-call', color: '#3B4FDB', bg: '#EEF0FB', label: 'Outbound Call' },
        sms:       { ic: 'mail',       color: '#8b5cf6', bg: '#f3e8ff', label: 'Auto-Broadcast Sent' },
        reminder:  { ic: 'message-square', color: '#0ea5e9', bg: '#e0f2fe', label: 'WhatsApp Message' },
      }[l.outcome] || { ic: 'phone', color: '#64748b', bg: '#f1f5f9', label: 'Call' };

      return `
      <div style="display:flex;gap:12px;padding:12px 0;border-bottom:1px solid #f1f5f9">
        <div style="width:36px;height:36px;border-radius:10px;background:${cfg.bg};display:flex;align-items:center;justify-content:center;color:${cfg.color};flex-shrink:0">${icon(cfg.ic, 16)}</div>
        <div style="flex:1">
          <div style="display:flex;justify-content:space-between;margin-bottom:3px">
            <span style="font-size:13px;font-weight:600;color:#1e293b">${cfg.label}</span>
            <span style="font-size:11px;color:#94a3b8">${l.date.split(',')[0]}</span>
          </div>
          <div style="font-size:12px;color:#64748b;line-height:1.5">${l.remark}</div>
        </div>
      </div>`;
    }).join('') || `<div style="font-size:13px;color:#94a3b8;padding:12px 0">No communication log</div>`;

    const activeShow = user.activeShow;

    return `
    <div style="background:#ECEEF5;min-height:100vh;padding-bottom:80px">

      <!-- Back button -->
      <div style="background:#fff;padding:12px 16px;border-bottom:1px solid #f1f5f9">
        <button onclick="AudiencePage.showAudienceList()"
          style="display:flex;align-items:center;gap:6px;background:none;border:none;color:#3B4FDB;font-size:14px;font-weight:600;cursor:pointer;padding:0">
          ${icon('arrow-left', 15)} Back to Users
        </button>
      </div>

      <!-- Profile card -->
      <div style="background:#fff;border-radius:0 0 24px 24px;padding:20px 20px 24px;margin-bottom:12px;box-shadow:0 4px 20px rgba(59,79,219,0.08)">
        <div style="text-align:center;margin-bottom:16px">
          <div class="avatar ${user.avatar || 'av-indigo'}" style="width:80px;height:80px;font-size:26px;margin:0 auto 12px;border-radius:20px;position:relative">
            ${user.initials}
            <div style="position:absolute;bottom:-4px;right:-4px;width:18px;height:18px;background:#22c55e;border-radius:50%;border:2px solid #fff"></div>
          </div>
          <div style="font-size:20px;font-weight:800;color:#0F172A">${user.name}</div>
          <div style="font-size:13px;color:#64748b;margin-top:2px">${user.reputation === 'Excellent' || user.reputation >= 800 ? 'Reliable Attendee' : 'Standard Member'} · ${user.city}</div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
          <button class="mob-btn-primary" onclick="toast('Opening dialler…','info')">${icon('phone', 16)} Call</button>
          <button class="mob-btn-outline" onclick="toast('Opening WhatsApp…','info')">${icon('message-circle', 16)} WhatsApp</button>
        </div>
      </div>

      <div style="padding:0 16px">
        <!-- Stats row -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px">
          <div class="mob-card" style="margin-bottom:0">
            <div style="font-size:10px;font-weight:700;color:#94a3b8;letter-spacing:0.06em;margin-bottom:4px">TOTAL ATTENDANCE</div>
            <div style="font-size:20px;font-weight:800;color:#3B4FDB">${user.totalShows || user.attended || 0} Shows</div>
          </div>
          <div class="mob-card" style="margin-bottom:0">
            <div style="font-size:10px;font-weight:700;color:#94a3b8;letter-spacing:0.06em;margin-bottom:4px">LAST INTERACTION</div>
            <div style="font-size:20px;font-weight:800;color:#0F172A">${user.lastAttended || '—'}</div>
          </div>
        </div>

        ${activeShow ? `
        <!-- Active Registration -->
        <div class="mob-card">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
            <span style="font-size:15px;font-weight:700;color:#0F172A">Active Registration</span>
            <span style="background:#EEF0FB;color:#3B4FDB;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px">UPCOMING</span>
          </div>
          <div style="display:flex;gap:12px;align-items:center;margin-bottom:14px">
            <div style="width:52px;height:52px;border-radius:12px;background:#1e293b;display:flex;align-items:center;justify-content:center;font-size:22px">🎵</div>
            <div>
              <div style="font-size:14px;font-weight:700;color:#0F172A">${activeShow.name}</div>
              <div style="font-size:12px;color:#64748b">${activeShow.date} · ${(activeShow.venue || '').split(',')[0]}</div>
            </div>
          </div>
          <button style="width:100%;padding:12px;border-radius:12px;border:1.5px solid #ef4444;background:transparent;color:#ef4444;font-size:14px;font-weight:600;cursor:pointer" onclick="toast('Registration cancelled','error')">Cancel Registration</button>
        </div>` : ''}

        <!-- Communication Log -->
        <div style="font-size:17px;font-weight:700;color:#0F172A;margin:16px 0 10px">Communication Log</div>
        <div class="mob-card">${logItems}</div>
      </div>
    </div>`;
  },

  // =========================================================================
  //  ENTRY POINT
  // =========================================================================

  renderMobile(params) {
    // Initial render goes to list; detail is triggered by row click
    return this._renderMobileList();
  },

  renderDesktop(params) {
    return this._renderDesktopList();
  },

  init() {
    // Reset filter/search state on each page load
    this._filter = 'all';
    this._search = '';
  },

  // =========================================================================
  //  EXPORT CSV
  // =========================================================================

  _exportCSV() {
    const users = this._getUsers();
    const header = ['Name', 'Mobile', 'City', 'BaRCo', 'Email', 'Registered On', 'Shows Attended', 'No-Shows', 'Status'];
    const rows = users.map(u => [
      u.name,
      u.mobile,
      u.city,
      this._barco(u),
      u.email || '',
      u.regDate || u.memberSince || '',
      u.attended || u.totalShows || 0,
      u.noShows || 0,
      u.status,
    ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(','));

    const csv = [header.join(','), ...rows].join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dhaasoo-users.csv';
    a.click();
    URL.revokeObjectURL(url);
    toast('CSV exported', 'success');
  },

  // =========================================================================
  //  CALL LOG MODAL
  // =========================================================================

  openCallLog() {
    showModal(`
      <div style="font-size:16px;font-weight:700;color:#1e293b;margin-bottom:16px">Log Call Outcome</div>
      <div style="display:flex;flex-direction:column;gap:12px">
        <div>
          <label style="font-size:12px;font-weight:600;color:#64748b;display:block;margin-bottom:5px">CALL OUTCOME</label>
          <select class="select" style="width:100%">
            <option>Confirmed</option><option>Declined</option><option>No Answer</option>
            <option>Wrong Number</option><option>Callback Requested</option><option>Do Not Disturb</option>
          </select>
        </div>
        <div>
          <label style="font-size:12px;font-weight:600;color:#64748b;display:block;margin-bottom:5px">GUESTS CONFIRMED</label>
          <input class="input" type="number" value="1" min="1">
        </div>
        <div>
          <label style="font-size:12px;font-weight:600;color:#64748b;display:block;margin-bottom:5px">REMARKS</label>
          <textarea class="input" rows="3" placeholder="Notes about the call…"></textarea>
        </div>
      </div>
      <div style="display:flex;gap:10px;margin-top:16px">
        <button class="btn btn-secondary" style="flex:1;justify-content:center" onclick="closeModal()">Cancel</button>
        <button class="btn btn-primary" style="flex:1;justify-content:center" onclick="closeModal();toast('Call outcome saved','success')">Save Outcome</button>
      </div>
    `);
  }
};
