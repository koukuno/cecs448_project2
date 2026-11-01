import { useState, useRef, useEffect } from 'react';
import { Home, Search, Library, Plus, ArrowLeft } from 'lucide-react';
import PlaylistCover from "./PlaylistCover.tsx";
import * as React from "react";

const Sidebar = () => {
  // 1. Core Layout States
  const [sidebarWidth, setSidebarWidth] = useState(260); // Default width in pixels
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isResizing = useRef(false);

  // 2. Constants for boundaries matching Spotify UX
  const MIN_WIDTH = 200;
  const MAX_WIDTH = 450;
  const COLLAPSED_WIDTH = 72; // Icon-only width

  // 3. Mouse Handlers for Draggable Handle
  const startResizing = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    isResizing.current = true;
    document.body.style.cursor = 'col-resize'; // Smooth cursor override
    document.body.style.userSelect = 'none';
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing.current) return;

      let newWidth = e.clientX;

      // If dragged smaller than minimum, snap to collapsed state
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
      document.body.style.userSelect = 'auto';
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // 4. Manual Collapse Button Toggle
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Determine current active display width
  const currentWidth = isCollapsed ? COLLAPSED_WIDTH : sidebarWidth;

  return (
    <div
      className="relative flex h-screen select-none bg-black text-[#b3b3b3] transition-[width] duration-150 ease-out"
      style={{ width: `${currentWidth}px` }}
    >
      <aside className="flex flex-1 flex-col gap-2 p-2 overflow-hidden">

        {/* Top Section: Quick Nav Links */}
        <div className="bg-[#121212] rounded-lg p-4 flex flex-col gap-4 font-semibold text-sm">
          <a href="/" className="flex items-center gap-5 hover:text-white transition text-white px-2 py-1">
            <Home size={24} className="shrink-0" />
            {!isCollapsed && <span>Home</span>}
          </a>
          <a href="/search" className="flex items-center gap-5 hover:text-white transition px-2 py-1">
            <Search size={24} className="shrink-0" />
            {!isCollapsed && <span>Search</span>}
          </a>
        </div>

        {/* Bottom Section: Your Library Container */}
        <div className="flex-1 bg-[#121212] rounded-lg flex flex-col overflow-hidden">

          {/* Library Header */}
          <div className={`flex items-center justify-between py-2 font-semibold text-sm ${isCollapsed ? 'px-2 justify-center' : 'px-4'}`}>
            <button
              onClick={toggleCollapse}
              className="flex items-center gap-3 hover:text-white transition py-2 rounded-md"
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <Library size={24} className="shrink-0" />
              {!isCollapsed && <span>Your Library</span>}
            </button>

            {!isCollapsed && (
              <div className="flex items-center gap-2 text-[#a7a7a7]">
                <button className="hover:text-white transition hover:bg-[#1a1a1a] p-1.5 rounded-full">
                  <Plus size={18} />
                </button>
                <button onClick={toggleCollapse} className="hover:text-white transition hover:bg-[#1a1a1a] p-1.5 rounded-full">
                  <ArrowLeft size={18} />
                </button>
              </div>
            )}
          </div>

          {/* Scrollable Playlists / Library items */}
          <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-1 custom-scrollbar">

            {/* Item 1: Liked Songs Card */}
            <div className={`flex items-center gap-3 p-2 hover:bg-[#1a1a1a] rounded-md cursor-pointer transition ${isCollapsed ? 'justify-center' : ''}`}>
              <PlaylistCover isLiked={true} variant={1} />
              {!isCollapsed && (
                <div className="flex flex-col overflow-hidden">
                  <span className="text-white text-sm font-medium truncate">Liked Songs</span>
                  <span className="text-xs text-[#a7a7a7] truncate">Playlist • 142 songs</span>
                </div>
              )}
            </div>

            {/* Generated Dynamic Library Items */}
            {[
              { id: 2, name: "Chill Lo-Fi Beats", tracks: "Spotify" },
              { id: 3, name: "Coding Focus Session", tracks: "User" },
              { id: 4, name: "Late Night Drive", tracks: "User" },
              { id: 5, name: "Rock Classics Heavy", tracks: "90s Mix" },
              { id: 6, name: "Ambient Soft Textures", tracks: "Mellow" }
            ].map((playlist) => (
              <div
                key={playlist.id}
                className={`flex items-center gap-3 p-2 hover:bg-[#1a1a1a] rounded-md cursor-pointer transition ${isCollapsed ? 'justify-center' : ''}`}
              >
                {/* Uses the safe CSS template instead of Unsplash */}
                <PlaylistCover title={playlist.name} variant={playlist.id} />

                {!isCollapsed && (
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-white text-sm font-medium truncate">{playlist.name}</span>
                    <span className="text-xs text-[#a7a7a7] truncate">Playlist • {playlist.tracks}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Resize Handle: Absolute positioned thin bar on the right border */}
      <div
        onMouseDown={startResizing}
        className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-[#4d4d4d] active:bg-[#a7a7a7] transition-colors duration-150 z-50"
      />
    </div>
  );
};

export default Sidebar;