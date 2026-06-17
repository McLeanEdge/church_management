import { useState } from 'react';
import MemberCard from './MemberCard';
import { IconSearch, IconUser } from '../icons/Icons';

const FILTER_PILLS = [
  { key: 'all', label: 'All' },
  { key: 'DOFU', label: 'DOFU' },
  { key: 'PRD', label: 'PRD' },
  { key: 'PRAISE', label: 'Praise' },
  { key: 'MEDIA', label: 'Media' },
  { key: 'USHERING', label: 'Ushering' },
  { key: 'GENERAL', label: 'General' },
];

export default function MembersPage({ members, deptFilter, setDeptFilter, onViewMember }) {
  const [search, setSearch] = useState('');

  const filtered = members.filter((m) => {
    const matchDept = deptFilter === 'all' || m.dept === deptFilter;
    const term = search.toLowerCase();
    const matchSearch =
      !term || m.name.toLowerCase().includes(term) || (m.occupation || '').toLowerCase().includes(term);
    return matchDept && matchSearch;
  });

  return (
    <div>
      <div className="filters">
        <div className="search-wrap">
          <span className="search-icon">
            <IconSearch width="14" height="14" />
          </span>
          <input
            className="search-box"
            type="text"
            placeholder="Search members…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {FILTER_PILLS.map((pill) => (
          <div
            key={pill.key}
            className={`filter-pill ${deptFilter === pill.key ? 'active' : ''}`}
            onClick={() => setDeptFilter(pill.key)}
          >
            {pill.label}
          </div>
        ))}
      </div>
      <div className="members-grid">
        {filtered.length ? (
          filtered.map((m) => <MemberCard key={m.id} member={m} onClick={() => onViewMember(m.id)} />)
        ) : (
          <div className="empty-state" style={{ gridColumn: '1/-1' }}>
            <div className="icon">
              <IconUser />
            </div>
            <p>No members found</p>
          </div>
        )}
      </div>
    </div>
  );
}
