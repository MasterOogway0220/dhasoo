// ─── Dhaasoo Admin Dashboard — Mock Data ───────────────────────────────────

window.D = {

  currentRole: 'super_admin', // set on login

  roles: {
    super_admin:   { label: 'Super Admin',    color: 'av-indigo', initials: 'SA', name: 'Rajesh Sharma',   email: 'rajesh@dhaasoo.com',   landing: 'overview' },
    event_manager: { label: 'Event Manager',  color: 'av-blue',   initials: 'EM', name: 'Arjun Mehta',    email: 'arjun@dhaasoo.com',    landing: 'overview' },
    calling_agent: { label: 'Calling Agent',  color: 'av-green',  initials: 'CA', name: 'Priya Kapoor',   email: 'priya@dhaasoo.com',    landing: 'call-queue' },
    gate_staff:    { label: 'Gate Staff',     color: 'av-orange', initials: 'GS', name: 'Suresh Patil',   email: 'suresh@dhaasoo.com',   landing: 'scanner' },
    viewer:        { label: 'Viewer',         color: 'av-teal',   initials: 'VW', name: 'Nisha Verma',    email: 'nisha@dhaasoo.com',    landing: 'overview' },
  },

  nav: {
    super_admin:   ['overview','shows','audience','call-queue','broadcast','settings'],
    event_manager: ['overview','shows','audience','broadcast'],
    calling_agent: ['call-queue','audience'],
    gate_staff:    [],
    viewer:        ['overview'],
  },

  shows: [
    { id: 1, name: 'Bollywood Retro Beats',  type: 'Concert', date: '24 Oct 2025', time: '07:00 PM', venue: 'Grand Arena, Andheri, Mumbai',      city: 'Mumbai', seats: 1500, filled: 1320, status: 'active',    banner: '🎵', description: 'A nostalgic evening of Bollywood classics.', reporting: '06:00 PM' },
    { id: 2, name: 'Sufi Night with Nizami', type: 'Concert', date: '26 Oct 2025', time: '08:00 PM', venue: 'Rang Sharda, Bandra, Mumbai',        city: 'Mumbai', seats: 800,  filled: 800,  status: 'full',      banner: '🎶', description: 'An evening of soul-stirring Sufi music.', reporting: '07:00 PM' },
    { id: 3, name: 'The Great Indian Comedy', type: 'Comedy', date: '03 Nov 2025', time: '07:30 PM', venue: 'Canvas Laugh Club, Andheri, Mumbai', city: 'Mumbai', seats: 600,  filled: 240,  status: 'active',    banner: '😂', description: 'Stand-up comedy night with top Indian comedians.', reporting: '06:30 PM' },
    { id: 4, name: 'Neon Echoes Live',        type: 'Concert', date: '24 Oct 2025', time: '08:00 PM', venue: 'MMRDA Grounds, BKC, Mumbai',        city: 'Mumbai', seats: 1000, filled: 842,  status: 'active',    banner: '🌟', description: 'Electronic music meets Bollywood in a live spectacle.', reporting: '07:00 PM' },
    { id: 5, name: 'MH Weekender Finals',     type: 'Reality', date: '15 Nov 2025', time: '06:00 PM', venue: 'Mahalaxmi Racecourse, Mumbai',      city: 'Mumbai', seats: 2000, filled: 1800, status: 'active',    banner: '🏆', description: 'Grand finale of Maharashtra Weekender 2025.', reporting: '05:00 PM' },
    { id: 6, name: 'Laugh Riot Vol 3',        type: 'Comedy', date: '10 Oct 2025', time: '07:00 PM', venue: 'Canvas Laugh Club, Andheri, Mumbai', city: 'Mumbai', seats: 450,  filled: 450,  status: 'completed', banner: '😄', description: 'Comedy show completed.', reporting: '06:00 PM' },
    { id: 7, name: 'Jazz Nights Mumbai',      type: 'Concert', date: '05 Oct 2025', time: '08:30 PM', venue: 'Blue Frog, Lower Parel, Mumbai',    city: 'Mumbai', seats: 300,  filled: 0,    status: 'cancelled', banner: '🎷', description: 'Cancelled due to venue issue.', reporting: '07:30 PM' },
  ],

  registrations: [
    { id: 'DH-10231', showId: 4, name: 'Arjun Mehta',    mobile: '+91 98200 12345', city: 'Mumbai',    age: 29, gender: 'Male',   regDate: '12 Oct, 10:24 AM', callStatus: 'confirmed',  ticket: 'sent',     checkin: 'pending',    avatar: 'av-blue',   initials: 'AM' },
    { id: 'DH-10232', showId: 4, name: 'Priya Sharma',   mobile: '+91 70451 23456', city: 'Thane',     age: 24, gender: 'Female', regDate: '12 Oct, 11:05 AM', callStatus: 'declined',   ticket: 'not_sent',  checkin: 'na',         avatar: 'av-pink',   initials: 'PS' },
    { id: 'DH-10233', showId: 4, name: 'Rohan Kapoor',   mobile: '+91 91870 98765', city: 'Pune',      age: 32, gender: 'Male',   regDate: '12 Oct, 02:15 PM', callStatus: 'no_answer',  ticket: 'sent',     checkin: 'checked_in', avatar: 'av-green',  initials: 'RK' },
    { id: 'DH-10234', showId: 4, name: 'Siddharth Nair', mobile: '+91 88795 65432', city: 'Mumbai',    age: 27, gender: 'Male',   regDate: '13 Oct, 09:00 AM', callStatus: 'confirmed',  ticket: 'sent',     checkin: 'pending',    avatar: 'av-indigo', initials: 'SN' },
    { id: 'DH-10235', showId: 4, name: 'Ananya Iyer',    mobile: '+91 77654 32100', city: 'Navi Mumbai', age: 22, gender: 'Female', regDate: '13 Oct, 03:30 PM', callStatus: 'callback', ticket: 'not_sent', checkin: 'pending',    avatar: 'av-purple', initials: 'AI' },
    { id: 'DH-10236', showId: 4, name: 'Vikram Singh',   mobile: '+91 98001 11222', city: 'Delhi',     age: 35, gender: 'Male',   regDate: '14 Oct, 08:45 AM', callStatus: 'confirmed',  ticket: 'sent',     checkin: 'pending',    avatar: 'av-teal',   initials: 'VS' },
    { id: 'DH-10237', showId: 4, name: 'Meera Joshi',    mobile: '+91 82345 67890', city: 'Mumbai',    age: 26, gender: 'Female', regDate: '14 Oct, 12:00 PM', callStatus: 'not_called', ticket: 'not_sent', checkin: 'pending',    avatar: 'av-orange', initials: 'MJ' },
    { id: 'DH-10238', showId: 4, name: 'Kabir Malhotra', mobile: '+91 93456 78901', city: 'Thane',     age: 30, gender: 'Male',   regDate: '14 Oct, 04:10 PM', callStatus: 'confirmed',  ticket: 'sent',     checkin: 'checked_in', avatar: 'av-red',    initials: 'KM' },
    { id: 'DH-10239', showId: 4, name: 'Divya Pillai',   mobile: '+91 76543 21098', city: 'Pune',      age: 28, gender: 'Female', regDate: '15 Oct, 09:30 AM', callStatus: 'not_called', ticket: 'not_sent', checkin: 'pending',    avatar: 'av-blue',   initials: 'DP' },
    { id: 'DH-10240', showId: 4, name: 'Aakash Verma',   mobile: '+91 87654 32109', city: 'Mumbai',    age: 31, gender: 'Male',   regDate: '15 Oct, 02:00 PM', callStatus: 'confirmed',  ticket: 'sent',     checkin: 'pending',    avatar: 'av-green',  initials: 'AV' },
  ],

  audience: [
    {
      id: 'U-001', name: 'Ananya Sharma', mobile: '+91 98200 55567', email: 'ananya@gmail.com',
      city: 'Mumbai', dob: '14 Mar 2001', age: 24, gender: 'Female',
      avatar: 'av-purple', initials: 'AS', memberSince: 'Mar 2023',
      reputation: 850, totalShows: 12, attended: 11, noShows: 1, status: 'active',
      activeShow: { name: 'Retro Vinyl Night', date: '26 Oct 2025', venue: 'Blue Frog, Mumbai', regId: 'DH-10289', ticketStatus: 'sent' },
      callLog: [
        { date: '16 Oct, 10:30 AM', agent: 'Priya Kapoor', outcome: 'confirmed', remark: 'Confirmed attendance for the Vinyl Night. Requested front-row area if possible.' },
        { date: '15 Oct, 04:00 PM', agent: 'System', outcome: 'sms', remark: 'Auto-confirmation message sent to +91 98200 55567. Delivery confirmed 12 s later.' },
        { date: '14 Oct, 09:00 AM', agent: 'System', outcome: 'reminder', remark: 'Reminder SMS sent: "Only 2 hours left for Arijit Singh Night – Mumbai! Please keep your QR code ready for entry at Gate 4. Parking available."' },
      ],
      history: [
        { show: 'Laugh Riot Vol 3',    date: '10 Oct 2025', status: 'attended' },
        { show: 'Jazz Nights Mumbai',  date: '05 Oct 2025', status: 'no_show'  },
        { show: 'Bollywood Retro 2024',date: '12 Aug 2025', status: 'attended' },
        { show: 'Sufi Night — Delhi',  date: '20 Jul 2025', status: 'attended' },
      ]
    },
  ],

  callQueue: [
    { id: 'DH-10237', name: 'Meera Joshi',    mobile: '+91 82345 67890', city: 'Mumbai', age: 26, gender: 'Female', showName: 'Neon Echoes Live Mumbai', noShows: 0, priority: 'normal', avatar: 'av-orange', initials: 'MJ' },
    { id: 'DH-10239', name: 'Divya Pillai',   mobile: '+91 76543 21098', city: 'Pune',   age: 28, gender: 'Female', showName: 'Neon Echoes Live Mumbai', noShows: 1, priority: 'normal', avatar: 'av-blue',   initials: 'DP' },
    { id: 'DH-10235', name: 'Ananya Iyer',    mobile: '+91 77654 32100', city: 'Navi Mumbai', age: 22, gender: 'Female', showName: 'Neon Echoes Live Mumbai', noShows: 2, priority: 'flagged', avatar: 'av-purple', initials: 'AI' },
    { id: 'DH-10241', name: 'Ravi Deshmukh',  mobile: '+91 99887 76655', city: 'Pune',   age: 33, gender: 'Male',   showName: 'Neon Echoes Live Mumbai', noShows: 0, priority: 'normal', avatar: 'av-teal',   initials: 'RD' },
    { id: 'DH-10242', name: 'Shruti Menon',   mobile: '+91 90123 45678', city: 'Mumbai', age: 25, gender: 'Female', showName: 'Neon Echoes Live Mumbai', noShows: 3, priority: 'flagged', avatar: 'av-red',    initials: 'SM' },
  ],

  agents: [
    { id: 'AG-01', name: 'Anita Rao',     role: 'Calling Agent', email: 'anita@dhaasoo.com',  status: 'active', calls: 1240, confirmed: 452, conversion: 36.4, initials: 'AR', avatar: 'av-blue'   },
    { id: 'AG-02', name: 'Vikram Mehta',  role: 'Calling Agent', email: 'vikram@dhaasoo.com', status: 'active', calls: 980,  confirmed: 210, conversion: 21.4, initials: 'VM', avatar: 'av-indigo' },
    { id: 'AG-03', name: 'Sunita Luthra', role: 'Calling Agent', email: 'sunita@dhaasoo.com', status: 'break',  calls: 1102, confirmed: 320, conversion: 29.0, initials: 'SL', avatar: 'av-purple' },
  ],

  adminUsers: [
    { id: 'ADM-01', name: 'Rajesh Sharma',  role: 'Super Admin',    email: 'rajesh@dhaasoo.com',  access: 'All Modules',        status: 'active',    initials: 'RS', avatar: 'av-indigo' },
    { id: 'ADM-02', name: 'Priya Menon',    role: 'Event Manager',  email: 'priya.m@dhaasoo.com', access: 'Shows + Reports',    status: 'active',    initials: 'PM', avatar: 'av-blue'   },
    { id: 'ADM-03', name: 'Anil Sharma',    role: 'Calling Agent',  email: 'anil@dhaasoo.com',    access: 'Calling Only',       status: 'active',    initials: 'AS', avatar: 'av-green'  },
    { id: 'ADM-04', name: 'Disha Malik',    role: 'Calling Agent',  email: 'disha@dhaasoo.com',   access: 'Calling Only',       status: 'suspended', initials: 'DM', avatar: 'av-orange' },
    { id: 'ADM-05', name: 'Zara Malik',     role: 'Gate Staff',     email: 'zara@dhaasoo.com',    access: 'General Support',    status: 'active',    initials: 'ZM', avatar: 'av-teal'   },
  ],

  notifications: [
    { id: 1, type: 'warning', title: 'Capacity Alert',        body: 'Bollywood Retro Beats is 88% full (1,320 / 1,500 seats).', time: '5m ago' },
    { id: 2, type: 'error',   title: 'SMS Delivery Failure',  body: '34 SMS failed for Neon Echoes Live. Check provider config.', time: '22m ago' },
    { id: 3, type: 'info',    title: 'New Registrations',     body: '120 new registrations in the last hour (unusual spike).', time: '1h ago' },
    { id: 4, type: 'success', title: 'Show Completed',        body: 'Laugh Riot Vol 3 marked Completed. Post-show report ready.', time: '3h ago' },
    { id: 5, type: 'warning', title: 'Low Confirmations',     body: 'MH Weekender Finals: only 42% confirmed with 48h to go.', time: '5h ago' },
  ],

  recentActivity: [
    { icon: '📋', text: 'Ananya Sharma registered for Retro Vinyl Night',     time: '2m ago',  color: 'bg-blue-100 text-blue-600'  },
    { icon: '✅', text: 'Priya Kapoor confirmed Rohan Kapoor via call',        time: '8m ago',  color: 'bg-green-100 text-green-600' },
    { icon: '❌', text: 'Registration DH-10198 cancelled by Arjun Mehta',     time: '15m ago', color: 'bg-red-100 text-red-600'    },
    { icon: '📨', text: 'Bulk SMS sent to 842 users — Neon Echoes',           time: '31m ago', color: 'bg-purple-100 text-purple-600' },
    { icon: '🎟️', text: 'Tickets issued for 234 Bollywood Retro registrations', time: '45m ago', color: 'bg-indigo-100 text-indigo-600' },
    { icon: '🔒', text: 'User +91 99001 22334 blacklisted by Rajesh Sharma',  time: '1h ago',  color: 'bg-red-100 text-red-600'    },
    { icon: '➕', text: 'New show "Comedy Dhamaal" created',                   time: '2h ago',  color: 'bg-green-100 text-green-600' },
    { icon: '📊', text: 'Post-show report generated: Laugh Riot Vol 3',       time: '3h ago',  color: 'bg-gray-100 text-gray-600'  },
    { icon: '📱', text: 'WhatsApp reminder sent to 1,102 users',              time: '4h ago',  color: 'bg-yellow-100 text-yellow-600' },
    { icon: '👤', text: 'Disha Malik (Calling Agent) account suspended',      time: '5h ago',  color: 'bg-orange-100 text-orange-600' },
  ],

  trendData: {
    labels: ['17 Sep','21 Sep','25 Sep','29 Sep','03 Oct','07 Oct','11 Oct','15 Oct','17 Oct'],
    registrations: [120, 185, 140, 260, 310, 280, 420, 510, 490],
  },

  analyticsData: {
    // Daily registrations – last 14 days
    dailyRegs: {
      labels: ['4 Oct','5 Oct','6 Oct','7 Oct','8 Oct','9 Oct','10 Oct','11 Oct','12 Oct','13 Oct','14 Oct','15 Oct','16 Oct','17 Oct'],
      values:  [42, 58, 35, 90, 124, 88, 76, 142, 198, 164, 210, 185, 230, 216],
    },
    // New app users – last 14 days
    newUsers: {
      labels: ['4 Oct','5 Oct','6 Oct','7 Oct','8 Oct','9 Oct','10 Oct','11 Oct','12 Oct','13 Oct','14 Oct','15 Oct','16 Oct','17 Oct'],
      values:  [18, 24, 14, 38, 52, 40, 30, 60, 84, 72, 96, 80, 110, 98],
    },
    // Mumbai area breakdown
    areas: [
      { name: 'Andheri',      pct: 22, count: 1852 },
      { name: 'Bandra',       pct: 18, count: 1516 },
      { name: 'Thane',        pct: 16, count: 1348 },
      { name: 'Borivali',     pct: 14, count: 1179 },
      { name: 'Navi Mumbai',  pct: 12, count: 1011 },
      { name: 'Dadar',        pct: 10, count:  842 },
      { name: 'Others',       pct:  8, count:  674 },
    ],
    // Show-wise performance
    showStats: [
      { name: 'Bollywood Retro Beats',  type: 'Concert', date: '24 Oct', regs: 1320, confirmed: 1108, checkedIn: 0,   noShows: 0,  fillPct: 88 },
      { name: 'Sufi Night with Nizami', type: 'Concert', date: '26 Oct', regs: 800,  confirmed: 712,  checkedIn: 0,   noShows: 0,  fillPct: 100 },
      { name: 'Great Indian Comedy',    type: 'Comedy',  date: '03 Nov', regs: 240,  confirmed: 186,  checkedIn: 0,   noShows: 0,  fillPct: 40 },
      { name: 'Neon Echoes Live',       type: 'Concert', date: '24 Oct', regs: 842,  confirmed: 604,  checkedIn: 412, noShows: 38, fillPct: 84 },
      { name: 'MH Weekender Finals',    type: 'Reality', date: '15 Nov', regs: 1800, confirmed: 1260, checkedIn: 0,   noShows: 0,  fillPct: 90 },
    ],
    kpis: { appUsers: 8420, regsThisMonth: 2140, confirmRate: 85, attendanceRate: 78, noShowRate: 12 },
    cities: [
      { name: 'Mumbai',    pct: 87 },
      { name: 'Delhi',     pct: 100 },
      { name: 'Bangalore', pct: 53 },
      { name: 'Pune',      pct: 90 },
    ],
  },

  users: [
    { id: 'U-001', name: 'Vikram Singh',   mobile: '+91 98001 11222', email: 'vikram.s@gmail.com',   dob: '12 Mar 1989', city: 'Mumbai',    regDate: '05 Jan 2024', location: 'Mumbai, MH', attended: 14, noShows: 0, reputation: 'Excellent', status: 'active',    initials: 'VS', avatar: 'av-blue',   lastAttended: '3d ago' },
    { id: 'U-002', name: 'Priya Kapoor',   mobile: '+91 70451 23456', email: 'priya.k@yahoo.com',    dob: '22 Aug 1995', city: 'Delhi',     regDate: '18 Feb 2024', location: 'Delhi NCR',  attended: 8,  noShows: 3, reputation: 'Flagged',   status: 'flagged',   initials: 'PK', avatar: 'av-pink',   lastAttended: '2w ago' },
    { id: 'U-003', name: 'Rahul Agarwal',  mobile: '+91 91870 98765', email: 'rahul.a@gmail.com',    dob: '04 Nov 2000', city: 'Bangalore', regDate: '02 Mar 2024', location: 'Bangalore',  attended: 1,  noShows: 0, reputation: 'New',       status: 'active',    initials: 'RA', avatar: 'av-green',  lastAttended: '1w ago' },
    { id: 'U-004', name: 'Sneha Reddy',    mobile: '+91 88795 65432', email: 'sneha.r@outlook.com',  dob: '30 Jul 1992', city: 'Hyderabad', regDate: '14 Dec 2023', location: 'Hyderabad',  attended: 22, noShows: 1, reputation: 'Excellent', status: 'active',    initials: 'SR', avatar: 'av-purple', lastAttended: '1d ago' },
    { id: 'U-005', name: 'Mohit Kumar',    mobile: '+91 99887 76655', email: 'mohit.k@gmail.com',    dob: '17 Apr 1997', city: 'Pune',      regDate: '09 Apr 2024', location: 'Pune',       attended: 3,  noShows: 4, reputation: 'Poor',      status: 'blacklist', initials: 'MK', avatar: 'av-red',    lastAttended: '1m ago' },
    { id: 'U-006', name: 'Kavya Nair',     mobile: '+91 82345 67890', email: 'kavya.n@gmail.com',    dob: '08 Jan 1998', city: 'Chennai',   regDate: '27 Jun 2024', location: 'Chennai',    attended: 7,  noShows: 0, reputation: 'Good',      status: 'active',    initials: 'KN', avatar: 'av-teal',   lastAttended: '4d ago' },
  ],

  templates: [
    { id: 'tpl-1', name: 'Event Reminder',       channel: 'SMS', body: 'Hi {{Name}}, this is a reminder that {{ShowName}} is on {{Date}} at {{Venue}}. Reporting time: {{ReportingTime}}. See you there! – Dhaasoo' },
    { id: 'tpl-2', name: 'Digital Pass',          channel: 'WhatsApp', body: 'Hi {{Name}} 👋 Your Dhaasoo ticket for *{{ShowName}}* is ready!\n📅 {{Date}}\n📍 {{Venue}}\nShow your QR at Gate 4. See you there!' },
    { id: 'tpl-3', name: 'Gate Opening',          channel: 'SMS', body: 'Gates open now for {{ShowName}}! Present your QR code at the entry. Enjoy the show! – Dhaasoo' },
    { id: 'tpl-4', name: 'Registration Confirm', channel: 'Email', body: 'Dear {{Name}}, your registration for {{ShowName}} on {{Date}} at {{Venue}} is confirmed. Your QR ticket is attached.' },
    { id: 'tpl-5', name: 'Cancellation Notice',  channel: 'SMS', body: 'Hi {{Name}}, we regret to inform you that {{ShowName}} on {{Date}} has been cancelled. We apologise for the inconvenience. – Dhaasoo' },
  ],

};
