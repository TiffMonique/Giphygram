// eslint-disable-next-line import/no-anonymous-default-export
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Image, Text, Icon, Button, useColorModeValue, Flex, Box } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { RootState } from "../../redux/store";

export type CardsDetails = {
  id: string;
  title: string;
  images: {
    fixed_height: {
      url: string;
    };
  };
};

function CardDetails() {
  const iconBox = useColorModeValue("gray.100", "whiteAlpha.200");
  const gifsFavorites = useSelector((state: RootState) => state.favoritesGifs);
  const iconColor = useColorModeValue("brand.200", "white");
  const boxBg = useColorModeValue("white !important", "#111c44 !important");
  const { id } = useParams();
  const dispatch = useDispatch();
  const [fetchData, updateFetchData] = useState<CardsDetails>(
    {} as CardsDetails,
  );
  const { title, images } = fetchData;

  const api = `https://api.giphy.com/v1/gifs/${id}`;

  useEffect(() => {
    const fetchDatas = async () => {
      const results = await axios(api, {
        params: {
          api_key: "RUDZVfvwwZNVQVTAHDYpcIeIN0jd6h6T",
          limit: 100,
        },
      });
      updateFetchData(results.data.data);
    };

    fetchDatas();
  }, []);

  return (
    <Box h="100%" w="100%">
      <Flex
        flexDirection="row"
        px="10px"
        my="30px"
        mx="auto"
        py="50px"
        borderRadius="20px"
      >
        <Flex
          direction={{ base: "row", xl: "row" }}
          mx="auto"
        >
          <Flex
            borderRadius="20px"
            bg={boxBg}
            p="20px"
            h="100%"
            w={{ base: "415px", md: "765px" }}
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
                onClick={() => {
                  if (gifsFavorites.find((item) => fetchData.id === item.id)) {
                    dispatch({ type: "deletFavoritedGif", payload: fetchData });
                  } else {
                    dispatch({ type: "addFavoritedGif", payload: fetchData })
                  }
                }}
              >
                <Icon w="24px" h="24px" as={gifsFavorites.find((item) => fetchData.id === item.id) ? IoHeartSharp : IoHeartOutline} color={iconColor} />
              </Button>
            </Flex>
            <Image src={images?.fixed_height?.url} w="200%" h="100%" />
            <Text fontSize="lg">{title}</Text>
          </Flex>

        </Flex>
      </Flex>
    </Box >
  );
}

export default CardDetails;
