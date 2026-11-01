import {useState} from 'react';
import {ChevronLeft, ChevronRight, Search, X, Sun, Moon, Settings, User} from 'lucide-react';
import {useTheme} from '../context/ThemeContext';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filterChips = ['All', 'Music', 'Podcasts', 'Audiobooks'];

  // Theme Variable Mappings
  const headerBg = theme === 'dark' ? 'bg-[#121212] border-white/5' : 'bg-white border-gray-100';
  const arrowBg = theme === 'dark' ? 'bg-black/70 text-white/70 hover:bg-black hover:text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200';
  const activeChipClass = theme === 'dark' ? 'bg-[#b026ff] text-black font-semibold' : 'bg-[#5d00b3] text-white font-semibold';
  const inactiveChipClass = theme === 'dark' ? 'bg-[#242424] text-white hover:bg-[#2a2a2a]' : 'bg-gray-100 text-black hover:bg-gray-200';

  return (
    <header className={`flex items-center justify-between px-6 py-3 sticky top-0 z-10 min-h-16 transition-colors duration-300 border-b gap-4 ${headerBg}`}>

      {/* Left Column */}
      <div className="flex items-center gap-4 shrink-0">
        <div className="flex items-center gap-2">
          <button onClick={() => window.history.back()} className={`flex items-center justify-center w-8 h-8 rounded-full transition ${arrowBg}`} aria-label="Go back">
            <ChevronLeft size={20} />
          </button>
          <button onClick={() => window.history.forward()} className={`flex items-center justify-center w-8 h-8 rounded-full transition ${arrowBg}`} aria-label="Go forward">
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Search Bubble */}
        <div className="relative group w-80">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-[#a7a7a7]">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="What do you want to play?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full text-sm pl-10 pr-10 py-2 rounded-full outline-none transition-all font-medium border ${
              theme === 'dark'
                ? 'bg-[#242424] hover:bg-[#2a2a2a] text-white border-transparent'
                : 'bg-gray-100 hover:bg-gray-200/80 text-black border-gray-200'
            }`}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute inset-y-0 right-3 flex items-center text-[#a7a7a7] hover:text-white" aria-label="Clear search input">
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Center Column */}
      <div className="flex flex-1 items-center gap-2 overflow-x-auto pb-0 sm:flex no-scrollbar">
        {filterChips.map((chip) => (
          <button
            key={chip}
            onClick={() => setActiveFilter(chip)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-tight transition-all duration-200 select-none shrink-0 ${
              activeFilter === chip ? activeChipClass : inactiveChipClass
            }`}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Right Column */}
      <div className="flex items-center gap-3 shrink-0">

        <button
          onClick={toggleTheme}
          className={`w-10 h-10 flex items-center justify-center rounded-full transition duration-200 ${
            theme === 'dark' ? 'hover:bg-white/5 text-yellow-400' : 'hover:bg-gray-100 text-indigo-600'
          }`}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun size={20}/> : <Moon size={20}/>}
        </button>

        <button
          className={`w-10 h-10 flex items-center justify-center rounded-full transition duration-200 ${
            theme === 'dark' ? 'hover:bg-white/5 text-[#a7a7a7] hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-black'
          }`}
          title="Settings"
        >
          <Settings size={20}/>
        </button>

        <div className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition ${
          theme === 'dark' ? 'bg-[#282828] hover:bg-[#3e3e3e]' : 'bg-gray-200 hover:bg-gray-300'
        }`}>
          <User size={16}/>
        </div>
      </div>

    </header>
  );
};

export default Navbar;