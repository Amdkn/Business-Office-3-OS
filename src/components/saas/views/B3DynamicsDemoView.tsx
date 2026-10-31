/**
 * B3 Dynamics Demo View — Issue #2: [FRACTAL-HOLON] B1/B2/B3 are autonomous holons
 *
 * Demonstrates:
 * 1. B3 as cognitive actor in Business OS data model/UI
 * 2. B3 mission using a reusable Ryan factory while retaining local planning authority
 * 3. Deterministic automation as instrument under B3
 * 4. Escalation only when authority/horizon requires it
 * 5. Canary demonstration: B3 detects factory limitation and routes improvement request
 */

import React, { useMemo, useState } from 'react';
import {
  Brain,
  Factory,
  AlertCircle,
  CheckCircle,
  Users,
  Target,
  ChevronRight,
} from 'lucide-react';
import { B3HolonCard } from '../components/B3HolonCard';
import { Badge } from '../components/Badge';
import { Card } from '../components/Card';
import { B3Holon, CANONICAL_B3_CAPABILITIES } from '../lib/types';
import { B3_CAPABILITY_LABEL } from '../lib/statusLabels';

// Demo Finance B3 Holon — Bucky Barnes, Cashflow squad under Wonder Woman (B2)
const DEMO_FINANCE_B3: B3Holon = {
  id: 'b3-6-buckybarnes',
  name: 'BuckyBarnes',
  email: 'bucky.barnes@finance.thunderbolts.internal',
  role: 'operator',
  status: 'active' as const,
  createdAt: '2026-08-02T10:00:00Z',
  updatedAt: '2026-10-31T06:00:00Z',
  businessDomain: 'Finance & ROI',
  squad: 'Thunderbolts',
  cognitiveCapabilities: [
    'inspect-domain-state',
    'plan-local-course',
    'choose-tools-models-factories',
    'delegate-subtasks',
    'execute',
    'test-verify',
    'learn-from-evidence',
  ],
  instruments: [
    'python-cashflow-script-runner',
    'sqlite-ledger-engine',
    'cron-monthly-close-trigger',
    'stripe-reconciliation-cli',
  ],
  factoryUsed: 'Ryan-Cashflow-Calculator-v2.1',
  canRejectMission: true,
  escalationLevel: 'local',
};

// Simulated factory capability with a detected limitation
const RYAN_FACTORY = {
  id: 'ryan-cashflow-calc-v2',
  name: 'Cashflow Calculation Factory',
  version: '2.1.0',
  reusableCapability: 'discounted-cashflow-engine',
  domain: 'Finance',
};

