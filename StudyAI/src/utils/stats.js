/**
 * StudyAI Stats — real tracking via localStorage.
 * All values persist across sessions in the same browser.
 */

const KEYS = {
  topics:    'studyai_stat_topics',
  quizzes:   'studyai_stat_quizzes',
  decks:     'studyai_stat_decks',
  guides:    'studyai_stat_guides',
  memory:    'studyai_stat_memory',
  focus:     'studyai_stat_focus',
  streakDay: 'studyai_stat_streak_day',   // ISO date string "2026-04-05"
  streakCnt: 'studyai_stat_streak_count',
  sessions:  'studyai_stat_sessions_json', // JSON array of ISO timestamps
  xp:        'studyai_stat_xp_total',
};

function getInt(key) { return parseInt(localStorage.getItem(key) || '0', 10); }
function setInt(key, val) { localStorage.setItem(key, String(val)); }

export function incrementTopics() { setInt(KEYS.topics, getInt(KEYS.topics) + 1); addXP(10); }
export function incrementQuizzes() { setInt(KEYS.quizzes, getInt(KEYS.quizzes) + 1); addXP(30); }
export function incrementDecks() { setInt(KEYS.decks, getInt(KEYS.decks) + 1); addXP(20); }
export function incrementGuides() { setInt(KEYS.guides, getInt(KEYS.guides) + 1); addXP(40); }
export function incrementMemoryTest() { setInt(KEYS.memory, getInt(KEYS.memory) + 1); addXP(40); }
export function incrementFocus() { setInt(KEYS.focus, getInt(KEYS.focus) + 1); addXP(50); }

export function addXP(amount) {
  const current = getInt(KEYS.xp);
  setInt(KEYS.xp, current + amount);
  window.dispatchEvent(new Event('studyai_stats_updated'));
}

/** Call when the user starts any session (page load). */
export function recordSession() {
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);

  // Streak logic
  const lastDay = localStorage.getItem(KEYS.streakDay) || '';
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().slice(0, 10);

  if (lastDay === todayStr) {
    // Already counted today — leave streak alone
  } else if (lastDay === yesterdayStr) {
    // Consecutive day
    setInt(KEYS.streakCnt, getInt(KEYS.streakCnt) + 1);
    localStorage.setItem(KEYS.streakDay, todayStr);
  } else {
    // Gap — reset streak
    setInt(KEYS.streakCnt, 1);
    localStorage.setItem(KEYS.streakDay, todayStr);
  }

  // Session timestamps (for hours calc)
  const sessions = JSON.parse(localStorage.getItem(KEYS.sessions) || '[]');
  sessions.push(now.toISOString());
  // Keep only last 180 sessions to avoid unbounded growth
  if (sessions.length > 180) sessions.splice(0, sessions.length - 180);
  localStorage.setItem(KEYS.sessions, JSON.stringify(sessions));
}

/** Returns all stats as an object ready for the Dashboard. */
export function getStats() {
  const sessions = JSON.parse(localStorage.getItem(KEYS.sessions) || '[]');
  // Estimate hours: count sessions × avg 20 min each, cap to 1 decimal
  const rawHours = (sessions.length * 20) / 60;
  const hours = rawHours < 1 ? rawHours.toFixed(1) : Math.round(rawHours * 10) / 10;

  return {
    topics:  getInt(KEYS.topics),
    quizzes: getInt(KEYS.quizzes),
    decks:   getInt(KEYS.decks),
    guides:  getInt(KEYS.guides),
    memory:  getInt(KEYS.memory),
    focus:   getInt(KEYS.focus),
    hours:   sessions.length === 0 ? '0' : String(hours),
    streak:  getInt(KEYS.streakCnt),
    xp:      getInt(KEYS.xp),
  };
}
