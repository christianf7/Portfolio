# chrisfitz.dev

My personal portfolio site. Shows off what I've built and how to get in touch.

## Tech

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Three.js / React Three Fiber
- shadcn/ui

## Run it locally

```bash
# Install deps
bun install

# Dev server
bun dev

# Build
bun run build
```

## Structure

```
src/
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── sections/         # Page sections (hero, about, projects, etc.)
│   ├── ui/               # shadcn components
│   ├── effects.tsx        # Reusable animation primitives
│   ├── navigation.tsx     # Top nav + floating dock
│   ├── loading-screen.tsx # Intro loading animation
│   ├── blob-background.tsx
│   ├── hero-blobs.tsx     # Three.js 3D blob scene
│   └── project-modal.tsx  # Project detail modal
└── styles/
    └── globals.css
```

## Contact

- Email: christian@chrisfitz.dev
- GitHub: [@christianf7](https://github.com/christianf7)
- LinkedIn: [/in/christianf7](https://linkedin.com/in/christianf7)

---

Made by Christian Fitzgerald
