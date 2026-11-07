import { databaseHealthResponseSchema, healthResponseSchema } from '@pilaris/shared';
import { useEffect, useState } from 'react';

import { apiGet } from '@/lib/api-client';

export type ServiceState = 'checking' | 'online' | 'offline';

export interface SystemStatus {
  api: ServiceState;
  database: ServiceState;
  apiVersion?: string;
}

const REFRESH_INTERVAL_MS = 30_000;

async function fetchSystemStatus(signal: AbortSignal): Promise<SystemStatus> {
  const [api, database] = await Promise.allSettled([
    apiGet('/health', healthResponseSchema, signal),
    apiGet('/health/database', databaseHealthResponseSchema, signal),
  ]);

  return {
    api: api.status === 'fulfilled' ? 'online' : 'offline',
    database: database.status === 'fulfilled' ? 'online' : 'offline',
    apiVersion: api.status === 'fulfilled' ? api.value.version : undefined,
  };
}

/** Consulta periodicamente os endpoints de saúde da API. */
export function useSystemStatus(): SystemStatus {
  const [status, setStatus] = useState<SystemStatus>({ api: 'checking', database: 'checking' });

  useEffect(() => {
    let controller = new AbortController();

    const refresh = () => {
      controller.abort();
      controller = new AbortController();
      fetchSystemStatus(controller.signal)
        .then(setStatus)
        .catch(() => undefined); // requisição cancelada
    };

    refresh();
    const interval = window.setInterval(refresh, REFRESH_INTERVAL_MS);

    return () => {
      window.clearInterval(interval);
      controller.abort();
    };
  }, []);

  return status;
}
