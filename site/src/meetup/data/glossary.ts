export type GlossaryCategory =
  | 'Métrique'
  | 'Modèle'
  | 'Concept'
  | 'Paramètre'
  | 'Dataset'

export interface GlossaryEntry {
  term: string
  category: GlossaryCategory
  short: string
  detail: string
  formula?: string
  example?: string
  links?: { label: string; url: string }[]
}

export const glossary: GlossaryEntry[] = [
  {
    term: 'Vibe Coding',
    category: 'Concept',
    short: 'Développement collaboratif avec agents IA — 5 compétences clés.',
    detail:
      'Pratique consistant à maîtriser l\'assistance et les agents IA pour créer des logiciels, mener des tests ou gérer des sprints. Repose sur Thinking, Prompting, Tools, Context et Review.',
    links: [{ label: 'Glossaire formation', url: 'https://github.com' }],
  },
  {
    term: 'MCP',
    category: 'Concept',
    short: 'Model Context Protocol — connecter agents à données et outils.',
    detail:
      'Protocole standardisé permettant de brancher les agents IA sur des sources locales ou distantes : API, bases de données, forge logicielle, documentation à jour.',
    links: [{ label: 'modelcontextprotocol.io', url: 'https://modelcontextprotocol.io' }],
  },
  {
    term: 'Harness Engineering',
    category: 'Concept',
    short: 'Environnement de travail optimisé pour les agents IA.',
    detail:
      'Art de créer un cadre de travail : rules, skills, périmètre, jeux de tests, documentation minimale, contrat de contexte, DESIGN.md — pour orienter l\'IA vers des résultats précis.',
  },
  {
    term: 'Contrat de Contexte',
    category: 'Concept',
    short: 'Document cadre : rôle, objectif, contraintes, format, validation.',
    detail:
      'Livrable projet structuré autour de 6 piliers et d\'une priorisation MoSCoW (must / should / would / won\'t). Référence entre métier, archi, dev et QA.',
  },
  {
    term: 'BMAD-METHOD',
    category: 'Concept',
    short: 'Brainstorm · Model · Architect · Develop.',
    detail:
      'Méthode de développement logiciel utilisant les agents IA en 4 phases : exploration, modélisation, architecture et implémentation.',
    links: [{ label: 'bdmad.org', url: 'https://bdmad.org' }],
  },
  {
    term: 'Stage-Gate',
    category: 'Concept',
    short: 'Stages de production séparés par des gates de validation humaine.',
    detail:
      'Cadre de gestion de projet divisant le développement assisté par IA en étapes de production (stages) séparées par des points de décision explicites (gates) avec human-in-the-loop.',
  },
  {
    term: 'Drift',
    category: 'Concept',
    short: 'Perte de pertinence quand le contexte conversationnel s\'allonge.',
    detail:
      'Phénomène où le LLM a du mal à retrouver les informations pertinentes au fil de la conversation. Se combat par context engineering, contrat de contexte et réouverture de sessions.',
  },
  {
    term: 'AGENTS.md',
    category: 'Concept',
    short: 'Fichier de rules systématiques pour l\'agent.',
    detail:
      'Format principal des Rules : règles appliquées à chaque instruction, pouvant référencer la documentation existante du projet.',
    links: [{ label: 'agents.md', url: 'https://agents.md' }],
  },
  {
    term: 'Skills',
    category: 'Concept',
    short: 'Boîte à outils ponctuelle de l\'agent (MCP, CLI, scripts).',
    detail:
      'Compétences que l\'agent peut invoquer pour des actions précises : lecture de fichiers, requêtes MCP, exécution de scripts, prompts spécialisés.',
    links: [{ label: 'agentskills.io', url: 'https://agentskills.io/home' }],
  },
]
