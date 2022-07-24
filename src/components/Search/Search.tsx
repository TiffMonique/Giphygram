import React, { useState } from "react";
import axios from "axios";

// const background = require("./background.png");
// import Background from '../../../src/assets/background.png';

// Chakra imports
import {
  Flex,
  IconButton,
  SimpleGrid,
  useColorModeValue,
  Input,
  InputRightElement,
  InputGroup,
  Image,
  Icon,
  FormControl,
  Box,
  Center,
  Button,
} from "@chakra-ui/react";

import { IoSearchSharp, IoHeartOutline } from "react-icons/io5";

import { SearchProps } from "./types";

function Search() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const boxBg = useColorModeValue("white !important", "#111c44 !important");
  const iconBox = useColorModeValue("gray.100", "whiteAlpha.200");
  const iconColor = useColorModeValue("brand.200", "white");

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const results = await axios(`https://api.giphy.com/v1/gifs/search`, {
        params: {
          api_key: "RUDZVfvwwZNVQVTAHDYpcIeIN0jd6h6T",
          q: search,
          limit: 100,
        },
      });
      setData(results.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // const renderGifs = () => {

  // }

  return (
    <>
      <FormControl>
        <Center>
          <InputGroup width="50%" mt="25px">
            <Input
              pr="4.5rem"
              focusBorderColor="lime"
              placeholder="Buscar Gifs"
              value={search}
              onChange={handleSearchChange}
              borderRadius="20px"
            />
            <InputRightElement>
              <IconButton
                aria-label=""
                icon={<IoSearchSharp />}
                onClick={handleSubmit}
                type="submit"
                borderRadius="20px"
              />
            </InputRightElement>
          </InputGroup>
        </Center>
      </FormControl>

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
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="40px">
                {data.map((element: SearchProps) => {
                  return (
                    <div key={element.id}>
                      <Flex
                        borderRadius="20px"
                        bg={boxBg}
                        p="20px"
                        h="345px"
                        w={{ base: "100%", sm: "345px" }}
                        alignItems="center"
                        direction="column"
                      >
                        <Flex w="100%" mb="18px">
                          <Button
                            w="38px"
                            h="38px"
                            textAlign="center"
                            justifyContent="center"
                            borderRadius="12px"
                            me="12px"
                            bg={iconBox}
                          >
                            <Icon
                              w="24px"
                              h="24px"
                              as={IoHeartOutline}
                              color={iconColor}
                            />
                          </Button>
                        </Flex>
                        <Image
                          src={element.images.fixed_height.url}
                          maxW="100%"
                          maxH="100%"
                          borderRadius="20px"
                          mb="10px"
                        />
                      </Flex>
                    </div>
                  );
                })}
              </SimpleGrid>
            </Flex>
          </Flex>
        </Box>
      </div>
    </>
  );
}

export default Search;
