/**
 * Configuration centrale — présentation du cursus
 * « Vibe Coding : Outils IA pour Développeurs » (training-ai-assistance-for-dev).
 */
import { tt, type Lang } from '@/meetup/i18n'

export const meetup = {
  edition: 'Formation Astek · ILAB',
  title: 'Vibe Coding',
  subtitle: 'Outils IA pour Développeurs',
  tagline:
    '3 jours pour maîtriser le Vibe Coding : prompt engineering, agents MCP, harness engineering et méthode Stage-Gate — en contexte entreprise.',
  date: '3 jours · présentiel',
  dateFull: '3 jours · ~7 h / jour · 6 demi-journées',
  duration: '21 h de formation',
  location: 'Sur site client ou Astek — présentiel',
  speaker: {
    name: 'Philippe Pary',
    role: 'Expert IA & formation, ASTEK',
    bio: 'Accompagne les équipes de développement vers une pratique structurée du Vibe Coding : agents, MCP, harness et gouvernance qualité.',
  },
  audience: ['Développeurs', 'Testeurs & QA', 'Architectes', 'Tech leads'],
  format: {
    talk: 'Théorie & méthode',
    demos: 'Labs & TP',
    qa: 'Synthèse & évaluation',
  },
} as const

export const phases = [
  {
    id: 1,
    label: 'Ouverture',
    duration: '~5 min',
    color: 'emerald',
    summary: 'Contexte, promesse et positionnement assistance IA vs projet IA.',
  },
  {
    id: 2,
    label: "Vue d'ensemble",
    duration: '~8 min',
    color: 'amber',
    summary: 'Objectifs pédagogiques et structure 3 jours / 6 modules.',
  },
  {
    id: 3,
    label: 'Parcours détaillé',
    duration: '~20 min',
    color: 'violet',
    summary: 'Contenu module par module — J1 fondements, J2 agents, J3 qualité.',
  },
  {
    id: 4,
    label: 'Méthode & outils',
    duration: '~8 min',
    color: 'cyan',
    summary: 'Écosystème outillage, 5 compétences Vibe Coding, évaluation.',
  },
  {
    id: 5,
    label: 'Échanges',
    duration: '~4 min',
    color: 'rose',
    summary: 'Questions et prochaines étapes.',
  },
] as const

export const keyFigures = [
  {
    value: '3 jours',
    label: '6 demi-journées structurées',
    detail: '2 modules par jour · ~3 h 30 / demi-journée',
    source: 'Syllabus formation',
  },
  {
    value: '5',
    label: 'Compétences Vibe Coding',
    detail: 'Thinking · Prompting · Tools · Context · Review',
    source: 'Framework pédagogique',
  },
  {
    value: '70 %+',
    label: 'Temps pratique',
    detail: 'Labs, TP guidés, challenge overnight, TP final multi-agents',
    source: 'Répartition indicative',
  },
] as const

export const highlights = [
  {
    title: 'Du copilote à la pratique structurée',
    description:
      'Passer des complétions opportunistes à une méthode gouvernée : prompt engineering entreprise, garde-fous et validation humaine.',
    icon: 'Sparkles',
  },
  {
    title: 'Stack agent complète',
    description:
      'Rules, Skills, MCP, sécurité opérationnelle et BMAD-METHOD — industrialiser les agents en contexte réel.',
    icon: 'Zap',
  },
  {
    title: 'Qualité sur tout le cycle',
    description:
      'Harness engineering, contrat de contexte, debug/optim/tests/review assistés et méthode Stage-Gate.',
    icon: 'ShieldCheck',
  },
] as const

export type Phase = (typeof phases)[number]
export type KeyFigure = (typeof keyFigures)[number]

export function getMeetupMeta(lang: Lang) {
  return {
    ...meetup,
    title: tt(lang, 'Vibe Coding', 'Vibe Coding'),
    subtitle: tt(lang, 'Outils IA pour Développeurs', 'AI Tools for Developers'),
    tagline: tt(
      lang,
      '3 jours pour maîtriser le Vibe Coding : prompt engineering, agents MCP, harness engineering et méthode Stage-Gate — en contexte entreprise.',
      '3 days to master Vibe Coding: prompt engineering, MCP agents, harness engineering and Stage-Gate method — in an enterprise context.',
    ),
    speaker: {
      ...meetup.speaker,
      role: tt(lang, 'Expert IA & formation, ASTEK', 'AI & Training Expert, ASTEK'),
      bio: tt(
        lang,
        'Accompagne les équipes de développement vers une pratique structurée du Vibe Coding : agents, MCP, harness et gouvernance qualité.',
        'Helps development teams adopt structured Vibe Coding: agents, MCP, harness and quality governance.',
      ),
    },
    format: {
      talk: tt(lang, 'Théorie & méthode', 'Theory & method'),
      demos: tt(lang, 'Labs & TP', 'Labs & workshops'),
      qa: tt(lang, 'Synthèse & évaluation', 'Wrap-up & assessment'),
    },
  }
}
