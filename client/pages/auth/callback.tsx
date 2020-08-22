import { useState, useEffect } from 'react';

import Head from 'next/head';

import { Header, Layout } from '../../components';

const Callback = ({ code }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (code) {
        const res = await fetch(`http://localhost:8000/api/auth?code=${encodeURIComponent(code)}`, {
          method: 'POST',
          credentials: 'include',
        });

        const { data } = await res.json();
        setUser(data)
      }
    }

    fetchData();
  }, [code]);

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
        <p>your authorization code: <br /> <code>{code}</code></p>

        <p>your user ID: {JSON.stringify(user) || 'loading...'}</p>
      </Layout>
    </>
  )
}

Callback.getInitialProps = ({query}) => {
  const { code } = query;

  return { code }
}

export default Callback;