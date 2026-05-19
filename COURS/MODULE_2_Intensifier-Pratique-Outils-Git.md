# MODULE 2 : Intensifier la pratique — outillage, Git d’équipe, labs et garde-fous

**Parcours** : Jour 1 — après-midi (~3 h 30)  
**Objectifs** : Consolider l’usage des IDE agentiques, ancrer Git + IA en équipe, enchaîner des mini-projets ; sécuriser et structurer avant d’aborder les agents (J2).

---

## 🎯 Objectifs pédagogiques

- Utiliser l’agent sur plusieurs types de livrables (UI, API, doc, tests, perf)
- Mettre en place des pratiques Git compatibles multi-agents et revue
- Appliquer des garde-fous entreprise (sécurité, perf, architecture, tests)

---

## 📅 Planning (demi-journée)


| Horaire           | Séquence                        | Durée  | Contenu                                                                              |
| ----------------- | ------------------------------- | ------ | ------------------------------------------------------------------------------------ |
| **13h30 - 14h00** | **Panorama outillage**          | 30min  | Cursor, Antigravity, Copilot, Windsurf, Continue, Junie, Claude Code : forces / cas d’usage |
| **14h00 - 14h30** | **Git + IA équipes**            | 30min  | Workflows, branches, MR/PR, conventions de commits                                   |
| **14h30 - 16h30** | **Ateliers (labs)**             | 120min | Mini-projets vibe coding (voir ci-dessous)                                           |
| **16h30 - 16h45** | **☕ PAUSE**                     | 15min  |                                                                                      |
| **16h45 - 17h30** | **Bonnes pratiques entreprise** | 45min  | OWASP, perf, Clean Architecture, pièges TDD / tests avec LLM                         |

---

## 📚 Contenu détaillé

### 1. Panorama outillage

Complément au module 1 : choisir l’outil selon le poste (plan vs agent, intégration Git, MCP, modèle). Pas d’exhaustivité  : l’objectif est de **savoir trancher** pour la suite de la formation. **Antigravity** mérite une mention explicite : c’est l’entrée **agent-first** de Google sur le même terrain que Cursor / Windsurf, avec une mise en avant des **agents multiples** et de l’écosystème Gemini.


