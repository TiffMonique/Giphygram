import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import App from "./App";
// Custom Chakra theme
import theme from "./theme/theme";
import { store } from "./redux/store";

const persistor = persistStore(store);
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ChakraProvider theme={theme} resetCss={false} position="relative">
        <App />
      </ChakraProvider>
    </PersistGate>
  </Provider>,
  document.getElementById("root"),
);
