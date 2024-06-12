import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";
interface MintModalProps {
  isOpen: boolean;
  onClose: () => void;
  oceanMetadata: OceanNftMetadata;
}
const MintModal: FC<MintModalProps> = ({ isOpen, onClose, oceanMetadata }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          bgColor={"twitter.900"}
          textColor={"white"}
          fontWeight={"500"}
        >
          Minting Success!
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex
            flexDir="column"
            alignItems={"center"}
            mt={[2, 2, 4]}
            gap={[2, 2, 3]}
          >
            <Box alignSelf={"start"}>
              <Text fontSize={[20, 20, 24]}>{oceanMetadata.name}</Text>
              <Text
                display={"inline-block"}
                fontSize={[12, 12, 14]}
                bgColor={"gray.100"}
                borderRadius={14}
                padding={"2px 4px"}
              >
                amount: {oceanMetadata.amount}
              </Text>
            </Box>
            <Flex
              mt={4}
              width={"100%"}
              flexDir={"column"}
              alignItems={"center"}
            >
              <Image
                src={`/images/puzzle/${oceanMetadata.tokenId}.png`}
                alt={oceanMetadata.name}
              />
              <Text mt={[2, 2, 4]}>{oceanMetadata.description}</Text>
            </Flex>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MintModal;
