// src/lib/statusLabels.ts
// Zero Bug Sprint (D6 #102 follow-on) — DB enum → human-readable label maps.
//
// Postgres CHECK constraints enforce machine-friendly enums for status columns.
// The UI presents human-friendly labels. These maps centralize the translation
// so views don't duplicate the if/else chains.

import type { Client, Agent, Invoice, Sop, LegalDoc, SaleLead } from './types';

// Client.status: 'active' | 'paused' | 'archived' | 'prospect'
export const CLIENT_STATUS_LABEL: Record<Client['status'], string> = {
  active: 'Active',
  paused: 'Paused',
  archived: 'Archived',
  prospect: 'Prospect',
};

// Agent.status: 'active' | 'paused' | 'archived'
export const AGENT_STATUS_LABEL: Record<Agent['status'], string> = {
  active: 'Active',
  paused: 'Paused',
  archived: 'Archived',
};

// Agent.role: 'owner' | 'manager' | 'operator' | 'viewer'
export const AGENT_ROLE_LABEL: Record<NonNullable<Agent['role']>, string> = {
  owner: 'Owner',
  manager: 'Manager',
  operator: 'Operator',
  viewer: 'Viewer',
};

// B3 Holon — Cognitive Actor role labels (Issue #2)
// B3 is a cognitive actor, not a dumb worker. It has planning, inspection,
// and bounded escalation authority within its domain.
export const B3_ROLE_LABEL: Record<string, string> = {
  'b3-holon': 'B3 Holon',
  'b3-cognitive': 'B3 Cognitive Actor',
};

// B3 cognitive capabilities — what a B3 holon can autonomously do
export const B3_CAPABILITY_LABEL: Record<string, string> = {
  'inspect-domain-state': 'Inspect domain state',
  'investigate-unknowns': 'Investigate unknowns',
  'plan-local-course': 'Plan local course',
  'choose-tools-models-factories': 'Choose tools/models/factories',
  'delegate-subtasks': 'Delegate subtasks',
  'execute': 'Execute',
  'test-verify': 'Test/verify',
  'learn-from-evidence': 'Learn from evidence',
  'coordinate-sibling-squads': 'Coordinate sibling squads',
  'reject-invalid-mission': 'Reject invalid mission',
  'escalate-bounded': 'Escalate bounded',
};

export const B3_ESCALATION_LABEL: Record<'local' | 'b2' | 'b1', string> = {
  local: 'Local authority',
  b2: 'B2 oversight required',
  b1: 'B1 (CEO) escalation',
};

// Invoice.status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
export const INVOICE_STATUS_LABEL: Record<Invoice['status'], string> = {
  draft: 'Draft',
  sent: 'Sent',
  paid: 'Paid',
  overdue: 'Overdue',
  cancelled: 'Cancelled',
};

// Sop.status: 'draft' | 'published' | 'archived'
export const SOP_STATUS_LABEL: Record<Sop['status'], string> = {
  draft: 'Draft',
  published: 'Published',
  archived: 'Archived',
};

// LegalDoc.status: 'Signed' | 'Pending' | 'Draft' | 'Archived'
export const LEGAL_STATUS_LABEL: Record<LegalDoc['status'], string> = {
  Signed: 'Signed',
  Pending: 'Pending',
  Draft: 'Draft',
  Archived: 'Archived',
};

// SaleLead.stage (sales_leads.stage): 'Lead' | 'In Discussion' | 'Won' | 'Lost'
export const SALES_STAGE_LABEL: Record<SaleLead['stage'], string> = {
  Lead: 'Lead',
  'In Discussion': 'In Discussion',
  Won: 'Won',
  Lost: 'Lost',
};