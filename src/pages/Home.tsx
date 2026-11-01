import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAudio } from "../context/AudioContext.tsx";
import DashboardSection from '../components/dashboard/DashboardSection';

const Home = () => {
  const { theme } = useTheme();
  const { playTrack } = useAudio();

  const [visibleSections, setVisibleSections] = useState({
    madeForYou: true,
    recentlyPlayed: true,
    trending: true,
  });

  const toggleSection = (sectionKey: keyof typeof visibleSections) => {
    setVisibleSections((prev) => ({ ...prev, [sectionKey]: !prev[sectionKey] }));
  };

  const resetSections = () => {
    setVisibleSections({ madeForYou: true, recentlyPlayed: true, trending: true });
  };

  // Data layers
  const madeForYouAlbums = [
    { id: 1, title: "Daily Mix 1", desc: "M83, MGMT, Empire of the Sun, and Foster the People" },
    { id: 2, title: "Discover Weekly", desc: "Your weekly mixtape of fresh vibrant music discoveries" },
    { id: 3, title: "Release Radar", desc: "Catch all the newest music singles from artists you follow" },
    { id: 4, title: "Deep Focus", desc: "Keep your head down with ambient cinematic soundscapes" },
    { id: 5, title: "Synthwave Retro", desc: "Neon tracks to fuel your midnight coding sessions" }
  ];

  const recentlyPlayed = [
    { id: 6, title: "Chill Lo-Fi Beats", desc: "Relaxing late night lo-fi grooves for coding sessions" },
    { id: 7, title: "Liquid Drum & Bass", desc: "High energy rhythmic atmospheric synth patterns" },
    { id: 8, title: "Post-Rock Textures", desc: "Cinematic delay pedals and heavy ambient build-ups" }
  ];

  const trendingNow = [
    { id: 9, title: "Global Top 50", desc: "The most played tracking files across the world right now" },
    { id: 10, title: "Indie Pop Fresh", desc: "Vibrant alternative guitar chords and indie synthesizers" },
    { id: 11, title: "Late Night Jazz", desc: "Mellow acoustic keys and soft brass backdrops" }
  ];

  const themeStyles = {
    primaryText: theme === 'dark' ? 'text-white' : 'text-gray-900',
    subText: theme === 'dark' ? 'text-[#a7a7a7]' : 'text-gray-500',
    cardBg: theme === 'dark' ? 'bg-[#181818] hover:bg-[#282828]' : 'bg-gray-100 hover:bg-gray-200/70',
    borderStyle: theme === 'dark' ? 'border-transparent' : 'border border-gray-200/50',
    playBtnAccent: theme === 'dark' ? 'bg-[#b026ff]' : 'bg-[#5d00b3]',
    playIconColor: theme === 'dark' ? 'text-black' : 'text-white',
    playIconFill: theme === 'dark' ? 'black' : 'white',
    eyeIconColor: theme === 'dark' ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-black',
    borderHeader: theme === 'dark' ? 'border-white/5' : 'border-gray-200'
  };

  const hasHiddenSections = Object.values(visibleSections).some((status) => !status);

  return (
    <div className="space-y-10 select-none pb-12">

      {/* Greeting Header */}
      <div className={`flex items-center justify-between border-b pb-2 transition-colors duration-300 ${themeStyles.borderHeader}`}>
        <h1 className={`text-3xl font-bold tracking-tight transition-colors duration-300 ${themeStyles.primaryText}`}>
          Good afternoon User
        </h1>

        {hasHiddenSections && (
          <button
            onClick={resetSections}
            className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-300 animate-in fade-in slide-in-from-right-3 ${
              theme === 'dark'
                ? 'border-white/10 hover:border-white/30 text-[#f1f1f1] hover:bg-white/5'
                : 'border-gray-200 hover:border-gray-300 text-[#010101] hover:bg-gray-50'
            }`}
          >
            <RotateCcw size={12} />
            <span>Restore Hidden Sections</span>
          </button>
        )}
      </div>

      {/* Section 1: Made For You */}
      <DashboardSection
        title="Made For You"
        isVisible={visibleSections.madeForYou}
        onToggle={() => toggleSection('madeForYou')}
        albums={madeForYouAlbums}
        playTrack={playTrack}
        {...themeStyles}
      />

      {/* Section 2: Recently Played */}
      <DashboardSection
        title="Recently Played"
        isVisible={visibleSections.recentlyPlayed}
        onToggle={() => toggleSection('recentlyPlayed')}
        albums={recentlyPlayed}
        playTrack={playTrack}
        {...themeStyles}
      />

      {/* Section 3: Trending Near You */}
      <DashboardSection
        title="Trending Near You"
        isVisible={visibleSections.trending}
        onToggle={() => toggleSection('trending')}
        albums={trendingNow}
        playTrack={playTrack}
        {...themeStyles}
      />

    </div>
  );
};

export default Home;