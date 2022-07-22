// Chakra imports

import { Box, Button, Flex, useColorMode } from '@chakra-ui/react'
import React from 'react'

//Assets
import Background from './assets/background.png'

// Component Import
import Cards from './components/Cards/Cards.tsx'
import Navbar from './components/Navbar/Navbar.tsx'
function App() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Box h="100%" w="100%">
      <Navbar />

      <Flex
        flexDirection="row"
        maxW="90%"
        px="10px"
        my="30px"
        mx="auto"
        bgImage={Background}
        bgSize="cover"
        py="50px"
        borderRadius="20px"
      >
        <Flex direction={{ base: 'row', xl: 'row' }} mx="auto" rowGap="20px" columnGap="20px">
          <Cards />
        </Flex>

        {/* <Flex mx="auto" mt="40px">
          <Text fontSize="xl" color="white" textAlign="center" px="30px">
            More free awesome cards like this can be found{" "}
            <Link
              fontWeight="bold"
              textDecoration="underline"
              href="https://horizon-ui.com/?ref=blog-simmmple"
            >
              here!
            </Link>
          </Text>
        </Flex> */}
      </Flex>
    </Box>
  )
}

export default App
