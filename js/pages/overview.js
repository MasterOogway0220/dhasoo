window.OverviewPage = {
  render() {
    return isMobile() ? this.renderMobile() : this.renderDesktop();
  },

  renderMobile() {
    const totalUsers = '1.28M';
    const newRegs = 4812;
    const upcoming = D.shows.filter(s => s.status === 'active' || s.status === 'full').length;
    const checkinRate = 94.2;

    const quickActions = [
      { label: 'ADD SHOW', ic: 'plus-circle', action: "navigate('shows')" },
      { label: 'EXPORT',   ic: 'download',    action: "toast('Exporting…','info')" },
      { label: 'ALERTS',   ic: 'bell',        action: "toggleNotifications()" },
      { label: 'USERS',    ic: 'users',       action: "navigate('audience')" },
    ];

    return `
    <div style="padding:20px 16px 8px">
      <div class="mob-section-label">INDIA OPERATIONS</div>
      <div class="mob-page-title">Daily Snapshot</div>
    </div>

    <div style="padding:0 16px">

      <!-- Total users card -->
      <div class="mob-card" style="margin-bottom:12px">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:8px">
          <div style="width:40px;height:40px;background:#EEF0FB;border-radius:12px;display:flex;align-items:center;justify-content:center;color:#3B4FDB">${icon('users',20)}</div>
          <span style="font-size:12px;font-weight:700;color:#22c55e;background:#dcfce7;padding:3px 10px;border-radius:20px">+12.4%</span>
        </div>
        <div style="font-size:13px;color:#94a3b8;margin-bottom:4px">Total Users</div>
        <div style="font-size:32px;font-weight:800;color:#0F172A">${totalUsers}</div>
        <div style="display:flex;gap:3px;margin-top:10px">
          ${[40,55,35,70,60,80,90,75,95].map((h,i)=>`<div style="flex:1;height:${h*0.3}px;background:${i===8?'#3B4FDB':'#E0E4F8'};border-radius:3px;align-self:flex-end"></div>`).join('')}
        </div>
      </div>

      <!-- 2-col: new reg + upcoming -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px">
        <div class="mob-card" style="margin-bottom:0">
          <div style="width:36px;height:36px;background:#EEF0FB;border-radius:10px;display:flex;align-items:center;justify-content:center;color:#3B4FDB;margin-bottom:8px">${icon('user-plus',18)}</div>
          <div style="font-size:12px;color:#94a3b8">New Reg.</div>
          <div style="font-size:22px;font-weight:800;color:#0F172A">${newRegs.toLocaleString()}</div>
        </div>
        <div class="mob-card" style="margin-bottom:0">
          <div style="width:36px;height:36px;background:#EEF0FB;border-radius:10px;display:flex;align-items:center;justify-content:center;color:#3B4FDB;margin-bottom:8px">${icon('calendar',18)}</div>
          <div style="font-size:12px;color:#94a3b8">Upcoming</div>
          <div style="font-size:22px;font-weight:800;color:#0F172A">${upcoming}</div>
        </div>
      </div>

      <!-- Check-in rate card -->
      <div style="background:linear-gradient(135deg,#3B4FDB,#5B6FEB);border-radius:16px;padding:18px;margin-bottom:12px;color:#fff">
        <div style="font-size:10px;font-weight:700;letter-spacing:0.08em;opacity:0.8;margin-bottom:6px">CHECK-IN RATE</div>
        <div style="font-size:36px;font-weight:800;margin-bottom:4px">${checkinRate}% <span style="font-size:16px;font-weight:500;opacity:0.8">Global Peak</span></div>
        <div style="background:rgba(255,255,255,0.25);border-radius:4px;height:6px;margin-top:10px">
          <div style="background:#fff;width:${checkinRate}%;height:100%;border-radius:4px"></div>
        </div>
      </div>

      <!-- Regional growth -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
        <div style="font-size:17px;font-weight:700;color:#0F172A">Regional Growth</div>
        <button class="btn btn-ghost btn-sm" style="color:#3B4FDB;font-size:13px" onclick="navigate('analytics')">View All</button>
      </div>
      <div style="background:linear-gradient(135deg,#1e3a5f,#2d4a8f);border-radius:16px;overflow:hidden;padding:20px;margin-bottom:20px;position:relative">
        <div style="font-size:10px;font-weight:700;color:rgba(255,255,255,0.6);margin-bottom:6px">TOP REGION</div>
        <div style="font-size:20px;font-weight:800;color:#fff">Maharashtra Hub</div>
        <div style="display:flex;align-items:center;gap:8px;margin-top:8px">
          ${['av-blue','av-indigo','av-purple'].map(c=>`<div class="avatar ${c}" style="width:28px;height:28px;font-size:10px;border:2px solid rgba(255,255,255,0.4)">M</div>`).join('')}
          <span style="font-size:12px;color:rgba(255,255,255,0.7)">+1.2k today</span>
        </div>
      </div>

      <!-- Quick actions -->
      <div style="font-size:17px;font-weight:700;color:#0F172A;margin-bottom:14px">Quick Actions</div>
      <div style="display:flex;gap:8px;margin-bottom:24px">
        ${quickActions.map(a=>`
          <div class="mob-quick-action" onclick="${a.action}">
            <div class="circle">${icon(a.ic,22)}</div>
            <span>${a.label}</span>
          </div>`).join('')}
      </div>

    </div>`;
  },

  renderDesktop() {
    const upcomingShows = D.shows.filter(s => s.status === 'active' || s.status === 'full').slice(0,3);

    const showCards = upcomingShows.map(s => {
      const pct = Math.round((s.filled/s.seats)*100);
      const barClass = pct>=90?'red':pct>=70?'orange':'green';
      const statusBadge = { active:'badge-green', full:'badge-orange', cancelled:'badge-red', completed:'badge-gray' }[s.status] || 'badge-gray';
      return `
        <div style="padding:16px;border-bottom:1px solid #f1f5f9;display:flex;gap:14px;align-items:center" onclick="navigate('show-detail',{showId:${s.id}})" class="cursor-pointer hover:bg-gray-50">
          <div style="font-size:28px">${s.banner}</div>
          <div style="flex:1;min-width:0">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:2px">
              <div style="font-size:14px;font-weight:600;color:#1e293b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${s.name}</div>
              <span class="badge ${statusBadge}" style="font-size:10px">${s.status.toUpperCase()}</span>
            </div>
            <div style="font-size:12px;color:#94a3b8;margin-bottom:8px">${s.date} · ${s.venue}</div>
            <div class="seat-bar">
              <div class="progress-bar" style="flex:1"><div class="progress-fill ${barClass}" style="width:${pct}%"></div></div>
              <span style="font-size:12px;color:#64748b;white-space:nowrap">${s.filled.toLocaleString()} / ${s.seats.toLocaleString()}</span>
            </div>
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;flex-shrink:0">
            <button class="btn btn-secondary btn-sm" onclick="event.stopPropagation();navigate('show-detail',{showId:${s.id}})" style="font-size:11px">View</button>
            <button class="btn btn-secondary btn-sm" onclick="event.stopPropagation();navigate('scanner')" style="font-size:11px">Scan</button>
          </div>
        </div>`;
    }).join('');

    const activityItems = D.recentActivity.map(a =>
      `<div style="display:flex;align-items:flex-start;gap:10px;padding:8px 0;border-bottom:1px solid #f8fafc">
        <div style="width:28px;height:28px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0" class="${a.color}">${a.icon}</div>
        <div style="flex:1">
          <div style="font-size:13px;color:#374151">${a.text}</div>
          <div style="font-size:11px;color:#94a3b8;margin-top:1px">${a.time}</div>
        </div>
      </div>`
    ).join('');

    return `
    <div style="max-width:1200px;margin:0 auto">
      <!-- Header -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px">
        <div>
          <h1 style="font-size:22px;font-weight:700;color:#1e293b">Dashboard Overview</h1>
          <p style="font-size:13px;color:#94a3b8;margin-top:2px">Manage shows, audience registrations, and confirmations across all events.</p>
        </div>
        <button class="btn btn-primary" onclick="navigate('shows')">
          ${icon('plus',16)} New Show
        </button>
      </div>

      <!-- KPI Cards -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px;margin-bottom:24px">
        <div class="metric-card">
          <div style="font-size:11px;font-weight:600;color:#94a3b8;margin-bottom:8px">TOTAL REGISTERED USERS</div>
          <div class="stat-highlight" data-count="4124802">0</div>
          <div style="font-size:11px;color:#22c55e;margin-top:4px">↑ 1.8% this week</div>
        </div>
        <div class="metric-card">
          <div style="font-size:11px;font-weight:600;color:#94a3b8;margin-bottom:8px">NEW REGISTRATIONS</div>
          <div class="stat-highlight" data-count="15429">0</div>
          <div style="font-size:11px;color:#94a3b8;margin-top:4px">Daily · Weekly · Monthly</div>
        </div>
        <div class="metric-card">
          <div style="font-size:11px;font-weight:600;color:#94a3b8;margin-bottom:8px">SHOW SEAT REGISTRATIONS</div>
          <div class="stat-highlight" data-count="6312">0</div>
          <div style="font-size:11px;color:#94a3b8;margin-top:4px">Across all active shows</div>
        </div>
        <div class="metric-card">
          <div style="font-size:11px;font-weight:600;color:#94a3b8;margin-bottom:8px">UPCOMING SHOWS</div>
          <div class="stat-highlight" data-count="42">0</div>
          <div style="font-size:11px;color:#94a3b8;margin-top:4px">Next 7 days</div>
        </div>
        <div class="metric-card">
          <div style="font-size:11px;font-weight:600;color:#94a3b8;margin-bottom:8px">CONFIRMATION RATE</div>
          <div class="stat-highlight" style="color:#22c55e">85%</div>
          <div style="font-size:11px;color:#94a3b8;margin-top:4px">Across all active shows</div>
        </div>
      </div>

      <!-- Main Grid -->
      <div style="display:grid;grid-template-columns:1fr 300px;gap:20px;margin-bottom:20px">
        <!-- Trend Chart -->
        <div class="card" style="padding:20px">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
            <div>
              <div style="font-size:15px;font-weight:600;color:#1e293b">Registrations Trend (All India)</div>
              <div style="font-size:12px;color:#94a3b8">Last 30 days</div>
            </div>
            <span style="font-size:11px;background:#dbeafe;color:#2563eb;padding:3px 10px;border-radius:20px;font-weight:600">Peak Trend ↑ 18.4k</span>
          </div>
          <div class="chart-wrap" style="height:200px">
            <canvas id="trendChart"></canvas>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="card" style="padding:20px">
          <div style="font-size:15px;font-weight:600;color:#1e293b;margin-bottom:14px">Quick Actions</div>
          <div style="display:flex;flex-direction:column;gap:10px">
            <div class="quick-action" onclick="navigate('shows')">
              <div style="width:36px;height:36px;background:#dbeafe;border-radius:10px;display:flex;align-items:center;justify-content:center">${icon('plus-circle',18,'text-blue-600')}</div>
              <div>
                <div style="font-size:13px;font-weight:600;color:#1e293b">Add New Show</div>
                <div style="font-size:11px;color:#94a3b8">Create a new event</div>
              </div>
            </div>
            <div class="quick-action" onclick="toast('Exporting registrations…','info')">
              <div style="width:36px;height:36px;background:#dcfce7;border-radius:10px;display:flex;align-items:center;justify-content:center">${icon('download',18,'text-green-600')}</div>
              <div>
                <div style="font-size:13px;font-weight:600;color:#1e293b">Export Registrations</div>
                <div style="font-size:11px;color:#94a3b8">Download as CSV / Excel</div>
              </div>
            </div>
            <div class="quick-action" onclick="navigate('scanner')">
              <div style="width:36px;height:36px;background:#fef9c3;border-radius:10px;display:flex;align-items:center;justify-content:center">${icon('scan-line',18,'text-yellow-600')}</div>
              <div>
                <div style="font-size:13px;font-weight:600;color:#1e293b">Open Gate Scanner</div>
                <div style="font-size:11px;color:#94a3b8">Mobile QR check-in</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Grid -->
      <div style="display:grid;grid-template-columns:1fr 340px;gap:20px">
        <!-- Ongoing Shows -->
        <div class="card">
          <div style="display:flex;align-items:center;justify-content:space-between;padding:16px 16px 0">
            <div style="font-size:15px;font-weight:600;color:#1e293b">Ongoing &amp; Upcoming Shows</div>
            <button class="btn btn-ghost btn-sm" onclick="navigate('shows')">View All →</button>
          </div>
          ${showCards}
        </div>

        <!-- Recent Activity -->
        <div class="card" style="padding:16px">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
            <div style="font-size:15px;font-weight:600;color:#1e293b">Recent Activity</div>
            <button class="btn btn-ghost btn-sm">View All</button>
          </div>
          <div style="overflow-y:auto;max-height:380px">${activityItems}</div>
        </div>
      </div>

      <!-- AI Insight Banner -->
      <div style="margin-top:20px;background:linear-gradient(135deg,#0f172a,#1e3a5f);border-radius:14px;padding:20px 24px;display:flex;align-items:center;justify-content:space-between;gap:20px">
        <div style="display:flex;align-items:center;gap:14px">
          <div style="font-size:32px">📊</div>
          <div>
            <div style="font-size:11px;font-weight:600;color:#93c5fd;margin-bottom:4px">INTELLIGENT INSIGHT</div>
            <div style="font-size:16px;font-weight:700;color:#fff;margin-bottom:4px">Registrations spike 2× on weekends — plan show announcements accordingly.</div>
            <div style="font-size:13px;color:#94a3b8">Sending registration confirmations on Friday evenings has shown 18% higher check-in rates across past shows.</div>
          </div>
        </div>
        <div style="display:flex;gap:10px;flex-shrink:0">
          <button class="btn btn-primary" onclick="navigate('shows')">Schedule Launch</button>
          <button class="btn" style="background:rgba(255,255,255,0.1);color:#fff">Dismiss</button>
        </div>
      </div>
    </div>`;
  },

  init() {
    if (isMobile()) return;
    initCounters();
    const ctx = document.getElementById('trendChart');
    if (!ctx) return;
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: D.trendData.labels,
        datasets: [{
          label: 'Registrations',
          data: D.trendData.registrations,
          borderColor: '#2563eb',
          backgroundColor: 'rgba(37,99,235,0.08)',
          borderWidth: 2.5,
          fill: true,
          tension: 0.4,
          pointRadius: 3,
          pointBackgroundColor: '#2563eb',
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 11 }, color: '#94a3b8' } },
          y: { grid: { color: '#f1f5f9' }, ticks: { font: { size: 11 }, color: '#94a3b8' } }
        }
      }
    });
    window._activeCharts.push(chart);
  }
};
