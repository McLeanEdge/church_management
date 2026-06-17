import { DOFU_RAW } from '../data/dofuRaw';
import { generateAttendance, todayISO } from './helpers';

// Builds the starting member directory from the raw DOFU records the very
// first time the app runs (before anything is saved to localStorage).
export function createInitialMembers() {
  return DOFU_RAW.map((d, i) => ({
    id: 'M' + (i + 1).toString().padStart(3, '0'),
    name: d.name,
    occupation: d.occupation,
    residence: d.residence,
    phone: d.phone,
    dept: d.name.includes('Pastor') ? 'GENERAL' : 'DOFU',
    role: d.name.includes('Pastor') ? 'Head Pastor' : 'Member',
    dob: '',
    gender: '',
    notes: '',
    photo: '',
    attendance: generateAttendance(),
    joined: todayISO(),
  }));
}
