import { Flex } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { JsonRpcSigner } from "ethers";
import { Contract } from "ethers";
import { mintContractAddress } from "../lib/contractAddress";
import mintContractAbi from "../lib/mintContractAbi.json";

export interface OutletContext {
  mintContract: Contract;
  signer: JsonRpcSigner;
}
const Layout: FC = () => {
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [mintContract, setMintContract] = useState<Contract | null>(null);

  useEffect(() => {
    if (!signer) return;
    setMintContract(new Contract(mintContractAddress, mintContractAbi, signer));
  }, [signer]);

  return (
    <Flex maxW={768} minH={"100vh"} marginX={"auto"} flexDir={"column"}>
      <Header signer={signer} setSigner={setSigner} />
      <Flex flexGrow={1}>
        <Outlet context={{ signer, mintContract }} />
      </Flex>
    </Flex>
  );
};

export default Layout;
