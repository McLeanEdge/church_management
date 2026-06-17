import { useRef } from 'react';
import { createDefaultSlides, getSlideIcon } from '../data/defaultSlides';
import { addPhotoSlidesFromFiles } from '../utils/slideUpload';
import { IconSettings, IconX, IconRefreshCcw, IconPlus } from '../icons/Icons';

export default function SlideManagerModal({ open, slides, setSlides, onClose }) {
  const fileInputRef = useRef(null);

  function handleUpload(e) {
    addPhotoSlidesFromFiles(e.target.files, setSlides);
    e.target.value = '';
  }

  function updateSlide(index, key, value) {
    setSlides((prev) => prev.map((s, i) => (i === index ? { ...s, [key]: value } : s)));
  }

  function removeSlide(index) {
    if (slides.length <= 1) {
      alert('Keep at least one slide.');
      return;
    }
    setSlides((prev) => prev.filter((_, i) => i !== index));
  }

  function resetSlides() {
    setSlides(createDefaultSlides());
  }

  if (!open) return null;

  return (
    <div className={`modal-overlay ${open ? 'open' : ''}`}>
      <div className="modal" style={{ width: 640 }}>
        <div className="modal-header">
          <div className="modal-title">
            <IconSettings /> Manage Program Slides
          </div>
          <button className="modal-close" onClick={onClose}>
            <IconX width="18" height="18" strokeWidth={2.5} />
          </button>
        </div>
        <div className="modal-body">
          <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 12 }}>
            Edit slide details or upload real church photos. Click the remove button (×) to delete a slide.
          </p>
          <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
            <button className="btn btn-primary btn-sm" onClick={() => fileInputRef.current?.click()}>
              + Upload Photos
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              style={{ display: 'none' }}
              onChange={handleUpload}
            />
            <button className="btn btn-outline btn-sm" onClick={resetSlides}>
              <IconRefreshCcw width="13" height="13" style={{ verticalAlign: '-0.1em', marginRight: 4 }} /> Reset Defaults
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 370, overflowY: 'auto' }}>
            {slides.map((s, i) => {
              const FallbackIcon = getSlideIcon(s.id) || IconPlus;
              return (
                <div
                  key={s.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: 9,
                    background: i % 2 === 0 ? 'var(--lavender)' : '#fff',
                    borderRadius: 8,
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 40,
                      borderRadius: 5,
                      overflow: 'hidden',
                      background: `linear-gradient(135deg, ${s.color1 || '#2D1B69'}, ${s.color2 || '#7B2FBE'})`,
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {s.type === 'photo' && s.src ? (
                      <img src={s.src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={s.title} />
                    ) : (
                      <span style={{ fontSize: 16, color: '#fff' }}>
                        <FallbackIcon />
                      </span>
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <input
                      value={s.title || ''}
                      onChange={(e) => updateSlide(i, 'title', e.target.value)}
                      style={{
                        width: '100%',
                        border: '1px solid var(--lavender-mid)',
                        borderRadius: 5,
                        padding: '3px 8px',
                        fontSize: 12,
                        fontFamily: 'Inter, sans-serif',
                        marginBottom: 3,
                      }}
                    />
                    <div style={{ display: 'flex', gap: 4 }}>
                      <input
                        value={s.tag || ''}
                        placeholder="Tag"
                        onChange={(e) => updateSlide(i, 'tag', e.target.value)}
                        style={{
                          width: '48%',
                          border: '1px solid var(--lavender-mid)',
                          borderRadius: 5,
                          padding: '2px 6px',
                          fontSize: 11,
                          fontFamily: 'Inter, sans-serif',
                        }}
                      />
                      <input
                        value={s.date || ''}
                        placeholder="Date"
                        onChange={(e) => updateSlide(i, 'date', e.target.value)}
                        style={{
                          width: '50%',
                          border: '1px solid var(--lavender-mid)',
                          borderRadius: 5,
                          padding: '2px 6px',
                          fontSize: 11,
                          fontFamily: 'Inter, sans-serif',
                        }}
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => removeSlide(i)}
                    style={{
                      background: 'var(--danger)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 6,
                      padding: '5px 8px',
                      cursor: 'pointer',
                      fontSize: 12,
                      flexShrink: 0,
                    }}
                  >
                    <IconX width="12" height="12" strokeWidth={2.5} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );
}
