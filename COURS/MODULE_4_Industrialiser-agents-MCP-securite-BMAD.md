# MODULE 4 : Industrialiser les agents — MCP avancé, sécurité opérationnelle et méthode BMAD

**Parcours** : Jour 2 — après-midi (~3 h 30)  
**Objectifs** : Enrichir les intégrations MCP et skills en contexte réel ; traiter la sécurité des chaînes agentiques ; structurer un flux de développement avec BMAD.

---

## 🎯 Objectifs pédagogiques

- Brancher des serveurs MCP représentatifs (doc, forge, navigateur / tests)
- Identifier menaces et défenses sur les agents
- Appliquer la BMAD-METHOD sur un cas guidé

---

## 📅 Planning (demi-journée)


| Horaire           | Séquence                   | Durée  | Contenu                                                 |
| ----------------- | -------------------------- | ------ | ------------------------------------------------------- |
| **13h30 - 14h45** | **Skills et MCP avancés**  | 75min  | Serveurs MCP utiles en entreprise, configuration ciblée |
| **14h45 - 15h15** | **Sécurité des agents IA** | 30min  | Menaces récentes, défenses pratiques                    |
| **15h15 - 15h30** | **☕ PAUSE**                | 15min  |                                                         |
| **15h30 - 17h15** | **BMAD-METHOD + TP**       | 105min | Méthode, installation, déroulé, lecture des livrables   |
| **17h15 - 17h30** | **Bilan J2**               | 15min  | Retour sur la journée                                   |


---

## 📚 Contenu détaillé

### 1. Skills et intégrations MCP avancées

Objectif : dépasser le « premier MCP » du module 3.

**Pistes de travail (adapter au contexte client / formation)** :

- **Documentation à jour** : MCP type Context7 (ou équivalent) pour réduire les hallucinations d’API
- **Forge logicielle** : intégration GitLab / GitHub (issues, MR) — privilégier la **ciblage** des outils exposés pour limiter contexte et risques
- **Navigateur / UI** : MCP navigateur ou Playwright pour scénarios contrôlés
- **Règles d’usage** : quand préférer `gh` / `glab` en CLI plutôt qu’un MCP (latence, bruit, périmètre)

**Atelier** : choisir 1–2 serveurs MCP, les configurer, documenter dans les skills / rules le **périmètre autorisé** (repos, branches, secrets jamais passés en prompt).

### 2. Sécurité des agents IA

#### Menaces (perspective développeur)

- **Prompt injection** : manipulation via prompts ou contenus embarqués (docs, tickets, pages web)
- **Hallucination attacks** : exploitation de réponses fragiles (risque en baisse avec les modèles récents, reste à contrôler)

#### Exploitations à anticiper

- **Data leakage** : fuite de données sensibles via contexte ou outils
- **Agent hijacking** : détournement du plan d’action (outils, shell, déploiements)

#### Défenses pratiques

- **Input validation** : filtrage des sources, limitation des recherches ouvertes, contrôle du code récupéré
- **Output filtering** : relecture humaine du code et des commentaires générés
- **Sandboxing** : isolation lorsque le risque l’exige
- **Monitoring** : activité réseau, journaux d’outils, politiques sur les secrets

### 3. BMAD-METHOD

C'est une méthode de développement logiciel qui utilise les agents IA pour automatiser et améliorer le processus de développement.

Voir le site web [https://bmadcodes.com/](https://bmadcodes.com/) pour plus de détails.

**B**rainstorm → **M**odel → **A**rchitect → **D**evelop

- **Brainstorm** : génération d'idées avec agents IA
- **Model** : modélisation assistée (UML, diagrammes)
- **Architect** : architecture technique avec validation IA
- **Develop** : développement orchestré par agents

### 4. TP guidé : BMAD-METHOD

- Installer BMAD
- Lancer le processus BMAD
- Étudier les résultats (qualité, dette, alignement avec le besoin)

---

## 🔗 Enchaînement

**Module 5** : harness engineering, contrat de contexte, usage de l’IA sur tout le cycle (debug, tests, review).