| Outil                  | Présentation (en une phrase)                                                                                                                                                          | Points forts (retours web / presse tech)                                                                                                                                                                                    | Limites (retours web / presse tech)                                                                                                                                                                                                                                                                                    |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Claude Code**        | Agent de développement en terminal, lié à l’écosystème Anthropic, qui parcourt le dépôt, exécute des commandes et applique des changements multi-fichiers guidés par la conversation. | Souvent cité comme très performant en « agentic coding » ; grande fenêtre de contexte utile sur des bases multi-fichiers ; qualité de raisonnement et d’explication du code hérité fréquemment saluées.                     | Mémoire de session limitée et compaction du contexte perçues comme une perte d’information ; évolution des quotas et des conditions d’usage ; le résultat reste tributaire de la rigueur des tests et de la revue humaine.                                                                                             |
| **Cursor**             | IDE dérivé de VS Code avec complétion, chat et mode agent intégrés pour éditer, générer et refactoriser directement dans le projet.                                                   | Courbe d’apprentissage faible pour les habitués de VS Code ; refactors multi-fichiers avec prévisualisation ; mode agent avec garde-fous ; offres entreprise / confidentialité souvent mises en avant dans les comparatifs. | Signalements récurrents de lourdeurs (CPU/RAM) ou de ralentissements ; gains de productivité réels mais plus modestes que le marketing initial ; plafonds d’usage sur l’abonnement ; risques de dérive sur très gros dépôts sans pilotage.                                                                             |
| **Antigravity (Google)** | IDE « agent-first » (fork de VS Code) qui orchestre des agents sur l’éditeur, le terminal et un navigateur intégré, autour de Gemini et, selon les versions, d’autres modèles. | Surface « manager » pour suivre plusieurs agents et workspaces ; artefacts de suivi (plans, captures) mis en avant par Google ; fortes capacités agentiques et intégration Gemini ; système d’autorisations affiné dans les grosses mises à jour rapportées par la presse tech. | Produit récent : maturité UX et fiabilité encore en mouvement ; ancrage compte / cloud Google et limites de débit ; concurrence frontale avec Cursor et Windsurf sur le même créneau. |
| **GitHub Copilot**     | Assistant d’IA intégré à l’IDE (VS Code, JetBrains, Xcode, Neovim, etc.) et à GitHub : complétions inline, chat, revue de PR et extensions (dont agent / workspace selon l’offre). | Forte intégration Git (PR, issues, Actions) ; déploiement entreprise courant (SSO, politiques, IP indemnification sur les offres Business) ; complétions rapides sur le code du quotidien ; écosystème d’extensions et de modèles (dont premium). | Comparatifs : moins « agent autonome » que certains concurrents sur gros chantiers multi-fichiers ; qualité variable selon langage et contexte ; vigilance sur la confidentialité du code sans paramétrage entreprise ; paliers d’abonnement et modèles avancés souvent facturés en plus.                               |
| **Codex** (CLI OpenAI) | Agent en ligne de commande (open source côté client) pour analyser le dépôt, proposer des diffs, lancer des commandes et reprendre une session avec consignes d’équipe.               | Approbation des actions configurable ; support MCP, sous-agents et reprise via transcripts / `AGENTS.md` ; modes planification avant implémentation mis en avant par la documentation officielle.                           | Efficacité très dépendante d’un cadrage clair (objectif, contraintes, critères de fin) ; moins de retours d’expérience long format que les leaders IDE au moment des articles comparatifs ; toujours nécessité d’une validation humaine sur le sûr et le métier.                                                       |
| **OpenCode**           | Agent de code open source (terminal, desktop bêta, extensions) connectable à de nombreux fournisseurs de modèles, y compris local.                                                    | MIT, choix du LLM, intégration LSP, absence de stockage imposé du code par l’outil selon la documentation ; coût potentiellement maîtrisé par rapport aux abonnements « tout-en-un ».                                       | Mise en route plus exigeante que les outils clé en main (clés API, `/init`, configuration) ; expérience très orientée terminal ; comparatifs signalent une ergonomie d’annulation / retour en arrière moins immédiate que sur certains concurrents.                                                                    |
| **Mistral Vibe**       | Agent CLI européen de Mistral, centré dépôt Git et modifications multi-fichiers, avec MCP et personnalisation type « skills ».                                                        | Coût souvent présenté comme compétitif ; argumentaire souveraineté / RGPD ; grands contextes avec les familles de modèles Mistral ; possibilité d’auto-hébergement pour des contraintes de données.                         | Produit récent : retours de limites de débit, bugs ou maturité infra selon les tests de la presse spécialisée ; Windows souvent considéré comme secondaire ; écart de benchmarks par rapport aux modèles « frontier » propriétaires ; licence des poids ouverts avec clauses pour les très grands acteurs économiques. |
| **Junie** (JetBrains)  | Agent de codage intégré aux IDE JetBrains : il planifie, modifie le code et enchaîne tests ou build selon des modes de contrôle plus ou moins automatiques. | Exploitation fine du modèle de projet IntelliJ (navigation, refactors, intentions) ; modes du type approbation / plus autonome ; tarification forfaitaire souvent mise en avant par rapport au seul paiement à l’usage token. | Couverture langages / frameworks et disponibilité par IDE ou OS à vérifier sur la feuille de route ; risque de changements trop larges sur des questions simples ; chevauchement perçu avec JetBrains AI Assistant selon les retours utilisateurs. |
| **Continue**           | Extension open source pour VS Code et JetBrains : chat, modèles au choix, contexte riche et personnalisation avancée (dont MCP selon la configuration). | Pas de verrouillage éditeur unique ; support de nombreux fournisseurs et modèles locaux (ex. Ollama) ; idéal en formation pour **BYOK**, transparence des prompts et gouvernance des clés ; Apache 2.0. | Configuration plus exigeante que les offres « batteries incluses » ; UX et stabilité variables selon les retours ; expérience agentique moins « autopilot » que Cursor ou Windsurf sans réglage et sans bons garde-fous projet. |
| **Windsurf**           | IDE centré sur l’IA (base VS Code) de Codeium, avec l’agent **Cascade** qui enchaîne lecture du dépôt, planification et modifications multi-fichiers. | Cascade souvent salué pour expliquer les étapes pendant l’exécution ; tarification perçue comme compétitive ; complétions rapides ; prise en main facile pour les profils VS Code ; « mémoires » de style ou de conventions fréquemment citées dans les retours. | Stabilité parfois critiquée ; usage crédité sur l’agent et le chat ; communauté plus petite que les leaders ; plafonds de confort sur refactorings très transverses selon certains comparatifs avec Cursor. |
| **Lovable**            | Générateur d’applications web (souvent React) par chat et édition visuelle, avec hébergement et intégration typique Supabase pour données et auth.                                    | Time-to-prototype très court ; export vers GitHub et poursuite possible dans un IDE classique ; intégration base / auth / temps réel prête à l’emploi pour beaucoup de MVPs.                                                | Modèle à crédits jugé vite coûteux à l’itération ; nombreux avis « jusqu’à ~70 % puis friction » pour durcir en production ; couplage fort à l’écosystème Supabase pour le backend managé ; dérive du modèle projet si l’on sort trop de la boucle édition prévue par l’outil.                                         |


