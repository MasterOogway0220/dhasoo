# Dhaasoo Talent — Audience Registration Platform
## Demo Prototype Specification

| | |
|---|---|
| **Document Title** | Dhaasoo Talent Platform — Demo Prototype Spec |
| **Version** | 1.0 (Demo) |
| **Purpose** | Walkthrough / clickable prototype for stakeholder review |
| **Stack** | HTML5 + CSS3 + Vanilla JS + GSAP (CDN) |
| **Data Mode** | Static demo data (hardcoded in JS / JSON) — no backend |
| **Modules** | (1) Mobile App · (2) Admin Dashboard |
| **Publisher** | STEP PVT LTD (Showkase Talent & Entertainment Prezenters Pvt. Ltd.) |
| **Context** | Rebuild of the *Show Audience* module of the existing Dhaasoo Talent app (Play Store v1.2.26, 100K+ installs, 2.4★) |

---

## 0. About This Document

This is a **demo specification**, not a production PRD. The build is a static front-end prototype that simulates the full Dhaasoo flow using pre-loaded sample data. There is **no backend, no real database, no real SMS gateway, and no real authentication**. Every "action" (OTP send, registration save, admin confirm, QR scan, etc.) is simulated in the browser so stakeholders can click through the entire product end-to-end.

A separate production PRD will be written after demo sign-off.

---

## 0.1 Product Context — Relationship to the Existing Live App

Dhaasoo Talent is already live on the Play Store (package `com.dhaasootalent`, v1.2.26, 100,000+ installs, 2.4★). The live app is a four-module entertainment platform by **STEP PVT LTD**:

- **My Talent** — talent upload / profile
- **Show Audience** — free live-studio audience registration
- **DT-Biz** — B2B talent search for showmakers
- **D-Tok** — social/video sharing (perpetually "Coming Soon")

**This demo is a ground-up rebuild of the *Show Audience* module only.** The other three modules are explicitly out of scope and will continue to live in the existing app until a broader consolidation is decided.

The demo keeps the Dhaasoo brand tagline — *"A Talent deserving a ShowKase must be Prezented to the world with Entertainment values intact."* — and the core value promise of zero-cost audience registration, while replacing the existing visual identity (deep purple + gold) with the refreshed dark-brown + orange palette defined in §5.

### 0.2 Problems in the Live App We Are Explicitly Solving

The 2.4★ rating on the Play Store is driven by a handful of recurring issues. These are the things the rebuild must not repeat:

| Live app problem | How the rebuild addresses it |
|---|---|
| *"Unable to resolve host"* blocks login and the entire app | Proper offline/error states with retry; cached last-known data visible while disconnected. |
| Full-resolution images loaded everywhere → slow | Progressive/lazy-loaded thumbnails first, full res on demand. |
| Multiple confusing user IDs (Talent Ref, Audience ID, Talent Seeker ID) | One unified **BaRCo** identity per user across everything. |
| D-Tok has been *"Coming Soon"* for years — erodes trust | Out of scope; not shown on any screen in this rebuild. |
| No developer response to reviews | Review management handled by Dhaasoo team post-launch (outside demo scope but flagged). |

---

## 1. What the Demo Demonstrates

The demo proves out two things for stakeholders:
1. **The user journey** — from app install to venue entry, someone can click every screen of the mobile app.
2. **The admin experience** — how the Dhaasoo ops team will manage shows, registrations, and gate entry.

It is designed to be shown on a laptop (screen mirroring a phone for the mobile app) or handed to someone to tap through on a real phone browser. The admin dashboard is shown on a desktop or tablet.

---

## 2. Scope

### 2.1 In the Demo
- Full mobile app clickable flow: splash → agreement → login → OTP → dashboard → shows → book seat → 2-step registration → review → success/BaRCo → my registrations → profile → T&Cs.
- Admin dashboard clickable flow: login → overview KPIs → users list → shows list → registrations list → reports (sample download) → gate scanner UI → call-centre workspace.
- Hindi toggle on login (swaps a handful of visible strings).
- Simulated toasts/modals instead of real SMS.
- CSS-generated QR pattern on the BaRCo card.
- Sample data for ~5 shows, ~8 users, ~15 registrations across statuses.
- End-to-end data flow between app and admin: a registration created in the app appears in admin; a confirmation on admin reflects in the app.

