import { IconDashboard, IconUsers, IconCheckCircle, IconBuilding, IconBarChart } from '../icons/Icons';

const BN_ITEMS = [
  { id: 'dashboard', label: 'Home', Icon: IconDashboard },
  { id: 'members', label: 'Members', Icon: IconUsers },
  { id: 'sunday', label: 'Attendance', Icon: IconCheckCircle },
  { id: 'departments', label: 'Depts', Icon: IconBuilding },
  { id: 'dofu', label: 'Data', Icon: IconBarChart },
];

// The Attendance Log page has no dedicated bottom-nav slot, so it lights
// up the "Attendance" (sunday) item instead, matching the original.
const ACTIVE_OVERRIDES = { attendance: 'sunday' };

export default function BottomNav({ currentPage, onNavigate }) {
  const activeId = ACTIVE_OVERRIDES[currentPage] || currentPage;

  return (
    <nav className="bottom-nav">
      {BN_ITEMS.map(({ id, label, Icon }) => (
        <div
          key={id}
          className={`bn-item ${activeId === id ? 'active' : ''}`}
          onClick={() => onNavigate(id)}
        >
          <span className="bn-icon">
            <Icon />
          </span>
          <span className="bn-label">{label}</span>
        </div>
      ))}
    </nav>
  );
}
