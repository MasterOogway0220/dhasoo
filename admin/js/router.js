// ─── Mobile helper ──────────────────────────────────────────────────────────
function isMobile() { return window.innerWidth <= 768; }
window.isMobile = isMobile;

// ─── Router ────────────────────────────────────────────────────────────────

const PAGES = {
  'login':      LoginPage,
  'overview':   OverviewPage,
  'shows':      ShowsPage,
  'show-detail':ShowDetailPage,
  'audience':   AudiencePage,
  'call-queue': CallQueuePage,
  'broadcast':  BroadcastPage,
  'database':   DatabasePage,
  'analytics':  AnalyticsPage,
  'scanner':    ScannerPage,
  'settings':   SettingsPage,
};

const NAV_META = {
  'overview':    { label: 'Overview',   icon: 'grid' },
  'shows':       { label: 'Shows',      icon: 'calendar' },
  'audience':    { label: 'Audience',   icon: 'users' },
  'call-queue':  { label: 'Call Queue', icon: 'phone' },
  'broadcast':   { label: 'Broadcast',  icon: 'send' },
  'database':    { label: 'Database',   icon: 'database' },
  'analytics':   { label: 'Analytics',  icon: 'bar-chart-2' },
  'scanner':     { label: 'Scanner',    icon: 'scan-line' },
  'settings':    { label: 'Settings',   icon: 'settings' },
};

function icon(name, size=18, cls='') {
  return `<i data-lucide="${name}" style="width:${size}px;height:${size}px" class="${cls}"></i>`;
}
window.icon = icon;

function navigate(page, params={}) {
  window._routeParams = params;
  closeMobileNav();
  window.location.hash = page;
}
window.navigate = navigate;

function toggleMobileNav() {
  document.getElementById('sidebar')?.classList.toggle('open');
  document.getElementById('mob-sidebar-overlay')?.classList.toggle('show');
}
window.toggleMobileNav = toggleMobileNav;

function closeMobileNav() {
  document.getElementById('sidebar')?.classList.remove('open');
  document.getElementById('mob-sidebar-overlay')?.classList.remove('show');
}
window.closeMobileNav = closeMobileNav;

function currentRole() { return D.currentRole; }
window.currentRole = currentRole;

function renderSidebar(active) {
  const role = D.currentRole;
  const user = D.roles[role];
  const allowed = D.nav[role];

  const links = allowed.map(key => {
    const m = NAV_META[key];
    if (!m) return '';
    return `<div class="nav-item ${active===key?'active':''}" onclick="navigate('${key}')">${icon(m.icon)} ${m.label}</div>`;
  }).join('');

  const roleOptions = Object.entries(D.roles).map(([k,v]) =>
    `<option value="${k}" ${k===role?'selected':''}>${v.label}</option>`
  ).join('');

  document.getElementById('sidebar').innerHTML = `
    <div style="padding:20px 16px 12px">
      <div style="font-size:16px;font-weight:700;color:#1e293b">Dhaasoo Admin</div>
      <div style="font-size:11px;color:#94a3b8;margin-top:2px">Operations Dashboard</div>
    </div>
    <div style="padding:0 10px;flex:1;overflow-y:auto">${links}</div>
    <div style="padding:12px 16px;border-top:1px solid #f1f5f9">
      <div style="font-size:11px;color:#94a3b8;margin-bottom:6px;font-weight:600">DEMO: SWITCH ROLE</div>
      <select class="select" style="width:100%;font-size:12px;padding:5px 8px" onchange="switchRole(this.value)">
        ${roleOptions}
      </select>
      <div style="display:flex;align-items:center;gap:8px;margin-top:12px">
        <div class="avatar ${user.color}" style="width:32px;height:32px;font-size:11px">${user.initials}</div>
        <div>
          <div style="font-size:13px;font-weight:600;color:#1e293b">${user.name}</div>
          <div style="font-size:11px;color:#94a3b8">${user.label}</div>
        </div>
      </div>
    </div>`;
}

