import { getDeptInfo } from '../data/departments';
import { attendanceStats, getInitials } from '../utils/helpers';
import { IconX } from '../icons/Icons';

export default function ProfileModal({ open, member, onClose, onEdit, onDelete }) {
  if (!open || !member) return null;

  const dept = getDeptInfo(member.dept);
  const DeptIcon = dept.icon;
  const { present, total, pct } = attendanceStats(member);
  const initials = getInitials(member.name);
  const barColor = pct >= 75 ? 'var(--success)' : pct >= 50 ? 'var(--gold)' : 'var(--danger)';

  function handleDelete() {
    if (!confirm('Remove this member from the system?')) return;
    onDelete(member.id);
  }

  return (
    <div className="modal-overlay open">
      <div className="modal" style={{ width: 660 }}>
        <div className="modal-header">
          <div className="modal-title">Member Profile</div>
          <button className="modal-close" onClick={onClose}>
            <IconX width="18" height="18" strokeWidth={2.5} />
          </button>
        </div>
        <div className="modal-body">
          <div className="profile-header">
            <div className="profile-photo">
              {member.photo ? (
                <img src={member.photo} alt={member.name} />
              ) : (
                <div className="placeholder">{initials}</div>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <div className="profile-name">{member.name}</div>
              <div className="profile-dept">
                <DeptIcon /> {dept.name} · {member.role || 'Member'}
              </div>
              <div className="profile-info-grid">
                <div className="profile-info-item"><label>Occupation</label><span>{member.occupation || '–'}</span></div>
                <div className="profile-info-item"><label>Residence</label><span>{member.residence || '–'}</span></div>
                <div className="profile-info-item"><label>Phone</label><span>{member.phone || '–'}</span></div>
                <div className="profile-info-item"><label>Date of Birth</label><span>{member.dob || '–'}</span></div>
                <div className="profile-info-item"><label>Gender</label><span>{member.gender || '–'}</span></div>
                <div className="profile-info-item"><label>Joined</label><span>{member.joined || '–'}</span></div>
              </div>
            </div>
          </div>

          <div className="attendance-summary">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ color: 'var(--royal)', fontFamily: "'Playfair Display', serif" }}>Attendance History</strong>
              <span style={{ fontSize: 13, fontWeight: 700, color: barColor }}>{pct}% ({present}/{total})</span>
            </div>
            <div className="attend-bars">
              {member.attendance.map((a, i) => (
                <div
                  key={i}
                  className="attend-bar"
                  title={`${a.date}:${a.present ? ' Present' : ' Absent'}`}
                  style={{
                    background: a.present ? 'var(--success)' : '#FFCDD2',
                    border: `1px solid ${a.present ? '#2E7D52' : '#FFCDD2'}`,
                  }}
                />
              ))}
            </div>
            <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 5 }}>
              Each bar = one Sunday service (last 13 weeks). Green = Present · Red = Absent.
            </div>
          </div>

          {member.notes && (
            <div style={{ background: 'var(--lavender)', padding: 12, borderRadius: 8, fontSize: 13 }}>
              {member.notes}
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button className="btn btn-danger btn-sm" onClick={handleDelete}>Delete</button>
          <button className="btn btn-outline" onClick={onClose}>Close</button>
          <button className="btn btn-primary" onClick={() => onEdit(member.id)}>Edit Member</button>
        </div>
      </div>
    </div>
  );
}
