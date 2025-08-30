import React from 'react';

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center py-6">
    <div className="w-8 h-8 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
  </div>
);

export default LoadingSpinner;
