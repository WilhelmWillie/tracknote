import fetch from 'node-fetch';

async function getPlaylists(accessToken: string, spotifyId: string, limit?: string, offset?: string) : Promise<SpotifyPlaylistsResponse> {
  try {
    const res = await fetch(`https://api.spotify.com/v1/users/${
        spotifyId
      }/playlists${(limit && offset) ? `?limit=${limit}&offset=${offset}` : ``}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    const data = await res.json();

    if (res.status === 200) {
      return { data };
    } else {
      return { error: data };
    }
  } catch (error) {
    return {
      error: {
        status: 500,
        message: error,
      }
    }
  } 
}

async function getPlaylist(accessToken: string, playlistId: string) : Promise<SpotifyPlaylistResponse> {
  try {
    const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    const data = await res.json();

    if (res.status === 200) {
      return { data };
    } else {
      return { error: data };
    }
  } catch (error) {
    return {
      error: {
        status: 500,
        message: error,
      }
    }
  } 
}

async function getPlaylistTracks(accessToken: string, playlistId: string, limit?: string, offset?: string) : Promise<SpotifyPlaylistTracksResponse> {
  try {
    const res = await fetch(`https://api.spotify.com/v1/playlists/${
        playlistId
      }/tracks${(limit && offset) ? `?limit=${limit}&offset=${offset}` : ``}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    const data = await res.json();

    if (res.status === 200) {
      return { data };
    } else {
      return { error: data };
    }
  } catch (error) {
    return {
      error: {
        status: 500,
        message: error,
      }
    }
  } 
}

export { getPlaylists, getPlaylist, getPlaylistTracks };