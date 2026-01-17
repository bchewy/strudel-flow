import { Node, NodeProps } from '@xyflow/react';

import { BaseNode } from '@/components/base-node';
import { cn } from '@/lib/utils';
import type { ZoneNodeData } from '@/types/scene';

const targetLabels: Record<NonNullable<ZoneNodeData['zoneTarget']>, string> = {
  web: 'Website',
  ios: 'iOS App',
  android: 'Android App',
  desktop: 'Desktop App',
};

export function ZoneNode({
  data,
  selected,
}: NodeProps<Node<ZoneNodeData, 'zone-node'>>) {
  const title = data.title ?? 'Zone';
  const target = data.zoneTarget ? targetLabels[data.zoneTarget] : 'Target';

  return (
    <BaseNode
      selected={selected}
      className={cn(
        'min-w-[320px] min-h-[200px] border-dashed bg-gradient-to-br overflow-hidden',
        'from-background via-background/95 to-muted/40',
        'shadow-[0_18px_60px_-28px_hsl(var(--foreground)/0.35)]',
        'before:absolute before:inset-0 before:rounded-md',
        'before:bg-[radial-gradient(circle_at_top,_hsl(var(--muted)/0.55),_transparent_55%)]',
        'before:opacity-70 before:content-[""]',
        'hover:ring-0'
      )}
      style={data.zoneAccent ? { borderColor: data.zoneAccent } : undefined}
    >
      <div className="relative z-10 flex h-full flex-col gap-3">
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: data.zoneAccent ?? 'hsl(var(--muted))' }}
          />
          {target}
        </div>
        <div className="text-lg font-semibold text-foreground">{title}</div>
        {data.zoneDescription ? (
          <p className="max-w-[28ch] text-xs leading-relaxed text-muted-foreground">
            {data.zoneDescription}
          </p>
        ) : null}
      </div>
    </BaseNode>
  );
}
