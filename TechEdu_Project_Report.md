# TechEdu
## Mobile Learning Application

**Course:** Mobile Application Development  
**Group:** Group 1  
**Members:** Muhammet Kadem Kalender · Efe Erman · Sarper Özkaya  
**Platform:** iOS (Portrait & Landscape)  
**Date:** June 06, 2026

---

## 1. Executive Summary

TechEdu is an iOS mobile application developed for middle school students as part of a mobile application development course project. The application aims to make two key computer science topics — Operating System Structures and 5G Technology — accessible and engaging through a structured learning experience.

The app combines interactive lesson content with a gamified quiz system. Students progress through bite-sized lesson sections, then complete a timed multiple-choice quiz to test their understanding. Motivation is sustained through a points system, daily study streaks, and six unlockable badges. The application runs on both portrait and landscape orientations and follows Apple Human Interface Guidelines.

Built with React Native (Expo SDK 54) and React Native Reanimated 4, TechEdu delivers smooth animations and a consistent dark-themed UI across all screens.

---

## 2. Project Overview

### 2.1 Objectives

- Deliver computer science fundamentals to middle school students in an approachable format.
- Replace passive reading with structured, section-by-section progression.
- Reinforce learning through immediate quiz feedback and detailed answer explanations.
- Encourage daily study habits via streaks, points, and badge milestones.
- Provide a polished, iOS-native visual experience in both portrait and landscape.

### 2.2 Target Audience

The primary users are middle school students (ages 11–14) who are beginning to engage with digital technology concepts. The UI uses simple language, large touch targets, and immediate visual feedback to accommodate users with limited prior experience in formal computer science education.

### 2.3 Topic Selection Rationale

| Topic | Rationale |
|-------|-----------|
| Operating System Structures | A cornerstone of computer science literacy — understanding how hardware and software interact through kernels, modes, and system calls gives students a mental model for all computing. |
| 5G Technology | A timely, curiosity-driven topic that connects classroom learning to visible real-world infrastructure: smart cities, autonomous vehicles, IoT, and remote surgery. |

---

## 3. Course Content

### 3.1 Lesson 1 — Operating System Structures

This lesson introduces the foundational concepts behind every modern operating system. It is divided into five progressive sections, each building on the previous one.

| # | Section Title | Key Concepts |
|---|--------------|--------------|
| 1 | What is an Operating System? | Definition · core responsibilities (process, memory, file, I/O management) · examples: Windows, Linux, macOS, Android, iOS |
| 2 | The Kernel | Kernel role · scheduling · memory management · hardware drivers · kernel space vs user space |
| 3 | User Mode vs Kernel Mode | Two operating modes · hardware enforcement · why separation is critical for system stability and security |
| 4 | System Calls | Definition · five categories (process control, file management, device management, information, communication) · library abstraction (libc) |
| 5 | OS Architectures | Monolithic kernel (Linux) · Microkernel · Hybrid kernel (Windows, macOS) · performance vs reliability trade-offs |

> **Quiz:** 10 questions · Passing threshold: 80 % (8 / 10) · 30-second timer per question

### 3.2 Lesson 2 — 5G Technology

This lesson explores the fifth generation of mobile communication technology — from its core capabilities to the industries it is reshaping.

| # | Section Title | Key Concepts |
|---|--------------|--------------|
| 1 | What is 5G? | Generation timeline (1G → 5G) · "G" meaning · why 5G is an infrastructure shift, not just a speed upgrade |
| 2 | Key Features | eMBB (Enhanced Mobile Broadband) · URLLC (Ultra-Reliable Low-Latency Communications) · mMTC (Massive Machine-Type Communications) |
| 3 | Latency | Definition · 4G latency (30–50 ms) vs 5G latency (≤ 1 ms) · critical implications for autonomous vehicles and remote surgery |
| 4 | Frequency Bands | Low-band (< 1 GHz, wide coverage) · Mid-band (1–6 GHz, balance) · mmWave (> 24 GHz, multi-Gbps, short range) |
| 5 | Use Cases | Smart cities · autonomous vehicles · e-health & telemedicine · Industry 4.0 robot coordination · IoT (up to 1 M devices / km²) |

> **Quiz:** 10 questions · Passing threshold: 80 % (8 / 10) · 30-second timer per question

---

## 4. Application Features

### 4.1 Authentication System

The authentication module handles user registration and login without requiring a backend server. All data is stored locally on the device using AsyncStorage.

- New users register with a unique username and password.
- Passwords are hashed with SHA-256 before storage — plain text is never saved.
- Session tokens persist across app restarts; users stay logged in until they explicitly sign out.
- Logging out clears the session and returns the user to the Welcome screen.

### 4.2 Lesson Experience

The lesson flow is designed to maintain focus and prevent cognitive overload by presenting one section at a time.

