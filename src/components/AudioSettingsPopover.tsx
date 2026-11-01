import { useState, useRef, useEffect } from 'react';
import { Sliders } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface AudioSettingsPopoverProps {
  iconMutedText: string;
  hoverText: string;
}

const AudioSettingsPopover = ({ iconMutedText, hoverText }: AudioSettingsPopoverProps) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Audio configuration states
  const [equalizer, setEqualizer] = useState('Balanced');
  const [quality, setQuality] = useState('Very High');
  const [normalize, setNormalize] = useState(true);

  // Close popover instantly if user clicks anywhere outside of it
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Theme color maps
  const popoverBg = theme === 'dark' ? 'bg-[#1c1c1c] border-[#282828] text-white' : 'bg-white border-gray-200 text-black shadow-2xl';
  const labelText = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';
  const optionSelectBg = theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-100 border-gray-200 text-black';
  const activeColorText = theme === 'dark' ? 'text-[#b026ff]' : 'text-[#5d00b3]';

  return (
    <div className="relative inline-block" ref={popoverRef}>

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`transition ${iconMutedText} ${hoverText} ${isOpen ? activeColorText : ''}`}
        title="Audio Settings"
      >
        <Sliders size={16} />
      </button>

      {/* Float Menu */}
      {isOpen && (
        <div
          className={`absolute bottom-8 right-0 w-64 rounded-lg border p-4 z-50 flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 duration-200 ${popoverBg}`}
        >
          <div className="border-b border-white/5 pb-1 mb-1 shrink-0">
            <h3 className="text-xs uppercase font-bold tracking-wider opacity-60">Audio Settings</h3>
          </div>

          {/* Equalizer */}
          <div className="flex flex-col gap-1.5">
            <label className={`text-xs font-semibold ${labelText}`}>Equalizer Preset</label>
            <select
              value={equalizer}
              onChange={(e) => setEqualizer(e.target.value)}
              className={`w-full text-xs px-2.5 py-1.5 rounded outline-none border font-medium cursor-pointer ${optionSelectBg}`}
            >
              <option value="Balanced">Balanced (Default)</option>
              <option value="Bass Booster">Bass Booster</option>
              <option value="Treble Booster">Treble Booster</option>
              <option value="Vocal Accent">Vocal Accent</option>
            </select>
          </div>

          {/* Audio Stream Quality */}
          <div className="flex flex-col gap-1.5">
            <label className={`text-xs font-semibold ${labelText}`}>Streaming Quality</label>
            <select
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              className={`w-full text-xs px-2.5 py-1.5 rounded outline-none border font-medium cursor-pointer ${optionSelectBg}`}
            >
              <option value="Low">Low (24kbps)</option>
              <option value="Normal">Normal (96kbps)</option>
              <option value="High">High (160kbps)</option>
              <option value="Very High">Very High (320kbps)</option>
            </select>
          </div>

          {/* Audio Normalization */}
          <div className="flex items-center justify-between pt-1 border-t border-white/5">
            <div className="flex flex-col">
              <label className="text-xs font-semibold cursor-pointer select-none" htmlFor="normalize-chk">
                Volume Normalization
              </label>
              <span className={`text-[10px] leading-tight max-w-40 ${labelText}`}>
                Keep audio volumes balanced across all songs.
              </span>
            </div>

            <button
              id="normalize-chk"
              onClick={() => setNormalize(!normalize)}
              className={`w-8 h-4 rounded-full transition-colors relative duration-200 shrink-0 ${
                normalize
                  ? (theme === 'dark' ? 'bg-[#b026ff]' : 'bg-[#5d00b3]')
                  : 'bg-gray-400/40'
              }`}
            >
              <div
                className={`w-3 h-3 rounded-full bg-white absolute top-0.5 transition-all duration-200 ${
                  normalize ? 'left-4.5' : 'left-0.5'
                }`}
              />
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default AudioSettingsPopover;