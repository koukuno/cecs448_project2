import { Play } from 'lucide-react';
import PlaylistCover from '../PlaylistCover.tsx';

interface AlbumData {
  id: number;
  title: string;
  desc: string;
  artist?: string;
}

interface DashboardCardProps {
  album: AlbumData;
  playTrack: (track: { id: number; title: string; artist: string; variant: number }) => void;
  primaryText: string;
  subText: string;
  cardBg: string;
  borderStyle: string;
  playBtnAccent: string;
  playIconColor: string;
  playIconFill: string;
}

const DashboardCard = ({
                         album,
                         playTrack,
                         primaryText,
                         subText,
                         cardBg,
                         borderStyle,
                         playBtnAccent,
                         playIconColor,
                         playIconFill,
                       }: DashboardCardProps) => {
  return (
    <div
      onClick={() =>
        playTrack({
          id: album.id,
          title: album.title,
          artist: album.artist || 'Various Artists',
          variant: album.id,
        })
      }
      className={`group w-48 p-4 rounded-md transition-all duration-300 cursor-pointer shrink-0 snap-start flex flex-col gap-3 relative ${cardBg} ${borderStyle}`}
    >
      <div className="relative aspect-square w-full shadow-lg">
        <PlaylistCover title={album.title} variant={album.id} size="w-full h-full rounded-md" />
        <button
          className={`absolute right-3 bottom-3 w-12 h-12 rounded-full flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95 ${playBtnAccent} ${playIconColor}`}
        >
          <Play size={22} fill={playIconFill} className="translate-x-[1.5px]" />
        </button>
      </div>
      <div className="flex flex-col min-w-0">
        <span className={`text-sm font-bold truncate mb-1 ${primaryText}`}>{album.title}</span>
        <p className={`text-xs line-clamp-2 leading-relaxed font-medium ${subText}`}>{album.desc}</p>
      </div>
    </div>
  );
};

export default DashboardCard;