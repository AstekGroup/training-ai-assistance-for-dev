# Formation Vibe Coding — Présentation du cursus (source de vérité)

> **⚠️ SOURCE DE VÉRITÉ** — contenu aligné sur `COURS/MODULE_*.md`.
> Les textes détaillés vivent dans `site/src/meetup/data/course-content.ts` et s'affichent via modales / accordéons.

---

## Méta

- **Édition** : Formation Astek · ILAB
- **Titre** : Vibe Coding : Outils IA pour Développeurs
- **Durée** : 3 jours · 6 modules · ~7 h/jour
- **Speaker** : Philippe Pary · philippe.pary@astek.net

## Deck — 35 slides (version full)

### Rythme par module

À chaque changement de module : **conclusion du module précédent** → **garde du module suivant** → contenu.

Exemple M1 : Garde M1 → 5 compétences → Prompt → **Conclusion M1** → Garde M2 → …

Les intercalaires **Jour 2** / **Jour 3** restent entre les paires de demi-journées (après conclusion M2, avant garde M3, etc.).

Données transitions : `site/src/meetup/data/module-transitions.ts`  
Composants : `slide-module-cover.tsx` (garde), `slide-module-conclusion.tsx` (bilan)

## Patterns interactifs

- **Modales** (`DetailDialog`) : outils, compétences, menaces sécurité, piliers contrat, stages Stage-Gate, planning modules
- **Accordéons** : bonnes pratiques M2, template contrat M5, cycle qualité M5, synthèse M6
- **Scroll** : panorama outillage (11 cartes)

## Glossaire

Voir `site/src/meetup/data/glossary.ts` — Vibe Coding, MCP, Harness, Contrat, BMAD, Stage-Gate, Drift, AGENTS.md, Skills.