### 2. Git + IA pour équipes

- **Commiter souvent** : points de retour si l’agent part dans une mauvaise direction
- **Respecter un git workflow** même en solo : branches par fonctionnalité pour lancer plusieurs agents ou expérimentations en parallèle
- Utiliser `gh` / `glab` en CLI lorsque c’est suffisant (éviter la surcouche MCP quand la latence ou le bruit contextuel pénalisent)
- Workflows collaboratifs : multi-branches, MR/PR, résolution de conflits assistée
- Revues automatisées et **conventions de commits** alignées projet

### 3. Ateliers (labs)

**Objectif** : monter en intensité sur l’agent + Git.

#### Exemple 1 : Blog statique

Créer un générateur de blog statique avec IA.  
**Livrables** : site fonctionnel, générateur de contenu.

#### Exemple 2 : Dashboard simple

Tableau de bord avec visualisation de données.  
**Livrables** : dashboard interactif, graphiques.

#### Exemple 3 : API CRUD

API REST avec persistance.  
**Livrables** : API fonctionnelle, documentation type Swagger / OpenAPI.

#### Exemple 4 : Documentation uniformisée

Trouver un prompt efficace pour documenter des projets existants de façon homogène.  
**Livrables** : doc générée, templates réutilisables.

#### Exemple 5 : Tests

Rédiger des tests pour du code existant.  
**Livrables** : tests unitaires / intégration / perf / sécurité, cahier de recette pour le fonctionnel.

#### Exemple 6 : Optimisation

Optimiser du code existant (perf, dette).  
**Livrables** : factorisation, audit sécurité, rapport perf, accessibilité si pertinent.

*Le formateur ajuste le nombre d’exemples traités selon le niveau du groupe.*

### 4. Bonnes pratiques entreprise

- **Merge / hooks** : règles de merge, messages de commit, pre-commit / CI (lint, tests)
- **Sécurité** : OWASP Top 10, couverture, duplication, analyse statique
- **Performance** : optimisation assistée sans « magie » aveugle
- **Clean Architecture** : SOLID, hexagonal, DDD selon contexte
- **Tests** : vigilance TDD avec LLM ; risque de modification des tests ou du code sans validation explicite
- **Points de vigilance** : compression de contexte, perte d’info, hallucinations, prise en compte tardive des nouveaux fichiers

---

## 🔗 Enchaînement

**Module 3** : théorie des agents, premières configurations Rules / Skills / MCP.