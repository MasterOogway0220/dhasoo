window.CallQueuePage = {
  _current: 0,

  render() {
    return isMobile() ? this.renderMobile() : this.renderDesktop();
  },

  renderMobile() {
    const queue = D.callQueue;
    const user = queue[this._current] || queue[0];
    const called = 12, total = queue.length + called;
    const pct = Math.round((called / total) * 100);

    const queueCards = queue.map((u, i) => `
      <div style="display:flex;align-items:center;gap:10px;padding:10px;border-radius:12px;${i===this._current?'background:#EEF0FB;border:1.5px solid #3B4FDB':'background:#f8fafc;border:1.5px solid transparent'};margin-bottom:8px;cursor:pointer" onclick="CallQueuePage.selectUser(${i})">
        <div class="avatar ${u.avatar}" style="width:38px;height:38px;font-size:13px;flex-shrink:0">${u.initials}</div>
        <div style="flex:1;min-width:0">
          <div style="font-size:13px;font-weight:600;color:#0F172A">${u.name}</div>
          <div style="font-size:11px;color:#94a3b8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${u.showName.split(' ').slice(0,3).join(' ')}</div>
        </div>
        ${u.priority==='flagged'?`<span style="background:#fee2e2;color:#dc2626;font-size:9px;font-weight:700;padding:2px 8px;border-radius:20px">FLAGGED</span>`:''}
      </div>`).join('');

    return `
    <div style="background:#ECEEF5;min-height:100vh;padding-bottom:80px">
      <div style="padding:20px 16px 14px">
        <div class="mob-section-label">CALLING OPERATIONS</div>
        <div class="mob-page-title">Call Queue</div>
      </div>

      <div style="padding:0 16px">
        <!-- Progress -->
        <div class="mob-card">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
            <span style="font-size:13px;font-weight:600;color:#0F172A">Queue Progress</span>
            <span style="font-size:13px;font-weight:700;color:#3B4FDB">${called} / ${total} called</span>
          </div>
          <div style="background:#e2e8f0;border-radius:6px;height:8px">
            <div style="background:#3B4FDB;width:${pct}%;height:100%;border-radius:6px"></div>
          </div>
          <div style="font-size:11px;color:#94a3b8;margin-top:6px">${queue.length} remaining in queue</div>
        </div>

        <!-- Current user card -->
        <div class="mob-card">
          <div style="font-size:10px;font-weight:700;color:#94a3b8;letter-spacing:0.06em;margin-bottom:10px">NEXT TO CALL</div>
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
            <div class="avatar ${user.avatar}" style="width:52px;height:52px;font-size:18px;border-radius:14px">${user.initials}</div>
            <div>
              <div style="font-size:17px;font-weight:700;color:#0F172A">${user.name}</div>
              <div style="font-size:12px;color:#64748b">${user.city} · ${user.age} · ${user.gender}</div>
              ${user.noShows > 0 ? `<span style="background:#fee2e2;color:#dc2626;font-size:10px;font-weight:700;padding:2px 8px;border-radius:10px;display:inline-block;margin-top:3px">⚠️ ${user.noShows} no-show${user.noShows>1?'s':''}</span>` : ''}
            </div>
          </div>

          <div style="background:#f8fafc;border-radius:12px;padding:12px;margin-bottom:14px">
            <div style="font-size:10px;font-weight:700;color:#94a3b8;margin-bottom:3px">REGISTERED FOR</div>
            <div style="font-size:14px;font-weight:600;color:#0F172A">${user.showName}</div>
            <div style="font-size:11px;color:#94a3b8">${user.id}</div>
          </div>

          <!-- Phone + WhatsApp -->
          <div style="display:flex;gap:8px;margin-bottom:14px">
            <div style="flex:1;display:flex;align-items:center;gap:8px;background:#fff;border:1.5px solid #e2e8f0;border-radius:12px;padding:11px 14px">
              ${icon('phone',16)}
              <a href="tel:${user.mobile}" style="color:#E8761A;font-weight:700;font-size:15px;text-decoration:none;display:flex;align-items:center;gap:6px;">${user.mobile}</a>
            </div>
            <button style="width:48px;height:48px;background:#25D366;border:none;border-radius:12px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#fff" onclick="toast('Opening WhatsApp…','info')">${icon('message-circle',20)}</button>
          </div>

          <!-- Quick outcome buttons -->
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:10px">
            <button style="padding:11px 6px;border-radius:12px;border:none;background:#3B4FDB;color:#fff;font-size:12px;font-weight:700;cursor:pointer" onclick="CallQueuePage.quickSave('confirmed')">Confirmed</button>
            <button style="padding:11px 6px;border-radius:12px;border:1.5px solid #e2e8f0;background:#fff;color:#64748b;font-size:12px;font-weight:700;cursor:pointer" onclick="CallQueuePage.quickSave('no_answer')">No Answer</button>
            <button style="padding:11px 6px;border-radius:12px;border:none;background:#fee2e2;color:#dc2626;font-size:12px;font-weight:700;cursor:pointer" onclick="CallQueuePage.quickSave('declined')">Declined</button>
          </div>
          <div style="display:flex;gap:8px">
            <button class="mob-btn-outline" style="padding:11px" onclick="CallQueuePage.skip()">Skip →</button>
            <button class="mob-btn-primary" style="padding:11px" onclick="CallQueuePage.saveAndNext()">Save &amp; Next</button>
          </div>
        </div>

        <!-- Queue list -->
        <div style="font-size:16px;font-weight:700;color:#0F172A;margin:4px 0 10px">My Queue (${queue.length})</div>
        <div class="mob-card">${queueCards}</div>
      </div>
    </div>`;
  },

  renderDesktop() {
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
            <a href="tel:${u.mobile}" style="font-size:11px;color:#E8761A;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-decoration:none;display:block">${u.mobile}</a>
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
              <div style="flex:1;display:flex;align-items:center;gap:8px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px 14px">
                ${icon('phone',16)}
                <a href="tel:${user.mobile}" style="color:#E8761A;font-weight:700;font-size:15px;text-decoration:none;display:flex;align-items:center;gap:6px;">${user.mobile}</a>
              </div>
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

  quickSave(status) {
    const labels = { confirmed:'Confirmed ✓', no_answer:'No Answer logged', declined:'Marked Declined' };
    toast(labels[status] || 'Outcome saved', 'success');
    this._current = (this._current + 1) % D.callQueue.length;
    navigate('call-queue');
  },

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
