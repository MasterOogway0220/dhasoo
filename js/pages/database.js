window.DatabasePage = {
  render() {
    const repCfg = {
      Excellent: 'badge-green',
      Good:      'badge-blue',
      Flagged:   'badge-yellow',
      Poor:      'badge-orange',
      New:       'badge-gray',
    };
    const statusCfg = {
      active:    'badge-green',
      flagged:   'badge-yellow',
      blacklist: 'badge-red',
    };

    const rows = D.users.map(u => `
      <tr onclick="navigate('audience',{userId:'${u.id}'})">
        <td>
          <div style="display:flex;align-items:center;gap:10px">
            <div class="avatar ${u.avatar}" style="width:36px;height:36px;font-size:13px">${u.initials}</div>
            <div>
              <div style="font-weight:600;color:#1e293b;font-size:13px">${u.name}</div>
              <div style="font-size:12px;color:#94a3b8">${u.location}</div>
            </div>
          </div>
        </td>
        <td style="font-size:13px;color:#374151">${u.location.split(',')[0]}</td>
        <td>
          <div style="display:flex;align-items:center;gap:6px">
            <div class="avatar av-green" style="width:24px;height:24px;font-size:10px">${u.attended}</div>
            <span style="font-size:12px;color:#22c55e">attended</span>
          </div>
        </td>
        <td style="font-size:13px;color:${u.noShows>2?'#ef4444':'#374151'};font-weight:${u.noShows>2?'600':'400'}">${u.noShows}</td>
        <td><span class="badge ${repCfg[u.reputation]||'badge-gray'}">${u.reputation}</span></td>
        <td><span class="badge ${statusCfg[u.status]||'badge-gray'}">${u.status.charAt(0).toUpperCase()+u.status.slice(1)}</span></td>
        <td onclick="event.stopPropagation()">
          <div style="display:flex;gap:6px">
            <button class="btn btn-ghost btn-sm" onclick="navigate('audience',{userId:'${u.id}'})">${icon('eye',13)}</button>
            <button class="btn btn-ghost btn-sm" onclick="DatabasePage.blockUser('${u.id}')">${icon('ban',13)}</button>
          </div>
        </td>
      </tr>`).join('');

    return `
    <div style="max-width:1100px;margin:0 auto">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:22px">
        <div>
          <h1 style="font-size:22px;font-weight:700;color:#1e293b">Master Audience Database</h1>
          <p style="font-size:13px;color:#94a3b8;margin-top:2px">Manage the complete lifecycle of attendees across the India network. Track reputation scores and operational status in real time.</p>
        </div>
        <div style="display:flex;gap:10px">
          <button class="btn btn-secondary" onclick="toast('Exporting database…','info')">${icon('download',15)} Export CSV</button>
          <button class="btn btn-primary" onclick="DatabasePage.openAddUser()">${icon('user-plus',15)} Add New User</button>
        </div>
      </div>

      <!-- Filters -->
      <div style="display:flex;gap:10px;margin-bottom:16px;flex-wrap:wrap">
        <input class="input" id="db-search" placeholder="Search by Name or Mobile Number" style="flex:1;min-width:200px" oninput="DatabasePage.filterRows()">
        <select class="select" id="db-city" onchange="DatabasePage.filterRows()">
          <option value="">All Cities</option>
          <option>Mumbai</option><option>Delhi</option><option>Bangalore</option><option>Pune</option><option>Hyderabad</option><option>Chennai</option>
        </select>
        <select class="select" id="db-rep" onchange="DatabasePage.filterRows()">
          <option value="">Any Score</option>
          <option>Excellent</option><option>Good</option><option>Flagged</option><option>Poor</option><option>New</option>
        </select>
        <select class="select" id="db-status" onchange="DatabasePage.filterRows()">
          <option value="">All Status</option>
          <option value="active">Active</option><option value="flagged">Flagged</option><option value="blacklist">Blacklisted</option>
        </select>
        <button class="btn btn-ghost btn-sm" onclick="DatabasePage.clearFilters()">${icon('x',14)} Clear</button>
      </div>

      <!-- Table -->
      <div class="card" style="overflow:hidden;margin-bottom:16px">
        <div style="overflow-x:auto">
          <table class="data-table">
            <thead>
              <tr>
                <th>USER PROFILE</th>
                <th>LOCATION</th>
                <th>ATTENDANCE</th>
                <th>NO-SHOWS</th>
                <th>REPUTATION</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody id="db-tbody">${rows}</tbody>
          </table>
        </div>
        <div style="padding:12px 16px;border-top:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between">
          <div style="font-size:13px;color:#94a3b8">Showing 1–20 of <strong>4,124,802</strong> registered users</div>
          <div style="display:flex;gap:6px">
            <button class="btn btn-secondary btn-sm">${icon('chevron-left',14)}</button>
            <button class="btn btn-primary btn-sm">1</button>
            <button class="btn btn-secondary btn-sm">2</button>
            <button class="btn btn-secondary btn-sm">3</button>
            <span style="color:#94a3b8;line-height:30px">…</span>
            <button class="btn btn-secondary btn-sm">188</button>
            <button class="btn btn-secondary btn-sm">${icon('chevron-right',14)}</button>
          </div>
        </div>
      </div>

      <!-- Stats row -->
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px">
        <div class="card" style="padding:16px">
          <div style="font-size:11px;font-weight:600;color:#94a3b8;margin-bottom:6px">NO-SHOW RATE</div>
          <div style="font-size:28px;font-weight:800;color:#ef4444">14.2%</div>
          <div style="font-size:12px;color:#94a3b8;margin-top:4px">Users with 3+ no-shows in last 6 months</div>
        </div>
        <div class="card" style="padding:16px">
          <div style="font-size:11px;font-weight:600;color:#94a3b8;margin-bottom:6px">FLAGGED USERS</div>
          <div style="font-size:28px;font-weight:800;color:#f97316">128</div>
          <div style="font-size:12px;color:#94a3b8;margin-top:4px">Currently flagged for review</div>
        </div>
        <div class="card" style="padding:16px">
          <div style="font-size:11px;font-weight:600;color:#94a3b8;margin-bottom:6px">REPUTATION TREND</div>
          <div style="font-size:28px;font-weight:800;color:#22c55e">+18.5%</div>
          <div style="font-size:12px;color:#94a3b8;margin-top:4px">Improvement vs last quarter</div>
        </div>
      </div>
    </div>`;
  },

  init() {},

  filterRows() {
    const q      = (document.getElementById('db-search')?.value||'').toLowerCase();
    const rep    = (document.getElementById('db-rep')?.value||'').toLowerCase();
    const status = (document.getElementById('db-status')?.value||'').toLowerCase();

    document.querySelectorAll('#db-tbody tr').forEach(row => {
      const text = row.textContent.toLowerCase();
      const matchQ      = !q      || text.includes(q);
      const matchRep    = !rep    || text.includes(rep);
      const matchStatus = !status || text.includes(status);
      row.style.display = (matchQ && matchRep && matchStatus) ? '' : 'none';
    });
  },

  clearFilters() {
    ['db-search','db-city','db-rep','db-status'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    this.filterRows();
  },

  blockUser(id) {
    showModal(`
      <div style="text-align:center;margin-bottom:16px">
        <div style="font-size:40px;margin-bottom:8px">🚫</div>
        <div style="font-size:18px;font-weight:700;color:#1e293b">Block / Blacklist User?</div>
        <div style="font-size:14px;color:#64748b;margin-top:8px">This user will be prevented from registering for any future shows until unblocked by a Super Admin.</div>
      </div>
      <div style="margin-bottom:14px">
        <label style="font-size:12px;font-weight:600;color:#64748b;display:block;margin-bottom:5px">REASON FOR BLOCK</label>
        <select class="select" style="width:100%">
          <option>Repeat No-Show (3+)</option><option>Suspicious Activity</option><option>Abusive Behaviour</option><option>Other</option>
        </select>
      </div>
      <div style="display:flex;gap:10px">
        <button class="btn btn-secondary" style="flex:1;justify-content:center" onclick="closeModal()">Cancel</button>
        <button class="btn btn-danger" style="flex:1;justify-content:center" onclick="closeModal();toast('User blacklisted','error')">Blacklist User</button>
      </div>
    `);
  },

  openAddUser() {
    showModal(`
      <div style="font-size:16px;font-weight:700;color:#1e293b;margin-bottom:14px">Add New User</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div style="grid-column:1/-1">
          <label style="font-size:11px;font-weight:600;color:#64748b;display:block;margin-bottom:5px">FULL NAME *</label>
          <input class="input" placeholder="Full name">
        </div>
        <div>
          <label style="font-size:11px;font-weight:600;color:#64748b;display:block;margin-bottom:5px">MOBILE *</label>
          <input class="input" placeholder="+91 XXXXX XXXXX">
        </div>
        <div>
          <label style="font-size:11px;font-weight:600;color:#64748b;display:block;margin-bottom:5px">EMAIL</label>
          <input class="input" type="email" placeholder="email@example.com">
        </div>
        <div>
          <label style="font-size:11px;font-weight:600;color:#64748b;display:block;margin-bottom:5px">CITY</label>
          <input class="input" placeholder="City">
        </div>
        <div>
          <label style="font-size:11px;font-weight:600;color:#64748b;display:block;margin-bottom:5px">DATE OF BIRTH</label>
          <input class="input" type="date">
        </div>
      </div>
      <div style="display:flex;gap:10px;margin-top:16px">
        <button class="btn btn-secondary" style="flex:1;justify-content:center" onclick="closeModal()">Cancel</button>
        <button class="btn btn-primary" style="flex:1;justify-content:center" onclick="closeModal();toast('User added','success')">Add User</button>
      </div>
    `);
  }
};
