# MODULE 3 : Concevoir la stack agent — anatomie, Rules, Skills et premières intégrations MCP

**Parcours** : Jour 2 — matin (~3 h 30)  
**Objectifs** : Comprendre l’anatomie d’un agent, le choix des modèles et modes ; mettre en œuvre Rules, Skills et un premier socle MCP.

---

## 🎯 Objectifs pédagogiques

- Classifier les types d’agents et leurs usages
- Relier LLM, Rules, Skills, contexte et modes d’interaction
- Configurer `AGENTS.md`, des skills et un serveur MCP de base

---

## 📅 Planning (demi-journée)


| Horaire           | Séquence                     | Durée | Contenu                                            |
| ----------------- | ---------------------------- | ----- | -------------------------------------------------- |
| **9h00 - 9h30**   | **Retour challenge + intro** | 30min | Partage des 3 agents imaginés, patterns récurrents |
| **9h30 - 10h30**  | **Agents IA — théorie**      | 60min | Types, anatomie, modèles, use cases, drift         |
| **10h30 - 10h45** | **☕ PAUSE**                  | 15min |                                                    |
| **10h45 - 11h15** | **Rules, Skills, MCP**       | 30min | Concepts et démos API / DB                         |
| **11h15 - 12h30** | **TP : Rules, Skills, MCP**  | 75min | Setup + débrief collectif                          |


*L’après-midi du jour 2 est couvert par le **module 4** (MCP poussé, sécurité, BMAD).*

---

## 📚 Contenu détaillé

### 1. Retour challenge overnight

- Partage des 3 agents imaginés par chaque participant
- Identification des patterns récurrents
- Classification selon les types d’agents

### 2. Agents IA : théorie avancée

#### Anatomie technique d'un agent

```
Agent IA = LLM + Rules + Skills + Contexte + Mode
```

- **LLM** : moteur de raisonnement (GPT, Claude, Gemini, etc.)
- **Rules** : règles systématiques
- **Skills** : boîte à outils du LLM (MCP, API, CLI, prompts, etc.)
- **Contexte** : fenêtre de conversation + mémoire court / long terme selon outil
- **Contrôle** : modes plan / edit / ask / debug

Anatomie technique d'un agent

#### Liste des modèles


| Modèle            | Type   | Commentaire                                            |
| ----------------- | ------ | ------------------------------------------------------ |
| Gemini 3.1 Pro    | High   |                                                        |
| Claude-Opus-4.7   | High   | meilleur modèle à l'heure actuelle                     |
| Gemini 3.1 Flash  | Medium |                                                        |
| Claude-4.6-Sonnet | Medium |                                                        |
| Composer-2        | Medium | rapide                                                 |
| Claude-4.6-Haiku  | léger  | rapide mais peu doué                                   |
| Mistral           | léger  | Solution souveraine au rapport qualité/coût avantageux |
| Kimi K2.5         | léger  | Quasiment gratuit                                      |


#### Liste des use cases


| Use case                      | Mode  | Commentaire                                                                                                              |
| ----------------------------- | ----- | ------------------------------------------------------------------------------------------------------------------------ |
| Lint, debug simple            | debug | modèles légers                                                                                                           |
| Commit                        | agent | modèles légers                                                                                                           |
| Lancer un script              | agent | selon le cas. Modèle léger pour juste avoir un résultat, utiliser un modèle moyen ou high si besoin d'actions immédiates |
| Optimiser le code             | Plan  | utiliser un modèle high, dérouler avec un modèle léger                                                                   |
| Exécuter les tests            | agent | selon le cas. Modèle léger pour juste avoir un résultat, utiliser un modèle moyen ou high si besoin d'actions immédiates |
| Écrire des tests              | agent | modèles moyens                                                                                                           |
| Développer une fonctionnalité | plan  | modèles moyens                                                                                                           |
| Développer une epic           | plan  | Modèle high puis dérouler avec un modèle moyen                                                                           |


#### Le drift : perte de qualité dans le temps

Au plus le contexte est long, au plus le LLM a de mal à retrouver les informations pertinentes :

- difficulté à faire la différence entre instructions et données
- difficulté à retrouver les informations pertinentes
- anciennes versions des fichiers présentes dans le contexte

Il en résulte une perte de qualité des réponses :

- Favoriser l'utilisation de Rules plutôt que de prompts longs
- Utiliser des Skills pour fournir des informations contextuelles
- Limiter la taille du contexte en redémarrant régulièrement la conversation

#### Qu'est-ce que les Rules ?

Les rules sont un ensemble de règles systématiques appliquées par l'agent à chaque prompt.

Les rules sont rédigées en langage humain et peuvent faire référence à la documentation (ADR, README, etc.).

Le format principal est le fichier [AGENTS.md](https://agents.md/) qui contient les règles systématiques.  
Voir le site web [https://agents.md/](https://agents.md/) pour plus de détails.

#### Qu'est-ce que les Skills ?

C'est un ensemble de compétences que l'agent peut utiliser pour effectuer des actions. Ces outils sont considérés au cas par cas en fonction du prompt.  
À voir comme une boîte à outils dans laquelle le LLM puise pour réaliser ses tâches.

Les skills sont rédigés en langage humain et peuvent faire référence à des serveurs MCP, des API, des scripts, etc.

Concevoir et maintenir des skills

Voir le site web [https://agentskills.io/home](https://agentskills.io/home) pour plus de détails.

#### Qu'est-ce que MCP ?

Protocole standardisé pour les agents IA. Il permet de connecter le LLM de manière uniforme à des bases, API, etc.

Les serveurs MCP peuvent fournir :

- des données
- des outils
- des prompts

Voir le site web [https://modelcontextprotocol.io/docs/getting-started/intro](https://modelcontextprotocol.io/docs/getting-started/intro) pour plus de détails.

#### Qu'est-ce que le Mode ?

C'est la manière dont l'agent interagit avec vous et le code.

- **Mode plan** : planification et raisonnement ; passage ensuite au mode edit. Indispensable pour vibe-coder sérieusement.
- **Mode edit** : rédaction de code, tests, documentation, débogage, etc.
- **Mode ask** : dialogue sans modification — utile pour explorer un projet ou des choix techniques.
- **Mode debug** : l'agent ne rajoute pas de fonctionnalités et corrige le code existant.

Selon l'IDE, tous les modes ne sont pas disponibles. Par exemple, dans Antigravity, le mode ask et le mode debug ne sont pas disponibles.

### 3. TP : configuration Rules / Skills / MCP

#### Partie 1 : Rules

- Rédaction d'un fichier AGENTS.md
- Tests avec votre agent

#### Partie 2 : Skills

- Rédaction de skills : inclure la documentation ([https://agentskills.io/home](https://agentskills.io/home)) car les LLM sont encore peu au fait de la spécification des skills
- Tests avec votre agent

#### Partie 3 : MCP pratique

- Trouver un MCP à tester
- Intégration avec vos rules et/ou vos skills
- Tests avec votre agent

---

## 🔗 Enchaînement

**Module 4** : MCP et skills en profondeur, sécurité des agents, méthode BMAD et TP associé.