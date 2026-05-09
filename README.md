# 🌌 Timestream Chronicles

**Timestream Chronicles** is an "Increlution" style incremental game set in the *Doctor Who* universe, specifically focusing on the 1963 Hartnell Era. You play as the TARDIS Navigation Computer (MK I) assisting the Doctor in navigating complex timelines, surviving prehistoric Earth, and evading Dalek threats while maintaining the ship's stability.

## ⚙️ Core Mechanics

- **Stability (The Clock):** Your primary survival resource. It decays constantly and faster over time (Scaling Decay).
- **Entropy Weight:** Active tasks accelerate stability decay. Managing your load is key to survival.
- **Dual-Progress Paradigm:**
    - **Mastery (Permanent):** Slow-growing levels that provide permanent bonuses across loops.
    - **Focus (Temporal):** Rapidly cycling levels gained during a single loop, acting as "keys" to unlock advanced tasks.
- **Timeline Stability:** When stability hits zero, the loop resets. Stability can be restored using "Narrative Anchors" or items discovered during tasks.

## 📺 Visual & Technical Aesthetic

The game follows a **1963 Aesthetic**:
- Monochrome, high-contrast palette (`#fff` and `var(--color-vortex-black)`).
- Terminal-style typography and sharp, geometric layouts (0px border-radius).
- CRT scanline and flicker overlays for period-accurate fidelity.
- Frame-rate-independent "Heartbeat" loop powered by `requestAnimationFrame`.

## 🛠️ Technical Stack

- **Shell:** Electron
- **Renderer:** Vue 3 + Vite
- **Language:** TypeScript
- **Styling:** Vanilla CSS (Strictly no modern UI frameworks like Tailwind/Bootstrap)

## 📂 Project Structure

- `electron-shell/`: The main Electron process and configuration.
- `timestream-renderer/`: The Vue 3 frontend application.
    - `src/assets/theme.css`: The central Design Token library (1963 System).
    - `src/logic/engine.ts`: The core entropy and progression engine.
    - `src/components/`: Shared UI patterns including `ProgressBar` and `SystemMenu`.

## 🚀 Getting Started

### Prerequisites
- Node.js (Latest LTS recommended)
- npm

### Installation
```bash
# Install dependencies for the renderer
cd timestream-renderer
npm install

# Install dependencies for the electron shell
cd ../electron-shell
npm install
```

### Development
To run the game in development mode:
```bash
# In one terminal, start the renderer
cd timestream-renderer
npm run dev

# In another terminal, start the electron shell
cd electron-shell
npm start
```

### Technical Integrity
```bash
# Run the High-Value Test Suite
cd timestream-renderer
npm test
```

## 📜 Development Standards

- **Personality & Tone:** As the TARDIS Navigation Computer, documentation and code comments should be technical but slightly eccentric.
- **UI Architecture:** 100% Token-Driven via `theme.css`. No hardcoded colors allowed.
- **Validation Gates:** All core logic must be protected by "actually failable" unit tests.
- **Forbidden Protocols:** No rounded corners, no external state libraries (Pinia/Vuex) for now, and no spoilers beyond the 1963 era.

## 📡 Roadmap

1. **Persistence Layer:** Implementation of `localStorage` serialization.
2. **Sequence Buffer:** Logic for an action queue (automated gameplay).
3. **Era Transitions:** Visual and mechanical shifts for Doctor regenerations.

---
*Safe travels through the Vortex.*
