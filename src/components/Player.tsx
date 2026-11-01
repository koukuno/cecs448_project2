import { useState } from 'react';
import {
  Play, Pause, SkipBack, SkipForward, Shuffle, Repeat,
  Volume2, VolumeX, ListMusic, Laptop2, Maximize2, Heart
} from 'lucide-react';
import PlaylistCover from "./PlaylistCover.tsx";
import { useTheme } from '../context/ThemeContext';
import AudioSettingsPopover from "./AudioSettingsPopover.tsx";
import {useAudio} from "../context/AudioContext.tsx";

const Player = () => {
  const { theme } = useTheme();
  const { currentTrack, isPlaying, setIsPlaying } = useAudio();
  const [progress, setProgress] = useState(30);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Theme Variable Mappings
  const footerBg = theme === 'dark' ? 'bg-black border-[#282828] text-white' : 'bg-white border-gray-200 text-black shadow-[0_-4px_12px_rgba(0,0,0,0.05)]';
  const primaryText = theme === 'dark' ? 'text-white hover:text-white' : 'text-gray-900 hover:text-black';
  const subText = theme === 'dark' ? 'text-[#a7a7a7]' : 'text-gray-500';
  const hoverText = theme === 'dark' ? 'hover:text-white' : 'hover:text-black';
  const iconMutedText = theme === 'dark' ? 'text-[#a7a7a7]' : 'text-gray-400';
  const accentColor = theme === 'dark' ? 'group-hover:bg-[#b026ff]' : 'group-hover:bg-[#5d00b3]';
  const heartActiveColor = theme === 'dark' ? 'text-[#b026ff]' : 'text-[#5d00b3]';
  const heartFillColor = theme === 'dark' ? '#b026ff' : '#5d00b3';

  // Slider track backgrounds
  const sliderTrackBg = theme === 'dark' ? 'bg-[#4d4d4d]' : 'bg-gray-200';
  const sliderFillBg = theme === 'dark' ? 'bg-white' : 'bg-black';

  return (
    <footer className={`h-full w-full px-4 flex items-center justify-between border-t select-none transition-colors duration-300 ${footerBg}`}>

      {/* Track Info Panel */}
      <div className="flex items-center gap-4 w-[30%] min-w-45">
        <PlaylistCover title={currentTrack.title} variant={currentTrack.variant} size="w-14 h-14" />

        <div className="flex flex-col min-w-0">
          <span className={`text-sm font-medium hover:underline cursor-pointer truncate ${primaryText}`}>
            {currentTrack.title}
          </span>
          <span className={`text-xs hover:underline cursor-pointer truncate ${subText} ${hoverText}`}>
            {currentTrack.artist}
          </span>
        </div>
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`shrink-0 transition ${isLiked ? heartActiveColor : `${iconMutedText} ${hoverText}`}`}
        >
          <Heart size={16} fill={isLiked ? heartFillColor : "none"} />
        </button>
      </div>

      {/* Main Playback Controls & Timeline */}
      <div className="flex flex-col items-center gap-2 max-w-[45%] w-full flex-1">
        {/* Control Buttons */}
        <div className={`flex items-center gap-6 ${iconMutedText}`}>
          <button className={`transition ${hoverText}`}><Shuffle size={16} /></button>
          <button className={`transition ${hoverText}`}><SkipBack size={20} fill="currentColor" /></button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`w-8 h-8 rounded-full flex items-center justify-center hover:scale-105 transition active:scale-95 shrink-0 ${
              theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'
            }`}
          >
            {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="translate-x-px" />}
          </button>

          <button className={`transition ${hoverText}`}><SkipForward size={20} fill="currentColor" /></button>
          <button className={`transition ${hoverText}`}><Repeat size={16} /></button>
        </div>

        {/* Timeline Slider */}
        <div className={`flex items-center gap-2 w-full text-xs ${subText}`}>
          <span>0:45</span>
          <div className={`group relative flex-1 h-1 flex items-center rounded-full cursor-pointer transition-colors ${sliderTrackBg}`}>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="absolute w-full h-full opacity-0 cursor-pointer z-10"
              aria-label="Track progress"
            />
            <div
              className={`h-full rounded-full transition-colors ${sliderFillBg} ${accentColor}`}
              style={{ width: `${progress}%` }}
            />
            <div
              className={`absolute w-3 h-3 rounded-full hidden group-hover:block pointer-events-none -translate-x-1/2 ${sliderFillBg}`}
              style={{ left: `${progress}%` }}
            />
          </div>
          <span>3:24</span>
        </div>
      </div>

      {/* 3. RIGHT: Utility Mixers & Volume Control */}
      <div className={`flex items-center gap-3 w-[30%] min-w-45 justify-end ${iconMutedText}`}>
        <button className={`transition ${hoverText}`}><ListMusic size={16} /></button>
        <button className={`transition ${hoverText}`}><Laptop2 size={16} /></button>

        <AudioSettingsPopover iconMutedText={iconMutedText} hoverText={hoverText} />
        {/* Volume Sub-system */}
        <div className="flex items-center gap-2 w-24">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`transition ${hoverText}`}
          >
            {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          <div className={`group relative flex-1 h-1 flex items-center rounded-full cursor-pointer transition-colors ${sliderTrackBg}`}>
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
              className={`h-full rounded-full transition-colors ${sliderFillBg} ${accentColor}`}
              style={{ width: `${isMuted ? 0 : volume}%` }}
            />
            <div
              className={`absolute w-3 h-3 rounded-full hidden group-hover:block pointer-events-none -translate-x-1/2 ${sliderFillBg}`}
              style={{ left: `${isMuted ? 0 : volume}%` }}
            />
          </div>
        </div>

        <button className={`transition ${hoverText}`}><Maximize2 size={16} /></button>
      </div>

    </footer>
  );
};

export default Player;