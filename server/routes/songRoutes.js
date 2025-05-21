import express from 'express';
import {
  getAllSongs,
  getSongById,
  createSong,
  updateSong,
  deleteSong
} from '../controllers/songController.js';

const router = express.Router();

// GET all songs
router.get('/', getAllSongs);

// GET a single song
router.get('/:id', getSongById);

// POST a new song
router.post('/', createSong);

// PUT (update) a song
router.put('/:id', updateSong);

// DELETE a song
router.delete('/:id', deleteSong);

export default router;