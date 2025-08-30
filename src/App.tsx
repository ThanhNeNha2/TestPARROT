import React from 'react';
import { LeaderboardProvider } from './context/LeaderboardContext';
import HomePage from './pages/HomePage';
import { Toaster } from 'react-hot-toast';
const App: React.FC = () => {
  return (
    <LeaderboardProvider>
      <HomePage /> <Toaster position="top-right" reverseOrder={false} />
    </LeaderboardProvider>
  );
};

export default App;
