b# Dhaasoo Admin Dashboard
## Product Requirements Document

| | |
|---|---|
| **Document Title** | Dhaasoo Admin Dashboard — Product Requirements Document |
| **Version** | 1.0 |
| **Status** | Draft — For Review |
| **Prepared For** | Dhaasoo Operations Team |
| **Module** | Admin Dashboard (Web-Based) |
| **Related Modules** | Mobile App (Android/iOS), Static Website |

---

## 1. Document Purpose

This Product Requirements Document (PRD) defines the complete scope, features, functional behaviour, and operational rules for the Dhaasoo Admin Dashboard. The dashboard is the back-end operations console used by the Dhaasoo team to manage live show registrations, coordinate audience members, control entry on show day, and generate reports.

This document is intended to serve as the single source of truth for the design, development, QA, and stakeholder teams working on the admin dashboard module.

---

## 2. Background & Context

Dhaasoo is an audience registration platform for live television and stage shows (reality shows, talent shows, comedy shows, game shows, and live studio audience shows). Viewers register through the Dhaasoo mobile app, select a show and date, and confirm their seat.

On the operations side, the Dhaasoo team needs a centralised admin dashboard to manage the entire lifecycle of every show — from creating the event, tracking registrations, calling registered users to confirm attendance, issuing tickets, scanning audience entry at the venue, and finally analysing turnout post-show.

This PRD covers the functional and non-functional requirements needed to build that dashboard.

---

## 3. Goals & Objectives

### 3.1 Business Goals
- Provide a single operational view of all ongoing and upcoming shows.
- Reduce manual coordination effort through automation (auto-ticketing, bulk SMS, reminders).
- Maximise audience turnout by enabling proactive calling and confirmation of registered users.
- Ensure smooth, fast, and secure entry at the show venue via QR-based ticket scanning.
- Build a clean audience database that supports data-driven decisions for future shows.

### 3.2 Product Objectives
- Centralise event management — create, edit, close, and archive shows from one interface.
- Give admins complete visibility into every registered user for every show.
- Enable calling teams to track confirmation status against each audience member.
- Provide gate staff a fast QR scanner to validate entry in real time.
- Deliver actionable reports on registrations, attendance, and no-shows.

---

## 4. Scope

### 4.1 In Scope
- Web-based admin dashboard accessible on desktop and tablet browsers.
- Role-based access for different admin types (Super Admin, Event Manager, Calling Agent, Gate Staff).
- Event/show lifecycle management.
- Registered-user listing, filtering, contact management and confirmation tracking.
- QR code ticket generation, delivery and scanning at the venue.
- Check-in and attendance tracking.
- Communication tools — SMS, email, WhatsApp (as available).
- Reports, exports and analytics.

### 4.2 Out of Scope (for v1.0)
- Paid ticketing or payment gateway integration.
- "Show Your Talent" submission management (planned for later phase).
- "Advertise With Us" advertiser panel (planned for later phase).
- Native mobile app for admins (the gate scanner will run in a mobile browser; native app can come later).

---

## 5. User Roles & Permissions

The admin dashboard supports multiple admin roles. Each role sees only what is relevant to that role, improving security and reducing on-screen clutter.

| Role | Primary Responsibility | Key Permissions |
|---|---|---|
| **Super Admin** | Full system ownership | All features, manage admins, view audit logs, change settings |
| **Event Manager** | Runs one or more shows | Create/edit events, view registrations, send broadcasts, export reports |
| **Calling Agent** | Confirms audience by phone | View assigned audience list, update call status, add notes; cannot delete users/events |
| **Gate Staff** | On-ground entry validation | QR scanner only, mark check-in, view basic attendee info, no data export |
| **Viewer** | Read-only stakeholder | View dashboards and reports only, no edits |

---

## 6. Feature Requirements

### 6.1 Dashboard Home (Overview Screen)

The landing screen after login. Gives a quick operational pulse of the entire platform.

#### 6.1.1 Key Metric Cards (top of screen)
- Total registered users (all-time).
- New registrations today / this week / this month.
- Total show registrations today.
- Upcoming shows in the next 7 days.
- Check-in rate of the last completed show (attended / registered %).
- No-show rate of the last completed show.

#### 6.1.2 Widgets
- **Ongoing & Upcoming Shows** — card list showing show name, date, venue, seats filled vs total, and quick action buttons (View Registrations, Send Reminder, Open Scanner).
- **Registrations Trend Graph** — line chart for the last 30 days.
- **Recent Activity Feed** — latest 10 actions across the system (new registration, cancellation, admin edits).
- **Quick Actions** — shortcut buttons: Add New Show, Export Today's List, Open Scanner.