- Each lesson is split into sections; students tap "Next" to advance.
- Three content block types: paragraph, callout box (key concept / tip / warning), and bullet list.
- A learning objective summary is shown at the top of each section.
- Navigation back to previous sections is supported for review.
- The quiz start button activates only after all sections are read.

### 4.3 Quiz System

The quiz is the primary assessment mechanism. Its design balances challenge with immediate, educational feedback.

- 30-second countdown per question with a visual timer bar.
- Timer bar changes colour: green (> 20 s) → yellow (10–20 s) → red (< 10 s).
- Time expiry is treated as a wrong answer; the correct option is revealed.
- On selection: correct option turns green, wrong selection turns red.
- A detailed explanation text appears after each answered question.
- A progress bar at the top shows current position (e.g. Question 4 / 10).
- Option labels A / B / C / D are displayed in circular badges for clarity.

### 4.4 Result Screen

After the final question the student is taken to an animated result screen that summarises their performance and rewards.

- Animated score circle displaying X / 10 and percentage.
- Points earned and current streak shown side by side.
- Badge unlock notification with icon and description if a new badge is earned.
- Pass path: single "Go to Home" button.
- Fail path: "Retry Lesson" (returns to lesson start) and "Go to Home" buttons.

### 4.5 Points & Gamification

| Trigger | Points |
|---------|--------|
| Each correct answer | +10 |
| Passing the quiz (≥ 8 / 10) | +50 |
| Perfect score (10 / 10) | +100 |
| First study session of the day | +20 |

### 4.6 Badge System

| Badge | Icon | Unlock Condition |
|-------|------|-----------------|
| First Step | 🎯 | Complete any quiz for the first time |
| Passing Grade | ✅ | Pass a quiz with at least 8 / 10 |
| Perfect | ⭐ | Achieve a perfect score of 10 / 10 |
| 3-Day Streak | 🔥 | Study on 3 consecutive days |
| Weekly Hero | 🏅 | Study on 7 consecutive days |
| Lesson Master | 🏆 | Complete 5 different lessons |

### 4.7 Profile Screen

The profile screen gives students an at-a-glance view of their learning progress.

- Username and total accumulated points.
- Current streak (consecutive days studied).
- Gallery of earned badges with icon and title.

### 4.8 Landscape Mode Support

Every screen in the application is fully usable when the device is rotated to landscape.

- All screens are wrapped in ScrollView — content that does not fit is scrollable rather than clipped.
- Content areas use maxWidth constraints (700 pt for lessons, 500–600 pt for other screens) and `alignSelf: "center"` to remain centered on wider canvases.
- SafeAreaView automatically protects left / right edges on notched iPhones in landscape.
- Quiz progress bar and timer bar stretch to full screen width in any orientation.

---

## 5. Screen Flow & Navigation

The app uses React Navigation Native Stack, which mirrors iOS's standard push / pop navigation model and enables the native swipe-back gesture on every screen.

| Screen | Route Name | Description |
|--------|-----------|-------------|
| Welcome | Welcome | Entry point — Log In or Sign Up buttons |
| Login | Login | Username + password form; navigates to Home on success |
| Register | Register | New account creation; navigates to Home on success |
| Home | Home | Lesson card list + streak badge + profile / logout buttons |
| Lesson | Lesson | Section-by-section lesson reader with progress indicator |
| Quiz | Quiz | Timed multiple-choice quiz with progress and timer bars |
| Result | Result | Animated score, points, streak, and badge notifications |
| Profile | Profile | User stats and full badge collection |

**Navigation rules:**

- The back button is hidden on the Home and Result screens to prevent accidental navigation.
- After login or registration the Welcome screen is removed from the stack (replace), so back-pressing does not return to it.
- Retrying a lesson from the Result screen uses replace to keep the stack shallow.

---

## 6. Target Platform & Design Decisions

### 6.1 Platform Choice — iOS

The team chose iOS as the primary target platform. The application was developed and tested on iPhone using Expo Go. All design decisions were made with the Apple Human Interface Guidelines (HIG) in mind. The app also runs on Android via Expo, but Material Design conventions were not applied.

### 6.2 HIG Compliance

| HIG Principle | Implementation in TechEdu |
|--------------|--------------------------|
| Touch target size (min 44 × 44 pt) | All buttons and quiz option cards enforce `minHeight: 64`, well above the minimum. |
| Typography hierarchy | Four distinct font-size levels (title 28 pt, heading 20 pt, body 16 pt, caption 13 pt) ensure visual hierarchy on every screen. |
| Stack navigation | React Navigation Native Stack provides the iOS-native left-edge swipe-back gesture. |
| Safe Area compliance | SafeAreaView from react-native-safe-area-context handles notch, Dynamic Island, and landscape side insets. |
| Spring animations | Correct answer: withSpring bounce. Wrong answer: shake via withTiming + withSpring. Screen entries: FadeIn / FadeInDown / FadeInRight with staggered delays. |
| Landscape support | Centered max-width layouts and ScrollView wrappers ensure usability in both orientations. |

