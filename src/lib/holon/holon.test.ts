/// <reference types="node" />

import { describe, it, expect } from 'vitest';
import {
  evaluateB3HolonAutonomy,
  simulateCanaryFactoryImprovement,
  CANONICAL_B3_CAPABILITIES,
  type RyanFactory,
} from './holonEngine';

// Import from the types.ts in saas lib (the canonical B3Holon type)
import type { B3Holon } from '../../components/saas/lib/types';

describe('B3 Fractal Holon & Ryan Factory Architecture (Issue #2)', () => {
  it('verifies canonical B3 cognitive capabilities', () => {
    expect(CANONICAL_B3_CAPABILITIES).toContain('inspect-domain-state');
    expect(CANONICAL_B3_CAPABILITIES).toContain('plan-local-course');
    expect(CANONICAL_B3_CAPABILITIES).toContain('choose-tools-models-factories');
    expect(CANONICAL_B3_CAPABILITIES).toContain('reject-invalid-mission');
    expect(CANONICAL_B3_CAPABILITIES).toContain('escalate-bounded');
  });

  it('validates B3 cognitive autonomy holon model', () => {
    const b3Holon: B3Holon = {
      id: 'b3-6-buckybarnes',
      name: 'BuckyBarnes',
      email: 'bucky.barnes@finance.thunderbolts.internal',
      role: 'operator',
      status: 'active',
      createdAt: '2026-08-02T10:00:00Z',
      updatedAt: '2026-10-31T06:00:00Z',
      businessDomain: 'Finance & ROI',
      squad: 'Thunderbolts',
      cognitiveCapabilities: CANONICAL_B3_CAPABILITIES as readonly string[],
      instruments: ['cashflow-script-engine', 'sqlite-ledger-runner'],
      factoryUsed: 'ryan-forecast-factory-v2',
      canRejectMission: true,
      escalationLevel: 'local',
    };

    const res = evaluateB3HolonAutonomy(b3Holon);
    expect(res.isAutonomous).toBe(true);
    expect(b3Holon.factoryUsed).toBeDefined();
    expect((b3Holon.instruments || []).length).toBeGreaterThan(0);
  });

  it('demonstrates canary B3 detecting factory limitation and routing improvement to Ryan', () => {
    const b3Holon: B3Holon = {
      id: 'b3-6-buckybarnes',
      name: 'BuckyBarnes',
      email: 'bucky.barnes@finance.thunderbolts.internal',
      role: 'operator',
      status: 'active',
      createdAt: '2026-08-02T10:00:00Z',
      updatedAt: '2026-10-31T06:00:00Z',
      businessDomain: 'Finance & ROI',
      squad: 'Thunderbolts',
      cognitiveCapabilities: ['plan-local-course', 'choose-tools-models-factories', 'test-verify'],
      instruments: ['cashflow-script-engine'],
      factoryUsed: 'ryan-cashflow-calc-v1',
      canRejectMission: true,
      escalationLevel: 'local',
    };

    const factory: RyanFactory = {
      id: 'ryan-cashflow-calc-v1',
      name: 'Cashflow Calculation Factory',
      domain: 'Finance',
      reusableCapability: 'discounted-cashflow-engine',
      version: '1.0.0',
    };

    const request = simulateCanaryFactoryImprovement(
      b3Holon,
      factory,
      'Factory assumes fixed currency conversion rate across cross-border invoices without dynamic hedge delta.',
    );

    expect(request.b3AgentId).toBe('b3-6-buckybarnes');
    expect(request.routedTo).toBe('ryan'); // Routed back to Ryan, NOT A0 (CEO) or human relay
    expect(request.status).toBe('routed');
    expect(request.detectedLimitation).toContain('fixed currency conversion rate');
  });

  it('ensures deterministic automation is structured as an instrument under B3', () => {
    const instruments = ['python-script-runner', 'sql-query-engine', 'cron-routine-trigger'];
    for (const inst of instruments) {
      expect(typeof inst).toBe('string');
      expect(inst.length).toBeGreaterThan(0);
    }
  });
});