---

### 6.2 Show / Event Management

The module where admins create and manage every show on the platform. This is the foundation — a show must exist here before users can register for it in the mobile app.

#### 6.2.1 Show Listing Screen
- Table view of all shows with columns: Show Name, Date(s), Venue, Seats Total, Seats Filled, Status (Active / Inactive / Full / Completed / Cancelled), Actions.
- Filters: by status, by city, by date range, by show type.
- Search by show name.
- Sort by date (newest first by default).
- Colour-coded status badges for quick visual scan.

#### 6.2.2 Create / Edit Show

Admin fills a form with the following fields:

- Show Name (mandatory).
- Show Type (Reality / Talent / Comedy / Game / Live Studio / Other).
- Show Date(s) — supports single date or multi-date slots.
- Show Time (start time, duration).
- Venue Name.
- Venue Address / City.
- Total Seats / Quota.
- Per-user registration limit (default 1).
- Show Banner Image (optional, shown in app).
- Short Description (for app display).
- Additional custom fields required from audience during registration (age band, gender, group size, etc.).
- Reporting time at venue (shown on ticket).
- Show Status — Active / Inactive / Fully Booked / Cancelled / Completed.

#### 6.2.3 Show Actions
- Duplicate show (useful for recurring shows).
- Mark as Fully Booked (hides the show from the app).
- Cancel show — automatically triggers SMS/email to all registered users with cancellation notice.
- Mark as Completed — archives the show and unlocks Name/DOB edits for attendees.
- Delete show — only allowed if zero registrations; otherwise Super Admin confirmation required.

---

### 6.3 Registered Audience Management (Per Show)

Clicking a show from the listing opens the Show Detail view. This is one of the most-used screens in the dashboard — it shows every person registered for that show and lets the admin take action on each of them.

#### 6.3.1 Show Detail Header
- Show name, date, venue, total seats, seats filled, seats remaining.
- Status badge (Active / Full / Completed etc.).
- Primary action buttons: Export List, Send Broadcast, Open Scanner, Edit Show.

#### 6.3.2 Registered Users Table

Columns visible in the table:

- Serial number / Registration ID.
- Full Name.
- Mobile Number.
- City.
- Age (derived from DOB).
- Gender (if captured).
- Registration Date & Time.
- Call / Confirmation Status (Not Called, Called — Confirmed, Called — Declined, No Answer, Wrong Number, Callback Requested).
- Ticket Status (Issued / Sent / Not Sent).
- Check-in Status (Pending / Checked-In / No-Show) — updated automatically by the scanner.
- Quick actions: Call, WhatsApp, View Profile, Cancel Registration.

#### 6.3.3 Filters & Search
- Search by name or mobile number.
- Filter by call status, check-in status, city, age band, gender, registration date.
- Bulk select rows for group actions (Assign to Agent, Send SMS, Export Selected, Mark Cancelled).

---

### 6.4 Audience Member Detail View

Clicking a row opens a detailed profile. This screen is designed to give the calling agent everything they need in one place before picking up the phone.

#### 6.4.1 Profile Section
- Full Name, Mobile Number, Email, City, DOB / Age, Gender.
- Profile photo (if captured in future app version).
- Registered on (date / time).
- Total shows attended (lifetime), total no-shows (lifetime) — reputation score.

#### 6.4.2 Current Show Registration
- Show name, date, venue, seat count.
- Ticket / QR code preview — option to resend the ticket via SMS/email/WhatsApp.
- Cancel this registration (with confirmation dialog).

#### 6.4.3 Call & Communication Log

A chronological log of every interaction with this user for this show. Each log entry captures:

- Date & time of call.
- Agent who made the call.
- Call outcome (Confirmed / Declined / No Answer / Callback / Wrong Number).
- Free-text remarks ("will bring 2 guests", "calling back at 6 pm", etc.).
- Any SMS/WhatsApp/email sent to the user — auto-logged.

#### 6.4.4 Registration History
- Table of every past show this user registered for.
- Shows attended vs missed — helps decide whether to prioritise this user or flag as unreliable.

---

### 6.5 Contact & Confirmation Module

Before every show, the Dhaasoo team calls registered audience members to confirm they will attend. This module streamlines that operation.

#### 6.5.1 Call Queue
- Auto-generated list of users yet to be called for an upcoming show.
- Prioritisation logic: users registered earliest first; users with poor attendance history flagged.
- "Next to Call" button — serves one user at a time to the agent, like a ticket queue.

