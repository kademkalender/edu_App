export const PASSING_SCORE = 8;
export const TOTAL_QUIZ_QUESTIONS = 10;
export const PASSING_PERCENTAGE = 80;
export const TIMER_SECONDS = 30;

export const POINTS = {
  CORRECT_ANSWER: 10,
  PASS_BONUS: 50,
  PERFECT_BONUS: 100,
  DAILY_FIRST_BONUS: 20,
};

export const BADGES = {
  ilk_adim:  { id: 'ilk_adim',  title: 'İlk Adım',          description: 'İlk testini tamamladın!',         icon: '🎯' },
  ilk_gecis: { id: 'ilk_gecis', title: 'Geçer Not',          description: 'Bir testi geçtin!',               icon: '✅' },
  mukemmel:  { id: 'mukemmel',  title: 'Mükemmel',           description: '10/10 tam puan aldın!',           icon: '⭐' },
  uc_gun:    { id: 'uc_gun',    title: '3 Günlük Seri',      description: '3 gün üst üste çalıştın!',        icon: '🔥' },
  yedi_gun:  { id: 'yedi_gun',  title: 'Haftalık Kahraman',  description: '7 gün üst üste çalıştın!',        icon: '🏅' },
  bes_ders:  { id: 'bes_ders',  title: 'Ders Ustası',        description: '5 farklı dersi tamamladın!',      icon: '🏆' },
};

export const BADGE_LIST = Object.values(BADGES);