function renderTopbar() {
  const role = D.roles[D.currentRole];
  document.getElementById('topbar').innerHTML = `
    <button class="btn btn-ghost mob-menu-btn" style="display:none;padding:6px 8px;margin-right:4px" onclick="toggleMobileNav()">
      ${icon('menu', 22)}
    </button>
    <div class="topbar-search" style="display:flex;align-items:center;gap:12px;flex:1">
      <div style="position:relative;flex:1;max-width:320px">
        <span style="position:absolute;left:10px;top:50%;transform:translateY(-50%);color:#94a3b8">${icon('search',16)}</span>
        <input class="input" placeholder="Search shows, users, registrations…" style="padding-left:34px;font-size:13px">
      </div>
    </div>
    <div class="mob-topbar-center" style="display:none;flex:1">
      <span style="font-size:16px;font-weight:700;color:#3B4FDB;letter-spacing:-0.3px">Dhaasoo Admin</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;margin-left:auto">
      <button class="btn btn-ghost" style="position:relative" onclick="toggleNotifications()">
        ${icon('bell',20)}
        <span class="notif-dot"></span>
      </button>
      <div class="avatar ${role.color}" style="cursor:pointer;font-size:12px;width:34px;height:34px">${role.initials}</div>
    </div>`;
}

function switchRole(role) {
  D.currentRole = role;
  const landing = D.roles[role].landing;
  navigate(landing);
}
window.switchRole = switchRole;

function toggleNotifications() {
  const panel = document.getElementById('notification-panel');
  const overlay = document.getElementById('overlay');
  panel.classList.toggle('open');
  overlay.classList.toggle('hidden');
}
window.toggleNotifications = toggleNotifications;

