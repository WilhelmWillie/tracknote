import { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router'

import Head from 'next/head';

import { Header, Layout } from '../../components';

const Playlist = () => {
  const [playlist, setPlaylist ] = useState(null);

  const router = useRouter()
  const { playlistId } = router.query

  const tracks = useMemo(() => {
    return playlist?.tracks?.map(item => (
      <Track>
        <TrackSpotifyUri href={item.uri}>Listen</TrackSpotifyUri>

        <TrackName>{item.name}</TrackName>
        
        <TrackAlbum>{item.albumName}</TrackAlbum>

        <TrackArtists>{item.artists.map(artist => {return artist.artistName}).join(', ')}</TrackArtists>

        <TrackNotesButton hasComments={item.notes.length > 0}>💬</TrackNotesButton>
      </Track>
    ));
  }, [playlist])

  useEffect(() => {
    const fetchPlaylistData = async () => {
      const res = await fetch(`http://localhost:8000/api/playlists/${playlistId}?limit=50&offset=0`, {
        method: 'GET',
        credentials: 'include',
      });

      const { data } = await res.json();
      setPlaylist(data)
    }

    if (playlistId) fetchPlaylistData();
  }, [playlistId]);

  const PlaylistsHeader = useMemo(() => (
    <>
      <Header />

      <PlaylistInfo>
        <PlaylistInfoImage>
          <img src={playlist?.info.images[0]?.url} />
        </PlaylistInfoImage>

        <PlaylistInfoText>
          <h2>{playlist?.info.name}</h2>
          <p>{playlist?.info.description}</p>
        </PlaylistInfoText>
      </PlaylistInfo>
    </>
  ), [playlist?.info.name, playlist?.info.description, playlist?.info.images]);
  
  return (
    <>
      <Head>
        <title>tracknotes</title>

        <link rel="stylesheet" href="https://use.typekit.net/guu5uof.css" />
      </Head>
      
      <Layout header={PlaylistsHeader} fullWidthContainer noContainerMargin>
        <PlaylistTracks>
          {tracks}
        </PlaylistTracks>
      </Layout>
    </>
  )
}

const PlaylistInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #2F3132;
`;

const PlaylistInfoImage = styled.picture`
  max-width: 400px;
  object-fit: cover;
  margin-right: 32px;
  img {
    width: 100%;
    display: block;
  }
`;

const PlaylistInfoText = styled.div`
  padding: 0 24px;

  h2 {
    font-size: 48px;
    font-weight: 600;
    color: #FFFFFF;
    margin-bottom: 18px;
  }

  p {
    font-size: 18px;
    color: #FFFFFF;
  }
`;

const PlaylistTracks = styled.ul`
  list-style: none;
  padding: 0;

  li {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin-bottom: 24px;

    img {
      margin-right: 16px;
    }

    h3 {
      margin: 0;
    }
  }
`;

const Track = styled.div`
  display: flex;
  flex-direction: row;
  color: #FFFFFF;
  padding: 24px 32px;
  border-bottom: 1px solid #353739;
  align-items: center;
  justify-content: space-between;

  h3 {
    font-weight: 600;
    font-size: 18px;
  }
`;

const TrackSpotifyUri = styled.a`
  color: #FFFFFF;
  text-decoration: none;
  border: 1px solid #4DAA57;
  padding: 16px;
  border-radius: 999px;
  flex-basis: 10%;
  text-align: center;
`;

const TrackName = styled.h3`
  flex-basis: 30%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const TrackAlbum = styled.p`
  flex-basis: 20%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const TrackArtists = styled.p`
  flex-basis: 20%;
  white-space: nowrap;
  overflow: hidden;
`;

const TrackNotesButton = styled.button<{
  hasComments?: boolean;
}>`
  font-size: 16px;
  background: transparent;
  border: 1px solid #CCCCCC;
  border-radius: 999px;
  width: 48px;
  height: 48px;
  ${({hasComments}) => hasComments ? `opacity: 1` : `opacity: 0.12`};

  &:hover {
    background: #CCCCCC;
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;


export default Playlist;