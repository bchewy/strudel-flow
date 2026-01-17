import { Background, BackgroundVariant, Panel, ReactFlow } from '@xyflow/react';
import { useCallback, useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { nodeTypes } from '@/components/nodes';
import { edgeTypes } from '@/components/edges';
import { useAppStore } from '@/store/app-context';
import { WorkflowControls } from './controls';
import { AgentConsole } from '@/components/scene/agent-console';
import { SceneLegend } from '@/components/scene/scene-legend';
import { ZoneInspector } from '@/components/scene/zone-inspector';
import { useDragAndDrop } from './useDragAndDrop';
import { useUrlStateLoader } from '@/hooks/use-url-state';
import { useGlobalPlayback } from '@/hooks/use-global-playback';
import { useThemeCss } from '@/hooks/use-theme-css';
import { useIsMobile } from '@/hooks/use-mobile';

export default function Workflow() {
  useUrlStateLoader();
  useGlobalPlayback(); // Enable global spacebar pause/play
  const isMobile = useIsMobile();

  const {
    nodes,
    edges,
    colorMode,
    theme,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeDragStart,
    onNodeDragStop,
    updateNodeData,
  } = useAppStore(
    useShallow((state) => ({
      nodes: state.nodes,
      edges: state.edges,
      colorMode: state.colorMode,
      theme: state.theme,
      onNodesChange: state.onNodesChange,
      onEdgesChange: state.onEdgesChange,
      onConnect: state.onConnect,
      onNodeDragStart: state.onNodeDragStart,
      onNodeDragStop: state.onNodeDragStop,
      updateNodeData: state.updateNodeData,
    }))
  );

  // Load theme CSS at the app level - fixes mobile color loading
  useThemeCss(theme);

  const { onDragOver, onDrop } = useDragAndDrop();

  const selectedAgent = useMemo(
    () => nodes.find((node) => node.type === 'agent-node' && node.selected),
    [nodes]
  );
  const selectedZone = useMemo(
    () => nodes.find((node) => node.type === 'zone-node' && node.selected),
    [nodes]
  );
  const agents = useMemo(
    () => nodes.filter((node) => node.type === 'agent-node'),
    [nodes]
  );

  const handleSnippetChange = useCallback(
    (value: string) => {
      if (!selectedAgent) return;
      updateNodeData(selectedAgent.id, { agentSnippet: value });
    },
    [selectedAgent, updateNodeData]
  );

  const handleZoneUpdate = useCallback(
    (updates: Record<string, unknown>) => {
      if (!selectedZone) return;
      const previousTitle = selectedZone.data.title ?? 'Zone';
      updateNodeData(selectedZone.id, updates);

      if (updates.title && updates.title !== previousTitle) {
        agents
          .filter(
            (agent) =>
              agent.data.agentAssignedZone === selectedZone.id ||
              agent.data.agentAssignedZoneLabel === previousTitle ||
              agent.data.agentAssignedZone === previousTitle
          )
          .forEach((agent) =>
            updateNodeData(agent.id, {
              agentAssignedZoneLabel: updates.title,
            })
          );
      }
    },
    [selectedZone, agents, updateNodeData]
  );

  const handleAssignAgent = useCallback(
    (agentId: string, assigned: boolean) => {
      if (!selectedZone) return;
      updateNodeData(agentId, {
        agentAssignedZone: assigned ? selectedZone.id : 'Unassigned',
        agentAssignedZoneLabel: assigned
          ? selectedZone.data.title ?? 'Zone'
          : 'Unassigned',
      });
    },
    [selectedZone, updateNodeData]
  );

  return (
    <div className="reactflow-wrapper scene-surface">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onDragOver={onDragOver}
        onDrop={onDrop}
        nodeDragThreshold={30}
        onNodeDragStart={onNodeDragStart}
        onNodeDragStop={onNodeDragStop}
        colorMode={colorMode}
        fitView
      >
        <Background
          variant={BackgroundVariant.Lines}
          gap={64}
          size={1}
          color="hsl(var(--border))"
          className="opacity-35"
        />
        <WorkflowControls />
        {!isMobile && (
          <Panel
            position="top-left"
            className="pointer-events-auto ml-16 mt-12"
          >
            <SceneLegend />
          </Panel>
        )}
        {!isMobile && selectedAgent ? (
          <Panel
            position="bottom-left"
            className="pointer-events-auto mb-6 ml-44"
          >
            <AgentConsole
              name={selectedAgent.data.title ?? 'Agent'}
              status={selectedAgent.data.agentStatus ?? 'idle'}
              assignedZone={
                selectedAgent.data.agentAssignedZoneLabel ??
                selectedAgent.data.agentAssignedZone
              }
              snippet={
                selectedAgent.data.agentSnippet ??
                'sound("bd sd hh sd")'
              }
              onSnippetChange={handleSnippetChange}
            />
          </Panel>
        ) : null}
        {!isMobile && selectedZone ? (
          <Panel
            position="top-right"
            className="pointer-events-auto mt-36 mr-6"
          >
            <ZoneInspector
              zone={selectedZone}
              agents={agents}
              onUpdateZone={handleZoneUpdate}
              onAssignAgent={handleAssignAgent}
            />
          </Panel>
        ) : null}
      </ReactFlow>
    </div>
  );
}
