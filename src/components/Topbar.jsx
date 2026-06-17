export default function Topbar({ title, subtitle, onAddMember }) {
  return (
    <div className="topbar">
      <div>
        <div className="topbar-title">{title}</div>
        <div className="topbar-sub">{subtitle}</div>
      </div>
      <div className="topbar-actions">
        <button className="btn btn-gold" onClick={onAddMember}>
          + Add Member
        </button>
      </div>
    </div>
  );
}
