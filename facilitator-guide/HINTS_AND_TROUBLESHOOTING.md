# 💡 Tiered Hints & Troubleshooting Playbook

This guide contains the exact hint progression for each room. In the interactive terminal (`index.html`), requesting a hint automatically logs a **3-minute time deduction**. Facilitators can also provide these verbal hints when roaming between squads.

---

## 🚪 Chamber 01: Scrambled Optical Catalog

### When Squads are Stuck:
- **Symptom**: Squad is stuck prompting Gemini with generic questions like *"What is the password?"*
- **Diagnosis**: They haven't set up the custom Gem with System Instructions.
- **Action**: Direct them to `gem-library/01_eyewear_catalog_gem.md` and instruct them to copy the system prompt into the Gemini Gem manager.

### Hint Tiers:
* **Tier 1 (Nudge - 3m penalty)**:
  > *"Examine the structured metadata tags requested in the student worksheet. The prompt instructions require you to label 5 core optical attributes."*
* **Tier 2 (Clue - 3m penalty)**:
  > *"Look at the first letters of each standardized attribute key: [S]ilhouette, [O]ptical fit, [L]ens tech, [A]cetate origin, [R]ating UV. Put those 5 initials together."*
* **Tier 3 (Full Reveal - 3m penalty)**:
  > *"The override cipher for Chamber 01 is `SOLAR`."*

---

## 🚪 Chamber 02: Bio-Acetate & Compliance Archive

### When Squads are Stuck:
- **Symptom**: The squad is searching Google or asking Gemini general questions and getting conflicting answers about sunglasses categories.
- **Diagnosis**: They haven't created a Notebook in NotebookLM or haven't uploaded the two markdown source files.
- **Action**: Remind them: *"This room requires Gemini Notebook (NotebookLM). General AI does not have Maison Solaris's private supplier audit!"*

### Hint Tiers:
* **Tier 1 (Nudge - 3m penalty)**:
  > *"Ask your NotebookLM notebook: 'What is the certified international sun lens filter category?' and 'What is Mazzucchelli's trade code for bio-acetate?' Look closely at the highlighted citations."*
* **Tier 2 (Clue - 3m penalty)**:
  > *"The sun lens filter category is `CAT3` (Category 3). The Mazzucchelli biodegradable acetate formula is `M49`. Combine them with a hyphen: `[LENS]-[MATERIAL]`."*
* **Tier 3 (Full Reveal - 3m penalty)**:
  > *"The override cipher for Chamber 02 is `CAT3-M49`."*

---

## 🚪 Chamber 03: Virtual Try-On & PR Fit Crisis

### When Squads are Stuck:
- **Symptom**: The Gem's response either gives medical advice (e.g., *"Take an ibuprofen for headaches"*) or admits company fault without offering the correct fit solution.
- **Diagnosis**: Missing negative constraints in the Gem's System Instructions.
- **Action**: Have them review the "Negative Constraints & Legal Guardrails" section in `gem-library/02_optical_care_guardian_gem.md`.

### Hint Tiers:
* **Tier 1 (Nudge - 3m penalty)**:
  > *"Review the brand tone playbook in `rooms/room-3-fit-crisis/brand_tone_playbook.md`. What specific promo code must customer care offer to arrange a free Asian/Universal fit consultation?"*
* **Tier 2 (Clue - 3m penalty)**:
  > *"The promo code is composed of the anatomical fit term ('BRIDGEFIT') followed by the two-digit year of the collection."*
* **Tier 3 (Full Reveal - 3m penalty)**:
  > *"The override cipher for Chamber 03 is `BRIDGEFIT26`."*

---

## 🚪 Chamber 04: Midnight Runway Master Vault

### When Squads are Stuck:
- **Symptom**: Squad has solved the inventory split for Tokyo, but cannot find the secret collection theme phrase.
- **Diagnosis**: They haven't triggered the NotebookLM Studio Audio Overview or generated the Briefing Doc.
- **Action**: Guide them to open the NotebookLM Studio panel on the right side and click **"Generate Audio Overview"** or **"Briefing Doc"**.

### Hint Tiers:
* **Tier 1 (Nudge - 3m penalty)**:
  > *"In your NotebookLM Studio panel, generate the Audio Overview or the executive Briefing Doc. Listen to or read the first two minutes: the hosts discuss the runway capsule's secret code name."*
* **Tier 2 (Clue - 3m penalty)**:
  > *"The formula is `[RUNWAY_THEME]-[CAPSULE_CODE]-[YEAR]`. The theme is MIDNIGHT, the hero design code is LUMINA, and the year is 2026."*
* **Tier 3 (Full Reveal - 3m penalty)**:
  > *"The Master Deployment cipher for Chamber 04 is `MIDNIGHT-LUMINA-2026`."*
