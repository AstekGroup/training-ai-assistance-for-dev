/**
 * Contenu détaillé du cursus — extrait des modules COURS/*.md.
 * Source de vérité textuelle ; les slides consomment ces données via modales / accordéons.
 */

export interface ToolEntry {
  id: string
  name: string
  brandId?: string
  presentation: string
  strengths: string
  limits: string
}

export const toolsPanorama: ToolEntry[] = [
  {
    id: 'claude-code',
    name: 'Claude Code',
    brandId: 'anthropic',
    presentation:
      'Agent de développement en terminal, lié à l\'écosystème Anthropic, qui parcourt le dépôt, exécute des commandes et applique des changements multi-fichiers guidés par la conversation.',
    strengths:
      'Souvent cité comme très performant en « agentic coding » ; grande fenêtre de contexte utile sur des bases multi-fichiers ; qualité de raisonnement et d\'explication du code hérité fréquemment saluées.',
    limits:
      'Mémoire de session limitée et compaction du contexte perçues comme une perte d\'information ; évolution des quotas et des conditions d\'usage ; le résultat reste tributaire de la rigueur des tests et de la revue humaine.',
  },
  {
    id: 'cursor',
    name: 'Cursor',
    brandId: 'cursor',
    presentation:
      'IDE dérivé de VS Code avec complétion, chat et mode agent intégrés pour éditer, générer et refactoriser directement dans le projet.',
    strengths:
      'Courbe d\'apprentissage faible pour les habitués de VS Code ; refactors multi-fichiers avec prévisualisation ; mode agent avec garde-fous ; offres entreprise / confidentialité souvent mises en avant dans les comparatifs.',
    limits:
      'Signalements récurrents de lourdeurs (CPU/RAM) ou de ralentissements ; gains de productivité réels mais plus modestes que le marketing initial ; plafonds d\'usage sur l\'abonnement ; risques de dérive sur très gros dépôts sans pilotage.',
  },
  {
    id: 'antigravity',
    name: 'Antigravity (Google)',
    brandId: 'google',
    presentation:
      'IDE « agent-first » (fork de VS Code) qui orchestre des agents sur l\'éditeur, le terminal et un navigateur intégré, autour de Gemini et, selon les versions, d\'autres modèles.',
    strengths:
      'Surface « manager » pour suivre plusieurs agents et workspaces ; artefacts de suivi (plans, captures) mis en avant par Google ; fortes capacités agentiques et intégration Gemini ; système d\'autorisations affiné dans les grosses mises à jour rapportées par la presse tech.',
    limits:
      'Produit récent : maturité UX et fiabilité encore en mouvement ; ancrage compte / cloud Google et limites de débit ; concurrence frontale avec Cursor et Windsurf sur le même créneau.',
  },
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    brandId: 'github',
    presentation:
      'Assistant d\'IA intégré à l\'IDE (VS Code, JetBrains, Xcode, Neovim, etc.) et à GitHub : complétions inline, chat, revue de PR et extensions (dont agent / workspace selon l\'offre).',
    strengths:
      'Forte intégration Git (PR, issues, Actions) ; déploiement entreprise courant (SSO, politiques, IP indemnification sur les offres Business) ; complétions rapides sur le code du quotidien ; écosystème d\'extensions et de modèles (dont premium).',
    limits:
      'Comparatifs : moins « agent autonome » que certains concurrents sur gros chantiers multi-fichiers ; qualité variable selon langage et contexte ; vigilance sur la confidentialité du code sans paramétrage entreprise ; paliers d\'abonnement et modèles avancés souvent facturés en plus.',
  },
  {
    id: 'codex',
    name: 'Codex (CLI OpenAI)',
    brandId: 'openai',
    presentation:
      'Agent en ligne de commande (open source côté client) pour analyser le dépôt, proposer des diffs, lancer des commandes et reprendre une session avec consignes d\'équipe.',
    strengths:
      'Approbation des actions configurable ; support MCP, sous-agents et reprise via transcripts / AGENTS.md ; modes planification avant implémentation mis en avant par la documentation officielle.',
    limits:
      'Efficacité très dépendante d\'un cadrage clair (objectif, contraintes, critères de fin) ; moins de retours d\'expérience long format que les leaders IDE au moment des articles comparatifs ; toujours nécessité d\'une validation humaine sur le sûr et le métier.',
  },
  {
    id: 'mistral-vibe',
    name: 'Mistral Vibe',
    brandId: 'mistral',
    presentation:
      'Agent CLI européen de Mistral, centré dépôt Git et modifications multi-fichiers, avec MCP et personnalisation type « skills ».',
    strengths:
      'Coût souvent présenté comme compétitif ; argumentaire souveraineté / RGPD ; grands contextes avec les familles de modèles Mistral ; possibilité d\'auto-hébergement pour des contraintes de données.',
    limits:
      'Produit récent : retours de limites de débit, bugs ou maturité infra selon les tests de la presse spécialisée ; Windows souvent considéré comme secondaire ; écart de benchmarks par rapport aux modèles « frontier » propriétaires.',
  },
  {
    id: 'continue',
    name: 'Continue',
    presentation:
      'Extension open source pour VS Code et JetBrains : chat, modèles au choix, contexte riche et personnalisation avancée (dont MCP selon la configuration).',
    strengths:
      'Pas de verrouillage éditeur unique ; support de nombreux fournisseurs et modèles locaux (ex. Ollama) ; idéal en formation pour BYOK, transparence des prompts et gouvernance des clés ; Apache 2.0.',
    limits:
      'Configuration plus exigeante que les offres « batteries incluses » ; UX et stabilité variables selon les retours ; expérience agentique moins « autopilot » que Cursor ou Windsurf sans réglage et sans bons garde-fous projet.',
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    presentation:
      'IDE centré sur l\'IA (base VS Code) de Codeium, avec l\'agent Cascade qui enchaîne lecture du dépôt, planification et modifications multi-fichiers.',
    strengths:
      'Cascade souvent salué pour expliquer les étapes pendant l\'exécution ; tarification perçue comme compétitive ; complétions rapides ; prise en main facile pour les profils VS Code ; « mémoires » de style ou de conventions fréquemment citées dans les retours.',
    limits:
      'Stabilité parfois critiquée ; usage crédité sur l\'agent et le chat ; communauté plus petite que les leaders ; plafonds de confort sur refactorings très transverses selon certains comparatifs avec Cursor.',
  },
  {
    id: 'opencode',
    name: 'OpenCode',
    presentation:
      'Agent de code open source (terminal, desktop bêta, extensions) connectable à de nombreux fournisseurs de modèles, y compris local.',
    strengths:
      'MIT, choix du LLM, intégration LSP, absence de stockage imposé du code par l\'outil selon la documentation ; coût potentiellement maîtrisé par rapport aux abonnements « tout-en-un ».',
    limits:
      'Mise en route plus exigeante (clés API, /init, configuration) ; expérience très orientée terminal ; ergonomie d\'annulation / retour en arrière moins immédiate que sur certains concurrents.',
  },
  {
    id: 'junie',
    name: 'Junie (JetBrains)',
    presentation:
      'Agent de codage intégré aux IDE JetBrains : il planifie, modifie le code et enchaîne tests ou build selon des modes de contrôle plus ou moins automatiques.',
    strengths:
      'Exploitation fine du modèle de projet IntelliJ (navigation, refactors, intentions) ; modes approbation / plus autonome ; tarification forfaitaire souvent mise en avant.',
    limits:
      'Couverture langages / frameworks et disponibilité par IDE ou OS à vérifier ; risque de changements trop larges sur des questions simples ; chevauchement avec JetBrains AI Assistant.',
  },
  {
    id: 'lovable',
    name: 'Lovable',
    presentation:
      'Générateur d\'applications web (souvent React) par chat et édition visuelle, avec hébergement et intégration typique Supabase pour données et auth.',
    strengths:
      'Time-to-prototype très court ; export vers GitHub et poursuite possible dans un IDE classique ; intégration base / auth / temps réel prête à l\'emploi pour beaucoup de MVPs.',
    limits:
      'Modèle à crédits jugé vite coûteux à l\'itération ; nombreux avis « jusqu\'à ~70 % puis friction » pour durcir en production ; couplage fort à l\'écosystème Supabase.',
  },
]

