# 📱 PRD — Intégration Native du Mobile OS dans Business Office 3 OS

> **Statut :** Approuvé pour exécution  
> **Priorité :** P0 — Core Architectural Pivot  
> **Agent Assigné :** Jules (Google)  
> **Auteur :** Amadou Kone (`amdkn`) via Antigravity  
> **Stack :** React 19, Vite, TypeScript, Tailwind CSS v4, Zustand, Lucide Icons

---

## 1. OBJECTIF & VISION PRODUIT

L'infrastructure Business Office 3 OS doit devenir **Trimodale** :
```
                          ┌───────────────────────────┐
                          │   BUSINESS OFFICE 3 OS    │
                          └─────────────┬─────────────┘
                                        │
           ┌────────────────────────────┼────────────────────────────┐
           ▼                            ▼                            ▼
┌──────────────────────┐     ┌──────────────────────┐     ┌──────────────────────┐
│  VUE 1 : PRO DESKTOP │     │  VUE 2 : SAAS GARDEN │     │   VUE 3 : MOBILE OS  │
│  Multi-Window Shell  │     │  Executive Overlay   │     │  Edge Smartphone OS  │
│  Bureau Virtuel      │     │  Rideau TopBar       │     │  Vue Mobile Défaut   │
└──────────────────────┘     └──────────────────────┘     └──────────────────────┘
```

Actuellement, les Vues 1 et 2 sont fusionnées et opérationnelles dans `src/components/Desktop.tsx` et `src/components/saas/SaasGardenOverlay.tsx`.  
**La Vue 3 (`The-OMK-Mobile-Back-Office`) doit être intégrée dans `src/components/mobile/` pour compléter la triade.**

---

## 2. COMPOSANTS DU CODEBASE SOURCE À PORTER

Le dépôt `The-OMK-Mobile-Back-Office` (situé en local dans `C:\Users\amado\The-OMK-Mobile-Back-Office`) contient les briques architecturales suivantes que Jules doit importer et adapter :

### 2.1 Coeur Système Mobile (`src/components/`)
1. **`DynamicIsland.tsx`** :
   - Capsule interactive multi-états (compact, expanded, alert, music/voice, agent telemetry).
   - Padding sécurisé `pt-16` pour éviter tout conflit avec l'encoche écran.
2. **`HomeScreen.tsx` & `SortableAppIcon.tsx`** :
   - Springboard avec grille d'applications 4x4.
   - Support des dossiers intelligents (`SmartFolderIcon.tsx`, `SmartFolderModal.tsx`).
   - Dock fixe en bas (4 apps principales : Téléphone/Agents, Finance, Tasks, Safari/Web).
3. **`StatusBar.tsx`** :
   - Horloge temps réel, icônes WiFi, batterie, statut réseau OMK.
4. **`AppViewer.tsx`** :
   - Cadre d'exécution pleine page d'une application ouverte avec barre de navigation supérieure, bouton retour, gesture swipe pour revenir à la Home.
5. **`LockScreen.tsx`** :
   - Écran de verrouillage optionnel avec widget horloge et notification center.
6. **`GlobalSearch.tsx`** :
   - Spotlight search executive permettant de chercher instantanément un client, une SOP, un document, ou de lancer un agent.

### 2.2 Widgets Nomades (`src/components/widgets/`)
- Widgets KPIs : MRR / Finance, Tâches urgentes, État de santé des agents, Météo/Énergie.

### 2.3 Services & Haptiques (`src/services/`)
- **`haptics.ts`** : Retour haptique tactile (`navigator.vibrate`) sur les boutons et sélections.
- **`useResponsiveLayout.ts`** : Détection dynamique de la largeur d'écran (`< 768px`).

---

## 3. RÈGLES DE BRANCHEMENT & EXPÉRIENCE UTILISATEUR

### 3.1 Détection Responsive Automatique
Dans `src/App.tsx` (ou `src/components/Desktop.tsx`) :
- Si la largeur de l'écran est inférieure à `768px` (smartphone ou tablette portrait) :
  - L'application monte **par défaut** la vue Mobile OS (`MobileBackOfficeView` / `MobileShell`).
  - L'utilisateur n'a pas à naviguer dans un bureau virtuel inadapté au tactile.

### 3.2 Switcher de Mode & Simulateur Desktop
Sur grand écran (Desktop) :
- Dans la `TopBar`, à côté du bouton "🌱 Digital Garden", ajouter un bouton / sélecteur :
  - `🖥️ Bureau Pro` (Desktop)
  - `🌱 Digital Garden` (SaaS Overlay)
  - `📱 Mobile OS` (Ouvre le simulateur mobile avec châssis smartphone ou bascule en vue mobile complète).

### 3.3 Unification Stricte des Données
- Aucune donnée fictive ou mock isolé dans le Mobile OS.
- Le Mobile OS doit consommer directement :
  - `clientsRepo` (`src/components/saas/data/clients.repo.ts`)
  - `sopsRepo` (`src/components/saas/data/sops.repo.ts`)
  - `documentsRepo` (`src/components/saas/data/documents.repo.ts`)
  - `invoicesRepo` (`src/components/saas/data/invoices.repo.ts`)
  - `useShellStore` (`src/stores/shell.store.ts`) pour ouvrir les applications ou déclencher des actions.

---

## 4. FEUILLE DE ROUTE D'EXÉCUTION POUR JULES

### Phase 1 : Rapatriement des Composants Clés
1. Copier et adapter les composants UI depuis `C:\Users\amado\The-OMK-Mobile-Back-Office\src\components\*` vers `src/components/mobile/`.
2. Résoudre les imports d'icônes (`lucide-react`) et de styles (`Tailwind CSS`).
3. Compiler avec `bun run tsc -p tsconfig.app.json --noEmit` pour garantir 0 erreur de typage.

### Phase 2 : Câblage du Routeur & Écrans Applicatifs
1. Connecter l'`AppViewer` mobile aux vraies vues :
   - Clic sur "Clients" dans le Mobile OS -> ouvre la vue `ClientsView` (ou sa variante optimisée mobile).
   - Clic sur "Tasks" -> ouvre `TasksView`.
   - Clic sur "Finance" -> ouvre `FinanceView`.
2. Veiller à ce que chaque vue mobile dispose d'un bouton de retour natif (`← Retour Home`) propre et fluide.

### Phase 3 : Détection Viewport & Switcher TopBar
1. Implémenter le hook `useIsMobile()` (`window.innerWidth < 768`).
2. Monter le shell mobile automatiquement en mode mobile.
3. Ajouter le bouton d'émulation Mobile OS dans la `TopBar` pour les tests desktop.

### Phase 4 : Vérification Finale & Anti-Régression
1. Vérifier qu'aucune page blanche ne se produit lors de l'ouverture de n'importe quelle app mobile.
2. Vérifier la compatibilité tactile (touch gestures, padding Dynamic Island).
3. Exécuter la commande de validation :
   ```bash
   bun run tsc -p tsconfig.app.json --noEmit
   ```
