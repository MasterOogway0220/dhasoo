window.OverviewPage = {
  render() {
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
          <h1 style="font-size:22px;font-weight:700;color:#1e293b">India Executive Overview</h1>
          <p style="font-size:13px;color:#94a3b8;margin-top:2px">Unified operational insights for the Dhaasoo platform across pan-India scheduled events and registered members.</p>
        </div>
        <button class="btn btn-primary" onclick="navigate('shows')">
          ${icon('plus',16)} New Show
        </button>
      </div>

      <!-- KPI Cards -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px;margin-bottom:24px">
        <div class="metric-card">
          <div style="font-size:11px;font-weight:600;color:#94a3b8;margin-bottom:8px">TOTAL INDIAN VOTERS</div>
          <div class="stat-highlight" data-count="4124802">0</div>
          <div style="font-size:11px;color:#22c55e;margin-top:4px">↑ 1.8% this week</div>
        </div>
        <div class="metric-card">
          <div style="font-size:11px;font-weight:600;color:#94a3b8;margin-bottom:8px">NEW REGISTRATIONS</div>
          <div class="stat-highlight" data-count="15429">0</div>
          <div style="font-size:11px;color:#94a3b8;margin-top:4px">Today / This Week</div>
        </div>
        <div class="metric-card">
          <div style="font-size:11px;font-weight:600;color:#94a3b8;margin-bottom:8px">UPCOMING INDIA SHOWS</div>
          <div class="stat-highlight" data-count="42">0</div>
          <div style="font-size:11px;color:#94a3b8;margin-top:4px">Next 7 days</div>
        </div>
        <div class="metric-card">
          <div style="font-size:11px;font-weight:600;color:#94a3b8;margin-bottom:8px">PUNE CHECK-IN RATE</div>
          <div class="stat-highlight" style="color:#22c55e">96.8%</div>
          <div style="font-size:11px;color:#94a3b8;margin-top:4px">Last completed show</div>
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
            <div class="quick-action" onclick="toast('Exporting today\'s list…','info')">
              <div style="width:36px;height:36px;background:#dcfce7;border-radius:10px;display:flex;align-items:center;justify-content:center">${icon('download',18,'text-green-600')}</div>
              <div>
                <div style="font-size:13px;font-weight:600;color:#1e293b">Export Indian Leads</div>
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
            <div style="font-size:15px;font-weight:600;color:#1e293b">Ongoing &amp; Upcoming Shows in India</div>
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
            <div style="font-size:16px;font-weight:700;color:#fff;margin-bottom:4px">Indian audiences are most active during festive weekends.</div>
            <div style="font-size:13px;color:#94a3b8">Consider launching new concert tickets on Friday evenings for Mumbai and Delhi regions to maximise conversion rates.</div>
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
