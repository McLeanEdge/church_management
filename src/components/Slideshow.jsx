import { useCallback, useEffect, useRef, useState } from 'react';
import { DEFAULT_SLIDES } from '../data/defaultSlides';
import { IconCalendar } from '../icons/Icons';

const AUTOPLAY_MS = 5000;

export default function Slideshow({ slides }) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, AUTOPLAY_MS);
  }, [slides.length]);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [startTimer]);

  // Keep the active index in range if slides are removed.
  useEffect(() => {
    if (current >= slides.length) setCurrent(Math.max(0, slides.length - 1));
  }, [slides.length, current]);

  function goSlide(i, e) {
    e?.stopPropagation();
    setCurrent(i);
    startTimer();
  }
  function nextSlide(e) {
    e?.stopPropagation();
    setCurrent((c) => (c + 1) % slides.length);
    startTimer();
  }
  function prevSlide(e) {
    e?.stopPropagation();
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
    startTimer();
  }

  if (!slides.length) return <div className="slideshow-wrapper" />;

  return (
    <div className="slideshow-wrapper">
      {slides.map((slide, i) => (
        <Slide
          key={slide.id}
          slide={slide}
          index={i}
          active={i === current}
          slideCount={slides.length}
          activeIndex={current}
          onGoSlide={goSlide}
          onNext={nextSlide}
          onPrev={prevSlide}
        />
      ))}
    </div>
  );
}

function Slide({ slide, index, active, slideCount, activeIndex, onGoSlide, onNext, onPrev }) {
  const isPhoto = slide.type === 'photo' && slide.src;
  // Placeholder slides fall back to the matching default slide (cycled by
  // index) for any missing fields, mirroring the original behaviour.
  const fallback = DEFAULT_SLIDES[index % DEFAULT_SLIDES.length];
  const s = isPhoto ? slide : { ...fallback, ...slide };

  return (
    <div className={`slide ${active ? 'active' : ''}`}>
      {isPhoto ? (
        <div className="slide-bg" style={{ backgroundImage: `url('${slide.src}')` }} />
      ) : (
        <>
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${s.color1} 0%, ${s.color2} 100%)` }} />
          <div className="slide-placeholder">
            <PlaceholderPattern index={index} />
          </div>
        </>
      )}
      <div className="slide-overlay" />
      <div className="slide-content">
        <div>
          <div className="slide-tag">{isPhoto ? slide.tag || 'Program' : s.tag}</div>
          <div className="slide-title">{isPhoto ? slide.title || 'Church Program' : s.title}</div>
          {isPhoto ? (
            <div className="slide-date">{slide.date || ''}</div>
          ) : (
            <div className="slide-date">
              <IconCalendar /> {s.date}
            </div>
          )}
          {!isPhoto && (
            <div style={{ fontSize: 11, color: 'rgba(232,226,247,.65)', marginTop: 3 }}>{s.desc || ''}</div>
          )}
        </div>
        <div className="slide-controls">
          <div className="slide-nav-btns">
            <button className="slide-nav-btn" onClick={onPrev}>‹</button>
            <button className="slide-nav-btn" onClick={onNext}>›</button>
          </div>
          <div className="slide-dots">
            {Array.from({ length: slideCount }).map((_, j) => (
              <div
                key={j}
                className={`slide-dot ${j === activeIndex ? 'active' : ''}`}
                onClick={(e) => onGoSlide(j, e)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// The subtle dotted/glow texture behind placeholder slides, plus a simple
// cross motif, ported from the original inline decorative SVG.
function PlaceholderPattern({ index }) {
  const glowId = `glow${index}`;
  const dotsId = `dots${index}`;
  return (
    <svg width="100%" height="100%" viewBox="0 0 800 320" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0 }}>
      <defs>
        <radialGradient id={glowId} cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
        <pattern id={dotsId} patternUnits="userSpaceOnUse" width="30" height="30">
          <circle cx="15" cy="15" r="1" fill="rgba(255,255,255,0.08)" />
        </pattern>
      </defs>
      <rect width="800" height="320" fill={`url(#${dotsId})`} />
      <rect width="800" height="320" fill={`url(#${glowId})`} />
      <line x1="400" y1="55" x2="400" y2="200" stroke="rgba(201,168,76,0.25)" strokeWidth="3" />
      <line x1="340" y1="110" x2="460" y2="110" stroke="rgba(201,168,76,0.25)" strokeWidth="3" />
      <path d="M30,30 L75,30 M30,30 L30,75" stroke="rgba(201,168,76,0.35)" strokeWidth="2" fill="none" />
      <path d="M770,30 L725,30 M770,30 L770,75" stroke="rgba(201,168,76,0.35)" strokeWidth="2" fill="none" />
      <line x1="400" y1="97" x2="400" y2="193" stroke="rgba(255,255,255,0.18)" strokeWidth="12" strokeLinecap="round" />
      <line x1="356" y1="131" x2="444" y2="131" stroke="rgba(255,255,255,0.18)" strokeWidth="12" strokeLinecap="round" />
    </svg>
  );
}
