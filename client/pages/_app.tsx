import App from 'next/app'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import reset from 'styled-reset';

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }

  body {
    font-family: proxima-nova,sans-serif;
    font-weight: 300;
    font-style: normal;
    background: #2A2D2F
  }
`;

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}