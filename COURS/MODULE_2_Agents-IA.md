# MODULE 2 : Agents IA et Développement Agentique

**Durée** : 1 journée (7h)  
**Objectifs** : Maîtriser la conception et l'implémentation d'agents IA, comprendre le Model Context Protocol (MCP) et sécuriser les interactions

---

## 🎯 Objectifs pédagogiques

- Comprendre les différents types d'agents IA et leur anatomie technique
- Développer son agent IA
- Maîtriser les Rules, les Skills et le Model Context Protocol (MCP)
- Sécuriser les interactions avec les agents IA
- Appliquer la BMAD-METHOD pour structurer le développement

---

## 📅 Planning de la journée

| Horaire | Module | Durée | Contenu |
|:--------|:-------|:------|:--------|
| **9h00 - 9h30** | **Retour Challenge + Intro** | 30min | Partage agents imaginés, patterns récurrents |
| **9h30 - 10h15** | **Agents IA Théorie Avancée** | 60min | Types d'agents, anatomie technique, démo live |
| **10h30 - 10h45** | **☕ PAUSE** | 15min | |
| **10h45 - 11h15** | **Introduction Rules/Skills/MCP** | 30min | Model Context Protocol, démos API/DB |
| **11h15 - 12h30** | **TP : Introduction Rules/Skills/MCP** | 75min | Setup + débrief collectif |
| **12h30 - 13h30** | **🍽️ PAUSE DÉJEUNER** | 60min | |
| **13h30 - 14h30** | **Utilisation des Skills / Serveurs MCP** | 90min | Context 7 et intégration GitLab, Browser/Playwright, configuration MCP pratique |
| **14h30 - 15h00** | **Sécurité Agents IA** | 30min | Menaces 2026, défenses pratiques |
| **15h00 - 15h15** | **☕ PAUSE** | 15min | |
| **15h15 - 17h15** | **BMAD-METHOD** | 120min | BMAD-METHOD détaillée, impact métier développeur |
| **17h15 - 17h30** | **Bilan J2** | 15min | Retour sur la journée de formation |

---

## 📚 Contenu détaillé

### 1. Retour Challenge Overnight
- Partage des 3 agents imaginés par chaque participant
- Identification des patterns récurrents
- Classification selon les types d'agents

### 2. Agents IA : Théorie Avancée

#### Anatomie technique d'un agent
```
Agent IA = LLM + Rules + Skills + Contexte + Mode
```

- **LLM** : Moteur de raisonnement (GPT, Claude, Gemini)
- **Rules** : Règles systématiques
- **Skills** : Boîte à outils du LLM (MCP, API, ligne de commande, prompts etc.)
- **Contexte** : l'ensemble de la fenêtre de conversation actuelle + systèmes de mémoire court terme/long terme
- **Contrôle** : Mode plan/edit/ask/debug

