# 💎 Quick Reference Card: Gemini App Custom Gems
### Best Practices for Luxury E-Commerce & Retail Prompting

---

## 🏗️ The Anatomy of a High-Performance Gem

When creating a Gem in Google Gemini App (`gemini.google.com` -> Gem Manager), follow the **C-R-E-A-T-E** structure:

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. CONTEXT        │ Luxury Italian eyewear house, Milan A/W 26  │
├───────────────────┼─────────────────────────────────────────────┤
│ 2. ROLE           │ Senior Digital Merchandiser & Copywriter    │
├───────────────────┼─────────────────────────────────────────────┤
│ 3. EXPECTED INPUT │ Raw technical factory notes, dimensions mm  │
├───────────────────┼─────────────────────────────────────────────┤
│ 4. ACTIONS        │ Convert to boxing notation, generate PDP    │
├───────────────────┼─────────────────────────────────────────────┤
│ 5. TAXONOMY       │ Mandatory uppercase tags: SILHOUETTE, etc.  │
├───────────────────┼─────────────────────────────────────────────┤
│ 6. EXCLUSIONS     │ No medical diagnoses, no generic buzzwords  │
└─────────────────────────────────────────────────────────────────┘
```

---

## ⚡ 5 Golden Rules for Eyewear E-Commerce Gems

1. **Lock in the Boxing System Notation**:
   Always instruct the Gem to format optical sizing as `[Lens Width mm] - [Bridge Width mm] - [Temple Length mm]` (e.g., `54-18-145`). This prevents ambiguity on e-commerce filtering pages.
2. **Explicit Negative Constraints (Guardrails)**:
   LLMs are eager to please. If a customer complains of headaches or red marks, explicitly forbid the Gem from diagnosing conditions or recommending medications (e.g., *"You must never provide clinical advice or mention medications"*).
3. **Calibrate Luxury Tone**:
   Specify banned clichés: ban words like *"revolutionize"*, *"game-changing"*, *"must-have"*, *"stunning"*. Instruct the Gem to use sensory, architectural, and artisanal terminology (*"sculpted"*, *"tactile beveling"*, *"aerospace beta-titanium"*, *"pantoscopic angle"*).
4. **Use Few-Shot Examples**:
   Include at least one concrete example of an unpolished input and the exact ideal output. This anchors the Gem's formatting reliability by over 90%.
5. **Standardize Metadata Output**:
   Provide exact markdown or JSON keys so product information management (PIM) systems can ingest the AI output automatically.
