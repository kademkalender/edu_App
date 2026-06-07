import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import LessonCard from '../components/LessonCard';
import { useAuth } from '../context/AuthContext';
import { lessons } from '../data/lessons';
import { getUserProgress, getUserStats } from '../utils/storage';
import { colors } from '../theme/colors';
import { borderRadius, fontSize, spacing } from '../theme/spacing';

export default function HomeScreen({ navigation }) {
  const { currentUser, logout } = useAuth();
  const [progress, setProgress] = useState({});
  const [streak, setStreak] = useState(0);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      (async () => {
        if (!currentUser) return;
        const [userProgress, stats] = await Promise.all([
          getUserProgress(currentUser),
          getUserStats(currentUser),
        ]);
        if (!active) return;
        setProgress(userProgress);
        setStreak(stats?.streak ?? 0);
      })();
      return () => { active = false; };
    }, [currentUser])
  );

  const handleLogout = async () => {
    await logout();
    navigation.replace('Welcome');
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.content}>
          <Animated.View entering={FadeIn.duration(500)} style={styles.header}>
            <View style={styles.greeting}>
              <Text style={styles.greetingSmall}>Merhaba,</Text>
              <Text style={styles.username}>{currentUser} 👋</Text>
            </View>

            <View style={styles.headerActions}>
              {streak > 0 && (
                <View style={styles.streakBadge}>
                  <Text style={styles.streakText}>🔥 {streak}</Text>
                </View>
              )}
              <Pressable
                onPress={() => navigation.navigate('Profile')}
                style={({ pressed }) => [styles.iconButton, pressed && styles.iconButtonPressed]}
              >
                <Text style={styles.iconButtonText}>👤</Text>
              </Pressable>
              <Pressable
                onPress={handleLogout}
                style={({ pressed }) => [styles.logoutButton, pressed && styles.logoutPressed]}
              >
                <Text style={styles.logoutText}>Çıkış</Text>
              </Pressable>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(100).duration(500)}>
            <Text style={styles.sectionTitle}>Dersler</Text>
            <Text style={styles.sectionSubtitle}>
              Bir derse başla ve testi tamamla
            </Text>
          </Animated.View>

          <View style={styles.lessonList}>
            {lessons.map((lesson, index) => (
              <Animated.View
                key={lesson.id}
                entering={FadeInDown.delay(200 + index * 150).duration(500)}
              >
                <LessonCard
                  lesson={lesson}
                  progress={progress[lesson.id]}
                  onPress={() => navigation.navigate('Lesson', { lessonId: lesson.id })}
                />
              </Animated.View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  greeting: {
    flex: 1,
  },
  greetingSmall: {
    color: colors.textSecondary,
    fontSize: fontSize.md,
  },
  username: {
    color: colors.primary,
    fontSize: fontSize.xl,
    fontWeight: 'bold',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  streakBadge: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  streakText: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: '700',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonPressed: {
    opacity: 0.7,
  },
  iconButtonText: {
    fontSize: 18,
  },
  logoutButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  logoutPressed: {
    opacity: 0.7,
  },
  logoutText: {
    color: colors.textSecondary,
    fontSize: fontSize.md,
    fontWeight: '500',
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  sectionSubtitle: {
    color: colors.textSecondary,
    fontSize: fontSize.md,
    marginBottom: spacing.lg,
  },
  lessonList: {
    width: '100%',
  },
});