### 6.3 Visual Design

The application uses a dark navy and gold colour palette throughout:

| Token | Hex | Usage |
|-------|-----|-------|
| background | `#0A1929` | Screen backgrounds |
| surface | `#13294B` | Cards, modals, table cells |
| surfaceLight | `#1E3A5F` | Hover / pressed states |
| primary | `#FFC107` | Accent colour, links, active indicators |
| success | `#4CAF50` | Correct answer highlight |
| error | `#F44336` | Wrong answer highlight, timer warning |
| textPrimary | `#FFFFFF` | Headings and body text |
| textSecondary | `#B0BEC5` | Subtitles and helper text |

---

## 7. Technical Architecture

### 7.1 Technology Stack

| Technology | Version | Role |
|-----------|---------|------|
| React Native | 0.81 | Core cross-platform UI framework |
| Expo SDK | 54 | Build toolchain, OTA updates, native module access |
| React Navigation (Native Stack) | — | Screen routing with iOS-native transitions |
| React Native Reanimated | 4 | Worklet-based animations running on the UI thread |
| React Native Safe Area Context | — | Notch / Dynamic Island / landscape inset management |
| AsyncStorage | — | Persistent key-value store for users and progress |
| Expo Status Bar | — | Light status bar icons on the dark background |

### 7.2 Project Structure

The codebase is organised by feature responsibility:

- `components/` — Four reusable UI components (Button, Input, LessonCard, QuizOption)
- `context/` — AuthContext provides login state to the entire component tree via React Context
- `data/` — lessons.js is the single source of truth for all lesson text and quiz questions
- `navigation/` — AppNavigator configures the Native Stack with shared header styles
- `screens/` — Eight screens, each a self-contained functional component
- `theme/` — colors.js and spacing.js centralise all design tokens
- `utils/` — constants.js (game rules), hash.js (SHA-256), storage.js (AsyncStorage helpers)

### 7.3 State Management

The app relies on React's built-in state primitives rather than an external state library:

- **React Context (AuthContext)** — global session state accessible to all screens.
- **useState / useEffect** — local quiz state (current question, selected answer, timer).
- **useFocusEffect** — refreshes home screen progress data each time the screen gains focus.
- **useSharedValue / useAnimatedStyle** — Reanimated shared values for UI-thread animations.

### 7.4 Security Considerations

- User passwords are never stored as plain text — SHA-256 hash is computed before write.
- All data remains local; no network requests are made, eliminating server-side attack surface.
- AsyncStorage keys are namespaced per username to prevent cross-user data leakage.

---

## 8. Setup & Running the Application

### 8.1 Requirements

- Node.js 18 or higher installed on the development machine.
- iPhone with the Expo Go app installed (free on the App Store).
- Development machine and iPhone on the same Wi-Fi network.

### 8.2 Installation Steps

**Step 1 — Install dependencies**

```bash
npm install
```

**Step 2 — Start the development server**

```bash
npx expo start
```

A QR code appears in the terminal. Open the Camera app on iPhone, scan the code, and tap "Open in Expo Go". First load takes 2–3 minutes.

**Optional — Run in a web browser**

```bash
npx expo start --web
```

### 8.3 Troubleshooting

| Error | Solution |
|-------|---------|
| "Project is incompatible with this version of Expo Go" | Update Expo Go from the App Store — SDK 54 is required. |
| Metro bundler / Babel crash | Delete `node_modules/.cache` and `.expo`, then run: `npx expo start --clear` |
| QR code not connecting | Confirm both devices are on the same Wi-Fi network. Disable VPN if active. |

---

## 9. Limitations & Future Work

### 9.1 Current Limitations

- Only two lessons are available in the current version.
- User data is stored locally; there is no cloud sync or multi-device support.
- No instructor dashboard — teachers cannot view student progress.
- Quiz questions are fixed; there is no randomisation or question bank rotation.

### 9.2 Proposed Enhancements

- Expand the lesson library to cover additional computer science topics (networking, databases, algorithms).
- Add a backend with user accounts, cloud sync, and an instructor analytics dashboard.
- Implement question randomisation and difficulty-adaptive quiz logic.
- Support Turkish language alongside English with a language toggle.
- Add push notifications to remind students to maintain their daily streak.

---

## 10. Conclusion

TechEdu demonstrates how a focused, well-structured mobile application can make abstract computer science concepts accessible to younger learners. By combining progressive lesson sections with timed quizzes, immediate feedback, and a gamified reward system, the app creates an environment where students are motivated to return daily and build lasting knowledge.

The technical stack — React Native, Expo SDK 54, and Reanimated 4 — enabled rapid development while delivering a native-quality user experience aligned with Apple's design principles. Landscape mode support and SHA-256 password hashing reflect the team's attention to both usability and security best practices.

This project establishes a solid foundation that can be extended with additional lessons, a cloud backend, and adaptive assessment features in future iterations.