export const B3DynamicsDemoView: React.FC = () => {
  const [showCanaryModal, setShowCanaryModal] = useState(false);
  const [showFactoryModal, setShowFactoryModal] = useState(false);

  const capabilityStats = useMemo(() => {
    return {
      total: CANONICAL_B3_CAPABILITIES.length,
      active: DEMO_FINANCE_B3.cognitiveCapabilities?.length || 0,
      coverage: Math.round(
        ((DEMO_FINANCE_B3.cognitiveCapabilities?.length || 0) / CANONICAL_B3_CAPABILITIES.length) * 100,
      ),
    };
  }, []);

  const factoryStats = useMemo(() => {
    return {
      instruments: DEMO_FINANCE_B3.instruments?.length || 0,
      canReject: DEMO_FINANCE_B3.canRejectMission ?? false,
      escalationLevel: DEMO_FINANCE_B3.escalationLevel ?? 'local',
    };
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
            B3 Fractal Holon Dynamics
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Issue #2: B1/B2/B3 as autonomous cognitive holons, not manager→worker chain
          </p>
        </div>
      </div>

      {/* B3 Holon Card */}
      <B3HolonCard holon={DEMO_FINANCE_B3} />

      {/* Capability Overview */}
      <Card className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-semibold text-slate-900">Cognitive Capabilities</h2>
          <Badge variant="info" size="sm">
            {capabilityStats.active}/{capabilityStats.total}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="text-center p-4 bg-slate-50 rounded-lg">
            <p className="text-2xl font-bold text-slate-900">{capabilityStats.coverage}%</p>
            <p className="text-xs text-slate-500">Coverage</p>
          </div>
          <div className="text-center p-4 bg-slate-50 rounded-lg">
            <p className="text-2xl font-bold text-slate-900">{capabilityStats.active}</p>
            <p className="text-xs text-slate-500">Active Capabilities</p>
          </div>
          <div className="text-center p-4 bg-slate-50 rounded-lg">
            <p className="text-2xl font-bold text-slate-900">{factoryStats.instruments}</p>
            <p className="text-xs text-slate-500">Instruments Used</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {DEMO_FINANCE_B3.cognitiveCapabilities?.map((cap) => (
            <Badge key={cap} variant="secondary" size="sm" title={B3_CAPABILITY_LABEL[cap]}>
              {B3_CAPABILITY_LABEL[cap]?.split(' ')[0]}
            </Badge>
          ))}
        </div>
      </Card>

      {/* Ryan Factory Consumption */}
      <Card className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <Factory className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg font-semibold text-slate-900">Ryan Factory Consumption</h2>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="font-medium text-slate-900">{RYAN_FACTORY.name}</p>
              <p className="text-sm text-slate-500">
                v{RYAN_FACTORY.version} • {RYAN_FACTORY.domain} • {RYAN_FACTORY.reusableCapability}
              </p>
            </div>
            <Badge variant="success" size="sm">
              Using
            </Badge>
          </div>
        </div>

        <div className="text-sm text-slate-600 mb-4">
          <p className="mb-2">
            <span className="font-medium">B3 retains planning authority</span>: BuckyBarnes chooses when to use
            the cashflow factory, validates outputs, and can reject results that don't meet local criteria.
          </p>
          <p>
            Deterministic scripts (python-cashflow-script-runner, cron triggers) are{" "}
            <span className="font-medium">instruments under B3</span>, not B3 replacements.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowFactoryModal(true)}
            className="flex-1 bg-white border border-stone-200 text-slate-700 py-2 rounded-lg text-sm font-medium hover:bg-stone-50 transition-colors"
          >
            View Factory Details
          </button>
          <button
            onClick={() => setShowCanaryModal(true)}
            className="flex-1 bg-emerald-50 border border-emerald-200 text-emerald-700 py-2 rounded-lg text-sm font-medium hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2"
          >
            <AlertCircle className="w-4 h-4" />
            Run Canary
          </button>
        </div>
      </Card>

      {/* Holon Hierarchy */}
      <Card className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <Layers className="w-5 h-5 text-purple-600" />
          <h2 className="text-lg font-semibold text-slate-900">Holon Hierarchy</h2>
        </div>

        <div className="flex items-center justify-center gap-2 text-slate-500">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-purple-100 grid place-items-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-xs mt-1.5 font-medium">B1<br /><span className="text-[10px]">Summers<br/>(CEO)</span></p>
          </div>

          <ChevronRight className="w-5 h-5 text-slate-300" />

          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 grid place-items-center">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-xs mt-1.5 font-medium">B2<br /><span className="text-[10px]">Wonder Woman<br/>(VP Finance)</span></p>
          </div>

          <ChevronRight className="w-5 h-5 text-slate-300" />

          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 grid place-items-center border-2 border-emerald-500">
              <Brain className="w-6 h-6 text-emerald-600" />
            </div>
            <p className="text-xs mt-1.5 font-medium">B3<br /><span className="text-[10px]">BuckyBarnes<br/>(Holon)</span></p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-slate-50 rounded-lg text-sm">
          <p className="font-medium text-slate-700 mb-1">Relationship: Holon → Holon → Holon → Instruments</p>
          <ul className="text-slate-600 text-sm space-y-1">
            <li>• B1 sets strategic boundaries, not tactical execution</li>
            <li>• B2 defines domain scope and sprint goals</li>
            <li>• B3 plans local course, chooses tools, executes with instrumentation</li>
          </ul>
        </div>
      </Card>

      {/* Canary Modal State */}
      {showCanaryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="p-6 w-full max-w-md mx-4">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <h3 className="text-lg font-semibold text-slate-900">Canary Execution</h3>
            </div>
            <div className="text-sm text-slate-600 mb-4">
              <p className="mb-3">
                <span className="font-medium text-slate-800">B3 detected factory limitation:</span>
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-3">
                <p className="text-sm text-amber-800">
                  &ldquo;Factory assumes fixed currency conversion rate across cross-border invoices
                  without dynamic hedge delta. B3 can work around this locally but needs a systemic
                  improvement for multi-currency clients.&rdquo;
                </p>
              </div>
              <p className="mb-3">
                <span className="font-medium">Improvement request routed to:</span>{" "}
                <Badge variant="info" size="sm">Ryan</Badge> (not A0/CEO)
              </p>
            </div>
            <button
              onClick={() => setShowCanaryModal(false)}
              className="w-full bg-emerald-500 text-white py-2 rounded-lg font-medium hover:bg-emerald-600"
            >
              Request Factory Improvement
            </button>
          </Card>
        </div>
      )}

      {showFactoryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="p-6 w-full max-w-md mx-4">
            <div className="flex items-center gap-3 mb-4">
              <Factory className="w-5 h-5 text-emerald-600" />
              <h3 className="text-lg font-semibold text-slate-900">Ryan Factory</h3>
            </div>
            <div className="text-sm text-slate-600 mb-4">
              <p className="mb-2">
                <span className="font-medium">{RYAN_FACTORY.name} v{RYAN_FACTORY.version}</span>
              </p>
              <p className="mb-2">Capability: <span className="font-medium">{RYAN_FACTORY.reusableCapability}</span></p>
              <p className="text-xs text-slate-500">
                Domain: {RYAN_FACTORY.domain} | Status:{" "}
                <CheckCircle className="w-3 h-3 inline text-emerald-500" /> Active
              </p>
            </div>
            <button
              onClick={() => setShowFactoryModal(false)}
              className="w-full bg-white border border-stone-200 text-slate-700 py-2 rounded-lg font-medium hover:bg-stone-50"
            >
              Close
            </button>
          </Card>
        </div>
      )}
    </div>
  );
};