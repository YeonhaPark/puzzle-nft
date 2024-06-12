import {
  Button,
  Flex,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../components/Layout";
import useWalletLogin from "../hooks/useWalletLogin";
import axios from "axios";
import MintModal from "../components/MintModal";

const Mint: FC = () => {
  const { signer, setSigner, mintContract } = useOutletContext<OutletContext>();
  const onClickMetamask = useWalletLogin(setSigner);
  const [tokenId, setTokenId] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [isMinting, setIsMinting] = useState<boolean>(false);
  const [oceanMetadata, setOceanMetadata] = useState<OceanNftMetadata>({
    name: "",
    description: "",
    image: "",
    amount: 0,
    tokenId: 0,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const onClickMint = async () => {
    try {
      if (!tokenId || !amount)
        throw new Error("Please introduce both tokenID and amount");
      setIsMinting(true);
      await mintContract.mintNft(tokenId, amount);
      const axiosResponse = await axios(
        `${import.meta.env.VITE_METADATA_URI}${tokenId}.json`
      );
      setOceanMetadata({ ...axiosResponse.data, tokenId, amount });
      onOpen();
    } catch (e) {
      console.error(e);
    } finally {
      setIsMinting(false);
    }
  };
  return (
    <Flex
      bgColor={"facebook.300"}
      flexDir="column"
      w="100%"
      mb={[10, 10, 20]}
      justifyContent="center"
      alignItems="center"
    >
      <Text fontSize={[24, 24, 32]} fontWeight={"semibold"} mb={8}>
        🐬 Create NFTs
      </Text>
      {signer ? (
        <Flex alignItems={"center"} flexDir={"column"} gap={[4, 4, 8]} mb={16}>
          <Flex flexDir={"column"} gap={2}>
            <Text fontSize={[16, 16, 24]} fontWeight={"500"}>
              NFT ID
            </Text>
            <NumberInput
              value={tokenId}
              size={["md", "md", "lg"]}
              onChange={(v) => setTokenId(Number(v))}
              defaultValue={0}
              min={0}
              max={16}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Text fontSize={[16, 16, 24]} fontWeight={"500"}>
              AMOUNT
            </Text>
            <NumberInput
              value={amount}
              size={["md", "md", "lg"]}
              onChange={(v) => setAmount(Number(v))}
              defaultValue={0}
              min={0}
              max={100}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Flex>
          <Button
            onClick={onClickMint}
            size={["md", "md", "lg"]}
            textColor={"blue.500"}
            isDisabled={isMinting || tokenId === 0 || amount === 0}
            isLoading={isMinting}
            loadingText="MINTING..."
          >
            Mint
          </Button>
        </Flex>
      ) : (
        <Flex flexDir={"column"} gap={[4, 4, 8]} alignItems={"center"}>
          <Text>🐠 Login</Text>
          <Button bgColor="transparent" onClick={onClickMetamask}>
            <Image
              src="/images/metamask.svg"
              alt="Metamask Login"
              w={10}
              mr={2}
              h={10}
            />
            LOGIN
          </Button>
        </Flex>
      )}
      <MintModal
        isOpen={isOpen}
        onClose={onClose}
        oceanMetadata={oceanMetadata}
      />
    </Flex>
  );
};

export default Mint;
