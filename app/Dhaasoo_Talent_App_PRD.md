# Dhaasoo Talent — Audience Registration Mobile App
## Product Requirements Document

| | |
|---|---|
| **Document Title** | Dhaasoo Talent App — Product Requirements Document |
| **Version** | 1.0 |
| **Status** | Draft — For Review |
| **Prepared For** | Dhaasoo Product & Engineering Team |
| **Module** | Audience Registration Mobile App |
| **Related Modules** | Admin Dashboard (Web), Static Website |

---

## 1. Document Purpose

This Product Requirements Document (PRD) defines the complete scope, screens, features, user flows, and design decisions for the Dhaasoo Talent audience registration mobile app. The app is the primary channel through which members of the public register to attend live TV and stage shows as part of the studio audience — at no charge.

This document serves as the single source of truth for designers, developers, QA, and stakeholders working on the Dhaasoo Talent app.

---

## 2. Background & Context

Dhaasoo is an audience registration platform for live television and stage shows — reality shows, talent shows, comedy shows, game shows, and live studio productions. Traditional audience booking for such events involves manual phone calls, walk-ins, or opaque agent channels. Dhaasoo replaces this with a transparent, digital-first, fully free self-registration experience.

The Dhaasoo Talent app lets any eligible member of the public:
- Browse upcoming shows currently open for audience registration.
- Register themselves (and up to 3 additional guests who are also Dhaasoo members) for a specific show date and time slot.
- Track the status of their registration from application through waitlist to confirmation.
- Present a digital QR-based identity (BaRCo) for venue entry on show day.

The app was built as a single-page HTML5 application with GSAP-powered screen transitions, designed for mobile screens up to 390 px wide.

---

## 3. Goals & Objectives

### 3.1 Business Goals
- Eliminate manual audience coordination by moving registration entirely online.
- Build a verified, structured audience database that the Dhaasoo operations team can use for calling, confirmation, and entry management.
- Reinforce that participation is 100% free — reducing audience hesitation caused by third-party ticket touts.
- Maximise show fill rate by making registration frictionless and accessible from any smartphone.

### 3.2 Product Objectives
- Provide a seamless end-to-end flow: discover show → register → receive BaRCo → attend.
- Capture the minimum viable personal profile required to issue a unique identity (BaRCo) and enable venue entry.
- Give users full visibility into their registration status and history.
- Support bilingual usage (English and Hindi) from day one.

---

## 4. Scope

### 4.1 In Scope (v1.0)
- Mobile web app (HTML/CSS/JS) delivered as a single `index.html` file.
- Complete onboarding flow: splash → agreement → login → OTP verification.
- Show discovery: dashboard with featured and trending shows, filterable all-shows listing.
- Seat booking: date selection, time-slot preference, additional guest seat booking via BaRCo lookup.
- Registration form: two-step profile creation capturing personal and professional details.
- Registration review and confirmation screen.
- BaRCo identity issuance on successful registration.
- My Registrations: active, upcoming, and history views with registration status tracking.
- Registration Detail view for a specific booking.
- User Profile: BaRCo QR code display, personal and professional info, partial profile lock.
- Terms & Conditions and pre-login User Agreement screens.
- Bottom navigation bar across all post-login screens.
- GSAP-powered entrance animations on each screen transition.

### 4.2 Out of Scope (v1.0)
- Payment or ticketing integration — the platform is 100% free.
- Push notifications (native app feature; SMS/WhatsApp covers this in v1.0).
- Native iOS or Android app — the web app is designed for mobile browsers.
- Admin or gate-staff functionality (covered in the separate Admin Dashboard PRD).
- Show talent submission ("Show Your Talent") workflow.
- In-app chat or support widget.

---

## 5. Target Users

| User Type | Description |
|---|---|
| **First-time registrant** | Never used Dhaasoo before; needs clear onboarding and trust signals. |
| **Returning audience member** | Has a BaRCo; browses new shows and books seats directly. |
| **Group organiser** | Books seats for themselves and up to 3 additional Dhaasoo members. |

**Eligibility:** Users must be at least 18 years of age, hold a valid Indian mobile number, and agree to the platform's terms before registering.

---

## 6. Design Principles

