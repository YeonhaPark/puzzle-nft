import { Flex, Grid, Spinner } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../components/Layout";
import axios from "axios";
import NftCard from "../components/NftCard";
const My: FC = () => {
  const { signer, mintContract } = useOutletContext<OutletContext>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [nfts, setNfts] = useState<OceanNftMetadata[]>([]);

  const getMetadata = async () => {
    try {
      if (!signer || !mintContract) return;
      setIsLoading(true);
      const response: bigint[] = await mintContract.balanceOfNfts(
        signer.address
      );
      setNfts(
        (
          await Promise.all(
            response.map(
              async (v: bigint, i: number): Promise<OceanNftMetadata> => {
                return {
                  ...(
                    await axios(
                      `${import.meta.env.VITE_METADATA_URI}${i + 1}.json`
                    )
                  ).data,
                  tokenId: i + 1,
                  amount: Number(v),
                };
              }
            )
          )
        ).filter((v) => v.amount)
      );
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!signer) return;
    getMetadata();
  }, [signer]);
  return (
    <Flex flexDir={"column"} w={"100%"} mb={[10, 10, 20]}>
      {isLoading ? (
        <Flex
          minH={"calc(100vh - 150px)"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Spinner
            size="xl"
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="twitter.500"
          />
        </Flex>
      ) : (
        <Grid
          gridTemplateColumns={[
            "repeat(2, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
          ]}
          columnGap={4}
          rowGap={6}
        >
          {nfts.map((nft) => (
            <NftCard
              key={nft.tokenId}
              tokenId={nft.tokenId}
              name={nft.name}
              description={nft.description}
              image={nft.image}
              amount={nft.amount}
            />
          ))}
        </Grid>
      )}
    </Flex>
  );
};

export default My;
