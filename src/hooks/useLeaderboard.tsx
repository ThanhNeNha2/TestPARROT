import { useContext, useCallback, useMemo } from 'react';
import LeaderboardContext, {
  type Submission,
} from '../context/LeaderboardContext';

import { sortRankings } from '../utils/rankingRules';
import { loadSubmissions, saveSubmissions } from '../utils/localStorage';

export const useLeaderboard = () => {
  const { state, dispatch } = useContext(LeaderboardContext);

  const addSubmission = useCallback(
    (submission: Submission) => {
      const updated = [...state.submissions, submission];
      const sorted = sortRankings(updated);
      saveSubmissions(sorted);
      dispatch({ type: 'SET_SUBMISSIONS', payload: sorted });
    },
    [state.submissions]
  );

  const load = useCallback(() => {
    dispatch({ type: 'SET_LOADING', payload: true });
    const data = loadSubmissions();
    dispatch({ type: 'SET_SUBMISSIONS', payload: sortRankings(data) });
    dispatch({ type: 'SET_LOADING', payload: false });
  }, []);

  const leaderboard = useMemo(
    () => sortRankings(state.submissions),
    [state.submissions]
  );

  return { leaderboard, addSubmission, load, loading: state.loading };
};
