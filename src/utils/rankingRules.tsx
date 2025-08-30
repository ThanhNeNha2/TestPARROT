import type { Submission } from '../context/LeaderboardContext';

export const sortRankings = (data: Submission[]): Submission[] => {
  return [...data].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.time - b.time;
  });
};
