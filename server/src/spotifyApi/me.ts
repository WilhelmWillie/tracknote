import fetch from 'node-fetch';

async function getMe(accessToken: string) : Promise<SpotifyMeResponse> {
  try {
    const res = await fetch('https://api.spotify.com/v1/me', {
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

export { getMe };