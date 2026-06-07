import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors } from '../theme/colors';
import { borderRadius, fontSize, spacing } from '../theme/spacing';

const CIRCLE_SIZE = 56;
const STROKE_WIDTH = 5;
const RADIUS = (CIRCLE_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function ProgressCircle({ percentage, color }) {
  const strokeDashoffset = CIRCUMFERENCE - (CIRCUMFERENCE * percentage) / 100;

  return (
    <View style={styles.progressCircleWrapper}>
      <Svg width={CIRCLE_SIZE} height={CIRCLE_SIZE}>
        <Circle
          cx={CIRCLE_SIZE / 2}
          cy={CIRCLE_SIZE / 2}
          r={RADIUS}
          stroke={colors.border}
          strokeWidth={STROKE_WIDTH}
          fill="transparent"
        />
        <Circle
          cx={CIRCLE_SIZE / 2}
          cy={CIRCLE_SIZE / 2}
          r={RADIUS}
          stroke={color}
          strokeWidth={STROKE_WIDTH}
          fill="transparent"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${CIRCLE_SIZE / 2} ${CIRCLE_SIZE / 2})`}
        />
      </Svg>
      <View style={styles.progressCircleText}>
        <Text style={[styles.progressPercentage, { color }]}>
          %{Math.round(percentage)}
        </Text>
      </View>
    </View>
  );
}

export default function LessonCard({ lesson, progress, onPress }) {
  // 4 olası durum
  const hasQuizScore = progress?.score !== undefined;
  const isCompleted = progress?.completed === true;
  const isFailed = hasQuizScore && !isCompleted;
  const hasSectionProgress =
    !hasQuizScore &&
    progress?.currentSection !== undefined &&
    progress?.currentSection > 0;

  let circlePercentage = null;
  let circleColor = null;

  if (isCompleted) {
    circlePercentage = (progress.score / 10) * 100;
    circleColor = colors.success;
  } else if (isFailed) {
    circlePercentage = (progress.score / 10) * 100;
    circleColor = colors.error;
  } else if (hasSectionProgress) {
    circlePercentage =
      ((progress.currentSection + 1) / progress.totalSections) * 100;
    circleColor = colors.primary;
  }

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{lesson.icon}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.title}>{lesson.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {lesson.description}
        </Text>

        <View style={styles.statusRow}>
          {isCompleted && (
            <View style={styles.completedBadge}>
              <Text style={styles.completedText}>
                ✓ Tamamlandı · {progress.score}/10
              </Text>
            </View>
          )}
          {isFailed && (
            <View style={styles.failedBadge}>
              <Text style={styles.failedText}>
                ✗ Başarısız · {progress.score}/10 · Tekrar Dene
              </Text>
            </View>
          )}
          {hasSectionProgress && (
            <View style={styles.inProgressBadge}>
              <Text style={styles.inProgressText}>
                📖 Devam Et · {progress.currentSection + 1}/{progress.totalSections} bölüm
              </Text>
            </View>
          )}
          {!hasQuizScore && !hasSectionProgress && (
            <View style={styles.startBadge}>
              <Text style={styles.startText}>Başla →</Text>
            </View>
          )}
        </View>
      </View>

      {circlePercentage !== null && (
        <ProgressCircle percentage={circlePercentage} color={circleColor} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressed: { opacity: 0.85, transform: [{ scale: 0.99 }] },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  icon: { fontSize: 32 },
  info: { flex: 1, justifyContent: 'center' },
  title: {
    color: colors.textPrimary,
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  description: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  statusRow: { flexDirection: 'row' },
  completedBadge: {
    backgroundColor: 'rgba(76, 175, 80, 0.15)',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  completedText: {
    color: colors.success,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
  failedBadge: {
    backgroundColor: 'rgba(244, 67, 54, 0.15)',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  failedText: {
    color: colors.error,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
  inProgressBadge: {
    backgroundColor: 'rgba(255, 193, 7, 0.10)',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: 'rgba(255, 193, 7, 0.3)',
  },
  inProgressText: {
    color: colors.primary,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
  startBadge: {
    backgroundColor: 'rgba(255, 193, 7, 0.15)',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  startText: {
    color: colors.primary,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
  progressCircleWrapper: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    marginLeft: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressCircleText: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressPercentage: { fontSize: 13, fontWeight: 'bold' },
});
