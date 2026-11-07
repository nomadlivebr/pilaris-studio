import type { UserRole } from '@pilaris/shared';

/**
 * Contexto do tenant (estúdio) em que uma operação de negócio é executada.
 * Toda regra de negócio recebe este contexto em vez de confiar em dados do cliente.
 */
export interface TenantContext {
  readonly studioId: string;
  readonly userId?: string;
  readonly role?: UserRole;
}

export class MissingTenantError extends Error {
  constructor() {
    super('Operação de negócio executada sem estúdio (studioId) definido.');
    this.name = 'MissingTenantError';
  }
}

export function assertTenant(context: Partial<TenantContext> | undefined): TenantContext {
  if (!context?.studioId) {
    throw new MissingTenantError();
  }
  return context as TenantContext;
}

/**
 * Restringe um filtro de consulta ao estúdio do contexto.
 * O studioId do contexto sempre prevalece sobre qualquer valor informado no filtro.
 */
export function scopeToStudio<TWhere extends object>(
  context: TenantContext,
  where?: TWhere,
): TWhere & { studioId: string } {
  return { ...(where ?? ({} as TWhere)), studioId: context.studioId };
}
