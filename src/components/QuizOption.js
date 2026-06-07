import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { colors } from '../theme/colors';
import { borderRadius, fontSize, spacing } from '../theme/spacing';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function QuizOption({ letter, text, status, onPress, disabled }) {
  const scale = useSharedValue(1);

  useEffect(() => {
    if (status === 'correct') {
      scale.value = withSpring(1.03, { damping: 8, stiffness: 200 });
      setTimeout(() => {
        scale.value = withSpring(1, { damping: 10, stiffness: 200 });
      }, 200);
    } else if (status === 'wrong') {
      scale.value = withTiming(0.97, { duration: 80 });
      setTimeout(() => {
        scale.value = withSpring(1, { damping: 6, stiffness: 200 });
      }, 80);
    }
  }, [status]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const getColors = () => {
    switch (status) {
      case 'correct':
      case 'revealedCorrect':
        return {
          background: 'rgba(76, 175, 80, 0.15)',
          border: colors.success,
          text: colors.success,
        };
      case 'wrong':
        return {
          background: 'rgba(244, 67, 54, 0.15)',
          border: colors.error,
          text: colors.error,
        };
      default:
        return {
          background: colors.surface,
          border: colors.border,
          text: colors.textPrimary,
        };
    }
  };

  const optionColors = getColors();

  return (
    <AnimatedPressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.option,
        {
          backgroundColor: optionColors.background,
          borderColor: optionColors.border,
        },
        animatedStyle,
      ]}
    >
      <View style={[styles.letterBadge, { borderColor: optionColors.border }]}>
        <Text style={[styles.letterText, { color: optionColors.text }]}>{letter}</Text>
      </View>
      <Text style={[styles.optionText, { color: optionColors.text }]}>{text}</Text>
      {(status === 'correct' || status === 'revealedCorrect') && (
        <Text style={styles.statusIcon}>✓</Text>
      )}
      {status === 'wrong' && <Text style={styles.statusIcon}>✗</Text>}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    marginBottom: spacing.sm,
    minHeight: 64,
  },
  letterBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  letterText: {
    fontSize: fontSize.md,
    fontWeight: 'bold',
  },
  optionText: {
    flex: 1,
    fontSize: fontSize.md,
    lineHeight: 22,
  },
  statusIcon: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    marginLeft: spacing.sm,
  },
});
