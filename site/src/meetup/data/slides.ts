import type { ComponentType } from 'react'
import { Slide01Title } from '@/meetup/slides/slide-01-title'
import { Slide02PourquoiMaintenant } from '@/meetup/slides/slide-02-pourquoi-maintenant'
import { SlideDividerVueEnsemble } from '@/meetup/slides/slide-divider-vue-ensemble'
import { Slide03Objectifs } from '@/meetup/slides/slide-03-objectifs'
import { Slide04Parcours } from '@/meetup/slides/slide-04-parcours'
import { SlideDividerJour1 } from '@/meetup/slides/slide-divider-jour1'
import {
  SlideModuleCoverM1,
  SlideModuleCoverM2,
  SlideModuleCoverM3,
  SlideModuleCoverM4,
  SlideModuleCoverM5,
  SlideModuleCoverM6,
} from '@/meetup/slides/slide-module-cover'
import {
  SlideModuleConclusionM1,
  SlideModuleConclusionM2,
  SlideModuleConclusionM3,
  SlideModuleConclusionM4,
  SlideModuleConclusionM5,
  SlideModuleConclusionM6,
} from '@/meetup/slides/slide-module-conclusion'
import { Slide05M1Competences } from '@/meetup/slides/slide-05-m1-competences'
import { Slide05M1Prompt } from '@/meetup/slides/slide-05-m1-prompt'
import { Slide06M2Outils } from '@/meetup/slides/slide-06-m2-outils'
import { Slide06M2GitTpPratiques } from '@/meetup/slides/slide-06-m2-git-tp-pratiques'
import { SlideDividerJour2 } from '@/meetup/slides/slide-divider-jour2'
import { Slide07M3Anatomie } from '@/meetup/slides/slide-07-m3-anatomie'
import { Slide07M3Modeles } from '@/meetup/slides/slide-07-m3-modeles'
import { Slide08M4McpSecurite } from '@/meetup/slides/slide-08-m4-mcp-securite'
import { Slide08M4Bmad } from '@/meetup/slides/slide-08-m4-bmad'
import { SlideDividerJour3 } from '@/meetup/slides/slide-divider-jour3'
import { Slide09M5HarnessContrat } from '@/meetup/slides/slide-09-m5-harness-contrat'
import { Slide09M5DesignCycle } from '@/meetup/slides/slide-09-m5-design-cycle'
import { Slide10M6StageGateTp } from '@/meetup/slides/slide-10-m6-stage-gate-tp'
import { Slide09VibeCoding } from '@/meetup/slides/slide-09-vibe-coding'
import { Slide10Evaluation } from '@/meetup/slides/slide-10-evaluation'
import { SlideDividerQA } from '@/meetup/slides/slide-divider-qa'
import { SlideEndQA } from '@/meetup/slides/slide-end-qa'

export type DeckVariant = 'full' | 'light'
export type ViewMode = 'rich' | 'essential'

export interface EssentialSlideProps {
  step: number
}

export interface SlideEntry {
  id: string
  index: number
  title: string
  titleEn?: string
  phase: string
  phaseEn?: string
  component: ComponentType
  isDivider?: boolean
  variants?: DeckVariant[]
  essentialComponent?: ComponentType<EssentialSlideProps>
  essentialSteps?: number
}

const LIGHT_IDS = new Set<string>([
  'title',
  'pourquoi-maintenant',
  'divider-vue-ensemble',
  'parcours',
  'divider-jour1',
  'm1-garde',
  'm1-conclusion',
  'm2-garde',
  'm2-outils',
  'm2-conclusion',
  'divider-jour2',
  'm3-garde',
  'm3-anatomie',
  'm3-conclusion',
  'm4-garde',
  'm4-bmad',
  'm4-conclusion',
  'divider-jour3',
  'm5-garde',
  'm5-harness',
  'm5-conclusion',
  'm6-garde',
  'm6-stage-gate',
  'm6-conclusion',
  'vibe-coding',
  'divider-qa',
  'qa',
])

