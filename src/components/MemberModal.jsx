import { useEffect, useRef, useState } from 'react';
import { IconCamera, IconX } from '../icons/Icons';

const BLANK_FORM = {
  name: '',
  occupation: '',
  phone: '',
  dob: '',
  dept: 'GENERAL',
  role: '',
  gender: '',
  notes: '',
  residence: '',
  photo: '',
};

export default function MemberModal({ open, member, onSave, onClose }) {
  const [form, setForm] = useState(BLANK_FORM);
  const fileInputRef = useRef(null);

  // Reset the form to the member being edited (or blank, for "Add") every
  // time the modal opens.
  useEffect(() => {
    if (!open) return;
    if (member) {
      setForm({
        name: member.name || '',
        occupation: member.occupation || '',
        phone: member.phone || '',
        dob: member.dob || '',
        dept: member.dept || 'GENERAL',
        role: member.role || '',
        gender: member.gender || '',
        notes: member.notes || '',
        residence: member.residence || '',
        photo: member.photo || '',
      });
    } else {
      setForm(BLANK_FORM);
    }
  }, [open, member]);

  function setField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handlePhotoChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setField('photo', ev.target.result);
    reader.readAsDataURL(file);
  }

  function handleSave() {
    const name = form.name.trim();
    if (!name) {
      alert('Please enter a member name.');
      return;
    }
    onSave({
      ...form,
      name,
      occupation: form.occupation.trim(),
      phone: form.phone.trim(),
      role: form.role.trim(),
      notes: form.notes.trim(),
      residence: form.residence.trim(),
    });
  }

  if (!open) return null;

  return (
    <div className="modal-overlay open">
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">{member ? 'Edit Member' : 'Add New Member'}</div>
          <button className="modal-close" onClick={onClose}>
            <IconX width="18" height="18" strokeWidth={2.5} />
          </button>
        </div>
        <div className="modal-body">
          <div className="photo-upload-area" onClick={() => fileInputRef.current?.click()}>
            {form.photo ? (
              <>
                <img src={form.photo} alt="" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 6,
                    right: 8,
                    fontSize: 10,
                    background: 'rgba(0,0,0,.5)',
                    color: '#fff',
                    padding: '2px 6px',
                    borderRadius: 4,
                  }}
                >
                  Click to change
                </div>
              </>
            ) : (
              <>
                <div style={{ fontSize: 30 }}>
                  <IconCamera />
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 5 }}>Click to upload member photo</div>
                <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 3 }}>Rectangular format recommended</div>
              </>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handlePhotoChange}
          />

          <div className="form-grid">
            <div className="form-group full">
              <div className="form-label">Full Name *</div>
              <input
                className="form-input"
                placeholder="e.g. John Boadu"
                type="text"
                value={form.name}
                onChange={(e) => setField('name', e.target.value)}
              />
            </div>
            <div className="form-group">
              <div className="form-label">Programme / Occupation</div>
              <input
                className="form-input"
                placeholder="e.g. BSc Computer Science"
                value={form.occupation}
                onChange={(e) => setField('occupation', e.target.value)}
              />
            </div>
            <div className="form-group">
              <div className="form-label">Phone Number</div>
              <input
                className="form-input"
                placeholder="e.g. 0245733722"
                type="tel"
                value={form.phone}
                onChange={(e) => setField('phone', e.target.value)}
              />
            </div>
            <div className="form-group">
              <div className="form-label">Date of Birth</div>
              <input
                className="form-input"
                type="date"
                value={form.dob}
                onChange={(e) => setField('dob', e.target.value)}
              />
            </div>
            <div className="form-group">
              <div className="form-label">Place of Residence</div>
              <input
                className="form-input"
                placeholder="e.g. Kwaprow, Cape Coast"
                value={form.residence}
                onChange={(e) => setField('residence', e.target.value)}
              />
            </div>
            <div className="form-group">
              <div className="form-label">Department *</div>
              <select
                className="form-select"
                value={form.dept}
                onChange={(e) => setField('dept', e.target.value)}
              >
                <option value="GENERAL">General Member</option>
                <option value="DOFU">DOFU – Outreach & Follow Up</option>
                <option value="PRD">PRD – Prayer Department</option>
                <option value="PRAISE">Praise & Worship</option>
                <option value="MEDIA">Media Department</option>
                <option value="USHERING">Ushering Department</option>
              </select>
            </div>
            <div className="form-group">
              <div className="form-label">Role in Church</div>
              <input
                className="form-input"
                placeholder="e.g. Member, Elder, HOD…"
                value={form.role}
                onChange={(e) => setField('role', e.target.value)}
              />
            </div>
            <div className="form-group">
              <div className="form-label">Gender</div>
              <select
                className="form-select"
                value={form.gender}
                onChange={(e) => setField('gender', e.target.value)}
              >
                <option value="">Select…</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div className="form-group full">
              <div className="form-label">Notes</div>
              <textarea
                className="form-textarea"
                placeholder="Additional notes…"
                value={form.notes}
                onChange={(e) => setField('notes', e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>Save Member</button>
        </div>
      </div>
    </div>
  );
}
