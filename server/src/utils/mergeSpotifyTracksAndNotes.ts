import type { Comment } from '../types';

function mergeSpotifyTracksAndNotes(
  {
    spotifyPlaylistTracks,
    trackIdToNotes,
  } : {
    spotifyPlaylistTracks: Array<SpotifyPlaylistTrack>,
    trackIdToNotes: Record<string, Comment[]>
  }
) {
  const tracks = spotifyPlaylistTracks.map(spotifyTrack => {
    const { 
      track: { 
        id, 
        name, 
        uri,
        album: {
          name: albumName
        },
        artists
      }
    } = spotifyTrack;

    const trackNotes = trackIdToNotes[id];
    const trackArtists = artists.map((artist : any) => ({
      artistName: artist.name
    }))

    return {
      spotifyId: id,
      name,
      uri,
      albumName,
      notes: trackNotes ? trackNotes : [],
      artists: trackArtists,
    };
  });

  return tracks;
}

export default mergeSpotifyTracksAndNotes;