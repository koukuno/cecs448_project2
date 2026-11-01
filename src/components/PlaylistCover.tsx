import {Heart, Music} from 'lucide-react';

const PlaylistCover = ({ title = "Playlist", isLiked = false, variant = 1, size = "w-12 h-12" }) => {
  // Array of beautiful abstract Spotify-esque gradient styles
  const gradients = [
    "from-[#2e2e2e] to-[#1a1a1a] text-[#a7a7a7]", // Dark Slate Minimal
    "from-[#450af5] to-[#c4efd9] text-white",     // Classic Liked Songs Look
    "from-[#e8115b] to-[#bc5100] text-white",     // Energetic Orange-Pink
    "from-[#148a08] to-[#121212] text-white",     // Moody Forest Green
    "from-[#004369] to-[#01949a] text-white"      // Deep Ocean Teal
  ];

  const selectedGradient = gradients[variant % gradients.length];

  return (
    <div className={`${size} rounded bg-linear-to-br ${selectedGradient} flex flex-col items-center justify-center shrink-0 shadow-md relative overflow-hidden group`}>
      {/* Abstract Background Ring Pattern */}
      <div className="absolute -right-2 -bottom-2 w-8 h-8 rounded-full bg-white/5 pointer-events-none" />

      {/* Content Fallback Icon or First Letter */}
      <span className="font-bold text-sm tracking-tighter uppercase select-none opacity-80 group-hover:opacity-100 transition-opacity">
        { isLiked ? (
            <Heart size={20} fill="white" />
          ) : (
            <div>
              {title.trim().charAt(0) || <Music size={20} fill="white" />}
            </div>
          )
        }
      </span>
    </div>
  );
};

export default PlaylistCover;