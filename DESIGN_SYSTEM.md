# Design System – Yousof Hashemzadeh Portfolio

> **Direction:** RTL (Persian) — `<html dir="rtl" lang="fa">`

---

## 1. Color Palette

Colors are centralised in `tailwind.config.ts` and can be changed to switch the entire theme.

### Current Theme — Dark Crimson / Blood Red

| Alias | Hex       | Usage                               |
| ----- | --------- | ----------------------------------- |
| `a`   | `#5A0E12` | Primary accent, cursors, gradients  |
| `b`   | `#3B070A` | Secondary accent, borders           |
| `c`   | `#141010` | Page background (`bg-c`)            |
| `d`   | `#8B1E24` | Medium accent, theme-color meta tag |

Usage in components (hardcoded in Tailwind arbitrary values – also need to be updated manually when switching theme):

```
from-[#3B070A]   to-[#3A0D12]   (gradients)
bg-[#3A0D12]/10  (ambient glows)
border-[#3B070A] (sidebar active item border)
selection:bg-[#5A0E12]/20
```

### How To Change Theme

1. Edit `tailwind.config.ts` → `theme.extend.colors` (`a`, `b`, `c`, `d`).
2. Replace all hardcoded hex values in `app/globals.css` (search `#5A0E12`, `#3B070A`, `#3A0D12`, `#8B1E24`).
3. Replace in component files via global find-and-replace.

---

### Historical Themes

| Commit               | Theme name   | a         | b         | c         | d         |
| -------------------- | ------------ | --------- | --------- | --------- | --------- |
| `b3e1baf` (current)  | Dark Crimson | `#5A0E12` | `#3B070A` | `#141010` | `#8B1E24` |
| `394bc86` (previous) | Dark Teal    | `#1B5B5C` | `#0F3D3E` | `#171717` | `#2A9D9A` |
| Before `394bc86`     | Neon Green   | `#3ECA43` | `#37B13B` | `#171717` | `#1F6522` |

---

## 2. Typography

### Font Families

| Variable name       | Family                      | Purpose                       |
| ------------------- | --------------------------- | ----------------------------- |
| `font-[ybn]`        | `YekanBakhFaNum-Regular`    | Body text (Persian)           |
| `font-[ybb]`        | `YekanBakhFaNum-Bold`       | Headings, bold text (Persian) |
| `font-[ybeb]`       | `YekanBakhFaNum-ExtraBlack` | Developer name hero text      |
| `font-[inter]`      | Inter                       | English/numeric content       |
| `font-[montserrat]` | Montserrat ExtraBold        | Decorative English headings   |

Font files are in `app/fonts/` (local), with Inter loaded from Google Fonts CDN via `globals.css`.

### Special CSS Classes

| Class               | Description                                                    |
| ------------------- | -------------------------------------------------------------- |
| `.developer-name`   | Hero name: `ybeb`, animated gradient fill, 2.6–3.5rem          |
| `.mobile-developer` | "MOBILE DEVELOPER" text: flashlight animation, Inter ExtraBold |
| `.sample-index`     | Work sample index number with gradient fill                    |

### Tailwind Typography Scale (key sizes used)

```
text-sm     → body, secondary text
text-base   → medium copy
text-lg     → card titles
text-xl     → sub-headings
text-3xl    → section headings (h3 default via @layer base)
text-4xl    → section headings on xl+
text-5xl    → large headings on 2xl+
```

---

## 3. Layout System

### Sidebar

- Desktop: `position: fixed`, **right side**, `w-[20vw]`, full height
- Mobile: overlay from right, `w-[70vw]`, toggled via hamburger button
- Content offset: each section uses `lg:mr-[22vw]` (right margin to clear the sidebar)

### Spacing Constants

| Token                  | Value                     | Usage                          |
| ---------------------- | ------------------------- | ------------------------------ |
| Sidebar width          | `20vw`                    | Desktop sidebar                |
| Content right margin   | `22vw`                    | All sections: `lg:mr-[22vw]`   |
| Section top padding    | `5vh`                     | `.pt-[5vh]` on section headers |
| Section bottom padding | `12` (3rem)               | `.pb-12`                       |
| Mobile nav height      | ~60px / `h-[60px]` spacer | Sidebar mobile spacer          |

### Breakpoints (Tailwind custom)

```
xs:  360px
sm:  640px
md:  768px
lg: 1024px   ← main mobile/desktop breakpoint
xl: 1280px
2xl: 1536px
```

---

## 4. Component Patterns

### Glassmorphism Card

```html
<div
  class="bg-black/20 border border-white/10 hover:border-white/20 backdrop-blur-2xl rounded-none"
></div>
```

Enhanced variant (`.glass-card-enhanced` in globals.css):

```css
background: rgba(0, 0, 0, 0.3);
border: 1px solid rgba(255, 255, 255, 0.1);
backdrop-filter: blur(20px) saturate(180%);
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37), inset 0 1px 0 rgba(255, 255, 255, 0.05);
```

### Section Heading Pattern

