import { BarChart3, ChevronDown } from 'lucide-react';
import { useId, useState } from 'react';

interface Period {
  label: string;
  months: readonly string[];
  /** Receita mensal em milhares de reais (dados provisórios). */
  values: readonly number[];
}

const periods: readonly Period[] = [
  {
    label: 'Últimos 6 meses',
    months: ['Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out'],
    values: [12.1, 13.8, 12.9, 16.4, 18.2, 24.85],
  },
  {
    label: 'Últimos 3 meses',
    months: ['Ago', 'Set', 'Out'],
    values: [16.4, 18.2, 24.85],
  },
];

const W = 340;
const H = 190;
const PAD = { left: 32, right: 16, top: 34, bottom: 26 };
const Y_MAX = 25;
const Y_TICKS = [0, 5, 10, 15, 20, 25];

const formatBRL = (thousands: number) =>
  (thousands * 1000).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

/** Gráfico de linha em SVG com proporção fixa (sem distorcer textos), preenchimento em degradê e tooltip no último ponto. */
export function MobileFinanceChart() {
  const gradientId = useId();
  const [periodIndex, setPeriodIndex] = useState(0);
  const { months, values } = periods[periodIndex] ?? periods[0]!;

  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;
  const x = (i: number) => PAD.left + (values.length === 1 ? 0 : (i / (values.length - 1)) * plotW);
  const y = (v: number) => PAD.top + plotH - (v / Y_MAX) * plotH;

  const pts = values.map((v, i) => ({ x: x(i), y: y(v) }));
  const linePath = pts
    .map((p, i) => {
      const prev = pts[i - 1];
      if (!prev) return `M ${p.x} ${p.y}`;
      const mid = (prev.x + p.x) / 2;
      return `C ${mid} ${prev.y}, ${mid} ${p.y}, ${p.x} ${p.y}`;
    })
    .join(' ');
  const baseline = y(0);
  const areaPath = `${linePath} L ${pts.at(-1)!.x} ${baseline} L ${pts[0]!.x} ${baseline} Z`;

  const last = pts.at(-1)!;
  const lastValue = values.at(-1)!;
  const tooltipW = 98;

  return (
    <section
      aria-labelledby="mobile-chart-title"
      className="mx-4 rounded-2xl bg-card p-4 shadow-[0_2px_12px_rgb(0_0_0/0.06)]"
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 id="mobile-chart-title" className="flex items-center gap-2 text-base font-bold">
          <BarChart3 className="size-5 text-secondary-blue" /> Evolução Financeira
        </h2>
        <label className="relative">
          <span className="sr-only">Período</span>
          <select
            value={periodIndex}
            onChange={(e) => setPeriodIndex(Number(e.target.value))}
            className="h-11 appearance-none rounded-xl border border-border bg-muted py-0 pr-8 pl-3 text-xs font-semibold text-foreground"
          >
            {periods.map((p, i) => (
              <option key={p.label} value={i}>
                {p.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-2 size-4 -translate-y-1/2" />
        </label>
      </div>

      <svg
        role="img"
        aria-label={`Evolução da receita, chegando a ${formatBRL(lastValue)} em ${months.at(-1)}`}
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full overflow-visible"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--chart-2)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--chart-2)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {Y_TICKS.map((tick) => (
          <g key={tick}>
            <line
              x1={PAD.left}
              x2={W - PAD.right}
              y1={y(tick)}
              y2={y(tick)}
              stroke="var(--border)"
              strokeWidth="1"
            />
            <text
              x={PAD.left - 6}
              y={y(tick) + 4}
              textAnchor="end"
              fontSize="10"
              fill="var(--muted-foreground)"
            >
              {tick === 0 ? '0' : `${tick}k`}
            </text>
          </g>
        ))}

        <path d={areaPath} fill={`url(#${gradientId})`} />
        <path
          d={linePath}
          fill="none"
          stroke="var(--chart-2)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {pts.slice(0, -1).map((p) => (
          <circle key={p.x} cx={p.x} cy={p.y} r="3" fill="var(--chart-2)" />
        ))}
        <circle
          cx={last.x}
          cy={last.y}
          r="5"
          fill="var(--chart-2)"
          stroke="white"
          strokeWidth="2"
        />

        <g transform={`translate(${last.x - tooltipW + 8}, ${last.y - 32})`}>
          <rect width={tooltipW} height="24" rx="8" fill="var(--primary)" />
          <text
            x={tooltipW / 2}
            y="16"
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="var(--primary-foreground)"
          >
            {formatBRL(lastValue)}
          </text>
        </g>

        {months.map((month, i) => (
          <text
            key={month}
            x={x(i)}
            y={H - 6}
            textAnchor="middle"
            fontSize="10"
            fill="var(--muted-foreground)"
          >
            {month}
          </text>
        ))}
      </svg>
    </section>
  );
}
