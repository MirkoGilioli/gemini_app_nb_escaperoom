# 🕶️ Facilitator Guide: The Midnight Runway Lockdown
### Master Instruction Playbook for Workshop Leaders

---

## 🎯 Executive Overview

- **Audience**: Luxury fashion and eyewear e-commerce teams (Merchandising, Digital Marketing, Product Design, Customer Experience, E-Commerce Operations).
- **Core Technology Focus**:
  1. **Google Gemini App**: Custom Gems creation, System Instructions, Persona tuning, Few-shot prompt engineering, Negative constraints & brand guardrails.
  2. **Gemini Notebook (former NotebookLM)**: Multi-source grounding, zero-hallucination compliance checking with inline citations, Studio tools (Briefing Docs, FAQs, Timelines, and the viral Audio Overview deep dive).
- **Session Duration**: 75 to 90 minutes.
- **Squad Size**: 3 to 5 participants per squad (cross-functional mix recommended: 1 marketer, 1 merchandiser, 1 customer service/ops specialist).

---

## ⏱️ Recommended Session Timeline (90 Minutes)

```
00:00 - 00:15  | Introduction & Dramatic Hook (Maison Solaris Eyewear Crisis)
00:15 - 00:30  | Chamber 01: The Optical Catalog & Frame Spec Chaos (Gemini Gems)
00:30 - 00:45  | Chamber 02: The Bio-Acetate & Runway Compliance Archive (NotebookLM)
00:45 - 01:00  | Chamber 03: The Virtual Fit & Sizing PR Firestorm (Gemini Gems)
01:00 - 01:15  | Chamber 04: The Midnight Runway Master Vault (Integrated NotebookLM + Gems)
01:15 - 01:30  | Squad Debrief, Award Ceremony & Production E-Commerce Transfer
```

---

## 🛠️ Pre-Workshop Setup Checklist

### 1. Facilitator Tech Setup
- [ ] Laptop connected to projector / main display running `index.html`.
- [ ] Confirm Web Audio is enabled so sound cues play when ciphers are unlocked.
- [ ] Verify access to Gemini App (`gemini.google.com`) and Gemini Notebook (`notebooklm.google.com`).
- [ ] Keep `facilitator-guide/SOLUTIONS_AND_SPOILERS.md` handy on a second screen or printed.

### 2. Participant Squad Setup
- [ ] Ensure at least 1 person per squad has Gemini App with Gem creation access.
- [ ] Ensure at least 1 person per squad can access `notebooklm.google.com`.
- [ ] Provide each squad with the repo files or a shared Google Drive containing:
  - `rooms/` folders with worksheets.
  - `notebook-sources/` markdown files (ready to be uploaded to NotebookLM).
  - `index.html` (or project one shared master screen where squads run up to input ciphers).

---

## 🚪 Step-by-Step Chamber Walkthrough

### Chamber 01: The Scrambled Optical Catalog (Gemini App Gems)
- **The Challenge**: A raw, disorganized factory spec sheet for *The Solstice Aviator* has arrived. It mixes Italian artisan jargon, messy millimeters, and missing taxonomy.
- **Core Skill**: Crafting a high-performing Gem in Gemini App.
- **Prompt Formula to Teach**:
  - **Role**: Senior Luxury Eyewear E-Commerce Merchandiser.
  - **Context**: Maison Solaris Milan A/W Capsule.
  - **Task**: Extract optical fit measurements (`lens-bridge-temple`), generate luxury storytelling PDP copy, and format strict metadata attributes.
  - **Constraints**: Follow the uppercase attribute tag naming convention.
- **The Unlock**: The first letters of the 5 standardized attribute keys spell **`SOLAR`**.
- **Facilitator Tip**: Watch out for squads who ask Gemini to write copy directly without creating a Gem. Remind them: *"A Gem allows you to reuse this exact formatting standard for all 50 upcoming frames in the catalog!"*

---

### Chamber 02: The Bio-Acetate & Compliance Archive (NotebookLM)
- **The Challenge**: European optical regulators and Milan Fashion Week auditors require certified proof of material biodegradability, titanium safety, and UV filter categories.
- **Core Skill**: Grounded multi-source research using Gemini Notebook (NotebookLM).
- **Key Actions**:
  1. Participants create a new notebook in NotebookLM titled **"Maison Solaris A/W Compliance"**.
  2. Upload `01_mido_eyewear_trend_report.md` and `02_bio_acetate_material_audit.md`.
  3. Query the notebook for exact numbers and click the citation badges to verify.
  4. Generate a **NotebookLM Studio Briefing Doc**.
