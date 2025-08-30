import React from 'react';
import type { Submission } from '../context/LeaderboardContext';
import AudioPlayer from './AudioPlayer';

const LeaderboardItem: React.FC<{ item: Submission; rank: number }> = ({
  item,
  rank,
}) => (
  <div
    className={`flex items-center justify-between p-3 border-b ${rank === 1 ? 'bg-yellow-200 animate-pulse' : ''}`}
  >
    <span className="font-semibold">
      {rank}. {item.name}
    </span>
    <span>🎯 {item.score} điểm</span>
    <span>⏱ {item.time}s</span>
    {item.audioUrl && <AudioPlayer src={item.audioUrl} />}
  </div>
);

export default LeaderboardItem;
