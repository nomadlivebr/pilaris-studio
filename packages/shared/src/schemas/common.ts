import { z } from 'zod';

export const idSchema = z.uuid();

/** Identificador do estúdio (tenant) ao qual um registro pertence. */
export const studioIdSchema = z.uuid();

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

export type PaginationQuery = z.infer<typeof paginationQuerySchema>;

/** Formato padrão de erro retornado pela API. */
export const apiErrorSchema = z.object({
  statusCode: z.number().int(),
  error: z.string(),
  message: z.union([z.string(), z.array(z.string())]),
  path: z.string(),
  timestamp: z.iso.datetime(),
  requestId: z.string().optional(),
});

export type ApiError = z.infer<typeof apiErrorSchema>;