- **Dark theme, warm orange brand.** The app uses a deep brown-black background (`#190d00`) with Dhaasoo's primary orange (`#E8761A`) for all CTAs, highlights, and interactive states.
- **Mobile-first, 390 px canvas.** The app is designed for a standard smartphone viewport; all screens fill the full device height using `100dvh`.
- **100% FREE as a UX signal.** The "100% FREE" message appears on the splash, login, OTP, registration, and booking screens to eliminate doubt at every decision point.
- **No visible scrollbars.** All scrollable areas hide their scrollbars to give a clean, app-native feel.
- **GSAP animations.** Each screen-to-screen transition includes a lightweight entrance animation (typically a header slide from above: `y: -16 → 0`), using the GSAP core library loaded from CDN.
- **Minimal friction.** Mandatory steps are kept to a minimum; photo upload is present in the UI but validation is optional in v1.0.

---

## 7. Screen Inventory & Functional Requirements

### 7.1 Splash Screen (`screen-splash`)

The first screen the user sees on app launch.

**Elements:**
- Dhaasoo clapperboard logo in an orange rounded square with glow shadow.
- App name: **Dhaasoo Talent** (28 px, 800 weight).
- Tagline: *"To Register yourself for Guest Audience to your favorite Show/s."*
- CTA button: **100% FREE / NO CHARGES** — navigates to the Agreement screen.
- Page indicator dots (3 dots, first active in orange).
- Version label: *Version 1.0*.

**Behaviour:** Tapping the CTA moves the user to the pre-login Agreement screen. No auto-advance.

---

### 7.2 User Agreement Screen (`screen-agreement`)

A mandatory pre-login screen the user must acknowledge before proceeding.

**Elements:**
- Back arrow returning to Splash.
- App name header.
- Hero icon + headline: *"Register yourself for audience to your favourite shows."*
- Sub-copy: *"Please read and accept our terms before joining the live TV audience."*
- **100% Free — No charges ever** badge (animated green pulse).
- Free status banner (large "100% FREE" display).
- Agreement content sections:
  - Agreement Overview
  - Data Usage & Privacy (with security callout card)
  - Entry Rules (3 bullet points: one account per user, 18+ age requirement, no bots)
- **Next** button (orange) — navigates to Login once tapped.

**Behaviour:** The Next button is immediately active (no forced scroll-to-bottom). Tapping Next navigates to the Login screen.

---

### 7.3 Login Screen (`screen-login`)

OTP-based phone number authentication. No password ever required.

**Elements:**
- Info icon (top-right).
- Language toggle: **English** / **हिंदी** (pill toggle; active language shown with orange background).
- Dhaasoo logo icon (smaller, 64 px).
- Headline: *"Welcome to Dhaasoo."*
- Sub-copy: *"Register with your number to join the live TV audience."*
- Mobile number input:
  - Left: India flag emoji + `+91` country code (non-editable).
  - Right: 11-digit numeric text field (`inputmode="numeric"`).
- **Send OTP →** button — navigates to OTP screen.
- **100% Free Registration** green badge.
- Footer legal copy: *"By tapping 'Send OTP', you agree to our Terms of Service & Privacy Policy"* — both links navigate to the Terms screen.

**Behaviour:** Language toggle switches display language (English/Hindi). The Send OTP button proceeds to OTP verification.

---

### 7.4 OTP Verification Screen (`screen-otp`)

Verifies the user's identity via a 6-digit one-time password sent by SMS.

**Elements:**
- Back arrow → returns to Login.
- Lock icon in an orange ring.
- Headline: **Verify OTP.**
- Sub-copy showing the number sent to (displayed as `+91 00000 00000` in prototype).
- 6 individual digit input boxes (`44 × 52 px` each, auto-focus advances to next box on entry).
- **Resend OTP** link.
- Countdown timer: 00:59 countdown badge.
- **Verify & Proceed →** button — navigates to Registration Step 1 (new user) or Dashboard (returning user).
- **100% FREE REGISTRATION** green badge.
- Progress dots: 2 of 4 active.

**Behaviour:**
- Digit focus auto-advances left-to-right.
- Resend OTP resets the 60-second countdown.
- Verify navigates forward. In prototype, navigates directly to `reg1`.

