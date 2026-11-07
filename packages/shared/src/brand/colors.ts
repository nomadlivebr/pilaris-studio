/**
 * Paleta oficial do Pilaris Studio.
 * Fonte única para plataformas que consomem tokens em JS (mobile).
 * O painel web replica estes valores em apps/web/src/styles/tokens.css.
 */
export const brandColors = {
  navy: '#061B36',
  deepBlue: '#0B2945',
  turquoise: '#00D5C5',
  secondaryBlue: '#087FAD',
  background: '#F7F5EF',
  white: '#FFFFFF',
  textPrimary: '#172536',
  textSecondary: '#718096',
} as const;

export type BrandColor = keyof typeof brandColors;

/** Degradê do símbolo "P": azul secundário → turquesa. */
export const brandGradient = [brandColors.secondaryBlue, brandColors.turquoise] as const;

export const brand = {
  name: 'PILARIS STUDIO',
  displayName: 'Pilaris Studio',
} as const;
