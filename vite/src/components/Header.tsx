import {
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
const Header: FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  return (
    <Flex alignItems={"center"} justifyContent={"space-between"} h={20} px={4}>
      <Flex w={40} fontSize={20} fontWeight={"semibold"} alignItems={"center"}>
        Save the Ocean
      </Flex>
      <Flex display={["none", "none", "flex"]} gap={8} alignItems={"center"}>
        <Button
          h={"fit-content"}
          padding={"8px 12px"}
          variant={"link"}
          textColor={"white"}
          bgColor="blue.500"
        >
          Home
        </Button>
        <Button
          h={"fit-content"}
          padding={"8px 12px"}
          variant={"link"}
          textColor={"white"}
          bgColor="blue.500"
        >
          Mint
        </Button>

        <Button
          h={"fit-content"}
          padding={"8px 12px"}
          variant={"link"}
          textColor={"white"}
          bgColor="blue.500"
        >
          Sales
        </Button>
      </Flex>
      <Flex w={40} alignItems={"center"} justifyContent={"end"}>
        <Button colorScheme="transparent">
          <Image
            src="/images/metamask.svg"
            alt="Metamask Login"
            w={12}
            h={12}
          />
        </Button>
      </Flex>
      <Flex display={["flex", "flex", "none"]}>
        <Menu>
          <MenuButton
            textColor={"blue.500"}
            borderColor={"blue.400"}
            borderWidth={"3px"}
            bgColor={"white"}
            fontWeight={"semibold"}
            as={Button}
            rightIcon={<ChevronDownIcon />}
          >
            Actions
          </MenuButton>
          <MenuList>
            <MenuItem>{isLoggedIn ? "Logout" : "Login"}</MenuItem>
            <MenuItem>Create a Copy</MenuItem>
            <MenuItem>Mark as Draft</MenuItem>
            <MenuItem>Delete</MenuItem>
            <MenuItem>Attend a Workshop</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default Header;
