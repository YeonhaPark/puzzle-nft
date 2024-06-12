import { Box, Flex, GridItem, Image, Text } from "@chakra-ui/react";
import { FC } from "react";

const NftCard: FC<OceanNftMetadata> = ({
  name,
  description,
  amount,
  tokenId,
}) => {
  return (
    <GridItem padding={"12px 8px"}>
      <Flex flexDir={"column"}>
        <Flex
          flexDir="column"
          alignItems={"center"}
          mt={[2, 2, 4]}
          gap={[2, 2, 3]}
        >
          <Box alignSelf={"start"}>
            <Text fontSize={[12, 12, 16]}>{name}</Text>
            <Text
              display={"inline-block"}
              fontSize={[10, 10, 12]}
              bgColor={"gray.100"}
              borderRadius={14}
              padding={"2px 4px"}
            >
              amount: {amount}
            </Text>
          </Box>
          <Flex mt={4} width={"100%"} flexDir={"column"} alignItems={"center"}>
            <Image src={`/images/puzzle/${tokenId}.png`} alt={name} />
            <Text mt={[2, 2, 4]}>{description}</Text>
          </Flex>
        </Flex>
      </Flex>
    </GridItem>
  );
};

export default NftCard;
