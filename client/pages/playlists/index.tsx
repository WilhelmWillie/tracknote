import { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import Head from 'next/head';

import { Header, Layout } from '../../components';

const Playlists = () => {
  const [playlists, setPlaylists ] = useState([]);

  const playlistItems = useMemo(() => {
    return playlists.map(item => (
      <li>
        <img src={item.images[0].url} width="64" height="64"/>

        <div>
          <Link href={`/playlists/${item.id}`}>
            <a>
              <h3>{item.name}</h3>
            </a>
          </Link>
          
          <p>{item.description}</p>
        </div>
      </li>
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
      </Head>
      
      <Layout header={PlaylistsHeader}>
        <h2>your playlists</h2>

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

export default Playlists;