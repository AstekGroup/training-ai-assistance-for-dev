# MODULE 5 : Cadrer le développement assisté — harness, contrat de contexte et qualité sur le cycle

**Parcours** : Jour 3 — matin (~3 h 30)  
**Objectifs** : Formaliser le **harness** et le **contrat de contexte** ; intégrer **DESIGN.md** pour le cadrage UI ; utiliser l’IA pour débogage, optimisation, tests et revue de code sur des cas concrets.

---

## 🎯 Objectifs pédagogiques

- Définir le harness engineering et ses livrables utiles en projet (rules, skills, contrat de contexte, DESIGN.md)
- Rédiger et exploiter un contrat de contexte (piliers, MoSCoW, template, exemples API et UI)
- Enchaîner debug, perf, tests et review assistés par IA avec validation humaine

---

## 📅 Planning (demi-journée)


| Horaire           | Séquence                                      | Durée  | Contenu                              |
| ----------------- | --------------------------------------------- | ------ | ------------------------------------ |
| **9h15 - 10h15**  | **Harness engineering & contrat de contexte** | 60min  | Concepts, DESIGN.md, template, exemples |
| **10h15 - 10h30** | **☕ PAUSE**                                   | 15min  |                                      |
| **10h30 - 12h30** | **TP**                                        | 120min | Mise en application                  |


*L’après-midi du jour 3 est couvert par le **module 6** (méthodes de travail adaptées, TP de synthèse, clôture).*

---

## 📚 Contenu détaillé

### 1. Harness engineering & contrat de contexte

#### 1.1 Harness engineering

Le harness engineering est l'art de créer un **environnement de travail** pour les agents IA : règles, outils, périmètre, jeux de tests, documentation minimale, contrat de contexte, `DESIGN.md` (UI), etc.

Il permet d'orienter l'IA pour des résultats **précis, pertinents et utiles** — l'équivalent de « savoir conduire » l'agent.

#### 1.2 Le contrat de contexte

Le contrat de contexte est un document qui définit le contexte dans lequel un ou plusieurs agents doivent travailler.

C'est un **livrable projet** : référence entre parties prenantes (métier, archi, dev, QA).

Il peut nourrir un `AGENTS.md`, mais ce n'est pas sa vocation première : certaines informations peuvent être hors périmètre agent (multi-repo, contraintes organisationnelles).

Il indique les **must**, **should**, **would** et **won't** d'un contexte projet, structurés autour de 5 piliers.

Ce document peut exister à un niveau entreprise ou projet.

##### Priorisation MoSCoW (must / should / would / won't)

| Niveau | Signification | Exemple agent |
| ------ | ------------- | ------------- |
| **Must** | Non négociable — l'agent doit respecter | « Toute route API passe par le middleware d'auth existant » |
| **Should** | Fortement recommandé — écart justifié | « Préférer des composants React Server Components » |
| **Would** | Souhaitable si le budget le permet | « Ajouter des tests de charge sur le endpoint critique » |
| **Won't** | Hors périmètre explicite — ne pas proposer | « Pas de migration de base de données dans cette itération » |

##### Les 5 piliers du contrat de contexte

1. **Objectif** : un livrable mesurable, pas une intention vague
  - *Faible* : « Améliorer le checkout »
  - *Fort* : « Implémenter le paiement Stripe (PaymentIntent) sur `/checkout/pay`, avec retour webhook et mise à jour du statut commande »
