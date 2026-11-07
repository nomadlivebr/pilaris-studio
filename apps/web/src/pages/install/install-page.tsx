import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Copy,
  Download,
  Ellipsis,
  MonitorDown,
  Plus,
  Share,
  SquarePlus,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

import { detectDevice } from '@/features/pwa/device';
import { promptInstall, useInstallState } from '@/features/pwa/install-store';
import { cn } from '@/lib/utils';

const card = 'rounded-2xl bg-card p-4 shadow-[0_2px_12px_rgb(0_0_0/0.06)]';

interface Step {
  icon: LucideIcon;
  title: string;
  text: string;
}

function Steps({ steps }: { steps: readonly Step[] }) {
  return (
    <ol className="flex flex-col gap-3">
      {steps.map(({ icon: Icon, title, text }, index) => (
        <li key={title} className={cn(card, 'flex items-center gap-4')}>
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-secondary-blue/10 text-secondary-blue">
            <Icon className="size-6" strokeWidth={1.75} />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-bold tracking-wide text-secondary-blue uppercase">
              Passo {index + 1}
            </p>
            <p className="font-bold">{title}</p>
            <p className="text-sm text-muted-foreground">{text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function Notice({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 rounded-2xl bg-amber-50 p-4 text-sm text-amber-900 ring-1 ring-amber-200">
      <AlertTriangle className="mt-0.5 size-5 shrink-0" />
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function CopyLinkButton() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };
  return (
    <button
      type="button"
      onClick={() => void copy()}
      className="inline-flex min-h-11 w-fit items-center gap-2 rounded-full bg-amber-900 px-4 text-sm font-semibold text-white"
    >
      <Copy className="size-4" /> {copied ? 'Link copiado!' : 'Copiar link'}
    </button>
  );
}

const iosSteps: readonly Step[] = [
  {
    icon: Share,
    title: 'Toque em Compartilhar',
    text: 'É o ícone de quadrado com seta para cima, na barra do Safari.',
  },
  {
    icon: SquarePlus,
    title: 'Adicionar à Tela de Início',
    text: 'Role a lista de opções e toque nesta opção.',
  },
  {
    icon: Plus,
    title: 'Toque em Adicionar',
    text: 'No canto superior direito. O ícone do Pilaris aparece na sua tela inicial.',
  },
];

const androidSteps: readonly Step[] = [
  { icon: Ellipsis, title: 'Abra o menu do navegador', text: 'Toque nos três pontinhos (⋮).' },
  {
    icon: SquarePlus,
    title: 'Instalar app',
    text: 'Escolha "Instalar app" ou "Adicionar à tela inicial".',
  },
  { icon: Plus, title: 'Confirme', text: 'Toque em "Instalar". O ícone aparece na tela inicial.' },
];

/** Ilustração da barra de endereço com o ícone de instalação em destaque (desktop). */
function AddressBarHint() {
  return (
    <div className={cn(card, 'flex flex-col gap-3')}>
      <div
        aria-hidden
        className="flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-xs text-muted-foreground"
      >
        <span className="truncate">app.pilarisstudio.com.br</span>
        <span className="ml-auto flex size-8 items-center justify-center rounded-full bg-secondary-blue text-white ring-4 ring-secondary-blue/20">
          <MonitorDown className="size-4" />
        </span>
      </div>
      <p className="text-sm">
        Procure o ícone <MonitorDown className="inline size-4 text-secondary-blue" />{' '}
        <strong>Instalar</strong> no final da barra de endereço e clique nele. Se não aparecer, abra
        o menu do navegador (⋮) e escolha <strong>Instalar Pilaris Studio</strong>.
      </p>
    </div>
  );
}

export function InstallPage() {
  const device = detectDevice();
  const { canPrompt, installed } = useInstallState();
  const [outcome, setOutcome] = useState<'accepted' | 'dismissed' | null>(null);

  const install = async () => setOutcome(await promptInstall());

  let body: React.ReactNode;

  if (installed || outcome === 'accepted') {
    body = (
      <div className={cn(card, 'flex flex-col items-center gap-3 py-6 text-center')}>
        <CheckCircle2 className="size-12 text-success" strokeWidth={1.75} />
        <p className="text-lg font-bold">App já instalado neste dispositivo</p>
        <Link
          to="/"
          className="inline-flex min-h-11 items-center rounded-full bg-secondary-blue px-6 font-semibold text-white"
        >
          Abrir o painel
        </Link>
      </div>
    );
  } else if (canPrompt) {
    body = (
      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => void install()}
          className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-secondary-blue px-6 text-lg font-bold text-white shadow-[0_6px_20px_rgb(8_127_173/0.35)] active:scale-[0.99]"
        >
          <Download className="size-5" /> Instalar agora
        </button>
        {outcome === 'dismissed' && (
          <p className="text-center text-sm text-muted-foreground">
            Instalação cancelada. Você pode tentar novamente quando quiser.
          </p>
        )}
        <p className="text-center text-sm text-muted-foreground">
          Instalação em um toque, sem loja de aplicativos.
        </p>
      </div>
    );
  } else if (device.platform === 'ios') {
    body = (
      <div className="flex flex-col gap-4">
        {!device.isIosSafari && (
          <Notice>
            <p className="font-bold">Abra esta página no Safari</p>
            <p>
              No iPhone e no iPad, só o Safari consegue instalar o app. Copie o link, abra o Safari
              e cole na barra de endereço.
            </p>
            <CopyLinkButton />
          </Notice>
        )}
        <Steps steps={iosSteps} />
      </div>
    );
  } else if (device.platform === 'android') {
    body = (
      <div className="flex flex-col gap-4">
        {!device.isChromium && (
          <Notice>
            <p>
              Para a melhor experiência, abra este link no <strong>Google Chrome</strong>.
            </p>
          </Notice>
        )}
        <Steps steps={androidSteps} />
      </div>
    );
  } else if (device.isChromium) {
    body = <AddressBarHint />;
  } else if (device.browser === 'safari') {
    body = (
      <div className={card}>
        <p className="text-sm">
          No Safari, abra o menu <strong>Arquivo</strong> e escolha{' '}
          <strong>Adicionar ao Dock</strong>.
        </p>
      </div>
    );
  } else {
    body = (
      <Notice>
        <p>
          Este navegador não instala aplicativos. Abra este link no <strong>Google Chrome</strong>{' '}
          ou no <strong>Microsoft Edge</strong> para instalar o Pilaris Studio.
        </p>
      </Notice>
    );
  }

  return (
    <div className="min-h-dvh bg-surface-mobile pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] text-foreground">
      <main className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 py-6 md:max-w-xl md:py-12">
        <Link
          to="/login"
          className="inline-flex min-h-11 w-fit items-center gap-2 text-sm font-semibold text-secondary-blue"
        >
          <ArrowLeft className="size-4" /> Voltar
        </Link>

        <header className="flex flex-col items-center gap-4 text-center">
          <img
            src="/icons/icon-192.png"
            alt="Ícone do aplicativo Pilaris Studio"
            width={96}
            height={96}
            className="size-24 rounded-[22%] shadow-[0_10px_30px_rgb(6_27_54/0.3)]"
          />
          <div>
            <h1 className="text-2xl font-extrabold">Instale o Pilaris Studio</h1>
            <p className="mt-1 text-muted-foreground">
              Acesse sua agenda, alunos e financeiro direto da tela inicial, em tela cheia.
            </p>
          </div>
        </header>

        {body}
      </main>
    </div>
  );
}
