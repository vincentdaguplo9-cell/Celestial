# CELESTIAL Website Documentation

This README explains how the CELESTIAL team website was built and how each required section was implemented.

## 1. Project Overview

The site is a single-page portfolio-style website built with:
- HTML5 for structure (`index.html`)
- CSS3 for styling and responsive layout (`css/styles.css`)
- Vanilla JavaScript for interaction and animations (`js/script.js`)
- Bootstrap utility/grid classes (`css/bootstrap.min.css`) for layout helpers (`container`, `row`, `col-*`, `d-flex`, etc.)
- Local assets for images, icons, and fonts (`assets/`)

## 2. Folder Structure

```text
CELESTIAL/
  index.html
  css/
    bootstrap.min.css
    styles.css
  js/
    script.js
  assets/
    images/
      logo.png
      banner.png
      poster.jpg
    icons/
      planning.svg
      design.svg
      development.svg
      team.svg
      project.svg
      contact.svg
    fonts/
      Inter-*.ttf
```

## 3. Development Flow (How We Made It)

1. Planned all sections and content hierarchy in one long single-page layout.
2. Built semantic HTML sections with clear IDs for anchor navigation.
3. Added visual design system in CSS using variables (`:root`) for color, spacing, radius, shadows, and typography.
4. Integrated local fonts via `@font-face` for consistent look without internet dependency.
5. Added responsiveness with media queries (notably at `max-width: 860px`) and mobile menu behavior.
6. Added JavaScript enhancements:
   - scroll reveal animations
   - animated counters
   - project filtering
   - active nav highlight
   - hero rotating text
   - hero parallax
   - mobile menu toggle
   - back-to-top button
7. Finalized content, visuals, and section transitions.

## 4. Section-by-Section Implementation

## Navigation Bar

Requirement:
- Logo on the left
- Links: Home, Activities, About, Contact
- Top of website

Implementation in this project:
- Located in `<header class="topbar">` at the very top of `index.html`.
- Logo is implemented with:
  - `<img src="assets/images/logo.png" class="brand-logo">`
  - brand text `CELESTIAL`
- Desktop navigation uses `.nav` links.
- Mobile navigation uses `.menu-toggle` + `.mobile-menu`.
- Sticky behavior is handled in CSS:
  - `.topbar { position: sticky; top: 0; z-index: 25; }`

Note:
- Current labels are `Services`, `Process`, `Team`, `Projects`, `Contact`.
- These map conceptually to the requested sections:
  - Home -> `#home`
  - Activities -> `#projects`
  - About -> `#team`
  - Contact -> `#contact`

## Banner Section (Home)

Requirement:
- Banner image with team activity poster
- Team name and short introduction

Implementation:
- Implemented as `<section class="hero" id="home">`.
- Banner image:
  - `<img src="assets/images/banner.png" class="hero-image">`
- Team identity and intro:
  - Heading: `Team Celestial`
  - Quote: `CELESTIAL "Beyond Horizon"`
  - Intro paragraph explaining the team and school project
- Visual quality improvements:
  - `.hero-overlay` for readability
  - layered gradients and glow effects
  - responsive behavior for mobile hero image

## Activities Section

Requirement:
- Show all completed activities
- Each activity includes title, description, image, date

Implementation:
- Activities are shown in `<section id="projects">` under “Selected Work”.
- Each activity is an `<article class="project">` containing:
  - image (`.project-image`)
  - title (`<h3>`)
  - description (`<p>`)
- Filtering by activity type is implemented using buttons and JavaScript (`setupProjectFilters`).

Current activities in code:
- Logo Making
- Poster Making
- Team Poster Making

Important note about dates:
- Titles, descriptions, and images are present.
- Dates are **not yet included** in current HTML. To satisfy the requirement fully, add a date element to each project card (for example: `<p class="activity-date">Date: March 2026</p>`).

## About Section

Requirement:
- Profile image, name, credentials/skills, and personal motto for each member

Implementation:
- Implemented as `<section id="team">`.
- Each member is rendered as `<article class="person">` with:
  - name (`<h3>`)
  - role/credentials (`<p class="role">`)
  - short member description

Current gap vs requirement:
- Member names and roles are present.
- Profile images and personal mottos are **not yet included**.

## Contact Section

Requirement:
- Contact details of each member
- Embedded Google Map with red markers for each member's home location

Implementation:
- Implemented as `<section id="contact">`.
- Current contact method:
  - team email button `mailto:celestial@gmail.com`
- Styled as CTA container `.contact-box`.

Current gap vs requirement:
- Per-member contact details are **not yet listed**.
- Embedded Google Map with individual red markers is **not yet implemented**.

## Footer

Requirement:
- Footer must contain the website information

Implementation:
- Implemented at bottom with `<footer class="footer">`.
- Displays website/team info text:
  - `© 2026 CELESTIAL | 1st Year BSCS-1C School Portfolio Submission.`

## 5. JavaScript Features Used

From `js/script.js`:
- `revealOnScroll()` -> fade-up reveal on section visibility
- `setupCounters()` -> animated stats counters
- `setupProjectFilters()` -> filters activities/projects by category
- `setupActiveNav()` -> highlights active nav link while scrolling
- `setupHeroRotate()` -> rotates hero keyword text
- `setupHeroParallax()` -> slight hero image parallax on scroll
- `setupMobileMenu()` -> hamburger menu open/close behavior
- `setupBackToTop()` -> floating button to return to top

All are initialized on `DOMContentLoaded`.

## 6. Responsive and Accessibility Decisions

- Mobile-first behavior added through media queries (`max-width: 860px`).
- Mobile menu includes ARIA attributes (`aria-expanded`, `aria-controls`, `aria-label`).
- Reduced motion support:
  - checks `prefers-reduced-motion`
  - disables or simplifies animated behavior where needed.
- Semantic sections and heading hierarchy improve readability and structure.

## 7. Assets and Branding

- Local images:
  - logo (`assets/images/logo.png`)
  - team banner (`assets/images/banner.png`)
  - activity poster (`assets/images/poster.jpg`)
- Local SVG icons for section headings and cards
- Custom Inter font family loaded from local `assets/fonts`

## 8. How to Run Locally

1. Open the project folder.
2. Launch `index.html` in a browser.
3. For best workflow, use a local static server (optional) so paths and testing stay consistent.

## 9. Requirement Coverage Summary

Implemented now:
- Top sticky navigation with logo
- Home/banner with team branding and intro
- Activities cards with image/title/description
- About section with members and roles
- Contact CTA with team email
- Footer with website/team information

Still needed for full requirement match:
- Rename nav labels to exact required set: Home, Activities, About, Contact
- Add activity dates to each activity card
- Add member profile images and personal mottos
- Add per-member contact details
- Embed Google Map and place a red marker for each member location

## 10. Suggested Next Update Scope

To align 100% with the stated requirement, edit:
- `index.html` (content structure and labels)
- `css/styles.css` (new card/date/profile/map styles)
- `js/script.js` (if map/filter/member interactions are expanded)

