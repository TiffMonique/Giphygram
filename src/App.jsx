/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Logo from "./assets/GIPHYGRAM.png";
import Navbar from "./components/Navbar/Navbar";
import Favorites from "./components/Favorites/Favorites";
import Search from "./components/Search/Search";
import Visited from "./components/Visited/Visited";
import CardDetails from "./components/Cards/CardDetails";
import Cards from "./components/Cards/Cards";

function Home() {
  return (
    <div>
      <Box h="100%" w="100%">
        <Flex
          flexDirection="row"
          maxW="90%"
          px="10px"
          my="30px"
          mx="auto"
          style={{
            backgroundImage: `linear-gradient(
            45deg,
            hsl(261deg 100% 50%) 0%,
            hsl(262deg 100% 46%) 9%,
            hsl(262deg 100% 43%) 18%,
            hsl(262deg 100% 40%) 27%,
            hsl(264deg 90% 40%) 36%,
            hsl(267deg 70% 47%) 45%,
            hsl(271deg 64% 52%) 55%,
            hsl(275deg 67% 58%) 64%,
            hsl(274deg 72% 59%) 73%,
            hsl(272deg 79% 58%) 82%,
            hsl(269deg 85% 58%) 91%,
            hsl(266deg 92% 57%) 100%
          )`,
          }}
          bgSize="cover"
          py="50px"
          borderRadius="20px"
        >
          <Flex
            direction={{ base: "row", xl: "row" }}
            mx="auto"
            rowGap="20px"
            columnGap="20px"
          >
            <Cards />
          </Flex>
        </Flex>
      </Box>
    </div>
  );
}
function App() {
  // const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Router>
      <Navbar logo={Logo} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favoritos" element={<Favorites />} />
        <Route path="/gif/:id" element={<CardDetails />} />
        <Route path="/buscar" element={<Search />} />
        <Route path="/visitados" element={<Visited />} />
      </Routes>
    </Router>
  );
}

export default App;
