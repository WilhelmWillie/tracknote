// Spotify objects
type SpotifyImage = {
  height: number;
  url: string;
  width: number;
}

type SpotifyUser = {
  country: string;
  display_name: string;
  email: string;
  external_urls: Object;
  followers: Object;
  href: string;
  id: string;
  images: Array<SpotifyImage>;
  product: string;
  type: 'user';
  uri: string;
}

type SpotifyPlaylist = {
  collaborative: boolean;
  description: string | null;
  external_urls: Object;
  href: string;
  id: string;
  images: Array<SpotifyImage>;
  name: string;
  owner: SpotifyUser;
  public: boolean | null;
  snapshot_id: string;
  tracks: Object | null;
  type: 'playlist';
  uri: string;
}

type SpotifyPlaylistTrack = {
  added_at: string;
  added_by: SpotifyUser | null;
  is_local: boolean;
  track: SpotifyTrack;
}

type SpotifyAlbum = {
  album_type: string;
  artists: Array<SpotifyArtist>;
  available_markets: Array<String>;
  external_urls: Array<Object>;
  href: string;
  id: string;
  images: Array<SpotifyImage>;
  name: string;
  release_date: string;
  release_date_precision: string,
  total_tracks: number;
  type: 'album';
  uri: string;
}

type SpotifyTrack = {
  album: SpotifyAlbum;
  artists: Array<SpotifyArtist>;
  available_markets: Array<String>;
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: Object;
  external_urls: Object;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: Object;
  restrictions: Object;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: 'track';
  uri: string;
}

type SpotifyArtist = {
  external_urls: Object;
  followers: Object;
  genres: Array<String>;
  href: string;
  id: string;
  images: Array<SpotifyImage>;
  name: string;
  popularity: number;
  type: 'artist';
  uri: string;
}

// Spotify API types
type SpotifyResponse = {
  error?: { 
    status: number;
    message: string;
  }
  data?: Object;
}

type SpotifyMeResponse = {
  data?: SpotifyUser;
} & SpotifyResponse;

type SpotifyPlaylistsResponse = {
  data?: {
    href: string;
    items: Array<SpotifyPlaylist>;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
  }
} & SpotifyResponse;

type SpotifyPlaylistResponse = {
  data?: SpotifyPlaylist;
} & SpotifyResponse;

type SpotifyPlaylistTracksResponse = {
  data?: {
    href: string;
    items: Array<SpotifyPlaylistTrack>;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
  }
} & SpotifyResponse;

type SpotifyTokenResponse = {
  data?: {
    access_token: string;
    token_type: string;
    scope: string;
    expires_in: number;
    refresh_token: string;
  }
} & SpotifyResponse;