# 🏢 Business Office 3 OS (A'Space / OMK)

> **Système d'Exploitation Exécutif Trimodal & Jumeau Numérique d'Entreprise**  
> Architecte & Propriétaire : Amadou Kone (`amdkn`)  
> Dépôt : `https://github.com/Amdkn/Business-Office-3-OS`

---

## 1. Vision & Architecture Trimodale

**Business Office 3 OS** résout la fracture entre la puissance d'un environnement de travail complet sur grand écran, l'accessibilité immédiate d'un tableau de bord de gestion clair et la rapidité d'une télécommande exécutive sur smartphone.

Le système fusionne 3 paradigmes en **une seule application unifiée**, partageant le même noyau de données, le même bus d'événements et les mêmes modèles métiers :

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                BUSINESS OFFICE 3 OS                                    │
├────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                        │
│  [ VUE 1 : PRO WEB DESKTOP OS ]                                                        │
│  Gestionnaire de fenêtres multi-tâches (Draggable, Resizable, Dock, TopBar)            │
│  13 applications métiers complètes (Finance, Clients, Sales, Ops, Legal, R&D...)       │
│                                                                                        │
│  ▲                                      ▲                                              │
│  │ (Toggle TopBar / CMS Rideau)         │ (Responsive < 768px / Mode Télécommande)     │
│  ▼                                      ▼                                              │
│                                                                                        │
│  [ VUE 2 : DIGITAL GARDEN SAAS OS ]    [ VUE 3 : MOBILE OS EDGE CLIENT ]               │
│  Dashboard épuré & accessible          Interface smartphone ultra-rapide               │
│  Cultivate · Nurture · Bloom · Roots   Springboard, Dynamic Island, Gestures, Haptics  │
│  Board of Directors + Chat Jerry       Télécommande exécutive & widgets nomades        │
│                                                                                        │
├────────────────────────────────────────────────────────────────────────────────────────┤
│                      COUCHE DE DONNÉES & NOYAU COMMUNS                                 │
│  • Zustand Global Stores (Shell, Windows, Notifications)                               │
│  • Référentiel unifié (clientsRepo, sopsRepo, documentsRepo, invoicesRepo)             │
│  • Supabase Multi-Tenant (omk_saas.*) / LocalStorage Fallback                         │
│  • FastMCP & Agentic Swarm Adapters                                                    │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Les 3 Vues en Détail

### 🖥️ Vue 1 : Pro Web Desktop OS
* Interface type bureau virtuel (inspirée de macOS et du shell A'Space Life OS).
* Fenêtres autonomes redimensionnables, minimisables, avec mémorisation de disposition.
* Dock d'applications persistant et barre supérieure (`TopBar`) avec statut système et heure.

### 🌱 Vue 2 : Digital Garden SaaS OS
* Overlay exécutif déployable depuis la barre du haut (`TopBar > Digital Garden`).
* Vue simplifiée et reposante conçue pour réduire la surcharge cognitive du bureau virtuel.
* Structure en 4 piliers : **Cultivate** (Dashboard, Finance, People), **Nurture** (Tasks, Clients, Knowledge, Documents, SOPs), **Bloom** (Sales, Product, Filiales), **Roots** (Legal, IT, Settings).
* Conseil d'administration virtuel (`Board of Directors`) avec Jerry, Superman, Batman et Flash.

### 📱 Vue 3 : Mobile OS Edge Client (En cours d'intégration via Jules)
* Portée depuis `https://github.com/Amdkn/The-OMK-Mobile-Back-Office`.
* **Vue responsive par défaut sur mobile** : activée automatiquement sur les écrans de largeur inférieure à `768px` ou via le simulateur intégré.
* Dynamic Island interactive (alertes, temps réel, KPI audio/voix), Springboard à icônes réorganisables, haptique tactile, et navigation par gestes.

---

## 3. Mission & Dossier de Délégation pour Jules (Google)

La feuille de route complète pour l'intégration du **Mobile OS** par l'agent **Jules** est consignée dans :
👉 [`delegation-a-jules/PRD-Business-Office-3-OS-Mobile-Integration.md`](./delegation-a-jules/PRD-Business-Office-3-OS-Mobile-Integration.md)  
👉 [`delegation-a-jules/README.md`](./delegation-a-jules/README.md)

---

## 4. Stack Technique

- **Runtime & Build :** Vite 8 + Bun / Node
- **Framework :** React 19 + TypeScript (Typage 100% strict)
- **Gestion d'État :** Zustand + Context Providers
- **Design System :** Tailwind CSS v4, Lucide Icons, Glassmorphism
- **Backend & Données :** Supabase (`omk_saas` schema) avec fallback dev LocalStorage

---

## 5. Démarrage Rapide

```bash
# Installation des dépendances
bun install

# Lancement du serveur de développement (Port 5174)
bun run dev --port 5174

# Validation stricte TypeScript (0 erreur tolérée)
bun run tsc -p tsconfig.app.json --noEmit
```


Runs, in order: `typecheck` (`tsc -b` — the only command that actually
type-checks; `npx tsc --noEmit -p tsconfig.json` alone is a silent
false-positive), `typecheck:api`, `test` (vitest with `--pool=threads`),
`build`, and the four runtime benches (`_runtime/kernel.mjs`,
`_runtime/bridge/{bridge,adapters,rbac-test}.mjs`). This is exactly what
[`.github/workflows/ci.yml`](./.github/workflows/ci.yml) runs on every push
and pull request.

## Docs

- [`INSTALL.md`](./INSTALL.md) — full local setup, verification, and known traps
- [`MIGRATION_SUPABASE.md`](./MIGRATION_SUPABASE.md) — data-layer migration plan, 3-stage tenancy model
- [`PHASE0_RECEIPT.md`](./PHASE0_RECEIPT.md) — Supabase Phase 0 provisioning receipt
