# Glossaire du Vibe Coding

Ce glossaire regroupe les termes spécifiques au Vibe Coding et au développement assisté par IA abordés dans la formation.

## A
- **Agent IA** : Écosystème complet composé de LLM + Rules + Skills + Contexte + Mode, permettant d'exécuter des tâches d'assistance au développement de manière autonome ou semi-autonome.
- **AGENTS.md** : Fichier constituant le format principal des *Rules*. Il contient les règles systématiques appliquées par l'agent IA à chaque instruction et peut faire référence à la documentation existante.

## B
- **BMAD-METHOD** : Méthode de développement logiciel utilisant les agents IA pour automatiser et améliorer le processus, selon 4 phases : **B**rainstorm, **M**odel, **A**rchitect, **D**evelop.

## C
- **Context Engineering** (ou *Ingénierie du Contexte*) : Gestion de la mémoire et des informations fournies aux agents IA pour optimiser la pertinence de leurs actions et réduire le *drift*.
- **Contexte** : L'ensemble des informations disponibles pour l'agent IA, comprenant la fenêtre de conversation actuelle ainsi que les systèmes de mémoire à court ou long terme.
- **Contrat de Contexte** : Document définissant précisément l'environnement de travail d'un agent IA. Il repose sur 6 piliers : Rôle, Objectif, Contraintes, Contexte, Format attendu et Validation.

## D
- **Drift** : Perte de qualité et de pertinence des réponses d'un LLM dans le temps, survenant lorsque le contexte s'allonge et que l'IA a du mal à retrouver les informations pertinentes.

## H
- **Harness Engineering** : L'art de créer un environnement de travail optimisé pour les agents IA afin de s'assurer qu'ils comprennent le contexte et fournissent des résultats précis.
- **Human-in-the-loop** : Principe essentiel du Vibe Coding consistant à conserver un contrôle et une validation humaine stricte sur les résultats (notamment lors des *Gates* de la méthode *Stage Gate*).

## L
- **LLM (Large Language Model)** : Moteur de raisonnement fondamental au cœur d'un agent IA (ex: GPT, Claude, Gemini).

## M
- **MCP (Model Context Protocol)** : Protocole standardisé par l'industrie permettant de connecter les agents IA à des sources de données locales ou distantes (API, bases de données, etc.).
- **Modes (d'interaction)** : Différentes manières pour un agent IA d'interagir avec le code et l'utilisateur. Les principaux sont :
  - *Mode plan* : Planification et raisonnement.
  - *Mode edit* : Rédaction et modification de code.
  - *Mode ask* : Échange et exploration sans modification du code.
  - *Mode debug* : Correction exclusive de code existant.

## P
- **Prompt Engineering** : Ingénierie de prompt avancée, consistant à concevoir des instructions claires, à fournir du contexte structuré et à encadrer la réflexion de l'IA (ex: *Chain-of-Thought*).

## R
- **Rules** : Ensemble de règles contextuelles systématiques, souvent centralisées (par ex. dans un fichier `AGENTS.md`), qui encadrent globalement le comportement de l'agent.

## S
- **Skills** : "Boîte à outils" du LLM. Il s'agit des compétences ponctuelles que l'agent peut appeler pour réaliser des actions précises (lecture de fichiers, requêtes MCP, scripts).
- **Spec Driven Development** : Approche de développement où la rédaction de spécifications détaillées et de contrats clairs pilote la génération du code par les agents IA, permettant de garantir la conformité aux besoins originaux.
- **Stage Gate** : Cadre de gestion de projet (ou *Phase-Gate*) divisant le développement assisté par IA en étapes de production (*Stages*) séparées par des étapes de validation humaine obligatoires (*Gates*).

## T
- **Token** : Unité de base (morceau de mot, caractère) utilisée par le LLM pour traiter le texte. Les limitations en tokens définissent la taille de la "fenêtre de contexte", déterminant la quantité d'informations qu'un modèle peut analyser et prendre en compte en une seule itération.

## V
- **Vibe Coding** : Pratique de développement consistant à maîtriser l'assistance et les agents IA pour créer des logiciels, mener des tests ou gérer des sprints. Cette pratique repose sur **5 compétences clés** :
  1. *Thinking* (Réflexion assistée)
  2. *Prompting* (Ingénierie de prompt)
  3. *Tools* (Maîtrise des outils de l'écosystème IA)
  4. *Context* (Gestion de la mémoire et de l'information)
  5. *Review* (Revue critique humaine)
