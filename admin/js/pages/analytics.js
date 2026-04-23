window.AnalyticsPage = {
  _showFilter: 'all',
  _dateRange: '14',

  render() {
    return isMobile() ? this.renderMobile() : this.renderDesktop();
  },

  setShow(val) { this._showFilter = val; navigate('analytics'); },
  setDateRange(val) { this._dateRange = val; navigate('analytics'); },

  _kpis() {
    if (this._showFilter === 'all') return null;
    const showId = parseInt(this._showFilter);
    const show = D.shows.find(s => s.id === showId);
    const regs = D.registrations.filter(r => r.showId === showId);
    const confirmed = regs.filter(r => r.callStatus === 'confirmed').length;
    const checkedIn = regs.filter(r => r.checkin === 'checked_in').length;
    const noShows   = regs.filter(r => r.checkin === 'no_show').length;
    const fillPct   = show ? Math.round((show.filled / show.seats) * 100) : 0;
    const confirmRate = regs.length ? Math.round((confirmed / regs.length) * 100) : 0;
    const noShowRate  = regs.length ? Math.round((noShows / regs.length) * 100) : 0;
    return { total: regs.length, confirmed, confirmRate, checkedIn, noShows, noShowRate, fillPct, seats: show ? show.seats : 0 };
  },

  _areas() {
    if (this._showFilter === 'all') return D.analyticsData.areas;
    const showId = parseInt(this._showFilter);
    const regs = D.registrations.filter(r => r.showId === showId);
    if (!regs.length) return D.analyticsData.areas;
    const cc = {};
    regs.forEach(r => { cc[r.city] = (cc[r.city] || 0) + 1; });
    return Object.entries(cc).sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count, pct: Math.round((count / regs.length) * 100) }));
  },

  _showStats() {
    if (this._showFilter === 'all') return D.analyticsData.showStats;
    const idx = parseInt(this._showFilter) - 1;
    return (idx >= 0 && idx < D.analyticsData.showStats.length)
      ? D.analyticsData.showStats.slice(idx, idx + 1) : [];
  },

  _chartData() {
    const days = parseInt(this._dateRange);
    const d = D.analyticsData;
    if (this._showFilter !== 'all') {
      const showId = parseInt(this._showFilter);
      const regs = D.registrations.filter(r => r.showId === showId);
      const counts = {};
      regs.forEach(r => {
        const ds = r.regDate.split(',')[0].trim();
        counts[ds] = (counts[ds] || 0) + 1;
      });
      const mth = {Jan:1,Feb:2,Mar:3,Apr:4,May:5,Jun:6,Jul:7,Aug:8,Sep:9,Oct:10,Nov:11,Dec:12};
      const sorted = Object.entries(counts).sort((a, b) => {
        const p = s => { const [dd, mm] = s.split(' '); return mth[mm] * 100 + parseInt(dd); };
        return p(a[0]) - p(b[0]);
      });
      const sts = ['confirmed','not_called','no_answer','callback','declined'];
      return {
        dailyRegs: { labels: sorted.map(e => e[0]), values: sorted.map(e => e[1]) },
        callStatus: {
          labels: ['Confirmed','Not Called','No Answer','Callback','Declined'],
          values: sts.map(s => regs.filter(r => r.callStatus === s).length),
          colors: ['#22c55e','#94a3b8','#f97316','#8b5cf6','#ef4444'],
        }
      };
    }
    return {
      dailyRegs: { labels: d.dailyRegs.labels.slice(-days), values: d.dailyRegs.values.slice(-days) },
      newUsers:  { labels: d.newUsers.labels.slice(-days),  values: d.newUsers.values.slice(-days)  }
    };
  },

  renderMobile() {
    const kpi = D.analyticsData.kpis;
    const sk = this._kpis();
    const areas = this._areas();
    const isFiltered = this._showFilter !== 'all';

    const agentRows = D.agents.map(a => `
      <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid #f1f5f9">
        <div>
          <div style="font-size:13px;font-weight:600;color:#1e293b">${a.name.split(' ')[0]} ${a.name.split(' ')[1][0]}.</div>
          <div style="font-size:11px;color:#94a3b8">${a.role.replace('Calling ','')}</div>
        </div>
        <div style="font-size:14px;font-weight:700;color:#1e293b">${a.calls.toLocaleString()}</div>
        <span style="background:${a.status==='active'?'#dcfce7':a.status==='break'?'#fef9c3':'#f1f5f9'};color:${a.status==='active'?'#16a34a':a.status==='break'?'#ca8a04':'#64748b'};font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px">${a.status.toUpperCase()}</span>
      </div>`).join('');

    const showOpts = D.shows.map(s => `<option value="${s.id}" ${this._showFilter===String(s.id)?'selected':''}>${s.name.split(' ').slice(0,3).join(' ')}</option>`).join('');
    const dateOpts = [['7','7 Days'],['14','14 Days'],['30','30 Days']].map(([v,l]) => `<option value="${v}" ${this._dateRange===v?'selected':''}>${l}</option>`).join('');

    const att  = sk ? (sk.checkedIn > 0 ? Math.round(sk.checkedIn / sk.total * 100) + '%' : '—') : kpi.attendanceRate + '%';
    const conf = sk ? sk.confirmRate + '%' : kpi.confirmRate + '%';
    const usersLabel = sk ? 'REGISTRATIONS' : 'ACTIVE USERS';
    const usersVal   = sk ? sk.total : (kpi.appUsers / 1000).toFixed(1) + 'k';
    const noshow     = sk ? (sk.noShows > 0 ? sk.noShowRate + '%' : '0%') : kpi.noShowRate + '%';

    const dateLabel = this._dateRange === '7' ? 'LAST 7 DAYS' : this._dateRange === '14' ? 'LAST 14 DAYS' : 'LAST 30 DAYS';

    return `
    <div style="background:#ECEEF5;min-height:100vh;padding-bottom:80px">
      <div style="padding:20px 16px 14px">
        <div class="mob-section-label">ANALYTICAL INTELLIGENCE</div>
        <div class="mob-page-title">Data Insights</div>
      </div>
      <div style="padding:0 16px">

        <!-- Filters -->
        <div style="display:flex;gap:8px;margin-bottom:14px">
          <select class="select" style="flex:1;font-size:12px" onchange="AnalyticsPage.setShow(this.value)">
            <option value="all" ${this._showFilter==='all'?'selected':''}>All Shows</option>
            ${showOpts}
          </select>
          <select class="select" style="font-size:12px" onchange="AnalyticsPage.setDateRange(this.value)">
            ${dateOpts}
          </select>
        </div>

        <!-- 2x2 KPI grid -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px">
          <div class="mob-card" style="margin-bottom:0">
            <div style="font-size:10px;font-weight:700;color:#94a3b8;letter-spacing:0.06em;margin-bottom:4px">ATTENDANCE</div>
            <div style="font-size:22px;font-weight:800;color:#3B4FDB">${att}</div>
          </div>
          <div class="mob-card" style="margin-bottom:0">
            <div style="font-size:10px;font-weight:700;color:#94a3b8;letter-spacing:0.06em;margin-bottom:4px">CONF. RATE</div>
            <div style="font-size:22px;font-weight:800;color:#3B4FDB">${conf}</div>
          </div>
          <div class="mob-card" style="margin-bottom:0">
            <div style="font-size:10px;font-weight:700;color:#94a3b8;letter-spacing:0.06em;margin-bottom:4px">${usersLabel}</div>
            <div style="font-size:22px;font-weight:800;color:#0F172A">${usersVal}</div>
          </div>
          <div class="mob-card" style="margin-bottom:0">
            <div style="font-size:10px;font-weight:700;color:#94a3b8;letter-spacing:0.06em;margin-bottom:4px">NO-SHOW</div>
            <div style="font-size:22px;font-weight:800;color:#ef4444">${noshow}</div>
          </div>
        </div>

        <!-- Registration trends chart -->
        <div class="mob-card">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
            <div style="font-size:16px;font-weight:700;color:#0F172A">${isFiltered ? 'Registration Timeline' : 'Registration Trends'}</div>
            <span style="font-size:11px;font-weight:600;color:#3B4FDB;background:#EEF0FB;padding:3px 10px;border-radius:20px">${dateLabel}</span>
          </div>
          <div class="chart-wrap" style="height:140px"><canvas id="mobTrendChart"></canvas></div>
        </div>

        <!-- Top regions -->
        <div style="font-size:16px;font-weight:700;color:#0F172A;margin:4px 0 12px">Top Regions</div>
        <div class="mob-card">
          ${areas.slice(0,5).map((a,i) => {
            const dot = i < 2 ? '#3B4FDB' : '#94a3b8';
            return `<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;${i<4?'border-bottom:1px solid #f1f5f9':''}">
              <div style="display:flex;align-items:center;gap:10px">
                <div style="width:8px;height:8px;border-radius:50%;background:${dot}"></div>
                <span style="font-size:14px;color:#1e293b">${a.name}</span>
              </div>
              <span style="font-size:14px;font-weight:700;color:#1e293b">${a.pct}%</span>
            </div>`;
          }).join('')}
        </div>

        <!-- Agent performance -->
        <div style="font-size:16px;font-weight:700;color:#0F172A;margin:4px 0 12px">Agent Performance</div>
        <div class="mob-card">
          <div style="display:flex;justify-content:space-between;padding-bottom:8px;border-bottom:1.5px solid #f1f5f9;margin-bottom:4px">
            <span style="font-size:10px;font-weight:700;color:#94a3b8;letter-spacing:0.06em">AGENT</span>
            <span style="font-size:10px;font-weight:700;color:#94a3b8;letter-spacing:0.06em">LEADS</span>
            <span style="font-size:10px;font-weight:700;color:#94a3b8;letter-spacing:0.06em">STATUS</span>
          </div>
          ${agentRows}
        </div>
      </div>
    </div>`;
  },

  renderDesktop() {
    const kpi = D.analyticsData.kpis;
    const sk = this._kpis();
    const areas = this._areas();
    const showStats = this._showStats();
    const isFiltered = this._showFilter !== 'all';

    const showOpts = D.shows.map(s => `<option value="${s.id}" ${this._showFilter===String(s.id)?'selected':''}>${s.name}</option>`).join('');

    const kpiCards = sk ? [
      { label: `REGISTRATIONS (of ${sk.seats} seats)`, value: sk.total.toLocaleString(),      delta: `${sk.fillPct}% fill rate`,           color: '#2563eb', badge: 'badge-green' },
      { label: 'CONFIRMED',                             value: sk.confirmed.toLocaleString(),  delta: `${sk.confirmRate}% of registrations`, color: '#22c55e', badge: sk.confirmRate >= 70 ? 'badge-green' : 'badge-orange' },
      { label: 'CHECKED IN',                            value: sk.checkedIn > 0 ? sk.checkedIn.toLocaleString() : '—', delta: sk.checkedIn > 0 ? `${Math.round(sk.checkedIn/sk.total*100)}% attended` : 'Show upcoming', color: '#8b5cf6', badge: 'badge-green' },
      { label: 'NO-SHOWS',                              value: sk.noShows > 0 ? sk.noShows.toLocaleString() : '—',    delta: sk.noShows > 0 ? `${sk.noShowRate}% no-show rate` : 'None recorded', color: sk.noShows > 0 ? '#ef4444' : '#22c55e', badge: sk.noShows > 0 ? 'badge-red' : 'badge-green' },
    ] : [
      { label: 'APP USERS (MUMBAI)',         value: kpi.appUsers.toLocaleString(),      delta: '+12% this month',     color: '#2563eb', badge: 'badge-green' },
      { label: 'REGISTRATIONS THIS MONTH',  value: kpi.regsThisMonth.toLocaleString(), delta: '+8.4% vs last month', color: '#8b5cf6', badge: 'badge-green' },
      { label: 'CONFIRMATION RATE',         value: `${kpi.confirmRate}%`,              delta: '+0.8% this week',     color: '#22c55e', badge: 'badge-green' },
      { label: 'NO-SHOW RATE',              value: `${kpi.noShowRate}%`,               delta: '-0.5% this week',     color: '#ef4444', badge: 'badge-red'   },
    ];

    const kpiHtml = kpiCards.map(k => `
      <div class="metric-card">
        <div style="font-size:11px;font-weight:600;color:#94a3b8;margin-bottom:6px">${k.label}</div>
        <div style="font-size:30px;font-weight:800;color:${k.color}">${k.value}</div>
        <div style="margin-top:6px"><span class="badge ${k.badge}" style="font-size:11px">${k.delta}</span></div>
      </div>`).join('');

    const areaRows = areas.map(a => `
      <div style="margin-bottom:12px">
        <div style="display:flex;justify-content:space-between;margin-bottom:4px">
          <span style="font-size:13px;color:#374151;font-weight:500">${a.name}</span>
          <span style="font-size:13px;font-weight:700;color:#2563eb">${a.pct}% <span style="font-size:11px;color:#94a3b8;font-weight:400">(${(a.count||0).toLocaleString()})</span></span>
        </div>
        <div class="progress-bar"><div class="progress-fill" style="width:${Math.min(a.pct*4,100)}%"></div></div>
      </div>`).join('');

    const showTableRows = showStats.map(s => {
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

    const chart1Label = isFiltered ? 'Registration Timeline'    : 'Daily Registrations';
    const chart1Sub   = isFiltered ? 'Daily registrations for this show' : `Show seat registrations per day — last ${this._dateRange} days`;
    const chart2Label = isFiltered ? 'Call Status Breakdown'    : 'New App Users';
    const chart2Sub   = isFiltered ? 'Outreach outcomes for this show'   : `New user sign-ups per day — last ${this._dateRange} days`;

    return `
    <div style="max-width:1100px;margin:0 auto">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:22px">
        <div>
          <h1 style="font-size:22px;font-weight:700;color:#1e293b">Analytics</h1>
          <p style="font-size:13px;color:#94a3b8;margin-top:2px">App usage, show registrations, and audience insights — Mumbai.</p>
        </div>
        <div style="display:flex;gap:10px;align-items:center">
          <select class="select" onchange="AnalyticsPage.setShow(this.value)">
            <option value="all" ${this._showFilter==='all'?'selected':''}>All Shows</option>
            ${showOpts}
          </select>
          <select class="select" onchange="AnalyticsPage.setDateRange(this.value)">
            <option value="7"  ${this._dateRange==='7' ?'selected':''}>Last 7 Days</option>
            <option value="14" ${this._dateRange==='14'?'selected':''}>Last 14 Days</option>
            <option value="30" ${this._dateRange==='30'?'selected':''}>Last 30 Days</option>
          </select>
          <button class="btn btn-secondary" onclick="toast('Exporting CSV…','info')">${icon('download',15)} Export CSV</button>
        </div>
      </div>

      <!-- KPI cards -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:22px">
        ${kpiHtml}
      </div>

      <!-- Charts row -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-bottom:18px">
        <div class="card" style="padding:20px">
          <div style="margin-bottom:14px">
            <div style="font-size:15px;font-weight:600;color:#1e293b">${chart1Label}</div>
            <div style="font-size:12px;color:#94a3b8">${chart1Sub}</div>
          </div>
          <div class="chart-wrap" style="height:200px"><canvas id="analyticsChart1"></canvas></div>
        </div>
        <div class="card" style="padding:20px">
          <div style="margin-bottom:14px">
            <div style="font-size:15px;font-weight:600;color:#1e293b">${chart2Label}</div>
            <div style="font-size:12px;color:#94a3b8">${chart2Sub}</div>
          </div>
          <div class="chart-wrap" style="height:200px"><canvas id="analyticsChart2"></canvas></div>
        </div>
      </div>

      <!-- Mumbai area + show performance -->
      <div style="display:grid;grid-template-columns:280px 1fr;gap:18px;margin-bottom:18px">
        <div class="card" style="padding:18px">
          <div style="font-size:14px;font-weight:600;color:#1e293b;margin-bottom:4px">Mumbai Area Breakdown</div>
          <div style="font-size:12px;color:#94a3b8;margin-bottom:14px">Registered users by area</div>
          ${areaRows || '<div style="font-size:13px;color:#94a3b8;text-align:center;padding:20px">No area data</div>'}
        </div>
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
              <tbody>${showTableRows || '<tr><td colspan="6" style="text-align:center;color:#94a3b8;padding:20px;font-size:13px">No data for this show</td></tr>'}</tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Summary strip (all-shows view only) -->
      ${!isFiltered ? `
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
      </div>` : ''}
    </div>`;
  },

  init() {
    const chartData = this._chartData();
    const isFiltered = this._showFilter !== 'all';

    if (isMobile()) {
      const ctx = document.getElementById('mobTrendChart');
      if (!ctx) return;
      const labels = chartData.dailyRegs.labels.slice(-7);
      const values = chartData.dailyRegs.values.slice(-7);
      const chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [{ data: values, backgroundColor: values.map((_,i) => i === values.length-1 ? '#3B4FDB' : '#C7CCEE'), borderRadius: 6 }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false }, ticks: { font: { size: 9 }, color: '#94a3b8' } }, y: { display: false } } }
      });
      window._activeCharts.push(chart);
      return;
    }

    const ctx1 = document.getElementById('analyticsChart1');
    if (ctx1) {
      const chart1 = new Chart(ctx1, {
        type: 'bar',
        data: {
          labels: chartData.dailyRegs.labels,
          datasets: [{
            label: 'Registrations',
            data: chartData.dailyRegs.values,
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

    const ctx2 = document.getElementById('analyticsChart2');
    if (ctx2) {
      if (isFiltered && chartData.callStatus) {
        const chart2 = new Chart(ctx2, {
          type: 'bar',
          data: {
            labels: chartData.callStatus.labels,
            datasets: [{
              data: chartData.callStatus.values,
              backgroundColor: chartData.callStatus.colors,
              borderRadius: 4,
            }]
          },
          options: {
            indexAxis: 'y',
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: { grid: { color: '#f1f5f9' }, ticks: { font: { size: 11 }, color: '#94a3b8' } },
              y: { grid: { display: false }, ticks: { font: { size: 11 }, color: '#374151' } }
            }
          }
        });
        window._activeCharts.push(chart2);
      } else if (chartData.newUsers) {
        const chart2 = new Chart(ctx2, {
          type: 'line',
          data: {
            labels: chartData.newUsers.labels,
            datasets: [{
              label: 'New Users',
              data: chartData.newUsers.values,
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
  }
};
