import { Router } from 'express';

import { spotifyAuthMiddleware } from '../middleware';
import { Note } from '../models';

const router = Router();

router.get('/:playlistId', spotifyAuthMiddleware, async (req, res) => {
  const user = req.user;
  const { playlistId } = req.params

  const notes = await Note.find({ spotifyPlaylistId: playlistId });

  return res.json({
    data: notes,
  })
})

router.post('/:playlistId', spotifyAuthMiddleware, async (req, res) => {
  const user = req.user;

  if (user) {
    const { playlistId } = req.params
    const {
      trackId,
      content
    } = req.body;

    const existingNote = await Note.findOne({ spotifyPlaylistId: playlistId, spotifyTrackId: trackId });

    if (existingNote) {
      // Add to comments
      existingNote.comments.push({
        content,
        author: user,
      });

      await existingNote.save();
      return res.json({
        data: existingNote
      })
    } else {
      const newNote = new Note({
        spotifyPlaylistId: playlistId,
        spotifyTrackId: trackId,
        rootAuthor: user,
        comments: [{
          content,
          author: user,
        }]
      });

      await newNote.save();
      return res.json({ 
        data: newNote
      });
    }
  }
});

router.delete('/:noteId', async (req, res) => {
  // delete note
  return res.json({
    data: null
  });
});

router.put('/:noteId', async (req, res) => {
  // edit contents of note (but only if original author was self)
  return res.json({
    data: null
  });
})

export default router;