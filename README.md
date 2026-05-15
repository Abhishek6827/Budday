# Happy Birthday Anshika - Interactive Birthday Website

A beautiful, responsive, single-page birthday website built with pure HTML, CSS, and JavaScript. Features smooth scroll animations, a visual timeline of our journey, a media gallery with lightbox, background instrumental music, original poems, and heartfelt messages.

---

## Features

- **Smooth Scroll Animations** - Fade-in and slide-up effects powered by the Intersection Observer API
- **Hero Section** - Full-screen animated background with romantic overlay text and floating hearts
- **Story Timeline** - Visual journey from strangers to "us" with step-by-step milestone cards
- **Media Gallery** - Numbered image/video grid with click-to-expand lightbox
- **Background Music** - Soft piano instrumental with play/pause and volume controls
- **Poems & Messages** - Original content written for Anshika
- **Fully Responsive** - Mobile-first design that works on all screen sizes

---

## How to Run Locally

Simply open `index.html` in any modern browser:

```bash
# Windows
start index.html

# Or use a local server for best experience
npx serve .
```

No build steps required. The site is 100% static and ready to run.

---

## Adding Your Own Images & Videos

The gallery is set up to accept sequentially numbered assets.

### Step 1: Prepare your files

Rename your photos and videos like this:

```
img-1.jpg
img-2.png
img-3.jpg
img-4.jpg

vid-1.mp4
vid-2.mp4
```

### Step 2: Place them in the correct folders

```
assets/
  images/
    img-1.jpg
    img-2.png
    img-3.jpg
    img-4.jpg
  videos/
    vid-1.mp4
    vid-2.mp4
```

### Step 3: That's it!

The HTML already references these paths. If a file is missing, a soft placeholder will appear with the text "Media loading...".

**Tip:** Look for HTML comments like `<!-- REPLACE WITH: img-1.jpg -->` in `index.html` to see exactly where each asset goes.

---

## Adding Background Music

The default track is a soft piano instrumental loaded from a free CDN. To use your own music:

1. Place your MP3 file in `assets/audio/background.mp3`
2. In `index.html`, find the `<audio>` element near the top
3. Either:
   - Replace the first `<source>` CDN link with your file path, OR
   - The fallback `<source src="assets/audio/background.mp3">` will automatically work if the CDN fails

### Recommended Free Instrumental Tracks (CDN Links)

Replace the `src` in the `<audio>` element with any of these:

1. **Soft Piano** (default): `https://cdn.pixabay.com/download/audio/2022/05/27/audio_1800dcd412.mp3?filename=soft-piano-100-bpm-121529.mp3`
2. **Romantic Guitar**: `https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c90c53c0.mp3`
3. **Peaceful Piano**: `https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3`

---

## Customizing Content

All text content is directly inside `index.html` and clearly commented. Look for these sections:

- **Hero text** - Search for `<!-- HERO SECTION -->`
- **Timeline story** - Search for `<!-- STORY / TIMELINE SECTION -->`
- **Gallery** - Search for `<!-- MEDIA GALLERY -->`
- **Poems** - Search for `<!-- POEMS SECTION -->`
- **Quotes** - Search for `<!-- QUOTES / MESSAGES SECTION -->`
- **Birthday message** - Search for `<!-- BIRTHDAY MESSAGE SECTION -->`

---

## Project Structure

```
Budday/
 index.html          # Main website (all HTML, CSS, JS included)
 assets/
   images/           # Place your photos here (img-1.jpg, img-2.jpg...)
   videos/           # Place your videos here (vid-1.mp4, vid-2.mp4...)
   audio/            # Place your MP3 here (background.mp3)
 Images/             # Original photo collection
```

---

## Tech Stack

- Pure HTML5, CSS3, JavaScript (ES6+)
- Intersection Observer API for scroll animations
- Native lazy loading (`loading="lazy"`)
- No frameworks, no build steps
- Font Awesome for icons
- Google Fonts (Playfair Display + Poppins)

---

## Browser Support

Works in all modern browsers: Chrome, Firefox, Safari, Edge. Mobile-friendly.

---

Made with love for Anshika.