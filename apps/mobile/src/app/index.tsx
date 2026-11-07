import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LogoMark } from '@/components/brand/logo-mark';
import { Wordmark } from '@/components/brand/wordmark';
import { colors, radius, spacing, typography } from '@/theme/tokens';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.brand}>
        <LogoMark size={44} />
        <Wordmark />
      </View>

      <View style={styles.hero}>
        <View style={styles.eyebrow}>
          <View style={styles.eyebrowLine} />
          <Text style={styles.eyebrowText}>GESTÃO PARA ESTÚDIOS DE PILATES</Text>
        </View>
        <Text style={styles.title}>
          Precisão na gestão, <Text style={styles.highlight}>equilíbrio</Text> no estúdio.
        </Text>
        <Text style={styles.description}>
          Em breve, sua rotina no estúdio na palma da mão: aulas, agenda e comunicação em um só
          lugar.
        </Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.tag}>
          <Text style={styles.tagText}>Fase 1 · Fundação</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surfaceBrand,
    paddingHorizontal: spacing.xl,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingTop: spacing.xl,
  },
  hero: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing.lg,
  },
  eyebrow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  eyebrowLine: {
    width: 28,
    height: 1,
    backgroundColor: colors.turquoise,
  },
  eyebrowText: {
    ...typography.caption,
    color: colors.turquoise,
  },
  title: {
    ...typography.display,
    color: colors.onBrand,
  },
  highlight: {
    color: colors.turquoise,
  },
  description: {
    ...typography.body,
    color: colors.onBrandMuted,
  },
  footer: {
    paddingBottom: spacing.xl,
    alignItems: 'flex-start',
  },
  tag: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderOnBrand,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
  },
  tagText: {
    color: colors.onBrandMuted,
    fontSize: 12,
    letterSpacing: 0.5,
  },
});
