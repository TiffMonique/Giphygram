// eslint-disable-next-line import/no-anonymous-default-export
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Image, Text, SimpleGrid, Center } from "@chakra-ui/react";

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
  const { id } = useParams();
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
    <Center>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing="40px">
        <Image src={images?.fixed_height?.url} />
        <Text fontSize="lg">{title}</Text>
      </SimpleGrid>
    </Center>
  );
}

export default CardDetails;
