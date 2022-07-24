import React from "react";
import { useNavigate } from "react-router-dom";
// Chakra imports
import {
  Flex,
  Button,
  Icon,
  Image,
  useColorModeValue,
  SimpleGrid,
  Box,
} from "@chakra-ui/react";
import { IoClose, IoHeartSharp, IoHeartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { CardProps } from "../Cards/types";
import { RootState } from "../../redux/store";

function Visited() {
  const gifsFavorites = useSelector((state: RootState) => state.favoritesGifs);
  const boxBg = useColorModeValue("white !important", "#111c44 !important");
  const iconBox = useColorModeValue("gray.100", "whiteAlpha.200");
  const iconColor = useColorModeValue("brand.200", "white");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const gifs = useSelector((state: RootState) => state.visitedGifs);
  return (
    <>
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
              {gifs?.map((element: CardProps) => {
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
                      _hover={{
                        transform: 'scale(1.05)',
                        boxShadow: 'lg',
                      }}
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
                          onClick={() => {
                            dispatch({ type: "deleteVisitedGif", payload: element });
                          }}
                        >
                          <Icon
                            w="24px"
                            h="24px" as={IoClose} color={iconColor} />
                        </Button>
                        <Button
                          w="38px"
                          h="38px"
                          textAlign="center"
                          justifyContent="center"
                          borderRadius="12px"
                          me="12px"
                          bg={iconBox}
                          onClick={() => {
                            if (gifsFavorites.find((item) => element.id === item.id)) {
                              dispatch({ type: "deletFavoritedGif", payload: element });
                            } else {
                              dispatch({ type: "addFavoritedGif", payload: element })
                            }
                          }}
                        >
                          <Icon w="24px" h="24px" as={gifsFavorites.find((item) => element.id === item.id) ? IoHeartSharp : IoHeartOutline} color={iconColor} />
                        </Button>
                      </Flex>
                      <Image
                        src={element.images.fixed_height.url}
                        maxW="100%"
                        maxH="100%"
                        borderRadius="20px"
                        mb="10px"
                        cursor="pointer"
                        className="gif"
                        onClick={() => {
                          navigate(`/gif/${element.id}`);
                        }}
                      />
                    </Flex>
                  </div>
                );
              })}
            </SimpleGrid>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default Visited;
