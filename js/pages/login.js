window.LoginPage = {
  render() {
    const roleOptions = Object.entries(D.roles).map(([k,v]) =>
      `<option value="${k}">${v.label} — ${v.name}</option>`
    ).join('');

    return `
    <div style="min-height:100vh;background:linear-gradient(135deg,#1e3a5f 0%,#2563eb 60%,#4f46e5 100%);display:flex;align-items:center;justify-content:center;padding:20px">
      <div style="width:100%;max-width:420px">
        <!-- Logo -->
        <div style="text-align:center;margin-bottom:32px">
          <div style="width:64px;height:64px;background:rgba(255,255,255,0.15);border-radius:16px;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:28px">🎬</div>
          <div style="font-size:26px;font-weight:800;color:#fff;letter-spacing:-0.5px">Dhaasoo Admin</div>
          <div style="font-size:14px;color:rgba(255,255,255,0.65);margin-top:4px">Operations Dashboard</div>
        </div>

        <!-- Card -->
        <div style="background:#fff;border-radius:20px;padding:32px;box-shadow:0 20px 60px rgba(0,0,0,0.25)">
          <h2 style="font-size:20px;font-weight:700;color:#1e293b;margin-bottom:4px">Welcome back</h2>
          <p style="font-size:14px;color:#94a3b8;margin-bottom:24px">Sign in to your admin account</p>

          <div style="margin-bottom:16px">
            <label style="font-size:12px;font-weight:600;color:#64748b;display:block;margin-bottom:6px">DEMO ROLE</label>
            <select id="login-role" class="select" style="width:100%" onchange="LoginPage.fillCreds(this.value)">
              ${roleOptions}
            </select>
            <p style="font-size:11px;color:#94a3b8;margin-top:4px">Select a role to auto-fill credentials for the demo</p>
          </div>

          <div style="margin-bottom:16px">
            <label style="font-size:12px;font-weight:600;color:#64748b;display:block;margin-bottom:6px">EMAIL</label>
            <input id="login-email" class="input" type="email" value="rajesh@dhaasoo.com">
          </div>

          <div style="margin-bottom:24px">
            <label style="font-size:12px;font-weight:600;color:#64748b;display:block;margin-bottom:6px">PASSWORD</label>
            <input id="login-pass" class="input" type="password" value="••••••••">
          </div>

          <button class="btn btn-primary" style="width:100%;justify-content:center;padding:12px;font-size:15px" onclick="LoginPage.login()">
            Sign In ${icon('arrow-right',18)}
          </button>

          <div style="margin-top:20px;padding-top:20px;border-top:1px solid #f1f5f9;text-align:center">
            <div style="font-size:12px;color:#94a3b8">Demo credentials are pre-filled. Click Sign In to continue.</div>
          </div>
        </div>

        <div style="text-align:center;margin-top:20px;font-size:12px;color:rgba(255,255,255,0.5)">
          © 2025 Dhaasoo Operations · Secure Admin Portal
        </div>
      </div>
    </div>`;
  },

  init() {
    // auto-select first role
    this.fillCreds('super_admin');
  },

  fillCreds(role) {
    const user = D.roles[role];
    if (!user) return;
    const emailEl = document.getElementById('login-email');
    if (emailEl) emailEl.value = user.email;
  },

  login() {
    const roleEl = document.getElementById('login-role');
    const role = roleEl ? roleEl.value : 'super_admin';
    D.currentRole = role;
    navigate(D.roles[role].landing);
  }
};
