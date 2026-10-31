/**
 * Holon & Factory Engine — Issue #2: [BUSINESS][FRACTAL-HOLON] B1/B2/B3 are autonomous holons, not a manager→dumb-worker chain.
 *
 * Enforces:
 * 1. B3 cognitive autonomy (inspect, plan, choose tools/models/factories, delegate, execute, verify, learn, coordinate, reject, bounded escalation).
 * 2. Holon → holon → holon → instruments (deterministic scripts/workflows are instruments under B3, not replacements for B3 cognition).
 * 3. Ryan factory consumption while retaining local planning authority.
 * 4. Canary workflow: B3 detects factory limitation and routes reusable improvement request back to Ryan.
 */

import type { B3Holon, B3Capability } from '../../components/saas/lib/types';

export interface RyanFactory {
  id: string;
  name: string;
  domain: string;
  reusableCapability: string;
  version: string;
}

export interface CanaryImprovementRequest {
  b3AgentId: string;
  domain: string;
  factoryId: string;
  detectedLimitation: string;
  improvementProposal: string;
  routedTo: 'ryan' | 'b2' | 'b1';
  status: 'routed' | 'processed' | 'integrated';
}

export const CANONICAL_B3_CAPABILITIES: readonly B3Capability[] = [
  'inspect-domain-state',
  'investigate-unknowns',
  'plan-local-course',
  'choose-tools-models-factories',
  'delegate-subtasks',
  'execute',
  'test-verify',
  'learn-from-evidence',
  'coordinate-sibling-squads',
  'reject-invalid-mission',
  'escalate-bounded',
];

export function evaluateB3HolonAutonomy(holon: B3Holon): { isAutonomous: boolean; reasons: string[] } {
  const reasons: string[] = [];
  let isAutonomous = true;

  const activeCapabilities = holon.cognitiveCapabilities?.length || 0;
  if (activeCapabilities === 0) {
    isAutonomous = false;
    reasons.push('B3 holon has no cognitive capabilities defined.');
  }
  if (holon.factoryUsed) {
    reasons.push(`B3 consumes factory: ${holon.factoryUsed}`);
  }
  if (!holon.canRejectMission) {
    isAutonomous = false;
    reasons.push('B3 cannot reject invalid missions.');
  }
  const instrumentCount = holon.instruments?.length || 0;
  if (instrumentCount === 0) {
    reasons.push('B3 has no instruments configured.');
  }
  return { isAutonomous, reasons };
}

export function simulateCanaryFactoryImprovement(
  b3: B3Holon,
  factory: RyanFactory,
  limitation: string,
): CanaryImprovementRequest {
  return {
    b3AgentId: b3.id,
    domain: b3.businessDomain || 'unknown',
    factoryId: factory.id,
    detectedLimitation: limitation,
    improvementProposal: `Upgrade factory ${factory.name} (${factory.id}) to support dynamic domain parameters without human relay.`,
    routedTo: 'ryan', // Reusable improvement routed back to Ryan (not A0/CEO)
    status: 'routed',
  };
}

export function getEscalationReason(holon: B3Holon): string | null {
  if (holon.escalationLevel === 'b1') {
    return 'Constitutional/cross-domain/irreversible decision requires B1 oversight';
  }
  if (holon.escalationLevel === 'b2') {
    return 'Decision crosses B3 local authority boundary';
  }
  return null; // Local authority - no escalation needed
}