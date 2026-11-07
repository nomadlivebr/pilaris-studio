import { useSyncExternalStore } from 'react';

/** Evento (não padronizado) disparado por Chrome/Edge/Android quando o app é instalável. */
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface InstallState {
  /** Prompt nativo disponível (Android, Chrome/Edge desktop). */
  canPrompt: boolean;
  /** App rodando como PWA instalado (display-mode: standalone). */
  installed: boolean;
}

let deferredPrompt: BeforeInstallPromptEvent | null = null;
let state: InstallState = { canPrompt: false, installed: false };
const listeners = new Set<() => void>();

function setState(next: Partial<InstallState>) {
  const merged = { ...state, ...next };
  if (merged.canPrompt === state.canPrompt && merged.installed === state.installed) return;
  state = merged;
  listeners.forEach((listener) => listener());
}

const isStandalone = () =>
  window.matchMedia('(display-mode: standalone)').matches ||
  // Safari iOS (propriedade proprietária)
  (navigator as Navigator & { standalone?: boolean }).standalone === true;

/**
 * Registra os listeners o mais cedo possível (chamar em main.tsx): o navegador pode
 * disparar beforeinstallprompt antes de qualquer componente React montar.
 */
export function initInstallStore() {
  if (typeof window === 'undefined') return;
  state = { canPrompt: false, installed: isStandalone() };

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault(); // adia o mini-infobar; o prompt sai de um clique nosso
    deferredPrompt = event as BeforeInstallPromptEvent;
    setState({ canPrompt: true });
  });
  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    setState({ canPrompt: false, installed: true });
  });
  window.matchMedia('(display-mode: standalone)').addEventListener('change', (event) => {
    setState({ installed: event.matches });
  });
}

/** Abre o prompt nativo. Retorna o resultado, ou null se não houver prompt disponível. */
export async function promptInstall(): Promise<'accepted' | 'dismissed' | null> {
  if (!deferredPrompt) return null;
  const event = deferredPrompt;
  deferredPrompt = null; // o evento só pode ser usado uma vez
  setState({ canPrompt: false });
  await event.prompt();
  const { outcome } = await event.userChoice;
  return outcome;
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export function useInstallState(): InstallState {
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => state,
  );
}
