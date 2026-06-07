import { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Button from '../components/Button';
import Input from '../components/Input';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/colors';
import { fontSize, spacing } from '../theme/spacing';

const logoImage = (() => {
  try { return require('../../assets/logo.png'); } catch { return null; }
})();

export default function RegisterScreen({ navigation }) {
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    setError('');

    if (!username.trim() || !password || !passwordConfirm) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }
    if (username.trim().length < 3) {
      setError('Kullanıcı adı en az 3 karakter olmalı.');
      return;
    }
    if (password.length < 4) {
      setError('Şifre en az 4 karakter olmalı.');
      return;
    }
    if (password !== passwordConfirm) {
      setError('Şifreler eşleşmiyor.');
      return;
    }

    setLoading(true);
    const result = await register(username.trim(), password);
    setLoading(false);

    if (result.success) {
      if (Platform.OS === 'web') {
        alert('Kayıt başarılı! Şimdi giriş yapabilirsin.');
      } else {
        Alert.alert('Başarılı', 'Kayıt başarılı! Şimdi giriş yapabilirsin.');
      }
      navigation.replace('Login');
    } else {
      setError(result.error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <Animated.View entering={FadeInDown.duration(500)}>
            <View style={styles.brandRow}>
              {logoImage ? (
                <Image source={logoImage} style={styles.brandLogo} resizeMode="contain" />
              ) : (
                <View style={styles.brandTextRow}>
                  <Text style={styles.brandWhite}>Tech </Text>
                  <Text style={styles.brandGold}>Edu</Text>
                </View>
              )}
            </View>
            <Text style={styles.title}>Hesap Oluştur</Text>
            <Text style={styles.subtitle}>Kayıt olarak derslere başlayabilirsin</Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(150).duration(500)} style={styles.form}>
            <Input
              label="Kullanıcı Adı"
              value={username}
              onChangeText={setUsername}
              placeholder="Örn: kadem"
            />
            <Input
              label="Şifre"
              value={password}
              onChangeText={setPassword}
              placeholder="En az 4 karakter"
              secureTextEntry
            />
            <Input
              label="Şifre (Tekrar)"
              value={passwordConfirm}
              onChangeText={setPasswordConfirm}
              placeholder="Şifreni tekrar yaz"
              secureTextEntry
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <View style={styles.spacer} />
            <Button
              title={loading ? 'Kaydediliyor...' : 'Kayıt Ol'}
              onPress={handleRegister}
              disabled={loading}
            />
          </Animated.View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: spacing.xl,
    maxWidth: 500,
    width: '100%',
    alignSelf: 'center',
  },
  title: {
    color: colors.primary,
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
    marginBottom: spacing.sm,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: fontSize.md,
    marginBottom: spacing.xl,
  },
  form: {
    width: '100%',
  },
  spacer: {
    height: spacing.md,
  },
  error: {
    color: colors.error,
    fontSize: fontSize.md,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  brandRow: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  brandLogo: {
    width: 80,
    height: 80,
  },
  brandTextRow: {
    flexDirection: 'row',
  },
  brandWhite: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  brandGold: {
    color: colors.primary,
    fontSize: 28,
    fontWeight: 'bold',
  },
});