### 2.2 Not in the Demo
- Real OTP sending / SMS / WhatsApp / email.
- Real authentication or session management.
- Real database — data resets on page reload (optional: `localStorage` to persist within one browser session).
- Real QR scanning — the gate scanner screen shows a camera mock with pre-set scan outcomes.
- Real file uploads — photo picker opens native dialog but only shows a preview.
- Real admin roles or permissions — any admin view is accessible from the admin home.
- Real report generation — "Export" downloads a pre-built CSV.
- Mobile-number edit flow, account recovery, payment — not needed, platform is free.

---

## 3. Simulated Behaviours (Demo Rules)

Because there is no backend, the prototype fakes these interactions:

| Real behaviour | Demo substitute |
|---|---|
| Send OTP | Toast *"OTP sent to +91 98XXX XX912"* + show the OTP on screen for convenience (e.g. hint text *"Use 123456"*). |
| Verify OTP | Any 6-digit input accepted; `123456` is the "happy path"; `000000` triggers the error state for demo. |
| Registration saved | Push to an in-memory JS array + show success screen. Entry appears in "My Registrations" and in Admin → Registrations. |
| BaRCo generated | Random 8-char code in the `DTAU-XXXXXXXX` format, stored on the user object. |
| Admin confirms a user | Status flipped in the JS array; "Confirmed" badge appears; a fake SMS toast pops on the admin side showing what *would* go to the user. |
| Gate scan | Scanner screen has 4 demo buttons: **Simulate Valid** · **Simulate Waitlist** · **Simulate Already Checked In** · **Simulate Invalid** — each shows the corresponding UI state. |
| Guest BaRCo lookup | Checked against the demo user array; any BaRCo starting with `DTAU-DEMO` is considered valid. |
| Export report | Triggers download of a pre-built `registrations-demo.csv` file. |
| Session / login persistence | Optional `localStorage` flag so a returning visitor skips to the Dashboard on reload. |

---

## 4. Target Users (for the demo audience)

- **Client / Stakeholders** reviewing the look-and-feel and flow.
- **Designers** aligning on visual polish.
- **Developers** using the demo as the spec input for the production build.

---

## 5. Design System

- **Theme** — dark; background `#190d00`, primary orange `#E8761A`.
- **Font** — Inter via Google Fonts (weights 400–900).
- **Animations** — GSAP 3.12.5 (CDN) for screen-entrance transitions (`y: -16 → 0` header slide as the default).
- **Mobile canvas** — 390 px wide, `100dvh` tall. Scrollbars hidden (`scrollbar-width: none`).
- **Admin canvas** — desktop-first, responsive down to tablet. Light surface with orange accents so long sessions are comfortable.
- **100% FREE messaging** — reused on splash, login, OTP, registration, and booking screens as a trust signal.
- **Tap targets** ≥ 44 × 44 px throughout.

---

# MODULE 1 — MOBILE APP (Static Prototype)

## 6. Mobile App Screens

Every screen is a `<div>` toggled via a `goto(screenId)` function. Only one screen is `display:flex` at a time. Entrance animations run on show.

### 6.1 Splash (`screen-splash`)
Clapperboard logo · *"Dhaasoo Talent"* · tagline · **100% FREE / NO CHARGES** CTA → Agreement · 3 page dots · version label.

### 6.2 Agreement (`screen-agreement`)
Back arrow · hero icon + headline · animated green "100% Free" badge · three content sections (Agreement Overview, Data Usage & Privacy, Entry Rules with 3 bullets) · **Next** button → Login.

### 6.3 Login (`screen-login`)
Info icon · **English / हिंदी** toggle (swaps visible strings) · logo · welcome headline · **India / International radio toggle** (default: India) · `+91` (locked when India selected, editable 1-4 digit country code when International) + 10-digit numeric field · **Send OTP →** button → OTP screen (after a toast) · green "100% Free Registration" badge · **"Do not pay money to anyone"** small warning line · footer legal links → Terms.

*Carried over from the live app — the India/International split and the "Do not pay money" phrasing are proven trust signals with the existing 100K+ user base.*

### 6.4 OTP Verification (`screen-otp`)
Back arrow · lock icon · headline · masked number · 6 digit boxes with auto-advance focus · **Resend OTP** link · 00:59 countdown · **Verify & Proceed →** button → goes to **Reg Step 1** for "new" users (first visit flag) or directly to **Dashboard** for "returning" users. Hint text during demo: *"Use 123456."*

