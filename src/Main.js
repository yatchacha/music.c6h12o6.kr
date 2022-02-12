import React, { ReactNode, useState, useEffect } from 'react';
import {
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  Badge,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  ButtonGroup,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiSearch
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import Music from './Components/Music';
// import { calcRelativeAxisPosition } from 'framer-motion/types/projection/geometry/delta-calc';
import axios from 'axios';

// interface LinkItemProps {
//   name: string;
//   icon: IconType;
// }
// const LinkItems: Array<LinkItemProps> = [
//   { name: 'Home', icon: FiHome },
//   { name: 'Trending', icon: FiTrendingUp },
//   { name: 'Explore', icon: FiCompass },
//   { name: 'Favourites', icon: FiStar },
//   { name: 'Settings', icon: FiSettings },
// ];
const apiBaseURL = "https://api.c6h12o6.kr";

export default function SimpleSidebar({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [musicItems, setMusicItems] = useState([{"idx": 1}]);

  useEffect(() => {
    loadAPI();
  }, [])

  function loadAPI() {
    axios
      .get(apiBaseURL + "/music")
      .then((Response)=>{
        if (Response.data.code === 'SUCCESS') {
          // console.log(Response.data.data.data);
          setMusicItems(Response.data.data.data);
        }
      })
    // console.log(dt);
  }

  // useEffect


  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Flex justifyContent="center" flexDirection="row" flexWrap="wrap">
          {
            musicItems.map(item => {
              return <Music apiData={item} key={item.idx}></Music>;
            })
          }
          {/* <Music coverURL="dd"></Music>
          <Music></Music>
          <Music></Music>
          <Music></Music>
          <Music></Music>
          <Music></Music>
          <Music></Music>
          <Music></Music>
          <Music></Music>
          <Music></Music>
          <Music></Music>
          <Music></Music>
          <Music></Music>
          <Music></Music>
          <Music></Music>
          <Music></Music> */}

        </Flex>
      </Box>
    </Box>
  );
}

// interface SidebarProps extends BoxProps {
//   onClose: () => void;
// }

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Flex alignItems="center">
          <Image src='https://static-cdn.jtvnw.net/emoticons/v2/304434784/static/light/2.0' alt='C6H12O6' marginRight={2} width={30} />
          <Text fontSize="2xl" fontFamily="PT Sans" fontWeight="bold">
            Music
          </Text>
          <Badge colorScheme='purple' ml={1}>Beta</Badge>
        </Flex>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>


      <Flex mx="8">
        <InputGroup>
          <InputLeftElement
            pointerEvents='none'
            children={<FiSearch color='gray.300' />}
          />
          <Input placeholder='Search' />
        </InputGroup>
      </Flex>

      {/* <Flex h="20" mx="8" mt="4">
        <Text fontSize={12} mb='8px'>카테고리</Text>
      </Flex> */}




      {/* {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))} */}
    </Box>
  );
};

// interface NavItemProps extends FlexProps {
//   icon: IconType;
//   children: ReactText;
// }
const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

// interface MobileProps extends FlexProps {
//   onOpen: () => void;
// }
const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="space-between"
      {...rest}>

      <Flex alignItems="center">
        <Image src='https://static-cdn.jtvnw.net/emoticons/v2/304434784/static/light/2.0' alt='C6H12O6' marginRight={2} width={30} />
        <Text fontSize="2xl" fontFamily="PT Sans" fontWeight="bold">
          Music
        </Text>
        <Badge colorScheme='purple' ml={1}>Beta</Badge>
      </Flex>

      {/* <Text fontSize="2xl" ml="8" fontFamily="PT Sans" fontWeight="bold">
        Music
      </Text> */}

      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiSearch />}
      />
    </Flex>
  );
};