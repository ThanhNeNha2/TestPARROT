import React, {
  createContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from 'react';

export interface Submission {
  id: string;
  name: string;
  score: number;
  time: number;
  audioUrl?: string;
}

type State = {
  submissions: Submission[];
  loading: boolean;
  error: string | null;
};

type Action =
  | { type: 'ADD_SUBMISSION'; payload: Submission }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_SUBMISSIONS'; payload: Submission[] };

const initialState: State = {
  submissions: [],
  loading: false,
  error: null,
};

const LeaderboardContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

const leaderboardReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_SUBMISSION':
      return { ...state, submissions: [...state.submissions, action.payload] };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_SUBMISSIONS':
      return { ...state, submissions: action.payload };
    default:
      return state;
  }
};

export const LeaderboardProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(leaderboardReducer, initialState);
  return (
    <LeaderboardContext.Provider value={{ state, dispatch }}>
      {children}
    </LeaderboardContext.Provider>
  );
};

export default LeaderboardContext;
