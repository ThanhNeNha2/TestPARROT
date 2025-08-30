import React, { useState } from 'react';
import { useLeaderboard } from '../hooks/useLeaderboard';
import { useAudioRecorder } from '../hooks/useAudioRecorder';
import toast from 'react-hot-toast';

const FormSubmit: React.FC = () => {
  const [name, setName] = useState('');
  const [score, setScore] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addSubmission } = useLeaderboard();
  const { audioURL, isRecording, startRecording, stopRecording } =
    useAudioRecorder();

  const convertToSeconds = (
    hours: number,
    minutes: number,
    seconds: number
  ): number => {
    return hours * 3600 + minutes * 60 + seconds;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      return toast.error('Vui lòng nhập tên!');
    }
    if (score < 0 || score > 10) {
      return toast.error('Vui lòng nhập đúng số điểm!');
    }
    const totalSeconds = convertToSeconds(hours, minutes, seconds);
    if (totalSeconds <= 0) {
      return toast.error('Thời gian phải lớn hơn 0!');
    }

    setIsSubmitting(true);
    toast('Chúc mừng bạn đã hoàn thành bài thi!', {
      icon: '👏',
    });

    // Mô phỏng độ trễ API
    setTimeout(() => {
      addSubmission({
        id: Date.now().toString(),
        name,
        score,
        time: totalSeconds,
        audioUrl: audioURL || undefined,
      });
      setName('');
      setScore(0);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <>
      <div className="gradient-bg min-h-screen flex items-center justify-center p-4">
        <div className="bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 w-full max-w-md relative overflow-hidden">
          {/* Đường viền động ở trên */}
          <div className="absolute top-0 left-0 right-0 h-1 gradient-bg"></div>

          {/* Tiêu đề */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              🏆 Nộp Kết Quả
            </h2>
            <div className="bounce-icon inline-block text-2xl">✨</div>
            <p className="text-gray-600 mt-2">Chia sẻ thành tích của bạn</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Trường nhập tên */}
            <div className="relative">
              <input
                type="text"
                placeholder="Nhập tên của bạn"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 focus:outline-none transition-all duration-300 hover:border-gray-300 bg-white/80"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <span className="text-gray-400 text-xl">👤</span>
              </div>
            </div>

            {/* Trường nhập điểm số */}
            <div className="relative">
              <input
                type="number"
                placeholder="Nhập điểm số"
                value={score}
                onChange={(e) => setScore(Number(e.target.value))}
                className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 focus:outline-none transition-all duration-300 hover:border-gray-300 bg-white/80"
                min="0"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <span className="text-gray-400 text-xl">🎯</span>
              </div>
            </div>

            {/* Trường nhập thời gian */}
            <div className="relative">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <input
                    type="number"
                    placeholder="Giờ"
                    value={hours}
                    onChange={(e) =>
                      setHours(Math.max(0, Number(e.target.value)))
                    }
                    className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 focus:outline-none transition-all duration-300 hover:border-gray-300 bg-white/80"
                    min="0"
                  />
                  <p className="text-sm text-gray-500 mt-1 text-center">Giờ</p>
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Phút"
                    value={minutes}
                    onChange={(e) =>
                      setMinutes(
                        Math.max(0, Math.min(59, Number(e.target.value)))
                      )
                    }
                    className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 focus:outline-none transition-all duration-300 hover:border-gray-300 bg-white/80"
                    min="0"
                    max="59"
                  />
                  <p className="text-sm text-gray-500 mt-1 text-center">Phút</p>
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Giây"
                    value={seconds}
                    onChange={(e) =>
                      setSeconds(
                        Math.max(0, Math.min(59, Number(e.target.value)))
                      )
                    }
                    className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 focus:outline-none transition-all duration-300 hover:border-gray-300 bg-white/80"
                    min="0"
                    max="59"
                  />
                  <p className="text-sm text-gray-500 mt-1 text-center">Giây</p>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <span className="text-gray-400 text-xl">⏱️</span>
              </div>
            </div>

            {/* Phần ghi âm */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-purple-400 transition-all duration-300">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                🎵 Ghi âm bình luận
                <span className="text-sm font-normal text-gray-500">
                  (tùy chọn)
                </span>
              </h3>

              <div className="flex flex-col gap-4">
                {!isRecording ? (
                  <button
                    type="button"
                    onClick={startRecording}
                    className="flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 focus:ring-4 focus:ring-green-500/30 transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium"
                  >
                    <span className="text-lg">🎤</span>
                    Bắt đầu ghi âm
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={stopRecording}
                    className="recording-pulse flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 focus:ring-4 focus:ring-red-500/30 transition-all duration-300 font-medium"
                  >
                    <span className="text-lg">⏹️</span>
                    Dừng ghi âm
                  </button>
                )}

                {audioURL && (
                  <div className="mt-4 p-4 bg-white/70 rounded-xl">
                    <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                      <span>🎧</span>
                      Âm thanh đã ghi:
                    </p>
                    <audio
                      controls
                      src={audioURL}
                      className="w-full h-10 rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Nút gửi */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-lg font-semibold rounded-xl hover:from-purple-600 hover:to-blue-600 focus:ring-4 focus:ring-purple-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center gap-3">
                {isSubmitting ? (
                  <>
                    <div className="loading-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    <span className="text-xl">🚀</span>
                    Nộp bài ngay
                  </>
                )}
              </div>
            </button>
          </form>

          {/* Các yếu tố trang trí */}
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 blur-xl"></div>
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-20 blur-xl"></div>
        </div>
      </div>
    </>
  );
};

export default FormSubmit;