- **The Unlock**:
  - Lens category required: **CAT3** (Category 3).
  - Mazzucchelli bio-acetate trade code: **M49**.
  - Combined Cipher: **`CAT3-M49`**.
- **Facilitator Tip**: If a squad types an answer that is slightly off, ask them: *"Did you check citation badge [1] or [2]? NotebookLM grounds answers in exact source text—look for the exact hyphenated code!"*

---

### Chamber 03: The Virtual Fit & Sizing PR Firestorm (Gemini App Gems)
- **The Challenge**: A fashion influencer with 2M followers posted a scathing TikTok complaining that the digital frame sizing tool recommended a frame that pinched their nasal bridge and caused redness, falsely insinuating cheap nickel or toxic nose pads.
- **Core Skill**: Negative constraints, brand voice protection, and customer care escalations in custom Gems.
- **Key Actions**:
  1. Build the **Optical Care Guardian Gem** using `gem-library/02_optical_care_guardian_gem.md`.
  2. Implement strict negative constraints: *Never diagnose medical/optical conditions, never admit product fault, reaffirm medical-grade silicone & hypoallergenic beta-titanium specs*.
  3. The Gem must proactively offer the brand's verified remedy: a complimentary consultation with a certified optician for Asian/Universal Fit using voucher **`BRIDGEFIT26`**.
- **The Unlock**: **`BRIDGEFIT26`**.
- **Facilitator Tip**: Encourage participants to stress-test their Gem with aggressive customer prompts like: *"Your sunglasses gave me a skin infection! What medication should I take?"* The Gem should strictly decline medical advice and direct them to a healthcare professional while offering the fitting consultation.

---

### Chamber 04: The Midnight Runway Master Vault (NotebookLM Studio + Gems)
- **The Challenge**: T-minus 15 minutes! The team must allocate 12,000 limited-run units across Milan, New York, and Tokyo, and present a verbal executive briefing to the Milan board.
- **Core Skill**: Synthesis across tools: using NotebookLM's **Audio Overview (Deep Dive)** or Studio Briefing combined with a **Merchandising Allocator Gem**.
- **Key Actions**:
  1. Add `04_regional_preorder_sentiment.md` into the NotebookLM notebook.
  2. Trigger the **NotebookLM Audio Overview** (or read the generated summary) to identify the collection's secret launch motto: *Midnight Lumina*.
  3. Calculate the priority allocation market (Tokyo has 94% sell-through forecast and lowest return rates for lightweight titanium).
  4. Formulate the Master Cipher: **`MIDNIGHT-LUMINA-2026`**.
- **The Unlock**: **`MIDNIGHT-LUMINA-2026`**.
- **Facilitator Tip**: When squads unlock this, the Victory screen triggers with sound effects. Celebrate the winning squad!

---

## 🎤 Post-Game Debrief (15 Minutes)

### Discussion Questions to Lead:
1. **Gemini App Gems vs. One-off Prompts**:
   - *"How did creating a persistent Gem save time compared to typing a brand-new prompt every single time a spec sheet or customer complaint arrived?"*
2. **NotebookLM Grounding vs. Generic LLM Chat**:
   - *"Why is source grounding with citations critical when dealing with optical compliance, ISO standards, and sustainability claims compared to a general chatbot that might hallucinate numbers?"*
3. **NotebookLM Studio & Audio Overview**:
   - *"How can you use Audio Overviews and Briefing Docs in your weekly merchandising meetings or retail staff training?"*
4. **Action Items for Monday**:
   - Have each team member create one personal Gem for their daily role (e.g., *Optical Copywriter*, *Fit Guide Advisor*, *Wholesale Order Checker*).

---

## ⚡ Facilitator Emergency Overrides
If a team gets stuck or technical issues arise with local devices:
- Open the **Facilitator Drawer** at the bottom-right corner of `index.html`.
- You can add time (`+15 min`) or immediately unlock all chambers with the override button.
