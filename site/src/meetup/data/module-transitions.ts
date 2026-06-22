import type { LucideIcon } from 'lucide-react'
import { Brain, Bot, Shield, FileText, Users, Wrench } from 'lucide-react'

export interface ModuleCover {
  id: string
  number: string
  verb: string
  title: string
  subtitle: string
  day: string
  slot: string
  tone: 'green' | 'violet' | 'blue' | 'amber' | 'rose' | 'cyan'
  icon: LucideIcon
  objectives: string[]
  duration: string
}

export interface ModuleConclusion {
  id: string
  number: string
  title: string
  tone: 'green' | 'violet' | 'blue' | 'amber' | 'rose' | 'cyan'
  acquired: string[]
  takeaway: string
  nextModule?: {
    number: string
    verb: string
    hint: string
  }
  homework?: string
}

export const moduleCovers: Record<string, ModuleCover> = {
  m1: {
    id: 'm1',
    number: '01',
    verb: 'Structurer',
    title: 'Vibe Coding & prompt engineering',
    subtitle: 'Poser le cadre assistance IA, maîtriser les 5 compétences et le prompt engineering en contexte entreprise.',
    day: 'Jour 1',
    slot: 'Matin · ~3 h 30',
    tone: 'green',
    icon: Brain,
    duration: '9h00 – 12h30',
    objectives: [
      'Distinguer assistance IA et « projet IA »',
      'Maîtriser le framework des 5 compétences du Vibe Coding',
      'Appliquer le prompt engineering aux contraintes d\'entreprise',
      'Réaliser un exercice guidé Todo progressive',
    ],
  },
  m2: {
    id: 'm2',
    number: '02',
    verb: 'Intensifier',
    title: 'Outillage, Git d\'équipe, labs & garde-fous',
    subtitle: 'Consolider l\'usage des IDE agentiques, ancrer Git + IA en équipe, enchaîner des mini-projets.',
    day: 'Jour 1',
    slot: 'Après-midi · ~3 h 30',
    tone: 'green',
    icon: Wrench,
    duration: '13h30 – 17h30',
    objectives: [
      'Utiliser l\'agent sur plusieurs types de livrables (UI, API, doc, tests, perf)',
      'Mettre en place des pratiques Git compatibles multi-agents et revue',
      'Appliquer des garde-fous entreprise (sécurité, perf, architecture, tests)',
    ],
  },
  m3: {
    id: 'm3',
    number: '03',
    verb: 'Concevoir',
    title: 'Stack agent — Rules, Skills & MCP',
    subtitle: 'Comprendre l\'anatomie d\'un agent, le choix des modèles et modes ; premières intégrations MCP.',
    day: 'Jour 2',
    slot: 'Matin · ~3 h 30',
    tone: 'violet',
    icon: Bot,
    duration: '9h00 – 12h30',
    objectives: [
      'Classifier les types d\'agents et leurs usages',
      'Relier LLM, Rules, Skills, contexte et modes d\'interaction',
      'Configurer AGENTS.md, des skills et un serveur MCP de base',
    ],
  },
  m4: {
    id: 'm4',
    number: '04',
    verb: 'Industrialiser',
    title: 'MCP avancé, sécurité & BMAD-METHOD',
    subtitle: 'Enrichir les intégrations MCP en contexte réel ; sécurité des chaînes agentiques ; méthode BMAD.',
    day: 'Jour 2',
    slot: 'Après-midi · ~3 h 30',
    tone: 'violet',
    icon: Shield,
    duration: '13h30 – 17h00',
    objectives: [
      'Brancher des serveurs MCP représentatifs (doc, forge, navigateur / tests)',
      'Identifier menaces et défenses sur les agents',
      'Appliquer la BMAD-METHOD sur un cas guidé',
    ],
  },
  m5: {
    id: 'm5',
    number: '05',
    verb: 'Cadrer',
    title: 'Harness, contrat de contexte & qualité',
    subtitle: 'Formaliser le harness et le contrat de contexte ; IA pour debug, optim, tests et review.',
    day: 'Jour 3',
    slot: 'Matin · ~3 h 30',
    tone: 'cyan',
    icon: FileText,
    duration: '9h15 – 12h30',
    objectives: [
      'Définir le harness engineering et ses livrables projet',
      'Rédiger et exploiter un contrat de contexte (MoSCoW, 5 piliers)',
      'Enchaîner debug, perf, tests et review assistés par IA',
    ],
  },
  m6: {
    id: 'm6',
    number: '06',
    verb: 'Pratiquer',
    title: 'Méthodes de travail adaptées',
    subtitle: 'Stage-Gate compatible Vibe Coding ; TP final multi-agents ; synthèse et évaluation.',
    day: 'Jour 3',
    slot: 'Après-midi · ~3 h 30',
    tone: 'cyan',
    icon: Users,
    duration: '13h30 – 17h30',
    objectives: [
      'Utiliser les gates comme points de validation humaine',
      'Orchestrer plusieurs rôles / agents sur un livrable unique',
      'Analyser de manière critique limites et opportunités de l\'IA',
    ],
  },
}

