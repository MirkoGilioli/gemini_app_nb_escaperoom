# 🤫 Solutions & Spoilers: Master Answer Key
### For Facilitators Only — DO NOT Distribute to Participants

---

## 🔑 Quick Reference Master Key Table

| Chamber | Challenge Focus | Primary Tool | Accepted Master Ciphers |
| :---: | :--- | :--- | :--- |
| **01** | Scrambled Optical Catalog | Gemini App Gems | `SOLAR` *(or `SOLARIS`)* |
| **02** | Bio-Acetate & Compliance Archive | Gemini Notebook (NotebookLM) | `CAT3-M49` *(or `CAT3M49`, `CAT 3-M49`)* |
| **03** | Virtual Try-On & PR Fit Crisis | Gemini App Gems | `BRIDGEFIT26` *(or `BRIDGEFIT-26`)* |
| **04** | Midnight Runway Master Vault | NotebookLM Studio + Gems | `MIDNIGHT-LUMINA-2026` |

---

## 🔍 Detailed Chamber Solutions

### Chamber 01: The Scrambled Optical Catalog
* **Input File**: `rooms/room-1-frame-chaos/raw_factory_specs.txt`
* **Gem Used**: `gem-library/01_eyewear_catalog_gem.md` (Luxury Eyewear Merchandiser Gem)
* **Puzzle Logic**:
  The student's worksheet (`rooms/room-1-frame-chaos/student_worksheet.md`) instructs the Gem to output structured taxonomy tags for *The Solstice Aviator*.
  Specifically, 5 standardized attribute keys must be extracted:
  1. **S**ilhouette: Aviator / Teardrop Pilot
  2. **O**ptical Fit: 54-18-145 (Lens 54mm, Bridge 18mm, Temple 145mm)
  3. **L**ens Technology: Polarized CR-39 Anti-Reflective
  4. **A**cetate / Material Origin: Belluno, Italy (Grade-5 Titanium + Bio-Acetate)
  5. **R**ating UV: Category 3 (UV400)
  
  Taking the first letter of each attribute: **S - O - L - A - R**.
* **Accepted Cipher**: `SOLAR`

---

### Chamber 02: The Bio-Acetate & Runway Compliance Archive
* **Input Files Ingested in NotebookLM**:
  - `notebook-sources/01_mido_eyewear_trend_report.md`
  - `notebook-sources/02_bio_acetate_material_audit.md`
* **Puzzle Logic**:
  Participants query their NotebookLM notebook with the forensic questions in `rooms/room-2-trend-dossier/notebook_tasks.md`:
  1. *Question 1*: "What is the certified international sun lens filter category required for the Milan outdoor daylight runway?"
     - *NotebookLM Grounded Citation*: Category 3 (CAT3), allowing 8% to 18% light transmission, meeting EN ISO 12312-1 standards.
  2. *Question 2*: "What is the exact proprietary formula code of Mazzucchelli's certified biodegradable cellulose acetate?"
     - *NotebookLM Grounded Citation*: M49 (100% biodegradable and recyclable according to ISO 14855).
  
  The formula requested on the worksheet is `[LENS_CATEGORY]-[MATERIAL_CODE]`.
* **Accepted Cipher**: `CAT3-M49`

---

### Chamber 03: The Virtual Fit & Sizing PR Firestorm
* **Input Scenario**: `rooms/room-3-fit-crisis/leaked_influencer_thread.md`
* **Gem Used**: `gem-library/02_optical_care_guardian_gem.md` (Optical Care Guardian Gem)
* **Puzzle Logic**:
  The participant must configure the Gem with specific brand guardrails:
  - Disclose that the brand frames use medical-grade, hypoallergenic silicone nose pads and nickel-free beta-titanium.
  - Never provide medical advice on headaches or nasal redness; advise consulting a certified optometrist.
  - To make amends and provide proactive customer care, offer the customer a complimentary personalized fitting consultation at any flagship store or digital optician with the promo code specified in the brand playbook: `BRIDGEFIT26` (Bridge Fit 2026).
  
  When testing the Gem with the simulated influencer customer prompt, the Gem must output this exact voucher code in its response.
* **Accepted Cipher**: `BRIDGEFIT26`

---

### Chamber 04: The Midnight Runway Master Vault
* **Input Files**:
  - `notebook-sources/04_regional_preorder_sentiment.md` (uploaded to NotebookLM)
  - `rooms/room-4-vault-launch/allocation_matrix.csv`
  - `gem-library/03_merchandise_allocator_gem.md`
* **Puzzle Logic**:
  This final room integrates both tools:
  1. **NotebookLM Audio Overview / Studio Briefing**: In the generated Audio Overview podcast or Briefing Doc, the AI co-hosts discuss the hero collection code name and runway theme: *"Midnight Lumina"*.
  2. **Inventory Optimization Gem**: The squad runs the allocation data through the Gem. The data shows:
     - **Milan**: 3,000 units (high local prestige, 82% pre-order rate).
     - **New York**: 4,000 units (high volume, 22% return risk for oversized frames).
     - **Tokyo**: 5,000 units (highest demand for titanium ultra-lightweight + universal bridge fit, 95% sell-through forecast, lowest 2.1% return rate).
  3. **The Master Password Formula**:
     - Format: `[RUNWAY_THEME]-[CAPSULE_CODE]-[YEAR]`
     - Theme: `MIDNIGHT`
     - Capsule Code: `LUMINA`
     - Year: `2026`
* **Accepted Cipher**: `MIDNIGHT-LUMINA-2026`

---

## 💡 Troubleshooting Common Player Mistakes

1. **Typos & Formatting**:
   The validation console script trims whitespace and is case-insensitive, but hyphens matter in `CAT3-M49` and `MIDNIGHT-LUMINA-2026`. If players enter `CAT 3 M49` or `MIDNIGHTLUMINA2026`, the regex in `terminal.js` accepts the most common variations.
2. **NotebookLM Hallucinations**:
   If players use regular web chat instead of NotebookLM, generic Gemini may guess random sunglasses categories (e.g., Cat 2 or Cat 4). Emphasize that **only NotebookLM grounded on the uploaded lab audit** contains the exact Maison Solaris specs.
3. **Timer Expiration**:
   If a team runs out of time, use the facilitator drawer to add 5 or 15 minutes, allowing them to experience the satisfying Room 4 breakthrough.
