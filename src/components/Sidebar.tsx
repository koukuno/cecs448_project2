import { useState, useRef, useEffect } from 'react';
import { Home, Search, Library, Plus, ChevronDown, ChevronLeft, ChevronRight, User2, TrendingUp, Sparkles } from 'lucide-react';
import PlaylistCover from './PlaylistCover';
import * as React from "react";
import { useTheme } from '../context/ThemeContext';

const Sidebar = () => {
  const { theme } = useTheme();
  const [sidebarWidth, setSidebarWidth] = useState(260);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const isResizing = useRef(false);

  const MIN_WIDTH = 200;
  const MAX_WIDTH = 450;
  const COLLAPSED_WIDTH = 72;

  const startResizing = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    isResizing.current = true;
    document.body.style.cursor = 'col-resize';
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing.current) return;
      let newWidth = e.clientX;
      if (newWidth < MIN_WIDTH - 40) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
        if (newWidth < MIN_WIDTH) newWidth = MIN_WIDTH;
        if (newWidth > MAX_WIDTH) newWidth = MAX_WIDTH;
        setSidebarWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      isResizing.current = false;
      document.body.style.cursor = 'default';
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const currentWidth = isCollapsed ? COLLAPSED_WIDTH : sidebarWidth;

  // 🛠️ Theme Variable Mappings to keep the code neat and dynamic
  const textClass = theme === 'dark' ? 'text-[#a7a7a7]' : 'text-gray-500';
  const hoverTextClass = theme === 'dark' ? 'hover:text-white' : 'hover:text-black';
  const primaryTextClass = theme === 'dark' ? 'text-white' : 'text-black';
  const cardBgClass = theme === 'dark' ? 'bg-[#121212]' : 'bg-gray-100';
  const hoverBgClass = theme === 'dark' ? 'hover:bg-[#1a1a1a]' : 'hover:bg-gray-200/80';
  const borderClass = theme === 'dark' ? 'border-white/5' : 'border-gray-200';

  return (
    <div
      className={`relative flex h-full select-none transition-colors duration-300 ease-out ${
        theme === 'dark' ? 'bg-black text-[#b3b3b3]' : 'bg-white text-gray-700 border-r border-gray-200'
      }`}
      style={{ width: `${currentWidth}px` }}
    >
      {/* Main Sidebar Body */}
      <aside className="flex flex-1 flex-col justify-end p-2 overflow-hidden gap-2 items-center h-full">

        {/* Core Navigation Links */}
        <div className={`p-3 flex flex-col items-center gap-2 font-semibold text-sm shrink-0 mb-auto w-full rounded-lg transition-colors duration-300 ${cardBgClass}`}>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`flex items-center transition duration-200 ${textClass} ${hoverTextClass}
                  ${isCollapsed
              ? 'justify-center w-12 h-12 rounded-md p-0 ' + hoverBgClass
              : 'w-full justify-between px-2 pb-1 border-b mb-1 ' + borderClass
            }`}
            title={isCollapsed ? "Expand sidebar" : "Minimize sidebar"}
          >
            {!isCollapsed ? (
              <>
                <span className="text-xs uppercase tracking-wider font-bold opacity-60">Melotune</span>
                <div className={`w-10 h-10 flex items-center justify-center rounded-md transition ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-gray-200'}`}>
                  <ChevronLeft size={18} />
                </div>
              </>
            ) : (
              <ChevronRight size={24} className="shrink-0" />
            )}
          </button>
          <button className={`flex items-center transition rounded-md duration-200 ${theme === 'dark' ? 'text-white' : 'text-black'} ${isCollapsed ? 'justify-center w-12 h-12 p-0 ' + hoverBgClass : 'w-full gap-5 px-3 py-2.5 ' + hoverBgClass}`}>
            <Home size={24} className="shrink-0" />
            {!isCollapsed && <span>Home</span>}
          </button>
          <button className={`flex items-center transition rounded-md duration-200 ${textClass} ${hoverTextClass} ${isCollapsed ? 'justify-center w-12 h-12 p-0 ' + hoverBgClass : 'w-full gap-5 px-3 py-2.5 ' + hoverBgClass}`}>
            <Search size={24} className="shrink-0" />
            {!isCollapsed && <span>Search</span>}
          </button>
          <button className={`flex items-center transition rounded-md duration-200 ${textClass} ${hoverTextClass} ${isCollapsed ? 'justify-center w-12 h-12 p-0 ' + hoverBgClass : 'w-full gap-5 px-3 py-2.5 ' + hoverBgClass}`}>
            <User2 size={24} className="shrink-0" />
            {!isCollapsed && <span>Artists</span>}
          </button>
          <button className={`flex items-center transition rounded-md duration-200 ${textClass} ${hoverTextClass} ${isCollapsed ? 'justify-center w-12 h-12 p-0 ' + hoverBgClass : 'w-full gap-5 px-3 py-2.5 ' + hoverBgClass}`}>
            <TrendingUp size={24} className="shrink-0" />
            {!isCollapsed && <span>Trending</span>}
          </button>
          <button className={`flex items-center transition rounded-md duration-200 ${textClass} ${hoverTextClass} ${isCollapsed ? 'justify-center w-12 h-12 p-0 ' + hoverBgClass : 'w-full gap-5 px-3 py-2.5 ' + hoverBgClass}`}>
            <Sparkles size={24} className="shrink-0" />
            {!isCollapsed && <span>Featured</span>}
          </button>
        </div>

        {/* Library Drawer */}
        <div
          className="grid transition-all duration-300 ease-out w-full min-h-0"
          style={{
            gridTemplateRows: isLibraryOpen ? '1fr' : '0fr',
            opacity: isLibraryOpen ? 1 : 0,
          }}
        >
          <div
            className={`min-h-0 rounded-lg flex flex-col overflow-hidden w-full items-center transition-all duration-300 ${
              theme === 'dark' ? 'bg-[#1c1c1c] border border-[#282828]' : 'bg-gray-100 border border-gray-200'
            }`}
            style={{ maxHeight: isCollapsed ? '240px' : '300px' }}
          >
            <div className={`flex items-center pt-3 pb-2 border-b shrink-0 w-full ${theme === 'dark' ? 'border-[#282828]' : 'border-gray-200'} ${isCollapsed ? 'justify-center px-0' : 'justify-between px-4'}`}>
              {!isCollapsed && <span className={`text-xs font-bold uppercase tracking-wider ${primaryTextClass}`}>Playlists</span>}
              <button className={`w-10 h-10 flex items-center justify-center rounded-full transition ${theme === 'dark' ? 'text-[#a7a7a7] hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-black hover:bg-gray-200'}`}>
                <Plus size={16} />
              </button>
            </div>

            {/* Scrollable Playlist Content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-2 space-y-2 custom-scrollbar w-full flex flex-col items-center min-h-0 max-w-full">
              <div className={`flex items-center rounded-md cursor-pointer transition-all duration-200 ease-out hover:scale-[1.05] shrink-0 max-w-full ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-gray-200'} ${isCollapsed ? 'justify-center w-12 h-12 p-0' : 'w-full gap-3 p-2'}`}>
                <PlaylistCover isLiked={true} variant={1} size="w-10 h-10" />
                {!isCollapsed && (
                  <div className="flex flex-col overflow-hidden text-xs">
                    <span className={`font-medium truncate ${primaryTextClass}`}>Liked Songs</span>
                    <span className={`truncate ${textClass}`}>142 songs</span>
                  </div>
                )}
              </div>
              {[
                { id: 2, name: "Chill Lo-Fi Beats" },
                { id: 3, name: "Coding Focus Session" },
                { id: 4, name: "Late Night Drive" },
                { id: 5, name: "Rock Classics" },
                { id: 6, name: "Jazz Moods" }
              ].map((playlist) => (
                <div
                  key={playlist.id}
                  className={`flex items-center rounded-md cursor-pointer transition-all duration-200 ease-out hover:scale-[1.05] shrink-0 max-w-full ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-gray-200'} ${isCollapsed ? 'justify-center w-12 h-12 p-0' : 'w-full gap-3 p-2'}`}
                >
                  <PlaylistCover title={playlist.name} variant={playlist.id} size="w-10 h-10" />
                  {!isCollapsed && (
                    <div className="flex flex-col overflow-hidden text-xs">
                      <span className={`font-medium truncate ${primaryTextClass}`}>{playlist.name}</span>
                      <span className={`truncate ${textClass}`}>Playlist</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Library Trigger Card */}
        <div className={`rounded-lg p-1.5 flex flex-col items-center font-semibold text-sm shrink-0 w-full transition-colors duration-300 ${cardBgClass}`}>
          <button
            onClick={() => setIsLibraryOpen(!isLibraryOpen)}
            className={`flex items-center transition duration-200 rounded-md w-full text-left 
        ${isLibraryOpen
              ? (theme === 'dark' ? 'bg-[#1a1a1a] text-white' : 'bg-gray-200 text-black')
              : `${textClass} ${hoverTextClass} ${hoverBgClass}`
            } 
        ${isCollapsed ? 'justify-center w-12 h-12 p-0' : 'w-full justify-between p-3'}`}
          >
            <div className={`flex items-center ${isCollapsed ? 'gap-0 justify-center' : 'gap-5'}`}>
              <Library size={24} className="shrink-0" />
              {!isCollapsed && <span>Your Library</span>}
            </div>

            {!isCollapsed && (
              <ChevronDown
                size={18}
                className={`transition-transform duration-300 ${isLibraryOpen ? 'rotate-180' : ''}`}
              />
            )}
          </button>
        </div>
      </aside>

      <div
        onMouseDown={startResizing}
        className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-[#4d4d4d] active:bg-[#a7a7a7] transition-colors duration-150 z-30"
      />
    </div>
  );
};

export default Sidebar;