### 6.5 Dashboard (`screen-dashboard`)
Top bar with gradient monogram avatar, *"Namaste, {FirstName}"*, bell icon, date.
Body: featured show card (140 px banner + **@ Free Pass** → Book Seat) · genre chips (All / Reality / Comedy / Talent) · *"Trending Now 🔥"* list with See All → Shows.
Bottom nav: Home (active) · Shows · My Regs · Profile.

### 6.6 Shows (`screen-shows`)
Search input · genre chips · vertical list of show cards (thumbnail, name, type badge, venue/city, date/time, seats remaining or Sold Out). **Register** CTA → Book Seat. Sold-out CTA disabled.

### 6.7 Book Seat (`screen-book`)
Header + back → Shows. Show info card. **Select Date** dropdown + "100% FREE" flash badge. **Preferred Slot** radio cards (Morning default, Afternoon, Evening). **Additional Seats** stepper (0 default, max 3). When > 0, guest BaRCo input fields appear with the sub-note *"Each guest must be registered on Dhaasoo app."* Sticky **Proceed →** → Reg Step 1. Guest validation checks the demo user array.

### 6.8 Registration Step 1 — Create Profile (`screen-reg1`)
Header + progress 50%. Green "100% FREE" flash badge.
**Prominent warning banner:** *"No Charges · 100% Free for Registration / Entry to Show · Do not pay money to anyone."* (amber, dismissible-free)
Headline *"Let's get you in the audience!"*
Fields:
- **Photo** (tap-to-upload, optional — opens picker, shows preview)
- **Title** (Mr / Ms / Mrs / Dr / Other)
- **First Name*** (separate field — cleaner for admin search and call lists)
- **Last Name*** (separate field)
- **Age Group*** dropdown (18–25, 26–35, 36–45, 46–55, 56+)
- **Gender*** radio (Male / Female / Other)
- **City / Location***
- **State*** dropdown
- **Postal Pincode*** (6-digit numeric — used by admin for regional reports and venue logistics)

Sticky **Next: Professional Info →**.

*First Name + Last Name as separate fields, Age Group dropdown, Gender as radio buttons, and the Pincode field are all carried over from the live app's registration form — they are known to work with the existing user base.*

### 6.9 Registration Step 2 — Professional Info (`screen-reg2`)
Header + progress 100%. Fields: Profession · Community/Language · Email (optional) · WhatsApp (prefilled, toggle to change). Sticky **Review My Details →**.

### 6.10 Review (`screen-review`)
Summary of show + personal + professional info with **Edit** links to each step. **Confirm Registration** → Success.

### 6.11 Success & BaRCo (`screen-success`)
Orange tick · **बधाई हो!** · BaRCo card (`DTAU-XXXXXXXX`) with **Tap to Copy** · 3-step tracker (Received ✅ · Waitlist Review 🟠 · Confirmation ⬜) · **Share with Friends** · **Go to Home**.

### 6.12 My Registrations (`screen-myregs`)
Header + search + filter. Tabs: Active · Upcoming · History. Cards with status badges (Confirmed / Awaiting / Waitlist) and context actions (View Ticket / Manage / Cancel / View Details).

### 6.13 Review Details (`screen-review-details`)
User photo + name + profession · show banner · detail rows (Date, Time, Venue, Slot, Seats) · status badge · QR preview if confirmed · Cancel / Resend actions.

### 6.14 Profile (`screen-profile`)
Avatar + edit overlay · Full name (First + Last) · orange `ID: DHS-XXXX-XX` pill · *"Member since YYYY"* · green "100% FREE LIFETIME ACCESS" badge.
**BaRCo card:** CSS-generated QR on white · numeric code · *"Scan at venue entry"* · **TAP TO ENLARGE**.
Amber lock warning about name/mobile.
Tabs:
- **Personal Info** — First Name (locked), Last Name (locked), Verified Mobile (locked), Age Group, Gender, City, State, Pincode, Email.
- **Professional** — Profession, Community/Language, WhatsApp.

Sticky **Edit Profile**. **Log Out** (red) returns to Login and clears the "returning user" flag.