export const competencesVibeCoding = [
  {
    id: 'thinking',
    name: 'Thinking',
    short: 'Réflexion et raisonnement assistés par IA',
    detail:
      'Capacité à structurer un problème, explorer des options et valider un raisonnement avec l\'agent — avant de passer en mode edit. Inclut la lecture critique des plans proposés par l\'IA.',
  },
  {
    id: 'prompting',
    name: 'Prompting',
    short: 'Ingénierie de prompt avancée',
    detail:
      'Concevoir des instructions claires, fournir du contexte structuré et encadrer la réflexion (Chain-of-Thought, contraintes métier, critères de fin). Investir sur le premier prompt et la relecture du plan.',
  },
  {
    id: 'tools',
    name: 'Tools',
    short: 'Maîtrise des outils de l\'IDE',
    detail:
      'Navigateur intégré, recherche web, serveurs MCP, CLI (gh/glab), modes plan/edit/ask/debug. Savoir quand préférer la CLI à un MCP (latence, bruit contextuel).',
  },
  {
    id: 'context',
    name: 'Context',
    short: 'Gestion du contexte et de la mémoire',
    detail:
      'Context engineering : limiter le drift, favoriser les Rules plutôt que les prompts longs, utiliser les Skills pour l\'information contextuelle, redémarrer la conversation après une fonctionnalité majeure.',
  },
  {
    id: 'review',
    name: 'Review',
    short: 'Revue critique et validation humaine',
    detail:
      'Human-in-the-loop : valider le code généré, relire les commentaires, contrôler les tests (risque TDD avec LLM), appliquer les gates Stage-Gate avant merge.',
  },
]

export const promptEngineeringTips = [
  {
    title: 'Éviter les rôles génériques',
    content:
      '« Tu es un expert Angular » est souvent contre-productif pour des tâches multi-expertises. Préférer des consignes précises sur le livrable, les contraintes et les critères de validation.',
  },
  {
    title: 'Limiter le drift',
    content:
      'Favoriser des prompts précis et structurés. Le contexte qui s\'allonge dégrade la pertinence : instructions confondues avec les données, anciennes versions de fichiers encore présentes.',
  },
  {
    title: 'Investir sur le premier prompt',
    content:
      'Le premier prompt et la relecture du plan proposé par l\'agent sont les moments à fort levier. Valider le plan avant de laisser l\'agent modifier le code.',
  },
  {
    title: 'Contraintes métier et conformité',
    content:
      'Expliciter RGPD, sécurité, stack imposée, périmètre des fichiers modifiables. Le contrat de contexte (module 5) formalise ces éléments.',
  },
  {
    title: 'Valider et rouvrir',
    content:
      'Valider le code généré ; rouvrir une conversation après une fonctionnalité majeure ou un plan terminé pour repartir sur un contexte propre.',
  },
]

export const gitIaPractices = [
  'Commiter souvent : points de retour si l\'agent part dans une mauvaise direction',
  'Respecter un git workflow même en solo : branches par fonctionnalité pour lancer plusieurs agents ou expérimentations en parallèle',
  'Utiliser gh / glab en CLI lorsque c\'est suffisant (éviter la surcouche MCP quand la latence ou le bruit contextuel pénalisent)',
  'Workflows collaboratifs : multi-branches, MR/PR, résolution de conflits assistée',
  'Revues automatisées et conventions de commits alignées projet',
]

export const tpAxesM2 = [
  {
    title: 'Axe Git',
    content:
      'Utiliser git avec l\'agent IA : commit messages, branches, gh/glab pour suivre les Merge Requests/Pull Requests et les issues.',
    examples: ['Blog statique', 'Dashboard simple', 'API CRUD', 'Amélioration d\'un projet existant'],
  },
  {
    title: 'Axe Documentation uniformisée',
    content: 'Trouver un prompt efficace pour documenter des projets existants de façon homogène.',
  },
  {
    title: 'Axe Tests',
    content:
      'Rédiger des tests pour du code existant. Livrables : tests unitaires / intégration / perf / sécurité, cahier de recette pour le fonctionnel.',
  },
  {
    title: 'Axe Optimisation',
    content:
      'Optimiser du code existant (perf, dette). Livrables : factorisation, audit sécurité, rapport perf, accessibilité si pertinent.',
  },
]

export const bonnesPratiquesEntreprise = [
  { title: 'Merge / hooks', content: 'Règles de merge, messages de commit, pre-commit / CI (lint, tests)' },
  { title: 'Sécurité', content: 'OWASP Top 10, couverture, duplication, analyse statique' },
  { title: 'Performance', content: 'Optimisation assistée sans « magie » aveugle' },
  { title: 'Clean Architecture', content: 'SOLID, hexagonal, DDD selon contexte' },
  {
    title: 'Tests & TDD',
    content:
      'Vigilance TDD avec LLM ; risque de modification des tests ou du code sans validation explicite',
  },
  {
    title: 'Points de vigilance',
    content:
      'Compression de contexte, perte d\'info, hallucinations, prise en compte tardive des nouveaux fichiers',
  },
]

export const agentAnatomyLayers = [
  {
    id: 'llm',
    name: 'LLM',
    detail: 'Moteur de raisonnement (GPT, Claude, Gemini, Mistral…). Choix du modèle selon le use case : léger pour lint/commit, high pour epic/plan.',
  },
  {
    id: 'contexte',
    name: 'Contexte',
    detail:
      'Fenêtre de conversation, mémoire IDE, fichiers ouverts, rules, skills, MCP. Imposé ou choisi — c\'est la « matière première » du raisonnement.',
  },
  {
    id: 'rules',
    name: 'Rules',
    detail:
      'Règles systématiques à chaque prompt (AGENTS.md). Référencent ADR, README. 3 niveaux possibles : entreprise, équipe, individuel.',
  },
  {
    id: 'skills',
    name: 'Skills',
    detail:
      'Boîte à outils invoquée au cas par cas : MCP, API, CLI, prompts spécialisés. Voir agentskills.io.',
  },
  {
    id: 'mcp',
    name: 'MCP',
    detail: 'Serveurs fournissant données, outils ou prompts. Protocole standardisé modelcontextprotocol.io.',
  },
  {
    id: 'modes',
    name: 'Modes',
    detail:
      'plan (raisonnement) · edit (code) · ask (exploration sans modif) · debug (correction uniquement). Tous les IDE ne proposent pas les 4 (ex. Antigravity sans ask/debug).',
  },
]

export const driftContent = {
  causes: [
    'Difficulté à faire la différence entre instructions et données',
    'Difficulté à retrouver les informations pertinentes',
    'Anciennes versions des fichiers présentes dans le contexte',
  ],
  remedies: [
    'Favoriser l\'utilisation de Rules plutôt que de prompts longs',
    'Utiliser des Skills pour fournir des informations contextuelles',
    'Limiter la taille du contexte en redémarrant régulièrement la conversation',
  ],
}

export const modelUseCases = [
  { useCase: 'Lint, debug simple', mode: 'debug', model: 'léger' },
  { useCase: 'Commit', mode: 'agent', model: 'léger' },
  { useCase: 'Optimiser le code', mode: 'plan', model: 'high puis léger' },
  { useCase: 'Écrire des tests', mode: 'agent', model: 'moyen' },
  { useCase: 'Développer une fonctionnalité', mode: 'plan', model: 'moyen' },
  { useCase: 'Développer une epic', mode: 'plan', model: 'high puis moyen' },
]

export const securityThreats = [
  {
    id: 'injection',
    title: 'Prompt injection',
    content: 'Manipulation via prompts ou contenus embarqués (docs, tickets, pages web).',
  },
  {
    id: 'hallucination',
    title: 'Hallucination attacks',
    content: 'Exploitation de réponses fragiles (risque en baisse avec les modèles récents, reste à contrôler).',
  },
  {
    id: 'leakage',
    title: 'Data leakage',
    content: 'Fuite de données sensibles via contexte ou outils MCP mal cadrés.',
  },
  {
    id: 'hijacking',
    title: 'Agent hijacking',
    content: 'Détournement du plan d\'action (outils, shell, déploiements).',
  },
]

export const securityDefenses = [
  'Input validation : filtrage des sources, limitation des recherches ouvertes',
  'Output filtering : relecture humaine du code et des commentaires générés',
  'Sandboxing : isolation lorsque le risque l\'exige',
  'Monitoring : activité réseau, journaux d\'outils, politiques sur les secrets',
  'Ciblage MCP : exposer uniquement les outils nécessaires (forge, doc, navigateur)',
  'Préférer gh/glab en CLI quand le MCP ajoute latence et bruit',
]

export const bmadPhases = [
  { phase: 'Brainstorm', desc: 'Génération d\'idées avec agents IA' },
  { phase: 'Model', desc: 'Modélisation assistée (UML, diagrammes)' },
  { phase: 'Architect', desc: 'Architecture technique avec validation IA' },
  { phase: 'Develop', desc: 'Développement orchestré par agents' },
]

