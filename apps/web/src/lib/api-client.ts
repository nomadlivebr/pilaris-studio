import { type ZodType } from 'zod';

import { env } from './env';

export class ApiRequestError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ApiRequestError';
    this.status = status;
  }
}

/** Cliente HTTP mínimo da API. Valida a resposta com o schema compartilhado. */
export async function apiGet<T>(
  path: string,
  schema: ZodType<T>,
  signal?: AbortSignal,
): Promise<T> {
  let response: Response;
  try {
    response = await fetch(new URL(path, env.VITE_API_URL), {
      headers: { Accept: 'application/json' },
      signal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') throw error;
    throw new ApiRequestError('Não foi possível conectar à API');
  }

  if (!response.ok) {
    throw new ApiRequestError(`A API respondeu com status ${response.status}`, response.status);
  }

  return schema.parse(await response.json());
}

export const apiDocsUrl = new URL('/docs', env.VITE_API_URL).toString();
