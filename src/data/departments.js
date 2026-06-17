import {
  IconMegaphone,
  IconSwords,
  IconMusic,
  IconVideo,
  IconDoorOpen,
  IconPlus,
} from '../icons/Icons';

// Department directory: key -> display info used across member cards,
// the Departments page, and the add/edit member form.
export const DEPARTMENTS = {
  DOFU: {
    name: 'Dept. of Outreach & Follow Up',
    abbr: 'DOFU',
    icon: IconMegaphone,
    borderClass: 'gold-border',
  },
  PRD: {
    name: 'Prayer Department',
    abbr: 'PRD',
    icon: IconSwords,
    borderClass: 'green-border',
  },
  PRAISE: {
    name: 'Praise & Worship',
    abbr: 'Praise',
    icon: IconMusic,
    borderClass: 'purple-border',
  },
  MEDIA: {
    name: 'Media Department',
    abbr: 'Media',
    icon: IconVideo,
    borderClass: 'red-border',
  },
  USHERING: {
    name: 'Ushering Department',
    abbr: 'Ush',
    icon: IconDoorOpen,
    borderClass: '',
  },
  GENERAL: {
    name: 'General Member',
    abbr: 'Gen',
    icon: IconPlus,
    borderClass: '',
  },
};

export function getDeptInfo(deptKey) {
  return DEPARTMENTS[deptKey] || DEPARTMENTS.GENERAL;
}
