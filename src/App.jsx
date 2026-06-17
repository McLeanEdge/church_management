import { useState } from 'react';
import { useLocalStorageState } from './hooks/useLocalStorageState';
import { createInitialMembers } from './utils/initialMembers';
import { createDefaultSlides } from './data/defaultSlides';
import { generateAttendance, todayISO } from './utils/helpers';

import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';
import Topbar from './components/Topbar';
import Dashboard from './components/Dashboard';
import MembersPage from './components/MembersPage';
import DepartmentsPage from './components/DepartmentsPage';
import SundayEntryPage from './components/SundayEntryPage';
import AttendanceLogPage from './components/AttendanceLogPage';
import DofuDataPage from './components/DofuDataPage';
import MemberModal from './components/MemberModal';
import ProfileModal from './components/ProfileModal';

const PAGE_META = {
  dashboard: ['Dashboard', "Welcome to Throne of God's Grace Ministries"],
  members: ['All Members', 'Browse and manage your church family'],
  departments: ['Sub-Ministries', 'All departments within the church'],
  sunday: ['Sunday Attendance Entry', 'Tap Present or Absent for each member'],
  attendance: ['Attendance Log', 'Historical attendance records'],
  dofu: ['DOFU Data', 'Dept. of Outreach & Follow Up – Rhema City University College'],
};

export default function App() {
  const [members, setMembers] = useLocalStorageState('togg_members', createInitialMembers);
  const [slides, setSlides] = useLocalStorageState('togg_slides', createDefaultSlides);

  const [currentPage, setCurrentPage] = useState('dashboard');
  const [deptFilter, setDeptFilter] = useState('all');

  const [memberModalOpen, setMemberModalOpen] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState(null);

  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [viewingMemberId, setViewingMemberId] = useState(null);

  const editingMember = members.find((m) => m.id === editingMemberId) || null;
  const viewingMember = members.find((m) => m.id === viewingMemberId) || null;
  const [pageTitle, pageSubtitle] = PAGE_META[currentPage] || ['', ''];

  function openAddMember(id = null) {
    setEditingMemberId(id);
    setMemberModalOpen(true);
  }

  function handleSaveMember(data) {
    if (editingMemberId) {
      setMembers((prev) => prev.map((m) => (m.id === editingMemberId ? { ...m, ...data } : m)));
    } else {
      setMembers((prev) => [
        ...prev,
        {
          id: 'M' + Date.now().toString().slice(-6),
          ...data,
          attendance: generateAttendance(),
          joined: todayISO(),
        },
      ]);
    }
    setMemberModalOpen(false);
  }

  function handleDeleteMember(id) {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    setProfileModalOpen(false);
  }

  function handleViewMember(id) {
    setViewingMemberId(id);
    setProfileModalOpen(true);
  }

  function handleEditFromProfile(id) {
    setProfileModalOpen(false);
    openAddMember(id);
  }

  function handleSelectDept(key) {
    setDeptFilter(key);
    setCurrentPage('members');
  }

  return (
    <>
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} memberCount={members.length} />

      <main className="main">
        <Topbar title={pageTitle} subtitle={pageSubtitle} onAddMember={() => openAddMember(null)} />

        <div className="content">
          {currentPage === 'dashboard' && (
            <Dashboard
              members={members}
              slides={slides}
              setSlides={setSlides}
              onNavigateToMembers={() => setCurrentPage('members')}
              onViewMember={handleViewMember}
            />
          )}
          {currentPage === 'members' && (
            <MembersPage
              members={members}
              deptFilter={deptFilter}
              setDeptFilter={setDeptFilter}
              onViewMember={handleViewMember}
            />
          )}
          {currentPage === 'departments' && (
            <DepartmentsPage members={members} onSelectDept={handleSelectDept} />
          )}
          {currentPage === 'sunday' && (
            <SundayEntryPage members={members} setMembers={setMembers} />
          )}
          {currentPage === 'attendance' && (
            <AttendanceLogPage members={members} onMarkThisSunday={() => setCurrentPage('sunday')} />
          )}
          {currentPage === 'dofu' && <DofuDataPage />}
        </div>
      </main>

      <BottomNav currentPage={currentPage} onNavigate={setCurrentPage} />

      <MemberModal
        open={memberModalOpen}
        member={editingMember}
        onSave={handleSaveMember}
        onClose={() => setMemberModalOpen(false)}
      />
      <ProfileModal
        open={profileModalOpen}
        member={viewingMember}
        onClose={() => setProfileModalOpen(false)}
        onEdit={handleEditFromProfile}
        onDelete={handleDeleteMember}
      />
    </>
  );
}
