import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/theme/tokens';

export function Wordmark() {
  return (
    <View accessible accessibilityLabel="Pilaris Studio">
      <Text style={styles.primary}>PILARIS</Text>
      <Text style={styles.secondary}>STUDIO</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  primary: {
    color: colors.onBrand,
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 6,
  },
  secondary: {
    color: colors.turquoise,
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 7,
    marginTop: 4,
  },
});
