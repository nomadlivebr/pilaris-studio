import { Link } from 'react-router';

import { Button } from '@/components/ui/button';

export function NotFoundPage() {
  return (
    <section className="flex min-h-[70dvh] flex-col items-center justify-center bg-brand px-4 pt-20 text-center text-brand-foreground">
      <p className="font-mono text-sm text-turquoise">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">Página não encontrada</h1>
      <p className="mt-3 max-w-md text-brand-muted">
        O endereço acessado não existe ou ainda não está disponível.
      </p>
      <Button
        asChild
        className="mt-8 h-10 rounded-md bg-turquoise px-5 text-brand hover:bg-turquoise/90"
      >
        <Link to="/">Voltar ao início</Link>
      </Button>
    </section>
  );
}
