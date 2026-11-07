/**
 * Contrato que todo provedor de pagamento (gateway) deverá implementar.
 * A implementação concreta será escolhida em uma fase futura.
 */
export type PaymentMethod = 'PIX' | 'CREDIT_CARD' | 'BOLETO';

export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'CANCELED' | 'REFUNDED';

export interface CreateChargeInput {
  /** Estúdio (tenant) responsável pela cobrança. */
  studioId: string;
  /** Valor em centavos para evitar erros de ponto flutuante. */
  amountInCents: number;
  method: PaymentMethod;
  description: string;
  dueDate?: Date;
  /** Identificador interno usado para conciliação. */
  referenceId: string;
}

export interface Charge {
  providerChargeId: string;
  status: PaymentStatus;
  amountInCents: number;
  paymentUrl?: string;
}

export interface PaymentProvider {
  readonly name: string;
  createCharge(input: CreateChargeInput): Promise<Charge>;
  getCharge(providerChargeId: string): Promise<Charge>;
}
