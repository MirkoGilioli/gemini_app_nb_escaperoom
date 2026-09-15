# 🕶️ Escape Room: The Midnight Runway Lockdown
### A Hands-On Generative AI Training Course for Luxury Eyewear E-Commerce
**Powered by Google Gemini App (Custom Gems) & Gemini Notebook (former NotebookLM)**

---

## 📖 Scenario Overview

Welcome to **Maison Solaris Eyewear**, a world-renowned Italian luxury & fashion eyewear house headquartered in Milan. Known for blending traditional bio-acetate craftsmanship with cutting-edge optical engineering and direct-to-consumer e-commerce, the brand is minutes away from its most important launch of the decade: **The Solstice Autumn/Winter Capsule Collection**.

At **T-minus 60 minutes**, an unprecedented cybersecurity breach and rogue catalog script corrupt the e-commerce deployment vault:
1. **The Product Catalog & Frame Specifications** are scrambled into raw, unreadable factory jargon.
2. **The Compliance & Material Dossier** (Mazzucchelli bio-acetate lab audits, European UV safety certs) is trapped across fragmented reports.
3. **A Viral PR Firestorm** has erupted on social media: an influencer leaked an alleged sizing and optical fit issue with the hero frames.
4. **The Global Inventory Vault** is locked down pending a verified executive briefing and data-grounded allocation strategy.

Your squad must work together using **Gemini App (Custom Gems)** and **Gemini Notebook (NotebookLM)** to crack the 4 security chambers, restore the launch assets, and deploy the collection before the runway show begins!

---

## 🎯 Learning Objectives

By completing this escape room, participants will master:

### 1. Gemini App & Custom Gems
- **Gem Architecture & System Instructions**: How to define Role, Persona, Knowledge Base, Context, Output Constraints, and Tone.
- **Few-Shot Prompt Engineering & Structured Outputs**: Transforming unstructured factory specs into SEO-optimized luxury Product Detail Page (PDP) copy and standardized optical taxonomy attributes (`lens-bridge-temple` measurements, lens category, face-shape suitability).
- **Negative Constraints & Legal Guardrails**: Instructing Gems to never provide medical/optometric diagnoses while delivering empathetic, high-touch luxury customer care.

### 2. Gemini Notebook (former NotebookLM)
- **Multi-Source Grounding**: Ingesting and synthesizing complex documents (trend reports, lab material certifications, optical fit whitepapers).
- **Zero-Hallucination Q&A with Inline Citations**: Verifying critical regulatory standards (ISO 12312-1 UV protection, M49 biodegradability) strictly against source citations.
- **NotebookLM Studio Tools**: Generating grounded executive **Briefing Docs**, **Study Guides / FAQs**, **Timelines**, and the AI-generated **Audio Overview (Deep Dive podcast)**.

---

## 🧭 Repository Structure

```
.
├── index.html                          # 🖥️ Interactive Web Mission Control Console (Run in any browser)
├── assets/
│   ├── css/terminal.css                # Luxury eyewear dark-mode terminal UI
│   └── js/terminal.js                  # Timer, room validation, hint penalty & Web Audio SFX
│
├── facilitator-guide/                  # 🎓 Everything needed to run the 60-90 min workshop
│   ├── FACILITATOR_GUIDE.md            # Schedule, session pacing, setup checklist, debrief guide
│   ├── SOLUTIONS_AND_SPOILERS.md       # Master answer key, unlock ciphers, and regex checks
│   ├── HINTS_AND_TROUBLESHOOTING.md    # 3-tier hint system (Nudge -> Clue -> Full Reveal)
│   └── PRESENTATION_SLIDES_OUTLINE.md  # Workshop kickoff & wrap-up slide deck script
│
├── gem-library/                        # 💎 Ready-to-use Custom Gem System Prompts
│   ├── README.md                       # Guide: Creating & managing Gems in Gemini App
│   ├── 01_eyewear_catalog_gem.md       # Gem 1: Luxury Eyewear Merchandiser & Optical Taxonomy
│   ├── 02_optical_care_guardian_gem.md # Gem 2: PR Crisis & Customer Care with Optical Guardrails
│   └── 03_merchandise_allocator_gem.md # Gem 3: Global E-Commerce Inventory Strategist
│
├── notebook-sources/                   # 📚 Source documents for Gemini Notebook (NotebookLM)
│   ├── README.md                       # Step-by-step notebook setup guide
│   ├── 01_mido_eyewear_trend_report.md # Milan fashion week & eyewear trend forecast (2026/2027)
│   ├── 02_bio_acetate_material_audit.md# Technical lab audit (M49 bio-acetate, ISO 12312 UV specs)
│   ├── 03_optical_fit_ergonomics_guide.md # Bridge sizes, PD, pantoscopic tilt, low-bridge ergonomics
│   └── 04_regional_preorder_sentiment.md  # Pre-order volume & customer fit return rate analysis
│
├── rooms/                              # 🚪 Player Mission Packages (Squad Worksheets)
│   ├── room-1-frame-chaos/             # Room 1: Scrambled Catalog & Taxonomy (Gemini Gems)
│   ├── room-2-trend-dossier/           # Room 2: Bio-Acetate & Trend Synthesis (NotebookLM)
│   ├── room-3-fit-crisis/              # Room 3: Influencer Backlash & Guardrails (Gemini Gems)
│   └── room-4-vault-launch/            # Room 4: Audio Overview & Global Allocation (Integrated)
│
└── handouts/                           # 📄 Quick Reference Cards & Scorecards
    ├── gemini_app_gems_cheatsheet.md   # Prompting formula for high-performance Gems
    ├── notebooklm_features_guide.md    # Guide to NotebookLM Sources, Citations & Studio Tools
    └── squad_scorecard.md              # Team tracking sheet
```