```html
<h3
  class="xl:text-4xl font-[ybb] text-white/80 self-start mb-6 text-nowrap relative inline-block"
>
  عنوان بخش
  <span
    class="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-[#3B070A] to-[#3A0D12]"
  ></span>
</h3>
```

### Card Hover Effect (corner borders)

```
before: bottom-left corner border (animated on hover)
after:  top-right corner border (animated on hover)
```

### Primary Button

```html
<a
  class="bg-gradient-to-r from-[#3B070A]/20 to-[#5A0E12]/20 hover:from-[#3B070A]/30
          border border-white/10 hover:border-white/20 rounded-none
          transition-all duration-300 hover:-translate-y-1 backdrop-blur-md font-[ybn]"
></a>
```

### Date Badge

```html
<div
  class="bg-gradient-to-r from-[#3B070A]/20 to-[#3A0D12]/20 border border-white/10
            backdrop-blur-md h-8 w-28 text-xs text-white/80 flex items-center justify-center"
></div>
```

### Social Button (`.social-button`)

Fixed-ratio square button: `6vh` mobile / `8vh` desktop aspect-ratio-1, glassmorphism, ripple on hover.

---

## 5. Animation Patterns

| Class / keyframe                   | Description                                      |
| ---------------------------------- | ------------------------------------------------ |
| `animate-fadeIn`                   | scale 0.95→1, opacity 0→1, 0.3s                  |
| `.developer-name` + `gradientMove` | Background-position oscillation, 3s infinite     |
| `.mobile-developer` + `flashlight` | Horizontal shimmer across text, 5s infinite      |
| `.accent-line` + `lineExpand`      | Width 0→80px, 1.5s, delayed 0.8s                 |
| `gradient-shift`                   | Background-position 0%→100%, 15s infinite        |
| `float`                            | Floating particles, 20–35s infinite              |
| `socialFadeIn`                     | Scale + translateY, staggered on social buttons  |
| Corner accents                     | Opacity 0→1, width/height expand on hover (0.4s) |

---

## 6. Icon Libraries

| Library               | Usage                                          |
| --------------------- | ---------------------------------------------- |
| `iconsax-react`       | Navigation icons, Calendar, DocumentText, etc. |
| `@mui/icons-material` | Form icons (Mail, AccountBox), Arrow icons     |
| `@heroicons/react`    | Utility icons                                  |
| `react-icons`         | Additional icons                               |

---

## 7. Background Patterns

Sections alternate between two visual treatments:

1. **SVG background**: `bg-[url('/vectors/sec1-bgdark.svg')] bg-no-repeat bg-cover` (AboutMe, WorkSamples, Education, Events)
2. **Dark plain**: `bg-c` (`#141010`) with ambient glow blobs (Work, CallMe)

Ambient glow blobs pattern:

```html
<div
  class="absolute top-20 left-10 w-32 h-32 bg-[#3A0D12]/10 rounded-full blur-3xl"
></div>
<div
  class="absolute bottom-40 right-20 w-40 h-40 bg-[#3B070A]/10 rounded-full blur-3xl"
></div>
```

---

## 8. Data Models

| Model        | Fields                                                                                                                                                                       |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `WorkSample` | id, isWeb, faTitle, enTitle, faDescription, enDescription, pictures (space-sep paths), link, technologys, faStartDate, enStartDate, faEndDate, enEndDate, customLinks, order |
| `Education`  | id, name, fromYear, toYear?, picture, description, order                                                                                                                     |
| `Work`       | id, name, technos (JSON string), fromYear, toYear?, picture, url, description, order                                                                                         |
| `Event`      | id, name, date, picture, attachment, description, order                                                                                                                      |

---

## 9. State Management

**Zustand** store (`app/states.ts`, `useZState`):

| State key        | Type   | Purpose                     |
| ---------------- | ------ | --------------------------- |
| `isOpen`         | bool   | Mobile sidebar toggle       |
| `isOnMobile`     | bool   | Screen size detection       |
| `sideBarScroll`  | string | Active section `#id`        |
| `isWebFrame`     | bool   | WorkSamples tab: mobile/web |
| `sampleWebIndex` | number | Current web sample index    |
| `sampleMobIndex` | number | Current mobile sample index |
| `isDrawerOpen`   | bool   | Work sample detail drawer   |
| `samplePicIndex` | number | Current picture in drawer   |

---

## 10. Third-Party UI Libraries

| Library                                 | Purpose                                         |
| --------------------------------------- | ----------------------------------------------- |
| `@chakra-ui/react`                      | Tabs in WorkSamples section                     |
| `@mui/material` + `@mui/icons-material` | Icons, Menu button                              |
| `framer-motion`                         | Animation utilities                             |
| `daisyui`                               | Tailwind CSS component plugin (themes disabled) |
| `react-hot-toast`                       | Toast notifications                             |
| `react-hook-form` + `zod`               | Form validation                                 |
| `next-auth`                             | Admin authentication                            |
| `zustand`                               | Global state                                    |
| `prisma` + `sqlite`                     | Database                                        |
