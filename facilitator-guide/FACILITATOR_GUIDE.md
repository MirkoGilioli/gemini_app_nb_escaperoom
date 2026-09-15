# 🎓 Workshop Facilitator Guide: The Midnight Runway Lockdown
### A Gamified AI Escape Room for Luxury Eyewear E-Commerce & Retail Teams

---

## 🧭 Workshop Overview
- **Duration**: 75–90 Minutes
- **Target Audience**: E-Commerce Merchandisers, Brand Copywriters, Customer Experience Directors, Retail Inventory Planners, and Digital Transformation Leaders.
- **Core Technology Stack**:
  1. **Google Gemini App**: Custom Gems, default tools (**Nano Banana Image Generation**), uploaded **PDF Knowledge Bases**, and strict negative constraints.
  2. **Gemini Notebook (NotebookLM)**: Grounded multi-document synthesis, **Audio Overview (AI Podcasts)**, investigative Q&A with clickable inline citations, and NotebookLM Studio **Slide Decks & Video Overviews**.

---

## ⏱️ Recommended 90-Minute Agenda

| Time | Phase | Focus |
| :---: | :--- | :--- |
| **00:00 – 00:15** | **Kickoff & Narrative Briefing** | Story setup, Milan Fashion Week scenario, tooling introduction (Gemini App Gems vs. Gemini Notebook). |
| **00:15 – 00:27** | **Chamber 01: Frame Spec Chaos** | Build Gem 1 with **Nano Banana** & upload `Technical_Blueprints.pdf` $\to$ `TITAN-54-18-950`. |
| **00:27 – 00:42** | **Chamber 02: Bio-Acetate Audit** | NotebookLM: Generate **Audio Podcast**, listen for clues, interrogate via chat $\to$ `ISO14855-DELTA49-CAT3`. |
| **00:42 – 00:57** | **Chamber 03: Virtual Fit PR Storm** | Build Gem 2 with `Brand_Safety_SOP.pdf` & negative constraints $\to$ `GUARD-BRIDGEFIT26-PRO`. |
| **00:57 – 01:12** | **Chamber 04: Master Runway Vault** | NotebookLM Studio: **Slide Deck** & **Video Overview** + inventory math $\to$ `MIDNIGHT-TOKYO5000-SLIDES-VIDEO`. |
| **01:12 – 01:30** | **Debrief, Best Practices & Awards** | Review prompt architecture, grounded citations vs. hallucinations, and crown squad champions. |

---

## 🛠️ Pre-Session Setup Checklist

### 1. Facilitator Preparation
- [ ] Clone or open the repository on the presentation screen.
- [ ] Open `index.html` in Chrome/Safari to verify Web Audio chimes and live countdown clock.
- [ ] Keep `facilitator-guide/SOLUTIONS_AND_SPOILERS.md` open privately.

### 2. Participant Technical Setup (Per Squad of 3–5)
- [ ] At least one Google account with access to **Gemini App** (`gemini.google.com`).
- [ ] Access to **Gemini Notebook (NotebookLM)** (`notebooklm.google.com`).
- [ ] Download or open the dossier files in `notebook-sources/` and the knowledge PDFs in `gem-library/knowledge-pdfs/`.

---

## 💡 Facilitator Coaching Prompts During Gameplay

- **When Room 1 is struggling**:
  *"Did you remember to toggle on Image Generation (Nano Banana) in your Gem? And did you check Section 3 of the Technical Blueprints PDF for the calibration formula?"*
- **When Room 2 is waiting for Audio Overview**:
  *"While the podcast compiles in NotebookLM Studio, start typing your forensic questions in the chat bar! Ask for the ISO standard number and the certified batch code."*
- **When Room 3 has guardrail leaks**:
  *"Your Gem cannot play doctor! If it suggested aspirin or an allergy pill, your brand is liable. Tighten the negative constraint: 'Never diagnose or recommend medical treatments'."*
- **When Room 4 is reconciling units**:
  *"Look closely at the return rates in allocation_matrix.csv. Why would we give 5,000 units to Tokyo instead of New York?"*