export const slides: SlideEntry[] = [
  { id: 'title', index: 1, title: 'Titre', titleEn: 'Title', phase: 'Ouverture', phaseEn: 'Opening', component: Slide01Title },
  { id: 'pourquoi-maintenant', index: 2, title: 'Assistance IA ≠ projet IA', titleEn: 'AI assistance ≠ AI project', phase: 'Ouverture', phaseEn: 'Opening', component: Slide02PourquoiMaintenant },
  { id: 'divider-vue-ensemble', index: 3, title: "Vue d'ensemble", titleEn: 'Overview', phase: "Vue d'ensemble", phaseEn: 'Overview', component: SlideDividerVueEnsemble, isDivider: true },
  { id: 'objectifs', index: 4, title: 'Objectifs pédagogiques', titleEn: 'Learning objectives', phase: "Vue d'ensemble", phaseEn: 'Overview', component: Slide03Objectifs },
  { id: 'parcours', index: 5, title: 'Parcours 3 jours', titleEn: '3-day path', phase: "Vue d'ensemble", phaseEn: 'Overview', component: Slide04Parcours },
  { id: 'divider-jour1', index: 6, title: 'Jour 1', titleEn: 'Day 1', phase: 'Jour 1', phaseEn: 'Day 1', component: SlideDividerJour1, isDivider: true },

  { id: 'm1-garde', index: 7, title: 'Garde — Module 1', titleEn: 'Cover — Module 1', phase: 'Module 1', phaseEn: 'Module 1', component: SlideModuleCoverM1, isDivider: true },
  { id: 'm1-competences', index: 8, title: 'M1 — 5 compétences', titleEn: 'M1 — 5 skills', phase: 'Module 1', phaseEn: 'Module 1', component: Slide05M1Competences },
  { id: 'm1-prompt', index: 9, title: 'M1 — Prompt engineering', titleEn: 'M1 — Prompt engineering', phase: 'Module 1', phaseEn: 'Module 1', component: Slide05M1Prompt },
  { id: 'm1-conclusion', index: 10, title: 'Conclusion — Module 1', titleEn: 'Wrap-up — Module 1', phase: 'Module 1', phaseEn: 'Module 1', component: SlideModuleConclusionM1 },

  { id: 'm2-garde', index: 11, title: 'Garde — Module 2', titleEn: 'Cover — Module 2', phase: 'Module 2', phaseEn: 'Module 2', component: SlideModuleCoverM2, isDivider: true },
  { id: 'm2-outils', index: 12, title: 'M2 — Panorama outillage', titleEn: 'M2 — Tool landscape', phase: 'Module 2', phaseEn: 'Module 2', component: Slide06M2Outils },
  { id: 'm2-git-tp', index: 13, title: 'M2 — Git, labs & garde-fous', titleEn: 'M2 — Git, labs & guardrails', phase: 'Module 2', phaseEn: 'Module 2', component: Slide06M2GitTpPratiques },
  { id: 'm2-conclusion', index: 14, title: 'Conclusion — Module 2', titleEn: 'Wrap-up — Module 2', phase: 'Module 2', phaseEn: 'Module 2', component: SlideModuleConclusionM2 },

  { id: 'divider-jour2', index: 15, title: 'Jour 2', titleEn: 'Day 2', phase: 'Jour 2', phaseEn: 'Day 2', component: SlideDividerJour2, isDivider: true },

  { id: 'm3-garde', index: 16, title: 'Garde — Module 3', titleEn: 'Cover — Module 3', phase: 'Module 3', phaseEn: 'Module 3', component: SlideModuleCoverM3, isDivider: true },
  { id: 'm3-anatomie', index: 17, title: 'M3 — Anatomie agent & drift', titleEn: 'M3 — Agent anatomy & drift', phase: 'Module 3', phaseEn: 'Module 3', component: Slide07M3Anatomie },
  { id: 'm3-modeles', index: 18, title: 'M3 — Modèles & use cases', titleEn: 'M3 — Models & use cases', phase: 'Module 3', phaseEn: 'Module 3', component: Slide07M3Modeles },
  { id: 'm3-conclusion', index: 19, title: 'Conclusion — Module 3', titleEn: 'Wrap-up — Module 3', phase: 'Module 3', phaseEn: 'Module 3', component: SlideModuleConclusionM3 },

  { id: 'm4-garde', index: 20, title: 'Garde — Module 4', titleEn: 'Cover — Module 4', phase: 'Module 4', phaseEn: 'Module 4', component: SlideModuleCoverM4, isDivider: true },
  { id: 'm4-mcp-securite', index: 21, title: 'M4 — MCP & sécurité', titleEn: 'M4 — MCP & security', phase: 'Module 4', phaseEn: 'Module 4', component: Slide08M4McpSecurite },
  { id: 'm4-bmad', index: 22, title: 'M4 — BMAD-METHOD', titleEn: 'M4 — BMAD-METHOD', phase: 'Module 4', phaseEn: 'Module 4', component: Slide08M4Bmad },
  { id: 'm4-conclusion', index: 23, title: 'Conclusion — Module 4', titleEn: 'Wrap-up — Module 4', phase: 'Module 4', phaseEn: 'Module 4', component: SlideModuleConclusionM4 },

  { id: 'divider-jour3', index: 24, title: 'Jour 3', titleEn: 'Day 3', phase: 'Jour 3', phaseEn: 'Day 3', component: SlideDividerJour3, isDivider: true },

  { id: 'm5-garde', index: 25, title: 'Garde — Module 5', titleEn: 'Cover — Module 5', phase: 'Module 5', phaseEn: 'Module 5', component: SlideModuleCoverM5, isDivider: true },
  { id: 'm5-harness', index: 26, title: 'M5 — Harness & contrat', titleEn: 'M5 — Harness & contract', phase: 'Module 5', phaseEn: 'Module 5', component: Slide09M5HarnessContrat },
  { id: 'm5-design-cycle', index: 27, title: 'M5 — DESIGN.md & cycle qualité', titleEn: 'M5 — DESIGN.md & quality cycle', phase: 'Module 5', phaseEn: 'Module 5', component: Slide09M5DesignCycle },
  { id: 'm5-conclusion', index: 28, title: 'Conclusion — Module 5', titleEn: 'Wrap-up — Module 5', phase: 'Module 5', phaseEn: 'Module 5', component: SlideModuleConclusionM5 },

  { id: 'm6-garde', index: 29, title: 'Garde — Module 6', titleEn: 'Cover — Module 6', phase: 'Module 6', phaseEn: 'Module 6', component: SlideModuleCoverM6, isDivider: true },
  { id: 'm6-stage-gate', index: 30, title: 'M6 — Stage-Gate & TP final', titleEn: 'M6 — Stage-Gate & final workshop', phase: 'Module 6', phaseEn: 'Module 6', component: Slide10M6StageGateTp },
  { id: 'm6-conclusion', index: 31, title: 'Conclusion — Module 6', titleEn: 'Wrap-up — Module 6', phase: 'Module 6', phaseEn: 'Module 6', component: SlideModuleConclusionM6 },

  { id: 'vibe-coding', index: 32, title: 'Synthèse — 5 compétences', titleEn: 'Summary — 5 skills', phase: 'Synthèse', phaseEn: 'Summary', component: Slide09VibeCoding },
  { id: 'evaluation', index: 33, title: 'Évaluation & livrables', titleEn: 'Assessment & deliverables', phase: 'Synthèse', phaseEn: 'Summary', component: Slide10Evaluation },
  { id: 'divider-qa', index: 34, title: 'Échanges', titleEn: 'Discussion', phase: 'Échanges', phaseEn: 'Discussion', component: SlideDividerQA, isDivider: true },
  { id: 'qa', index: 35, title: 'Q&A', titleEn: 'Q&A', phase: 'Échanges', phaseEn: 'Discussion', component: SlideEndQA },
]

export const totalSlides = slides.length
export const slidesFull = slides

export const slidesLight: SlideEntry[] = slidesFull
  .filter((s) => LIGHT_IDS.has(s.id))
  .map((s, i) => ({ ...s, index: i + 1, variants: ['full', 'light'] }))

export function getSlidesByVariant(variant: DeckVariant): SlideEntry[] {
  return variant === 'light' ? slidesLight : slidesFull
}
