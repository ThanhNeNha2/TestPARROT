import React from 'react';
import FormSubmit from '../components/FormSubmit';
import Leaderboard from '../components/Leaderboard';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100  ">
      <FormSubmit />
      <Leaderboard />
    </div>
  );
};

export default HomePage;