#### 6.5.2 Agent Assignment
- Super Admin / Event Manager can assign a batch of users to a specific Calling Agent.
- Each agent sees only their assigned list on login.
- Re-assignment possible if an agent is unavailable.

#### 6.5.3 Call Outcome Capture

When an agent finishes a call, they update the outcome using a simple form:

- Status dropdown: Confirmed / Declined / No Answer / Wrong Number / Callback Requested / Do Not Disturb.
- Number of guests confirmed (if applicable).
- Callback time (if "Callback Requested").
- Free-text remarks.
- Auto-time-stamped and tagged with the agent's name.

#### 6.5.4 One-Click Actions
- Click mobile number to dial directly (`tel:` link on mobile/tablet, click-to-call on desktop if a dialler integration is set up later).
- WhatsApp button — opens a WhatsApp chat window with a pre-filled message template.
- SMS button — sends a pre-defined template such as ticket details or reminder.

---

### 6.6 Ticket & QR Code System

Every confirmed registration must have a unique, tamper-resistant ticket so the audience can be verified at the venue.

#### 6.6.1 Ticket Generation
- A unique QR code is auto-generated at the moment of registration.
- The QR encodes a secure, non-guessable token (not the raw user ID), linked on the server to: Registration ID, Show ID, User ID, and validity window.
- Ticket visual contains: Dhaasoo logo, show name, date, time, venue, reporting time, audience name, registration ID, and the QR code.

#### 6.6.2 Ticket Delivery
- Ticket delivered automatically via SMS (short link), email (PDF attachment), and WhatsApp (image) immediately on successful registration.
- Ticket also visible inside the Dhaasoo mobile app for the user.
- Admin can manually resend the ticket from the user detail screen.

#### 6.6.3 Ticket Rules
- One ticket per registration — duplicate or reused tickets are rejected at the scanner.
- Ticket becomes inactive once the show is marked Completed or Cancelled.
- If a registration is cancelled, the QR is immediately invalidated.

---

### 6.7 QR Scanner & Gate Check-In Module

A critical on-ground tool used by Gate Staff at the venue on show day. It must be fast, mobile-friendly, and able to work in low-connectivity conditions.

#### 6.7.1 Scanner Interface
- Accessible via web browser on any Android/iOS phone or tablet used by Gate Staff — no separate app install required for v1.0.
- Large, simple "Scan" button; scanner uses the device camera.
- On successful scan, screen immediately shows: audience name, photo (if available), show, seat info, and a big green tick or red cross.

#### 6.7.2 Valid Scan Behaviour
- Green success screen with audience name and "Checked-In" confirmation.
- Entry is timestamped and recorded against the registration.
- Audible beep + haptic feedback for fast, heads-down scanning in queues.

#### 6.7.3 Invalid Scan Behaviour
- Red rejection screen with the exact reason shown: Already Checked-In, Ticket for Different Show, Registration Cancelled, Invalid QR, Show Not Yet Active.
- Duplicate scan protection: the same QR cannot be used twice.

#### 6.7.4 Manual Entry Override
- If a user forgot their ticket or the QR is damaged, Gate Staff can search by mobile number or registration ID and check them in manually.
- Every manual check-in is flagged and logged with the staff member's name.

#### 6.7.5 Offline Mode
- Scanner pre-loads the show's registered list when opened on good network.
- If the venue has poor connectivity, scanning continues to work locally and syncs to the server once network returns.

#### 6.7.6 Live Entry Dashboard
- A parallel real-time view showing: Checked-In Count, Pending Count, Current Entry Rate (per minute).
- Visible to Event Managers and Super Admins so they can monitor the crowd flow in real time.

---

### 6.8 Attendance & No-Show Management

#### 6.8.1 Automatic Attendance Marking
- Every successful scan marks the user as "Attended".
- When the show is marked Completed, all users not scanned in are automatically marked "No-Show".

#### 6.8.2 No-Show Reputation
- A running no-show count is maintained against each user's profile.
- If a user exceeds a configurable no-show threshold (e.g., 3 no-shows in 6 months), the admin can flag them as "Unreliable" or "Blacklist."
- Blacklisted users are prevented from registering again until unblocked by a Super Admin.

#### 6.8.3 Post-Show Summary

After every show, a one-page summary is auto-generated:

- Total registered / Total attended / No-shows / Manual check-ins.
- City-wise, age-wise, gender-wise attendance breakdown.
- Peak entry time window.
- Exportable as PDF for internal reporting.

---

### 6.9 Communication & Broadcast Module

Centralised tool to send SMS, email, and WhatsApp messages to audience members — individually or in bulk.

