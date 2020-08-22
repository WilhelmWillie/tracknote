import { Router } from 'express';

import { spotifyAuthMiddleware } from '../middleware';
import { getPlaylists, getPlaylistTracks } from '../spotifyApi';
import { Note } from '../models';
import { getPlaylist } from '../spotifyApi/playlists';
import type { Comment } from '../types';
import { mergeSpotifyTracksAndNotes } from '../utils';

const router = Router();

router.get('/', spotifyAuthMiddleware, async (req, res) => {
  const user = req.user;

  const { limit, offset } = req.query;

  if (user) {
    const { data, error } = await getPlaylists(user?.spotify.tokens.access, user?.spotify.id, limit as string, offset as string);

    if (data) {
      return res.json({data});
    } else {
      return res.status(500).json({error});
    }
  } else {
    return res.status(403).json({
      error: {
        status: 403,
        message: "Could not successfully retrieve playlist data"
      }
    })
  }
})

router.get('/:playlistId', spotifyAuthMiddleware, async (req, res) => {
  const user = req.user;

  const { playlistId } = req.params;
  const { limit, offset } = req.query;

  if (user) {
    const { data: spotifyPlaylistData, error: getPlaylistError } = await getPlaylist(user?.spotify.tokens.access, playlistId);
    const { data: spotifyPlaylistTracksData, error: getPlaylistTracksError } = await getPlaylistTracks(user?.spotify.tokens.access, playlistId, limit as string, offset as string);

    // Get notes for playlist and process them into a record that maps trackId to an array of comments
    const notes = await Note.find({ spotifyPlaylistId: playlistId });
    const trackIdToNotes : Record<string, Comment[]> = {};
    notes.forEach(note => {
      trackIdToNotes[note.spotifyTrackId] = note.comments;
    })

    if (spotifyPlaylistData && spotifyPlaylistTracksData) {
      // Merge notes from our database with tracks from Spotify  
      const tracks = mergeSpotifyTracksAndNotes({
        spotifyPlaylistTracks: spotifyPlaylistTracksData.items, 
        trackIdToNotes
      });

      const {
        id: playlistId,
        name: playlistName,
        description: playlistDescription,
        uri: playlistUri,
      } = spotifyPlaylistData;

      return res.json({
        data: {
          info: {
            id: playlistId,
            name: playlistName,
            description: playlistDescription,
            uri: playlistUri
          },
          tracks
        }
      });
    } else if (getPlaylistError) {
      return res.status(500).json({error: getPlaylistError});
    } else if (getPlaylistTracksError) {
      return res.status(500).json({error: getPlaylistTracksError});
    } else {
      return res.status(500).json({error: 'Uknown error'});
    }
  } else {
    return res.status(403).json({
      error: {
        status: 403,
        message: "User not authorized"
      }
    })
  }
})

export default router;