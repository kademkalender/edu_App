import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import Button from '../components/Button';
import { colors } from '../theme/colors';
import { fontSize, spacing } from '../theme/spacing';

const logoImage = (() => {
  try { return require('../../assets/logo.png'); } catch { return null; }
})();

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Animated.View entering={FadeIn.duration(700)} style={styles.logoWrap}>
            {logoImage ? (
              <Image source={logoImage} style={styles.logoImage} resizeMode="contain" />
            ) : (
              <View style={styles.logoTextWrap}>
                <Text style={styles.logoTextWhite}>Tech </Text>
                <Text style={styles.logoTextGold}>Edu</Text>
              </View>
            )}
          </Animated.View>
          <Animated.Text
            entering={FadeInDown.delay(400).duration(600)}
            style={styles.subtitle}
          >
            İşletim Sistemleri ve 5G Teknolojisi derslerini keşfet
          </Animated.Text>
        </View>

        <Animated.View entering={FadeInUp.delay(600).duration(600)} style={styles.buttons}>
          <Button
            title="Giriş Yap"
            onPress={() => navigation.navigate('Login')}
            variant="primary"
          />
          <View style={styles.spacer} />
          <Button
            title="Kayıt Ol"
            onPress={() => navigation.navigate('Register')}
            variant="secondary"
          />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
    justifyContent: 'space-between',
    maxWidth: 500,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWrap: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  logoImage: {
    width: 200,
    height: 200,
  },
  logoTextWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoTextWhite: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: 'bold',
  },
  logoTextGold: {
    color: colors.primary,
    fontSize: 48,
    fontWeight: 'bold',
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: fontSize.md,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: spacing.md,
  },
  buttons: {
    width: '100%',
  },
  spacer: {
    height: spacing.md,
  },
});
