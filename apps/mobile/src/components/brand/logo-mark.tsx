import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

import { colors } from '@/theme/tokens';

interface LogoMarkProps {
  size?: number;
}

/**
 * Símbolo "P" do Pilaris Studio em degradê azul → turquesa.
 * Representação vetorial provisória até a inclusão do arquivo oficial da logo.
 */
export function LogoMark({ size = 48 }: LogoMarkProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" accessibilityLabel="Pilaris Studio">
      <Defs>
        <LinearGradient
          id="pilarisGradient"
          x1="8"
          y1="42"
          x2="40"
          y2="6"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor={colors.gradient[0]} />
          <Stop offset="1" stopColor={colors.gradient[1]} />
        </LinearGradient>
      </Defs>
      <Path
        d="M14 42V9.5h12.25a10.75 10.75 0 0 1 0 21.5H14"
        fill="none"
        stroke="url(#pilarisGradient)"
        strokeWidth={7}
      />
    </Svg>
  );
}
