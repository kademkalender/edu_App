import { useEffect, useRef, useState } from 'react';
import {
  Alert,
  PanResponder,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePreventRemove } from '@react-navigation/native';
import Animated, {
  FadeIn,
  FadeInLeft,
  FadeInRight,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { getLessonById } from '../data/lessons';
import { getUserProgress, updateSectionProgress } from '../utils/storage';
import { colors } from '../theme/colors';
import { borderRadius, fontSize, spacing } from '../theme/spacing';

const CALLOUT_THEME = {
  key:     { bg: 'rgba(33,150,243,0.12)',  border: 'rgba(33,150,243,0.35)',  label: '#64B5F6' },
  tip:     { bg: 'rgba(255,193,7,0.10)',   border: 'rgba(255,193,7,0.30)',   label: '#FFC107' },
  warning: { bg: 'rgba(255,87,34,0.10)',   border: 'rgba(255,87,34,0.30)',   label: '#FF7043' },
  note:    { bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.12)', label: '#B0BEC5' },
};

function estimateReadingTime(blocks = []) {
  const words = blocks.reduce((acc, b) => {
    if (b.text)  return acc + b.text.split(' ').length;
    if (b.items) return acc + b.items.join(' ').split(' ').length;
    return acc;
  }, 0);
  const min = Math.ceil(words / 150);
  return min <= 1 ? '~1 dk' : `~${min} dk`;
}

function BlockRenderer({ block, compact }) {
  const scale = compact ? 0.92 : 1;

  switch (block.type) {
    case 'paragraph':
      return (
        <Text style={[styles.paragraph, { fontSize: fontSize.md * scale }]}>
          {block.text}
        </Text>
      );

    case 'callout': {
      const theme = CALLOUT_THEME[block.variant] ?? CALLOUT_THEME.note;
      return (
        <View style={[styles.callout, { backgroundColor: theme.bg, borderColor: theme.border }]}>
          <Text style={styles.calloutIcon}>{block.icon}</Text>
          <View style={styles.calloutBody}>
            {block.label && (
              <Text style={[styles.calloutLabel, { color: theme.label }]}>{block.label}</Text>
            )}
            <Text style={[styles.calloutText, { fontSize: fontSize.sm * scale }]}>
              {block.text}
            </Text>
          </View>
        </View>
      );
    }

    case 'list':
      return (
        <View style={styles.listContainer}>
          {block.label && <Text style={styles.listLabel}>{block.label}</Text>}
          {block.items.map((item, i) => (
            <View key={i} style={styles.listItem}>
              <Text style={styles.listBullet}>›</Text>
              <Text style={[styles.listText, { fontSize: fontSize.md * scale }]}>{item}</Text>
            </View>
          ))}
        </View>
      );

    case 'highlight':
      return (
        <View style={styles.highlightBox}>
          <Text style={[styles.highlightText, { fontSize: fontSize.md * scale }]}>
            {block.text}
          </Text>
        </View>
      );

    default:
      return null;
  }
}

export default function LessonScreen({ route, navigation }) {
  const { lessonId } = route.params;
  const { currentUser } = useAuth();
  const lesson = getLessonById(lessonId);
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const [currentSection, setCurrentSection] = useState(0);
  const [initialized, setInitialized] = useState(false);
  const [allowExit, setAllowExit] = useState(false);
  const [direction, setDirection] = useState('right');

  const progress = useSharedValue(0);
  const btnScale = useSharedValue(1);

  const totalSections = lesson ? lesson.sections.length : 0;

  // Refs so PanResponder always sees fresh values
  const currentSectionRef = useRef(0);
  const isLastSectionRef = useRef(false);
  currentSectionRef.current = currentSection;
  isLastSectionRef.current = currentSection === totalSections - 1;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gs) =>
        Math.abs(gs.dx) > 12 && Math.abs(gs.dx) > Math.abs(gs.dy) * 1.5,
      onPanResponderRelease: (_, gs) => {
        if (gs.dx < -60 && !isLastSectionRef.current) {
          setDirection('right');
          setCurrentSection((p) => p + 1);
        } else if (gs.dx > 60 && currentSectionRef.current > 0) {
          setDirection('left');
          setCurrentSection((p) => p - 1);
        }
      },
    })
  ).current;

  useEffect(() => {
    (async () => {
      if (currentUser && lesson) {
        const userProgress = await getUserProgress(currentUser);
        const lessonProgress = userProgress[lessonId];
        if (lessonProgress?.currentSection !== undefined && !lessonProgress.completed) {
          setCurrentSection(lessonProgress.currentSection);
        }
        setInitialized(true);
      }
    })();
  }, [currentUser, lessonId, lesson]);

  useEffect(() => {
    if (totalSections > 0) {
      progress.value = withTiming(((currentSection + 1) / totalSections) * 100, { duration: 400 });
    }
    if (initialized && currentUser) {
      updateSectionProgress(currentUser, lessonId, currentSection, totalSections);
    }
  }, [currentSection, totalSections, initialized]);

  usePreventRemove(!allowExit, ({ data }) => {
    const msg =
      'Dersten çıkmak istediğine emin misin?\n\nKaldığın bölüm kaydedilecek, geri döndüğünde aynı yerden devam edebilirsin.';
    const confirmAndExit = () => {
      setAllowExit(true);
      setTimeout(() => navigation.dispatch(data.action), 0);
    };
    if (Platform.OS === 'web') {
      if (window.confirm(msg)) confirmAndExit();
    } else {
      Alert.alert('Dersten Çık', msg, [
        { text: 'İptal', style: 'cancel' },
        { text: 'Çık', style: 'destructive', onPress: confirmAndExit },
      ]);
    }
  });

  const progressBarStyle = useAnimatedStyle(() => ({ width: `${progress.value}%` }));
  const btnAnimStyle = useAnimatedStyle(() => ({ transform: [{ scale: btnScale.value }] }));

  if (!lesson) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Ders bulunamadı.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const section = lesson.sections[currentSection];
  const isFirstSection = currentSection === 0;
  const isLastSection = currentSection === totalSections - 1;
  const blocks = section.blocks ?? [];

  const goNext = () => {
    btnScale.value = withSequence(
      withSpring(1.04, { duration: 120 }),
      withTiming(1, { duration: 120 })
    );
    if (isLastSection) {
      setAllowExit(true);
      setTimeout(() => navigation.navigate('Quiz', { lessonId }), 160);
    } else {
      setDirection('right');
      setCurrentSection((p) => p + 1);
    }
  };

  const goPrevious = () => {
    if (!isFirstSection) {
      setDirection('left');
      setCurrentSection((p) => p - 1);
    }
  };

  const slideIn = direction === 'right'
    ? FadeInRight.duration(320)
    : FadeInLeft.duration(320);

  const pad = isLandscape ? spacing.md : spacing.lg;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={[styles.inner, { padding: pad }]} {...panResponder.panHandlers}>

        {/* Progress header */}
        <View style={[styles.progressSection, isLandscape && styles.progressSectionLandscape]}>
          <View style={styles.progressHeader}>
            <Text
              style={[styles.lessonTitle, isLandscape && styles.lessonTitleLandscape]}
              numberOfLines={1}
            >
              {lesson.title}
            </Text>
            <View style={styles.progressMeta}>
              <Text style={styles.readingTime}>{estimateReadingTime(blocks)}</Text>
              <Text style={styles.progressLabel}>{currentSection + 1} / {totalSections}</Text>
            </View>
          </View>
          <View style={styles.progressBarBg}>
            <Animated.View style={[styles.progressBarFill, progressBarStyle]} />
          </View>
        </View>

        {/* Scrollable content */}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[
            styles.scrollContent,
            isLandscape && styles.scrollContentLandscape,
          ]}
          showsVerticalScrollIndicator={false}
        >
          <Animated.Text
            key={`title-${currentSection}`}
            entering={slideIn}
            style={[styles.sectionTitle, isLandscape && styles.sectionTitleLandscape]}
          >
            {section.title}
          </Animated.Text>

          {section.summary && (
            <Animated.View
              key={`summary-${currentSection}`}
              entering={FadeIn.delay(60).duration(350)}
              style={styles.summaryBanner}
            >
              <Text style={styles.summaryIcon}>📋</Text>
              <Text style={styles.summaryText}>{section.summary}</Text>
            </Animated.View>
          )}

          {blocks.map((block, i) => (
            <Animated.View
              key={`block-${currentSection}-${i}`}
              entering={FadeIn.delay(100 + i * 55).duration(380)}
            >
              <BlockRenderer block={block} compact={isLandscape} />
            </Animated.View>
          ))}
        </ScrollView>

        {/* Navigation */}
        <Animated.View style={[styles.navButtons, btnAnimStyle]}>
          <Pressable
            onPress={goPrevious}
            disabled={isFirstSection}
            style={({ pressed }) => [
              styles.prevButton,
              isFirstSection && styles.prevButtonDisabled,
              pressed && !isFirstSection && styles.prevButtonPressed,
            ]}
          >
            <Text style={[styles.prevButtonText, isFirstSection && styles.prevButtonTextDisabled]}>
              ← Önceki
            </Text>
          </Pressable>

          <View style={styles.nextButtonWrapper}>
            <Button
              title={isLastSection ? 'Teste Başla 🎯' : 'Sonraki →'}
              onPress={goNext}
            />
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  inner: {
    flex: 1,
    maxWidth: 700,
    width: '100%',
    alignSelf: 'center',
  },
  errorContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  errorText: { color: colors.textSecondary, fontSize: fontSize.lg },

  // Progress
  progressSection: { marginBottom: spacing.lg },
  progressSectionLandscape: { marginBottom: spacing.sm },
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
  lessonTitleLandscape: { fontSize: fontSize.sm },
  progressMeta: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginLeft: spacing.md },
  readingTime: { color: colors.textSecondary, fontSize: fontSize.sm, opacity: 0.7 },
  progressLabel: { color: colors.textSecondary, fontSize: fontSize.sm },
  progressBarBg: {
    height: 6,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.sm,
  },

  // Scroll
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: spacing.lg },
  scrollContentLandscape: { paddingBottom: spacing.md },

  // Section title
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
    marginBottom: spacing.md,
  },
  sectionTitleLandscape: { fontSize: fontSize.xl, marginBottom: spacing.sm },

  // Summary banner
  summaryBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(255,193,7,0.07)',
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: 'rgba(255,193,7,0.20)',
    padding: spacing.md,
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  summaryIcon: { fontSize: 15, marginTop: 1 },
  summaryText: {
    flex: 1,
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    lineHeight: 20,
    fontStyle: 'italic',
  },

  // Paragraph
  paragraph: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    lineHeight: 26,
    marginBottom: spacing.md,
  },

  // Callout
  callout: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: borderRadius.md,
    borderWidth: 1,
    padding: spacing.md,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  calloutIcon: { fontSize: 20, marginTop: 1 },
  calloutBody: { flex: 1 },
  calloutLabel: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: spacing.xs,
  },
  calloutText: {
    color: colors.textPrimary,
    fontSize: fontSize.sm,
    lineHeight: 22,
  },

  // List
  listContainer: { marginBottom: spacing.md },
  listLabel: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: spacing.sm,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
    paddingLeft: spacing.xs,
  },
  listBullet: {
    color: colors.primary,
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    marginRight: spacing.sm,
    lineHeight: 24,
  },
  listText: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: fontSize.md,
    lineHeight: 24,
  },

  // Highlight
  highlightBox: {
    backgroundColor: 'rgba(255,193,7,0.12)',
    borderRadius: borderRadius.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  highlightText: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: '600',
    lineHeight: 24,
  },

  // Nav buttons
  navButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: spacing.md,
    gap: spacing.md,
  },
  prevButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.border,
    minHeight: 52,
    justifyContent: 'center',
  },
  prevButtonDisabled: { opacity: 0.3 },
  prevButtonPressed: { opacity: 0.7 },
  prevButtonText: { color: colors.textPrimary, fontSize: fontSize.md, fontWeight: '600' },
  prevButtonTextDisabled: { color: colors.textSecondary },
  nextButtonWrapper: { flex: 1 },
});
