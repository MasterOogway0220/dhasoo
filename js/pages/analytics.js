window.AnalyticsPage = {
  render() {
    const kpi = D.analyticsData.kpis;
    const kpiCards = [
      { label:'FILL RATE',         value:`${kpi.fillRate}%`,         delta:'+2.1%', color:'#2563eb',  badge:'badge-green' },
      { label:'CONFIRMATION RATE', value:`${kpi.confirmRate}%`,      delta:'+0.8%', color:'#22c55e',  badge:'badge-green' },
      { label:'ATTENDANCE RATE',   value:`${kpi.attendanceRate}%`,   delta:'+1.2%', color:'#8b5cf6',  badge:'badge-green' },
      { label:'NO-SHOW RATE',      value:`${kpi.noShowRate}%`,       delta:'-0.5%', color:'#ef4444',  badge:'badge-red'   },
    ].map(k=>`
      <div class="metric-card">
        <div style="font-size:11px;font-weight:600;color:#94a3b8;margin-bottom:6px">${k.label}</div>
        <div style="font-size:32px;font-weight:800;color:${k.color}">${k.value}</div>
        <div style="margin-top:6px">
          <span class="badge ${k.badge}" style="font-size:11px">${k.delta}</span>
        </div>
      </div>`).join('');

    const agentRows = D.agents.map(a=>{
      const stBadge = a.status==='active'?'badge-green':a.status==='break'?'badge-yellow':'badge-gray';
      const barW = Math.min(a.conversion*2,100);
      return `
        <tr>
          <td>
            <div style="display:flex;align-items:center;gap:10px">
              <div class="avatar ${a.avatar}" style="width:32px;height:32px;font-size:12px">${a.initials}</div>
              <div>
                <div style="font-size:13px;font-weight:600;color:#1e293b">${a.name}</div>
                <div style="font-size:11px;color:#94a3b8">${a.role}</div>
              </div>
            </div>
          </td>
          <td style="font-size:13px">${a.calls.toLocaleString()}</td>
          <td style="font-size:13px">${a.confirmed.toLocaleString()}</td>
          <td>
            <div style="display:flex;align-items:center;gap:8px">
              <span style="font-size:13px;font-weight:600;color:#2563eb">${a.conversion}%</span>
              <div class="progress-bar" style="width:80px"><div class="progress-fill" style="width:${barW}%"></div></div>
            </div>
          </td>
          <td><span class="badge ${stBadge}" style="font-size:11px">${a.status.toUpperCase()}</span></td>
        </tr>`;
    }).join('');

    const topAgent = D.agents.reduce((a,b)=>a.conversion>b.conversion?a:b);

    return `
    <div style="max-width:1100px;margin:0 auto">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:22px">
        <div>
          <h1 style="font-size:22px;font-weight:700;color:#1e293b">Deep Analytics</h1>
          <p style="font-size:13px;color:#94a3b8;margin-top:2px">Operational performance and engagement audit.</p>
        </div>
        <div style="display:flex;gap:10px">
          <button class="btn btn-secondary" onclick="toast('Exporting PDF…','info')">${icon('file-text',15)} PDF</button>
          <button class="btn btn-secondary" onclick="toast('Exporting CSV…','info')">${icon('download',15)} CSV</button>
          <select class="select">
            <option>Last 30 Days</option><option>Last 60 Days</option><option>Last 90 Days</option><option>Custom Range</option>
          </select>
        </div>
      </div>

      <!-- KPI cards -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:22px">
        ${kpiCards}
      </div>

      <div style="display:grid;grid-template-columns:1fr 240px;gap:18px;margin-bottom:18px">
        <!-- Trend chart -->
        <div class="card" style="padding:20px">
          <div style="margin-bottom:14px">
            <div style="font-size:15px;font-weight:600;color:#1e293b">Registration Trends</div>
            <div style="font-size:12px;color:#94a3b8">30/60/90-day trajectory by event category</div>
          </div>
          <div style="display:flex;align-items:center;gap:16px;margin-bottom:12px">
            <span style="display:flex;align-items:center;gap:5px;font-size:12px;color:#374151">${icon('minus',12,'text-blue-500')} Concerts</span>
            <span style="display:flex;align-items:center;gap:5px;font-size:12px;color:#374151">${icon('minus',12,'text-green-500')} Tech Talk</span>
            <span style="display:flex;align-items:center;gap:5px;font-size:12px;color:#374151">${icon('minus',12,'text-orange-400')} Workshops</span>
          </div>
          <div class="chart-wrap" style="height:220px"><canvas id="trendChart3"></canvas></div>
        </div>

        <!-- Top regions -->
        <div class="card" style="padding:18px">
          <div style="font-size:14px;font-weight:600;color:#1e293b;margin-bottom:14px">Top Regions</div>
          ${D.analyticsData.cities.map(c=>`
            <div style="margin-bottom:14px">
              <div style="display:flex;justify-content:space-between;margin-bottom:5px">
                <span style="font-size:13px;color:#374151">${c.name}</span>
                <span style="font-size:13px;font-weight:700;color:#2563eb">${c.pct}%</span>
              </div>
              <div class="progress-bar"><div class="progress-fill" style="width:${c.pct}%"></div></div>
            </div>`).join('')}
          <button class="btn btn-ghost btn-sm" style="width:100%;justify-content:center;margin-top:8px">VIEW HEATMAP DATA →</button>
        </div>
      </div>

      <!-- Agent performance -->
      <div class="card">
        <div style="padding:16px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between">
          <div>
            <div style="font-size:15px;font-weight:600;color:#1e293b">Agent Performance</div>
            <div style="font-size:12px;color:#94a3b8">Individual conversion metrics for the calling department</div>
          </div>
          <span class="badge badge-green">Top Performer: ${topAgent.name}</span>
        </div>
        <table class="data-table">
          <thead><tr><th>AGENT NAME</th><th>CALLS MADE</th><th>CONFIRMATIONS SECURED</th><th>CONVERSION %</th><th>STATUS</th></tr></thead>
          <tbody>${agentRows}</tbody>
        </table>
      </div>
    </div>`;
  },

  init() {
    const ctx = document.getElementById('trendChart3');
    if (!ctx) return;
    const d = D.analyticsData.trend30;
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: d.labels,
        datasets: [
          { label:'Concerts',  data:d.concerts,  borderColor:'#3b82f6', backgroundColor:'rgba(59,130,246,0.05)', borderWidth:2.5, fill:true, tension:0.4, pointRadius:3 },
          { label:'Tech Talk', data:d.techTalk,  borderColor:'#22c55e', backgroundColor:'rgba(34,197,94,0.05)',  borderWidth:2.5, fill:true, tension:0.4, pointRadius:3 },
          { label:'Workshops', data:d.workshops, borderColor:'#f97316', backgroundColor:'rgba(249,115,22,0.05)', borderWidth:2.5, fill:true, tension:0.4, pointRadius:3 },
        ]
      },
      options: {
        responsive:true, maintainAspectRatio:false,
        plugins: { legend:{ display:false }, tooltip:{ mode:'index' } },
        scales: {
          x: { grid:{ display:false }, ticks:{ font:{ size:11 }, color:'#94a3b8' } },
          y: { grid:{ color:'#f1f5f9' }, ticks:{ font:{ size:11 }, color:'#94a3b8' } }
        }
      }
    });
    window._activeCharts.push(chart);
  }
};
