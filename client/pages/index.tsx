import Head from 'next/head';

import { Button, Header, Layout } from '../components';
import { authorizeSpotify } from '../utils';

const Home = () => {
  const HomeHeader = (
    <Header>
      <h1>tracknote</h1>
    </Header>
  )
  return (
    <>
      <Head>
        <title>tracknotes</title>
      </Head>
      
      <Layout header={HomeHeader}>
        <p>Annotate your Spotify playlists</p>
        <Button onClick={authorizeSpotify}>sign-in with spotify</Button>
      </Layout>
    </>
  )
}

export default Home;