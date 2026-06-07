import AsyncStorage from '@react-native-async-storage/async-storage';
import { BADGES, POINTS } from './constants';

const KEYS = {
  USERS: 'users',
  CURRENT_USER: 'currentUser',
};

const DEFAULT_STATS = {
  totalPoints: 0,
  streak: 0,
  lastActivityDate: null,
  badges: [],
  totalQuizzesTaken: 0,
  perfectScores: 0,
};

export async function getAllUsers() {
  try {
    const data = await AsyncStorage.getItem(KEYS.USERS);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Kullanıcılar okunamadı:', error);
    return {};
  }
}

export async function registerUser(username, passwordHash) {
  try {
    const users = await getAllUsers();

    const usernameLower = username.toLowerCase();
    const exists = Object.keys(users).some(
      (u) => u.toLowerCase() === usernameLower
    );
    if (exists) {
      return { success: false, error: 'Bu kullanıcı adı zaten kullanılıyor.' };
    }

    users[username] = {
      passwordHash,
      progress: {},
      stats: { ...DEFAULT_STATS },
      createdAt: new Date().toISOString(),
    };

    await AsyncStorage.setItem(KEYS.USERS, JSON.stringify(users));
    return { success: true };
  } catch (error) {
    console.error('Kayıt hatası:', error);
    return { success: false, error: 'Kayıt sırasında bir hata oluştu.' };
  }
}

export async function loginUser(username, passwordHash) {
  try {
    const users = await getAllUsers();
    const user = users[username];

    if (!user || user.passwordHash !== passwordHash) {
      return { success: false, error: 'Kullanıcı adı veya şifre hatalı.' };
    }

    await AsyncStorage.setItem(KEYS.CURRENT_USER, username);
    return { success: true, username };
  } catch (error) {
    console.error('Giriş hatası:', error);
    return { success: false, error: 'Giriş sırasında bir hata oluştu.' };
  }
}

export async function getCurrentUser() {
  try {
    return await AsyncStorage.getItem(KEYS.CURRENT_USER);
  } catch (error) {
    return null;
  }
}

export async function logoutUser() {
  try {
    await AsyncStorage.removeItem(KEYS.CURRENT_USER);
    return true;
  } catch (error) {
    return false;
  }
}

export async function updateProgress(username, lessonId, score, passed) {
  try {
    const users = await getAllUsers();
    if (!users[username]) return false;

    const currentProgress = users[username].progress[lessonId] || {};
    users[username].progress[lessonId] = {
      ...currentProgress,
      completed: passed === true,
      score,
      passed: passed === true,
      completedAt: new Date().toISOString(),
    };

    await AsyncStorage.setItem(KEYS.USERS, JSON.stringify(users));
    return true;
  } catch (error) {
    console.error('İlerleme güncellenemedi:', error);
    return false;
  }
}

export async function updateSectionProgress(username, lessonId, sectionIndex, totalSections) {
  try {
    const users = await getAllUsers();
    if (!users[username]) return false;

    const currentProgress = users[username].progress[lessonId] || {};
    users[username].progress[lessonId] = {
      ...currentProgress,
      currentSection: sectionIndex,
      totalSections,
    };

    await AsyncStorage.setItem(KEYS.USERS, JSON.stringify(users));
    return true;
  } catch (error) {
    console.error('Bölüm ilerlemesi güncellenemedi:', error);
    return false;
  }
}

export async function getUserProgress(username) {
  try {
    const users = await getAllUsers();
    return users[username]?.progress || {};
  } catch (error) {
    return {};
  }
}

export async function getUserStats(username) {
  try {
    const users = await getAllUsers();
    return users[username]?.stats || { ...DEFAULT_STATS };
  } catch {
    return { ...DEFAULT_STATS };
  }
}

export async function updateGameStats(username, { score, total, passed }) {
  try {
    const users = await getAllUsers();
    if (!users[username]) return null;

    if (!users[username].stats) {
      users[username].stats = { ...DEFAULT_STATS };
    }

    const stats = users[username].stats;
    const today = new Date().toISOString().slice(0, 10);

    let pointsEarned = score * POINTS.CORRECT_ANSWER;
    if (passed) pointsEarned += POINTS.PASS_BONUS;
    if (score === total) pointsEarned += POINTS.PERFECT_BONUS;

    // Streak hesapla
    if (stats.lastActivityDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().slice(0, 10);

      if (stats.lastActivityDate === yesterdayStr) {
        stats.streak = (stats.streak || 0) + 1;
      } else {
        stats.streak = 1;
      }
      stats.lastActivityDate = today;
      pointsEarned += POINTS.DAILY_FIRST_BONUS;
    }

    stats.totalPoints = (stats.totalPoints || 0) + pointsEarned;
    stats.totalQuizzesTaken = (stats.totalQuizzesTaken || 0) + 1;
    if (score === total) stats.perfectScores = (stats.perfectScores || 0) + 1;

    // Rozet kontrol
    const newBadges = [];
    const earnBadge = (badgeId) => {
      if (!stats.badges.includes(badgeId) && BADGES[badgeId]) {
        stats.badges.push(badgeId);
        newBadges.push(BADGES[badgeId]);
      }
    };

    if (stats.totalQuizzesTaken >= 1) earnBadge('ilk_adim');
    if (passed) earnBadge('ilk_gecis');
    if (score === total) earnBadge('mukemmel');
    if (stats.streak >= 3) earnBadge('uc_gun');
    if (stats.streak >= 7) earnBadge('yedi_gun');
    const completedCount = Object.values(users[username].progress || {}).filter(
      (p) => p.passed
    ).length;
    if (completedCount >= 5) earnBadge('bes_ders');

    await AsyncStorage.setItem(KEYS.USERS, JSON.stringify(users));
    return { pointsEarned, newBadges, streak: stats.streak };
  } catch (error) {
    console.error('Oyun istatistikleri güncellenemedi:', error);
    return null;
  }
}
