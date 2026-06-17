import { useRef, useState } from 'react';
import Slideshow from './Slideshow';
import SlideManagerModal from './SlideManagerModal';
import MemberCard from './MemberCard';
import { addPhotoSlidesFromFiles } from '../utils/slideUpload';
import { IconSettings, IconCamera, IconMegaphone } from '../icons/Icons';

export default function Dashboard({ members, slides, setSlides, onNavigateToMembers, onViewMember }) {
  const [slideManagerOpen, setSlideManagerOpen] = useState(false);
  const fileInputRef = useRef(null);

  let present = 0;
  let absent = 0;
  members.forEach((m) => {
    if (m.attendance.length) {
      const last = m.attendance[m.attendance.length - 1];
      last.present ? present++ : absent++;
    }
  });

  const recent = [...members].slice(-6).reverse();

  function handleUpload(e) {
    addPhotoSlidesFromFiles(e.target.files, setSlides);
    e.target.value = '';
  }

  return (
    <div>
      <div className="slideshow-section">
        <div className="section-header" style={{ marginBottom: 10 }}>
          <div>
            <div className="section-title">Church Programs Gallery</div>
            <div className="section-sub">Highlights from past services and events</div>
          </div>
          <button className="btn btn-outline btn-sm" onClick={() => setSlideManagerOpen(true)}>
            <IconSettings /> Manage
          </button>
        </div>
        <Slideshow slides={slides} />
        <div className="slideshow-upload-bar">
          <span className="upload-label">
            <IconCamera /> Upload real church program photos
          </span>
          <button className="btn-upload-photo" onClick={() => fileInputRef.current?.click()}>
            + Upload
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            style={{ display: 'none' }}
            onChange={handleUpload}
          />
        </div>
      </div>

      <hr className="gold-divider" style={{ marginTop: 0 }} />

      <div className="dofu-banner">
        <div className="dofu-banner-icon">
          <IconMegaphone />
        </div>
        <div>
          <div className="dofu-banner-text">DOFU Data Collection – Rhema City University College</div>
          <div className="dofu-banner-sub">View all collected member records in the DOFU Data tab.</div>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-label">Total Members</div>
          <div className="stat-value">{members.length}</div>
          <div className="stat-sub">Registered</div>
        </div>
        <div className="stat-card gold">
          <div className="stat-label">Departments</div>
          <div className="stat-value">6</div>
          <div className="stat-sub">Sub-ministries</div>
        </div>
        <div className="stat-card success">
          <div className="stat-label">Present</div>
          <div className="stat-value">{present}</div>
          <div className="stat-sub">Last service</div>
        </div>
        <div className="stat-card danger">
          <div className="stat-label">Absent</div>
          <div className="stat-value">{absent}</div>
          <div className="stat-sub">Last service</div>
        </div>
      </div>

      <div className="section-header" style={{ marginTop: 8 }}>
        <div>
          <div className="section-title">Recent Members</div>
          <div className="section-sub">Latest additions to the church family</div>
        </div>
        <button className="btn btn-outline btn-sm" onClick={onNavigateToMembers}>
          View All
        </button>
      </div>
      <div className="members-grid">
        {recent.map((m) => (
          <MemberCard key={m.id} member={m} onClick={() => onViewMember(m.id)} />
        ))}
      </div>

      <SlideManagerModal
        open={slideManagerOpen}
        slides={slides}
        setSlides={setSlides}
        onClose={() => setSlideManagerOpen(false)}
      />
    </div>
  );
}
