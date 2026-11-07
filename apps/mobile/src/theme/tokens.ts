import { brandColors, brandGradient } from '@pilaris/shared';

/**
 * Tokens visuais do aplicativo. A paleta vem de @pilaris/shared (fonte única),
 * os demais valores espelham apps/web/src/styles/tokens.css.
 */
export const colors = {
  ...brandColors,
  gradient: brandGradient,
  background: brandColors.background,
  surface: brandColors.white,
  surfaceBrand: brandColors.navy,
  surfaceBrandRaised: brandColors.deepBlue,
  onBrand: brandColors.white,
  onBrandMuted: '#9FB3C8',
  border: '#E2DED3',
  borderOnBrand: 'rgba(255, 255, 255, 0.12)',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

/** Raios discretos, coerentes com o painel web. */
export const radius = {
  sm: 4,
  md: 6,
  lg: 8,
} as const;

export const typography = {
  display: { fontSize: 34, lineHeight: 40, fontWeight: '600' },
  title: { fontSize: 22, lineHeight: 28, fontWeight: '600' },
  body: { fontSize: 16, lineHeight: 24, fontWeight: '400' },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: '600', letterSpacing: 2 },
} as const;
