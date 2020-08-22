const SPOTIFY_CLIENT_ID = "a8e27a7a3a8c452ba5fcca027104161e";
const SPOTIFY_SCOPES = "user-read-email playlist-read-collaborative"
const SPOTIFY_REDIRECT_URI = "http://localhost:3000/auth/callback";
const SPOTIFY_AUTHORIZE_URL = "https://accounts.spotify.com/authorize";

function authorizeSpotify() {
  const spotifyUrl = `${
    SPOTIFY_AUTHORIZE_URL
  }?response_type=code&client_id=${
    SPOTIFY_CLIENT_ID
  }&scope=${
    encodeURIComponent(SPOTIFY_SCOPES)
  }&redirect_uri=${
    encodeURIComponent(SPOTIFY_REDIRECT_URI)
  }`;

  if (window && typeof window !== 'undefined') {
    window.open(spotifyUrl);
  }
}

export default authorizeSpotify;