export const moduleConclusions: Record<string, ModuleConclusion> = {
  m1: {
    id: 'm1',
    number: '01',
    title: 'Module 1 — Structurer',
    tone: 'green',
    acquired: [
      'Distinction assistance IA vs projet IA (logiciel classique, pas ML/data science)',
      'Framework des 5 compétences : Thinking, Prompting, Tools, Context, Review',
      'Prompt engineering entreprise : précision, conformité, validation du plan',
      'Premier exercice structuré : Todo app progressive sur l\'IDE de formation',
    ],
    takeaway:
      'Vous savez cadrer une session avec l\'agent : premier prompt, relecture du plan, validation humaine avant d\'aller plus loin.',
    nextModule: {
      number: '02',
      verb: 'Intensifier',
      hint: 'Panorama outillage, Git + IA, labs et garde-fous — challenge overnight avant le virage agents.',
    },
  },
  m2: {
    id: 'm2',
    number: '02',
    title: 'Module 2 — Intensifier',
    tone: 'green',
    acquired: [
      'Grille de lecture pour trancher entre IDE agentiques (Cursor, Antigravity, Copilot…)',
      'Pratiques Git + IA : commits fréquents, branches, gh/glab, revue assistée',
      'Labs multi-livrables : git, documentation, tests, optimisation',
      'Garde-fous : OWASP, perf, Clean Architecture, vigilance TDD avec LLM',
    ],
    takeaway:
      'Vous montez en intensité sur l\'agent et Git — base solide avant d\'aborder les agents (J2).',
    homework:
      'Challenge overnight : ancrer la pratique avant le module 3 (retour en ouverture de J2).',
    nextModule: {
      number: '03',
      verb: 'Concevoir',
      hint: 'Anatomie agent, Rules, Skills et premières intégrations MCP.',
    },
  },
  m3: {
    id: 'm3',
    number: '03',
    title: 'Module 3 — Concevoir',
    tone: 'violet',
    acquired: [
      'Anatomie : LLM + Contexte + Rules + Skills + MCP + Modes',
      'Choix modèle / mode selon le use case ; compréhension du drift',
      'AGENTS.md, skills (agentskills.io), premier serveur MCP',
      'Rules à 3 niveaux : entreprise, équipe, individuel',
    ],
    takeaway:
      'Vous concevez une stack agent de base — le socle pour industrialiser demain après-midi.',
    nextModule: {
      number: '04',
      verb: 'Industrialiser',
      hint: 'MCP avancé, sécurité opérationnelle et méthode BMAD-METHOD.',
    },
  },
  m4: {
    id: 'm4',
    number: '04',
    title: 'Module 4 — Industrialiser',
    tone: 'violet',
    acquired: [
      'MCP avancé : Context7, forge, navigateur — ciblage des outils exposés',
      'Sécurité : prompt injection, data leakage, sandboxing, monitoring',
      'Documentation du périmètre autorisé dans rules/skills',
      'BMAD-METHOD : Brainstorm · Model · Architect · Develop',
    ],
    takeaway:
      'Vous savez brancher et sécuriser des agents en contexte réel — prêt à cadrer le développement assisté (J3).',
    nextModule: {
      number: '05',
      verb: 'Cadrer',
      hint: 'Harness engineering, contrat de contexte et qualité sur tout le cycle.',
    },
  },
  m5: {
    id: 'm5',
    number: '05',
    title: 'Module 5 — Cadrer',
    tone: 'cyan',
    acquired: [
      'Harness engineering : rules, skills, périmètre, tests, DESIGN.md',
      'Contrat de contexte : MoSCoW, 5 piliers, template, exemples API et UI',
      'DESIGN.md : tokens normatifs + rationale, outils CLI lint/export',
      'Cycle complet : debug, optimisation, tests et review assistés par IA',
    ],
    takeaway:
      'Vous pilotez l\'agent par le contexte — le contrat nourrit AGENTS.md et les gates du module 6.',
    nextModule: {
      number: '06',
      verb: 'Pratiquer',
      hint: 'Stage-Gate, TP final multi-agents et clôture de la formation.',
    },
  },
  m6: {
    id: 'm6',
    number: '06',
    title: 'Module 6 — Pratiquer',
    tone: 'cyan',
    acquired: [
      'Stage-Gate : 5 stages, gates human-in-the-loop, lien avec contrat de contexte',
      'TP final : rôles multi-agents (PO, Archi, Dev, QA, Reviewer)',
      '3 sprints + démos ; analyse critique collective',
      'Synthèse des 6 modules et évaluation formative',
    ],
    takeaway:
      'Vous orchestrez un flux assisté par IA de bout en bout — le développeur comme pilote de validation.',
  },
}
