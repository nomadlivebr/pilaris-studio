import {
  ArrowUpRight,
  Building2,
  Layers,
  Monitor,
  Server,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SystemStatusPanel } from '@/features/system-status/system-status-panel';
import { apiDocsUrl } from '@/lib/api-client';

const platforms = [
  {
    icon: Monitor,
    title: 'Painel web',
    description:
      'Administração do estúdio pelo navegador, pensada para a rotina da recepção e da gestão.',
    stack: 'React · Vite · Tailwind CSS',
  },
  {
    icon: Smartphone,
    title: 'Aplicativo móvel',
    description: 'Experiência nativa para alunos e professores, publicada para Android e iOS.',
    stack: 'React Native · Expo',
  },
  {
    icon: Server,
    title: 'API e dados',
    description: 'Serviços centralizados, documentados e preparados para integrações.',
    stack: 'NestJS · PostgreSQL · Prisma',
  },
] as const;

const principles = [
  {
    icon: Building2,
    title: 'Multi-estúdio',
    description: 'Cada registro pertence a um estúdio, com isolamento de dados desde a origem.',
  },
  {
    icon: ShieldCheck,
    title: 'Segurança',
    description: 'Credenciais restritas ao servidor e acesso organizado por perfis.',
  },
  {
    icon: Layers,
    title: 'Escalabilidade',
    description: 'Arquitetura modular, pronta para receber novos módulos sem retrabalho.',
  },
] as const;

export function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand text-brand-foreground">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_70%_30%,black,transparent_70%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-[-10%] size-[520px] rounded-full bg-secondary-blue/25 blur-[120px]"
        />

        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pt-36 pb-20 sm:px-6 md:pt-44 md:pb-28 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:px-8">
          <div>
            <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.22em] text-turquoise uppercase">
              <span aria-hidden className="h-px w-8 bg-turquoise" />
              Gestão para estúdios de Pilates
            </p>
            <h1 className="mt-6 max-w-2xl text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.6rem]">
              Precisão na gestão, <span className="text-turquoise">equilíbrio</span> no estúdio.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-brand-muted sm:text-lg">
              O Pilaris Studio reúne painel administrativo, aplicativo para alunos e professores e
              uma API segura em uma única plataforma, construída para crescer com o seu estúdio.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="h-11 rounded-md bg-turquoise px-5 text-brand hover:bg-turquoise/90"
              >
                <a href={apiDocsUrl} target="_blank" rel="noreferrer">
                  Documentação da API
                  <ArrowUpRight data-icon="inline-end" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-11 rounded-md border-white/20 bg-transparent px-5 text-brand-foreground hover:bg-white/10 hover:text-brand-foreground"
              >
                <a href="#fundacao">Conhecer a plataforma</a>
              </Button>
            </div>
          </div>

          <SystemStatusPanel />
        </div>
      </section>

      {/* Plataformas */}
      <section
        id="fundacao"
        className="mx-auto max-w-6xl scroll-mt-8 px-4 py-20 sm:px-6 md:py-24 lg:px-8"
      >
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.22em] text-secondary-blue uppercase">
            Fundação tecnológica
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Uma base sólida para cada ponto de contato do estúdio.
          </h2>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {platforms.map(({ icon: Icon, title, description, stack }) => (
            <Card key={title} className="gap-0 rounded-lg py-0 shadow-none ring-border">
              <CardHeader className="gap-4 px-6 pt-6">
                <span className="flex size-10 items-center justify-center rounded-md bg-primary text-turquoise">
                  <Icon className="size-5" strokeWidth={1.75} />
                </span>
                <CardTitle className="text-lg font-semibold">{title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">{description}</CardDescription>
              </CardHeader>
              <CardContent className="px-6 pt-6 pb-6">
                <Separator className="mb-4" />
                <span className="font-mono text-xs text-muted-foreground">{stack}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Princípios */}
      <section className="border-t border-border bg-card">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          {principles.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex gap-4">
              <Icon className="mt-0.5 size-5 shrink-0 text-secondary-blue" strokeWidth={1.75} />
              <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
