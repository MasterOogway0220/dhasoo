# Dhaasoo Admin Dashboard — Design Spec

**Date:** 2026-04-17  
**Status:** Approved  
**Stack:** HTML + Tailwind CSS CDN + Chart.js CDN + Lucide Icons CDN  
**Purpose:** Client demo (functional frontend with mock data, no backend)

---

## Architecture

Single `index.html` shell with JS-injected page partials. Hash-based routing (`#overview`, `#shows`, etc.). All mock data lives in `js/data.js`. No build step — open `index.html` in any browser.

```
dhasoo/
├── index.html          ← shell: sidebar + topbar + page container
├── css/custom.css      ← minimal overrides (animations, scrollbar, badges)
├── js/
│   ├── data.js         ← all mock data (shows, users, agents, logs)
│   ├── router.js       ← hash routing, page load/unload
│   └── charts.js       ← Chart.js instances
└── pages/              ← each screen rendered as a JS module
    ├── login.js
    ├── overview.js
    ├── shows.js
    ├── show-detail.js
    ├── audience.js
    ├── call-queue.js
    ├── broadcast.js
    ├── database.js
    ├── analytics.js
    ├── scanner.js
    └── settings.js
```

---

## Screens

### 1. Login Page
- Clean centred card with Dhaasoo logo
- Email + password fields
- Role selector dropdown (Super Admin, Event Manager, Calling Agent, Gate Staff)
- Selecting a role auto-fills demo credentials
- Login redirects to appropriate landing page per role

### 2. Executive Overview
- Metric cards: Total Users, New Registrations (today/week/month), Upcoming Shows (7 days), Check-in Rate, No-Show Rate
- Animated counter on page load
- Registrations Trend (30-day line chart via Chart.js)
- Ongoing & Upcoming Shows card list with seat fill progress bars
- Recent Activity Feed (10 items)
- Quick Actions: Add New Show, Export Today's List, Open Scanner
- Notification slide-out panel (bell icon)

### 3. Show Listing
- Table: Show Name, Date, Venue, Booking (filled/total + bar), Status badge, Actions
- Filters: Status, City, Date Range, Show Type
- Search by name
- Status badges: Active (green), Full (orange), Cancelled (red), Completed (grey)
- Add New Show → modal form
- Top Region Performers sidebar widget

### 4. Show Detail
- Header: show name, date, venue, Seats Filled / Confirmations / Checked-In counters
- Registered Users table: Name, Mobile, Call Status, Ticket, Check-In, Actions
- Filters: name/mobile search, call status, check-in status
- Bulk select → Assign to Agent / Send Bulk SMS / Export Selected
- View Profile → opens Audience Profile screen
- Call Status badges: Confirmed (green), Declined (red), No Answer (yellow), Pending (grey)

### 5. Audience Profile
- Profile card: name, photo avatar, mobile, email, city, DOB/age, gender, reputation score
- Active show registration card with QR preview + resend options
- Call & Communication Log (chronological, with agent name + outcome + remarks)
- Internal Notes panel (free-text, save on demand)
- Next Action recommendation panel
- Past Attendance table (show name, date, status: Attended / No-Show)

### 6. Call Queue
- "Next to Call" hero card with user details + large Call / WhatsApp buttons
- Queue progress bar (X of Y called)
- Outcome capture form: Status dropdown, guests count, callback time, remarks
- My Queue list (assigned users, ordered by priority)
- Flagged users highlighted (repeat no-shows)

### 7. Broadcast Center
- Event selector + Audience Segment filters
- Template selector (Registration Confirmation, Reminder, Cancellation, etc.)
- Channel toggle: SMS / WhatsApp / Email
- Live message preview with placeholder substitution
- Target count display
- Save Draft / Execute Broadcast buttons
- Delivery Pulse chart (sent/delivered/failed)
- Recent Communications log
- Upcoming Queue

### 8. Master Audience Database
- Global user table: avatar, name, location, attendance count, no-shows, reputation score, status badge, actions
- Filters: City, Reputation, Last Attended, Status
- Search by name or mobile
- Export CSV / Add New User buttons
- Stats footer: No-show rate, Flagged users count, Reputation trend

### 9. Deep Analytics
- KPI cards: Fill Rate, Confirmation Rate, Attendance Rate, No-Show Rate (with trend delta)
- Registration Trends line chart (30/60/90 day, by event category)
- Top Regions bar list
- Agent Performance table: name, calls made, confirmations, conversion %, status badge
- Date range selector (Last 30 Days / 60 / 90 / Custom)
- Export PDF / CSV buttons

### 10. QR Scanner
- Mobile-friendly full-screen layout
- Large "Tap to Scan" button (simulated in demo with a mock scan)
- Show selector (auto-selects active show)
- Valid scan → green overlay with name + "Checked-In" ✓
- Invalid scan → red overlay with reason
- Manual lookup: search by mobile / registration ID
- Live Entry counter: Checked-In / Pending / Entry Rate

### 11. Admin Settings & Role Management
- Administrative Staff table: name, role, access, status, actions
- Add New Admin button → modal form
- Role Audit Log with "View Activity Stream" link
- System Configuration panel: no-show threshold, duplicate phone blocking, high-velocity flag, disposable email restriction
- SMS Provider Config (provider name, API key masked, test connection)
- Security Policy Alert

---

## Role-Based Views

| Role | Sees |
|---|---|
| Super Admin | All 11 screens |
| Event Manager | Overview, Shows, Show Detail, Broadcast, Analytics |
| Calling Agent | Call Queue, Audience Profile |
| Gate Staff | Scanner only |

Role switcher in sidebar footer lets demo viewer switch instantly.

---

## UX Details

- Sidebar: collapsible on tablet widths, active state highlighted
- Confirmation modals on destructive actions (Cancel Show, Delete, Blacklist)
- Notification panel: slide-out from right, 5 demo alerts
- Animated metric counters (count up over 1.2s on page load)
- Status badges: colour-coded, pill shape
- Tables: hover highlight, row click navigation where applicable
- Responsive: works on 1280px+ desktop and 768px+ tablet

---

## Mock Data

- 5 shows (mix of Active, Full, Completed, Cancelled)
- 20 audience members across shows
- 3 calling agents
- 30-day registration trend data
- 10 recent activity items
- 5 notification alerts
- City distribution: Mumbai, Delhi, Bangalore, Pune
