import { useState } from 'react';
import { getDeptInfo } from '../data/departments';
import { formatNiceDate } from '../utils/helpers';
import { IconCalendar, IconCheckCircle, IconXCircle } from '../icons/Icons';

export default function AttendanceLogPage({ members, onMarkThisSunday }) {
  const [logDate, setLogDate] = useState('');

  return (
    <div>
      <div className="section-header">
        <div>
          <div className="section-title">Attendance Log</div>
          <div className="section-sub">Historical attendance records</div>
        </div>
        <button className="btn btn-primary btn-sm" onClick={onMarkThisSunday}>
          + Mark This Sunday
        </button>
      </div>

      <div className="filters" style={{ marginBottom: 14 }}>
        <label style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600 }}>
          <IconCalendar /> Check date:
        </label>
        <input
          type="date"
          className="search-box"
          style={{ width: 'auto' }}
          value={logDate}
          onChange={(e) => setLogDate(e.target.value)}
        />
        <div
          className={`filter-pill ${!logDate ? 'active' : ''}`}
          onClick={() => setLogDate('')}
        >
          All Dates
        </div>
        {logDate && <LogDateSummary members={members} logDate={logDate} />}
      </div>

      <div className="table-wrap">
        <table>
          {logDate ? (
            <SingleDateTable members={members} logDate={logDate} />
          ) : (
            <AllTimeTable members={members} />
          )}
        </table>
      </div>
    </div>
  );
}

function LogDateSummary({ members, logDate }) {
  let present = 0;
  let absent = 0;
  let noRecord = 0;
  members.forEach((m) => {
    const rec = m.attendance.find((a) => a.date === logDate);
    if (rec) {
      rec.present ? present++ : absent++;
    } else {
      noRecord++;
    }
  });
  const niceDate = formatNiceDate(logDate);
  return (
    <span style={{ fontSize: 12, color: 'var(--muted)' }}>
      {niceDate} — <IconCheckCircle /> {present} present · <IconXCircle width="13" height="13" style={{ verticalAlign: '-0.1em' }} /> {absent} absent
      {noRecord ? ` · ${noRecord} no record` : ''}
    </span>
  );
}

function SingleDateTable({ members, logDate }) {
  return (
    <>
      <thead>
        <tr>
          <th>Member</th>
          <th>Department</th>
          <th>Status</th>
          <th>Overall %</th>
        </tr>
      </thead>
      <tbody>
        {members.map((m) => {
          const rec = m.attendance.find((a) => a.date === logDate);
          const dept = getDeptInfo(m.dept);
          const pTotal = m.attendance.filter((a) => a.present).length;
          const total = m.attendance.length;
          const pct = total ? Math.round((pTotal / total) * 100) : 0;
          return (
            <tr key={m.id}>
              <td><strong>{m.name}</strong></td>
              <td>{dept.abbr}</td>
              <td>
                {rec ? (
                  <>
                    <span className={`status-dot ${rec.present ? 'dot-present' : 'dot-absent'}`} />
                    {rec.present ? 'Present' : 'Absent'}
                  </>
                ) : (
                  <span style={{ color: 'var(--muted)' }}>— No record</span>
                )}
              </td>
              <td style={{ color: 'var(--muted)', fontSize: 11 }}>{pct}%</td>
            </tr>
          );
        })}
      </tbody>
    </>
  );
}

function AllTimeTable({ members }) {
  return (
    <>
      <thead>
        <tr>
          <th>Member</th>
          <th>Department</th>
          <th>Present</th>
          <th>Absent</th>
          <th>Attendance %</th>
          <th>Last Seen</th>
        </tr>
      </thead>
      <tbody>
        {members.map((m) => {
          const present = m.attendance.filter((a) => a.present).length;
          const total = m.attendance.length;
          const pct = total ? Math.round((present / total) * 100) : 0;
          const lastPresent = [...m.attendance].filter((a) => a.present).pop();
          const dept = getDeptInfo(m.dept);
          const barColor = pct >= 75 ? 'var(--success)' : pct >= 50 ? 'var(--gold)' : 'var(--danger)';
          return (
            <tr key={m.id}>
              <td><strong>{m.name}</strong></td>
              <td>{dept.abbr}</td>
              <td><span className="status-dot dot-present" />{present}</td>
              <td><span className="status-dot dot-absent" />{total - present}</td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <div style={{ flex: 1, background: 'var(--lavender)', borderRadius: 4, height: 5, minWidth: 60 }}>
                    <div style={{ width: `${pct}%`, background: barColor, height: '100%', borderRadius: 4 }} />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: barColor }}>{pct}%</span>
                </div>
              </td>
              <td style={{ color: 'var(--muted)', fontSize: 11 }}>{lastPresent ? lastPresent.date : '–'}</td>
            </tr>
          );
        })}
      </tbody>
    </>
  );
}
