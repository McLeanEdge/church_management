import { useState, useEffect } from 'react';
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { db } from './firebase';
import { createDefaultSlides } from './data/defaultSlides';
import { useLocalStorageState } from './hooks/useLocalStorageState';
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
import LoginPage from './components/LoginPage';


const PAGE_META = {
  dashboard: ['Dashboard', "Welcome to Throne of God's Grace Ministries"],
  members: ['All Members', 'Browse and manage your church family'],
  departments: ['Sub-Ministries', 'All departments within the church'],
  sunday: ['Sunday Attendance Entry', 'Tap Present or Absent for each member'],
  attendance: ['Attendance Log', 'Historical attendance records'],
  dofu: ['DOFU Data', 'Dept. of Outreach & Follow Up – Rhema City University College'],
};

const auth = getAuth();

export default function App() {
  // ── Auth state ───────────────────────────────────────────────────────────
  const [authUser, setAuthUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  // ── Firebase-backed members ──────────────────────────────────────────────
  const [members, setMembers] = useState([]);
  const [membersLoading, setMembersLoading] = useState(true);

  useEffect(() => {
    if (!authUser) return; // don't fetch until logged in
    const unsub = onSnapshot(collection(db, 'members'), (snapshot) => {
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setMembers(data);
      setMembersLoading(false);
    });
    return () => unsub();
  }, [authUser]);

  // ── Slides still use localStorage (UI-only, no need to sync) ────────────
  const [slides, setSlides] = useLocalStorageState('togg_slides', createDefaultSlides);

  // ── Navigation & filter state ────────────────────────────────────────────
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [deptFilter, setDeptFilter] = useState('all');

  // ── Member modal (add / edit) ────────────────────────────────────────────
  const [memberModalOpen, setMemberModalOpen] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState(null);

  // ── Profile modal (view) ─────────────────────────────────────────────────
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [viewingMemberId, setViewingMemberId] = useState(null);

  const editingMember = members.find((m) => m.id === editingMemberId) || null;
  const viewingMember = members.find((m) => m.id === viewingMemberId) || null;
  const [pageTitle, pageSubtitle] = PAGE_META[currentPage] || ['', ''];

  // ── Handlers ─────────────────────────────────────────────────────────────
  function openAddMember(id = null) {
    setEditingMemberId(id);
    setMemberModalOpen(true);
  }

  async function handleSaveMember(data) {
    const id = editingMemberId || 'M' + Date.now().toString().slice(-6);
    const isNew = !editingMemberId;

    await setDoc(
      doc(db, 'members', id),
      {
        ...data,
        ...(isNew && {
          attendance: generateAttendance(),
          joined: todayISO(),
        }),
      },
      { merge: true }
    );

    setMemberModalOpen(false);
    setEditingMemberId(null);
  }

  async function handleDeleteMember(id) {
    await deleteDoc(doc(db, 'members', id));
    setProfileModalOpen(false);
  }

  async function handleSetMembers(updaterOrArray) {
    const updated =
      typeof updaterOrArray === 'function'
        ? updaterOrArray(members)
        : updaterOrArray;

    const writes = updated.filter((updatedMember) => {
      const original = members.find((m) => m.id === updatedMember.id);
      return (
        original &&
        JSON.stringify(original.attendance) !==
          JSON.stringify(updatedMember.attendance)
      );
    });

    await Promise.all(
      writes.map((m) =>
        setDoc(doc(db, 'members', m.id), { attendance: m.attendance }, { merge: true })
      )
    );
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

  function handleSignOut() {
    signOut(auth);
    setMembers([]);
    setMembersLoading(true);
  }

  // ── Loading states ────────────────────────────────────────────────────────
  if (authLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <p style={{ fontSize: '1.1rem', color: '#666' }}>Loading…</p>
      </div>
    );
  }

  // ── Not logged in → show login page ──────────────────────────────────────
  if (!authUser) {
    return <LoginPage />;
  }

  if (membersLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <p style={{ fontSize: '1.1rem', color: '#666' }}>Loading church data…</p>
      </div>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} memberCount={members.length} />

      <main className="main">
        <Topbar
          title={pageTitle}
          subtitle={pageSubtitle}
          onAddMember={() => openAddMember(null)}
          onSignOut={handleSignOut}
          userEmail={authUser.email}
        />

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
            <SundayEntryPage members={members} setMembers={handleSetMembers} />
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
