import { useState } from 'react';
import { 
  Battery, Wifi, Lock, Unlock, ArrowLeft
} from 'lucide-react';
import { useShellStore } from '../../stores/shell.store';

interface MobileAppItem {
  id: string;
  name: string;
  icon: string;
  badge?: string;
  desktopAppId?: string;
  desktopTitle?: string;
}

const APPS: MobileAppItem[] = [
  { id: 'clients', name: 'Clients OMK', icon: '👥', badge: '4 Actifs', desktopAppId: 'clients', desktopTitle: 'Clients' },
  { id: 'finance', name: 'Finance & MRR', icon: '💳', badge: '$42k', desktopAppId: 'finance', desktopTitle: 'Finance' },
  { id: 'sales', name: 'Sales Sanctum', icon: '🎯', badge: '3 Leads', desktopAppId: 'sales', desktopTitle: 'Sales' },
  { id: 'ops', name: 'Operations', icon: '⚙️', badge: 'S34', desktopAppId: 'operations', desktopTitle: 'Operations' },
  { id: 'agents', name: 'Agents Swarm', icon: '🤖', badge: 'Live', desktopAppId: 'operations', desktopTitle: 'Operations' },
  { id: 'tasks', name: 'Tâches', icon: '✅', badge: '12', desktopAppId: 'tasks', desktopTitle: 'Tasks' },
  { id: 'settings', name: 'Paramètres', icon: '🛠️', desktopAppId: 'settings', desktopTitle: 'Settings' },
];

export function MobileBackOfficeView({ inSimulator = false }: { inSimulator?: boolean }): import('react').ReactNode {
  const [isLocked, setIsLocked] = useState(false);
  const [activeScreen, setActiveScreen] = useState<'home' | 'app'>('home');
  const [selectedApp, setSelectedApp] = useState<MobileAppItem | null>(null);
  const openApp = useShellStore(s => s.openApp);

  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`w-full h-full flex flex-col bg-slate-950 text-slate-100 select-none overflow-hidden ${inSimulator ? 'rounded-[2rem]' : 'fixed inset-0 z-50'}`}>
      
      {/* iOS / Android Dynamic Island & Status Bar */}
      <div className="h-11 px-6 flex items-center justify-between bg-slate-900/60 backdrop-blur-lg border-b border-slate-800/60 text-xs shrink-0 z-20">
        <span className="font-semibold text-slate-200">{currentTime}</span>
        
        {/* Dynamic Island pill */}
        <div className="px-3 py-1 bg-black rounded-full border border-slate-800 flex items-center gap-1.5 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-medium text-slate-300">OMK Hub Active</span>
        </div>

        <div className="flex items-center gap-2 text-slate-300">
          <Wifi className="w-3.5 h-3.5 text-emerald-400" />
          <Battery className="w-4 h-4 text-slate-200" />
        </div>
      </div>

      {/* Screen Viewport */}
      <div className="flex-1 relative overflow-y-auto p-4 flex flex-col">
        {isLocked ? (
          <div className="my-auto flex flex-col items-center justify-center text-center space-y-4 py-12">
            <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-2xl shadow-xl">
              <Lock className="w-7 h-7 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">The OMK Mobile</h2>
              <p className="text-xs text-slate-400 mt-1">Écosystème sécurisé biomorphique</p>
            </div>
            <button
              onClick={() => setIsLocked(false)}
              className="mt-6 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-2xl shadow-lg transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Unlock className="w-4 h-4" /> Déverrouiller le Back-Office
            </button>
          </div>
        ) : activeScreen === 'app' && selectedApp ? (
          <div className="flex-1 flex flex-col space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <button 
                onClick={() => { setActiveScreen('home'); setSelectedApp(null); }}
                className="flex items-center gap-1 text-xs text-emerald-400 font-medium hover:text-emerald-300 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Retour
              </button>
              <span className="text-xs font-bold text-white">{selectedApp.name}</span>
              <button
                onClick={() => {
                  if (selectedApp.desktopAppId) {
                    openApp(selectedApp.desktopAppId, selectedApp.desktopTitle || selectedApp.name);
                  }
                }}
                className="text-[10px] bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-lg text-slate-300 font-medium cursor-pointer"
                title="Projeter cette application dans le Web Desktop"
              >
                Projeter Desktop
              </button>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedApp.icon}</span>
                <div>
                  <h3 className="text-sm font-bold text-white">{selectedApp.name}</h3>
                  <p className="text-xs text-slate-400">Synchronisé avec Supabase Cloud</p>
                </div>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                Données temps réel connectées à l'instance OMK. Cette vue mobile condense les métriques et actions clés du module.
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-5 animate-in fade-in duration-150">
            
            {/* Quick Hero Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/70 to-slate-900 border border-emerald-800/40 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Back-Office Nomade</span>
                  <h3 className="text-base font-bold text-white mt-0.5">Vue Mobile OMK</h3>
                </div>
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-bold border border-emerald-500/30">
                  📱
                </div>
              </div>
              <p className="text-xs text-slate-300 mt-2">
                Interface tactile fluide, haptique & synchronisée.
              </p>
            </div>

            {/* Apps Grid */}
            <div>
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 px-1">
                Applications Métier
              </h4>
              <div className="grid grid-cols-2 gap-2.5">
                {APPS.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => {
                      setSelectedApp(app);
                      setActiveScreen('app');
                    }}
                    className="p-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800/80 text-left transition-all active:scale-95 flex flex-col justify-between h-24 cursor-pointer"
                  >
                    <div className="flex items-start justify-between w-full">
                      <span className="text-2xl">{app.icon}</span>
                      {app.badge && (
                        <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold rounded-full border border-emerald-500/30">
                          {app.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-semibold text-slate-200 mt-2 truncate">
                      {app.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Live Telemetry Card */}
            <div className="p-3.5 bg-slate-900/50 border border-slate-800 rounded-2xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-slate-300 font-medium">Mode Hors-ligne & PWA</span>
              </div>
              <span className="text-emerald-400 text-[11px] font-semibold">Actif</span>
            </div>

          </div>
        )}
      </div>

      {/* Bottom Bar / Home Indicator */}
      <div className="h-10 flex items-center justify-center shrink-0">
        <div className="w-28 h-1 bg-slate-700 rounded-full" />
      </div>

    </div>
  );
}
