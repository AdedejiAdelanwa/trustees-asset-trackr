import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  return getLayout(
    <ChakraProvider>
  <Component {...pageProps} />
  </ChakraProvider>
  )
}

export default MyApp