### 6.15 Terms & Conditions (`screen-terms`)
Three sections (Agreement Overview · Data Usage & Privacy · Entry Rules) + a footer block with **company details** (STEP PVT LTD, registered address, support email `writetodtc@gmail.com`, website `dhaasootalent.com`) + sticky footer with checkbox + **Accept & Continue →**.

---

## 7. Mobile App Flow

```
Splash → Agreement → Login → OTP
  ├─(new user flag)→ Reg1 → Reg2 → Review → Success → Dashboard
  └─(returning)→ Dashboard
        ├─ Shows → Book Seat → Reg1 (if profile empty) / Review (if complete) → Success
        ├─ My Regs → Review Details
        ├─ Profile (Edit / Log Out)
        └─ Terms (from Login footer)
```

---

# MODULE 2 — ADMIN DASHBOARD (Static Prototype)

## 8. Admin Dashboard Screens

Desktop-first. Same JS `goto()` pattern. No real roles enforced in the demo — every link is accessible from the sidebar.

### 8.1 Admin Login
Email + password + "Login" button. Any credentials accepted; pre-filled with `admin@dhaasoo.com` / `demo123` for convenience.

### 8.2 Global Layout
Left sidebar: Dashboard · Users · Shows · Registrations · Reports · Gate Scanner · Call Centre · Settings.
Top bar: search input · notification bell · admin avatar with role pill (*"Super Admin"* in the demo).

### 8.3 Dashboard (Overview)
KPI tiles (static demo numbers):
- Total registered users · Today's registrations · Total seat registrations · Upcoming shows.
Plus a simple line chart (last 30 days) and a top-5 shows list.

### 8.4 Users
Table with First Name · Last Name · Mobile · Email · City · Pincode · DOB · BaRCo · Registered On · # Past Shows · Status. Search box + filter chips (city, pincode, date). **Export CSV** button downloads the pre-built file. Clicking a row opens a detail panel showing profile, BaRCo QR, and registration history.

### 8.5 Shows
Table with Show Name · Date · Venue · City · Capacity · Registered · Confirmed · Status. **+ Add Show** button opens a form (name, genre, dates, slots, venue, city, capacity, thumbnail, custom fields, status toggle). Saving pushes into the demo array and it appears in the list. Row actions: Edit · Duplicate · Deactivate · Delete.

### 8.6 Registrations
Table with BaRCo · User Name · Mobile · Show · Date · Slot · Seats · Status · Call Status · Checked-In. Filters by show, date, status, call status. Bulk actions: Confirm · Waitlist · Cancel · Export. Row click → detail drawer with status history, guest list, and action buttons. Confirming a user flips the status and shows a toast *"SMS sent to user (demo)."*

### 8.7 Reports
Pre-built report cards (Registrations by Show · User Activity · No-Show · Waitlist · City Distribution). Each has a **Download** button that fetches a sample CSV bundled with the build.

### 8.8 Gate Scanner
Tablet-sized UI with a fake camera frame and four demo buttons below it: **Simulate Valid** · **Simulate Waitlist** · **Simulate Already Checked In** · **Simulate Invalid**. Each tap shows the corresponding coloured card (green / amber / blue / red) with sample user info and auto-clears after 2s.

### 8.9 Call Centre
Queue view of waitlisted users assigned to the current show. Per row: user name, mobile, show, *"Call now"* (tel:) link, outcome dropdown (Confirmed / Not Reachable / Declined / Callback), notes field, Save. Saving the outcome updates the row status and auto-scrolls to the next record.

### 8.10 Settings
Three tabs (static content in demo):
- **Admins** — list of admin users (demo rows).
- **Templates** — preview of the SMS copy for each lifecycle event.
- **Holidays** — a calendar mock with a few dates marked.

---

## 9. BaRCo in the Demo

- Issued at successful registration (stored on the user object as `barco`).
- Format: `DTAU-` + 8 random alphanumeric chars.
- Displayed on the Profile screen as a CSS-generated QR pattern on a white card (no real QR library needed — a simple 21×21 grid of coloured squares is enough for visual).
- Guest BaRCo lookup: any demo user's BaRCo works; unknown codes show an inline error.
- Gate scanner demo buttons drive the 4 states the real system will have.

---

## 10. Demo Data

Pre-loaded in a single `data.js` file (or inline JS). Reset on reload unless `localStorage` persistence is wired.

