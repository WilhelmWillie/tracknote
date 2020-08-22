import mongoose from 'mongoose';

import { Note } from '../types';

type NoteType = Note & mongoose.Document;

const NoteSchema = new mongoose.Schema({
  spotifyPlaylistId: {
    type: String,
    index: true,
  },
  spotifyTrackId: String,
  rootAuthor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [{
    content: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: Date
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const NoteModel = mongoose.model<NoteType>('Note', NoteSchema);

export {
  NoteSchema
};

export default NoteModel;