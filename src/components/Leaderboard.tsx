import React, { useEffect, useState, useMemo } from 'react';
import { useLeaderboard } from '../hooks/useLeaderboard';
import LeaderboardItem from './LeaderboardItem';
import LoadingSpinner from './LoadingSpinner';

type SortOption = 'score' | 'time';

const Leaderboard: React.FC = () => {
  const { leaderboard, load, loading } = useLeaderboard();
  const [sortBy, setSortBy] = useState<SortOption>('score');

  useEffect(() => {
    load();
  }, []);

  // Sắp xếp leaderboard theo lựa chọn
  const sortedLeaderboard = useMemo(() => {
    if (!leaderboard || leaderboard.length === 0) return [];

    const sorted = [...leaderboard].sort((a, b) => {
      if (sortBy === 'score') {
        // Sắp xếp theo điểm: cao đến thấp
        return b.score - a.score;
      } else {
        // Sắp xếp theo thời gian: thấp đến cao (nhanh hơn)
        return a.time - b.time;
      }
    });

    return sorted;
  }, [leaderboard, sortBy]);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <div className="mt-8 max-w-4xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-8 fade-in-up">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4 shadow-lg">
            <span className="text-3xl trophy-bounce">🏆</span>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Bảng Xếp Hạng
          </h2>
          <p className="text-gray-600 text-lg">
            Những chiến thắng xuất sắc nhất
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Sort Controls */}
        <div className="flex justify-center mb-6 fade-in-up">
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
            <div className="flex items-center gap-2">
              <span className="text-gray-700 font-medium px-3">
                Sắp xếp theo:
              </span>
              <button
                onClick={() => setSortBy('score')}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  sortBy === 'score'
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md transform scale-105'
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>🎯</span>
                  Điểm số
                </span>
              </button>
              <button
                onClick={() => setSortBy('time')}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  sortBy === 'time'
                    ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-md transform scale-105'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>⚡</span>
                  Thời gian
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Current Sort Indicator */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600">
            <span>{sortBy === 'score' ? '📊' : '⏱️'}</span>
            <span>
              {sortBy === 'score'
                ? 'Đang hiển thị theo điểm số (cao → thấp)'
                : 'Đang hiển thị theo thời gian (nhanh → chậm)'}
            </span>
          </div>
        </div>

        {/* Leaderboard List */}
        <div className="gradient-border fade-in-up">
          <div className="gradient-border-inner">
            {sortedLeaderboard.length === 0 ? (
              // Empty State
              <div className="text-center py-16 px-8">
                <div className="text-8xl mb-6 opacity-50">🏆</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Chưa có kết quả nào
                </h3>
                <p className="text-gray-600 text-lg mb-8">
                  Hãy là người đầu tiên xuất hiện trên bảng xếp hạng!
                </p>
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full font-medium">
                  <span>✨</span>
                  Bắt đầu thử thách
                </div>
              </div>
            ) : (
              // Leaderboard Items
              <div className="p-6">
                <div className="space-y-4">
                  {sortedLeaderboard.map((item, index) => (
                    <div
                      key={`${item.id}-${sortBy}`} // Key thay đổi khi sort thay đổi để trigger animation
                      className="slide-in hover:scale-[1.02] transition-all duration-300"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <LeaderboardItem item={item} rank={index + 1} />
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                  <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
                    <span>🎯</span>
                    Cập nhật lần cuối: {new Date().toLocaleString('vi-VN')}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Motivational Section */}
        <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 text-center border border-purple-100">
          <div className="flex justify-center gap-4 text-4xl mb-4">
            <span className="animate-pulse">🌟</span>
            <span className="animate-pulse" style={{ animationDelay: '0.5s' }}>
              🎊
            </span>
            <span className="animate-pulse" style={{ animationDelay: '1s' }}>
              🎉
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Chúc mừng tất cả thí sinh!
          </h3>
          <p className="text-gray-600 text-lg">
            Mỗi nỗ lực đều xứng đáng được ghi nhận và tôn vinh 🏆
          </p>
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