---

### 7.5 Dashboard Screen (`screen-dashboard`)

The post-login home screen showing personalised content and featured shows.

**Elements:**

**Top bar:**
- Avatar circle (gradient, first-letter monogram).
- Greeting: *"Namaste,"* + user's first name.
- Notification bell icon with orange dot indicator.
- Today's date (short format).

**Body (scrollable):**
- Section heading: *"Your Upcoming Shows."*
- **Featured show card** — large card with:
  - 140 px gradient banner with show genre badge.
  - Show name, venue, schedule details.
  - **@ Free Pass** orange CTA button → navigates to Book Seat screen.
- **Genre filter chips** (horizontal scroll): All Shows, Reality TV, Comedy, Talent.
- Section heading: *"Trending Now 🔥"* with **See All** link → navigates to Shows screen.
- **Trending show list** — compact horizontal cards (thumbnail + name + genre badge + seats-remaining indicator + Register/Sold Out action).

**Navigation:** Bottom nav bar with Home (active), Shows, My Regs, Profile tabs.

---

### 7.6 Shows Screen (`screen-shows`)

Full browsable catalogue of all shows open for registration.

**Elements:**
- Search input at the top.
- Genre filter chips (All Shows, Reality TV, Comedy, Talent — horizontal scroll).
- Show cards in a vertical list, each containing:
  - Show thumbnail / gradient placeholder.
  - Show name and type badge.
  - Venue and city.
  - Date and time.
  - Seat availability indicator (seats remaining or "Sold Out" badge).
  - **Register** CTA → navigates to Book Seat.
- Sold-out shows display a **Sold Out** badge and a disabled CTA.

**Navigation:** Bottom nav bar (Shows tab active).

---

### 7.7 Book Seat Screen (`screen-book`)

Date and slot selection before the user fills in their registration details.

**Elements:**
- Screen header: *"Book Your Seat"* + back arrow → Shows.
- **Show info card** — thumbnail, show name, venue (compact row).
- **Select Date** dropdown — lists available recording dates (e.g., weekly Tuesdays). Animated **100% FREE** flash badge alongside.
- **Preferred Slot** radio cards:
  - ☀️ Morning (default selected, orange border).
  - ⛅ Afternoon.
  - 🌙 Evening.
  - Sub-note: *"Actual entry time is confirmed by Dhaasoo team."*
- **Additional Seats** stepper:
  - Label + sub-copy: *"Including yourself — max 4 seats per booking."*
  - Minus / Count / Plus stepper. Count defaults to 0 (1 total seat including self).
  - Total seats row appears when count > 0.
- **Guest BaRCo section** (appears when additional seats > 0):
  - One BaRCo input field per additional guest.
  - Sub-note: *"Each guest must be registered on Dhaasoo app."*

**Sticky bottom bar:**
- Summary line: selected slot + total seat count.
- **Proceed →** button → navigates to Registration Step 1.

**Rules:**
- Registration closes 3 days before the show date.
- Maximum 4 seats per booking (1 primary + 3 guests).
- Each guest must have an existing Dhaasoo BaRCo.

---

### 7.8 Registration Step 1 — Create Profile (`screen-reg1`)

First of a two-step profile creation form.

**Elements:**
- Screen header: *"Create Profile"* + back arrow → Book Seat.
- Progress bar: Step 1 of 2 · 50% completed.
- **100% FREE — No Charges Ever** animated flash badge.
- Headline: *"Let's get you in the audience!"*

**Form fields:**
- **Photo** — circular tap-to-upload (camera icon placeholder; preview on selection). Optional in prototype.
- **Title** — select dropdown (Mr / Ms / Mrs / Dr / Other).
- **Full Name** — text input.
- **Age Range** — select dropdown (18–25, 26–35, 36–45, 46–55, 56+).
- **Gender** — select dropdown (Male / Female / Non-binary / Prefer not to say).
- **City / Location** — text input.
- **State** — select dropdown.

**Sticky bottom bar:**
- **Next: Professional Info →** button → navigates to Registration Step 2.

---

### 7.9 Registration Step 2 — Professional Info (`screen-reg2`)

Second step of the registration form, capturing professional and community context.

