# 💎 Quick Reference Card: Gemini App Custom Gems
### Best Practices for Luxury E-Commerce, Nano Banana & PDF Knowledge

---

## 🏗️ The Anatomy of a High-Performance Gem

When creating a Gem in Google Gemini App (`gemini.google.com` -> Gem Manager), follow the **C-R-E-A-T-E-K** framework:

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. CONTEXT        │ Luxury Italian eyewear house, Milan A/W 26  │
├───────────────────┼─────────────────────────────────────────────┤
│ 2. ROLE           │ Senior Digital Merchandiser & Brand Guardian│
├───────────────────┼─────────────────────────────────────────────┤
│ 3. EXPECTED INPUT │ Raw technical factory notes, dimensions mm  │
├───────────────────┼─────────────────────────────────────────────┤
│ 4. ACTIONS        │ Convert to boxing notation, generate PDP    │
├───────────────────┼─────────────────────────────────────────────┤
│ 5. TOOLS          │ Enable Nano Banana (Image Generation)       │
├───────────────────┼─────────────────────────────────────────────┤
│ 6. EXCLUSIONS     │ No medical diagnoses, no generic buzzwords  │
├───────────────────┼─────────────────────────────────────────────┤
│ 7. KNOWLEDGE      │ Upload internal PDF blueprints & SOPs       │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎨 Harnessing Nano Banana (Image Generation) in Gems
- In Gem Manager, ensure **Image Generation** is toggled ON.
- Prompt structure for luxury eyewear renders:
  ```
  "Close-up editorial product photograph of [Model Name], resting on brushed Italian Carrara marble, dramatic directional studio lighting casting soft shadows, 85mm macro lens, photorealistic details showing brushed titanium grain and bio-acetate transparency, 4K quality."
  ```

---

## 📁 Grounding Gems with PDF Knowledge
- You can upload up to 10 files (PDFs, Docs, TXT) into a Gem's Knowledge tab.
- When querying, instruct the Gem:
  - *"Strictly reference Section X of the uploaded technical blueprints PDF to calculate..."*
  - This prevents generic hallucinations and enforces proprietary engineering standards.