---

## 🚀 Quick Start Guide

### For Facilitators / Workshop Leaders
1. Review [`facilitator-guide/FACILITATOR_GUIDE.md`](file:///Users/mirko.gilioli/gemini_app_notebook_escaperoom/facilitator-guide/FACILITATOR_GUIDE.md).
2. Familiarize yourself with the answers in [`facilitator-guide/SOLUTIONS_AND_SPOILERS.md`](file:///Users/mirko.gilioli/gemini_app_notebook_escaperoom/facilitator-guide/SOLUTIONS_AND_SPOILERS.md).
3. Open `index.html` in a web browser on the presentation screen or distribute the repo files to participant squads.

### For Participants / Squads
1. Ensure your team has access to:
   - **Google Gemini App** (`https://gemini.google.com`) with Gem creation enabled.
   - **Gemini Notebook (NotebookLM)** (`https://notebooklm.google.com`).
2. Double-click `index.html` in your browser to launch the **Maison Solaris Mission Control Console**.
3. Create a new notebook in NotebookLM and upload the 4 source files found in `notebook-sources/`.
4. Open [`rooms/room-1-frame-chaos/MISSION.md`](file:///Users/mirko.gilioli/gemini_app_notebook_escaperoom/rooms/room-1-frame-chaos/MISSION.md) and start the 60-minute countdown!

---

## ⏱️ Recommended Workshop Schedule (75 - 90 Minutes)

| Time | Phase | Activities |
| :--- | :--- | :--- |
| **00 - 15m** | **Briefing & Setup** | Dramatic scenario intro, tool overview (Gems vs. NotebookLM), team assignments. |
| **15 - 30m** | **Room 1: Catalog Chaos** | Build the *Eyewear Merchandiser Gem*, standardize specs, unlock Cipher 1. |
| **30 - 45m** | **Room 2: Trend Dossier** | Grounded Q&A in NotebookLM, extract citations, generate Briefing Doc, unlock Cipher 2. |
| **45 - 60m** | **Room 3: PR Crisis** | Build the *Optical Care Guardian Gem*, implement medical guardrails, unlock Cipher 3. |
| **60 - 75m** | **Room 4: Vault Launch** | Generate an Audio Overview in NotebookLM, solve the allocation matrix, crack Master Cipher. |
| **75 - 90m** | **Debrief & Production Transfer**| Award winners, review real-world applications of Gems & NotebookLM in e-commerce. |

---

## 🏆 Game Rules
- **Time Limit**: 60 minutes (can be adjusted in the terminal settings).
- **Hints**: Each squad has access to 3 tiered hints per room in the Mission Control Console. Using a hint incurs a **3-minute time penalty**.
- **Source Fidelity**: All compliance and technical claims in Room 2 and Room 4 *must* be grounded with NotebookLM citations. Hallucinated answers will not crack the ciphers.

*Ready to save the runway? Launch `index.html` and begin Room 1!*
