import React, { useRef, useState } from 'react';
import YouTube, { YouTubePlayer } from 'react-youtube';
import { X, Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string; // YouTube video ID
  title: string;
}

const VideoModal = ({ isOpen, onClose, videoSrc, title }: VideoModalProps) => {
  const playerRef = useRef<YouTubePlayer>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const opts = {
    width: '100%',
    height: '400',
    playerVars: {
      controls: 0, // Hide default controls
      modestbranding: 1,
      rel: 0,
    },
  };

  const onReady = (event: { target: YouTubePlayer }) => {
    playerRef.current = event.target;
    setDuration(event.target.getDuration());
  };

  const handlePlay = () => {
    playerRef.current?.playVideo();
    setIsPlaying(true);
  };

  const handlePause = () => {
    playerRef.current?.pauseVideo();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const handleFullscreen = () => {
    if (playerRef.current) {
      const iframe = playerRef.current.getIframe();
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if ((iframe as any).webkitRequestFullscreen) {
        (iframe as any).webkitRequestFullscreen();
      } else if ((iframe as any).mozRequestFullScreen) {
        (iframe as any).mozRequestFullScreen();
      } else if ((iframe as any).msRequestFullscreen) {
        (iframe as any).msRequestFullscreen();
      }
    }
  };

  const toggleMute = () => {
    if (playerRef.current) {
      const muted = !isMuted;
      playerRef.current.mute();
      if (!muted) playerRef.current.unMute();
      setIsMuted(muted);
    }
  };

  const handleStateChange = (event: { data: number; target: YouTubePlayer }) => {
    // 1 = playing, 2 = paused, 0 = ended
    if (event.data === 1) setIsPlaying(true);
    if (event.data === 2 || event.data === 0) setIsPlaying(false);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (playerRef.current && duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const newTime = (clickX / width) * duration;
      playerRef.current.seekTo(newTime, true);
      setCurrentTime(newTime);
    }
  };

  // Poll current time
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && playerRef.current) {
      interval = setInterval(() => {
        setCurrentTime(playerRef.current!.getCurrentTime());
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl mx-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-yellow-400 transition-colors z-10"
        >
          <X className="w-8 h-8" />
        </button>

        {/* YouTube Video Container */}
        <div className="relative bg-black rounded-lg overflow-hidden">
          <YouTube
            videoId={videoSrc}
            opts={opts}
            onReady={onReady}
            onStateChange={handleStateChange}
            className="w-full aspect-video"
          />

          {/* Video Controls Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
            {/* Progress Bar */}
            <div
              className="w-full bg-gray-600 rounded-full h-1 mb-4 cursor-pointer"
              onClick={handleProgressClick}
            >
              <div
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-1 rounded-full transition-all duration-100"
                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              ></div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={togglePlay}
                  className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-black" />
                  ) : (
                    <Play className="w-6 h-6 text-black fill-current" />
                  )}
                </button>

                <button
                  onClick={toggleMute}
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 text-white" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-white" />
                  )}
                </button>

                <div className="text-white text-sm font-mono">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button onClick={handleFullscreen} className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                  <Maximize2 className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Video Title */}
            <div className="mt-3">
              <h3 className="text-white text-lg font-semibold">{title}</h3>
              <p className="text-gray-400 text-sm">Video Editing Showreel</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;