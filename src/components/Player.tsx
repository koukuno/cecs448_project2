import { useState } from 'react';
import {
  Play, Pause, SkipBack, SkipForward, Shuffle, Repeat,
  Volume2, VolumeX, ListMusic, Laptop2, Maximize2, Heart
} from 'lucide-react';
import PlaylistCover from "./PlaylistCover.tsx";

const Player = () => {
  // Playback states
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30); // Percentage 0-100
  const [volume, setVolume] = useState(50); // Volume 0-100
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <footer className="h-20 bg-black text-white px-4 flex items-center justify-between border-t border-[#282828] fixed bottom-0 left-0 right-0 z-50 select-none">

      {/* 1. LEFT: Track Info Panel */}
      <div className="flex items-center gap-4 w-[30%] min-w-45">
        {/* Larger template cover badge layout for the bottom deck active track */}
        <PlaylistCover title="Midnight City" variant={4} size="w-14 h-14" />

        <div className="flex flex-col min-w-0">
    <span className="text-sm font-medium hover:underline cursor-pointer truncate">
      Midnight City Remix
    </span>
          <span className="text-xs text-[#a7a7a7] hover:underline hover:text-white cursor-pointer truncate">
      The M83 Project
    </span>
        </div>
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`shrink-0 transition ${isLiked ? 'text-[#1ed760]' : 'text-[#a7a7a7] hover:text-white'}`}
        >
          <Heart size={16} fill={isLiked ? "#1ed760" : "none"} />
        </button>
      </div>

      {/* 2. CENTER: Main Playback Controls & Timeline */}
      <div className="flex flex-col items-center gap-2 max-w-[45%] w-full flex-1">
        {/* Control Buttons */}
        <div className="flex items-center gap-6 text-[#a7a7a7]">
          <button className="hover:text-white transition"><Shuffle size={16} /></button>
          <button className="hover:text-white transition"><SkipBack size={20} fill="currentColor" /></button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition active:scale-95 shrink-0"
          >
            {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="translate-x-px" />}
          </button>

          <button className="hover:text-white transition"><SkipForward size={20} fill="currentColor" /></button>
          <button className="hover:text-white transition"><Repeat size={16} /></button>
        </div>

        {/* Timeline Slider */}
        <div className="flex items-center gap-2 w-full text-xs text-[#a7a7a7]">
          <span>0:45</span>
          <div className="group relative flex-1 h-1 flex items-center bg-[#4d4d4d] rounded-full cursor-pointer">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="absolute w-full h-full opacity-0 cursor-pointer z-10"
              aria-label="Track progress"
            />
            {/* Visual Fill Tracker */}
            <div
              className="h-full bg-white group-hover:bg-[#1ed760] rounded-full transition-colors"
              style={{ width: `${progress}%` }}
            />
            {/* Scrubbing Playhead Thumb */}
            <div
              className="absolute w-3 h-3 bg-white rounded-full hidden group-hover:block pointer-events-none -translate-x-1/2"
              style={{ left: `${progress}%` }}
            />
          </div>
          <span>3:24</span>
        </div>
      </div>

      {/* 3. RIGHT: Utility Mixers & Volume Control */}
      <div className="flex items-center gap-3 w-[30%] min-w-45 justify-end text-[#a7a7a7]">
        <button className="hover:text-white transition"><ListMusic size={16} /></button>
        <button className="hover:text-white transition"><Laptop2 size={16} /></button>

        {/* Volume Sub-system */}
        <div className="flex items-center gap-2 w-24">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="hover:text-white transition text-[#a7a7a7]"
          >
            {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          <div className="group relative flex-1 h-1 flex items-center bg-[#4d4d4d] rounded-full cursor-pointer">
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(Number(e.target.value));
                if(isMuted) setIsMuted(false);
              }}
              className="absolute w-full h-full opacity-0 cursor-pointer z-10"
              aria-label="Volume level"
            />
            <div
              className="h-full bg-white group-hover:bg-[#1ed760] rounded-full"
              style={{ width: `${isMuted ? 0 : volume}%` }}
            />
            <div
              className="absolute w-3 h-3 bg-white rounded-full hidden group-hover:block pointer-events-none -translate-x-1/2"
              style={{ left: `${isMuted ? 0 : volume}%` }}
            />
          </div>
        </div>

        <button className="hover:text-white transition"><Maximize2 size={16} /></button>
      </div>

    </footer>
  );
};

export default Player;