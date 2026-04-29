# MODULE 2 : Intensifier la pratique — outillage, Git d’équipe, labs et garde-fous

**Parcours** : Jour 1 — après-midi (~3 h 30)  
**Objectifs** : Consolider l’usage des IDE agentiques, ancrer Git + IA en équipe, enchaîner des mini-projets ; sécuriser et structurer avant d’aborder les agents (J2).

---

## 🎯 Objectifs pédagogiques

- Utiliser l’agent sur plusieurs types de livrables (UI, API, doc, tests, perf)
- Mettre en place des pratiques Git compatibles multi-agents et revue
- Appliquer des garde-fous entreprise (sécurité, perf, architecture, tests)

---

## 📅 Planning (demi-journée)


| Horaire           | Séquence                        | Durée  | Contenu                                                                              |
| ----------------- | ------------------------------- | ------ | ------------------------------------------------------------------------------------ |
| **13h30 - 14h00** | **Panorama outillage**          | 30min  | Cursor, Claude Code, Copilot, Antigravity, Continue, Windsurf : forces / cas d’usage |
| **14h00 - 14h30** | **Git + IA équipes**            | 30min  | Workflows, branches, MR/PR, conventions de commits                                   |
| **14h30 - 16h30** | **Ateliers (labs)**             | 120min | Mini-projets vibe coding (voir ci-dessous)                                           |
| **16h30 - 16h45** | **☕ PAUSE**                     | 15min  |                                                                                      |
| **16h45 - 17h15** | **Bonnes pratiques entreprise** | 30min  | OWASP, perf, Clean Architecture, pièges TDD / tests avec LLM                         |
| **17h15 - 17h30** | **Challenge overnight**         | 15min  | « Agent simulator » : concevoir 3 agents spécialisés (préparation J2)                |


---

## 📚 Contenu détaillé

### 1. Panorama outillage (rappel ciblé)

Complément au module 1 : choisir l’outil selon le poste (plan vs agent, intégration Git, MCP, modèle). Pas d’exhaustivité marketing : l’objectif est de **savoir trancher** pour la suite de la formation.

### 2. Git + IA pour équipes

- **Commiter souvent** : points de retour si l’agent part dans une mauvaise direction
- **Respecter un git workflow** même en solo : branches par fonctionnalité pour lancer plusieurs agents ou expérimentations en parallèle
- Utiliser `gh` / `glab` en CLI lorsque c’est suffisant (éviter la surcouche MCP quand la latence ou le bruit contextuel pénalisent)
- Workflows collaboratifs : multi-branches, MR/PR, résolution de conflits assistée
- Revues automatisées et **conventions de commits** alignées projet

### 3. Ateliers (labs)

**Objectif** : monter en intensité sur l’agent + Git.

#### Exemple 1 : Blog statique

Créer un générateur de blog statique avec IA.  
**Livrables** : site fonctionnel, générateur de contenu.

#### Exemple 2 : Dashboard simple

Tableau de bord avec visualisation de données.  
**Livrables** : dashboard interactif, graphiques.

#### Exemple 3 : API CRUD

API REST avec persistance.  
**Livrables** : API fonctionnelle, documentation type Swagger / OpenAPI.

#### Exemple 4 : Documentation uniformisée

Trouver un prompt efficace pour documenter des projets existants de façon homogène.  
**Livrables** : doc générée, templates réutilisables.

#### Exemple 5 : Tests

Rédiger des tests pour du code existant.  
**Livrables** : tests unitaires / intégration / perf / sécurité, cahier de recette pour le fonctionnel.

#### Exemple 6 : Optimisation

Optimiser du code existant (perf, dette).  
**Livrables** : factorisation, audit sécurité, rapport perf, accessibilité si pertinent.

*Le formateur ajuste le nombre d’exemples traités selon le niveau du groupe.*

### 4. Bonnes pratiques entreprise

- **Merge / hooks** : règles de merge, messages de commit, pre-commit / CI (lint, tests)
- **Sécurité** : OWASP Top 10, couverture, duplication, analyse statique
- **Performance** : optimisation assistée sans « magie » aveugle
- **Clean Architecture** : SOLID, hexagonal, DDD selon contexte
- **Tests** : vigilance TDD avec LLM ; risque de modification des tests ou du code sans validation explicite
- **Points de vigilance** : compression de contexte, perte d’info, hallucinations, prise en compte tardive des nouveaux fichiers

### 5. Challenge overnight

Concevoir **3 agents spécialisés** (rôles, inputs, outputs) en préparation du **module 3** (anatomie d’agent, Rules, Skills, MCP).

---

## 🔗 Enchaînement

**Module 3** : retour sur le challenge, théorie des agents, premières configurations Rules / Skills / MCP.