# 🚀 DOSSIER DE DÉLÉGATION JULES (GOOGLE) — BUSINESS OFFICE 3 OS

> **Destinataire :** Agent Autonome Jules (Google)  
> **Commanditaire :** Amadou Kone (`amdkn`), Propriétaire & Architecte  
> **Objet :** Cahier des charges et feuille de route pour l'intégration complète de **Mobile OS** comme vue responsive native dans **Business Office 3 OS**.  
> **Dépôt source du Mobile OS à porter :** [`Amdkn/The-OMK-Mobile-Back-Office`](https://github.com/Amdkn/The-OMK-Mobile-Back-Office) (ou en local sur le poste : `C:\Users\amado\The-OMK-Mobile-Back-Office`)  
> **Dépôt de travail unifié :** [`Amdkn/Business-Office-3-OS`](https://github.com/Amdkn/Business-Office-3-OS)

---

## 🎯 1. Contexte & Mission Exécutive

Amadou Kone a défini la vision de **Business Office 3 OS** comme une matrice trimodale d'interfaces interconnectées partageant le même cœur technique :

1. **Vue 1 : Web Desktop Pro OS** (actuellement en place) : Interface bureau virtuel multi-fenêtres (draggable, resizable, dock).
2. **Vue 2 : Digital Garden SaaS OS** (actuellement en place) : Overlay exécutif complet type "Digital Garden" accessible depuis la TopBar avec ses 4 piliers (Cultivate, Nurture, Bloom, Roots) et ses 14 sous-pages sans écran blanc.
3. **Vue 3 : Mobile OS Edge Client** (**TA MISSION**) : L'expérience smartphone exécutive native conçue dans `The-OMK-Mobile-Back-Office`.

### 🚨 L'Objectif Clé pour Jules
Le Web Desktop peut être intimidant sur petits écrans ou lors d'un accès rapide en déplacement.  
Ta mission consiste à **porter et fusionner l'intégralité du Mobile OS (`The-OMK-Mobile-Back-Office`) dans ce dépôt**, de sorte que :
- **Par défaut sur mobile (< 768px)** : L'utilisateur arrive directement sur l'interface Mobile OS (Springboard, Dynamic Island, Haptique, Dock mobile).
- **Sur Desktop** : L'utilisateur peut à tout moment basculer ou ouvrir le simulateur / la vue Mobile OS via le switcher de vue dans la TopBar.
- **Les données sont 100% partagées** : Les applications du Mobile OS (Clients, Tasks, Finance, Sales, etc.) lisent et écrivent dans les mêmes repositories (`clientsRepo`, `sopsRepo`, `documentsRepo`, `invoicesRepo`) et le même store Zustand (`useShellStore`).

---

## 📂 2. Documents de Référence dans ce Dossier

- 📄 [**`PRD-Business-Office-3-OS-Mobile-Integration.md`**](./PRD-Business-Office-3-OS-Mobile-Integration.md) : Spécification fonctionnelle et technique détaillée étape par étape.
- 📄 [**`../AGENT.md`**](../AGENT.md) : Directives inviolables, âme Unlazy (zéro TODO, pas d'arrêt à 80%), et règles d'exécution.
- 📄 [**`../GEMINI.md`**](../GEMINI.md) : Règle d'or de persistance cognitive, compilation stricte et absence d'erreur TypeScript.

---

## ⚡ 3. Commandes de Validation Requises

Chaque incrément livré par Jules doit être validé par :

```bash
# 1. Vérification TypeScript stricte (0 erreur)
bun run tsc -p tsconfig.app.json --noEmit

# 2. Lancement du serveur dev
bun run dev --port 5174

# 3. Test HTTP 200
curl -I http://localhost:5174/
```
