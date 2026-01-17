import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import type { AppNode } from '@/components/nodes';
import type { TargetPlatform, ZoneOutput } from '@/types/scene';

const targetOptions: { value: TargetPlatform; label: string }[] = [
  { value: 'web', label: 'Website' },
  { value: 'ios', label: 'iOS App' },
  { value: 'android', label: 'Android App' },
  { value: 'desktop', label: 'Desktop App' },
];

const outputOptions: { value: ZoneOutput; label: string; hint: string }[] = [
  { value: 'main', label: 'Main', hint: 'Full mix' },
  { value: 'monitor', label: 'Monitor', hint: 'Lower gain' },
  { value: 'mute', label: 'Mute', hint: 'Silent' },
];

type ZoneInspectorProps = {
  zone: AppNode;
  agents: AppNode[];
  onUpdateZone: (updates: Record<string, unknown>) => void;
  onAssignAgent: (agentId: string, assigned: boolean) => void;
};

export function ZoneInspector({
  zone,
  agents,
  onUpdateZone,
  onAssignAgent,
}: ZoneInspectorProps) {
  const zoneTitle = zone.data.title ?? 'Zone';
  const zoneTarget = (zone.data.zoneTarget ?? 'web') as TargetPlatform;
  const zoneOutput = (zone.data.zoneOutput ?? 'main') as ZoneOutput;
  const zoneGain = parseFloat(
    zone.data.zoneGain ?? (zoneOutput === 'monitor' ? '0.35' : '1')
  );

  const assignedAgents = agents.filter(
    (agent) =>
      agent.data.agentAssignedZone === zone.id ||
      agent.data.agentAssignedZoneLabel === zoneTitle ||
      agent.data.agentAssignedZone === zoneTitle
  );

  return (
    <section
      className={cn(
        'w-[320px] rounded-xl border bg-card/95 p-4 shadow-xl',
        'backdrop-blur-md'
      )}
    >
      <header className="space-y-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Zone Inspector
        </p>
        <h3 className="text-lg font-semibold text-foreground">{zoneTitle}</h3>
      </header>

      <div className="mt-4 grid gap-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-muted-foreground">
            Zone Name
          </label>
          <Input
            value={zoneTitle}
            onChange={(event) => onUpdateZone({ title: event.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-muted-foreground">
            Target Platform
          </label>
          <Select
            value={zoneTarget}
            onValueChange={(value) =>
              onUpdateZone({ zoneTarget: value as TargetPlatform })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select target" />
            </SelectTrigger>
            <SelectContent>
              {targetOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-muted-foreground">
            Accent Color
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={zone.data.zoneAccent ?? '#60a5fa'}
              onChange={(event) =>
                onUpdateZone({ zoneAccent: event.target.value })
              }
              className="h-9 w-12 rounded-md border border-border bg-transparent"
            />
            <Input
              value={zone.data.zoneAccent ?? '#60a5fa'}
              onChange={(event) =>
                onUpdateZone({ zoneAccent: event.target.value })
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-muted-foreground">
            Description
          </label>
          <Textarea
            value={zone.data.zoneDescription ?? ''}
            onChange={(event) =>
              onUpdateZone({ zoneDescription: event.target.value })
            }
            className="min-h-20 resize-none text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-muted-foreground">
            Audio Routing
          </label>
          <Select
            value={zoneOutput}
            onValueChange={(value) =>
              onUpdateZone({ zoneOutput: value as ZoneOutput })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select output" />
            </SelectTrigger>
            <SelectContent>
              {outputOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-[11px] text-muted-foreground">
            {outputOptions.find((option) => option.value === zoneOutput)?.hint}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-muted-foreground">
              Zone Gain
            </label>
            <span className="text-xs text-muted-foreground">
              {(Number.isFinite(zoneGain) ? zoneGain : 1).toFixed(2)}
            </span>
          </div>
          <Slider
            value={[Number.isFinite(zoneGain) ? zoneGain : 1]}
            min={0}
            max={1}
            step={0.01}
            onValueChange={(value) =>
              onUpdateZone({ zoneGain: value[0].toString() })
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-muted-foreground">
            Agents in Zone
          </label>
          <div className="grid gap-2">
            {agents.map((agent) => {
              const isAssigned = assignedAgents.some(
                (assigned) => assigned.id === agent.id
              );
              return (
                <div
                  key={agent.id}
                  className="flex items-center justify-between rounded-md border border-border/60 px-3 py-2 text-sm"
                >
                  <span className="text-foreground">
                    {agent.data.title ?? 'Agent'}
                  </span>
                  <button
                    className={cn(
                      'rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]',
                      isAssigned
                        ? 'bg-primary/10 text-primary'
                        : 'bg-muted text-muted-foreground'
                    )}
                    onClick={() => onAssignAgent(agent.id, !isAssigned)}
                  >
                    {isAssigned ? 'Remove' : 'Assign'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
