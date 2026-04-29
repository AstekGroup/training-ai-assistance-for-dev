# MODULE 5 : Cadrer le développement assisté — harness, contrat de contexte et qualité sur le cycle

**Parcours** : Jour 3 — matin (~3 h 30)  
**Objectifs** : Formaliser le **harness** et le **contrat de contexte** ; utiliser l’IA pour débogage, optimisation, tests et revue de code sur des cas concrets.

---

## 🎯 Objectifs pédagogiques

- Définir le harness engineering et ses livrables utiles en projet
- Rédiger et exploiter un contrat de contexte (piliers, template)
- Enchaîner debug, perf, tests et review assistés par IA avec validation humaine

---

## 📅 Planning (demi-journée)


| Horaire           | Séquence                                      | Durée  | Contenu                              |
| ----------------- | --------------------------------------------- | ------ | ------------------------------------ |
| **9h15 - 10h15**  | **Harness engineering & contrat de contexte** | 60min  | Concepts, template, exemples         |
| **10h15 - 10h30** | **☕ PAUSE**                                   | 15min  |                                      |
| **10h30 - 12h30** | **IA : debug, optim, tests, review**          | 120min | Techniques + exercice pratique guidé |


*L’après-midi du jour 3 est couvert par le **module 6** (méthodes de travail adaptées, TP de synthèse, clôture).*

---

## 📚 Contenu détaillé

### 1. Harness engineering & contrat de contexte

#### 1.1 Harness engineering

Le harness engineering est l'art de créer un **environnement de travail** pour les agents IA : règles, outils, périmètre, jeux de tests, documentation minimale, etc.

Il permet d'orienter l'IA pour des résultats **précis, pertinents et utiles** — l'équivalent de « savoir conduire » l'agent.

#### 1.2 Le contrat de contexte

Le contrat de contexte est un document qui définit le contexte dans lequel un ou plusieurs agents doivent travailler.

C'est un **livrable projet** : référence entre parties prenantes (métier, archi, dev, QA).

Il peut nourrir un `AGENTS.md`, mais ce n'est pas sa vocation première : certaines informations peuvent être hors périmètre agent (multi-repo, contraintes organisationnelles).

##### Les 5 piliers du contrat de contexte

1. **Objectif** : clarifier l'objectif attendu
  *Ex. : « Concevoir une architecture microservices pour une application e-commerce »*
2. **Contraintes** : limitations et exigences
  *Ex. : stack Python/FastAPI, cloud AWS, budget, skills imposés*
3. **Contexte** : projet, existant, équipe
  *Ex. : monolithe actuel, charge, taille d'équipe*
4. **Format** : structure des livrables
  *Ex. : diagramme C4, ADR, fichiers de config*
5. **Validation** : critères de succès
  *Ex. : SOLID, tests > 80 %, documentation*

##### Template de contrat de contexte

```markdown
## CONTRAT DE CONTEXTE [NOM DE L'AGENT]

### Objectif
[But précis à atteindre]

### Contraintes
- Technique : [langages, frameworks, outils]
- Business : [délais, budget, scope]
- Qualité : [couverture tests, performance, sécurité]
- Vibe coding : [skills, MCP]

### Contexte
[Informations sur le projet, l'équipe, l'existant]

### Format attendu
[Structure de la réponse souhaitée]

### Critères de validation
[Comment mesurer le succès]
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

## 🔗 Enchaînement

**Module 6** : méthodes de travail adaptées (stage gate), TP final multi-agents, synthèse et évaluation.