**Elements:**
- Screen header: *"Your Details"* + back arrow → Registration Step 1.
- Progress bar: Step 2 of 2 · 100% completed.

**Form fields:**
- **Profession** — text input.
- **Community / Language** — select dropdown (Marathi, Hindi, Gujarati, Tamil, Telugu, Kannada, Bengali, Punjabi, Other).
- **Email Address** — email input (optional).
- **WhatsApp Number** — pre-filled from mobile number; toggle to use a different number.

**Sticky bottom bar:**
- **Review My Details →** button → navigates to Review screen.

---

### 7.10 Review Screen (`screen-review`)

Displays a summary of all registration details for the user to verify before submitting.

**Elements:**
- Screen header: *"Review Details"* + back arrow → Registration Step 2.
- Show info row (show name, date, venue, slot, seats).
- Profile photo preview (if uploaded).
- Personal info summary rows: Name, Age Range, Gender, City, State.
- Professional info summary rows: Profession, Community.
- **Edit** link on each section → returns to the relevant step.
- **Confirm Registration** orange CTA button → navigates to Success screen.

---

### 7.11 Registration Success & BaRCo Issuance (`screen-success`)

Confirmation screen displayed after a successful registration submission.

**Elements:**
- Screen header: *"Confirmation"*.
- Large orange checkmark circle.
- Hindi congratulations headline: **बधाई हो!**
- Sub-headline: *"Registration Successful."*
- **BaRCo ID card** — displays the unique registration code (e.g., `DTAU-12345678`) with a **Tap to Copy** button.
- **3-step status tracker:**
  1. ✅ Registration Received — complete.
  2. 🟠 Waitlist Review — active (current status).
  3. ⬜ Confirmation — pending (will be notified via SMS).
- **Share with Friends** green button.
- **Go to Home** text button → navigates to Dashboard.

**Behaviour:** BaRCo ID is immediately copyable. Status step 2 indicates the user is on the waitlist; final confirmation is done by the Dhaasoo team via SMS after calling the registered user.

---

### 7.12 My Registrations Screen (`screen-myregs`)

A centralised view of all shows the user has registered for.

**Elements:**
- Header: *"My Registrations"* + Search icon + Filter icon.
- **Tabs:** Active | Upcoming | History (underline-style tab navigation).
- **Registration cards** (one per show), each showing:
  - Show thumbnail gradient.
  - Show name, venue, date and time.
  - Status badge: **✓ Confirmed** (green) / **⏳ Awaiting** (amber) / **Waitlist** (purple) / none.
  - Context-sensitive action buttons:
    - Confirmed → **@ View Ticket** (orange).
    - Awaiting → **Manage Request** + **Cancel** (red border).
    - General → **View Details** → navigates to Review Details screen.
    - Waitlist → **Leave Waitlist**.

**Navigation:** Bottom nav bar (My Regs tab active).

---

### 7.13 Review Details Screen (`screen-review-details`)

Detailed drill-down for a single registration record.

**Elements:**
- Screen header: *"Review Details"* + back arrow → My Registrations.
- User photo / avatar + name + profession.
- Show info: banner gradient, show name, type badge.
- Detail rows: Date, Time, Venue, Slot, Seats requested.
- Registration status badge.
- BaRCo / QR preview (if confirmed).
- Action options (Cancel registration, Resend ticket).

---

### 7.14 User Profile Screen (`screen-profile`)

The user's identity card and personal/professional information hub.

**Elements:**
- Screen header: *"Profile"* + back to Dashboard + settings gear icon.
- **Profile avatar** with edit pencil overlay.
- Full name.
- **Dhaasoo ID badge** — orange-bordered pill showing `ID: DHS-XXXX-XX`.
- *"Member since YYYY"* label.
- **100% FREE LIFETIME ACCESS** green badge.

**BaRCo Card:**
- Section labelled *"My BaRCo"* under *"UNIQUE IDENTITY"*.
- CSS-generated QR code pattern on a white background.
- Numeric code below QR (e.g., `9928 - 9912 - XMRZ`).
- *"Scan at venue entry"* helper text + **TAP TO ENLARGE** link.

**Profile Lock Warning:**
- Amber callout: *"Profile Partially Locked — Name & Mobile number cannot be changed after registration."*

