import React, { useState, useEffect } from 'react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { 
  X, Monitor, Search, Bell, ChevronRight, 
  Send, LayoutDashboard, Users,
  BookOpen, CreditCard, CheckSquare, Sparkles,
  Briefcase, Scale, Layers, Settings, Cpu, ShieldCheck
} from 'lucide-react';
import { useShellStore } from '../../stores/shell.store';
import { ToastProvider } from './contexts/ToastContext';
import { AuthProvider } from './auth/AuthProvider';

// Import all real functional views ported from 00-omk-saas-os
import { DashboardView } from './views/DashboardView';
import { ClientsView } from './views/ClientsView';
import { ClientDetailView } from './views/ClientDetailView';
import { FinanceView } from './views/FinanceView';
import { PeopleAgentsView } from './views/PeopleAgentsView';
import { PeopleView } from './views/PeopleView';
import { TasksView } from './views/TasksView';
import { OperationsKnowledgeView } from './views/OperationsKnowledgeView';
import { DocumentsView } from './views/DocumentsView';
import { SOPLibraryView } from './views/SOPLibraryView';
import { SalesView } from './views/SalesView';
import { GrowthView } from './views/GrowthView';
import { ProductView } from './views/ProductView';
import { LegalView } from './views/LegalView';
import { SettingsView } from './views/SettingsView';
import { AgentRootView } from './views/AgentRootView';
import { FilialesMatrixView } from './views/FilialesMatrixView';
import { ItSoftwareKernelView } from './views/ItSoftwareKernelView';
import { ItDataView } from './views/ItDataView';
import { MarketplaceView } from './views/MarketplaceView';

interface Director {
  id: string;
  name: string;
  role: string;
  icon: string;
  bgColor: string;
  textColor: string;
  appId?: string;
  appTitle?: string;
}

const DIRECTORS: Director[] = [
  { id: 'jerry', name: 'Jerry', role: 'ORCHESTRATOR', icon: '🧠', bgColor: 'bg-emerald-100', textColor: 'text-emerald-800' },
  { id: 'superman', name: 'Superman', role: 'GROWTH MANAGER', icon: '🚀', bgColor: 'bg-pink-100', textColor: 'text-pink-800', appId: 'growth', appTitle: 'Growth' },
  { id: 'batman', name: 'Batman', role: 'OPS MANAGER', icon: '🦇', bgColor: 'bg-amber-100', textColor: 'text-amber-800', appId: 'operations', appTitle: 'Operations' },
  { id: 'flash', name: 'Flash', role: 'PRODUCT MANAGER', icon: '⚡', bgColor: 'bg-orange-100', textColor: 'text-orange-800', appId: 'product', appTitle: 'Product' },
];

function RouteSync({ onNavigate, onSelectClient }: { onNavigate: (path: string) => void; onSelectClient: (id: string) => void }) {
  const location = useLocation();
  useEffect(() => {
    const p = location.pathname;
    if (p === '/' || p === '/dashboard') {
      onNavigate('dashboard');
    } else if (p.startsWith('/clients/')) {
      const id = p.replace('/clients/', '');
      if (id) {
        onSelectClient(id);
        onNavigate('client-detail');
      }
    } else if (p === '/clients') {
      onNavigate('clients');
    } else if (p === '/sop' || p === '/sops' || p === '/sop-library') {
      onNavigate('sops');
    } else if (p === '/operations-knowledge' || p === '/operations') {
      onNavigate('operations');
    } else if (p === '/documents') {
      onNavigate('documents');
    } else if (p === '/tasks') {
      onNavigate('tasks');
    } else if (p === '/finance') {
      onNavigate('finance');
    } else if (p === '/people' || p === '/people-agents') {
      onNavigate('people-agents');
    } else if (p === '/sales') {
      onNavigate('sales');
    } else if (p === '/growth') {
      onNavigate('growth');
    } else if (p === '/product') {
      onNavigate('product');
    } else if (p === '/filiales') {
      onNavigate('filiales');
    } else if (p === '/legal') {
      onNavigate('legal');
    } else if (p === '/settings') {
      onNavigate('settings');
    }
  }, [location.pathname, onNavigate, onSelectClient]);

  return null;
}

