export type AgentStatus = 'idle' | 'running' | 'queued' | 'error';

export type TargetPlatform = 'web' | 'ios' | 'android' | 'desktop';
export type ZoneOutput = 'main' | 'monitor' | 'mute';

export type ZoneNodeData = {
  title?: string;
  zoneTarget?: TargetPlatform;
  zoneAccent?: string;
  zoneDescription?: string;
  zoneOutput?: ZoneOutput;
  zoneGain?: string;
};

export type AgentNodeData = {
  title?: string;
  agentStatus?: AgentStatus;
  agentAvatar?: string;
  agentAssignedZone?: string;
  agentAssignedZoneLabel?: string;
  agentSnippet?: string;
};
