// Shared helpers used across the app.

export function todayISO() {
  return new Date().toISOString().split('T')[0];
}

export function getInitials(name) {
  return (name || '')
    .split(' ')
    .map((x) => x[0] || '')
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

// Builds a 13-week (current + previous 12 Sundays) attendance history with
// randomized presence, used to seed demo data exactly like the original.
export function generateAttendance() {
  const rec = [];
  const now = new Date();
  for (let w = 12; w >= 0; w--) {
    const d = new Date(now);
    d.setDate(d.getDate() - w * 7);
    rec.push({ date: d.toISOString().split('T')[0], present: Math.random() > 0.3 });
  }
  return rec;
}

export function formatNiceDate(dateStr) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function attendanceStats(member) {
  const present = member.attendance.filter((a) => a.present).length;
  const total = member.attendance.length;
  const pct = total ? Math.round((present / total) * 100) : 0;
  return { present, absent: total - present, total, pct };
}
