window.BroadcastPage = {
  render() {
    const recentComms = [
      { show:'Weekend Music Fest – Mumbai', channel:'SMS',       status:'In Progress', target:14433, time:'Just now' },
      { show:'Ticket Confirmed – MKT Pune', channel:'WhatsApp', status:'Delivered',   target:231,   time:'Today'   },
      { show:'Early Bird – Comedy Tour',    channel:'SMS',       status:'Failed SMS',  target:88,    time:'Today'   },
    ];
    const commsRows = recentComms.map(c=>{
      const st = c.status==='In Progress'?'badge-blue':c.status==='Delivered'?'badge-green':'badge-red';
      return `
        <tr>
          <td style="font-size:13px;font-weight:500">${c.show}</td>
          <td><span class="badge badge-gray" style="font-size:11px">${c.channel}</span></td>
          <td><span class="badge ${st}" style="font-size:11px">${c.status}</span></td>
          <td style="font-size:13px;color:#64748b">${c.target.toLocaleString()}</td>
          <td style="font-size:12px;color:#94a3b8">${c.time}</td>
        </tr>`;
    }).join('');

    const tplOptions = D.templates.map(t=>`<option value="${t.id}">${t.name} (${t.channel})</option>`).join('');

    return `
    <div style="max-width:1100px;margin:0 auto">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:22px">
        <div>
          <h1 style="font-size:22px;font-weight:700;color:#1e293b">Broadcast Center</h1>
          <p style="font-size:13px;color:#94a3b8;margin-top:2px">Orchestrate and monitor communications for major Indian shows.</p>
        </div>
        <div style="display:flex;gap:10px">
          <button class="btn btn-secondary" onclick="BroadcastPage.openTemplates()">${icon('file-text',15)} Templates Library</button>
          <button class="btn btn-primary">${icon('plus',15)} New Broadcast</button>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 280px;gap:18px">

        <!-- Compose -->
        <div>
          <div class="card" style="padding:20px;margin-bottom:16px">
            <div style="font-size:15px;font-weight:600;color:#1e293b;margin-bottom:14px">Dispatch Messenger</div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px">
              <div>
                <label style="font-size:11px;font-weight:600;color:#64748b;display:block;margin-bottom:5px">EVENT PROPERTY</label>
                <select class="select" style="width:100%" id="bc-show">
                  ${D.shows.filter(s=>s.status==='active').map(s=>`<option value="${s.id}">${s.name} – ${s.city}</option>`).join('')}
                </select>
              </div>
              <div>
                <label style="font-size:11px;font-weight:600;color:#64748b;display:block;margin-bottom:5px">AUDIENCE SEGMENT</label>
                <select class="select" style="width:100%">
                  <option>All Registrations</option>
                  <option>Confirmed + Not Checked-In</option>
                  <option>Not Called Yet</option>
                  <option>No-Shows (last show)</option>
                </select>
              </div>
            </div>

            <div style="margin-bottom:14px">
              <label style="font-size:11px;font-weight:600;color:#64748b;display:block;margin-bottom:8px">TEMPLATE SELECTION</label>
              <div style="display:flex;gap:8px;margin-bottom:10px">
                ${['SMS','WhatsApp','Email'].map(ch=>`<button class="btn btn-secondary btn-sm" id="ch-${ch}" onclick="BroadcastPage.selectChannel('${ch}')" style="${ch==='WhatsApp'?'background:#eff6ff;border-color:#2563eb;color:#2563eb':''}">${ch}</button>`).join('')}
              </div>
              <select class="select" style="width:100%;margin-bottom:10px" id="bc-template" onchange="BroadcastPage.loadTemplate(this.value)">
                ${tplOptions}
              </select>
            </div>

            <div style="margin-bottom:14px">
              <label style="font-size:11px;font-weight:600;color:#64748b;display:block;margin-bottom:5px">MESSAGE PREVIEW</label>
              <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px">
                <div style="font-size:11px;font-weight:600;color:#94a3b8;margin-bottom:6px">Preview: WhatsApp Business</div>
                <div id="bc-preview" style="font-size:13px;color:#374151;line-height:1.6">
                  Hi <strong>{{Name}}</strong> 👋 Your Dhaasoo ticket for <strong>Neon Echoes Live Mumbai</strong> is ready!<br>
                  📅 24 Oct 2025<br>📍 MMRDA Grounds, BKC, Mumbai<br>
                  Show your QR at Gate 4. See you there!
                </div>
              </div>
              <div style="margin-top:8px;font-size:12px;color:#94a3b8">Target: <strong id="bc-target">14,302 selected</strong> audience members</div>
            </div>

            <div style="display:flex;gap:10px">
              <button class="btn btn-secondary" style="flex:1;justify-content:center" onclick="toast('Draft saved','info')">${icon('save',14)} Save Draft</button>
              <button class="btn btn-primary" style="flex:1;justify-content:center" onclick="BroadcastPage.confirmBroadcast()">${icon('send',14)} Execute Broadcast</button>
            </div>
          </div>

          <!-- Recent comms -->
          <div class="card" style="overflow:hidden">
            <div style="padding:16px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between">
              <div style="font-size:15px;font-weight:600;color:#1e293b">Recent Communications</div>
              <button class="btn btn-ghost btn-sm">View All Logs →</button>
            </div>
            <table class="data-table">
              <thead><tr><th>BROADCAST</th><th>CHANNEL</th><th>STATUS</th><th>TARGET</th><th>TIME</th></tr></thead>
              <tbody>${commsRows}</tbody>
            </table>
          </div>
        </div>

        <!-- Right panels -->
        <div>
          <!-- Delivery Pulse -->
          <div class="card" style="padding:18px;margin-bottom:14px">
            <div style="font-size:13px;font-weight:600;color:#1e293b;margin-bottom:12px">Delivery Pulse</div>
            <div class="chart-wrap" style="height:140px"><canvas id="deliveryChart"></canvas></div>
            <div style="margin-top:12px">
              <div style="font-size:24px;font-weight:800;color:#2563eb">64.2%</div>
              <div style="font-size:12px;color:#94a3b8">Open rate this campaign</div>
              <div style="margin-top:8px;display:flex;align-items:center;gap:6px">
                <div style="font-size:20px;font-weight:700;color:#22c55e">12s</div>
                <div style="font-size:12px;color:#94a3b8">Avg. response time</div>
              </div>
            </div>
          </div>

          <!-- Smart suggestion -->
          <div class="card" style="padding:16px;margin-bottom:14px;background:#fffbeb;border:1px solid #fde68a">
            <div style="font-size:11px;font-weight:600;color:#92400e;margin-bottom:8px">SMART SUGGESTION: PEAK ENGAGEMENT</div>
            <div style="font-size:13px;color:#374151;margin-bottom:8px">Festival audiences engage exactly 100 minutes before show start. Scheduling SMS at this window yields 45% higher read rate.</div>
            <button class="btn btn-sm" style="background:#f59e0b;color:#fff;width:100%;justify-content:center">Adopt Strategy</button>
          </div>

          <!-- Upcoming Queue -->
          <div class="card" style="padding:16px">
            <div style="font-size:13px;font-weight:600;color:#1e293b;margin-bottom:10px">Upcoming Queue</div>
            ${[
              { name:'After-party Invite', show:'Neon Echoes Live', time:'Tomorrow, 10:00 AM' },
              { name:'Feedback Survey',    show:'Weekend Music Fest', time:'Tomorrow, 02:30 PM' },
            ].map(q=>`
              <div style="padding:10px;background:#f8fafc;border-radius:8px;margin-bottom:8px">
                <div style="font-size:13px;font-weight:600;color:#1e293b">${q.name}</div>
                <div style="font-size:12px;color:#94a3b8;margin-top:2px">${q.show}</div>
                <div style="font-size:11px;color:#2563eb;margin-top:3px">${q.time}</div>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </div>`;
  },

  init() {
    const ctx = document.getElementById('deliveryChart');
    if (!ctx) return;
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Sent', 'Delivered', 'Read', 'Failed'],
        datasets: [{
          data: [14302, 12800, 9190, 450],
          backgroundColor: ['#bfdbfe','#86efac','#4ade80','#fca5a5'],
          borderRadius: 6,
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 11 }, color: '#94a3b8' } },
          y: { display: false }
        }
      }
    });
    window._activeCharts.push(chart);
  },

  selectChannel(ch) {
    ['SMS','WhatsApp','Email'].forEach(c => {
      const btn = document.getElementById(`ch-${c}`);
      if (btn) btn.style = c===ch ? 'background:#eff6ff;border-color:#2563eb;color:#2563eb' : '';
    });
  },

  loadTemplate(id) {
    const tpl = D.templates.find(t=>t.id===id);
    if (!tpl) return;
    const preview = document.getElementById('bc-preview');
    if (preview) preview.innerHTML = tpl.body.replace(/\{\{(\w+)\}\}/g, '<strong>{{$1}}</strong>').replace(/\n/g,'<br>');
  },

  confirmBroadcast() {
    showModal(`
      <div style="text-align:center;margin-bottom:16px">
        <div style="font-size:40px;margin-bottom:8px">📨</div>
        <div style="font-size:18px;font-weight:700;color:#1e293b">Confirm Broadcast</div>
        <div style="font-size:14px;color:#64748b;margin-top:8px">You are about to send a message to <strong>14,302 audience members</strong> via WhatsApp. This cannot be undone.</div>
      </div>
      <div style="display:flex;gap:10px;margin-top:20px">
        <button class="btn btn-secondary" style="flex:1;justify-content:center" onclick="closeModal()">Cancel</button>
        <button class="btn btn-primary" style="flex:1;justify-content:center" onclick="closeModal();toast('Broadcast dispatched to 14,302 users!','success')">Execute Broadcast</button>
      </div>
    `);
  },

  openTemplates() {
    const rows = D.templates.map(t=>`
      <div style="padding:12px;border:1px solid #e2e8f0;border-radius:8px;margin-bottom:8px">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <div style="font-size:13px;font-weight:600;color:#1e293b">${t.name}</div>
          <span class="badge badge-blue" style="font-size:10px">${t.channel}</span>
        </div>
        <div style="font-size:12px;color:#64748b;margin-top:4px">${t.body.substring(0,80)}…</div>
      </div>`).join('');
    showModal(`
      <div style="font-size:16px;font-weight:700;color:#1e293b;margin-bottom:14px">Message Templates</div>
      ${rows}
      <button class="btn btn-ghost" style="width:100%;margin-top:8px;justify-content:center" onclick="closeModal()">Close</button>
    `);
  }
};
