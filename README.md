# TechEdu — Mobile Learning App
### Portrait & Landscape Support · iOS

> An iOS application that teaches computer science topics to middle school students through interactive lessons, countdown quizzes, and a badge reward system.
> The app works seamlessly in both **portrait** and **landscape** orientations.

---

## Group Information

**GROUP 1**

| Name |
|------|
| Muhammet Kadem Kalender | 
| Efe Erman | 
| Sarper Özkaya | 

---

## About the Project

TechEdu is a mobile learning application designed to help middle school students explore **Operating System Structures** and **5G Technology** in an engaging and structured way.

The app:
- Breaks each topic into small, digestible sections
- Provides a short summary at the end of each section
- Runs a timed quiz after each lesson is completed
- Motivates students with points, streaks, and badges
- Works correctly when the phone is held horizontally

### Why These Two Topics?

| Topic | Reason |
|-------|--------|
| Operating System Structures | A fundamental part of any computer science curriculum |
| 5G Technology | Current, curiosity-driven, and directly relevant to everyday life |

---

## Course Content

### Lesson 1 — Operating System Structures

| # | Section | Topics Covered |
|---|---------|----------------|
| 1 | What is an Operating System? | Definition, core responsibilities (process / memory / file / I-O management), common examples (Windows, Linux, Android) |
| 2 | The Kernel | Role of the kernel, scheduling, memory management, hardware drivers, kernel space concept |
| 3 | User Mode vs Kernel Mode | Differences between the two modes and why the separation matters for security |
| 4 | System Calls | System call categories (process, file, device, communication), library abstraction |
| 5 | OS Architectures | Monolithic (Linux), Microkernel, Hybrid (Windows, macOS) — advantages and trade-offs |

**Quiz:** 10 questions — Passing threshold **60% (6 / 10 correct)** — 30-second timer per question

---

### Lesson 2 — 5G Technology

| # | Section | Topics Covered |
|---|---------|----------------|
| 1 | What is 5G? | Definition, generation comparison (1G → 5G), why it is more than just speed |
| 2 | Key Features | eMBB (high bandwidth), URLLC (ultra-low latency), mMTC (massive device connectivity) |
| 3 | Latency | What latency means, 4G (30–50 ms) vs 5G (1 ms) comparison, autonomous vehicle and remote surgery examples |
| 4 | Frequency Bands | Low-band (wide coverage), mid-band (balance), mmWave (very high speed, short range) |
| 5 | Use Cases | Smart cities, autonomous vehicles, e-health, Industry 4.0, IoT and billions of connected devices |

**Quiz:** 10 questions — Passing threshold **60% (6 / 10 correct)** — 30-second timer per question

---

## App Features

### Authentication
- User registration and login with username and password
- Passwords are hashed with **SHA-256** before being stored locally — plain text is never saved
- Session data is persisted in `AsyncStorage`; login is retained even after closing the app
- Logging out fully clears the session

### Lesson Flow
- Each lesson is divided into sections; students progress one section at a time
- Three content block types per section: **paragraph**, **callout box** (key concept / tip / warning), and **list**
- A learning objective line at the start of each section tells the student what they will learn
- The "Start Quiz" button becomes active only after all sections are completed

### Quiz System
- **30-second countdown** per question — time expiring automatically counts as a wrong answer
- On answer selection, the correct option turns green; a wrong selection turns red
- If the selected answer is wrong, the correct answer is also highlighted
- An **explanation text** below each question reinforces the concept
- A **progress bar** at the top shows which question is currently active
- A separate **timer bar** displays remaining time visually with color shifts (green → yellow → red)

### Result Screen
- Animated **score circle** (e.g. 9/10 · 90%)
- Points earned and current streak displayed side by side
- New badge name, description, and icon shown if a badge is unlocked
- On pass: "Go to Home" button; on fail: "Retry Lesson" and "Go to Home" buttons

### Points System

| Action | Points Earned |
|--------|---------------|
| Each correct answer | +10 points |
| Passing a quiz bonus | +50 points |
| Perfect score (10/10) bonus | +100 points |
| First study session of the day | +20 points |

### Badges

| Badge | How to Earn |
|-------|-------------|
| 🎯 First Step | Complete your first quiz |
| ✅ Passing Grade | Pass a quiz (6/10) |
| ⭐ Perfect | Score 10/10 |
| 🔥 3-Day Streak | Study 3 days in a row |
| 🏅 Weekly Hero | Study 7 days in a row |
| 🏆 Lesson Master | Complete 5 different lessons |

### Profile Screen
- Username and total accumulated points
- Current streak value (consecutive study days)
- Full list of earned badges

### Landscape Mode Support

