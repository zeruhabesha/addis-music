import Song from '../models/Song.js';

// Get all songs
export const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching songs', error: error.message });
  }
};

// Get a single song by ID
export const getSongById = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    
    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching song', error: error.message });
  }
};

// Create a new song
export const createSong = async (req, res) => {
  try {
    const { title, artist, album, genre } = req.body;
    
    if (!title || !artist || !album || !genre) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    
    const newSong = new Song({
      title,
      artist,
      album,
      genre
    });
    
    const savedSong = await newSong.save();
    res.status(201).json(savedSong);
  } catch (error) {
    res.status(400).json({ message: 'Error creating song', error: error.message });
  }
};

// Update a song
export const updateSong = async (req, res) => {
  try {
    const { title, artist, album, genre } = req.body;
    
    if (!title && !artist && !album && !genre) {
      return res.status(400).json({ message: 'Please provide at least one field to update' });
    }
    
    const updatedSong = await Song.findByIdAndUpdate(
      req.params.id,
      { title, artist, album, genre },
      { new: true, runValidators: true }
    );
    
    if (!updatedSong) {
      return res.status(404).json({ message: 'Song not found' });
    }
    
    res.status(200).json(updatedSong);
  } catch (error) {
    res.status(400).json({ message: 'Error updating song', error: error.message });
  }
};

// Delete a song
export const deleteSong = async (req, res) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);
    
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    
    res.status(200).json({ message: 'Song deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting song', error: error.message });
  }
};