# Rishabh Dubey — Cinematic 3D Portfolio

A premium, cinematic personal portfolio built with Next.js 16, Three.js / React Three Fiber, Tailwind CSS v4, GSAP ScrollTrigger, and EmailJS. Designed as a performant, frontend-only architecture optimized for zero-maintenance deployment on Vercel or any modern hosting platform.

---

## ✨ Features

- **Cinematic 3D Visuals**: Three.js & React Three Fiber dynamic particles, cursor-interactive nebula shaders, and smooth camera choreography.
- **Scroll Storytelling**: GSAP ScrollTrigger timeline orchestration paired with responsive spatial depth.
- **Modular Component Architecture**: Next.js 16 App Router with Tailwind CSS v4 styling.
- **Direct Client-Side Contact**: Direct email dispatch via EmailJS (`dubeyrishabh997@gmail.com`) with spam honeypot and client-side validation.
- **Genuine Engineering Milestones**: Highlighting verified systems (Fixora / KaamSetu, MediNexus AI, DairyMitra-AI / GAUVANTA, WikiClub Tech UU) and IBM curriculum honors at United University, Prayagraj.

---

## 🛠 Tech Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4** (CSS-first configuration with `@tailwindcss/postcss`)
- **Three.js** + React Three Fiber + Drei (3D scenes & WebGL shaders)
- **GSAP** + ScrollTrigger (scroll-linked choreography)
- **Framer Motion** (micro-interactions & transitions)
- **Zustand** (lightweight state management)
- **EmailJS** (`@emailjs/browser` for direct email delivery)
- **Lucide React** (icons)

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 20.x
- **npm** ≥ 10.x

---

### Setup & Development

```bash
cd frontend

# 1. Configure environment variables (EmailJS)
cp .env.example .env.local

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev     # Starts on http://localhost:3000
```

### Production Build

```bash
npm run build   # Compiles optimized production bundle via Turbopack
npm run start   # Runs production server locally
```

---

## 📧 EmailJS Setup (Direct Email Contact)

To enable live email delivery to your inbox from the contact form:

1. Sign up for a free account at [EmailJS](https://www.emailjs.com/).
2. Create an **Email Service** (e.g., connect your Gmail account). Copy your **Service ID**.
3. Create an **Email Template** with the following template fields:
   - `{{from_name}}` — Sender's name
   - `{{from_email}}` — Sender's email
   - `{{subject}}` — Message subject
   - `{{message}}` — Message content
   Set the recipient email in the template settings to `dubeyrishabh997@gmail.com`.
   Copy your **Template ID**.
4. Go to **Account > API Keys** and copy your **Public Key**.
5. Add these values to `frontend/.env.local`:
   ```bash
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   ```

*Note: In development / preview mode without credentials configured, the contact form operates in a safe simulated mode.*

---

## 📁 Project Structure

```
frontend/
├── public/
│   ├── images/              # Authentic portrait assets & icons
│   └── models/              # 3D assets
└── src/
    ├── app/                 # Next.js App Router (layout, page, preview, styles)
    ├── components/
    │   ├── canvas/          # Three.js / R3F dynamic particle scenes & camera rig
    │   ├── sections/        # Hero, About, Projects, Experience, Achievements, Contact
    │   ├── Navbar.tsx       # Navigation header & mobile menu
    │   └── Footer.tsx       # Site footer
    ├── data/                # Static typed portfolio datasets
    │   ├── projects.ts      # Fixora, MediNexus AI, DairyMitra-AI, WikiClub Tech UU
    │   ├── experience.ts    # Career milestones & leadership
    │   ├── achievements.ts  # Academic & technical honors
    │   └── skills.ts        # Categorized skill matrix & education
    ├── hooks/               # Custom hooks (media query, scroll progress)
    ├── lib/                 # EmailJS client & site constants
    ├── stores/              # Zustand global state store
    └── types/               # TypeScript interfaces
```

---

## 👤 Author

**Rishabh Dubey**
- GitHub: [@Rishabh-Dubey56](https://github.com/Rishabh-Dubey56)
- LinkedIn: [Rishabh Dubey](https://linkedin.com/in/rishabh-dubey-6b0a95321)
- Email: dubeyrishabh997@gmail.com
- Affiliation: United University, Prayagraj — B.Tech CSE (IBM), 2024–2028