**Info Tabs:**
- **Personal Info** (default): Verified Mobile (locked), Full Name (locked), Age Range, Gender, City / Location, Email Address.
- **Professional**: Profession, Community.

**Sticky Edit Profile button** (floating above bottom nav).

**Log Out** link (red text, triggers logout and returns to Login screen).

---

### 7.15 Terms & Conditions Screen (`screen-terms`)

Full legal terms, accessible from the login footer links.

**Sections:** Agreement Overview, Data Usage & Privacy, Entry Rules.

**Sticky accept footer:** Checkbox *"I have read and understood the Terms & Conditions"* + **Accept & Continue →** button.

---

## 8. Navigation & Screen Flow

```
Splash
  └─► Agreement
        └─► Login
              └─► OTP Verification
                    └─► [New user] Registration Step 1
                    │         └─► Registration Step 2
                    │                   └─► Review
                    │                         └─► Success ──► Dashboard
                    └─► [Returning user] Dashboard
                                ├─► Shows ──► Book Seat ──► Registration Step 1
                                ├─► My Registrations ──► Review Details
                                ├─► Profile
                                └─► Terms (from Login footer)
```

**Bottom navigation tabs** (visible on all post-login main screens):

| Tab | Icon | Navigates to |
|---|---|---|
| Home | House | Dashboard |
| Shows | Grid | Shows |
| My Regs | Document | My Registrations |
| Profile | Person | Profile |

---

## 9. BaRCo Identity System

BaRCo (Barcode + Registration Code) is Dhaasoo's unique persistent identity for every registered user.

- **Issued once** at first successful registration.
- **Format:** Alphanumeric string (e.g., `DHS-9928-XM` for profile display; `DTAU-12345678` as registration confirmation code).
- **QR representation:** Generated in the Profile screen and used as the venue entry credential.
- **Persistent:** The same BaRCo is used for every future registration; users do not get a new one per show.
- **Guest booking:** When booking additional seats, the primary user must enter the BaRCo of each guest, confirming they are also registered Dhaasoo members.
- **Venue entry:** Gate staff scan the BaRCo QR at the venue. This links to the Admin Dashboard's gate scanner module.

---

## 10. Registration Status Lifecycle

A registration passes through the following states after submission:

| Status | Description | UI Indicator |
|---|---|---|
| **Waitlist Review** | Submitted; pending Dhaasoo team review | Amber "⏳ Awaiting" badge |
| **Confirmed** | Dhaasoo team has confirmed the seat | Green "✓ Confirmed" badge |
| **Waitlist** | In queue; shown if initially over-requested | Purple "Waitlist" badge |
| **Cancelled** | Cancelled by user or admin | No longer shown in Active tab |

Final confirmation is completed by the Dhaasoo calling team via phone before the show. Confirmed users receive an SMS notification.

**Registration cutoff:** Registrations close 3 days before the show date.

---

## 11. Language & Localisation

- **v1.0 languages:** English and Hindi.
- Language toggle available on the Login screen (English / हिंदी pill toggle).
- The success screen uses Hindi ("**बधाई हो!**") as a culturally contextual moment of delight.
- All UI copy defaults to English; the Hindi switch affects on-screen labels (full localisation of all strings is a v1.1 target).
- Architecture supports extending to Marathi, Tamil, Telugu, Gujarati in future releases.

---

## 12. Technical Specifications

| Attribute | Detail |
|---|---|
| **Delivery format** | Single `index.html` file (HTML + CSS + JS inline) |
| **Viewport target** | 390 px width, full device height (`100dvh`) |
| **Fonts** | Inter (Google Fonts CDN), weights 400–900 |
| **Animation library** | GSAP 3.12.5 (CDN) — screen entrance animations |
| **Theme** | Dark; primary brand colour `#E8761A` (orange) |
| **Scrollbars** | Hidden globally (`scrollbar-width: none`) |
| **Screen architecture** | All screens as `position:absolute` divs; `display:none` / `display:flex` toggled via JS `goto()` function |
| **Navigation** | `goto(screenName)` JS function with optional GSAP transition |
| **Offline** | Not supported in v1.0 |
| **Browser target** | Mobile Chrome and Safari (Android 10+, iOS 14+) |

