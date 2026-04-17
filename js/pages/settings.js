window.SettingsPage = {
  render() {
    const adminRows = D.adminUsers.map(u => {
      const stBadge = u.status==='active'?'badge-green':u.status==='suspended'?'badge-red':'badge-gray';
      return `
        <tr>
          <td>
            <div style="display:flex;align-items:center;gap:10px">
              <div class="avatar ${u.avatar}" style="width:32px;height:32px;font-size:12px">${u.initials}</div>
              <div>
                <div style="font-size:13px;font-weight:600;color:#1e293b">${u.name}</div>
                <div style="font-size:12px;color:#94a3b8">${u.email}</div>
              </div>
            </div>
          </td>
          <td><span class="badge badge-blue" style="font-size:11px">${u.role}</span></td>
          <td style="font-size:13px;color:#64748b">${u.access}</td>
          <td><span class="badge ${stBadge}" style="font-size:11px">${u.status.charAt(0).toUpperCase()+u.status.slice(1)}</span></td>
          <td>
            <div style="display:flex;gap:6px">
              <button class="btn btn-ghost btn-sm" onclick="SettingsPage.editAdmin('${u.id}')">${icon('edit',13)}</button>
              <button class="btn btn-ghost btn-sm" onclick="SettingsPage.toggleAdmin('${u.id}',${u.status==='suspended'})">${icon(u.status==='suspended'?'check-circle':'ban',13)}</button>
            </div>
          </td>
        </tr>`;
    }).join('');

    return `
    <div style="max-width:1100px;margin:0 auto">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:22px">
        <div>
          <div style="font-size:12px;color:#94a3b8;margin-bottom:4px">Organisation › System Settings</div>
          <h1 style="font-size:22px;font-weight:700;color:#1e293b">Admin Settings &amp; Role Management</h1>
          <p style="font-size:13px;color:#94a3b8;margin-top:2px">Configure your operational thresholds, manage role-level permissions, and oversee administrative changes across the regional offices.</p>
        </div>
        <button class="btn btn-primary" onclick="SettingsPage.openAddAdmin()">${icon('user-plus',15)} Add New Admin</button>
      </div>

      <div style="display:grid;grid-template-columns:1fr 280px;gap:18px">

        <!-- Left -->
        <div>
          <!-- Admin table -->
          <div class="card" style="margin-bottom:16px;overflow:hidden">
            <div style="padding:16px;border-bottom:1px solid #f1f5f9">
              <div style="font-size:15px;font-weight:600;color:#1e293b">Administrative Staff</div>
              <div style="font-size:13px;color:#94a3b8;margin-top:2px">Active admin personnel with system-level access.</div>
            </div>
            <div style="overflow-x:auto">
              <table class="data-table">
                <thead><tr><th>ADMIN</th><th>ROLE</th><th>ACCESS SCOPE</th><th>STATUS</th><th>ACTIONS</th></tr></thead>
                <tbody>${adminRows}</tbody>
              </table>
            </div>
          </div>

          <!-- Role Audit Log -->
          <div class="card" style="padding:20px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
              <div>
                <div style="font-size:15px;font-weight:600;color:#1e293b">Role Audit Log</div>
                <div style="font-size:13px;color:#94a3b8">The last 24 hours of administrative changes and account operations across the regional offices.</div>
              </div>
              <button class="btn btn-secondary btn-sm" onclick="toast('Opening activity stream…','info')">View Activity Stream</button>
            </div>
            <div>
              ${[
                { time:'10:34 AM', user:'Rajesh Sharma', action:'Suspended account for Disha Malik', type:'warning' },
                { time:'09:12 AM', user:'Arjun Mehta',   action:'Created new show: Comedy Dhamaal', type:'info'    },
                { time:'08:55 AM', user:'System',         action:'Auto-flagged user +91 99001 22334 (3 no-shows)',  type:'warning' },
                { time:'Yesterday', user:'Rajesh Sharma', action:'Updated SMS provider API key',    type:'info'    },
              ].map(l=>{
                const colors = { warning:'bg-yellow-100 text-yellow-700', info:'bg-blue-100 text-blue-600', error:'bg-red-100 text-red-600' };
                const icons  = { warning:'alert-triangle', info:'info', error:'x-circle' };
                return `
                  <div style="display:flex;gap:10px;padding:10px 0;border-bottom:1px solid #f8fafc">
                    <div style="font-size:11px;color:#94a3b8;white-space:nowrap;min-width:70px">${l.time}</div>
                    <div class="avatar ${colors[l.type]}" style="width:24px;height:24px;flex-shrink:0">${icon(icons[l.type],12)}</div>
                    <div>
                      <span style="font-size:13px;font-weight:600;color:#1e293b">${l.user}</span>
                      <span style="font-size:13px;color:#64748b"> — ${l.action}</span>
                    </div>
                  </div>`;
              }).join('')}
            </div>
          </div>
        </div>

        <!-- Right -->
        <div>
          <!-- System Config -->
          <div class="card" style="padding:18px;margin-bottom:14px">
            <div style="font-size:14px;font-weight:600;color:#1e293b;margin-bottom:14px">System Configuration</div>

            <div style="margin-bottom:14px">
              <label style="font-size:11px;font-weight:600;color:#64748b;display:block;margin-bottom:5px">NO-SHOW THRESHOLD</label>
              <div style="display:flex;align-items:center;gap:10px">
                <input class="input" type="number" value="3" min="1" max="10" style="width:70px">
                <span style="font-size:13px;color:#64748b">no-shows before flag</span>
              </div>
            </div>

            <div style="font-size:12px;font-weight:600;color:#64748b;margin-bottom:8px">GLOBAL BLACKLIST RULES</div>
            ${[
              { label:'Flag Duplicate Phone IDs', checked: true  },
              { label:'Auto-Block High-Velocity Regs', checked: true  },
              { label:'Restrict Disposable Emails',    checked: false },
            ].map(r=>`
              <label style="display:flex;align-items:center;gap:8px;padding:8px 0;cursor:pointer">
                <input type="checkbox" ${r.checked?'checked':''} onchange="toast('Setting updated','success')">
                <span style="font-size:13px;color:#374151">${r.label}</span>
              </label>`).join('')}
          </div>

          <!-- SMS config -->
          <div class="card" style="padding:18px;margin-bottom:14px">
            <div style="font-size:14px;font-weight:600;color:#1e293b;margin-bottom:12px">SMS Provider Config</div>
            <div style="margin-bottom:10px">
              <label style="font-size:11px;font-weight:600;color:#64748b;display:block;margin-bottom:4px">PROVIDER</label>
              <select class="select" style="width:100%"><option>Twilio</option><option>MSG91</option><option>Exotel</option><option>Kaleyra</option></select>
            </div>
            <div style="margin-bottom:10px">
              <label style="font-size:11px;font-weight:600;color:#64748b;display:block;margin-bottom:4px">API KEY</label>
              <input class="input" type="password" value="sk_live_••••••••••••••••">
            </div>
            <button class="btn btn-secondary btn-sm" style="width:100%;justify-content:center" onclick="toast('Connection verified ✓','success')">Test Connection</button>
          </div>

          <!-- Security alert -->
          <div class="card" style="padding:16px;background:#fef2f2;border:1px solid #fecaca">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
              ${icon('shield-alert',18,'text-red-500')}
              <div style="font-size:13px;font-weight:600;color:#dc2626">Security Policy Alert</div>
            </div>
            <div style="font-size:12px;color:#7f1d1d">A Calling Agent account accessed the system from 2 different IPs within 75 minutes. Consider enabling 2FA for all agent accounts.</div>
            <button class="btn btn-sm" style="background:#dc2626;color:#fff;width:100%;justify-content:center;margin-top:10px" onclick="toast('2FA enforcement enabled','success')">Enable 2FA for Agents</button>
          </div>
        </div>
      </div>

      <!-- Save bar -->
      <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:20px;padding-top:16px;border-top:1px solid #e2e8f0">
        <button class="btn btn-secondary" onclick="toast('Changes reverted','info')">Reset</button>
        <button class="btn btn-primary" onclick="toast('All settings saved successfully!','success')">${icon('save',15)} Save All Changes</button>
      </div>
    </div>`;
  },

  init() {},

  editAdmin(id) {
    const admin = D.adminUsers.find(a=>a.id===id);
    if (!admin) return;
    showModal(`
      <div style="font-size:16px;font-weight:700;color:#1e293b;margin-bottom:14px">Edit Admin: ${admin.name}</div>
      <div style="display:flex;flex-direction:column;gap:10px">
        <div>
          <label style="font-size:11px;font-weight:600;color:#64748b;display:block;margin-bottom:4px">ROLE</label>
          <select class="select" style="width:100%">
            <option ${admin.role==='Super Admin'?'selected':''}>Super Admin</option>
            <option ${admin.role==='Event Manager'?'selected':''}>Event Manager</option>
            <option ${admin.role==='Calling Agent'?'selected':''}>Calling Agent</option>
            <option ${admin.role==='Gate Staff'?'selected':''}>Gate Staff</option>
            <option ${admin.role==='Viewer'?'selected':''}>Viewer</option>
          </select>
        </div>
        <div>
          <label style="font-size:11px;font-weight:600;color:#64748b;display:block;margin-bottom:4px">STATUS</label>
          <select class="select" style="width:100%">
            <option ${admin.status==='active'?'selected':''}>active</option>
            <option ${admin.status==='suspended'?'selected':''}>suspended</option>
          </select>
        </div>
      </div>
      <div style="display:flex;gap:10px;margin-top:16px">
        <button class="btn btn-secondary" style="flex:1;justify-content:center" onclick="closeModal()">Cancel</button>
        <button class="btn btn-primary" style="flex:1;justify-content:center" onclick="closeModal();toast('Admin updated','success')">Save Changes</button>
      </div>
    `);
  },

  toggleAdmin(id, reactivate) {
    const admin = D.adminUsers.find(a=>a.id===id);
    if (!admin) return;
    const action = reactivate ? 'reactivate' : 'suspend';
    showModal(`
      <div style="text-align:center">
        <div style="font-size:40px;margin-bottom:8px">${reactivate?'✅':'🚫'}</div>
        <div style="font-size:17px;font-weight:700;color:#1e293b">${reactivate?'Reactivate':'Suspend'} ${admin.name}?</div>
        <div style="font-size:14px;color:#64748b;margin-top:8px">This admin will ${reactivate?'regain':'lose'} access to the dashboard immediately.</div>
        <div style="display:flex;gap:10px;margin-top:16px">
          <button class="btn btn-secondary" style="flex:1;justify-content:center" onclick="closeModal()">Cancel</button>
          <button class="btn ${reactivate?'btn-primary':'btn-danger'}" style="flex:1;justify-content:center" onclick="closeModal();toast('Admin ${action}d','${reactivate?'success':'error'}')">${reactivate?'Reactivate':'Suspend'}</button>
        </div>
      </div>
    `);
  },

  openAddAdmin() {
    showModal(`
      <div style="font-size:16px;font-weight:700;color:#1e293b;margin-bottom:14px">Add New Admin</div>
      <div style="display:flex;flex-direction:column;gap:10px">
        <div>
          <label style="font-size:11px;font-weight:600;color:#64748b;display:block;margin-bottom:4px">FULL NAME *</label>
          <input class="input" placeholder="Full name">
        </div>
        <div>
          <label style="font-size:11px;font-weight:600;color:#64748b;display:block;margin-bottom:4px">EMAIL *</label>
          <input class="input" type="email" placeholder="email@dhaasoo.com">
        </div>
        <div>
          <label style="font-size:11px;font-weight:600;color:#64748b;display:block;margin-bottom:4px">ROLE</label>
          <select class="select" style="width:100%">
            <option>Event Manager</option><option>Calling Agent</option><option>Gate Staff</option><option>Viewer</option>
          </select>
        </div>
      </div>
      <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:10px;margin-top:12px;font-size:12px;color:#92400e">
        A temporary password will be emailed. The admin must change it on first login.
      </div>
      <div style="display:flex;gap:10px;margin-top:14px">
        <button class="btn btn-secondary" style="flex:1;justify-content:center" onclick="closeModal()">Cancel</button>
        <button class="btn btn-primary" style="flex:1;justify-content:center" onclick="closeModal();toast('Admin created. Invite email sent.','success')">Create Admin</button>
      </div>
    `);
  }
};