**Sample Users (~8)** — mix of Mumbai-based, different ages/genders, with and without photos; at least one with an active registration, one confirmed, one waitlisted, one with 2 past shows.

**Sample Shows (~5)** — one each of Reality, Talent, Comedy, Game, and Live Studio. Mix of statuses: one active with seats, one near-full, one sold out, one upcoming in 2 weeks, one marked inactive.

**Sample Registrations (~15)** — spread across statuses (received / waitlist / confirmed / cancelled), some with guest links, some already checked-in.

**Sample Admin Users (3)** — one Super Admin, one Event Manager, one Gate Staff. Demo-only — no role enforcement.

---

## 11. Business Rules Visible in the Demo UI

These are shown in the prototype even though they aren't enforced by a backend:

- Registration cutoff = 3 days before show date (past-cutoff shows have a disabled CTA with *"Registration closed"*).
- Max 4 seats per booking (stepper caps at 3 additional).
- Name & Mobile locked once a user has an active registration (fields greyed out in Profile with the amber warning card).
- Email, City, Profession, Community, WhatsApp — always editable.
- Sold Out shows show a disabled Register CTA.

---

## 12. Tech Stack

| | |
|---|---|
| **Mobile App** | Single `index.html` (HTML + inline CSS + inline JS). GSAP 3.12.5 via CDN. Inter font via Google Fonts. |
| **Admin Dashboard** | Single `admin.html` or a small multi-file static site. Plain HTML/CSS/JS; optional small UI utilities (no framework). |
| **Shared data** | A single `data.js` file loaded by both apps so a registration in the mobile app shows up in the admin view during the demo. |
| **Persistence (optional)** | `localStorage` to keep state across page reloads within the demo session. |
| **Hosting** | Any static host — Netlify / Vercel / GitHub Pages / plain S3 / a local file. |

---

## 13. Demo Acceptance Checklist

The prototype is considered complete when a reviewer can:
- ✅ Walk through every screen listed in §6 and §8 without errors.
- ✅ Register as a new user and see the new registration appear in Admin → Registrations.
- ✅ Confirm a user in Admin and see the status update in the mobile app's My Registrations tab.
- ✅ Trigger all 4 gate-scanner states.
- ✅ Download a sample report CSV.
- ✅ Toggle the English / Hindi switch on Login and see visible strings change.
- ✅ Log out and log back in cleanly.

---

## 14. What This Demo Is NOT Solving For (Deferred to Production)

When the demo is approved, these will be designed and built for production:
- Real backend, database, authentication, and session management.
- Real SMS / WhatsApp gateway integration.
- Security, privacy, and DPDP Act compliance.
- Admin role-based access control and audit logging.
- Real QR generation and venue-scanner integration.
- Performance, scalability, observability, and uptime.
- Native iOS / Android apps and push notifications.
- Multi-city and regional language support.

A separate production PRD will cover these.

---

## 15. Brand & Company Reference

Carried over from the existing live app listing so that legal, support, and footer content across the demo stays consistent with what the 100K+ current users already see.

| Field | Value |
|---|---|
| **Legal Entity** | STEP PVT LTD (Showkase Talent & Entertainment Prezenters Pvt. Ltd.) |
| **Registered Address** | A10, Jeet Nagar, Machlimar Versova Road, Andheri West, Mumbai, Maharashtra 400061, India |
| **Website** | dhaasootalent.com |
| **Support Email** | writetodtc@gmail.com |
| **Privacy Policy** | https://dhaasootalent.com/privacy-policy |
| **Existing Play Store ID** | com.dhaasootalent |
| **Tagline** | *"A Talent deserving a ShowKase must be Prezented to the world with Entertainment values intact."* |

---

## 16. Glossary

| Term | Meaning |
|---|---|
| **BaRCo** | Barcode + Registration Code — unique identity for every Dhaasoo user. |
| **Demo data** | Hardcoded sample records in JS, used because there's no backend. |
| **Simulated behaviour** | A UI action that pretends to do something real (e.g. "OTP sent" toast). |
| **`goto()`** | The JS function that swaps which screen `<div>` is visible. |
| **Slot** | Preferred time of day (Morning / Afternoon / Evening). |
| **100% FREE** | The core trust message — reinforced on every key screen. |

---

*— End of Demo Spec —*
