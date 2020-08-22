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
        <div>
          <h3>{item.name}</h3>
          
          <p>{item.albumName}</p>

          <p>{item.spotifyId}</p>

          {
            item.notes ? (
              <TrackNotes>
                {item.notes.map(note => <li>{note.content}</li>)}
              </TrackNotes>
            ) : null
          }
        </div>
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

  const PlaylistsHeader = (
    <Header>
      <h1>tracknote</h1>
    </Header>
  )
  
  return (
    <>
      <Head>
        <title>tracknotes</title>
      </Head>
      
      <Layout header={PlaylistsHeader}>
        <h2>{playlist?.info.name}</h2>
        <p>{playlist?.info.description}</p>

        <PlaylistTracks>
          {tracks}
        </PlaylistTracks>
      </Layout>
    </>
  )
}

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
  padding: 24px;
  border: 1px solid #CCCCCC;
  border-radius: 8px;
  margin-bottom: 24px;
`;

const TrackNotes = styled.ul`
  padding: 0;
  list-style: none;

  li {
    border: 1px solid #DDDDDD;
    padding: 8px;
    margin: 8px 0;
  }
`;

export default Playlist;