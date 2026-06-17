// Shared icon library for the app.
// Every icon used in the original vanilla build is represented here as a
// small, reusable React component so markup never has to be hand-built
// with raw SVG strings or dangerouslySetInnerHTML.

function IconBase({ children, viewBox = '0 0 24 24', strokeWidth = 2, style, ...rest }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ verticalAlign: '-0.15em', flexShrink: 0, ...style }}
      {...rest}
    >
      {children}
    </svg>
  );
}

/* Sidebar church logo */
export function IconCross(props) {
  return (
    <IconBase strokeWidth={2.5} {...props}>
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="2" y1="8" x2="22" y2="8" />
    </IconBase>
  );
}

/* Dashboard nav */
export function IconDashboard(props) {
  return (
    <IconBase {...props}>
      <path d="M3 21h18M3 10h18M5 21V10M19 21V10M12 3 2 10h20z" />
    </IconBase>
  );
}

/* All Members nav / member meta */
export function IconUsers(props) {
  return (
    <IconBase {...props}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </IconBase>
  );
}

/* Departments nav */
export function IconBuilding(props) {
  return (
    <IconBase {...props}>
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
      <path d="M10 6h4" />
      <path d="M10 10h4" />
      <path d="M10 14h4" />
      <path d="M10 18h4" />
    </IconBase>
  );
}

/* Sunday Entry nav / "saved" confirmation */
export function IconCheckCircle(props) {
  return (
    <IconBase {...props}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </IconBase>
  );
}

/* Attendance Log nav */
export function IconFileText(props) {
  return (
    <IconBase {...props}>
      <path d="M9 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="2" width="6" height="4" rx="1" ry="1" />
      <line x1="9" y1="12" x2="15" y2="12" />
      <line x1="9" y1="16" x2="15" y2="16" />
    </IconBase>
  );
}

/* DOFU Data nav */
export function IconBarChart(props) {
  return (
    <IconBase {...props}>
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </IconBase>
  );
}

/* "Manage" slideshow button / slide manager title */
export function IconSettings(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </IconBase>
  );
}

/* Photo upload areas */
export function IconCamera(props) {
  return (
    <IconBase {...props}>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </IconBase>
  );
}

/* DOFU dashboard banner / department */
export function IconMegaphone(props) {
  return (
    <IconBase {...props}>
      <path d="M22 8.01c0-1.1-.9-2-2-2s-2 .9-2 2v4a2 2 0 0 0 4 0V8.01z" />
      <path d="M18 9H6a4 4 0 0 0-4 4v1a4 4 0 0 0 4 4h1l2 4h2l-1-4h8" />
    </IconBase>
  );
}

/* Search boxes */
export function IconSearch(props) {
  return (
    <IconBase viewBox="0 0 24 24" {...props}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </IconBase>
  );
}

/* Date pickers */
export function IconCalendar(props) {
  return (
    <IconBase {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </IconBase>
  );
}

/* "All Present" button */
export function IconCheck(props) {
  return (
    <IconBase strokeWidth={2.5} {...props}>
      <polyline points="20 6 9 17 4 12" />
    </IconBase>
  );
}

/* Save button */
export function IconSave(props) {
  return (
    <IconBase {...props}>
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </IconBase>
  );
}

/* DOFU Data page banner */
export function IconTarget(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </IconBase>
  );
}

/* Close / remove */
export function IconX(props) {
  return (
    <IconBase strokeWidth={2.5} {...props}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </IconBase>
  );
}

/* Reset defaults */
export function IconRefreshCcw(props) {
  return (
    <IconBase strokeWidth={2.5} {...props}>
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 .49-3.5" />
    </IconBase>
  );
}

/* PRD department / prayer & worship slides */
export function IconSwords(props) {
  return (
    <IconBase {...props}>
      <path d="m9 11-6 6v3h9l3-3" />
      <path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4" />
      <path d="m22 12-5-5" />
      <path d="m17 7 2-2" />
    </IconBase>
  );
}

/* Praise & Worship department */
export function IconMusic(props) {
  return (
    <IconBase {...props}>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </IconBase>
  );
}

/* Media department */
export function IconVideo(props) {
  return (
    <IconBase {...props}>
      <path d="m15.6 11.6L22 7v10l-6.4-4.5v-1z" />
      <rect x="2" y="7" width="13" height="10" rx="2" ry="2" />
    </IconBase>
  );
}

/* Ushering department */
export function IconDoorOpen(props) {
  return (
    <IconBase {...props}>
      <path d="M13 4H3v16h10V4z" />
      <path d="M13 8h4v8h-4" />
      <path d="M17 12h4" />
      <path d="M8 10v4" />
    </IconBase>
  );
}

/* General member department / convention slide */
export function IconPlus(props) {
  return (
    <IconBase {...props}>
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </IconBase>
  );
}

/* Occupation / programme field */
export function IconBookOpen(props) {
  return (
    <IconBase {...props}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </IconBase>
  );
}

/* Residence field */
export function IconMapPin(props) {
  return (
    <IconBase {...props}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </IconBase>
  );
}

/* Phone field */
export function IconPhone(props) {
  return (
    <IconBase {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 15 19.79 19.79 0 0 1 1.61 6.18 2 2 0 0 1 3.59 4h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 11.9a16 16 0 0 0 6.29 6.29l1.06-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 19.73z" />
    </IconBase>
  );
}

/* Empty state - no members found */
export function IconUser(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="7" r="4" />
      <path d="M20 21a8 8 0 1 0-16 0" />
    </IconBase>
  );
}

/* Absent count in attendance log */
export function IconXCircle(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </IconBase>
  );
}

/* Youth Sunday Service slide */
export function IconFlame(props) {
  return (
    <IconBase {...props}>
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </IconBase>
  );
}

/* Christmas Cantata slide */
export function IconStar(props) {
  return (
    <IconBase {...props}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </IconBase>
  );
}
