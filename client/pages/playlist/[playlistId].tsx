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

        <link rel="stylesheet" href="https://use.typekit.net/guu5uof.css" />
      </Head>
      
      <Layout header={PlaylistsHeader}>
        <PlaylistsInfoHeader>
          <YourPlaylistsHeading>{playlist?.info.name}</YourPlaylistsHeading>

          <YourPlaylistsDescription>{playlist?.info.description}</YourPlaylistsDescription>
        </PlaylistsInfoHeader>

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
  display: flex;
  flex-direction: row;
  border-radius: 8px;
  margin-bottom: 24px;
  color: #FFFFFF;

  h3 {
    font-weight: 600;
    font-size: 18px;
  }
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

const PlaylistsInfoHeader = styled.div`
  padding: 32px 0;
  margin-bottom: 32px;
`;

const YourPlaylistsHeading = styled.h2`
  font-size: 48px;
  color: #FFFFFF;
  font-weight: 700;
`;

const YourPlaylistsDescription = styled.p`
  font-size: 20px;
  font-weight: 300;
  margin: 16px 0;
  color: #FFFFFF;
  line-height: 30px;
`;

export default Playlist;