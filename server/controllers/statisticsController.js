import Song from '../models/Song.js';

export const getStatistics = async (req, res) => {
  try {
    // Get total counts
    const totalSongs = await Song.countDocuments();
    
    // Get unique artists, albums, and genres
    const uniqueArtists = await Song.distinct('artist');
    const uniqueAlbums = await Song.distinct('album');
    const uniqueGenres = await Song.distinct('genre');
    
    // Get songs per genre
    const songsPerGenre = await Song.aggregate([
      { $group: { _id: '$genre', count: { $sum: 1 } } },
      { $project: { genre: '$_id', count: 1, _id: 0 } },
      { $sort: { count: -1 } }
    ]);
    
    // Get songs per artist
    const songsPerArtist = await Song.aggregate([
      { $group: { _id: '$artist', count: { $sum: 1 } } },
      { $project: { artist: '$_id', count: 1, _id: 0 } },
      { $sort: { count: -1 } }
    ]);
    
    // Get albums per artist
    const albumsPerArtist = await Song.aggregate([
      { $group: { _id: { artist: '$artist', album: '$album' } } },
      { $group: { _id: '$_id.artist', count: { $sum: 1 } } },
      { $project: { artist: '$_id', count: 1, _id: 0 } },
      { $sort: { count: -1 } }
    ]);
    
    // Get songs per album
    const songsPerAlbum = await Song.aggregate([
      { $group: { _id: '$album', count: { $sum: 1 } } },
      { $project: { album: '$_id', count: 1, _id: 0 } },
      { $sort: { count: -1 } }
    ]);
    
    // Calculate any additional statistics
    const statistics = {
      totalSongs,
      totalArtists: uniqueArtists.length,
      totalAlbums: uniqueAlbums.length,
      totalGenres: uniqueGenres.length,
      songsPerGenre,
      songsPerArtist,
      albumsPerArtist,
      songsPerAlbum
    };
    
    res.status(200).json(statistics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics', error: error.message });
  }
};