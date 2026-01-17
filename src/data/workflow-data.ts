import { AppNode, createNodeByType } from '@/components/nodes';
import { Edge } from '@xyflow/react';
import { sceneNodes } from '@/data/scene-data';

export const initialNodes: AppNode[] = [
  ...sceneNodes,
  createNodeByType({
    type: 'pad-node',
    id: 'padNode_1',
    position: { x: 220, y: -120 },
  }),
  createNodeByType({
    type: 'synth-select-node',
    id: 'synthSelectNode_1',
    position: { x: 220, y: 360 },
  }),
];

export const initialEdges: Edge[] = [
  {
    id: 'edge_1',
    source: 'padNode_1',
    target: 'synthSelectNode_1',
    type: 'default',
  },
];
