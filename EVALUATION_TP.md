# Grilles d'évaluation des TP — Formation `training-ai-assistance-for-dev`

Ce document fournit au formateur des grilles d'évaluation standardisées pour objectiver la mise en pratique, par chaque apprenant, des points abordés dans les six modules de la formation.

## But du document

- Évaluer la maîtrise pratique des concepts vus en cours à travers les TP réalisés.
- Garder une trace écrite et objective des acquis / non acquis par module.
- Identifier les axes de progression individuels en fin de formation.

## Mode d'emploi

- Une grille par module, à remplir par apprenant à l'issue du / des TP du module.
- Cocher la case `Acquis` lorsque le critère est validé sans réserve majeure.
- Utiliser la colonne `Commentaire formateur` pour préciser les éléments observés (points forts, écarts, conseils).
- Conclure chaque module par un **niveau global** (Acquis / Non acquis) et un commentaire de synthèse.
- Le tableau de synthèse final permet une vue d'ensemble sur les 6 modules.

## Légende

- `[ ]` — Non acquis
- `[x]` — Acquis

---

## Identification de l'apprenant

| Champ              | Valeur |
| ------------------ | ------ |
| Nom / Prénom       |        |
| Société / Équipe   |        |
| Date d'évaluation  |        |
| Formateur          |        |
| Lab / projet choisi (M2) |        |
| Projet final choisi (M6) |        |

---

## Module 1 — Structurer le Vibe Coding et le prompt engineering