export const mcpAdvancedPistes = [
  'Documentation à jour : MCP type Context7 pour réduire les hallucinations d\'API',
  'Forge logicielle : GitLab / GitHub (issues, MR) — cibler les outils exposés',
  'Navigateur / UI : MCP navigateur ou Playwright pour scénarios contrôlés',
  'Autres : Jira, Postgres, Excalidraw… selon le périmètre autorisé',
]

export const contratPiliers = [
  {
    pillar: 'Objectif',
    weak: '« Améliorer le checkout »',
    strong:
      '« Implémenter le paiement Stripe (PaymentIntent) sur /checkout/pay, avec retour webhook et mise à jour du statut commande »',
  },
  {
    pillar: 'Contraintes',
    weak: 'Vagues intentions',
    strong: 'Technique (TS strict, pas de nouvelle dep sans ADR), business (2 sprints), qualité (couverture ≥ 80 %), harness (MCP GitLab #142–#148)',
  },
  {
    pillar: 'Contexte',
    weak: 'Peu de références',
    strong: 'Existant (monolithe Django 4.2), équipe (revue lead), références (ADR, DESIGN.md, tickets)',
  },
  {
    pillar: 'Format',
    weak: 'Livrable flou',
    strong: 'PR avec description, tests unitaires + 1 test intégration webhook, pas de refactor hors périmètre',
  },
  {
    pillar: 'Validation',
    weak: '« Ça marche »',
    strong: 'Webhook testé, contraste WCAG AA, CI verte, revue humaine',
  },
]

export const moscowLevels = [
  { level: 'Must', meaning: 'Non négociable — l\'agent doit respecter', example: 'Toute route API passe par le middleware d\'auth existant' },
  { level: 'Should', meaning: 'Fortement recommandé — écart justifié', example: 'Préférer des composants React Server Components' },
  { level: 'Would', meaning: 'Souhaitable si le budget le permet', example: 'Ajouter des tests de charge sur le endpoint critique' },
  { level: 'Won\'t', meaning: 'Hors périmètre explicite', example: 'Pas de migration de base de données dans cette itération' },
]

export const designMdContent = {
  why: 'Sans contrat visuel, l\'agent improvise couleurs, espacements et composants à chaque session — écarts de marque et régressions d\'accessibilité.',
  layers: [
    { layer: 'YAML front matter', role: 'Valeurs machine : colors, typography, spacing, components' },
    { layer: 'Corps Markdown', role: 'Rationale humain : Overview, Colors, Typography, Layout, Elevation, Shapes, Components, Do\'s and Don\'ts' },
  ],
  cli: [
    'npx @google/design.md lint DESIGN.md',
    'npx @google/design.md export --format tailwind DESIGN.md',
    'npx @google/design.md spec',
  ],
}

export const cycleQualite = [
  {
    title: 'Débogage assisté',
    items: ['Analyse automatique des stack traces', 'Détection de patterns d\'erreurs', 'Suggestions de correctifs contextualisés'],
  },
  {
    title: 'Optimisation',
    items: ['Performance (complexité, hotspots)', 'Lisibilité (refactoring, naming)', 'Maintenabilité (découplage, SOLID)'],
  },
  {
    title: 'Génération de tests',
    items: ['Unitaires, intégration, end-to-end', 'Cohérence des données, jeux de test'],
  },
  {
    title: 'Revue de code',
    items: ['PR / MR', 'Conventions, sécurité OWASP, performance, documentation'],
  },
]

export const stageGateStages = [
  {
    stage: 'Stage 1 — Scoping',
    action: 'Besoin métier + contrat de contexte (module 5)',
    gate: 'Objectif et contraintes validés avant sollicitation intensive de l\'IA ?',
  },
  {
    stage: 'Stage 2 — Génération & maquettage',
    action: 'Draft / PoC avec agents',
    gate: 'Standards de base (naming, lint, structure) respectés ?',
  },
  {
    stage: 'Stage 3 — Raffinement & tests',
    action: 'Bugs, cas limites, tests unitaires',
    gate: 'Couverture et tests verts à un seuil défini ?',
  },
  {
    stage: 'Stage 4 — Revue & sécurité',
    action: 'Revue (pair ou agent spécialisé), audit OWASP',
    gate: 'Maintenabilité, sécurité, perf acceptables ?',
  },
  {
    stage: 'Stage 5 — Finalisation & livraison',
    action: 'Doc, polissage, merge',
    gate: 'Livrable conforme aux critères du contrat ?',
  },
]

