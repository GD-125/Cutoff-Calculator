# Engineering Cutoff Calculator

A responsive, light-theme-only web app to calculate engineering cutoffs with input validation, high-quality screenshots, motivational feedback, and a polished UI. Built with Next.js App Router, Tailwind CSS, and shadcn/ui components.

[Preview](https://cutoff-calculator.vercel.app/)

## Table of Contents

- Overview
- Features
- Tech Stack
- How It Works
- Project Structure
- Getting Started
- Quality Screenshots (How we prevent blur)
- Accessibility
- Security
- Testing and QA
- Roadmap
- Troubleshooting
- Contributing
- License
- References

## Overview

This project helps students quickly compute an engineering cutoff score based on Mathematics, Physics, and Chemistry marks. It emphasizes clarity, accuracy, and ease of sharing results as crisp, high-resolution images.

- App Router with Server Components by default for pages and layouts ensures a modern, scalable architecture. [^3]
- Client-only enhancements are scoped to interactive parts of the UI for performance and maintainability. [^3]

## Features

- Accurate cutoff calculation:
  - Formula: Cutoff = Mathematics + (Physics + Chemistry) ÷ 2
- High-quality image export:
  - “Save” button exports a crisp PNG of the calculator section (no blur)
  - Uses html2canvas with 4x scale, white background, and cloned DOM styling
- Light theme only:
  - All dark-theme code removed for consistent, professional look
- Input validation:
  - Range: 0–100
  - Supports up to 1 decimal place
  - Numeric keyboard on mobile via inputMode="decimal"
- Motivational feedback:
  - Color-coded result ranges and positive messages
- Responsive UI:
  - Works on phones, tablets, and desktops
- Solutions page:
  - Minimal, static, dependency-free cards to avoid fetch errors
- Confetti celebration:
  - Visual reward after successful calculation
- Security headers:
  - CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy applied via Next.js middleware
- Accessibility in mind:
  - Proper labels and headings, meaningful link text, and descriptive page titles; client navigations are announced by Next.js route announcer. [^1]

## Tech Stack

- Framework: Next.js (App Router, Next 15+) [^3]
- Language: TypeScript + React
- Styling: Tailwind CSS
- UI Components: shadcn/ui + Lucide icons
- Client utilities:
  - html2canvas (high-quality screenshots)
  - react-confetti (celebration effect)
- Security: Next.js Middleware with CSP and hardened headers

## How It Works

1. Enter marks for Mathematics, Physics, and Chemistry.
2. Validation ensures values are within 0–100 with at most one decimal digit.
3. Click “Calculate Cutoff” to see:
   - The computed score
   - Color-coded emphasis
   - A motivational message
   - Confetti celebration
4. Click “Save” to download a crisp PNG of the calculator section.

## Project Structure

\`\`\`
app/
  globals.css            # Tailwind base styles and app animations
  layout.tsx             # Root layout (Server Component) [light theme only]
  page.tsx               # Cutoff Calculator (Client Component for interactivity)
  solutions/
    page.tsx             # Static Solutions page (Server Component)
components/
  theme-provider.tsx     # Existing project file (not used for dark-mode here)
  ui/                    # shadcn/ui components (pre-installed)
middleware.ts            # Security headers and CSP
tailwind.config.ts       # Tailwind configuration
package.json             # Dependencies (inferred by Next when not present)
README.md                # You are here
\`\`\`

Notes:
- App Router pages (`app/layout.tsx`, `app/**/page.tsx`) render as Server Components by default; interactive sections (like the calculator) opt into client behavior using "use client". [^3]
- Next.js route announcements aid accessibility during client navigations out of the box. [^1]

## Getting Started

Prerequisites:
- Node.js 18+ (recommended)
- pnpm, npm, or yarn

Install and run:
- pnpm install
- pnpm dev
  - Or `npm install` and `npm run dev`
- Open http://localhost:3000

Build and start:
- pnpm build && pnpm start

Deploy:
- Recommended: Vercel. Push to a Git repository and import it on vercel.com.

Environment variables:
- None required.

## Quality Screenshots (How we prevent blur)

We use html2canvas with the following configuration to ensure crisp images:
- scale: 4 (renders the canvas at 4x resolution)
- backgroundColor: "#ffffff" (prevents transparency-induced blur)
- onclone: injects styles to improve text rendering and sharpness; also ensures the “Calculate Your Cutoff” heading uses an explicit weight/size for clarity in the cloned DOM
- imageTimeout: 0 and allowTaint: true to avoid asset timing issues

User action:
- Click the “Save” button in the calculator card’s header to download a high-quality PNG of the visible calculator section.

## Accessibility

- Semantic headings, labeled inputs, and descriptive link text
- Unique page titles for clarity
- Next.js includes an accessible route announcer so client-side navigations are announced to assistive technologies. [^1]

Tip:
- Keep primary headings unique and descriptive to maximize the benefit of route announcements. [^1]

## Security

Configured in middleware.ts:
- Content-Security-Policy (CSP)
- X-Content-Type-Options: nosniff
- X-Frame-Options: SAMEORIGIN
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera=(), microphone=(), geolocation=()

These headers reduce common attack surfaces (clickjacking, MIME sniffing, cross-origin leakage).

## Testing and QA

Manual checks:
- Input validation:
  - Rejects invalid patterns; accepts values 0–100 with 1 decimal place
- Calculation accuracy:
  - Example: M=100, P=90, C=98 → cutoff = 100 + (90+98)/2 = 194.0
- Responsive behavior:
  - Verify on small screens that layout stacks cleanly and buttons are finger-friendly
- Screenshot:
  - Verify heading sharpness and correct alignment of labels/inputs in the exported PNG
- Navigation:
  - Solutions page opens properly and contains no external fetches

## Roadmap

- Score history (save, view, and clear past results)
- College recommendation feature based on ranges
- Dark mode toggle animation (only if dark mode returns later)
- PWA support (offline caching, install prompt)
- More subtle animations with reduced motion support
- Additional image-loading hardening
- Error boundaries and improved error UX
- Performance optimization and audits
- Unit tests
- Validate client navigations via Next.js Link coverage
- Expand Tailwind and shadcn usage patterns

## Troubleshooting

- Screenshot appears blurry:
  - Ensure you use the built-in “Save” button; it uses a 4x scale and white background for sharpness.
  - Avoid browser zoom during capture; zoom can affect rasterization.
- Inputs misaligned in the image:
  - The screenshot function clones DOM and applies styles that stabilize text rendering and sizing. If you changed styles, mirror important font sizes and weights in the `onclone` styling hook in `page.tsx`.
- Solutions page errors:
  - The current Solutions page is static and should not fetch external resources; verify you didn’t add external images or scripts.

## Contributing

- Fork the repository
- Create a feature branch
- Commit with clear messages
- Open a Pull Request with a detailed description, screenshots, and testing notes

## License

MIT — see LICENSE (add one if needed)

## References

- Accessibility and route announcements in Next.js [^1]
- Next.js 15+ and App Router guidance on Server/Client Components [^3]
