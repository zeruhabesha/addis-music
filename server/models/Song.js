import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  artist: {
    type: String,
    required: [true, 'Artist is required'],
    trim: true
  },
  album: {
    type: String,
    required: [true, 'Album is required'],
    trim: true
  },
  genre: {
    type: String,
    required: [true, 'Genre is required'],
    trim: true
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
songSchema.index({ title: 1 });
songSchema.index({ artist: 1 });
songSchema.index({ album: 1 });
songSchema.index({ genre: 1 });

const Song = mongoose.model('Song', songSchema);

export default Song;