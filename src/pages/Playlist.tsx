import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Heart, Play, Plus, Shuffle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAudio } from "../context/AudioContext.tsx";
import PlaylistCover from '../components/PlaylistCover.tsx';

class Song {
    artist: string;
    title: string;

    constructor(artist: string, title: string) {
        this.artist = artist;
        this.title = title;
    }
};

function generateSongs(artist: string, numSongs: number): Array<Song> {
    let songs: Array<Song> = [];

    for (let i = 0; i < numSongs; ++i) {
        songs.push(new Song(artist, `SomeSong ${i + 1}`));
    }

    return songs;
}

function convertSecondsToDurationText(seconds: number): string {
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds %= 60;
    minutes %= 60;

    // const secondsStr = seconds > 9 ? seconds.toString() : seconds.toString().padStart(2, '0');
    // const minutesStr = minutes > 9 ? minutes.toString() : minutes.toString().padStart(2, '0');
    // const hoursStr = hours > 9 ? hours.toString() : hours.toString().padStart(2, '0');

    return hours > 0
        ? `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        : `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

interface SongRowProps {
    songIndex: number;
    artist: string;
    name: string;
    durationSeconds: number;
    playIconColor: string;
    playIconFill: string;
    playBtnAccent: string;
    onClickAdd: React.MouseEventHandler;
    onClickPlay: React.MouseEventHandler;
}

function SongRow({ songIndex, artist, name, durationSeconds, playIconFill, playIconColor, playBtnAccent, onClickAdd, onClickPlay }: SongRowProps) {
    return (
        <tr className="song-row">
            <td className="py-2 flex space-x-2">
                <button
                    className={`w-8 h-8 rounded-full flex items-center justify-center group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95 ${playBtnAccent} ${playIconColor}`}
                >
                    <Play size={22} fill={playIconFill} onClick={onClickPlay} />
                </button>
                <button
                    className={`w-8 h-8 rounded-full flex items-center justify-center group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95 ${playBtnAccent} ${playIconColor}`}
                >
                    <Plus size={22} fill={playIconFill} onClick={onClickAdd} />
                </button>
                <button
                    className={`w-8 h-8 rounded-full flex items-center justify-center group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95 ${playBtnAccent} ${playIconColor}`}
                >
                    <Heart size={22} fill={playIconFill} onClick={onClickAdd} />
                </button>
            </td>
            <td className="py-2">{songIndex}</td>
            <td className="py-2">{artist}</td>
            <td className="py-2">{name}</td>
            <td className="py-2">{convertSecondsToDurationText(durationSeconds)}</td>
        </tr>
    );
}

const Playlist = () => {
    const navigate = useNavigate();
    const { playlistId } = useParams();
    const playlistIdSafe = playlistId !== undefined ? +playlistId - 1 : 0;

    // Data layers
    const albums = [
        { id: 1, title: "Daily Mix 1", desc: "M83, MGMT, Empire of the Sun, and Foster the People" },
        { id: 2, title: "Discover Weekly", desc: "Your weekly mixtape of fresh vibrant music discoveries" },
        { id: 3, title: "Release Radar", desc: "Catch all the newest music singles from artists you follow" },
        { id: 4, title: "Deep Focus", desc: "Keep your head down with ambient cinematic soundscapes" },
        { id: 5, title: "Synthwave Retro", desc: "Neon tracks to fuel your midnight coding sessions" },
        { id: 6, title: "Chill Lo-Fi Beats", desc: "Relaxing late night lo-fi grooves for coding sessions" },
        { id: 7, title: "Liquid Drum & Bass", desc: "High energy rhythmic atmospheric synth patterns" },
        { id: 8, title: "Post-Rock Textures", desc: "Cinematic delay pedals and heavy ambient build-ups" },
        { id: 9, title: "Global Top 50", desc: "The most played tracking files across the world right now" },
        { id: 10, title: "Indie Pop Fresh", desc: "Vibrant alternative guitar chords and indie synthesizers" },
        { id: 11, title: "Late Night Jazz", desc: "Mellow acoustic keys and soft brass backdrops" }
    ];

    const album = albums[playlistIdSafe];

    const { theme } = useTheme();
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

    return (
        <div className="space-y-10 select-none pb-12">
            {/* album/playlist header */}
            <div className="transition-colors duration-300">
                <div className="relative aspect-square w-46 float-left shadow-lg mr-4">
                    <PlaylistCover title={album.title} variant={album.id} size="w-full h-full rounded-md" />
                </div>

                <div className={`text-sm tracking-tight transition-colors mb-2 duration-300`}>
                    Playlist
                </div>

                <div className={`text-5xl font-bold tracking-tight transition-colors mb-2 duration-300`}>
                    {album.title}
                </div>

                <div className={`text-3xl font-bold tracking-tight transition-colors mb-3 duration-300`}>
                    {album.desc}
                </div>

                <div className="flex space-x-2">
                    <button
                        className={`w-12 h-12 rounded-full flex items-center justify-center group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95 ${themeStyles.playBtnAccent} ${themeStyles.playIconColor}`}
                    >
                        <Play size={22} fill={themeStyles.playIconFill} onClick={() => { }} />
                    </button>
                    <button
                        className={`w-12 h-12 rounded-full flex items-center justify-center group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95 ${themeStyles.playBtnAccent} ${themeStyles.playIconColor}`}
                    >
                        <Shuffle size={22} fill={themeStyles.playIconFill} onClick={() => { }} />
                    </button>
                    <button
                        className={`w-12 h-12 rounded-full flex items-center justify-center group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95 ${themeStyles.playBtnAccent} ${themeStyles.playIconColor}`}
                    >
                        <Heart size={22} fill={themeStyles.playIconFill} onClick={() => { }} />
                    </button>
                </div>

            </div>

            {/* ordered song list */}

            <table className="table-auto w-full">
                <thead className={`transition-colors duration-300 ${themeStyles.borderHeader} tracking-tight`}>
                    <tr>
                        <th className="border-b pb-1" />
                        <th className="border-b pb-1">#</th>
                        <th className="border-b pb-1">Artist</th>
                        <th className="border-b pb-1">Title</th>
                        <th className="border-b pb-1">Duration</th>
                    </tr>
                </thead>

                <tbody className="text-center">
                    <SongRow songIndex={1} artist="SomeArtist" name="SomeSong" durationSeconds={600} playIconColor={themeStyles.playIconColor} playIconFill={themeStyles.playIconFill} playBtnAccent={themeStyles.playBtnAccent} onClickAdd={() => { }} onClickPlay={() => { }} />
                    <SongRow songIndex={2} artist="SomeArtist" name="SomeSong (remix)" durationSeconds={60} playIconColor={themeStyles.playIconColor} playIconFill={themeStyles.playIconFill} playBtnAccent={themeStyles.playBtnAccent} onClickAdd={() => { }} onClickPlay={() => { }} />
                </tbody>

            </table>
        </div>
    );
}

export default Playlist;
