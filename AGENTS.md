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
├── COURS/              # Contenus théoriques par modules (Markdown), 6 modules sur 3 jours
│   ├── Images/         # Assets visuels des cours (schémas, captures)
│   ├── MODULE_1_...    # J1 matin — Structurer (Vibe Coding, prompt)
│   ├── MODULE_2_...    # J1 pm — Intensifier (outillage, Git, labs)
│   ├── MODULE_3_...    # J2 matin — Concevoir (agents, MCP socle)
│   ├── MODULE_4_...    # J2 pm — Industrialiser (MCP, sécu, BMAD)
│   ├── MODULE_5_...    # J3 matin — Cadrer (harness, contrat, qualité)
│   └── MODULE_6_...    # J3 pm — Pratiquer (stage gate, TP final)
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

### Modules de formation (3 jours, 6 demi-journées)

- **Dossier** : `[COURS/](./COURS/)`
- **Syllabus** : Contenus détaillés dans le dossier `[ANNEXES/](./ANNEXES/)`.
- **Visionneuse** : Fichier `[cours-viewer.html](./cours-viewer.html)` pour la lecture des contenus. ⚠ à lancer avec un serveur HTTP local (ex: `python -m http.server`) ⚠

#### Jour 1

- **Module 1** — `[COURS/MODULE_1_Structurer-Vibe-Coding-Prompt.md](./COURS/MODULE_1_Structurer-Vibe-Coding-Prompt.md)` : Vibe Coding, 5 compétences, prompt engineering entreprise, exercice guidé.
- **Module 2** — `[COURS/MODULE_2_Intensifier-Pratique-Outils-Git.md](./COURS/MODULE_2_Intensifier-Pratique-Outils-Git.md)` : outillage, Git + IA, labs, bonnes pratiques, challenge overnight.

#### Jour 2

- **Module 3** — `[COURS/MODULE_3_Concevoir-stack-agent-MCP.md](./COURS/MODULE_3_Concevoir-stack-agent-MCP.md)` : anatomie d’agent, Rules, Skills, premier MCP.
- **Module 4** — `[COURS/MODULE_4_Industrialiser-agents-MCP-securite-BMAD.md](./COURS/MODULE_4_Industrialiser-agents-MCP-securite-BMAD.md)` : MCP avancé, sécurité des agents, BMAD-METHOD.

#### Jour 3

- **Module 5** — `[COURS/MODULE_5_Cadrer-developpement-harness-qualite.md](./COURS/MODULE_5_Cadrer-developpement-harness-qualite.md)` : harness, contrat de contexte, debug / tests / review assistés.
- **Module 6** — `[COURS/MODULE_6_Pratiquer-methodes-travail-adaptees.md](./COURS/MODULE_6_Pratiquer-methodes-travail-adaptees.md)` : stage gate, TP final multi-agents, conclusion.

## Directives de développement

### Travail avec les matériaux de formation

- Préserver la structure pédagogique lors des modifications
- Conserver la documentation en français car il s'agit d'un programme de formation français
- Respecter la difficulté progressive entre les modules (J1 → J2 → J3, modules 1 à 6)
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