#### 6.9.1 Message Templates
- Pre-approved templates for: Registration Confirmation, Ticket Delivery, 24-Hour Reminder, Show-Day Reminder, Venue Update, Cancellation Notice, Thank-You Message.
- Support for dynamic placeholders: `{{Name}}`, `{{ShowName}}`, `{{Date}}`, `{{Venue}}`, `{{ReportingTime}}`.
- Templates can be edited by Super Admin only.

#### 6.9.2 Bulk Broadcast
- Select a show (or a filtered list within a show) and send a message to all selected users.
- Preview before send.
- Delivery report: sent, delivered, failed, read (where platform supports it).

#### 6.9.3 Automated Reminders
- 24 hours before show: reminder with ticket link.
- Show day morning: reporting time, venue map, contact number.
- Post-show: thank-you + short feedback ask.
- All automated flows can be toggled on/off per show.

---

### 6.10 Master User Database

A global list of every user registered on the Dhaasoo platform, separate from any specific show.

#### 6.10.1 Features
- Searchable, filterable list of all users (Name, Mobile, Email, City, DOB, Gender).
- View any user's complete registration history across all past and upcoming shows.
- Attendance statistics per user (total registered / attended / no-shows / blacklist status).
- Export the full or filtered user database to Excel / CSV.
- Manual user block / unblock with reason capture.

#### 6.10.2 Data Integrity Rules
- Mobile number is immutable once verified through OTP — enforced at the app level and reflected in the dashboard.
- Name and DOB cannot be edited by the user while they have an active show registration. The admin can see this lock status on the user profile.
- Email and City remain editable anytime.

---

### 6.11 Reports & Analytics

#### 6.11.1 Standard Reports
- Daily Registrations Report.
- Event-wise Registrations Report.
- Attendance Report (per show).
- No-Show Report (per show and lifetime).
- City-wise / Age-wise / Gender-wise Breakdown.
- Agent Performance Report (calls made, confirmations secured, call-to-show conversion).

#### 6.11.2 Export Options
- CSV and Excel for all tabular reports.
- PDF for post-show summary.
- Date-range selector on every report.

#### 6.11.3 Analytics Dashboard
- 30/60/90-day registration trend.
- Top-performing shows (by fill rate and attendance rate).
- City-wise user heat map.
- Month-on-month growth metrics.

---

### 6.12 Admin User & Role Management
- Super Admin can create, edit, disable, or delete other admin accounts.
- Role assignment per admin (Event Manager, Calling Agent, Gate Staff, Viewer).
- Per-show access restriction — an Event Manager can be scoped to specific shows only.
- Password reset, mandatory password change on first login.
- Two-Factor Authentication (2FA) for Super Admin and Event Managers.

---

### 6.13 In-Dashboard Notifications & Alerts
- Alert when a show is nearing capacity (e.g., 90% full).
- Alert when a show has fewer than X confirmations 24 hours before start.
- Alert on unusual registration spikes (possible bot/spam activity).
- Alert on system events — failed SMS delivery, cancelled shows, blocked users.

---

### 6.14 Audit Log & Activity Trail
- Every admin action is logged: who did what, when, on which record.
- Filterable by admin, by action type, by date range.
- Read-only — cannot be edited or deleted by anyone, including Super Admin.
- Retained for a minimum of 12 months.

---

### 6.15 Settings
- Organisation profile (name, logo, contact details — used on tickets and emails).
- SMS / Email / WhatsApp provider configuration.
- Default reminder schedules.
- Blacklist threshold configuration.
- Time zone.
- Support contact shown to audience on tickets.

---

## 7. Key Admin User Flows

### 7.1 Creating and Launching a New Show
1. Super Admin or Event Manager logs in.
2. Clicks "Add New Show" from dashboard or Show listing.
3. Fills show form (name, date, venue, seats, description, banner).
4. Sets status to Active and saves.
5. Show becomes visible in the Dhaasoo mobile app for users to register.
6. Event Manager monitors registrations in real time from Show Detail.

### 7.2 Pre-Show Calling & Confirmation
1. Event Manager opens Show Detail two days before the show.
2. Assigns the registered audience list to one or more Calling Agents.
3. Calling Agent logs in, sees their call queue.
4. Agent clicks the next user, reviews profile, dials the number.
5. After the call, agent updates status (Confirmed / Declined / Callback) and adds remarks.
6. System auto-updates the Confirmation dashboard in real time.

