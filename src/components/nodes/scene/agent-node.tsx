import { Node, NodeProps } from '@xyflow/react';

import { BaseNode } from '@/components/base-node';
import { cn } from '@/lib/utils';
import type { AgentNodeData, AgentStatus } from '@/types/scene';
import type { AppNode } from '@/components/nodes';

const statusStyles: Record<AgentStatus, string> = {
  idle: 'bg-muted-foreground/60',
  running: 'bg-emerald-400',
  queued: 'bg-amber-400',
  error: 'bg-rose-400',
};

const presenceRingStyles: Record<AgentStatus, string> = {
  idle: '',
  running: 'agent-presence-ring agent-presence-ring--running',
  queued: 'agent-presence-ring agent-presence-ring--queued',
  error: 'agent-presence-ring agent-presence-ring--error',
};

export function AgentNode({
  data,
  selected,
}: NodeProps<Node<AgentNodeData, 'agent-node'>>) {
  const status = data.agentStatus ?? 'idle';
  const title = data.title ?? 'Agent';
  const zoneLabel = data.agentAssignedZoneLabel ?? data.agentAssignedZone;
  const initials = title
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <BaseNode
      selected={selected}
      className={cn(
        'flex min-w-[220px] items-center gap-3 bg-card/90 px-3 py-2',
        'backdrop-blur-sm shadow-[0_14px_40px_-30px_hsl(var(--foreground)/0.4)]'
      )}
    >
      <div className="relative">
        {presenceRingStyles[status] ? (
          <span className={presenceRingStyles[status]} />
        ) : null}
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-[11px] font-semibold text-muted-foreground">
          {initials}
        </div>
        <span
          className={cn(
            'absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-card',
            statusStyles[status]
          )}
        />
      </div>
      <div className="flex flex-1 flex-col">
        <span className="text-sm font-semibold text-foreground">{title}</span>
        <span className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
          {status}
        </span>
        {zoneLabel ? (
          <span className="mt-1 inline-flex w-fit rounded-full bg-muted/60 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {zoneLabel}
          </span>
        ) : null}
      </div>
    </BaseNode>
  );
}

AgentNode.strudelOutput = (node: AppNode, strudelString: string) => {
  const snippet = node.data.agentSnippet;

  if (!snippet || !snippet.trim()) return strudelString;

  const pattern = snippet.trim();
  return strudelString ? `${strudelString}.stack(${pattern})` : pattern;
};
