import { ChevronDown, TrendingUp } from 'lucide-react';

import { Card } from '@/components/ui/card';

const yLabels = ['20k', '15k', '10k', '5k', '0'];
const xLabels = ['Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out'];
const gridLines = [0, 50, 100, 150, 200];

const linePath =
  'M 40 120 C 150 90, 250 110, 350 120 C 450 130, 550 90, 650 110 C 700 120, 750 100, 780 70';
const areaPath = `${linePath} L 780 200 L 40 200 Z`;
const points = [
  { x: 40, y: 120 },
  { x: 188, y: 100 },
  { x: 336, y: 115 },
  { x: 484, y: 95 },
  { x: 632, y: 105 },
];

/** Gráfico provisório em SVG, com dados fixos. Trocar por dados da API na fase financeira. */
export function FinanceChart() {
  return (
    <Card className="min-h-0 flex-1 gap-0 rounded-2xl p-4">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <TrendingUp className="size-5 text-secondary-blue" /> Evolução financeira
        </h2>
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg border border-border bg-muted px-3 py-1.5 text-xs font-semibold text-foreground"
        >
          Últimos 6 meses <ChevronDown className="size-4" />
        </button>
      </div>

      <div className="relative h-48 min-h-0 w-full pt-2 lg:h-auto lg:flex-1">
        <svg
          role="img"
          aria-label="Evolução da receita nos últimos 6 meses, chegando a R$ 24.850,50 em outubro"
          viewBox="0 0 800 250"
          preserveAspectRatio="none"
          className="size-full overflow-visible"
        >
          <defs>
            <linearGradient id="finance-chart-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--chart-2)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--chart-2)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {gridLines.map((y, i) => (
            <g key={y}>
              <line x1="40" y1={y} x2="780" y2={y} stroke="var(--border)" strokeWidth="1" />
              <text
                x="30"
                y={y + 4}
                fill="var(--muted-foreground)"
                fontSize="12"
                textAnchor="end"
                fontWeight="500"
              >
                {yLabels[i]}
              </text>
            </g>
          ))}

          <path d={areaPath} fill="url(#finance-chart-fill)" />
          <path
            d={linePath}
            fill="none"
            stroke="var(--chart-2)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {points.map((p) => (
            <circle key={p.x} cx={p.x} cy={p.y} r="4" fill="var(--chart-2)" />
          ))}
          <circle cx="780" cy="70" r="5" fill="var(--chart-2)" stroke="white" strokeWidth="2" />

          <g transform="translate(670, 28)">
            <rect width="110" height="30" rx="15" fill="var(--primary)" />
            <text
              x="55"
              y="20"
              fill="var(--primary-foreground)"
              fontSize="12"
              fontWeight="bold"
              textAnchor="middle"
            >
              R$ 24.850,50
            </text>
          </g>

          {xLabels.map((label, i) => (
            <text
              key={label}
              x={40 + i * 148}
              y="230"
              fill="var(--muted-foreground)"
              fontSize="12"
              textAnchor="middle"
              fontWeight="500"
            >
              {label}
            </text>
          ))}
        </svg>
      </div>
    </Card>
  );
}
