window.ShowDetailPage = {
  render(params) {
    const showId = params.showId || 4;
    const show = D.shows.find(s=>s.id===showId) || D.shows[3];
    const regs = D.registrations.filter(r=>r.showId===showId);

    const callBadge = {
      confirmed:  ['badge-green',  'Confirmed'],
      declined:   ['badge-red',    'Declined'],
      no_answer:  ['badge-yellow', 'No Answer'],
      not_called: ['badge-gray',   'Not Called'],
      callback:   ['badge-blue',   'Callback'],
    };
    const checkinBadge = {
      checked_in: ['badge-green', 'Checked-In'],
      pending:    ['badge-gray',  'Pending'],
      na:         ['badge-gray',  'N/A'],
      no_show:    ['badge-red',   'No-Show'],
    };
    const ticketBadge = {
      sent:     ['badge-blue', 'Sent'],
      not_sent: ['badge-gray', 'Not Sent'],
    };

    const statusCfg = { active:'badge-green', full:'badge-orange', completed:'badge-gray', cancelled:'badge-red' };
    const pct = Math.round((show.filled/show.seats)*100);
    const confirmCount = regs.filter(r=>r.callStatus==='confirmed').length;
    const checkinCount = regs.filter(r=>r.checkin==='checked_in').length;

    const rows = regs.map(r => {
      const [cb, cl] = callBadge[r.callStatus] || ['badge-gray','Unknown'];
      const [tb, tl] = ticketBadge[r.ticket] || ['badge-gray','N/A'];
      const [chb, chl] = checkinBadge[r.checkin] || ['badge-gray','Pending'];
      return `
        <tr onclick="navigate('audience',{userId:'${r.id}'})">
          <td><input type="checkbox" onclick="event.stopPropagation()"></td>
          <td>
            <div style="display:flex;align-items:center;gap:10px">
              <div class="avatar ${r.avatar}" style="width:32px;height:32px;font-size:12px">${r.initials}</div>
              <div>
                <div style="font-weight:600;color:#1e293b;font-size:13px">${r.name}</div>
                <div style="font-size:11px;color:#94a3b8">Registered ${r.regDate.split(',')[0]}</div>
              </div>
            </div>
          </td>
          <td style="font-size:13px">${r.mobile}</td>
          <td><span class="badge ${cb}">${cl}</span></td>
          <td><span class="badge ${tb}">${tl}</span></td>
          <td><span class="badge ${chb}">${chl}</span></td>
          <td onclick="event.stopPropagation()">
            <button class="btn btn-ghost btn-sm" onclick="navigate('audience',{userId:'${r.id}'})">View Profile</button>
          </td>
        </tr>`;
    }).join('');

    return `
    <div style="max-width:1100px;margin:0 auto">
      <!-- Back -->
      <button class="btn btn-ghost btn-sm" style="margin-bottom:16px" onclick="navigate('shows')">${icon('arrow-left',15)} Back to Shows</button>

      <!-- Header card -->
      <div class="card" style="padding:24px;margin-bottom:20px;background:linear-gradient(135deg,#f8fafc,#fff)">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap">
          <div style="flex:1">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
              <span style="font-size:11px;font-weight:600;color:#2563eb;background:#dbeafe;padding:3px 10px;border-radius:20px">${show.type.toUpperCase()}</span>
              <span class="badge ${statusCfg[show.status]||'badge-gray'}" style="font-size:10px">${show.status==='active'?'LIVE NOW':show.status.toUpperCase()}</span>
            </div>
            <h1 style="font-size:26px;font-weight:800;color:#1e293b;margin-bottom:8px">${show.name}</h1>
            <div style="display:flex;gap:16px;flex-wrap:wrap">
              <span style="font-size:13px;color:#64748b;display:flex;align-items:center;gap:5px">${icon('calendar',14)} ${show.date} · ${show.time}</span>
              <span style="font-size:13px;color:#64748b;display:flex;align-items:center;gap:5px">${icon('map-pin',14)} ${show.venue}</span>
            </div>
          </div>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px">
            <div style="text-align:center">
              <div style="font-size:11px;font-weight:600;color:#94a3b8;margin-bottom:4px">SEATS FILLED</div>
              <div style="font-size:28px;font-weight:800;color:#1e293b">${show.filled.toLocaleString()} <span style="font-size:16px;color:#94a3b8">/ ${show.seats.toLocaleString()}</span></div>
            </div>
            <div style="text-align:center">
              <div style="font-size:11px;font-weight:600;color:#94a3b8;margin-bottom:4px">CONFIRMATIONS</div>
              <div style="font-size:28px;font-weight:800;color:#2563eb">${confirmCount}</div>
            </div>
            <div style="text-align:center">
              <div style="font-size:11px;font-weight:600;color:#94a3b8;margin-bottom:4px">CHECKED-IN</div>
              <div style="font-size:28px;font-weight:800;color:#22c55e">${checkinCount}</div>
            </div>
          </div>
        </div>
        <div style="display:flex;gap:10px;margin-top:16px;flex-wrap:wrap">
          <button class="btn btn-primary btn-sm" onclick="toast('Exporting registrations…','info')">${icon('download',14)} Export List</button>
          <button class="btn btn-secondary btn-sm" onclick="navigate('broadcast')">${icon('send',14)} Send Bulk SMS</button>
          <button class="btn btn-secondary btn-sm" onclick="navigate('scanner')">${icon('scan-line',14)} Open Scanner</button>
          <button class="btn btn-secondary btn-sm">${icon('edit',14)} Edit Show</button>
        </div>
      </div>

      <!-- Registrations Table -->
      <div class="card">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:16px;border-bottom:1px solid #f1f5f9;flex-wrap:wrap;gap:10px">
          <div style="font-size:15px;font-weight:600;color:#1e293b">Registered Users</div>
          <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
            <input class="input" placeholder="Filter by name, mobile or status…" style="font-size:13px;max-width:220px" id="sd-search" oninput="ShowDetailPage.filterRows()">
            <button class="btn btn-secondary btn-sm" onclick="toast('Assigning to agent…','info')">${icon('user-plus',14)} Assign to Agent</button>
            <button class="btn btn-primary btn-sm" onclick="navigate('broadcast')">${icon('send',14)} Send Bulk SMS</button>
          </div>
        </div>
        <div style="overflow-x:auto">
          <table class="data-table">
            <thead>
              <tr>
                <th style="width:36px"><input type="checkbox" id="select-all" onclick="ShowDetailPage.toggleAll(this)"></th>
                <th>NAME</th>
                <th>MOBILE</th>
                <th>CALL STATUS</th>
                <th>TICKET</th>
                <th>CHECK-IN</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody id="sd-tbody">${rows}</tbody>
          </table>
        </div>
        <div style="padding:12px 16px;border-top:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between">
          <div style="font-size:13px;color:#94a3b8">Showing 1 to ${regs.length} of ${show.filled.toLocaleString()} registrations</div>
          <div style="display:flex;gap:6px">
            <button class="btn btn-secondary btn-sm">${icon('chevron-left',14)}</button>
            <button class="btn btn-primary btn-sm" style="padding:5px 12px">1</button>
            <button class="btn btn-secondary btn-sm">2</button>
            <button class="btn btn-secondary btn-sm">3</button>
            <span style="font-size:13px;color:#94a3b8;line-height:30px">…</span>
            <button class="btn btn-secondary btn-sm">${show.filled>10?Math.ceil(show.filled/10):1}</button>
            <button class="btn btn-secondary btn-sm">${icon('chevron-right',14)}</button>
          </div>
        </div>
      </div>
    </div>`;
  },

  init() {},

  toggleAll(cb) {
    document.querySelectorAll('#sd-tbody input[type=checkbox]').forEach(c => c.checked = cb.checked);
  },

  filterRows() {
    const q = document.getElementById('sd-search')?.value.toLowerCase()||'';
    document.querySelectorAll('#sd-tbody tr').forEach(row => {
      row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  }
};
