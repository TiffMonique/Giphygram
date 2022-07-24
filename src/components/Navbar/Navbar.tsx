import React, { ReactNode } from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  useColorMode,
  Stack,
  Image,
} from "@chakra-ui/react";
import { BsSun, BsMoonStarsFill } from 'react-icons/bs';
import { useNavigate } from "react-router-dom";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Links = [
  {
    name: "Buscar",
    route: "/buscar",
  },
  {
    name: "Favoritos",
    route: "/favoritos",
  },
  {
    name: "Visitados",
    route: "/visitados",
  },
];

function NavLink({ children, route = "" }: { children: ReactNode; route?: string }) {
  return (
    <Link
      px={2}
      py={1}
      rounded="md"
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={route}
    >
      {children}
    </Link>
  );
}
function WithAction() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems="center">
          <Image src={require("../../assets/GIPHYGRAM.png")} width="100px" onClick={() => {
            navigate("/");
          }} cursor="pointer" />

          <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
            {Links.map((link) => (
              <NavLink route={link.route} key={link.name}>
                {link.name}
              </NavLink>
            ))}
          </HStack>
        </HStack>
        <Button
          alignItems="center"
          colorScheme="purple"
          onClick={toggleColorMode}
          color="white"
        >
          {colorMode === 'light' ? <BsMoonStarsFill /> : <BsSun />}
        </Button>
      </Flex>
      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" spacing={4}>
            {Links.map((link) => (
              <NavLink key={link.name}>{link.name}</NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
export default WithAction;