export const tpFinalRoles = [
  { role: 'Agent Product Owner', desc: 'Analyse des besoins, user stories, priorisation' },
  { role: 'Agent Architecte', desc: 'Architecture, choix technos, diagrammes et documentation' },
  { role: 'Agent Développement', desc: 'Implémentation, patterns, intégration' },
  { role: 'Agent QA', desc: 'Tests, détection de bugs, validation qualité' },
  { role: 'Agent Code Reviewer', desc: 'Revue systématique, suggestions, standards' },
]

export const tpFinalProjets = [
  'Plateforme de code review automatisée — analyse de PRs, suggestions, scoring qualité',
  'Réseau social d\'entreprise — posts, commentaires, modération, agrégation de flux externes',
  'Système de monitoring — logs fictifs volumineux, dashboard, détection d\'anomalies',
]

export const modulesPlanning = [
  {
    id: 'm1',
    label: 'M1 — Structurer',
    sequences: [
      { time: '9h00–9h30', title: 'Introduction', content: 'Tour de table, projets d\'entreprise, objectifs, positionnement du groupe' },
      { time: '9h30–10h15', title: '5 compétences Vibe Coding', content: 'Framework et lien avec les modules suivants' },
      { time: '10h30–11h15', title: 'Prompt engineering entreprise', content: 'Templates, contraintes métier et conformité' },
      { time: '11h15–12h30', title: 'Exercice guidé Todo', content: 'Todo app progressive — Thinking + frameworks d\'outillage' },
    ],
  },
  {
    id: 'm2',
    label: 'M2 — Intensifier',
    sequences: [
      { time: '13h30–14h00', title: 'Panorama outillage', content: 'Cursor, Antigravity, Copilot, Windsurf, Continue, Claude Code…' },
      { time: '14h00–14h30', title: 'Git + IA équipes', content: 'Workflows, branches, MR/PR, conventions de commits' },
      { time: '14h30–16h30', title: 'Ateliers (labs)', content: 'Mini-projets vibe coding — git, doc, tests, optim' },
      { time: '16h45–17h30', title: 'Bonnes pratiques entreprise', content: 'OWASP, perf, Clean Architecture, pièges TDD / tests LLM' },
    ],
  },
  {
    id: 'm3',
    label: 'M3 — Concevoir',
    sequences: [
      { time: '9h00–9h30', title: 'Intro & retour challenge', content: 'Patterns récurrents vers l\'automatisation' },
      { time: '9h30–10h30', title: 'Agents IA — théorie', content: 'Types, anatomie, modèles, use cases, drift' },
      { time: '10h45–11h15', title: 'Rules, Skills, MCP', content: 'Concepts et démos API / DB' },
      { time: '11h15–12h30', title: 'TP Rules / Skills / MCP', content: 'AGENTS.md, skills, premier serveur MCP' },
    ],
  },
  {
    id: 'm4',
    label: 'M4 — Industrialiser',
    sequences: [
      { time: '13h30–14h15', title: 'MCP avancé & sécurité', content: 'Serveurs MCP entreprise, menaces et protections' },
      { time: '14h15–15h45', title: 'TP MCP', content: 'Configuration avec rules, périmètre autorisé' },
      { time: '16h00–16h45', title: 'TP guidé BMAD', content: 'Brainstorm · Model · Architect · Develop' },
    ],
  },
  {
    id: 'm5',
    label: 'M5 — Cadrer',
    sequences: [
      { time: '9h15–10h15', title: 'Harness & contrat de contexte', content: 'Concepts, DESIGN.md, template, exemples API et UI' },
      { time: '10h30–12h30', title: 'TP cycle complet', content: 'Harness complet : debug, optim, tests, review' },
    ],
  },
  {
    id: 'm6',
    label: 'M6 — Pratiquer',
    sequences: [
      { time: '13h30–14h00', title: 'Stage gate', content: 'Méthode de travail, lien contrat de contexte' },
      { time: '14h00–17h00', title: 'TP final multi-agents', content: '3 sprints, démos par équipe' },
      { time: '17h00–17h30', title: 'Conclusion', content: 'Synthèse 6 modules, évaluation' },
    ],
  },
]
