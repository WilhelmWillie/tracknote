const MONGODB_HOST = process.env.MONGODB_HOST || 'mongodb://localhost/tracknote';

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || '';
const SPOTIFY_SECRET = process.env.SPOTIFY_SECRET || '';
const JWT_SECRET = process.env.JWT_SECRET || '';

export {
  MONGODB_HOST,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_SECRET,
  JWT_SECRET
}