import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { useAuth } from '../context/AuthContext';
import { getUserStats, getUserProgress } from '../utils/storage';
import { BADGE_LIST } from '../utils/constants';
import { colors } from '../theme/colors';
import { borderRadius, fontSize, spacing } from '../theme/spacing';

export default function ProfileScreen() {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState(null);
  const [completedCount, setCompletedCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      (async () => {
        if (!currentUser) return;
        const [s, progress] = await Promise.all([
          getUserStats(currentUser),
          getUserProgress(currentUser),
        ]);
        if (!active) return;
        setStats(s);
        setCompletedCount(Object.values(progress).filter((p) => p.passed).length);
      })();
      return () => { active = false; };
    }, [currentUser])
  );

  const initial = currentUser ? currentUser.charAt(0).toUpperCase() : '?';
  const earnedBadgeIds = stats?.badges || [];

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Avatar + isim */}
        <Animated.View entering={FadeIn.duration(500)} style={styles.avatarSection}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>
          <Text style={styles.username}>{currentUser}</Text>
          <View style={styles.pointsBadge}>
            <Text style={styles.pointsText}>✨ {stats?.totalPoints ?? 0} Puan</Text>
          </View>
        </Animated.View>

        {/* İstatistik kartları */}
        <Animated.View entering={FadeInDown.delay(150).duration(500)} style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>🔥 {stats?.streak ?? 0}</Text>
            <Text style={styles.statLabel}>Günlük Seri</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>📝 {stats?.totalQuizzesTaken ?? 0}</Text>
            <Text style={styles.statLabel}>Test Çözüldü</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>⭐ {stats?.perfectScores ?? 0}</Text>
            <Text style={styles.statLabel}>Mükemmel</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>✅ {completedCount}</Text>
            <Text style={styles.statLabel}>Ders Tamamlandı</Text>
          </View>
        </Animated.View>

        {/* Rozetler */}
        <Animated.View entering={FadeInDown.delay(300).duration(500)} style={styles.section}>
          <Text style={styles.sectionTitle}>Rozetlerim</Text>
          <View style={styles.badgeGrid}>
            {BADGE_LIST.map((badge) => {
              const earned = earnedBadgeIds.includes(badge.id);
              return (
                <View
                  key={badge.id}
                  style={[styles.badgeCard, !earned && styles.badgeCardLocked]}
                >
                  <Text style={[styles.badgeIcon, !earned && styles.badgeIconLocked]}>
                    {earned ? badge.icon : '🔒'}
                  </Text>
                  <Text style={[styles.badgeTitle, !earned && styles.badgeTitleLocked]}>
                    {badge.title}
                  </Text>
                  <Text style={[styles.badgeDesc, !earned && styles.badgeDescLocked]}>
                    {badge.description}
                  </Text>
                </View>
              );
            })}
          </View>
        </Animated.View>
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
    padding: spacing.xl,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  avatarCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.textOnPrimary,
  },
  username: {
    color: colors.textPrimary,
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
    marginBottom: spacing.sm,
  },
  pointsBadge: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  pointsText: {
    color: colors.primary,
    fontSize: fontSize.lg,
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
  },
  statValue: {
    color: colors.textPrimary,
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  statLabel: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    textAlign: 'center',
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    marginBottom: spacing.md,
  },
  badgeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  badgeCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  badgeCardLocked: {
    borderColor: colors.border,
    opacity: 0.5,
  },
  badgeIcon: {
    fontSize: 32,
    marginBottom: spacing.xs,
  },
  badgeIconLocked: {},
  badgeTitle: {
    color: colors.textPrimary,
    fontSize: fontSize.sm,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 2,
  },
  badgeTitleLocked: {
    color: colors.textSecondary,
  },
  badgeDesc: {
    color: colors.textSecondary,
    fontSize: 12,
    textAlign: 'center',
  },
  badgeDescLocked: {},
});
