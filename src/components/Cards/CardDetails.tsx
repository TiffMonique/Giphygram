// eslint-disable-next-line import/no-anonymous-default-export
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Image, Text, Container, Icon, Button, useColorModeValue, Wrap } from "@chakra-ui/react";
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
    <Container bg='blue.600' color='white' pb="50px">
      <Wrap spacing='30px' align='center' w="100%" h="100%">
        <Text fontSize="lg">{title}</Text>
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
        <Image src={images?.fixed_height?.url} w="200%" h="200%" />
      </Wrap>

    </Container>

  );
}

export default CardDetails;
