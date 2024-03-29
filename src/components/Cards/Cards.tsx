/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// Chakra imports
import {
  Flex,
  Button,
  Icon,
  Image,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";

import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { CardProps } from "./types";
import { RootState } from "../../redux/store";

function Cards() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const boxBg = useColorModeValue("white !important", "#111c44 !important");
  const iconBox = useColorModeValue("gray.100", "whiteAlpha.200");
  const iconColor = useColorModeValue("brand.200", "white");
  const gifsFavorites = useSelector((state: RootState) => state.favoritesGifs);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const results = await axios("https://api.giphy.com/v1/gifs/trending", {
        params: {
          api_key: "RUDZVfvwwZNVQVTAHDYpcIeIN0jd6h6T",

        },
      });
      setData(results.data.data);
    };

    fetchData();
  }, []);

  const renderGifs = () => {
    return data.map((element: CardProps) => {
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
              transform: 'scale(1.01)',
              boxShadow: 'lg',
            }}
            boxShadow='5xl'
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
                dispatch({
                  type: "addVisitedGif",
                  payload: element,
                });
              }}
            />
          </Flex>
        </div>
      );
    });
  };

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="40px">
      {renderGifs()}
    </SimpleGrid>
  );
}

export default Cards;
