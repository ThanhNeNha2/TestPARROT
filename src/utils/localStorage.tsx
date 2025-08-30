import type { Submission } from '../context/LeaderboardContext';

const STORAGE_KEY = 'leaderboard';

export const saveSubmissions = (data: Submission[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const loadSubmissions = (): Submission[] => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
};
