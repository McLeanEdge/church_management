import { IconSwords, IconPlus, IconFlame, IconMegaphone, IconStar } from '../icons/Icons';

// Default program slides shown on the dashboard gallery before any real
// church photos have been uploaded. Each one pairs a gradient backdrop
// with an icon (instead of a raw SVG string) so it renders as real JSX.
export const DEFAULT_SLIDES = [
  { id: 's1', title: 'Sunday Worship Service', tag: 'Worship', date: 'Every Sunday · 9:00 AM', color1: '#2D1B69', color2: '#7B2FBE', desc: 'Praise & Worship · Word · Fellowship' },
  { id: 's2', title: 'Annual Convention 2024', tag: 'Convention', date: 'December 2024', color1: '#1A4F2A', color2: '#C9A84C', desc: 'Theme: Possessing Your Inheritance' },
  { id: 's3', title: 'Prayer & Fasting Week', tag: 'Prayer', date: 'October 2024', color1: '#1A0F40', color2: '#C0392B', desc: '21 Days of Prayer · PRD Department' },
  { id: 's4', title: 'Youth Sunday Service', tag: 'Youth', date: 'September 2024', color1: '#0D3349', color2: '#E8C96A', desc: 'Rhema City Campus Fellowship' },
  { id: 's5', title: 'DOFU Outreach Program', tag: 'Outreach', date: 'August 2024', color1: '#2E4A1A', color2: '#3D9970', desc: 'Community Evangelism · Rhema City University' },
  { id: 's6', title: 'Christmas Cantata', tag: 'Celebration', date: 'December 2024', color1: '#4A1A1A', color2: '#C9A84C', desc: 'Praise & Worship Night · Choir Performance' },
];

// Icon shown on each default placeholder slide, keyed by slide id.
// IconPlus also doubles as the generic fallback for any slide missing
// a more specific icon (mirrors the original's fallback markup).
export const SLIDE_ICONS = {
  s1: IconSwords,
  s2: IconPlus,
  s3: IconSwords,
  s4: IconFlame,
  s5: IconMegaphone,
  s6: IconStar,
};

export function getSlideIcon(id) {
  return SLIDE_ICONS[id] || IconPlus;
}

export function createDefaultSlides() {
  return DEFAULT_SLIDES.map((s) => ({ ...s, type: 'placeholder' }));
}
