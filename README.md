# ToGG Ministries — Church Management App

A React + Vite port of the original single-file HTML/CSS/JS church management
tool for Throne of God's Grace Ministries. The visual design is unchanged —
this is a structural rewrite into real components, hooks, and state, not a
redesign.

## Running it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

To build a production bundle:

```bash
npm run build
npm run preview   # serve the built files locally to double-check
```

## Project structure

```
src/
  main.jsx                  React entry point
  App.jsx                   Top-level state (members, slides, current page, modals)
  index.css                 All styles, ported 1:1 from the original <style> block
  icons/Icons.jsx            Every inline SVG from the original as a small component
  data/
    departments.js          Department directory (name, abbreviation, icon, color)
    dofuRaw.js               Raw DOFU outreach records (seed data)
    defaultSlides.js         Default dashboard gallery slides
  hooks/
    useLocalStorageState.js  useState that persists itself to localStorage
  utils/
    helpers.js               Small pure helpers (dates, initials, attendance %)
    initialMembers.js        Builds the starting member directory from DOFU data
    slideUpload.js            Shared photo-upload-to-slide logic
  components/
    Sidebar.jsx, BottomNav.jsx, Topbar.jsx       Navigation chrome
    Dashboard.jsx, Slideshow.jsx, SlideManagerModal.jsx
    MembersPage.jsx, MemberCard.jsx
    DepartmentsPage.jsx
    SundayEntryPage.jsx
    AttendanceLogPage.jsx
    DofuDataPage.jsx
    MemberModal.jsx          Add/Edit member form
    ProfileModal.jsx         Member profile + attendance history
```

## Data & persistence

Member records and dashboard slides are kept in React state and mirrored to
`localStorage` (`togg_members` and `togg_slides`) automatically by
`useLocalStorageState`, exactly like the original. On first run (empty
storage) the member list is seeded from the DOFU outreach records, each with
13 weeks of randomized demo attendance — the same behavior as the original
build.

## Notes on the conversion

- All page navigation, filtering, and the Sunday attendance toggle/save flow
  were ported to explicit React state instead of direct DOM manipulation.
- Every inline SVG icon string was converted into a small, reusable React
  component in `icons/Icons.jsx` rather than using `dangerouslySetInnerHTML`.
- File-input triggers use refs instead of `document.getElementById`.
- One intentional behavior change: the original's "attendance saved" dialog
  tried to embed an SVG icon inside a plain `alert()`, which a browser alert
  can't render (it would have shown literal `<svg>...` text). That dialog now
  shows clean plain text instead.
