# AGENT.md — Canon Business Office 3 OS (Jules & Agents Runtime)

> **Architecte & Propriétaire :** Amadou Kone (`amdkn`)  
> **Doctrine :** Unlazy Executive Manager, Zéro Coquille Vide, Zéro Dette Technique.

---

## 1. Les Lois Fondamentales

1. **Ne jamais s'arrêter à 80%** : Chaque vue, chaque bouton, chaque onglet branché doit être fonctionnel. Pas de faux clics, pas de placeholders `// TODO`.
2. **Tolérance Zéro pour les Écrans Blancs** : Tout conteneur de rendu doit être encapsulé dans un `ErrorBoundary` défensif avec null-guards sur chaque champ nullable.
3. **Source Unique de Vérité** : Les trois vues (Desktop OS, SaaS Garden OS, Mobile OS) partagent impérativement le même référentiel de données (`clientsRepo`, `sopsRepo`, `documentsRepo`, `invoicesRepo`).
4. **Validation TypeScript Stricte** : Aucune PR ou commit n'est acceptable sans un passage réussi de `bun run tsc -p tsconfig.app.json --noEmit` avec exactement 0 erreur.
