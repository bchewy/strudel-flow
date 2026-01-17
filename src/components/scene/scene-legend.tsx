import { cn } from '@/lib/utils';

const statusDots = [
  { label: 'Idle', className: 'bg-muted-foreground/70' },
  { label: 'Running', className: 'bg-emerald-400' },
  { label: 'Queued', className: 'bg-amber-400' },
  { label: 'Error', className: 'bg-rose-400' },
];

export function SceneLegend() {
  return (
    <section
      className={cn(
        'rounded-xl border bg-card/95 px-4 py-3 shadow-lg',
        'backdrop-blur-md'
      )}
    >
      <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
        Scene Legend
      </div>
      <div className="mt-3 grid gap-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm border border-dashed border-muted-foreground/60" />
          Zones (platform targets)
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-muted" />
          Agents (live performers)
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {statusDots.map((status) => (
            <div key={status.label} className="flex items-center gap-1.5">
              <span className={cn('h-2 w-2 rounded-full', status.className)} />
              {status.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
