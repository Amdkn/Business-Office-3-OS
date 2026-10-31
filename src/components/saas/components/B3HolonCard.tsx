/**
 * B3 Holon Card — Issue #2: B1/B2/B3 are autonomous holons, not a manager→dumb-worker chain.
 *
 * Displays a B3 cognitive actor with their capabilities, instruments, and factory usage.
 * B3 is a cognitive actor that plans, inspects, chooses tools, and executes within bounded authority.
 * Deterministic automations are instruments UNDER B3, not replacements for B3 cognition.
 */

import React from 'react';
import {
  Brain,
  Factory,
  Code,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';
import { Badge } from './Badge';
import { Card } from './Card';
import { B3Holon, B3Capability } from '../lib/types';
import {
  B3_CAPABILITY_LABEL,
  B3_ESCALATION_LABEL,
} from '../lib/statusLabels';

interface B3HolonCardProps {
  holon: B3Holon;
  onSelect?: () => void;
}

export const B3HolonCard: React.FC<B3HolonCardProps> = ({ holon, onSelect }) => {
  const activeCapabilities = holon.cognitiveCapabilities || [];
  const instrumentCount = holon.instruments?.length || 0;
  const hasFactory = !!holon.factoryUsed;

  return (
    <Card
      className="flex flex-col hover:shadow-md transition-shadow cursor-pointer"
      onClick={onSelect}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 grid place-items-center">
            <Brain className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 leading-tight">{holon.name}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{holon.email || '—'}</p>
          </div>
        </div>
        {hasFactory && (
          <Factory className="w-5 h-5 text-emerald-600 flex-shrink-0" title="Using Ryan factory" />
        )}
      </div>

      {/* Cognitive Capabilities Badge */}
      {activeCapabilities.length > 0 && (
        <div className="mb-3">
          <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5 block">
            Cognitive Capabilities ({activeCapabilities.length})
          </span>
          <div className="flex flex-wrap gap-1.5">
            {activeCapabilities.slice(0, 4).map((cap: B3Capability) => (
              <Badge
                key={cap}
                variant="outline"
                size="sm"
                title={B3_CAPABILITY_LABEL[cap] || cap}
              >
                {B3_CAPABILITY_LABEL[cap]?.split(' ')[0] || cap}
              </Badge>
            ))}
            {activeCapabilities.length > 4 && (
              <Badge variant="outline" size="sm" title={`+${activeCapabilities.length - 4} more`}>
                +{activeCapabilities.length - 4}
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Instruments */}
      {instrumentCount > 0 && (
        <div className="mb-3 p-3 bg-slate-50 rounded-lg">
          <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-1.5">
            Instruments ({instrumentCount})
          </span>
          <div className="text-xs text-slate-700 space-y-0.5">
            {holon.instruments?.slice(0, 3).map((inst: string, i: number) => (
              <div key={i} className="flex items-center gap-2">
                <Code className="w-3 h-3 text-slate-400" />
                <span className="truncate">{inst}</span>
              </div>
            ))}
            {holon.instruments?.length && holon.instruments.length > 3 && (
              <div className="text-slate-500">
                +{holon.instruments.length - 3} more
              </div>
            )}
          </div>
        </div>
      )}

      {/* Factory Usage */}
      {hasFactory && holon.factoryUsed && (
        <div className="mb-3 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
          <div className="flex items-center gap-2 mb-1.5">
            <Factory className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
              Ryan Factory
            </span>
          </div>
          <p className="text-xs text-emerald-700 truncate" title={holon.factoryUsed}>
            {holon.factoryUsed}
          </p>
        </div>
      )}

      {/* Domain & Squad */}
      {(holon.businessDomain || holon.squad) && (
        <div className="mb-3 flex gap-2">
          {holon.squad && (
            <Badge variant="secondary" size="sm">
              Squad: {holon.squad}
            </Badge>
          )}
          {holon.businessDomain && (
            <Badge variant="outline" size="sm" title={holon.businessDomain}>
              {holon.businessDomain.split(' ')[0]}
            </Badge>
          )}
        </div>
      )}

      {/* Escalation Level */}
      {holon.escalationLevel && (
        <div className="mb-3 flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs text-slate-500">
            <span className="font-medium">Escalation:</span>{' '}
            {B3_ESCALATION_LABEL[holon.escalationLevel]}
          </span>
        </div>
      )}

      {/* Footer */}
      <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Autonomous</span>
        </div>
        <ChevronRight className="w-4 h-4" />
      </div>
    </Card>
  );
};