### 7.3 Show-Day Entry Flow
1. Gate Staff opens the scanner URL on a phone or tablet and logs in.
2. Selects the show being run that day (auto-selected if only one is active).
3. Scans each audience member's QR code as they arrive.
4. Valid ticket → green screen → user is checked in.
5. Invalid ticket → red screen with reason; staff refers them to manual help desk.
6. Manual help desk searches by mobile number and does a manual check-in if appropriate.
7. Event Manager monitors live entry counts from the dashboard.

### 7.4 Post-Show Reporting
1. Once the show ends, Event Manager marks the show as Completed.
2. System auto-marks all non-scanned registrations as No-Show.
3. Post-show summary PDF is generated and available for download.
4. User no-show counts are updated; repeat offenders are flagged for review.
5. Thank-you SMS/WhatsApp is auto-sent to all attendees.

---

## 8. Non-Functional Requirements

| Area | Requirement |
|---|---|
| **Performance** | Dashboard screens must load within 2 seconds on a standard broadband connection. Scanner validation must complete in under 1 second per scan. |
| **Scalability** | Must handle at least 100,000 total registered users and 10,000 concurrent users on show days without degradation. |
| **Security** | HTTPS everywhere. Role-based access control. 2FA for privileged admins. Passwords hashed (bcrypt or stronger). QR tokens signed and non-guessable. |
| **Data Privacy** | User PII (mobile, email, DOB) accessible only to authorised roles. Full audit log of who viewed what. Data-retention policy configurable. |
| **Reliability** | 99.5% uptime target. Automated daily backups with 30-day retention. Disaster-recovery plan documented separately. |
| **Usability** | Mobile-responsive. Scanner usable one-handed on a phone in bright outdoor light. Minimum 14pt font for tabular data. |
| **Browser Support** | Latest two versions of Chrome, Edge, Safari, Firefox. Scanner tested on Android 10+ and iOS 14+ browsers. |
| **Localisation** | English for v1.0. Architecture must allow Hindi + Marathi in a future release without major refactor. |
| **Accessibility** | WCAG 2.1 AA target for all admin screens. |

---

## 9. Success Metrics / KPIs

- **Show fill rate** — % of seats filled against total quota per show.
- **Confirmation rate** — % of registered users confirmed by calling before the show.
- **Attendance rate** — % of registered users who actually attended (scanned in).
- **No-show rate** — % of confirmed users who did not attend.
- **Average scan time at the gate** — target: under 3 seconds per person.
- **Agent efficiency** — average calls per hour, confirmation conversion %.
- **Admin adoption** — % of active admins logging in weekly.

---

## 10. Future Enhancements (Post v1.0)

- Native mobile admin app for scanning and on-ground operations.
- Integration with "Show Your Talent" submissions — video upload review workflow.
- Advertiser panel for "Advertise With Us" module.
- Seat-level allocation (row/seat number) for ticketed seating shows.
- Multi-language support (Hindi, Marathi, Tamil, Telugu).
- AI-based attendance prediction to help plan overbooking safely.
- Automated WhatsApp chatbot to handle basic user queries pre-show.
- Loyalty / rewards programme for frequent audience members.

---

## 11. Assumptions & Dependencies

- SMS, email, and WhatsApp provider accounts are in place and available via API.
- Venue has basic internet connectivity on show day (scanner also supports offline fallback).
- Gate Staff are provided with at least one smartphone or tablet per entry lane.
- The Dhaasoo mobile app continues to be the sole registration channel for audience members.
- All audience data remains the property of Dhaasoo and is not shared with third parties.

---

## 12. Open Questions for Stakeholders

- Should Calling Agents have click-to-call (CRM/dialler) integration from day one, or is `tel:` link sufficient for v1.0?
- What is the exact no-show threshold before a user is auto-flagged as unreliable? (proposed: 3 in 6 months)
- Is paid / sponsored seating to be considered within the next 12 months?
- Will WhatsApp Business API be used, or is basic click-to-WhatsApp acceptable?
- Who owns content approval for the SMS/email templates — Ops or Marketing?

---

## 13. Glossary

| Term | Meaning |
|---|---|
| **Show / Event** | A single scheduled instance of a programme for which audience registrations are taken. |
| **Registration** | A user booking a seat for a specific show on a specific date. |
| **Ticket / QR** | Unique code generated per registration, used for entry validation. |
| **Check-In** | The act of an audience member arriving at the venue and having their QR scanned successfully. |
| **No-Show** | A registered user who did not check in by the end of the show. |
| **Calling Agent** | Admin role responsible for calling registered users to confirm attendance. |
| **Gate Staff** | Admin role responsible for scanning audience entry at the venue. |

---

*— End of Document —*
