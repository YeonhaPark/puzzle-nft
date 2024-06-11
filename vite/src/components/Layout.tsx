import { Flex } from "@chakra-ui/react";
import { FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout: FC = () => {
  return (
    <Flex maxW={768} minH={"100vh"} marginX={"auto"} flexDir={"column"}>
      <Header />
      <Flex flexGrow={1}>
        <Outlet />
      </Flex>
    </Flex>
  );
};

export default Layout;