function renderNotificationPanel() {
  const items = D.notifications.map(n => {
    const colors = { warning:'bg-yellow-100 text-yellow-600', error:'bg-red-100 text-red-600', info:'bg-blue-100 text-blue-600', success:'bg-green-100 text-green-600' };
    const icons  = { warning:'alert-triangle', error:'x-circle', info:'info', success:'check-circle' };
    return `
      <div style="padding:14px;border-bottom:1px solid #f1f5f9;display:flex;gap:10px">
        <div class="avatar ${colors[n.type]}" style="width:32px;height:32px;flex-shrink:0">${icon(icons[n.type],16)}</div>
        <div>
          <div style="font-size:13px;font-weight:600;color:#1e293b">${n.title}</div>
          <div style="font-size:12px;color:#64748b;margin-top:2px">${n.body}</div>
          <div style="font-size:11px;color:#94a3b8;margin-top:4px">${n.time}</div>
        </div>
      </div>`;
  }).join('');

  document.getElementById('notification-panel').innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;padding:16px 16px 12px;border-bottom:1px solid #e2e8f0">
      <div style="font-size:15px;font-weight:700;color:#1e293b">Notifications</div>
      <button class="btn btn-ghost btn-sm" onclick="toggleNotifications()">${icon('x',18)}</button>
    </div>
    <div style="overflow-y:auto;flex:1">${items}</div>
    <div style="padding:12px 16px;border-top:1px solid #e2e8f0">
      <button class="btn btn-secondary btn-sm" style="width:100%">Mark All Read</button>
    </div>`;
}

let _activeCharts = [];
window._activeCharts = _activeCharts;

function destroyCharts() {
  _activeCharts.forEach(c => { try { c.destroy(); } catch(e){} });
  _activeCharts = [];
  window._activeCharts = _activeCharts;
}

function renderBottomNav(active) {
  const el = document.getElementById('mob-bottom-nav');
  if (!el) return;
  const labels = {
    'overview':   'HOME',
    'shows':      'SHOWS',
    'audience':   'AUDIENCE',
    'call-queue': 'CALLS',
    'broadcast':  'BROADCAST',
    'analytics':  'DATA',
    'settings':   'SETTINGS',
  };
  const icons = {
    'overview':   'layout-dashboard',
    'shows':      'tv-2',
    'audience':   'users',
    'call-queue': 'phone',
    'broadcast':  'radio',
    'analytics':  'database',
    'settings':   'settings-2',
  };
  const keys = D.nav[D.currentRole] || [];
  el.innerHTML = keys.map(key => `
    <div class="mob-nav-item ${active===key?'active':''}" onclick="navigate('${key}')">
      ${icon(icons[key] || 'circle', 22)}
      <span>${labels[key] || key.toUpperCase()}</span>
    </div>`).join('');
  if (window.lucide) lucide.createIcons();
}

function loadPage(hash) {
  const isLogin = hash === 'login' || !hash;

  // Show/hide shell
  document.body.classList.toggle('login-mode', isLogin);
  document.getElementById('sidebar').style.display     = isLogin ? 'none' : '';
  document.getElementById('topbar').style.display      = isLogin ? 'none' : '';
  document.getElementById('mob-bottom-nav').style.display = isLogin ? 'none' : '';
  document.getElementById('main-wrapper').style.marginLeft  = isLogin ? '0' : '';
  document.getElementById('main-wrapper').style.paddingTop  = isLogin ? '0' : '';

  if (!isLogin) {
    renderSidebar(hash);
    renderTopbar();
    renderNotificationPanel();
    renderBottomNav(hash);
  }

  destroyCharts();

  const page = PAGES[hash] || PAGES['overview'];
  const app = document.getElementById('app');
  app.innerHTML = page.render(window._routeParams || {});

  // Re-run lucide icons
  if (window.lucide) lucide.createIcons();

  // Init page JS (charts, listeners)
  if (page.init) setTimeout(() => page.init(window._routeParams || {}), 50);

  // Close notification panel
  document.getElementById('notification-panel').classList.remove('open');
  document.getElementById('overlay').classList.add('hidden');
}

// Close notification on overlay click
document.getElementById('overlay').addEventListener('click', () => {
  document.getElementById('notification-panel').classList.remove('open');
  document.getElementById('overlay').classList.add('hidden');
});

window.addEventListener('hashchange', () => {
  const hash = window.location.hash.replace('#','');
  loadPage(hash);
});

// Init
(function() {
  const hash = window.location.hash.replace('#','') || 'login';
  loadPage(hash);
})();

// ─── Modal helpers ──────────────────────────────────────────────────────────
function showModal(html, onClose) {
  const el = document.createElement('div');
  el.className = 'modal-backdrop';
  el.id = 'active-modal';
  el.innerHTML = `<div class="modal-box">${html}</div>`;
  el.addEventListener('click', e => { if (e.target === el) closeModal(onClose); });
  document.body.appendChild(el);
  if (window.lucide) lucide.createIcons();
}
function closeModal(cb) {
  const m = document.getElementById('active-modal');
  if (m) m.remove();
  if (cb) cb();
}
window.showModal = showModal;
window.closeModal = closeModal;

// ─── Toast ──────────────────────────────────────────────────────────────────
function toast(msg, type='success') {
  const colors = { success:'bg-green-600', error:'bg-red-600', info:'bg-blue-600', warning:'bg-yellow-500' };
  const t = document.createElement('div');
  t.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:999;padding:12px 20px;border-radius:10px;color:#fff;font-size:14px;font-weight:500;box-shadow:0 4px 16px rgba(0,0,0,0.15);animation:fadeIn 0.2s ease';
  t.className = colors[type] || colors.success;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}
window.toast = toast;

// ─── Counter animation ──────────────────────────────────────────────────────
function animateCounter(el, target, duration=1200) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { el.textContent = target.toLocaleString(); clearInterval(timer); return; }
    el.textContent = Math.floor(start).toLocaleString();
  }, 16);
}
window.animateCounter = animateCounter;

function initCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const val = parseInt(el.getAttribute('data-count'));
    animateCounter(el, val);
  });
}
window.initCounters = initCounters;
