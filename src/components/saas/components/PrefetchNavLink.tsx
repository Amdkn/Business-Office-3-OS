// src/components/PrefetchNavLink.tsx
// D6 #56 (2026-06-19): NavLink wrapper that prefetches the lazy-loaded view
// chunk on hover/focus. Reduces perceived navigation latency to ~0ms once
// the user has indicated intent (hover or keyboard focus).
//
// Browser caches the chunk after first fetch, so subsequent navigations
// are instant even if the user never hovered first.

import React, { useCallback, useRef } from 'react';
import { NavLink } from 'react-router-dom';

type RouteLoader = () => Promise<unknown>;

const ROUTE_PREFETCHERS: Record<string, RouteLoader> = {
  '/dashboard': () => import('../views/DashboardView'),
  '/clients': () => import('../views/ClientsView'),
  '/documents': () => import('../views/DocumentsView'),
  '/agents': () => import('../views/AgentsView'),
  '/finance': () => import('../views/FinanceView'),
  '/sop': () => import('../views/SOPLibraryView'),
  '/settings': () => import('../views/SettingsView'),
  '/people': () => import('../views/PeopleView'),
  '/tasks': () => import('../views/TasksView'),
  '/legal': () => import('../views/LegalView'),
  '/growth': () => import('../views/GrowthView'),
  '/sales': () => import('../views/SalesView'),
  '/marketplace': () => import('../views/MarketplaceView'),
  '/it-data': () => import('../views/ItDataView'),
};

interface PrefetchNavLinkProps {
  to: string;
  title?: string;
  className?: string | ((args: { isActive: boolean }) => string);
  children: React.ReactNode | ((args: { isActive: boolean }) => React.ReactNode);
}

export const PrefetchNavLink: React.FC<PrefetchNavLinkProps> = ({ to, title, className, children }) => {
  const prefetchedRef = useRef(false);

  const prefetch = useCallback((): void => {
    if (prefetchedRef.current) return;
    const loader = ROUTE_PREFETCHERS[to];
    if (loader) {
      prefetchedRef.current = true;
      void loader().catch(() => {
        // Network error during prefetch is non-fatal (chunk will be re-fetched on actual nav)
        prefetchedRef.current = false;
      });
    }
  }, [to]);

  return (
    <NavLink
      to={to}
      title={title}
      onMouseEnter={prefetch}
      onFocus={prefetch}
      onTouchStart={prefetch}
      className={className}
    >
      {children}
    </NavLink>
  );
};

export default PrefetchNavLink;
