/**
 * Contrato que todo canal de notificação (e-mail, push, WhatsApp, SMS) deverá implementar.
 * As implementações concretas serão adicionadas em fases futuras.
 */
export type NotificationChannelType = 'EMAIL' | 'PUSH' | 'WHATSAPP' | 'SMS';

export interface NotificationMessage {
  /** Estúdio (tenant) que origina a notificação. */
  studioId: string;
  recipient: string;
  subject?: string;
  body: string;
}

export interface NotificationResult {
  delivered: boolean;
  providerMessageId?: string;
}

export interface NotificationChannel {
  readonly type: NotificationChannelType;
  send(message: NotificationMessage): Promise<NotificationResult>;
}