**TP évalué** : Todo app progressive (exercice guidé sur l'IDE agentique).

**Objectifs pédagogiques rappelés** :

- Maîtriser le framework des 5 compétences du Vibe Coding.
- Appliquer le prompt engineering aux contraintes d'entreprise.
- Distinguer assistance IA et projet IA.

| Critère                                                                                  | Acquis | Commentaire formateur |
| ---------------------------------------------------------------------------------------- | :----: | --------------------- |
| Thinking : raisonnement structuré avant le premier prompt                                | [ ]    |                       |
| Prompting : premier prompt précis, contraintes métier explicites (stack, conformité)     | [ ]    |                       |
| Tools : usage maîtrisé de l'IDE agentique (modes, navigation, agent)                     | [ ]    |                       |
| Context : gestion de la fenêtre de conversation, reset après feature majeure             | [ ]    |                       |
| Review : relecture critique du plan agent et validation humaine du code généré           | [ ]    |                       |
| Évite les rôles génériques contre-productifs (« tu es un expert X »)                     | [ ]    |                       |
| Todo app progressive livrée et fonctionnelle                                             | [ ]    |                       |

**Niveau global du module 1** : `[ ]` Acquis  `[ ]` Non acquis

**Commentaire de synthèse** :

>

---

## Module 2 — Intensifier la pratique : outillage, Git, labs et garde-fous

**TP évalué** : Labs (mini-projets vibe coding) — au choix parmi blog statique, dashboard, API CRUD, documentation uniformisée, tests, optimisation.

**Objectifs pédagogiques rappelés** :

- Utiliser l'agent sur plusieurs types de livrables.
- Mettre en place des pratiques Git compatibles multi-agents et revue.
- Appliquer des garde-fous entreprise (sécurité, perf, architecture, tests).

| Critère                                                                                   | Acquis | Commentaire formateur |
| ----------------------------------------------------------------------------------------- | :----: | --------------------- |
| Livrable du lab fonctionnel et conforme aux attendus du sujet choisi                      | [ ]    |                       |
| Commits fréquents permettant des points de retour en cas de dérive de l'agent             | [ ]    |                       |
| Branches par fonctionnalité et conventions de commits respectées                          | [ ]    |                       |
| Usage `gh` / `glab` en CLI à bon escient (vs surcouche MCP)                               | [ ]    |                       |
| Garde-fous OWASP / sécurité pris en compte sur le livrable                                | [ ]    |                       |
| Prise en compte performance / Clean Architecture selon le sujet                           | [ ]    |                       |

**Niveau global du module 2** : `[ ]` Acquis  `[ ]` Non acquis

**Commentaire de synthèse** :

>

---

## Module 3 — Concevoir la stack agent : Rules, Skills et MCP

**TP évalué** : Configuration `AGENTS.md` + `SKILL.md` + intégration d'un premier MCP.

**Objectifs pédagogiques rappelés** :

- Comprendre l'anatomie d'un agent (LLM + Rules + Skills + Contexte + Mode).
- Configurer un fichier `AGENTS.md`, des skills et un serveur MCP de base.
- Choisir modèle et mode selon le use case.

| Critère                                                                                | Acquis | Commentaire formateur |
| -------------------------------------------------------------------------------------- | :----: | --------------------- |
| `AGENTS.md` rédigé, lisible et testé concrètement avec l'agent                         | [ ]    |                       |
| `SKILL.md` valide, référence la spec agentskills.io, testé avec l'agent                | [ ]    |                       |
| Serveur MCP choisi, configuré et intégré avec rules / skills                           | [ ]    |                       |
| MCP testé et résultat exploitable observé                                              | [ ]    |                       |
| Stratégies anti-drift appliquées (Rules plutôt que prompts longs, reset conversation)  | [ ]    |                       |

**Niveau global du module 3** : `[ ]` Acquis  `[ ]` Non acquis

**Commentaire de synthèse** :

>

---

## Module 4 — Industrialiser les agents : MCP avancés et sécurité opérationnelle

**TP évalué** : Configuration de 1 à 2 serveurs MCP avancés + analyse sécurité.

**Objectifs pédagogiques rappelés** :

- Brancher des serveurs MCP représentatifs (doc, forge, navigateur / tests).
- Identifier menaces et défenses sur les agents IA.

| Critère                                                                                          | Acquis | Commentaire formateur |
| ------------------------------------------------------------------------------------------------ | :----: | --------------------- |
| Périmètre autorisé documenté dans rules / skills (repos, branches, secrets jamais en prompt)     | [ ]    |                       |
| Identification correcte des menaces (prompt injection, hallucination, data leakage, hijacking)   | [ ]    |                       |
| Input validation appliquée (filtrage sources, contrôle du code récupéré)                         | [ ]    |                       |
| Output filtering : relecture humaine du code et des commentaires générés                         | [ ]    |                       |
| Sandboxing / monitoring envisagés ou mis en place selon le risque                                | [ ]    |                       |
| Justifie le choix MCP vs CLI (`gh` / `glab`) selon latence, bruit, périmètre                     | [ ]    |                       |

**Niveau global du module 4** : `[ ]` Acquis  `[ ]` Non acquis

**Commentaire de synthèse** :

>

---

## Module 5 — Cadrer le développement assisté : harness et qualité sur le cycle

**TP évalué** : Exercice pratique guidé — debug, optimisation, tests, revue de code assistés par IA.

**Objectifs pédagogiques rappelés** :

- Définir un harness engineering opérationnel.
- Enchaîner debug, perf, tests et review assistés par IA avec validation humaine.

| Critère                                                                                       | Acquis | Commentaire formateur |
| --------------------------------------------------------------------------------------------- | :----: | --------------------- |
| Harness en place : règles, outils, périmètre, jeux de tests, documentation minimale           | [ ]    |                       |
| Débogage assisté : analyse de stack traces, détection de patterns, fix contextualisé          | [ ]    |                       |
| Optimisation : performance, lisibilité (refactoring, naming), maintenabilité SOLID            | [ ]    |                       |
| Génération de tests pertinents (unitaires / intégration / e2e) avec données de test cohérentes | [ ]    |                       |
| Revue de code assistée : conventions, OWASP, performance, maintenabilité, documentation       | [ ]    |                       |
| Validation humaine effective à chaque étape du cycle                                          | [ ]    |                       |

**Niveau global du module 5** : `[ ]` Acquis  `[ ]` Non acquis

**Commentaire de synthèse** :

>

---

## Module 6 — Pratiquer des méthodes de travail adaptées (TP final)

**TP évalué** : TP final collaboratif multi-agents — projet au choix (plateforme code review automatisée / réseau social d'entreprise / système de monitoring).

**Objectifs pédagogiques rappelés** :

- Orchestrer plusieurs rôles / agents sur un livrable unique.
- Analyser de manière critique limites et opportunités de l'IA en développement.

| Critère                                                                                              | Acquis | Commentaire formateur |
| ---------------------------------------------------------------------------------------------------- | :----: | --------------------- |
| Configuration claire des agents par rôle (prompts, rules, contrats de contexte par rôle)             | [ ]    |                       |
| Orchestration effective des 5 rôles : PO, Architecte, Dev, QA, Code Reviewer                         | [ ]    |                       |
| Sprint 1 livré : MVP avec stories, design, implémentation, tests, review                             | [ ]    |                       |
| Sprint 2 livré : enrichissement, optimisations, documentation                                        | [ ]    |                       |
| Sprint 3 livré : finalisation et démo                                                                | [ ]    |                       |
| Démonstration structurée et claire (~10 min) devant le groupe                                        | [ ]    |                       |
| Analyse critique exprimée : limites et opportunités de l'IA observées sur le projet                  | [ ]    |                       |

**Niveau global du module 6** : `[ ]` Acquis  `[ ]` Non acquis

**Commentaire de synthèse** :

>

---

## Synthèse finale

| Module | Intitulé                                                                              | Niveau global (Acquis / Non acquis) | Observation clé |
| :----: | ------------------------------------------------------------------------------------- | :---------------------------------: | --------------- |
| 1      | Structurer le Vibe Coding et le prompt engineering en contexte entreprise             |                                     |                 |
| 2      | Intensifier la pratique : outillage, Git d'équipe, labs et garde-fous                 |                                     |                 |
| 3      | Concevoir la stack agent : anatomie, Rules, Skills et premières intégrations MCP      |                                     |                 |
| 4      | Industrialiser les agents : MCP avancé et sécurité opérationnelle                     |                                     |                 |
| 5      | Cadrer le développement assisté : harness et qualité sur le cycle                     |                                     |                 |
| 6      | Pratiquer des méthodes de travail adaptées                                            |                                     |                 |

### Appréciation globale du formateur

>

### Points forts identifiés

-
-
-

### Axes de progression recommandés

-
-
-

### Suite recommandée

>

---

*Document d'évaluation — Formation `training-ai-assistance-for-dev`.*
