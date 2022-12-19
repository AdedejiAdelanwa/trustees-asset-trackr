import "../styles/globals.css";
import store from "../redux/store";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { theme } from "../theme";
import { Provider } from "react-redux";
import { persistedStore } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";

const chakraTheme = extendTheme(theme);

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <ChakraProvider theme={chakraTheme}>
          {getLayout(<Component {...pageProps} />)}
        </ChakraProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
