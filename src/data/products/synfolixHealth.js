export const synfolixHealth = {
  name: 'Synfolix HMS',
  industry: 'Healthcare',
  tagline: 'Hospital Management System',
  description:
    'Run OPD, IPD, staff, billing, and clinical documentation from one connected platform — with AI-assisted scheduling and prescribing built in, not bolted on.',

  problem: {
    heading: 'Disconnected processes slow hospitals down.',
    description:
      'Hospitals run OPD scheduling, ward/bed management, billing, staff attendance, and clinical documentation as separate, disconnected processes — often on paper or in spreadsheets.',
    points: [
      'Front-desk staff can’t see real-time doctor availability or accurate wait times, leading to overbooking and long queues.',
      'Admissions, discharges, and bed assignments are tracked manually, so bed availability is never reliable in the moment.',
      'Billing for OPD and IPD visits happens after the fact, disconnected from the clinical record, causing reconciliation errors and payment delays.',
      'Prescriptions are handwritten or typed from scratch every time, with no assistance turning a doctor’s clinical notes into a structured, safe medication list.',
      'Hospital admins have no single view of attendance, leave, shifts, audit trails, or login activity across doctors, nurses, and staff.',
    ],
  },

  solution: {
    heading: 'One system of record, not four silos.',
    description:
      'Synfolix HMS is a single system of record spanning four role-based apps (Admin, Doctor, Staff, Nurse) backed by one API and database, so every action — booking a slot, admitting a patient, writing a prescription, closing a bill — updates the same source of truth in real time (Socket.io) instead of living in a silo.',
    points: [
      'Schedule-driven OPD booking generates real appointment slots from each doctor’s actual configured schedule (no hardcoded time grids), with an AI model ranking the best slots.',
      'Full IPD lifecycle — ward/room/bed hierarchy, multi-doctor assignment, doctor-initiated discharge, staff finalization — all state-tracked, not paper-tracked.',
      'Unified billing engine ties OPD and IPD bills to the same visit/admission record, supports partial IPD payments per line item, and generates the invoice automatically.',
      'AI-assisted prescribing: a doctor’s free-text clinical notes are run through NER to extract symptoms, which then seed AI-suggested drug candidates — the doctor still reviews and finalizes everything.',
      'One admin console for users, wards/beds, attendance, shifts, leave, holidays, audit logs, and login-attempt/lockout monitoring, all scoped strictly to that hospital.',
    ],
  },

  features: [
    {
      title: 'OPD & Scheduling',
      items: [
        'Doctor-schedule-driven slot generation (manual + AI-ranked)',
        'Real-time doctor availability & emergency-status toggles',
        'Appointment queue: ready → in-consultation → completed/skipped, with re-scheduling',
        'AI no-show risk badge per patient (HIGH/MEDIUM/LOW) — degrades gracefully if the ML service is offline',
      ],
    },
    {
      title: 'IPD & Ward Management',
      items: [
        'Full floor → ward → room → bed hierarchy with occupancy tracking and capacity enforcement',
        'Multi-doctor assignment (primary + additional) on a single admission',
        'Doctor-initiated discharge → staff finalization workflow, live via Socket.io',
        'Census-model calendar views for both OPD and IPD activity',
      ],
    },
    {
      title: 'Billing',
      items: [
        'Unified OPD/IPD billing engine, idempotent bill creation',
        'Partial payments on IPD bills, tracked per line item (paid_quantity / remaining_quantity)',
        'Auto-generated tax invoices and partial-payment receipts',
        'Lab test billing integrated into the same flow',
      ],
    },
    {
      title: 'AI-Assisted Prescription Wizard',
      items: [
        'Step 1: NER extracts symptoms from clinical notes + diagnosis',
        'Step 2: AI-suggested drug candidates, editable, plus custom medicine search',
        'Step 3: A4 preview, PDF export/share/print, hospital-branded letterhead (fully customizable header/footer designer)',
      ],
    },
    {
      title: 'Lab / Investigation Workflow',
      items: ['Doctor orders labs → staff/nurse track completion → payment-gated test completion → report upload (image/PDF) per test'],
    },
    {
      title: 'Staff, Attendance & HR',
      items: [
        'Shift-aware check-in/out with late-arrival detection',
        'Leave application + admin approval workflow',
        'Holiday calendar (national/hospital/restricted types)',
        'Internal chat between staff, doctors, and nurses',
      ],
    },
    {
      title: 'Admin & Governance',
      items: [
        'Per-hospital user management with role-specific profiles',
        'Granular, DB-driven module permissions per user (admin/staff/doctor/nurse), not hardcoded',
        'Full audit log with before/after diffs, filterable by module/status/date',
        'Login-attempt monitoring with automatic lockout after repeated failures, admin-triggered unlock',
      ],
    },
  ],

  // Real screenshots aren't rendered yet — placeholder mockups stand in for
  // this suggested set until the actual UI is pulled from the running app.
  screenshots: [
    { title: 'OPD Scheduling Grid', description: 'Doctor-schedule-driven slots, manual and AI-ranked.' },
    { title: 'IPD Ward/Bed Board', description: 'Live floor → ward → room → bed occupancy.' },
    { title: 'Prescription Wizard — Step 2', description: 'AI-suggested drug candidates, editable before finalizing.' },
    { title: 'Billing / Invoice Screen', description: 'Unified OPD/IPD billing with partial-payment support.' },
    { title: 'Admin Audit Log Viewer', description: 'Filterable before/after audit trail across every module.' },
  ],

  benefits: [
    {
      title: 'Fewer scheduling conflicts, shorter queues',
      description: 'Slots reflect real doctor availability, not guesswork.',
    },
    {
      title: 'Real-time bed visibility',
      description: 'Never double-assign or lose track of an occupied bed.',
    },
    {
      title: 'Faster, more accurate billing',
      description: 'One bill per visit/admission, no manual reconciliation between clinical and billing records.',
    },
    {
      title: 'Reduced prescribing time and errors',
      description: 'AI turns unstructured notes into a structured, reviewable medication list.',
    },
    {
      title: 'Lower administrative overhead',
      description: 'Attendance, leave, shifts, and audit trails managed from one console instead of scattered spreadsheets.',
    },
    {
      title: 'Tighter security posture out of the box',
      description:
        'HttpOnly cookie auth, refresh-token rotation, CSRF protection, account lockout, and full audit logging are already built in, not left to the hospital IT team to bolt on.',
    },
  ],

  audience: [
    {
      title: 'Hospital Administrators',
      description: 'Managing users, wards, billing oversight, HR, and compliance/audit for a single hospital.',
    },
    {
      title: 'Doctors',
      description: 'Running OPD consultations, managing inpatients, and prescribing.',
    },
    {
      title: 'Front-Desk / OPD-IPD Staff',
      description: 'Handling scheduling, admissions, discharge, billing, and lab coordination.',
    },
    {
      title: 'Nurses',
      description: 'Managing ward patients and lab test completion/reporting.',
    },
  ],
  audienceNote:
    'Built for small-to-mid-size hospitals and clinics that need one connected system rather than a patchwork of point tools.',

  integrations: [
    {
      title: 'Synfolix AI/ML Service (medfinal, FastAPI)',
      description:
        'No-show prediction, appointment duration, emergency-impact modeling, and AI slot ranking; fails open — the app works normally if the ML service is down.',
    },
    {
      title: 'NLP Prescription Service',
      description: 'Symptom NER + AI drug-candidate suggestion feeding the prescription wizard.',
    },
    {
      title: 'Synfolix Super Admin Platform',
      description:
        'Hospital provisioning, module/subscription entitlement, cross-hospital user directory, and centralized audit-log rollup, via an internal service-to-service API.',
    },
    {
      title: 'Synfolix PMS (Pharmacy Management System)',
      description: 'Shares the same Super Admin control plane for cross-product user visibility and audit logging.',
    },
  ],

  security: [
    {
      title: 'HttpOnly Cookie Auth',
      description: 'Secure, SameSite cookie-based authentication — no tokens in localStorage.',
    },
    {
      title: 'Short-Lived Access Tokens',
      description: '15-minute access tokens with rotating, hashed refresh tokens and reuse detection — automatic session wipe on replay.',
    },
    {
      title: 'CSRF Protection',
      description: 'A signed double-submit token embedded in the JWT.',
    },
    {
      title: 'Account Lockout',
      description: 'Automatic lockout after repeated failed logins, with a full login-attempt audit trail and admin-controlled unlock.',
    },
    {
      title: 'Server-Side Session Tracking',
      description: 'Every request re-validates session status and lock state.',
    },
    {
      title: 'Hardened HTTP Layer',
      description: 'Helmet CSP and rate limiting on authentication endpoints.',
    },
    {
      title: 'Hospital-Level Data Scoping',
      description: 'Strict scoping on every query — no cross-hospital data leakage.',
    },
    {
      title: 'Full Audit Logging',
      description: 'Before/after values on every admin and clinical action, with sensitive fields redacted.',
    },
  ],

  cta: {
    heading: 'See Synfolix HMS in your hospital.',
  },
}
