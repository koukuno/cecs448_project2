import { Eye, EyeOff } from 'lucide-react';
import DashboardCard from './DashboardCard';

interface AlbumData {
  id: number;
  title: string;
  desc: string;
  artist?: string;
}

interface DashboardSectionProps {
  title: string;
  isVisible: boolean;
  onToggle: () => void;
  albums: AlbumData[];
  playTrack: (track: any) => void;
  primaryText: string;
  subText: string;
  cardBg: string;
  borderStyle: string;
  playBtnAccent: string;
  playIconColor: string;
  playIconFill: string;
  eyeIconColor: string;
}

const DashboardSection = ({
                            title,
                            isVisible,
                            onToggle,
                            albums,
                            playTrack,
                            primaryText,
                            subText,
                            cardBg,
                            borderStyle,
                            playBtnAccent,
                            playIconColor,
                            playIconFill,
                            eyeIconColor,
                          }: DashboardSectionProps) => {
  return (
    <div className={`transition-all duration-300 ${isVisible ? 'opacity-100 h-auto' : 'opacity-30'}`}>
      <div className="flex items-center justify-between mb-4 group/header">
        <div className="flex items-center gap-3">
          <h2 className={`text-2xl font-bold transition-colors duration-300 ${isVisible ? primaryText : 'line-through text-gray-500'}`}>
            {title}
          </h2>
          <button
            onClick={onToggle}
            className={`p-1 rounded-md hover:bg-white/5 transition opacity-0 group-hover/header:opacity-100 ${eyeIconColor}`}
            title={isVisible ? "Hide this section" : "Show this section"}
          >
            {isVisible ? <Eye size={18} /> : <EyeOff size={18} className="text-red-500" />}
          </button>
        </div>
        {isVisible && (
          <span className={`text-xs font-bold uppercase tracking-wider hover:underline cursor-pointer ${subText}`}>
            Show all
          </span>
        )}
      </div>

      {isVisible && (
        <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar snap-x scroll-smooth animate-in fade-in zoom-in-95 duration-200">
          {albums.map((album) => (
            <DashboardCard
              key={album.id}
              album={album}
              playTrack={playTrack}
              primaryText={primaryText}
              subText={subText}
              cardBg={cardBg}
              borderStyle={borderStyle}
              playBtnAccent={playBtnAccent}
              playIconColor={playIconColor}
              playIconFill={playIconFill}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardSection;