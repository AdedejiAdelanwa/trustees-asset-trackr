import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "../redux/store";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { theme } from "../theme";

const chakraTheme = extendTheme(theme);

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(
    <ChakraProvider theme={chakraTheme}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
