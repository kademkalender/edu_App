import { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  FadeIn,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { getLessonById } from '../data/lessons';
import { updateProgress, updateGameStats } from '../utils/storage';
import { PASSING_SCORE, PASSING_PERCENTAGE } from '../utils/constants';
import { colors } from '../theme/colors';
import { borderRadius, fontSize, spacing } from '../theme/spacing';

export default function ResultScreen({ route, navigation }) {
  const { lessonId, score, total } = route.params;
  const { currentUser } = useAuth();
  const lesson = getLessonById(lessonId);

  const passed = score >= PASSING_SCORE;
  const percentage = Math.round((score / total) * 100);

  const [displayedScore, setDisplayedScore] = useState(0);
  const [gameResult, setGameResult] = useState(null);
  const statsUpdated = useRef(false);

  const animatedScore = useSharedValue(0);
  const circleScale = useSharedValue(0);

  useEffect(() => {
    if (statsUpdated.current) return;
    statsUpdated.current = true;

    (async () => {
      if (currentUser) {
        await updateProgress(currentUser, lessonId, score, passed);
        const result = await updateGameStats(currentUser, { score, total, passed });
        setGameResult(result);
      }
    })();

    circleScale.value = withDelay(200, withSpring(1, { damping: 10, stiffness: 150 }));
    animatedScore.value = withDelay(400, withTiming(score, { duration: 800 }));
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setDisplayedScore(Math.round(animatedScore.value));
    }, 30);
    return () => clearInterval(id);
  }, []);

  const circleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: circleScale.value }],
  }));

  const circleColor = passed ? colors.success : colors.error;
  const circleBackground = passed ? 'rgba(76,175,80,0.15)' : 'rgba(244,67,54,0.15)';

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.inner}>
          {/* Üst alan: emoji + başlık + skor */}
          <View style={styles.topContent}>
            <Animated.Text entering={FadeIn.duration(600)} style={styles.emoji}>
              {passed ? '🎉' : '📚'}
            </Animated.Text>

            <Animated.Text
              entering={FadeInDown.delay(200).duration(500)}
              style={[styles.title, { color: passed ? colors.primary : colors.error }]}
            >
              {passed ? 'Tebrikler!' : 'Yeterli Puan Alamadın'}
            </Animated.Text>

            <Animated.Text
              entering={FadeInDown.delay(350).duration(500)}
              style={styles.subtitle}
            >
              {passed
                ? `"${lesson.title}" dersini başarıyla tamamladın`
                : `Başarı için %${PASSING_PERCENTAGE} gerekli (en az ${PASSING_SCORE}/${total} doğru)`}
            </Animated.Text>

            <Animated.View
              style={[
                styles.scoreCircle,
                { backgroundColor: circleBackground, borderColor: circleColor },
                circleAnimatedStyle,
              ]}
            >
              <Text style={[styles.scoreText, { color: circleColor }]}>
                {displayedScore}/{total}
              </Text>
              <Text style={[styles.percentageText, { color: circleColor }]}>
                %{percentage}
              </Text>
            </Animated.View>
          </View>

          {/* Kazanılan puan + streak */}
          {gameResult && (
            <Animated.View entering={FadeInDown.delay(900).duration(500)} style={styles.rewardsBox}>
              <View style={styles.rewardRow}>
                <View style={styles.rewardItem}>
                  <Text style={styles.rewardValue}>+{gameResult.pointsEarned}</Text>
                  <Text style={styles.rewardLabel}>Puan Kazandın ✨</Text>
                </View>
                <View style={styles.rewardDivider} />
                <View style={styles.rewardItem}>
                  <Text style={styles.rewardValue}>🔥 {gameResult.streak}</Text>
                  <Text style={styles.rewardLabel}>Günlük Seri</Text>
                </View>
              </View>

              {/* Yeni rozetler */}
              {gameResult.newBadges.length > 0 && (
                <View style={styles.newBadgesContainer}>
                  <Text style={styles.newBadgesTitle}>🏅 Yeni Rozet Kazandın!</Text>
                  {gameResult.newBadges.map((badge) => (
                    <View key={badge.id} style={styles.badgeRow}>
                      <Text style={styles.badgeIcon}>{badge.icon}</Text>
                      <View>
                        <Text style={styles.badgeTitle}>{badge.title}</Text>
                        <Text style={styles.badgeDesc}>{badge.description}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </Animated.View>
          )}

          <Animated.View
            entering={FadeIn.delay(gameResult ? 1100 : 900).duration(500)}
            style={styles.messageBox}
          >
            <Text style={styles.messageText}>
              {passed
                ? '🌟 Harika iş çıkardın! Diğer derslerle devam edebilirsin.'
                : '💪 Dersi bir daha gözden geçirip tekrar denemelisin. Başarabilirsin!'}
            </Text>
          </Animated.View>

          {/* Butonlar */}
          <View style={styles.buttons}>
            {passed ? (
              <Button
                title="Ana Sayfaya Dön"
                onPress={() => navigation.replace('Home')}
                variant="primary"
              />
            ) : (
              <>
                <Button
                  title="Dersi Tekrar Et 🔄"
                  onPress={() => navigation.replace('Lesson', { lessonId })}
                  variant="primary"
                />
                <View style={styles.spacer} />
                <Button
                  title="Ana Sayfaya Dön"
                  onPress={() => navigation.replace('Home')}
                  variant="secondary"
                />
              </>
            )}
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
  inner: {
    flex: 1,
    padding: spacing.xl,
    maxWidth: 500,
    width: '100%',
    alignSelf: 'center',
  },
  topContent: {
    alignItems: 'center',
    paddingTop: spacing.lg,
  },
  emoji: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: fontSize.title,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: fontSize.md,
    textAlign: 'center',
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.md,
    lineHeight: 22,
  },
  scoreCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  scoreText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  percentageText: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    marginTop: spacing.xs,
  },
  rewardsBox: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  rewardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardItem: {
    flex: 1,
    alignItems: 'center',
  },
  rewardValue: {
    color: colors.primary,
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
  },
  rewardLabel: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    marginTop: spacing.xs,
  },
  rewardDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
  },
  newBadgesContainer: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  newBadgesTitle: {
    color: colors.primary,
    fontSize: fontSize.md,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  badgeIcon: {
    fontSize: 28,
  },
  badgeTitle: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: '600',
  },
  badgeDesc: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
  },
  messageBox: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  messageText: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttons: {
    width: '100%',
    paddingBottom: spacing.lg,
  },
  spacer: {
    height: spacing.md,
  },
});
