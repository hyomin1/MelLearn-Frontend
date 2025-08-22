import type { Track } from '@/features/home/types/home';
import { create } from 'zustand';

interface TrackState {
  track: Track | null;
  setTrack: (track: Track) => void;
}

export const useTrackStore = create<TrackState>((set) => ({
  track: null,
  setTrack: (track: Track) => set({ track }),
}));
