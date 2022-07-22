import React, { useEffect, useState } from "react";
import axios from "axios";


// Chakra imports
import {
  Flex,
  Button,
  Icon,
  Image,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";
// Assets

import { IoHeartOutline } from "react-icons/io5";

const Cards = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  
  let boxBg = useColorModeValue("white !important", "#111c44 !important");
  let iconBox = useColorModeValue("gray.100", "whiteAlpha.200");
  let iconColor = useColorModeValue("brand.200", "white");

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const results = await axios("https://api.giphy.com/v1/gifs/trending", {
          params: {
            api_key: "RUDZVfvwwZNVQVTAHDYpcIeIN0jd6h6T",
            limit: 100,
          },
        });

        console.log(results);
        setData(results.data.data);
      } catch (err) {
        setIsError(true);
        setTimeout(() => setIsError(false), 4000);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const renderGifs =()=>{
    return data.map((element) => {
      return (
          <div key={element.id} className="gif">
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

      
      )
    });
  }

  return (
    <SimpleGrid columns={{base:1, md:2, lg:3}} spacing="40px">
      
     {renderGifs()}
    </SimpleGrid>
   
  );
};

export default Cards;
