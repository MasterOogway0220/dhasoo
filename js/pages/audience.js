window.AudiencePage = {
  render(params) {
    const user = D.audience[0]; // single profile for demo
    const historyRows = user.history.map(h => {
      const badge = h.status==='attended' ? 'badge-green' : 'badge-red';
      const label = h.status==='attended' ? 'Attended' : 'No-Show';
      return `
        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid #f8fafc">
          <div>
            <div style="font-size:13px;font-weight:600;color:#1e293b">${h.show}</div>
            <div style="font-size:12px;color:#94a3b8">${h.date}</div>
          </div>
          <span class="badge ${badge}" style="font-size:11px">${label}</span>
        </div>`;
    }).join('');

    const logItems = user.callLog.map(l => {
      const cfg = {
        confirmed: { color:'bg-green-100 text-green-600', ic:'check-circle', label:'Verification Call' },
        sms:       { color:'bg-blue-100 text-blue-600',   ic:'message-square', label:'Auto Confirmation Message' },
        reminder:  { color:'bg-yellow-100 text-yellow-600', ic:'bell', label:'Reminder Call' },
      }[l.outcome] || { color:'bg-gray-100 text-gray-600', ic:'phone', label:'Call' };

      return `
        <div class="log-item">
          <div class="log-dot ${cfg.color}" style="width:30px;height:30px">${icon(cfg.ic,14)}</div>
          <div style="flex:1">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
              <div style="font-size:13px;font-weight:600;color:#1e293b">${cfg.label}</div>
              <div style="font-size:11px;color:#94a3b8">${l.date}</div>
            </div>
            <div style="font-size:12px;color:#64748b;margin-bottom:4px">Agent: ${l.agent}</div>
            <div style="font-size:13px;color:#374151;background:#f8fafc;padding:8px;border-radius:8px">${l.remark}</div>
          </div>
        </div>`;
    }).join('');

    const repColor = user.reputation>=800?'#22c55e':user.reputation>=600?'#f97316':'#ef4444';

    return `
    <div style="max-width:1100px;margin:0 auto">
      <button class="btn btn-ghost btn-sm" style="margin-bottom:16px" onclick="history.back()">${icon('arrow-left',15)} Back</button>

      <div style="display:grid;grid-template-columns:300px 1fr 220px;gap:18px;align-items:start">

        <!-- Left: Profile -->
        <div>
          <div class="card" style="padding:20px;text-align:center;margin-bottom:14px">
            <div style="position:relative;display:inline-block;margin-bottom:12px">
              <div class="avatar ${user.avatar}" style="width:72px;height:72px;font-size:22px;margin:0 auto">${user.initials}</div>
              <div style="position:absolute;bottom:0;right:0;width:18px;height:18px;background:#22c55e;border-radius:50%;border:2px solid #fff"></div>
            </div>
            <div style="font-size:17px;font-weight:700;color:#1e293b">${user.name}</div>
            <div style="font-size:12px;color:#94a3b8;margin-top:2px">Member since ${user.memberSince}</div>

            <div style="display:flex;justify-content:center;gap:10px;margin:14px 0">
              <button class="btn btn-primary btn-sm" onclick="toast('Opening dialler…','info')">${icon('phone',14)} Call</button>
              <button class="btn" style="background:#25D366;color:#fff;padding:5px 12px;font-size:13px" onclick="toast('Opening WhatsApp…','info')">${icon('message-circle',14)} WhatsApp</button>
            </div>

            <div style="text-align:left;border-top:1px solid #f1f5f9;padding-top:14px">
              <div style="font-size:12px;color:#94a3b8;margin-bottom:10px;font-weight:600">PROFILE DETAILS</div>
              ${[
                ['Age / Gender', `${user.age} / ${user.gender}`],
                ['City', user.city],
                ['Mobile', user.mobile],
                ['Email', user.email],
                ['DOB', user.dob],
              ].map(([k,v])=>`
                <div style="display:flex;justify-content:space-between;margin-bottom:8px">
                  <span style="font-size:12px;color:#94a3b8">${k}</span>
                  <span style="font-size:13px;color:#374151;font-weight:500">${v}</span>
                </div>`).join('')}
            </div>

            <div style="background:#f8fafc;border-radius:10px;padding:12px;margin-top:10px">
              <div style="font-size:11px;color:#94a3b8;font-weight:600;margin-bottom:6px">REPUTATION SCORE</div>
              <div style="font-size:32px;font-weight:800;color:${repColor}">${user.reputation}</div>
              <div class="progress-bar" style="margin-top:6px"><div class="progress-fill green" style="width:${user.reputation/10}%"></div></div>
              <div style="display:flex;justify-content:space-between;margin-top:4px;font-size:11px;color:#94a3b8"><span>0</span><span>1000</span></div>
            </div>
          </div>

          <!-- Stats -->
          <div class="card" style="padding:16px">
            <div style="font-size:13px;font-weight:600;color:#1e293b;margin-bottom:12px">Attendance Stats</div>
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;text-align:center">
              <div><div style="font-size:20px;font-weight:700;color:#1e293b">${user.totalShows}</div><div style="font-size:11px;color:#94a3b8">Total</div></div>
              <div><div style="font-size:20px;font-weight:700;color:#22c55e">${user.attended}</div><div style="font-size:11px;color:#94a3b8">Attended</div></div>
              <div><div style="font-size:20px;font-weight:700;color:#ef4444">${user.noShows}</div><div style="font-size:11px;color:#94a3b8">No-Shows</div></div>
            </div>
          </div>
        </div>

        <!-- Centre: Active show + Log -->
        <div>
          <!-- Active show -->
          <div class="card" style="padding:18px;margin-bottom:14px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
              <span style="font-size:13px;font-weight:600;color:#1e293b">Active Registration</span>
              <span class="badge badge-green">ACTIVE REGISTRATION</span>
            </div>
            <div style="font-size:17px;font-weight:700;color:#1e293b;margin-bottom:8px">${user.activeShow.name}</div>
            <div style="font-size:13px;color:#64748b;margin-bottom:10px">Reg ID: ${user.activeShow.regId} · Ticket: <span class="badge badge-blue">${user.activeShow.ticketStatus.toUpperCase()}</span></div>
            <div style="background:#f0fdf4;border-radius:10px;padding:16px;text-align:center;margin-bottom:12px">
              <div style="font-size:11px;color:#94a3b8;margin-bottom:8px">QR TICKET PREVIEW</div>
              <div style="width:80px;height:80px;background:#1e293b;border-radius:8px;margin:0 auto;display:flex;align-items:center;justify-content:center;font-size:28px">🎟️</div>
              <div style="font-size:11px;color:#94a3b8;margin-top:6px">${user.activeShow.regId}</div>
            </div>
            <div style="display:flex;gap:8px">
              <button class="btn btn-secondary btn-sm" onclick="toast('Ticket resent via SMS','success')">${icon('send',13)} Resend SMS</button>
              <button class="btn btn-secondary btn-sm" onclick="toast('Ticket resent via WhatsApp','success')">${icon('message-circle',13)} WhatsApp</button>
              <button class="btn btn-danger btn-sm" onclick="toast('Registration cancelled','error')">${icon('x',13)} Cancel</button>
            </div>
          </div>

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
            <textarea class="input" rows="6" style="font-size:13px;resize:none" placeholder="Add a quick note about this audience member…">User confirmed attendance for Vinyl Night. Requested front seating. Has been reliable — attended 11 out of 12 shows.</textarea>
            <button class="btn btn-primary" style="width:100%;justify-content:center;margin-top:10px" onclick="toast('Note saved','success')">Save Note</button>
          </div>

          <!-- Next Action -->
          <div class="card" style="padding:16px;background:#f0fdf4;border:1px solid #bbf7d0">
            <div style="font-size:12px;font-weight:600;color:#16a34a;margin-bottom:8px">NEXT ACTION RECOMMENDATION</div>
            <div style="font-size:13px;color:#374151;margin-bottom:10px">Based on past data, this user is a <strong>reliable attendee</strong>. A reminder SMS 24h before the show is sufficient. No need for a call.</div>
            <div style="font-size:26px;font-weight:800;color:#22c55e;text-align:center;margin-bottom:4px">92%</div>
            <div style="font-size:11px;color:#94a3b8;text-align:center">Predicted show-up probability</div>
          </div>
        </div>
      </div>
    </div>`;
  },

  init() {},

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
