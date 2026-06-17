import { DEPARTMENTS } from '../data/departments';

export default function DepartmentsPage({ members, onSelectDept }) {
  const counts = {};
  members.forEach((m) => {
    counts[m.dept] = (counts[m.dept] || 0) + 1;
  });

  return (
    <div className="dept-cards">
      {Object.entries(DEPARTMENTS).map(([key, dept]) => {
        const Icon = dept.icon;
        return (
          <div
            key={key}
            className={`dept-card ${dept.borderClass}`}
            onClick={() => onSelectDept(key)}
          >
            <div className="dept-icon">
              <Icon />
            </div>
            <div className="dept-name">{dept.name}</div>
            <div className="dept-abbr">{dept.abbr}</div>
            <div className="dept-count">{counts[key] || 0}</div>
            <div className="dept-count-label">registered members</div>
          </div>
        );
      })}
    </div>
  );
}
