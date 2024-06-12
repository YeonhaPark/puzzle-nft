import {
  Box,
  Button,
  Flex,
  Grid,
  Image,
  Progress,
  Text,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { OutletContext } from "../components/Layout";
import axios from "axios";
import PuzzleCard from "../components/PuzzleCard";
interface ResponseProps {
  metadata: Metadata;
  visible: boolean;
  id: number;
}
const Home: FC = () => {
  const navigate = useNavigate();
  const { signer, mintContract } = useOutletContext<OutletContext>();
  const [nfts, setNfts] = useState<ResponseProps[]>([]);
  const getCheckNfts = async () => {
    try {
      if (!mintContract || !signer) {
        return;
      }
      const response: boolean[] = await mintContract.checkNfts(signer.address);
      setNfts(
        await Promise.all(
          response.map(
            async (v: boolean, i: number): Promise<ResponseProps> => {
              return {
                metadata: (
                  await axios(
                    `${import.meta.env.VITE_METADATA_URI}${i + 1}.json`
                  )
                ).data,
                id: i,
                visible: v,
              };
            }
          )
        )
      );
    } catch (error) {
      console.error(error);
    }
  };
  const getProgressValue = () => {
    const val =
      nfts.reduce((acc, cur) => {
        acc += cur.visible ? 1 : 0;
        return acc;
      }, 0) / 16;
    return val * 100;
  };
  useEffect(() => {
    getCheckNfts();
  }, [signer, mintContract]);
  return (
    <Flex flexDir={"column"} w={"100%"}>
      <Flex
        className="italic-font"
        bgColor="blue.300"
        h={[28, 28, 40]}
        justifyContent="center"
        p={"32px 24px"}
        flexDir={"column"}
        alignItems="center"
        fontSize={[20, 20, 36]}
      >
        ⛔️ COMPLETE THE PUZZLE
        <br />
        AND SAVE THE OCEAN! ⛔️
        <Button
          mt={2}
          p={"4px 14px"}
          bgColor={"blue.100"}
          colorScheme="dark"
          variant="outline"
          onClick={() => navigate("/mint")}
        >
          SAVE
        </Button>
      </Flex>
      <Box p={4}>
        <Text mb={2} className="italic-font">
          Your progress: {getProgressValue()}%
        </Text>
        <Progress
          aria-valuenow={getProgressValue()}
          value={getProgressValue()}
          role="progressbar"
        />
      </Box>
      <Box px={4}>
        {signer ? (
          <Grid templateColumns={"repeat(4, 1fr)"}>
            {nfts?.map((nft, i) => (
              <PuzzleCard key={i} id={nft.id} visible={nft.visible} />
            ))}
          </Grid>
        ) : (
          <Box pos="relative">
            <Box
              pos="absolute"
              top={0}
              left={0}
              w={"100%"}
              h={"100%"}
              bgColor="rgba(0, 0, 0, 0.5)"
            ></Box>
            <Image src="/images/save_the_sea.webp" alt="save the ocean" />
          </Box>
        )}
      </Box>
    </Flex>
  );
};

export default Home;
