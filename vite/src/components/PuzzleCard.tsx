import { Box, GridItem, Image } from "@chakra-ui/react";
import { FC } from "react";

interface PuzzleCardProps {
  number: number;
  id: number;
}
const PuzzleCard: FC<PuzzleCardProps> = ({ id, number }) => {
  return (
    <GridItem position={"relative"}>
      {!number && (
        <Box
          pos="absolute"
          top={0}
          left={0}
          w={"100%"}
          h={"100%"}
          bgColor="rgba(0, 0, 0, 0.5)"
        ></Box>
      )}
      <Image src={`/images/puzzle/${id + 1}.png`} />
    </GridItem>
  );
};

export default PuzzleCard;
