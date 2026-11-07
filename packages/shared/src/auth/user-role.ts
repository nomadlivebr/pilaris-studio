import { z } from 'zod';

/**
 * Perfis de acesso por estúdio. Deve permanecer igual ao enum `UserRole`
 * de database/schema/schema.prisma.
 */
export const userRoleSchema = z.enum(['OWNER', 'ADMIN', 'INSTRUCTOR', 'RECEPTIONIST', 'STUDENT']);

export type UserRole = z.infer<typeof userRoleSchema>;

export const UserRole = userRoleSchema.enum;

/** Rótulos exibidos nas interfaces (pt-BR). */
export const userRoleLabels: Record<UserRole, string> = {
  OWNER: 'Proprietário',
  ADMIN: 'Administrador',
  INSTRUCTOR: 'Professor',
  RECEPTIONIST: 'Recepção',
  STUDENT: 'Aluno',
};
