window.AnalyticsPage = {
  render() {
    const kpi = D.analyticsData.kpis;

    const kpiCards = [
      { label: 'APP USERS (MUMBAI)', value: kpi.appUsers.toLocaleString(), delta: '+12% this month', color: '#2563eb', badge: 'badge-green' },
      { label: 'REGISTRATIONS THIS MONTH', value: kpi.regsThisMonth.toLocaleString(), delta: '+8.4% vs last month', color: '#8b5cf6', badge: 'badge-green' },
      { label: 'CONFIRMATION RATE', value: `${kpi.confirmRate}%`, delta: '+0.8% this week', color: '#22c55e', badge: 'badge-green' },
      { label: 'NO-SHOW RATE', value: `${kpi.noShowRate}%`, delta: '-0.5% this week', color: '#ef4444', badge: 'badge-red' },
    ].map(k => `
      <div class="metric-card">
        <div style="font-size:11px;font-weight:600;color:#94a3b8;margin-bottom:6px">${k.label}</div>
        <div style="font-size:30px;font-weight:800;color:${k.color}">${k.value}</div>
        <div style="margin-top:6px"><span class="badge ${k.badge}" style="font-size:11px">${k.delta}</span></div>
      </div>`).join('');

    const areaRows = D.analyticsData.areas.map(a => `
      <div style="margin-bottom:12px">
        <div style="display:flex;justify-content:space-between;margin-bottom:4px">
          <span style="font-size:13px;color:#374151;font-weight:500">${a.name}</span>
          <span style="font-size:13px;font-weight:700;color:#2563eb">${a.pct}% <span style="font-size:11px;color:#94a3b8;font-weight:400">(${a.count.toLocaleString()})</span></span>
        </div>
        <div class="progress-bar"><div class="progress-fill" style="width:${a.pct*4}%"></div></div>
      </div>`).join('');

    const showTableRows = D.analyticsData.showStats.map(s => {
      const confirmPct = Math.round((s.confirmed / s.regs) * 100);
      const confirmColor = confirmPct >= 80 ? '#22c55e' : confirmPct >= 60 ? '#f97316' : '#ef4444';
      const fillBadge = s.fillPct >= 90 ? 'badge-red' : s.fillPct >= 70 ? 'badge-orange' : 'badge-green';
      return `
        <tr>
          <td>
            <div style="font-size:13px;font-weight:600;color:#1e293b">${s.name}</div>
            <div style="font-size:11px;color:#94a3b8">${s.type} · ${s.date}</div>
          </td>
          <td style="font-size:13px;font-weight:600">${s.regs.toLocaleString()}</td>
          <td>
            <div style="display:flex;align-items:center;gap:8px">
              <span style="font-size:13px;font-weight:600;color:${confirmColor}">${s.confirmed.toLocaleString()}</span>
              <span style="font-size:11px;color:#94a3b8">(${confirmPct}%)</span>
            </div>
          </td>
          <td style="font-size:13px;color:${s.checkedIn>0?'#22c55e':'#94a3b8'}">${s.checkedIn > 0 ? s.checkedIn.toLocaleString() : '—'}</td>
          <td style="font-size:13px;color:${s.noShows>0?'#ef4444':'#94a3b8'}">${s.noShows > 0 ? s.noShows : '—'}</td>
          <td><span class="badge ${fillBadge}">${s.fillPct}%</span></td>
        </tr>`;
    }).join('');

    return `
    <div style="max-width:1100px;margin:0 auto">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:22px">
        <div>
          <h1 style="font-size:22px;font-weight:700;color:#1e293b">Analytics</h1>
          <p style="font-size:13px;color:#94a3b8;margin-top:2px">App usage, show registrations, and audience insights — Mumbai.</p>
        </div>
        <div style="display:flex;gap:10px">
          <button class="btn btn-secondary" onclick="toast('Exporting CSV…','info')">${icon('download',15)} Export CSV</button>
          <select class="select">
            <option>Last 14 Days</option><option>Last 30 Days</option><option>Last 90 Days</option>
          </select>
        </div>
      </div>

      <!-- KPI cards -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:22px">
        ${kpiCards}
      </div>

      <!-- Charts row -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-bottom:18px">
        <!-- Daily registrations -->
        <div class="card" style="padding:20px">
          <div style="margin-bottom:14px">
            <div style="font-size:15px;font-weight:600;color:#1e293b">Daily Registrations</div>
            <div style="font-size:12px;color:#94a3b8">Show seat registrations per day — last 14 days</div>
          </div>
          <div class="chart-wrap" style="height:200px"><canvas id="dailyRegsChart"></canvas></div>
        </div>

        <!-- New app users -->
        <div class="card" style="padding:20px">
          <div style="margin-bottom:14px">
            <div style="font-size:15px;font-weight:600;color:#1e293b">New App Users</div>
            <div style="font-size:12px;color:#94a3b8">New user sign-ups per day — last 14 days</div>
          </div>
          <div class="chart-wrap" style="height:200px"><canvas id="newUsersChart"></canvas></div>
        </div>
      </div>

      <!-- Mumbai area + show performance -->
      <div style="display:grid;grid-template-columns:280px 1fr;gap:18px;margin-bottom:18px">
        <!-- Mumbai area breakdown -->
        <div class="card" style="padding:18px">
          <div style="font-size:14px;font-weight:600;color:#1e293b;margin-bottom:4px">Mumbai Area Breakdown</div>
          <div style="font-size:12px;color:#94a3b8;margin-bottom:14px">Registered users by area</div>
          ${areaRows}
        </div>

        <!-- Show performance table -->
        <div class="card">
          <div style="padding:16px 16px 12px;border-bottom:1px solid #f1f5f9">
            <div style="font-size:15px;font-weight:600;color:#1e293b">Show-wise Performance</div>
            <div style="font-size:12px;color:#94a3b8;margin-top:2px">Registrations, confirmations, and check-ins per show</div>
          </div>
          <div style="overflow-x:auto">
            <table class="data-table">
              <thead>
                <tr>
                  <th>SHOW</th>
                  <th>REGISTRATIONS</th>
                  <th>CONFIRMED</th>
                  <th>CHECKED-IN</th>
                  <th>NO-SHOWS</th>
                  <th>FILL %</th>
                </tr>
              </thead>
              <tbody>${showTableRows}</tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Summary strip -->
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px">
        <div class="card" style="padding:16px;border-left:4px solid #2563eb">
          <div style="font-size:11px;font-weight:600;color:#94a3b8;margin-bottom:6px">PEAK REGISTRATION TIME</div>
          <div style="font-size:20px;font-weight:800;color:#1e293b">7 PM – 10 PM</div>
          <div style="font-size:12px;color:#94a3b8;margin-top:4px">Most users register in the evening</div>
        </div>
        <div class="card" style="padding:16px;border-left:4px solid #22c55e">
          <div style="font-size:11px;font-weight:600;color:#94a3b8;margin-bottom:6px">TOP SHOW TYPE (MUMBAI)</div>
          <div style="font-size:20px;font-weight:800;color:#1e293b">Concerts</div>
          <div style="font-size:12px;color:#94a3b8;margin-top:4px">62% of all registrations</div>
        </div>
        <div class="card" style="padding:16px;border-left:4px solid #f97316">
          <div style="font-size:11px;font-weight:600;color:#94a3b8;margin-bottom:6px">AVG. REGISTRATION LEAD TIME</div>
          <div style="font-size:20px;font-weight:800;color:#1e293b">4.2 Days</div>
          <div style="font-size:12px;color:#94a3b8;margin-top:4px">Before show date on average</div>
        </div>
      </div>
    </div>`;
  },

  init() {
    const d = D.analyticsData;

    const regsCtx = document.getElementById('dailyRegsChart');
    if (regsCtx) {
      const chart1 = new Chart(regsCtx, {
        type: 'bar',
        data: {
          labels: d.dailyRegs.labels,
          datasets: [{
            label: 'Registrations',
            data: d.dailyRegs.values,
            backgroundColor: 'rgba(37,99,235,0.15)',
            borderColor: '#2563eb',
            borderWidth: 1.5,
            borderRadius: 4,
          }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false }, ticks: { font: { size: 10 }, color: '#94a3b8', maxRotation: 45 } },
            y: { grid: { color: '#f1f5f9' }, ticks: { font: { size: 11 }, color: '#94a3b8' } }
          }
        }
      });
      window._activeCharts.push(chart1);
    }

    const usersCtx = document.getElementById('newUsersChart');
    if (usersCtx) {
      const chart2 = new Chart(usersCtx, {
        type: 'line',
        data: {
          labels: d.newUsers.labels,
          datasets: [{
            label: 'New Users',
            data: d.newUsers.values,
            borderColor: '#8b5cf6',
            backgroundColor: 'rgba(139,92,246,0.08)',
            borderWidth: 2.5,
            fill: true,
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: '#8b5cf6',
          }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false }, ticks: { font: { size: 10 }, color: '#94a3b8', maxRotation: 45 } },
            y: { grid: { color: '#f1f5f9' }, ticks: { font: { size: 11 }, color: '#94a3b8' } }
          }
        }
      });
      window._activeCharts.push(chart2);
    }
  }
};
