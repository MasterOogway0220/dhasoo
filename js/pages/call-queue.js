window.CallQueuePage = {
  _current: 0,

  render() {
    const queue = D.callQueue;
    const user  = queue[this._current] || queue[0];
    const called = 12, total = queue.length + called;
    const pct = Math.round((called/total)*100);

    const queueList = queue.map((u,i) => {
      const flagged = u.priority==='flagged';
      return `
        <div style="display:flex;align-items:center;gap:10px;padding:10px;border-radius:8px;cursor:pointer;${i===this._current?'background:#eff6ff;border:1px solid #bfdbfe;':'border:1px solid transparent'}" onclick="CallQueuePage.selectUser(${i})">
          <div class="avatar ${u.avatar}" style="width:36px;height:36px;font-size:12px;flex-shrink:0">${u.initials}</div>
          <div style="flex:1;min-width:0">
            <div style="font-size:13px;font-weight:600;color:#1e293b">${u.name}</div>
            <div style="font-size:11px;color:#94a3b8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${u.mobile}</div>
          </div>
          ${flagged?`<span class="badge badge-red" style="font-size:10px">Flagged</span>`:''}
        </div>`;
    }).join('');

    return `
    <div style="max-width:1100px;margin:0 auto">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:22px">
        <div>
          <h1 style="font-size:22px;font-weight:700;color:#1e293b">Call Queue</h1>
          <p style="font-size:13px;color:#94a3b8;margin-top:2px">Confirm audience attendance for upcoming shows.</p>
        </div>
        <div style="display:flex;gap:10px">
          <select class="select">
            <option>Neon Echoes Live Mumbai – 24 Oct</option>
            <option>MH Weekender Finals – 15 Nov</option>
          </select>
        </div>
      </div>

      <!-- Progress -->
      <div class="card" style="padding:16px;margin-bottom:20px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
          <div style="font-size:13px;font-weight:600;color:#1e293b">Queue Progress</div>
          <div style="font-size:13px;color:#2563eb;font-weight:600">${called} / ${total} called</div>
        </div>
        <div class="progress-bar" style="height:10px"><div class="progress-fill" style="width:${pct}%"></div></div>
        <div style="display:flex;justify-content:space-between;margin-top:8px;font-size:12px;color:#94a3b8">
          <span>${queue.length} remaining</span>
          <span>${pct}% complete</span>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 280px;gap:18px">

        <!-- Current user card -->
        <div>
          <div class="card" style="padding:24px;margin-bottom:16px">
            <div style="font-size:11px;font-weight:600;color:#94a3b8;margin-bottom:12px">NEXT TO CALL</div>
            <div style="display:flex;align-items:center;gap:14px;margin-bottom:16px">
              <div class="avatar ${user.avatar}" style="width:56px;height:56px;font-size:18px">${user.initials}</div>
              <div>
                <div style="font-size:18px;font-weight:700;color:#1e293b">${user.name}</div>
                <div style="font-size:13px;color:#94a3b8">${user.city} · ${user.age} · ${user.gender}</div>
                ${user.noShows>0?`<span class="badge badge-red" style="font-size:10px;margin-top:4px">⚠️ ${user.noShows} past no-show${user.noShows>1?'s':''}</span>`:''}
              </div>
            </div>

            <div style="background:#f8fafc;border-radius:10px;padding:16px;margin-bottom:16px">
              <div style="font-size:11px;font-weight:600;color:#94a3b8;margin-bottom:4px">REGISTERED FOR</div>
              <div style="font-size:14px;font-weight:600;color:#1e293b">${user.showName}</div>
              <div style="font-size:12px;color:#94a3b8">Registration: ${user.id}</div>
            </div>

            <div style="display:flex;gap:10px;margin-bottom:20px">
              <a href="tel:${user.mobile}" class="btn btn-primary" style="flex:1;justify-content:center">${icon('phone',16)} ${user.mobile}</a>
              <button class="btn" style="flex:1;justify-content:center;background:#25D366;color:#fff" onclick="toast('Opening WhatsApp…','info')">${icon('message-circle',16)} WhatsApp</button>
            </div>

            <!-- Outcome form -->
            <div style="border-top:1px solid #f1f5f9;padding-top:16px">
              <div style="font-size:13px;font-weight:600;color:#1e293b;margin-bottom:12px">Log Call Outcome</div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px">
                <div>
                  <label style="font-size:11px;font-weight:600;color:#94a3b8;display:block;margin-bottom:4px">STATUS</label>
                  <select class="select" style="width:100%" id="cq-status">
                    <option value="confirmed">Confirmed</option>
                    <option value="declined">Declined</option>
                    <option value="no_answer">No Answer</option>
                    <option value="callback">Callback Requested</option>
                    <option value="wrong">Wrong Number</option>
                    <option value="dnd">Do Not Disturb</option>
                  </select>
                </div>
                <div>
                  <label style="font-size:11px;font-weight:600;color:#94a3b8;display:block;margin-bottom:4px">GUESTS CONFIRMED</label>
                  <input class="input" type="number" value="1" min="0" max="5">
                </div>
              </div>
              <div style="margin-bottom:10px">
                <label style="font-size:11px;font-weight:600;color:#94a3b8;display:block;margin-bottom:4px">REMARKS</label>
                <textarea class="input" rows="2" placeholder="Notes, callback time, special requests…"></textarea>
              </div>
              <div style="display:flex;gap:10px">
                <button class="btn btn-secondary" style="flex:1;justify-content:center" onclick="CallQueuePage.skip()">Skip</button>
                <button class="btn btn-primary" style="flex:1;justify-content:center" onclick="CallQueuePage.saveAndNext()">Save &amp; Next →</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Queue list -->
        <div>
          <div class="card" style="padding:16px">
            <div style="font-size:13px;font-weight:600;color:#1e293b;margin-bottom:12px">My Queue (${queue.length} remaining)</div>
            <div style="display:flex;flex-direction:column;gap:6px;max-height:500px;overflow-y:auto">
              ${queueList}
            </div>
          </div>
        </div>
      </div>
    </div>`;
  },

  init() {},

  selectUser(i) {
    this._current = i;
    navigate('call-queue');
  },

  skip() {
    this._current = (this._current + 1) % D.callQueue.length;
    navigate('call-queue');
    toast('Skipped to next user','info');
  },

  saveAndNext() {
    const status = document.getElementById('cq-status')?.value || 'confirmed';
    const labels = { confirmed:'Confirmed ✓', declined:'Marked Declined', no_answer:'No Answer logged', callback:'Callback scheduled', wrong:'Wrong Number flagged', dnd:'DND flagged' };
    toast(labels[status] || 'Outcome saved','success');
    this._current = (this._current + 1) % D.callQueue.length;
    navigate('call-queue');
  }
};
