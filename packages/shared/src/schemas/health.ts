import { z } from 'zod';

export const healthStatusSchema = z.enum(['ok', 'error']);

export const healthResponseSchema = z.object({
  status: healthStatusSchema,
  service: z.string(),
  version: z.string(),
  environment: z.string(),
  uptimeSeconds: z.number().nonnegative(),
  timestamp: z.iso.datetime(),
});

export type HealthResponse = z.infer<typeof healthResponseSchema>;

export const databaseHealthResponseSchema = z.object({
  status: healthStatusSchema,
  database: z.literal('postgresql'),
  latencyMs: z.number().nonnegative(),
  timestamp: z.iso.datetime(),
});

export type DatabaseHealthResponse = z.infer<typeof databaseHealthResponseSchema>;
