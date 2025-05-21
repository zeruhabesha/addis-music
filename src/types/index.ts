export interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  createdAt: string;
  updatedAt: string;
}

export interface SongFormData {
  title: string;
  artist: string;
  album: string;
  genre: string;
}

export interface Statistics {
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalGenres: number;
  songsPerGenre: {
    genre: string;
    count: number;
  }[];
  songsPerArtist: {
    artist: string;
    count: number;
  }[];
  albumsPerArtist: {
    artist: string;
    count: number;
  }[];
  songsPerAlbum: {
    album: string;
    count: number;
  }[];
}