![Anatomie technique d'un agent](COURS/Images/agent-ia.jpg)

#### Liste des modèles

| Modèle | Type | Commentaire |
|------|------|------|
| Gemini 3.1 Pro | High |  |
| Claude-Opus-4.6 | High | plus lent mais plus performant |
| Composer-1.5 | High | plus rapide, performance mal connue |
| Gemini 3.1 Flash | Medium |  |
| Claude-4.6-Sonnet | Medium |  |
| Composer-2 | Medium | rapide |
| ChatGPT-Codex-5.3 | Medium |  |
| Claude-4.6-Haiku | Low | rapide |
| Kimi K2.5 | Low | Quasiment gratuit |

#### Liste des uses cases

| Use case | Mode | Modèle | Commentaire |
|------|-------------|----------------|-------|
| Lint, debug simple | debug | Composer-1, Gemini-Flash, Haiku, Kimi K2 | modèles légers |
| Commit | agent | Composer-2, Gemini-Flash, Haiku, Kimi K2.5 |  |
| Lancer un script | agent | Composer-2, Gemini-Flash, Haiku, Kimi K2.5 |  |
| Optimiser le code | Plan | Claude-Opus, Gemini-Pro, Composer-2 | dérouler avec un modèle léger |
| Executer les tests | agent | Composer-2, Gemini-Flash, Haiku, Kimi K2.5 |  |
| Écrire des tests | agent | Composer-2, Gemini-Flash |  |
| Développer une fonctionnalité | plan | Composer-2, Claude-Sonnet, Gemini-Flash | Modèles moyens |
| Développer une epic | plan | Claude-Opus, Gemini-Pro, Composer-2 | dérouler avec un modèle moyen |

#### Le drift : perte de qualité dans le temps

Au plus le contexte est long, au plus le LLM a de mal à retrouver les informations pertinentes
- difficulté à faire la différence entre instructions et données
- difficulté à retrouver les informations pertinentes
- anciennes versions des fichiers présentes dans le contexte

Il en résulte une perte de qualité des réponses
- Favoriser l'utilisation de Rules plutôt que de prompts longs
- Utiliser des Skills pour fournir des informations contextuelles
- Limiter la taille du contexte en redémarrant régulièrement la conversation

#### Qu'est-ce que les Rules ?

Les rules sont un ensemble de règles systématiques qui sont appliquées par l'agent IA à chaque prompt.

Les rules sont rédigées en langage humain et peuvent faire référence à la documantation comme les ADR, le README.md etc.

Le format principal est le fichier [AGENTS.md](https://agents.md/) qui contient les règles systématiques. 
Voir le site web https://agents.md/ pour plus de détails.

#### Qu'est-ce que les Skills ?

C'est un ensemble de compétences que l'agent IA peut utiliser pour effectuer des actions. Ces outils sont considérés au cas par cas en fonction du prompt.
 Il faut le voir comme une boîte à outil dans laquelle le LLM peut regarder pour trouver de l'aide à réaliser ses tâches.

Les skills sont rédigés en langage humain et peuvent faire référence à des serveurs MCP, des API, des scripts etc.

![Concevoir et maintenir des skills](COURS/Images/SKILL.jpeg)

Voir le site web https://agentskills.io/home pour plus de détails.

#### Qu'est-ce que MCP ?
Protocole standardisé pour les agents IA.
Il permet de connecter le LLM d'une manière unique à des DB, des API, etc.

Les serveurs MCP peuvent fournir : 
- des données
- des outils
- des prompts

Voir le site web https://modelcontextprotocol.io/docs/getting-started/intro pour plus de détails.

#### Qu'est-ce que le Mode ?

C'est la manière dont l'agent IA va interagir avec vous et le code.

- **Mode plan**: Planification et raisonnement, il passera la main au mode edit. Ce mode est indispensable pour vibe-coder sérieusement.
- **Mode edit**: Rédaction de code, de test, de documentation, débogage, etc. 
- **Mode ask**: Sous-estimé, ce mode permet de *parler* à votre code. Il est utile pour découvrir un projet, comprendre les choix techniques etc. tout en étant certain que l'agent ne modifie rien.
- **Mode debug**: l'agent n'ajoute pas de fonction et ne fait que corriger le code existant

Selon l'IDE, tous les modes ne sont pas disponibles. Par exemple, dans Antigravity, le mode ask et le mode debug ne sont pas disponibles.

### 3. TP : Configuration Rules/Skills/MCP

#### Partie 1 : Rules
- Rédaction d'un fichier AGENTS.md
- Tests avec votre agent

#### Partie 2 : Skills
- Rédaction de skills : pensez à inclure la documentation (https://agentskills.io/home) car les LLM sont encore peu au fait de la spécification des skills
- Tests avec votre agent

#### Partie 3 : MCP Pratique
- Trouver un MCP à tester
- Intégration avec vos rules et/ou vos skills
- Tests avec votre agent

### 4. Sécurité des Agents IA

#### Menaces 2026
- **Prompt Injection** : Manipulation via prompts malveillants
- **Hallucination Attacks** : Exploitation des hallucinations (risque de plus en plus faible, les modèles progressent)

### Exploitations 2026
 **Data Leakage** : Fuite de données sensibles
- **Agent Hijacking** : Prise de contrôle de l'agent

#### Défenses pratiques
- **Input Validation** : Validation des entrées, bloquer les recherches web, contrôler le code récupéré
- **Output Filtering** : Validation des sorties, lire le code généré et les commentaires de l'agent
- **Sandboxing** : Isolation des agents, peu pratique mais possible si le contexte le nécessite
- **Monitoring** : Surveillance continue via surveillance de l'activité réseau de l'agent (Firewall, Proxy, etc.)

### 5. BMAD-METHOD

C'est une méthode de développement logiciel qui utilise les agents IA pour automatiser et améliorer le processus de développement. 

Voir le site web https://bmadcodes.com/ pour plus de détails.

**B**rainstorm → **M**odel → **A**rchitect → **D**evelop

- **Brainstorm** : Génération d'idées avec agents IA
- **Model** : Modélisation assistée (UML, diagrammes)
- **Architect** : Architecture technique avec validation IA
- **Develop** : Développement orchestré par agents

### 6. TP guidé : BMAD-METHOD 

- Installer BMAD
- lancer le processus BMAD
- étudier les résultats

---

**Prochaine étape** : Jour 3 - Context Engineering et Projet Final