---

## 13. Non-Functional Requirements

| Area | Requirement |
|---|---|
| **Performance** | App must load fully in under 3 seconds on a 4G connection. GSAP animations run at 60 fps on mid-range Android devices. |
| **Security** | OTP verification before any registration data is accepted. BaRCo tokens are non-guessable and server-validated. Mobile number is immutable post-verification. |
| **Data Privacy** | User PII (mobile, DOB, photo) stored only on Dhaasoo servers. Not shared with third parties. Data protected as stated in the in-app T&C. |
| **Usability** | All tap targets ≥ 44 × 44 px. Form fields at 15 px minimum font. Contrast ratios meet WCAG AA on all interactive text. |
| **Reliability** | The app should function as a standalone HTML file deliverable from any static host or CDN. No external APIs blocking first render. |
| **Accessibility** | Focus management on OTP boxes; readable touch targets; GSAP animations respect `prefers-reduced-motion` in future update. |

---

## 14. Success Metrics / KPIs

- **Onboarding completion rate** — % of users who start the splash flow and complete OTP verification.
- **Registration completion rate** — % of users who reach Book Seat and complete a full registration.
- **Show fill rate** — % of seats filled per show via the app.
- **Waitlist-to-confirmation rate** — % of waitlisted registrations that reach Confirmed status.
- **Return user rate** — % of confirmed users who register for a second show within 90 days.
- **BaRCo QR scan success rate** — % of QR scans at the venue that are validated on first attempt.

---

## 15. Future Enhancements (Post v1.0)

- Native iOS and Android app (React Native or Flutter) for push notifications and home-screen presence.
- Full Hindi and regional language (Marathi, Tamil, Telugu, Gujarati, Bengali) UI localisation.
- Show search with keyword, city, date, and genre filters.
- In-app digital ticket with live QR code (replacing the BaRCo QR for per-show entry).
- In-app notifications for registration status changes (confirmed, reminder, cancellation).
- Loyalty badges and attendance streak rewards for frequent audience members.
- "Show Your Talent" submission screen for talent show participants.
- Referral programme: share BaRCo link and earn priority queue position.
- AI-powered show recommendations based on registration history and genre preferences.
- Seat-level selection (row and seat number) for shows with assigned seating.

---

## 16. Assumptions & Dependencies

- The Dhaasoo admin dashboard is operational and manages the show catalogue consumed by this app.
- Show listings and available dates are populated by the admin team before going live.
- SMS delivery for OTP and registration status is handled by an integrated SMS gateway provider.
- Gate staff use the Admin Dashboard scanner to validate BaRCo QR codes on show day.
- All shows in v1.0 are located in Mumbai. City-based filtering and multi-city support are planned for v1.1.

---

## 17. Open Questions

- Should the OTP countdown be 60 seconds (current prototype) or 30 seconds for faster resend?
- Is a profile photo mandatory for registration in the production build, or optional as currently implemented?
- What is the exact BaRCo format that will be generated by the backend (prefix, length, checksum)?
- Will guest BaRCo lookup validate in real time via API on the Book Seat screen, or only at registration submission?
- Should returning users (with an existing BaRCo) skip the registration steps entirely and proceed directly to Book Seat after OTP?

---

## 18. Glossary

| Term | Meaning |
|---|---|
| **BaRCo** | Barcode + Registration Code — the unique alphanumeric identity issued to every Dhaasoo member, represented as both a text string and a QR code. |
| **Show / Event** | A single scheduled live recording session for which audience registrations are open. |
| **Registration** | A user's application to attend a specific show on a specific date and slot. |
| **Waitlist** | Status indicating the user has applied but final seat confirmation is pending review by the Dhaasoo team. |
| **Confirmed** | Status indicating the Dhaasoo team has verified and approved the user's attendance. |
| **Slot** | The user's preferred time of day for the show recording (Morning / Afternoon / Evening). Actual entry time is confirmed by the Dhaasoo team. |
| **Calling team** | The Dhaasoo operations team who calls registered users to confirm attendance before each show. |
| **Gate Staff** | Dhaasoo team members at the venue who scan BaRCo QR codes to validate audience entry. |

---

*— End of Document —*
