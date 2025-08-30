import React from 'react';

const AudioPlayer: React.FC<{ src: string }> = ({ src }) => {
  return <audio controls className="ml-2" src={src} />;
};

export default AudioPlayer;
