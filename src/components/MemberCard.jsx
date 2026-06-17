import { getDeptInfo } from '../data/departments';
import { attendanceStats, getInitials } from '../utils/helpers';
import { IconBookOpen, IconMapPin, IconPhone, IconX } from '../icons/Icons';

export default function MemberCard({ member, onClick }) {
  const dept = getDeptInfo(member.dept);
  const { present, absent, pct } = attendanceStats(member);
  const initials = getInitials(member.name);
  const DeptIcon = dept.icon;

  return (
    <div className="member-card" onClick={onClick}>
      <div className="member-photo">
        {member.photo ? (
          <img src={member.photo} alt={member.name} />
        ) : (
          <div className="placeholder">{initials}</div>
        )}
        <div className="dept-badge">{dept.abbr}</div>
      </div>
      <div className="member-body">
        <div className="member-name">{member.name}</div>
        <div className="member-role">{member.role || 'Member'}</div>
        <div className="member-meta">
          {member.occupation && (
            <div className="member-meta-item">
              <span style={{ verticalAlign: '-0.1em' }}>
                <IconBookOpen width="13" height="13" />
              </span>
              {member.occupation}
            </div>
          )}
          {member.residence && (
            <div className="member-meta-item">
              <span style={{ verticalAlign: '-0.1em' }}>
                <IconMapPin width="13" height="13" />
              </span>
              {member.residence}
            </div>
          )}
          {member.phone && member.phone !== '–' && (
            <div className="member-meta-item">
              <span style={{ verticalAlign: '-0.1em' }}>
                <IconPhone width="13" height="13" />
              </span>
              {member.phone}
            </div>
          )}
        </div>
      </div>
      <div className="member-footer">
        <div className="attend-badge attend-present">✓ {present} Present</div>
        <div className="attend-badge attend-absent">
          <IconX width="10" height="10" strokeWidth={2.5} style={{ verticalAlign: '-0.1em', marginRight: 2 }} />
          {' '}{absent} Absent
        </div>
        <div className="attend-badge" style={{ background: 'var(--lavender)', color: 'var(--royal)' }}>
          {pct}%
        </div>
      </div>
    </div>
  );
}
