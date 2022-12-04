import "../styles/globals.css";
import store from "../redux/store";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { theme } from "../theme";
import { Provider } from "react-redux";

const chakraTheme = extendTheme(theme);

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <Provider store={store}>
      <ChakraProvider theme={chakraTheme}>
        {getLayout(<Component {...pageProps} />)}
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
