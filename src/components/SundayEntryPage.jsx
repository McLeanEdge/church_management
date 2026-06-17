import { useState } from 'react';
import { getDeptInfo } from '../data/departments';
import { getInitials, todayISO, formatNiceDate } from '../utils/helpers';
import { IconCalendar, IconCheck, IconSave, IconCheckCircle, IconSearch, IconX } from '../icons/Icons';

const FILTER_PILLS = [
  { key: 'all', label: 'All' },
  { key: 'unmarked', label: 'Unmarked' },
  { key: 'present', label: 'Present' },
  { key: 'absent', label: 'Absent' },
];

export default function SundayEntryPage({ members, setMembers }) {
  const [sundayDate, setSundayDate] = useState(todayISO());
  const [session, setSession] = useState({}); // id -> 'present' | 'absent' | null
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Resolves a member's status for the selected date: an explicit toggle
  // in this session wins, otherwise fall back to any saved record.
  function effectiveStatus(member) {
    if (member.id in session) return session[member.id];
    const rec = member.attendance.find((a) => a.date === sundayDate);
    return rec ? (rec.present ? 'present' : 'absent') : null;
  }

  function toggleAttend(id, status) {
    const member = members.find((m) => m.id === id);
    const current = effectiveStatus(member);
    setSession((prev) => ({ ...prev, [id]: current === status ? null : status }));
  }

  function changeSundayDate(val) {
    if (!val) return;
    setSundayDate(val);
    setSession({});
  }

  function goToToday() {
    setSundayDate(todayISO());
    setSession({});
  }

  function markAllPresent() {
    const next = {};
    members.forEach((m) => {
      next[m.id] = 'present';
    });
    setSession(next);
  }

  function saveSundayAttendance() {
    let present = 0;
    let absent = 0;
    members.forEach((m) => {
      const status = effectiveStatus(m);
      if (status === 'present') present++;
      if (status === 'absent') absent++;
    });

    setMembers((prev) =>
      prev.map((m) => {
        const status = effectiveStatus(m);
        if (status === null) return m;
        const isPresent = status === 'present';
        const existingIdx = m.attendance.findIndex((a) => a.date === sundayDate);
        let attendance;
        if (existingIdx >= 0) {
          attendance = m.attendance.map((a, i) => (i === existingIdx ? { ...a, present: isPresent } : a));
        } else {
          attendance = [...m.attendance, { date: sundayDate, present: isPresent }].sort((a, b) =>
            a.date.localeCompare(b.date),
          );
        }
        return { ...m, attendance };
      }),
    );

    alert(`Attendance saved!\n\nPresent: ${present}\nAbsent: ${absent}\nDate: ${sundayDate}`);
    setSession({});
  }

  // ── derived view data ──────────────────────────────────────────────
  const isToday = sundayDate === todayISO();
  const dayLabel = formatNiceDate(sundayDate);

  let statPresent = 0;
  let statAbsent = 0;
  let statUnmarked = 0;
  members.forEach((m) => {
    const s = effectiveStatus(m);
    if (s === 'present') statPresent++;
    else if (s === 'absent') statAbsent++;
    else statUnmarked++;
  });
  const marked = statPresent + statAbsent;
  const total = members.length;
  const progressPct = total ? Math.round((marked / total) * 100) : 0;

  const term = search.toLowerCase();
  const filtered = [...members]
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter((m) => {
      const s = effectiveStatus(m);
      if (filterStatus === 'present' && s !== 'present') return false;
      if (filterStatus === 'absent' && s !== 'absent') return false;
      if (filterStatus === 'unmarked' && s !== null) return false;
      if (term && !m.name.toLowerCase().includes(term)) return false;
      return true;
    });

  const groups = {};
  filtered.forEach((m) => {
    const letter = m.name[0].toUpperCase();
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(m);
  });
  const letters = Object.keys(groups).sort();

  return (
    <div>
      <div className="sunday-header-card">
        <div>
          <div className="sunday-title">
            <IconCheckCircle /> Sunday Attendance Entry
          </div>
          <div className="sunday-meta">
            {dayLabel}
            {!isToday && <span className="sunday-backdate-tag">Back-dated</span>}
          </div>
          <div className="sunday-date-picker">
            <label htmlFor="sunday-date-input">
              <IconCalendar /> Service date
            </label>
            <input
              type="date"
              id="sunday-date-input"
              value={sundayDate}
              onChange={(e) => changeSundayDate(e.target.value)}
            />
            <button className="btn btn-sm btn-outline sunday-today-btn" onClick={goToToday}>
              Today
            </button>
          </div>
        </div>
        <div className="sunday-summary">
          <div className="sunday-stat">
            <div className="sv" style={{ color: 'var(--gold-light)' }}>{statPresent}</div>
            <div className="sl">Present</div>
          </div>
          <div className="sunday-stat">
            <div className="sv" style={{ color: 'rgba(255,255,255,.5)' }}>{statAbsent}</div>
            <div className="sl">Absent</div>
          </div>
          <div className="sunday-stat">
            <div className="sv" style={{ color: '#f0a500' }}>{statUnmarked}</div>
            <div className="sl">Unmarked</div>
          </div>
        </div>
      </div>

      <div className="filters" style={{ marginBottom: 14 }}>
        <div className="search-wrap search-wrap-wide">
          <span className="search-icon">
            <IconSearch width="14" height="14" />
          </span>
          <input
            className="search-box"
            type="text"
            placeholder="Filter names…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {FILTER_PILLS.map((pill) => (
          <div
            key={pill.key}
            className={`filter-pill ${filterStatus === pill.key ? 'active' : ''}`}
            onClick={() => setFilterStatus(pill.key)}
          >
            {pill.label}
          </div>
        ))}
      </div>

      <div>
        {letters.length ? (
          letters.map((letter) => (
            <div className="alpha-section" key={letter}>
              <div className="alpha-letter-head">{letter}</div>
              <div className="entry-list">
                {groups[letter].map((m) => (
                  <EntryRow
                    key={m.id}
                    member={m}
                    status={effectiveStatus(m)}
                    onToggle={(status) => toggleAttend(m.id, status)}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <div className="icon">
              <IconSearch />
            </div>
            <p>No members match</p>
          </div>
        )}
      </div>

      <div className="sunday-save-bar">
        <div>
          <div className="progress-label">{marked} of {total} marked</div>
          <div className="progress-bar-wrap" style={{ marginTop: 4 }}>
            <div className="progress-bar-fill" style={{ width: `${progressPct}%` }} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-outline btn-sm" onClick={markAllPresent}>
            <IconCheck width="13" height="13" strokeWidth={2.5} style={{ verticalAlign: '-0.1em', marginRight: 4 }} />
            All Present
          </button>
          <button className="btn btn-primary" onClick={saveSundayAttendance}>
            <IconSave /> Save
          </button>
        </div>
      </div>
    </div>
  );
}

function EntryRow({ member, status, onToggle }) {
  const dept = getDeptInfo(member.dept);
  const initials = getInitials(member.name);
  const initialsStyle =
    status === 'present'
      ? { background: '#E8F5EE', color: 'var(--success)' }
      : status === 'absent'
      ? { background: '#FDEDED', color: 'var(--danger)' }
      : undefined;

  return (
    <div className="entry-row">
      <div className="entry-initials" style={initialsStyle}>{initials}</div>
      <div className="entry-info">
        <div className="entry-name">{member.name}</div>
        <div className="entry-dept">{dept.abbr} · {member.role || 'Member'}</div>
      </div>
      <div className="entry-toggle">
        <button
          className={`present-btn ${status === 'present' ? 'chosen' : ''}`}
          onClick={() => onToggle('present')}
        >
          ✓ Present
        </button>
        <button
          className={`absent-btn ${status === 'absent' ? 'chosen' : ''}`}
          onClick={() => onToggle('absent')}
        >
          <IconX width="12" height="12" strokeWidth={2.5} style={{ verticalAlign: '-0.1em', marginRight: 3 }} />
          Absent
        </button>
      </div>
    </div>
  );
}