interface SaasErrorBoundaryProps {
  children?: React.ReactNode;
  onReset?: () => void;
}
interface SaasErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class SaasErrorBoundary extends React.Component<SaasErrorBoundaryProps, SaasErrorBoundaryState> {
  constructor(props: SaasErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): SaasErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[SaasGardenOverlay] Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center bg-white/95 backdrop-blur-xl rounded-2xl border border-red-200 shadow-sm max-w-lg mx-auto my-12 animate-in fade-in duration-200">
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4 border border-red-100 text-xl font-bold">
            ⚠️
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1">Module Notice</h3>
          <p className="text-xs text-slate-500 mb-5 leading-relaxed">
            {this.state.error?.message || 'A minor error occurred while rendering this view.'}
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: undefined });
              if (this.props.onReset) this.props.onReset();
            }}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            Back to Dashboard
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export function SaasGardenOverlay(): import('react').ReactNode {
  const saasOverlayOpen = useShellStore((s) => s.saasOverlayOpen);
  const toggleSaasOverlay = useShellStore((s) => s.toggleSaasOverlay);

  const [selectedDirector, setSelectedDirector] = useState<Director>(DIRECTORS[0]);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'director' | 'user'; text: string }>>([
    { sender: 'director', text: "Pulse synchronized. What's the directive, Chief?" }
  ]);
  const [activeNav, setActiveNav] = useState('dashboard');
  const [selectedClientId, setSelectedClientId] = useState<string | undefined>(undefined);

  if (!saasOverlayOpen) return null;

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;
    const userText = chatInput.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setChatInput('');
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { sender: 'director', text: `[${selectedDirector.name}] Bien reçu Chef Amadou Kone : directive "${userText}" enregistrée et synchronisée avec le Kernel V3.` }
      ]);
    }, 600);
  };

  const navLabels: Record<string, string> = {
    dashboard: 'Dashboard',
    finance: 'Finance & Invoices',
    'people-agents': 'People & AI Swarm',
    people: 'Team & Capacity',
    'agent-root': 'Mission Control (Agent Root)',
    tasks: 'Tasks & Procedures',
    clients: 'Clients Pipeline',
    'client-detail': 'Client Profile',
    operations: 'Operations & Knowledge',
    documents: 'Documents & Files',
    sops: 'SOP Library',
    sales: 'Sales CRM',
    growth: 'Growth & Leads',
    product: 'Product & Offers',
    filiales: 'Filiales Matrix',
    legal: 'Legal & Compliance',
    settings: 'System Roots (Settings)',
    'it-kernel': 'IT Software Kernel',
    'it-data': 'IT & Data Infrastructure',
    marketplace: 'App Store / Modules',
  };

  const renderActiveView = () => {
    switch (activeNav) {
      case 'dashboard':
        return (
          <DashboardView 
            onNavigate={(tab) => {
              if (tab === 'people-agents') setActiveNav('people-agents');
              else if (tab === 'clients') setActiveNav('clients');
              else if (tab === 'finance') setActiveNav('finance');
              else setActiveNav(tab);
            }} 
          />
        );
      case 'finance':
        return <FinanceView />;
      case 'people-agents':
        return <PeopleAgentsView />;
      case 'people':
        return <PeopleView />;
      case 'agent-root':
        return <AgentRootView />;
      case 'tasks':
        return <TasksView />;
      case 'clients':
        return (
          <ClientsView 
            onSelectClient={(id) => {
              setSelectedClientId(id);
              setActiveNav('client-detail');
            }} 
          />
        );
      case 'client-detail':
        return (
          <ClientDetailView 
            clientId={selectedClientId} 
            onBack={() => setActiveNav('clients')} 
          />
        );
      case 'operations':
        return <OperationsKnowledgeView />;
      case 'documents':
        return <DocumentsView />;
      case 'sops':
        return <SOPLibraryView />;
      case 'sales':
        return <SalesView />;
      case 'growth':
        return <GrowthView />;
      case 'product':
        return <ProductView />;
      case 'filiales':
        return <FilialesMatrixView />;
      case 'legal':
        return <LegalView />;
      case 'settings':
        return <SettingsView />;
      case 'it-kernel':
        return <ItSoftwareKernelView />;
      case 'it-data':
        return <ItDataView />;
      case 'marketplace':
        return <MarketplaceView />;
      default:
        return <DashboardView onNavigate={(tab) => setActiveNav(tab)} />;
    }
  };

  const navButtonClass = (navKey: string) => `w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
    activeNav === navKey
      ? 'bg-emerald-50 text-emerald-900 border border-emerald-200/80 shadow-xs font-semibold'
      : 'text-slate-600 hover:bg-stone-100/80 hover:text-slate-900'
  }`;

  return (
    <MemoryRouter>
      <RouteSync onNavigate={setActiveNav} onSelectClient={setSelectedClientId} />
      <AuthProvider>
        <ToastProvider>
          <div 
            className="absolute inset-0 z-40 bg-stone-100/95 backdrop-blur-2xl flex flex-col md:flex-row text-slate-900 font-sans overflow-hidden animate-in fade-in duration-200"
            style={{
              backgroundImage: 'radial-gradient(#e7e5e4 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          >
      {/* ═══ 1. SIDEBAR DE GAUCHE (Digital Garden Navigation) ═══ */}
      <aside className="w-64 bg-white/80 backdrop-blur-xl border-r border-stone-200/80 flex flex-col justify-between shrink-0 h-full p-5 select-none shadow-sm hidden md:flex">
        <div className="space-y-6">
          
          {/* Logo A'Space Digital Garden */}
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-emerald-500/30">
              🌱
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                A'Space
              </h2>
              <span className="text-[10px] font-bold text-emerald-700 tracking-widest uppercase">
                DIGITAL GARDEN
              </span>
            </div>
          </div>

          {/* Section 1 : CULTIVATE */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3">
              Cultivate
            </span>
            <button
              onClick={() => setActiveNav('dashboard')}
              className={navButtonClass('dashboard')}
            >
              <LayoutDashboard className="w-4 h-4 text-emerald-600" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setActiveNav('finance')}
              className={navButtonClass('finance')}
            >
              <CreditCard className="w-4 h-4 text-emerald-600" />
              <span>Finance</span>
            </button>
            <button
              onClick={() => setActiveNav('people-agents')}
              className={navButtonClass('people-agents')}
            >
              <Users className="w-4 h-4 text-emerald-600" />
              <span>People & Agents</span>
            </button>
            <button
              onClick={() => setActiveNav('agent-root')}
              className={navButtonClass('agent-root')}
            >
              <Cpu className="w-4 h-4 text-purple-600" />
              <span>Agent Root</span>
            </button>
          </div>

          {/* Section 2 : NURTURE */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3">
              Nurture
            </span>
            <button
              onClick={() => setActiveNav('tasks')}
              className={navButtonClass('tasks')}
            >
              <CheckSquare className="w-4 h-4 text-emerald-600" />
              <span>Tasks</span>
            </button>
            <button
              onClick={() => setActiveNav('clients')}
              className={navButtonClass('clients')}
            >
              <Briefcase className="w-4 h-4 text-emerald-600" />
              <span>Clients</span>
            </button>
            <button
              onClick={() => setActiveNav('operations')}
              className={navButtonClass('operations')}
            >
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Knowledge</span>
            </button>
            <button
              onClick={() => setActiveNav('documents')}
              className={navButtonClass('documents')}
            >
              <BookOpen className="w-4 h-4 text-slate-400" />
              <span>Documents</span>
            </button>
            <button
              onClick={() => setActiveNav('sops')}
              className={navButtonClass('sops')}
            >
              <ShieldCheck className="w-4 h-4 text-slate-400" />
              <span>SOP Library</span>
            </button>
          </div>

          {/* Section 3 : BLOOM */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3">
              Bloom
            </span>
            <button
              onClick={() => setActiveNav('growth')}
              className={navButtonClass('growth')}
            >
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span>Growth</span>
            </button>
            <button
              onClick={() => setActiveNav('sales')}
              className={navButtonClass('sales')}
            >
              <CreditCard className="w-4 h-4 text-amber-500" />
              <span>Sales</span>
            </button>
            <button
              onClick={() => setActiveNav('product')}
              className={navButtonClass('product')}
            >
              <Layers className="w-4 h-4 text-orange-500" />
              <span>Product</span>
            </button>
            <button
              onClick={() => setActiveNav('filiales')}
              className={navButtonClass('filiales')}
            >
              <Layers className="w-4 h-4 text-indigo-500" />
              <span>Filiales Matrix</span>
            </button>
          </div>

          {/* Section 4 : ROOTS */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3">
              Roots
            </span>
            <button
              onClick={() => setActiveNav('legal')}
              className={navButtonClass('legal')}
            >
              <Scale className="w-4 h-4 text-slate-500" />
              <span>Legal</span>
            </button>
            <button
              onClick={() => setActiveNav('it-kernel')}
              className={navButtonClass('it-kernel')}
            >
              <Cpu className="w-4 h-4 text-cyan-600" />
              <span>IT Kernel</span>
            </button>
            <button
              onClick={() => setActiveNav('settings')}
              className={navButtonClass('settings')}
            >
              <Settings className="w-4 h-4 text-slate-500" />
              <span>Settings</span>
            </button>
          </div>


        </div>

        {/* User Card Bottom Sidebar */}
        <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/80 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
            AK
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-slate-900 truncate">Amadou Kone</p>
            <p className="text-[10px] text-emerald-700 font-medium truncate">Head Gardener · Owner</p>
          </div>
        </div>
      </aside>

      {/* ═══ 2. MAIN CENTER CONTENT (Ecosystem Vitals, Wind Direction, Seeds) ═══ */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-transparent">
        
        {/* Top Header Bar */}
        <header className="h-16 border-b border-stone-200/80 bg-white/70 backdrop-blur-xl px-8 flex items-center justify-between shrink-0 z-10">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <span>Garden</span>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-slate-900 font-bold text-sm">
              {navLabels[activeNav] || 'Dashboard'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Ecosystem Input */}
            <div className="relative hidden lg:block">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search the ecosystem..."
                className="pl-9 pr-4 py-1.5 bg-stone-100/80 border border-stone-200 rounded-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 w-60 transition-all"
              />
            </div>

            {/* Notification Bell */}
            <button className="p-2 text-slate-500 hover:text-slate-800 bg-stone-100 rounded-full transition-colors cursor-pointer relative">
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-amber-500 absolute top-1.5 right-1.5 border-2 border-white" />
            </button>

            {/* Basculer vers Bureau Pro Action */}
            <button
              onClick={() => toggleSaasOverlay(false)}
              className="flex items-center gap-2 px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              title="Fermer le rideau et révéler le bureau multifenêtres complet"
            >
              <Monitor className="w-3.5 h-3.5 text-emerald-400" />
              <span>Bureau Pro</span>
            </button>

            {/* Close Button */}
            <button
              onClick={() => toggleSaasOverlay(false)}
              className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
              title="Fermer la vue"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Scrollable View Content Container */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            <SaasErrorBoundary onReset={() => setActiveNav('dashboard')}>
              {renderActiveView()}
            </SaasErrorBoundary>
          </div>
        </div>
      </main>

      {/* ═══ 3. PANNEAU DE DROITE : BOARD OF DIRECTORS + CHAT WITH JERRY ═══ */}
      <aside className="w-80 bg-white/90 backdrop-blur-2xl border-l border-stone-200/80 flex flex-col justify-between shrink-0 h-full p-5 shadow-lg select-none hidden xl:flex">
        
        <div className="space-y-6">
          {/* Header Board of Directors */}
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">Board of Directors</h3>
            <div className="flex items-center gap-2 text-slate-400">
              <span className="text-xs cursor-pointer hover:text-slate-700">⚙️</span>
            </div>
          </div>

          {/* Liste des Membres du Board */}
          <div className="space-y-2">
            {DIRECTORS.map((director) => {
              const isSelected = selectedDirector.id === director.id;
              return (
                <button
                  key={director.id}
                  onClick={() => setSelectedDirector(director)}
                  className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50/70 border-emerald-300/80 shadow-xs'
                      : 'bg-white border-transparent hover:bg-stone-50'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg ${director.bgColor}`}>
                    {director.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-900 leading-tight">{director.name}</p>
                    <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mt-0.5">
                      {director.role}
                    </p>
                  </div>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat en direct avec Jerry / Directeur sélectionné */}
        <div className="pt-4 border-t border-stone-100 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              CHATTING WITH {selectedDirector.name.toUpperCase()}
            </span>
          </div>

          {/* Bulle de messages */}
          <div className="bg-stone-50 rounded-2xl p-3 border border-stone-200/80 space-y-2 max-h-48 overflow-y-auto">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex items-start gap-2 text-xs ${m.sender === 'user' ? 'justify-end' : ''}`}>
                {m.sender === 'director' && (
                  <span className="text-base shrink-0">{selectedDirector.icon}</span>
                )}
                <div
                  className={`p-2.5 rounded-xl max-w-[85%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-emerald-600 text-white font-medium'
                      : 'bg-white text-slate-800 border border-stone-200 shadow-2xs font-medium'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Formulaire de saisie Ask Jerry... */}
          <form onSubmit={handleSendMessage} className="relative">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder={`Ask ${selectedDirector.name}...`}
              className="w-full pl-4 pr-10 py-2.5 bg-stone-100/90 border border-stone-200/80 rounded-2xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

      </aside>
          </div>
        </ToastProvider>
      </AuthProvider>
    </MemoryRouter>
  );
}
