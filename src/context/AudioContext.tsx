import React, { createContext, useContext, useState } from 'react';

interface CurrentTrack {
  id: number;
  title: string;
  artist: string;
  variant: number; // For gradient background
}

interface AudioContextType {
  currentTrack: CurrentTrack;
  isPlaying: boolean;
  playTrack: (track: CurrentTrack) => void;
  setIsPlaying: (playing: boolean) => void;
}

const defaultTrack: CurrentTrack = {
  id: 0,
  title: "Midnight City Remix",
  artist: "The M83 Project",
  variant: 4,
};

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentTrack, setCurrentTrack] = useState<CurrentTrack>(defaultTrack);
  const [isPlaying, setIsPlaying] = useState(false);

  const playTrack = (track: CurrentTrack) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  return (
    <AudioContext.Provider value={{ currentTrack, isPlaying, playTrack, setIsPlaying }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) throw new Error('useAudio must be used within an AudioProvider');
  return context;
};