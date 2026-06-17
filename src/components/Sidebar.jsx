import {
  IconCross,
  IconDashboard,
  IconUsers,
  IconBuilding,
  IconCheckCircle,
  IconFileText,
  IconBarChart,
} from '../icons/Icons';

const NAV_ITEMS = [
  { section: 'Overview', items: [{ id: 'dashboard', label: 'Dashboard', Icon: IconDashboard }] },
  {
    section: 'Ministry',
    items: [
      { id: 'members', label: 'All Members', Icon: IconUsers, showBadge: true },
      { id: 'departments', label: 'Departments', Icon: IconBuilding },
    ],
  },
  {
    section: 'Attendance',
    items: [
      { id: 'sunday', label: 'Sunday Entry', Icon: IconCheckCircle },
      { id: 'attendance', label: 'Attendance Log', Icon: IconFileText },
    ],
  },
  { section: 'Data', items: [{ id: 'dofu', label: 'Data', Icon: IconBarChart }] },
];

export default function Sidebar({ currentPage, onNavigate, memberCount }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="church-cross">
          <IconCross width="28" height="28" />
        </div>
        <div className="church-name">
          Throne of God's
          <br />
          Grace Ministries
        </div>
        <div className="church-sub">ToGG · Rhema City</div>
      </div>
      <nav className="sidebar-nav">
        {NAV_ITEMS.map((group) => (
          <div key={group.section}>
            <div className="nav-section">{group.section}</div>
            {group.items.map(({ id, label, Icon, showBadge }) => (
              <div
                key={id}
                className={`nav-item ${currentPage === id ? 'active' : ''}`}
                onClick={() => onNavigate(id)}
              >
                <span className="ni">
                  <Icon />
                </span>
                <span>{label}</span>
                {showBadge && <span className="badge">{memberCount}</span>}
              </div>
            ))}
          </div>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="yr">© 2025 ToGG Ministries</div>
      </div>
    </aside>
  );
}
