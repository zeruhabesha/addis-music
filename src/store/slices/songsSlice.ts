import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Song, SongFormData } from '../../types';

interface SongsState {
  songs: Song[];
  currentSong: Song | null;
  loading: boolean;
  error: string | null;
}

const initialState: SongsState = {
  songs: [],
  currentSong: null,
  loading: false,
  error: null,
};

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    // Fetch songs actions
    fetchSongsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSongsSuccess: (state, action: PayloadAction<Song[]>) => {
      state.songs = action.payload;
      state.loading = false;
    },
    fetchSongsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Fetch single song actions
    fetchSongRequest: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    fetchSongSuccess: (state, action: PayloadAction<Song>) => {
      state.currentSong = action.payload;
      state.loading = false;
    },
    fetchSongFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Create song actions
    createSongRequest: (state, action: PayloadAction<SongFormData>) => {
      state.loading = true;
      state.error = null;
    },
    createSongSuccess: (state, action: PayloadAction<Song>) => {
      state.songs = [...state.songs, action.payload];
      state.loading = false;
    },
    createSongFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Update song actions
    updateSongRequest: (state, action: PayloadAction<{ id: string; data: SongFormData }>) => {
      state.loading = true;
      state.error = null;
    },
    updateSongSuccess: (state, action: PayloadAction<Song>) => {
      state.songs = state.songs.map((song) => 
        song._id === action.payload._id ? action.payload : song
      );
      state.currentSong = null;
      state.loading = false;
    },
    updateSongFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Delete song actions
    deleteSongRequest: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    deleteSongSuccess: (state, action: PayloadAction<string>) => {
      state.songs = state.songs.filter((song) => song._id !== action.payload);
      state.loading = false;
    },
    deleteSongFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Clear current song
    clearCurrentSong: (state) => {
      state.currentSong = null;
    },
    
    // Clear errors
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  fetchSongRequest,
  fetchSongSuccess,
  fetchSongFailure,
  createSongRequest,
  createSongSuccess,
  createSongFailure,
  updateSongRequest,
  updateSongSuccess,
  updateSongFailure,
  deleteSongRequest,
  deleteSongSuccess,
  deleteSongFailure,
  clearCurrentSong,
  clearErrors,
} = songsSlice.actions;

export default songsSlice.reducer;