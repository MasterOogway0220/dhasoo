window.ShowsPage = {
  _filter: { status: 'all', city: 'all', search: '' },

  render() {
    return isMobile() ? this.renderMobile() : this.renderDesktop();
  },

  renderMobile() {
    const statusColor = { active:'#22c55e', full:'#f97316', completed:'#94a3b8', cancelled:'#ef4444' };

    const cards = D.shows.map(s => {
      const pct = Math.round((s.filled / s.seats) * 100);
      const isLive = s.status === 'active';
      const isFull = s.status === 'full';
      const isCancelled = s.status === 'cancelled';
      const badgeLabel = isFull ? 'SOLD OUT' : isCancelled ? 'CANCELLED' : isLive ? 'LIVE' : s.status.toUpperCase();
      const badgeBg = isCancelled ? '#ef4444' : isFull ? '#f97316' : '#22c55e';

      return `
      <div style="background:#1e293b;border-radius:16px;overflow:hidden;margin-bottom:12px;position:relative" onclick="navigate('show-detail',{showId:${s.id}})">
        <div style="padding:20px;background:linear-gradient(135deg,#1e293b 60%,#2d3f6b)">
          <div style="position:absolute;top:14px;right:14px;background:${badgeBg};color:#fff;font-size:10px;font-weight:700;padding:3px 10px;border-radius:20px">${badgeLabel}</div>
          <div style="font-size:24px;margin-bottom:10px">${s.banner}</div>
          <div style="font-size:17px;font-weight:700;color:#fff;margin-bottom:6px">${s.name}</div>
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
            <span style="color:rgba(255,255,255,0.6);font-size:12px">${icon('calendar',12)}</span>
            <span style="font-size:12px;color:rgba(255,255,255,0.7)">${s.date} · ${s.time}</span>
          </div>
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:14px">
            <span style="color:rgba(255,255,255,0.6);font-size:12px">${icon('map-pin',12)}</span>
            <span style="font-size:12px;color:rgba(255,255,255,0.7)">${s.venue.split(',')[0]}, ${s.city}</span>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between">
            <div style="display:flex;align-items:center">
              ${['av-blue','av-indigo','av-green'].map(c=>`<div class="avatar ${c}" style="width:26px;height:26px;font-size:9px;border:2px solid #1e293b;margin-right:-6px">•</div>`).join('')}
              <span style="font-size:12px;color:rgba(255,255,255,0.6);margin-left:16px">${s.filled.toLocaleString()} registered</span>
            </div>
            <button class="btn" style="background:#3B4FDB;color:#fff;padding:7px 16px;font-size:13px;font-weight:600;border-radius:10px" onclick="event.stopPropagation();navigate('show-detail',{showId:${s.id}})">Manage</button>
          </div>
        </div>
        <div style="background:rgba(255,255,255,0.05);height:4px">
          <div style="background:#3B4FDB;width:${pct}%;height:100%"></div>
        </div>
      </div>`;
    }).join('');

    return `
    <div style="padding:20px 16px 8px">
      <div class="mob-section-label">PERFORMANCE HUB</div>
      <div class="mob-page-title">Show Listing</div>
      <div style="font-size:13px;color:#94a3b8;margin-bottom:16px">Managing ${D.shows.length} upcoming productions across India.</div>
    </div>
    <div style="padding:0 16px">
      <div style="position:relative;margin-bottom:14px">
        <span style="position:absolute;left:14px;top:50%;transform:translateY(-50%);color:#94a3b8">${icon('search',16)}</span>
        <input class="input" placeholder="Search shows…" style="padding-left:40px;border-radius:30px;background:#fff;border:none;box-shadow:0 2px 8px rgba(0,0,0,0.06);font-size:14px">
      </div>
      <div style="display:flex;gap:8px;margin-bottom:18px;overflow-x:auto;padding-bottom:4px">
        ${['Upcoming','Mumbai','Active','All'].map((f,i)=>`<button style="white-space:nowrap;padding:6px 16px;border-radius:20px;border:none;font-size:13px;font-weight:600;cursor:pointer;${i===0?'background:#3B4FDB;color:#fff':'background:#fff;color:#64748b;box-shadow:0 1px 4px rgba(0,0,0,0.08)'}">${f}</button>`).join('')}
      </div>
      ${cards}
    </div>
    <button onclick="ShowsPage.openAddModal()" style="position:fixed;bottom:80px;right:20px;width:52px;height:52px;border-radius:50%;background:#3B4FDB;color:#fff;border:none;box-shadow:0 4px 16px rgba(59,79,219,0.4);display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:50">${icon('plus',24)}</button>`;
  },

  renderDesktop() {
    return `
    <div style="max-width:1100px;margin:0 auto;padding-bottom:0">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:22px">
        <div>
          <h1 style="font-size:22px;font-weight:700;color:#1e293b">Upcoming Shows</h1>
          <p style="font-size:13px;color:#94a3b8;margin-top:2px">Manage your upcoming productions, ticket inventory, and real-time show statistics across major Indian cities.</p>
        </div>
        <button class="btn btn-primary" onclick="ShowsPage.openAddModal()">${icon('plus',16)} Add New Show</button>
      </div>

      <!-- Insight strip -->
      <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:12px 16px;display:flex;align-items:center;justify-content:space-between;margin-bottom:18px">
        <div style="font-size:13px;color:#1e40af"><strong>PAN INDIA OCCUPANCY:</strong> <span style="font-size:20px;font-weight:700;margin-left:8px">87.5%</span> <span style="font-size:12px;color:#3b82f6">+2.3% above regional average</span></div>
        <button class="btn btn-secondary btn-sm">View Breakdown</button>
      </div>

      <!-- Filters -->
      <div style="display:flex;gap:12px;margin-bottom:16px;flex-wrap:wrap">
        <input class="input" id="shows-search" placeholder="Search Audiences, Clearance..." style="max-width:220px" oninput="ShowsPage.applyFilters()">
        <select class="select" id="shows-status" onchange="ShowsPage.applyFilters()">
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="full">Sold Out</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select class="select" id="shows-city" onchange="ShowsPage.applyFilters()">
          <option value="all">All Cities</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Pune">Pune</option>
        </select>
      </div>

      <!-- Table -->
      <div class="card" style="overflow:hidden">
        <div style="overflow-x:auto">
          <table class="data-table" id="shows-table">
            <thead>
              <tr>
                <th>SHOW NAME</th>
                <th>DATE &amp; TIME</th>
                <th>VENUE</th>
                <th>BOOKING</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody id="shows-tbody"></tbody>
          </table>
        </div>
        <div style="padding:12px 16px;border-top:1px solid #f1f5f9;font-size:13px;color:#94a3b8" id="shows-count"></div>
      </div>

      <!-- Side panels -->
      <div style="display:grid;grid-template-columns:1fr 220px;gap:16px;margin-top:16px">
        <div class="card" style="padding:20px;background:linear-gradient(135deg,#0f172a,#1e3a5f);color:#fff">
          <div style="font-size:11px;font-weight:600;color:#93c5fd;margin-bottom:8px">VENUE SPOTLIGHT</div>
          <div style="font-size:16px;font-weight:700;margin-bottom:6px">Mumbai Metropolitan</div>
          <div style="font-size:13px;color:#94a3b8">Mumbai venue category currently leads in advance booking conversion rates.</div>
        </div>
        <div class="card" style="padding:16px">
          <div style="font-size:13px;font-weight:600;color:#1e293b;margin-bottom:12px">Top Region Performers</div>
          ${D.analyticsData.cities.map(c=>`
            <div style="margin-bottom:10px">
              <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px">
                <span style="color:#374151">${c.name}</span><span style="color:#2563eb;font-weight:600">${c.pct}%</span>
              </div>
              <div class="progress-bar"><div class="progress-fill" style="width:${c.pct}%"></div></div>
            </div>`).join('')}
        </div>
      </div>
    </div>`;
  },

  init() {
    if (!isMobile()) this.applyFilters();
  },

  applyFilters() {
    const search = (document.getElementById('shows-search')?.value||'').toLowerCase();
    const status = document.getElementById('shows-status')?.value || 'all';
    const city   = document.getElementById('shows-city')?.value   || 'all';

    let shows = D.shows.filter(s => {
      const matchSearch = !search || s.name.toLowerCase().includes(search) || s.venue.toLowerCase().includes(search);
      const matchStatus = status==='all' || s.status===status;
      const matchCity   = city==='all'   || s.city===city;
      return matchSearch && matchStatus && matchCity;
    });

    this.renderRows(shows);
  },

  renderRows(shows) {
    const statusCfg = {
      active:    { badge:'badge-green',  label:'Active'    },
      full:      { badge:'badge-orange', label:'Sold Out'  },
      completed: { badge:'badge-gray',   label:'Completed' },
      cancelled: { badge:'badge-red',    label:'Cancelled' },
    };

    const tbody = document.getElementById('shows-tbody');
    if (!tbody) return;

    tbody.innerHTML = shows.map(s => {
      const pct = Math.round((s.filled/s.seats)*100);
      const barClass = pct>=90?'red':pct>=70?'orange':'';
      const st = statusCfg[s.status] || { badge:'badge-gray', label:s.status };
      return `
        <tr onclick="navigate('show-detail',{showId:${s.id}})">
          <td>
            <div style="display:flex;align-items:center;gap:10px">
              <div style="font-size:22px">${s.banner}</div>
              <div>
                <div style="font-weight:600;color:#1e293b">${s.name}</div>
                <div style="font-size:12px;color:#94a3b8">${s.type}</div>
              </div>
            </div>
          </td>
          <td>
            <div style="font-size:13px;font-weight:500">${s.date}</div>
            <div style="font-size:12px;color:#94a3b8">${s.time}</div>
          </td>
          <td>
            <div style="font-size:13px">${s.venue.split(',')[0]}</div>
            <div style="font-size:12px;color:#94a3b8">${s.city}</div>
          </td>
          <td style="min-width:160px">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
              <span style="font-size:13px;font-weight:600">${s.filled.toLocaleString()}</span>
              <span style="font-size:12px;color:#94a3b8">/ ${s.seats.toLocaleString()}</span>
            </div>
            <div class="progress-bar" style="width:120px"><div class="progress-fill ${barClass}" style="width:${pct}%"></div></div>
          </td>
          <td><span class="badge ${st.badge}">${st.label}</span></td>
          <td onclick="event.stopPropagation()">
            <div style="display:flex;gap:6px">
              <button class="btn btn-secondary btn-sm" onclick="navigate('show-detail',{showId:${s.id}})">View</button>
              <button class="btn btn-secondary btn-sm" onclick="ShowsPage.openActions(${s.id})">${icon('more-horizontal',14)}</button>
            </div>
          </td>
        </tr>`;
    }).join('') || `<tr><td colspan="6" style="text-align:center;color:#94a3b8;padding:32px">No shows match your filters.</td></tr>`;

    const count = document.getElementById('shows-count');
    if (count) count.textContent = `Showing ${shows.length} of ${D.shows.length} active shows`;
  },

  openActions(showId) {
    const show = D.shows.find(s=>s.id===showId);
    if (!show) return;
    showModal(`
      <div style="font-size:18px;font-weight:700;color:#1e293b;margin-bottom:4px">Show Actions</div>
      <div style="font-size:14px;color:#94a3b8;margin-bottom:20px">${show.name}</div>
      <div style="display:flex;flex-direction:column;gap:10px">
        <button class="btn btn-secondary" onclick="closeModal();toast('Show duplicated!','success')"><span>${icon('copy',15)}</span> Duplicate Show</button>
        <button class="btn btn-secondary" onclick="closeModal();toast('Show marked Active','success')"><span>${icon('check-circle',15)}</span> Mark as Active</button>
        <button class="btn btn-secondary" onclick="closeModal();toast('Show marked Inactive','info')"><span>${icon('eye-off',15)}</span> Mark as Inactive</button>
        <button class="btn btn-secondary" onclick="closeModal();toast('Show marked as Fully Booked / Closed','info')"><span>${icon('lock',15)}</span> Mark as Fully Booked / Closed</button>
        <button class="btn btn-secondary" onclick="ShowsPage.confirmCancel(${showId})"><span>${icon('x-circle',15)}</span> Cancel Show</button>
        <button class="btn btn-secondary" onclick="closeModal();toast('Show marked Completed','success')"><span>${icon('check-circle',15)}</span> Mark as Completed</button>
        <button class="btn btn-danger" onclick="ShowsPage.confirmDelete(${showId})"><span>${icon('trash-2',15)}</span> Delete Show</button>
      </div>
      <button class="btn btn-ghost" style="width:100%;margin-top:12px;justify-content:center" onclick="closeModal()">Cancel</button>
    `);
  },

  confirmCancel(showId) {
    const show = D.shows.find(s=>s.id===showId);
    closeModal();
    showModal(`
      <div style="text-align:center;margin-bottom:16px">
        <div style="font-size:40px;margin-bottom:8px">⚠️</div>
        <div style="font-size:18px;font-weight:700;color:#1e293b">Cancel This Show?</div>
        <div style="font-size:14px;color:#64748b;margin-top:8px">This will automatically send a cancellation SMS &amp; email to <strong>${show.filled.toLocaleString()} registered users</strong>. This cannot be undone.</div>
      </div>
      <div style="display:flex;gap:10px;margin-top:20px">
        <button class="btn btn-secondary" style="flex:1;justify-content:center" onclick="closeModal()">Keep Show</button>
        <button class="btn btn-danger" style="flex:1;justify-content:center" onclick="closeModal();toast('Show cancelled. ${show.filled} users notified.','error')">Yes, Cancel Show</button>
      </div>
    `);
  },

  confirmDelete(showId) {
    closeModal();
    showModal(`
      <div style="text-align:center;margin-bottom:16px">
        <div style="font-size:40px;margin-bottom:8px">🗑️</div>
        <div style="font-size:18px;font-weight:700;color:#1e293b">Delete Show?</div>
        <div style="font-size:14px;color:#64748b;margin-top:8px">This action is permanent and cannot be undone. All registration data will be lost.</div>
      </div>
      <div style="display:flex;gap:10px;margin-top:20px">
        <button class="btn btn-secondary" style="flex:1;justify-content:center" onclick="closeModal()">Cancel</button>
        <button class="btn btn-danger" style="flex:1;justify-content:center" onclick="closeModal();toast('Show deleted','error')">Delete Permanently</button>
      </div>
    `);
  },

  openAddModal() {
    showModal(`
      <div style="font-size:18px;font-weight:700;color:#1e293b;margin-bottom:4px">Add New Show</div>
      <div style="font-size:13px;color:#94a3b8;margin-bottom:20px">Fill in the show details below</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
        <div style="grid-column:1/-1">
          <label style="font-size:12px;font-weight:600;color:#64748b;display:block;margin-bottom:5px">SHOW NAME *</label>
          <input class="input" placeholder="e.g. Bollywood Night 2025">
        </div>
        <div>
          <label style="font-size:12px;font-weight:600;color:#64748b;display:block;margin-bottom:5px">SHOW TYPE</label>
          <select class="select" style="width:100%"><option>Concert</option><option>Comedy</option><option>Reality</option><option>Talent</option><option>Game Show</option></select>
        </div>
        <div>
          <label style="font-size:12px;font-weight:600;color:#64748b;display:block;margin-bottom:5px">SHOW DATE *</label>
          <input class="input" type="date">
        </div>
        <div>
          <label style="font-size:12px;font-weight:600;color:#64748b;display:block;margin-bottom:5px">START TIME</label>
          <input class="input" type="time" value="19:00">
        </div>
        <div>
          <label style="font-size:12px;font-weight:600;color:#64748b;display:block;margin-bottom:5px">TOTAL SEATS *</label>
          <input class="input" type="number" placeholder="e.g. 1000">
        </div>
        <div>
          <label style="font-size:12px;font-weight:600;color:#64748b;display:block;margin-bottom:5px">REPORTING TIME</label>
          <input class="input" type="time" value="18:00">
        </div>
        <div style="grid-column:1/-1">
          <label style="font-size:12px;font-weight:600;color:#64748b;display:block;margin-bottom:5px">VENUE / LOCATION *</label>
          <input class="input" placeholder="Venue name">
        </div>
        <div>
          <label style="font-size:12px;font-weight:600;color:#64748b;display:block;margin-bottom:5px">CITY *</label>
          <select class="select" style="width:100%">
            <option value="">Select City</option>
            <option>Mumbai</option><option>Delhi</option><option>Bangalore</option><option>Pune</option><option>Hyderabad</option><option>Chennai</option><option>Kolkata</option><option>Ahmedabad</option>
          </select>
        </div>
        <div>
          <label style="font-size:12px;font-weight:600;color:#64748b;display:block;margin-bottom:5px">INITIAL STATUS</label>
          <select class="select" style="width:100%">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div style="grid-column:1/-1">
          <label style="font-size:12px;font-weight:600;color:#64748b;display:block;margin-bottom:5px">DESCRIPTION</label>
          <textarea class="input" rows="2" placeholder="Short description for the app…"></textarea>
        </div>
      </div>
      <div style="display:flex;gap:10px;margin-top:20px">
        <button class="btn btn-secondary" style="flex:1;justify-content:center" onclick="closeModal()">Cancel</button>
        <button class="btn btn-primary" style="flex:1;justify-content:center" onclick="closeModal();toast('Show created successfully!','success')">Create Show</button>
      </div>
    `);
  }
};
