import {
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction } from "react";

import { ChevronDownIcon } from "@chakra-ui/icons";
import { ethers, JsonRpcSigner } from "ethers";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  signer: JsonRpcSigner | null;
  setSigner: Dispatch<SetStateAction<JsonRpcSigner | null>>;
}

const Header: FC<HeaderProps> = ({ signer, setSigner }) => {
  const navigate = useNavigate();

  const onClickMetamask = async () => {
    try {
      if (!window.ethereum) return;
      const provider = new ethers.BrowserProvider(window.ethereum);
      setSigner(await provider.getSigner());
    } catch (e) {
      console.error(e);
    }
  };

  const onClickLogout = () => {
    setSigner(null);
  };
  return (
    <Flex alignItems={"center"} justifyContent={"space-between"} h={20} px={4}>
      <Flex
        w={40}
        fontSize={20}
        onClick={() => navigate("/")}
        fontWeight={"semibold"}
        alignItems={"center"}
      >
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
      <Flex
        display={["none", "none", "flex"]}
        w={40}
        alignItems={"center"}
        justifyContent={"end"}
      >
        {signer ? (
          <Button
            onClick={onClickLogout}
            textColor={"blue.500"}
          >{`${signer.address.substring(0, 6)}...${signer.address.substring(
            signer.address.length - 4
          )}`}</Button>
        ) : (
          <Button onClick={onClickMetamask} bgColor="transparent">
            <Image
              src="/images/metamask.svg"
              alt="Metamask Login"
              w={10}
              mr={2}
              h={10}
            />
            LOGIN
          </Button>
        )}
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
            {signer
              ? `${signer.address.substring(0, 6)}...${signer.address.substring(
                  signer.address.length - 4
                )}`
              : "Menu"}
          </MenuButton>
          <MenuList>
            {!signer && (
              <MenuItem onClick={onClickMetamask}>
                <Image
                  mr={2}
                  src="/images/metamask.svg"
                  alt="METAMASK login"
                  w={6}
                  h={6}
                />{" "}
                METAMASK LOGIN
              </MenuItem>
            )}
            <MenuItem>Create a Copy</MenuItem>
            <MenuItem>Mark as Draft</MenuItem>
            <MenuItem>Delete</MenuItem>
            {signer && <MenuItem onClick={onClickLogout}>LOGOUT</MenuItem>}
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default Header;
