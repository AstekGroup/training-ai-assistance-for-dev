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
| **10h45 - 12h00** | **Mon Premier Agent** | 75min | Setup + Agent "Code Reviewer" + débrief collectif |
| **12h00 - 12h30** | **Introduction Rules/Skills/MCP** | 30min | Model Context Protocol, démos API/DB |
| **12h30 - 13h30** | **🍽️ PAUSE DÉJEUNER** | 60min | |
| **13h30 - 15h00** | **Utilisation des Skills / Serveurs MCP** | 90min | Context 7 et intégration GitLab, Browser/Playwright, configuration MCP pratique |
| **15h00 - 15h15** | **☕ PAUSE** | 15min | |
| **15h15 - 16h45** | **Sécurité Agents IA** | 90min | Menaces 2025, défenses pratiques, atelier sécurité |
| **16h45 - 17h30** | **Frameworks + Bilan J2** | 45min | BMAD-METHOD détaillée, impact métier développeur |

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

#### Qu'est-ce que les Rules ?

Les rules sont un ensemble de règles systématiques qui sont appliquées par l'agent IA à chaque prompt.

Les rules sont rédigées en langage humain et peuvent faire référence à la documantation comme les ADR, le README.md etc.

Le format principal est le fichier (https://agents.md/)[AGENTS.md] qui contient les règles systématiques. 
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

### 3. Mon Premier Agent : Code Reviewer

#### Objectif
Développer un agent capable de reviewer du code selon les standards entreprise

#### Étapes
- Définition du rôle et des règles
- Utilisation des outils (linters, analyseurs)
- Gestion de la mémoire
- Boucle de review

#### Test et débrief
- Tests sur du code réel
- Partage collectif des résultats

### 4. TP : Configuration Rules/Slash Commands/Skills/MCP

On reprend notre agent reviewer. N'ayez pas peur de recommencer de zéro si vous avez des soucis.

#### Partie 1 : Rules/Slash Commands/Skills (45min)
- Rédaction d'un fichier AGENTS.md
- Configuration de slash commands
- Rédaction de skills : utilisation de `gh` (ou `glab`)

#### Partie 2 : MCP Pratique (45min)
- Trouver un MCP de code review pertinent pour votre agent Code Reviewer (par exemple Python Project Analyzer, .Net Static Analysis etc.)
- Intégration avec agent Code Reviewer
- Tests d'intégration

### 5. Sécurité des Agents IA

#### Menaces 2026
- **Prompt Injection** : Manipulation via prompts malveillants
- **Data Leakage** : Fuite de données sensibles
- **Agent Hijacking** : Prise de contrôle de l'agent
- **Hallucination Attacks** : Exploitation des hallucinations

#### Défenses pratiques
- **Input Validation** : Sanitization des entrées
- **Output Filtering** : Validation des sorties
- **Sandboxing** : Isolation des agents
- **Monitoring** : Surveillance continue

#### Atelier sécurité
- Attaques simulées
- Mise en place de guardrails
- Tests de robustesse

### 6. BMAD-METHOD

C'est une méthode de développement logiciel qui utilise les agents IA pour automatiser et améliorer le processus de développement. 

Voir le site web https://bmadcodes.com/ pour plus de détails.

#### Présentation détaillée
**B**rainstorm → **M**odel → **A**rchitect → **D**evelop

- **Brainstorm** : Génération d'idées avec agents IA
- **Model** : Modélisation assistée (UML, diagrammes)
- **Architect** : Architecture technique avec validation IA
- **Develop** : Développement orchestré par agents

#### Impact métier développeur
- Gain de productivité (30-50%)
- Amélioration qualité
- Réduction de la dette technique
- Nouvelles compétences requises

---

**Prochaine étape** : Jour 3 - Context Engineering et Projet Final
