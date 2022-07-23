import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";

// Custom Chakra theme
import theme from "./theme/theme";

ReactDOM.render(
  <ChakraProvider theme={theme} resetCss={false} position="relative">
    <App />
  </ChakraProvider>,
  document.getElementById("root"),
);
