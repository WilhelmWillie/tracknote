import { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import Head from 'next/head';

import { Header, Layout } from '../components';

const Playlists = () => {
  const [playlists, setPlaylists ] = useState([]);

  const playlistItems = useMemo(() => {
    return playlists.map(item => (
      <PlaylistListItem>
        <img src={item.images[0]?.url} />

        <div>
          <Link as={`/playlist/${item.id}`} href='/playlist/[playlistId]'>
            <a>
              <h3>{item.name}</h3>
            </a>
          </Link>
          
          <p>{item.description}</p>
        </div>
      </PlaylistListItem>
    ));
  }, [playlists])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:8000/api/playlists?limit=50&offset=0`, {
        method: 'GET',
        credentials: 'include',
      });

      const { data } = await res.json();
      setPlaylists(data.items)
    }

    fetchData();
  }, []);

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
          <YourPlaylistsHeading>Your Playlists</YourPlaylistsHeading>

          <YourPlaylistsDescription>TrackNotes syncs up with your saved Spotify playlists. Save playlists on Spotify to annotate them on TrackNotes</YourPlaylistsDescription>
        </PlaylistsInfoHeader>
        
        <PlaylistCatalog>
          {playlistItems}
        </PlaylistCatalog>
      </Layout>
    </>
  )
}

const PlaylistCatalog = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
`;

const PlaylistListItem = styled.li`
  flex-basis: 23.5%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 2%;
  color: #FFFFFF;
  padding: 24px;

  img {
    border-radius: 4px;
    margin-bottom: 16px;
    width: 100%;
  }

  h3 {
    font-weight: 600;
    color: #FFFFFF;
    font-size: 18px;
    margin: 0 0 16px;
  }

  a {
    text-decoration: none;
  }

  p {
    line-height: 20px;
    font-size: 14px;
    color: #B8BBBD;
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

export default Playlists;