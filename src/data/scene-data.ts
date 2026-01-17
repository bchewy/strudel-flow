import { createNodeByType } from '@/components/nodes';
import type { AppNode } from '@/components/nodes';

const createZoneNode = (node: AppNode): AppNode => ({
  ...node,
  draggable: false,
  connectable: false,
  focusable: true,
  zIndex: 0,
  style: { width: 420, height: 230 },
});

const createAgentNode = (node: AppNode): AppNode => ({
  ...node,
  zIndex: 2,
});

export const sceneNodes: AppNode[] = [
  createZoneNode(
    createNodeByType({
      type: 'zone-node',
      id: 'zone_web',
      position: { x: -780, y: -280 },
      data: {
        title: 'Website',
        zoneTarget: 'web',
        zoneAccent: '#60a5fa',
        zoneDescription: 'Public-facing experience with live code playback.',
        zoneOutput: 'main',
        zoneGain: '1',
      },
    })
  ),
  createZoneNode(
    createNodeByType({
      type: 'zone-node',
      id: 'zone_mobile',
      position: { x: -520, y: 10 },
      data: {
        title: 'Mobile App',
        zoneTarget: 'android',
        zoneAccent: '#34d399',
        zoneDescription: 'Pocket stage for spontaneous loop drops.',
        zoneOutput: 'monitor',
        zoneGain: '0.45',
      },
    })
  ),
  createZoneNode(
    createNodeByType({
      type: 'zone-node',
      id: 'zone_ios',
      position: { x: -260, y: 300 },
      data: {
        title: 'Mobile App (iOS)',
        zoneTarget: 'ios',
        zoneAccent: '#f472b6',
        zoneDescription: 'Touch-first scene for performance rehearsals.',
        zoneOutput: 'main',
        zoneGain: '0.8',
      },
    })
  ),
  createAgentNode(
    createNodeByType({
      type: 'agent-node',
      id: 'agent_cursor',
      position: { x: -420, y: -140 },
      data: {
        title: 'Cursor',
        agentStatus: 'running',
        agentAssignedZone: 'zone_web',
        agentAssignedZoneLabel: 'Website',
        agentSnippet: 'sound("bd*2 sd").gain(0.8)',
      },
    })
  ),
  createAgentNode(
    createNodeByType({
      type: 'agent-node',
      id: 'agent_gemini',
      position: { x: -200, y: 140 },
      data: {
        title: 'Gemini',
        agentStatus: 'queued',
        agentAssignedZone: 'zone_mobile',
        agentAssignedZoneLabel: 'Mobile App',
        agentSnippet: 'n("0 2 4 5").scale("C4:minor")',
      },
    })
  ),
  createAgentNode(
    createNodeByType({
      type: 'agent-node',
      id: 'agent_claude',
      position: { x: 20, y: 440 },
      data: {
        title: 'Claude',
        agentStatus: 'idle',
        agentAssignedZone: 'zone_ios',
        agentAssignedZoneLabel: 'Mobile App (iOS)',
        agentSnippet: 'sound("hh*4").gain(0.6)',
      },
    })
  ),
];
