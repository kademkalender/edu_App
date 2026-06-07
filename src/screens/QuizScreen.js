import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInRight,
} from 'react-native-reanimated';
import Button from '../components/Button';
import QuizOption from '../components/QuizOption';
import { getLessonById } from '../data/lessons';
import { colors } from '../theme/colors';
import { borderRadius, fontSize, spacing } from '../theme/spacing';
import { TIMER_SECONDS } from '../utils/constants';

const LETTERS = ['A', 'B', 'C', 'D'];

export default function QuizScreen({ route, navigation }) {
  const { lessonId } = route.params;
  const lesson = getLessonById(lessonId);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);

  if (!lesson) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Test bulunamadı.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const totalQuestions = lesson.quiz.length;
  const question = lesson.quiz[currentQuestion];
  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const isAnswered = selectedIndex !== null;
  const progressPercent = ((currentQuestion + 1) / totalQuestions) * 100;
  const timerPercent = (timeLeft / TIMER_SECONDS) * 100;
  const timerColor =
    timeLeft <= 10 ? colors.error : timeLeft <= 20 ? colors.primary : colors.success;

  // Yeni soruya geçince sayacı sıfırla
  useEffect(() => {
    setTimeLeft(TIMER_SECONDS);
  }, [currentQuestion]);

  // Geri sayım
  useEffect(() => {
    if (isAnswered) return;
    if (timeLeft <= 0) {
      setSelectedIndex(-1); // süre doldu, yanlış sayılır
      return;
    }
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timeLeft, isAnswered]);

  const handleSelect = (index) => {
    if (isAnswered) return;
    setSelectedIndex(index);
    if (index === question.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      navigation.replace('Result', {
        lessonId,
        score,
        total: totalQuestions,
      });
    } else {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedIndex(null);
    }
  };

  const getOptionStatus = (index) => {
    if (!isAnswered) return 'idle';
    if (index === question.correctIndex) {
      return selectedIndex === index ? 'correct' : 'revealedCorrect';
    }
    if (index === selectedIndex) return 'wrong';
    return 'idle';
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.inner}>
        {/* Soru ilerlemesi */}
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.lessonTitle}>{lesson.title} · Test</Text>
            <Text style={styles.progressLabel}>
              Soru {currentQuestion + 1} / {totalQuestions}
            </Text>
          </View>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
          </View>
        </View>

        {/* Süre sayacı */}
        {!isAnswered && (
          <View style={styles.timerRow}>
            <Text style={[styles.timerText, { color: timerColor }]}>
              ⏱ {timeLeft}s
            </Text>
            <View style={styles.timerBarBg}>
              <View
                style={[
                  styles.timerBarFill,
                  { width: `${timerPercent}%`, backgroundColor: timerColor },
                ]}
              />
            </View>
          </View>
        )}

        <ScrollView
          style={styles.contentScroll}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <Animated.Text
            key={`q-${currentQuestion}`}
            entering={FadeInRight.duration(400)}
            style={styles.questionText}
          >
            {question.question}
          </Animated.Text>

          <View style={styles.optionsContainer}>
            {question.options.map((option, index) => (
              <Animated.View
                key={`opt-${currentQuestion}-${index}`}
                entering={FadeInDown.delay(150 + index * 80).duration(400)}
              >
                <QuizOption
                  letter={LETTERS[index]}
                  text={option}
                  status={getOptionStatus(index)}
                  onPress={() => handleSelect(index)}
                  disabled={isAnswered}
                />
              </Animated.View>
            ))}
          </View>

          {/* Geri bildirim */}
          {isAnswered && (
            <Animated.View entering={FadeIn.duration(300)} style={styles.feedback}>
              {selectedIndex === -1 ? (
                <Text style={styles.feedbackWrong}>⏰ Süre doldu! Doğru cevap işaretlendi.</Text>
              ) : selectedIndex === question.correctIndex ? (
                <Text style={styles.feedbackCorrect}>✓ Doğru cevap!</Text>
              ) : (
                <Text style={styles.feedbackWrong}>✗ Yanlış. Doğru cevap işaretlendi.</Text>
              )}
            </Animated.View>
          )}

          {/* Açıklama */}
          {isAnswered && question.explanation && (
            <Animated.View
              entering={FadeInDown.delay(200).duration(400)}
              style={styles.explanationBox}
            >
              <Text style={styles.explanationLabel}>💡 Açıklama</Text>
              <Text style={styles.explanationText}>{question.explanation}</Text>
            </Animated.View>
          )}
        </ScrollView>

        <View style={styles.bottomButton}>
          <Button
            title={
              !isAnswered
                ? 'Bir şık seç'
                : isLastQuestion
                ? 'Sonuçları Gör 🎉'
                : 'Sonraki Soru →'
            }
            onPress={handleNext}
            disabled={!isAnswered}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  inner: {
    flex: 1,
    padding: spacing.lg,
    maxWidth: 700,
    width: '100%',
    alignSelf: 'center',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: colors.textSecondary,
    fontSize: fontSize.lg,
  },
  progressSection: {
    marginBottom: spacing.sm,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  lessonTitle: {
    color: colors.primary,
    fontSize: fontSize.md,
    fontWeight: '600',
    flex: 1,
  },
  progressLabel: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    marginLeft: spacing.md,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.sm,
  },
  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  timerText: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    width: 44,
  },
  timerBarBg: {
    flex: 1,
    height: 6,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
  },
  timerBarFill: {
    height: '100%',
    borderRadius: borderRadius.sm,
  },
  contentScroll: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: spacing.lg,
  },
  questionText: {
    color: colors.textPrimary,
    fontSize: fontSize.xl,
    fontWeight: '600',
    lineHeight: 30,
    marginBottom: spacing.lg,
  },
  optionsContainer: {
    width: '100%',
  },
  feedback: {
    marginTop: spacing.md,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  feedbackCorrect: {
    color: colors.success,
    fontSize: fontSize.md,
    fontWeight: '600',
  },
  feedbackWrong: {
    color: colors.error,
    fontSize: fontSize.md,
    fontWeight: '600',
  },
  explanationBox: {
    marginTop: spacing.sm,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  explanationLabel: {
    color: colors.primary,
    fontSize: fontSize.sm,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  explanationText: {
    color: colors.textPrimary,
    fontSize: fontSize.sm,
    lineHeight: 20,
  },
  bottomButton: {
    paddingTop: spacing.md,
  },
});