2. **Contraintes** : limites vérifiables par l'agent
  - *Technique* : TypeScript strict, Next.js 15 App Router, pas de nouvelle dépendance sans ADR
  - *Business* : livraison en 2 sprints, périmètre limité au parcours invité
  - *Qualité* : couverture ≥ 80 % sur le module modifié, latence p95 < 300 ms
  - *Vibe coding* : MCP GitLab (issues #142–#148 uniquement), skill `context7` pour la doc Stripe
3. **Contexte** : ce que l'agent doit lire avant d'agir
  - *Existant* : monolithe Django 4.2, module `orders/` déjà en place, pas de cache Redis
  - *Équipe* : 2 devs full-stack, revue obligatoire par le lead avant merge
  - *Références* : `docs/adr/003-stripe.md`, `DESIGN.md` à la racine pour l'UI checkout
4. **Format** : structure des livrables attendus
  - *Ex.* : PR avec description (contexte / changements / tests), tests unitaires + 1 test d'intégration webhook, pas de refactor hors périmètre
5. **Validation** : critères de succès testables
  - *Ex.* : webhook `payment_intent.succeeded` met à jour `Order.status` ; contraste WCAG AA sur les écrans touchés ; CI verte

##### Template de contrat de contexte

```markdown
## CONTRAT DE CONTEXTE — [NOM DE LA MISSION]

### Objectif
[Un livrable précis : quoi, où dans le code, quel comportement attendu]

### Must / Should / Would / Won't
- **Must** : [...]
- **Should** : [...]
- **Would** : [...]
- **Won't** : [...]

### Contraintes
- Technique : [langages, frameworks, patterns imposés]
- Business : [délais, scope, utilisateurs cibles]
- Qualité : [tests, perf, sécurité, accessibilité]
- Harness : [rules, skills, MCP autorisés et périmètre]

### Contexte
- Existant : [modules, dette connue, dépendances]
- Équipe : [rôles, process de revue]
- Références : [ADR, DESIGN.md, tickets, docs externes]

### Format attendu
[Structure de la réponse : fichiers touchés, type de PR, diagrammes si besoin]

### Critères de validation
[Checklist vérifiable : tests, métriques, conformité design, revue humaine]
```

##### Exemple complet — feature API (sans UI)

```markdown
## CONTRAT DE CONTEXTE — Agent « Paiement Stripe »

### Objectif
Ajouter le endpoint `POST /api/v1/orders/{id}/pay` qui crée un PaymentIntent Stripe
et persiste `stripe_payment_intent_id` sur la commande.

### Must / Should / Would / Won't
- **Must** : réutiliser `StripeClient` dans `lib/payments/` ; valider le montant côté serveur
- **Should** : journaliser les erreurs Stripe avec `correlation_id` existant
- **Would** : test de charge léger (100 req/s) si le temps le permet
- **Won't** : pas de refonte du modèle `Order` ; pas de support multi-devises

### Contraintes
- Technique : Python 3.12, FastAPI, pytest ; secrets via variables d'environnement uniquement
- Business : sprint en cours, tickets GitLab #142–#145
- Qualité : couverture ≥ 85 % sur `orders/payments.py` ; pas de clé API en log
- Harness : skill `stripe-docs` ; MCP GitLab lecture seule sur le projet `ecommerce-api`

### Contexte
- Existant : module `orders/` opérationnel, auth JWT déjà en place
- Références : `docs/adr/003-stripe.md`, doc Stripe PaymentIntents (via Context7)

### Format attendu
- 1 PR : description + liste des fichiers ; tests unitaires + mock Stripe

### Critères de validation
- [ ] PaymentIntent créé avec le bon `amount` et `currency`
- [ ] Webhook testé avec payload fixture
- [ ] Revue lead + CI verte
```

##### Exemple complet — feature UI (avec DESIGN.md)

```markdown
## CONTRAT DE CONTEXTE — Agent « Checkout UI »

### Objectif
Créer l'écran `/checkout/pay` : récapitulatif commande, bouton « Payer »,
états loading / erreur / succès.

### Must / Should / Would / Won't
- **Must** : respecter `DESIGN.md` (tokens et Do's and Don'ts) ; mobile-first
- **Should** : composants du dossier `components/ui/` existant
- **Would** : animation de transition sur le bouton primaire
- **Won't** : pas de librairie UI additionnelle ; pas de dark mode dans ce sprint

### Contraintes
- Technique : React 19, Tailwind v4 ; exporter les tokens via `npx @google/design.md export`
- Qualité : contraste WCAG AA ; tests RTL sur le flux principal
- Harness : `AGENTS.md` + `DESIGN.md` à la racine ; MCP navigateur pour capture d'écran

### Contexte
- Références : `./DESIGN.md` (source de vérité visuelle), maquette Figma lien interne
- Existant : layout `app/(shop)/layout.tsx`, hook `useCheckout()` prêt

### Format attendu
- Composants dans `app/checkout/` ; story ou capture pour la gate design

### Critères de validation
- [ ] `npx @google/design.md lint DESIGN.md` sans erreur
- [ ] Bouton primaire conforme au token `button-primary`
- [ ] Revue design + tests verts
```

#### 1.3 DESIGN.md — contrat visuel pour les agents

[DESIGN.md](https://github.com/google-labs-code/design.md) est une spécification ouverte (Google Labs, Apache-2.0) pour décrire une **identité visuelle** aux agents de code. C'est un livrable de harness spécialisé UI : une source de vérité persistante, versionnable et lisible par humains et machines.

**Pourquoi l'ajouter au harness ?** Sans contrat visuel, l'agent improvise couleurs, espacements et composants à chaque session — d'où des écarts de marque et des régressions d'accessibilité. DESIGN.md ancre l'agent sur des **valeurs normatives** et un **rationale** explicite.

##### Deux couches complémentaires

| Couche | Rôle | Contenu |
| ------ | ---- | ------- |
| **YAML front matter** | Valeurs machine | Tokens : `colors`, `typography`, `spacing`, `rounded`, `components` |
| **Corps Markdown** | Rationale humain | 8 sections canoniques dans l'ordre : Overview, Colors, Typography, Layout, Elevation, Shapes, Components, Do's and Don'ts |

Les tokens sont **normatifs** (ex. `primary: "#1A1C1E"`). La prose explique **pourquoi** et **comment** les appliquer (ex. « le tertiary est réservé à l'action principale unique par écran »).

##### Lien avec le contrat de contexte

| Document | Portée | Audience |
| -------- | ------ | -------- |
| **Contrat de contexte** | Mission en cours (objectif, périmètre, validation) | Métier, archi, dev, QA |
| **DESIGN.md** | Système de design du produit (identité visuelle stable) | Design, front, agents UI |
| **AGENTS.md** | Règles de comportement de l'agent (coding standards) | Dev, agents |

Dans un contrat de contexte UI, référencer explicitement `DESIGN.md` dans le pilier **Contexte** et l'inclure dans les **Must** (conformité tokens + Do's and Don'ts).

##### Outils CLI

```bash
npx @google/design.md lint DESIGN.md          # structure, références, contraste WCAG
npx @google/design.md export --format tailwind DESIGN.md  # thème Tailwind
npx @google/design.md spec                    # spec injectable dans un prompt agent
```

Intégrer `lint` en CI pour bloquer les régressions visuelles — comme un test de contrat.

##### Extrait minimal de DESIGN.md

```yaml
---
name: Ma Marque
colors:
  primary: "#1A1C1E"
  tertiary: "#B8422E"
typography:
  body-md:
    fontFamily: Public Sans
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
rounded:
  sm: 4px
  md: 8px
components:
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
    padding: 12px
---

## Overview
Interface professionnelle et aérée ; une seule action primaire par écran.

## Do's and Don'ts
- Do : utiliser tertiary uniquement pour le CTA principal
- Don't : mélanger coins arrondis et angles vifs sur la même vue
```

### 2. IA pour le cycle de développement complet

#### 2.1 Débogage assisté par IA

**Techniques** :

- Analyse automatique des stack traces
- Détection de patterns d'erreurs
- Suggestions de correctifs contextualisés

**Exemple** : déboguer une application avec bugs multiples.

#### 2.2 Optimisation de code

**Domaines** :

- Performance (complexité, hotspots)
- Lisibilité (refactoring, naming)
- Maintenabilité (découplage, SOLID)

**Exemple** : optimiser du code legacy.

#### 2.3 Génération de tests

**Types** :

- Tests unitaires, intégration, end-to-end
- Cohérence des données, jeux de données de test

**Exemple** : générer une suite de tests sur un module critique.

#### 2.4 Revue de code assistée

**Aspects** :

- Revue de PR / MR
- Conventions, sécurité (OWASP), performance, maintenabilité, documentation

**Exemple** : revue structurée d'une MR complète.

---

## TP

Mise en œuvre d'un cycle de développement complet de la fonctionnalité à la revue de code avec un harness complet (rules, skills, contrat de contexte ; DESIGN.md si périmètre UI)

## 🔗 Enchaînement

**Module 6** : méthodes de travail adaptées (stage gate), TP final multi-agents, synthèse et évaluation.