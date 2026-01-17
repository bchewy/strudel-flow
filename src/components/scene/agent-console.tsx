import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import type { AgentStatus } from '@/types/scene';

const statusStyles: Record<AgentStatus, string> = {
  idle: 'bg-muted text-muted-foreground',
  running: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
  queued: 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
  error: 'bg-rose-500/15 text-rose-700 dark:text-rose-300',
};

type AgentConsoleProps = {
  name: string;
  status: AgentStatus;
  assignedZone?: string;
  snippet: string;
  onSnippetChange: (value: string) => void;
};

export function AgentConsole({
  name,
  status,
  assignedZone,
  snippet,
  onSnippetChange,
}: AgentConsoleProps) {
  return (
    <section
      className={cn(
        'w-[340px] sm:w-[380px] rounded-xl border bg-card/95 p-4 shadow-xl',
        'backdrop-blur-md'
      )}
    >
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Live Console
          </p>
          <h3 className="text-lg font-semibold text-foreground">{name}</h3>
          {assignedZone ? (
            <p className="text-xs text-muted-foreground">Assigned: {assignedZone}</p>
          ) : null}
        </div>
        <span
          className={cn(
            'rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]',
            statusStyles[status]
          )}
        >
          {status}
        </span>
      </header>

      <div className="mt-4 space-y-2">
        <label className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Strudel Snippet
        </label>
        <Textarea
          value={snippet}
          onChange={(event) => onSnippetChange(event.target.value)}
          placeholder='sound("bd sd hh sd")'
          className="min-h-32 resize-none font-mono text-sm"
          spellCheck={false}
        />
        <p className="text-[11px] text-muted-foreground">
          Tip: keep snippets short and layer them with effects in the main graph.
        </p>
      </div>
    </section>
  );
}
