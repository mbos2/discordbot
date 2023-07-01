export enum Modules {
  AuditLog = 'audit-log',
  W3SGoogle = 'w3sgoogle',
  MediaChannels = 'media-channels',
  Collector = 'collector'
}

export interface PortalModule {
  moduleName: string;
  isEnabled: boolean;
}

export interface CollectedMessage {
  id?: string;
  discordUserId: string;
  discordUsername: string;
  discordMessageId: string;
  content: string;
  embeds?: any;
  category: CollectedMessageCategory;
  collectedAt?: string | number;
}

export enum CollectedMessageCategory {
  Idea = 'idea',
  Feedback = 'feedback',
  Question = 'question'
}