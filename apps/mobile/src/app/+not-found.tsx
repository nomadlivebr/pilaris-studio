import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '@/theme/tokens';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Página não encontrada' }} />
      <View style={styles.container}>
        <Text style={styles.title}>Página não encontrada</Text>
        <Link href="/" style={styles.link}>
          Voltar ao início
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
    backgroundColor: colors.surfaceBrand,
    padding: spacing.xl,
  },
  title: {
    ...typography.title,
    color: colors.onBrand,
  },
  link: {
    ...typography.body,
    color: colors.turquoise,
  },
});
