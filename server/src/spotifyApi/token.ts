import fetch from 'node-fetch';

import { SPOTIFY_CLIENT_ID, SPOTIFY_SECRET } from '../constants';

type PostTokenParams = {
  grantType: 'authorization_code' | 'refresh_token';
  code?: string;
  redirectUri?: string;
  scope?: string;
  refreshToken?: string;
}

async function postToken(params : PostTokenParams) : Promise<SpotifyTokenResponse> {
  const { grantType, code, redirectUri, scope, refreshToken } = params;

  try {
    const body = new URLSearchParams();
    body.append('grant_type', grantType);

    if (grantType === 'authorization_code' && code && redirectUri && scope) {
      body.append('code', code);
      body.append('redirect_uri', redirectUri);
      body.append('scope', scope);  
    } else if (refreshToken) {
      body.append('refresh_token', refreshToken);
    }

    const res = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_SECRET}`).toString('base64')}`
      },
      body
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

export { postToken };