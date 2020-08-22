import App from 'next/app'
import { ThemeProvider, createGlobalStyle } from 'styled-components'

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
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