The app works without layout issues when the phone is held horizontally:

- All screens are wrapped in `ScrollView` — content that overflows in landscape is scrollable
- Every screen uses `maxWidth` centering (lesson screen: 700 pt, others: 500–600 pt) — content stays centered instead of stretching to the edges in wide layouts
- `SafeAreaView` automatically applies left/right notch protection in landscape mode (iPhone notch)
- The progress bar and timer bar in the quiz screen span full width in landscape as well

---

## Target Platform — iOS

This application is designed for **iOS** and has been tested on iPhone using Expo Go.

Design decisions follow the **Apple Human Interface Guidelines (HIG)**:

| HIG Rule | Implementation |
|----------|----------------|
| Minimum 44×44 pt touch target | All buttons and option cards (`minHeight: 64`) exceed this threshold |
| Typography hierarchy | Distinct `fontSize` levels for title / primary text / secondary text / caption |
| Stack navigation (push/pop) | React Navigation Native Stack — supports iOS's native swipe-back gesture |
| Safe Area compliance | `SafeAreaView` handles notch, Dynamic Island, and landscape notch protection |
| Spring animation | Correct answer triggers iOS-style `withSpring` (bounce); wrong answer triggers a shake animation |
| Landscape support | All screens remain centered and scrollable in horizontal orientation |

> The app also runs on Android, but Material Design guidelines were not prioritized in this project.

---

## Technologies Used

| Technology | Version | Purpose |
|------------|---------|---------|
| React Native | 0.81 | Core application framework |
| Expo SDK | 54 | Development environment and tooling |
| React Navigation (Native Stack) | — | Screen-to-screen navigation |
| React Native Reanimated | 4 | Entry animations and interaction feedback |
| React Native Safe Area Context | — | Notch, Dynamic Island, and landscape edge protection |
| AsyncStorage | — | Local storage for user data and lesson progress |
| Expo Status Bar | — | Status bar color management |

---

## Setup & Running

### Requirements

- Node.js 18 or higher
- iPhone with the Expo Go app installed (free on the App Store)
- Computer and phone must be on the same Wi-Fi network

### Steps

```bash
# 1. Install dependencies
npm install

# 2. Start the app
npx expo start
```

A QR code will appear in the terminal. Open the Camera app on your iPhone, point it at the QR code, and tap "Open in Expo Go". The first load may take 2–3 minutes.

```bash
# Optional: run in a web browser
npx expo start --web
```

### Troubleshooting

```bash
# Clear cache and restart
npx expo start --clear
```

| Error | Solution |
|-------|----------|
| "Project is incompatible with this version of Expo Go" | Update Expo Go from the App Store (SDK 54 required) |
| Metro bundler / Babel error | Run `rm -rf node_modules/.cache .expo` then `npx expo start --clear` |

---

## Screen Flow

```
Welcome Screen
    ├── Log In   →  Login Screen    →  Home Screen
    └── Sign Up  →  Register Screen →  Home Screen

Home Screen
    ├── Lesson Card    →  Lesson Screen  →  Quiz Screen  →  Result Screen
    └── Profile Button →  Profile Screen
```

---

## Project Structure

```
edu_App-main/
├── App.js                    # Application entry point
├── index.js
├── babel.config.js
└── src/
    ├── components/           # Reusable UI components
    │   ├── Button.js         # Primary / secondary button
    │   ├── Input.js          # Text input field
    │   ├── LessonCard.js     # Lesson card displayed on the home screen
    │   └── QuizOption.js     # Animated quiz option component (A/B/C/D)
    ├── context/
    │   └── AuthContext.js    # Login state and session management
    ├── data/
    │   └── lessons.js        # All lesson content and quiz questions
    ├── navigation/
    │   └── AppNavigator.js   # Screen routing configuration
    ├── screens/
    │   ├── WelcomeScreen.js  # Welcome / splash screen
    │   ├── LoginScreen.js    # Login screen
    │   ├── RegisterScreen.js # Registration screen
    │   ├── HomeScreen.js     # Home screen (lesson list + streak badge)
    │   ├── LessonScreen.js   # Lesson reading screen
    │   ├── QuizScreen.js     # Countdown quiz screen
    │   ├── ResultScreen.js   # Score, points, streak, and new badges
    │   └── ProfileScreen.js  # User profile and earned badges
    ├── theme/
    │   ├── colors.js         # Color palette (navy #0A1929 + gold #FFC107)
    │   └── spacing.js        # Spacing and typography constants
    └── utils/
        ├── constants.js      # Passing score, timer, points, and badge definitions
        ├── hash.js           # SHA-256 password hashing
        └── storage.js        # AsyncStorage read/write operations
```
