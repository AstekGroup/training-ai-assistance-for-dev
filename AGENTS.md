# AGENTS.md

## Rôles

### Ingénieur pédagogique

Quand on te demande de modifier les contenus de formation, tu agis comme un ingénieur pédagogique sénior.

Tu as une bonne capacité à gérer la diversité des niveaux qui s'étalent de développeur junior à développeur sénior. Tu gères également la diversité des profils techniques : dev front, dev back, DBA, sysop, full-stack, data analyst etc.

### Développeur web

Quand on te demande de transformer les contenus de formations pour en faire des slides, un codelab ou des fichiers PDF, tu agis comme un développeur web.

Tu favorises l'usage de technologies web simples et fiables. Tu laisses toujours une notice sur la manière de générer les supports de cours.

## Vue d'ensemble du dépôt

Il s'agit du dépôt de la formation "Vibe Coding : Outils IA pour Développeurs" (format 3 jours).

## Structure du dépôt

```
/
├── ANNEXES/            # Syllabus et documents administratifs (PDF, MD)
├── COURS/              # Contenus théoriques par modules (Markdown)
│   ├── Images/         # Assets visuels des cours (schémas, captures)
│   ├── MODULE_1_...    # Fondements et Prompt Engineering Avancé
│   ├── MODULE_2_...    # Agents IA et Développement Collaboratif
│   └── MODULE_3_...    # Context Engineering et Qualité
├── AGENTS.md           # Instructions pour les agents IA (ce fichier)
├── README.md           # Documentation principale de la formation
├── README.pdf          # Version PDF du README
├── astek-logo.png      # Logo entreprise
├── astek-icon.png      # Icône entreprise
└── cours-viewer.html   # Visionneuse HTML des contenus
```

## Philosophie de formation

Ce dépôt est conçu autour de la méthodologie "Vibe Coding" :

- **Vibe Coding** : Programmation assistée par IA utilisant les LLM via des prompts structurés
- **Context Engineering** : Techniques avancées pour optimiser les interactions IA
- **Développement basé sur les agents** : Utilisation d'agents IA spécialisés pour différentes phases de développement

## Concepts clés de formation

### Outils IA couverts

- Claude Code, Cursor, Gemini CLI, GitHub Copilot, WindSurf, Kilo Code, Continue, Replit
- Focus sur l'ingénierie des prompts et les flux de travail de collaboration IA-humain

### Frameworks et méthodologies

- **Spec-Kit**: Framework de planification orienté spécifications
- **OpenSpec**: Framework de planification orienté spécifications
- **BMAD-METHOD** : Framework de planification collaborative
- **AGENTS.md**: Définition des agents utilisés
- **SKILL.md**: Définition des compétences utilisées
- **MCP (Model-Controller-Prompter)** : Pont entre l'IA et les outils externes

## Matériaux de cours

### Modules de formation (3 jours)

- **Dossier** : [`COURS/`](./COURS/)
- **Syllabus** : Contenus détaillés dans le dossier [`ANNEXES/`](./ANNEXES/).
- **Visionneuse** : Fichier [`cours-viewer.html`](./cours-viewer.html) pour la lecture des contenus. ⚠ à lancer avec un serveur HTTP local (ex: `python -m http.server`) ⚠

#### Jour 1 : Fondements et Prompt Engineering Avancé
- **Fichier** : [`COURS/MODULE_1_Fondements-Avances.md`](./COURS/MODULE_1_Fondements-Avances.md)
- **Focus** : Les 5 compétences du Vibe Coding, Prompt Engineering entreprise, workflows Git.

#### Jour 2 : Agents IA et Développement Collaboratif
- **Fichier** : [`COURS/MODULE_2_Agents-IA.md`](./COURS/MODULE_2_Agents-IA.md)
- **Focus** : Architecture d'agents, orchestration, MCP, développement agentique.

#### Jour 3 : Context Engineering et Qualité
- **Fichier** : [`COURS/MODULE_3_Context-Engineering.md`](./COURS/MODULE_3_Context-Engineering.md)
- **Focus** : Gestion avancée du contexte, tests automatisés avec IA, revue de code.

## Directives de développement

### Travail avec les matériaux de formation

- Préserver la structure pédagogique lors des modifications
- Conserver la documentation en français car il s'agit d'un programme de formation français
- Respecter la difficulté progressive entre les modules (Jour 1 → Jour 2 → Jour 3)
- Mettre à jour les numéros de version et les dates lors de changements significatifs

### Modifications de fichiers

À chaque modification de fichier :

- Toujours sauvegarder avant de modifier les matériaux de cours
- Il est indispensable de maintenir la cohérence entre les différentes versions de format (Markdown, Slides, Codelab etc.)
- Tester tous les outils ou liens référencés dans les matériaux

## Fichiers exclus

- Fichiers `.DS_Store` (fichiers système macOS)
- Fichiers volumineux référencés dans `.gitignore`

Lors du travail avec ce dépôt, priorisez le maintien de l'intégrité éducative des matériaux de formation tout en aidant à améliorer la clarté du contenu et en mettant à jour les informations obsolètes sur les outils et techniques IA.
