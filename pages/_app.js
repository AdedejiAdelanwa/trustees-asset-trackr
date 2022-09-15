import '../styles/globals.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import {theme} from "../theme";

const chakraTheme = extendTheme(theme)

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  return getLayout(
  <ChakraProvider theme={chakraTheme}>
    <Component {...pageProps} />
  </ChakraProvider>
  )
}

export default MyApp
