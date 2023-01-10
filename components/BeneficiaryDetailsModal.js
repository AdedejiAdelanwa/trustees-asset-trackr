import {
  Box,
  Flex,
  Heading,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { RiFileList3Line } from "react-icons/ri";
import { estateplanList } from "../pages/dashboard/estate-plans";
import EstatePlanItem from "./EstatePlanItem";

const BeneficiaryDetailsModal = ({ isOpen, onClose, beneficiaryItem }) => {
  const calculateAge = (dateOfBirth) => {
    const dateStrip = dateOfBirth.split("T")[0].split("-");
    const dateDiff = new Date(
      Date.now() - new Date(dateStrip[0], dateStrip[1], dateStrip[2]).getTime()
    );
    return Math.abs(dateDiff.getUTCFullYear() - 1970);
  };

  return (
    <Modal size={"6xl"} isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg={`rgba(0,0,0,0.25)`} />
      <ModalContent fontSize="1.6rem">
        <ModalHeader
          fontFamily={"Poppins"}
          fontSize="1.8rem"
          textTransform={"capitalize"}
        >
          Beneficiary
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack
            spacing={"1.5rem"}
            mt="1rem"
            alignItems="left"
            overflowY={"auto"}
            height="40rem"
            pos={"relative"}
          >
            <Box fontSize={"1.6rem"} fontFamily="Poppins">
              <Heading fontSize={"1.6rem"} fontFamily="Poppins">
                Name
              </Heading>
              <Text>
                {beneficiaryItem.firstname} {beneficiaryItem.surname}
              </Text>
            </Box>
            <Box fontSize={"1.6rem"} fontFamily="Poppins">
              <Heading fontSize={"1.6rem"} fontFamily="Poppins">
                Age
              </Heading>
              <Text>{calculateAge(beneficiaryItem.dob)} year(s)</Text>
            </Box>
            <Box fontSize={"1.6rem"} fontFamily="Poppins">
              <Heading fontSize={"1.6rem"} fontFamily="Poppins">
                Address
              </Heading>
              <Text>{beneficiaryItem.address} year(s)</Text>
            </Box>
            <Heading fontSize={"1.6rem"} fontFamily="Poppins">
              Affiliated Estate Plans
            </Heading>
            <Flex
              flexWrap="wrap"
              justifyContent={{ base: "space-around", lg: "space-between" }}
              gap="2rem"
            >
              {estateplanList.map((item, i) => (
                <EstatePlanItem key={i} width="30rem">
                  <RiFileList3Line fontSize={"2.5rem"} color="darkgreen" />

                  <Stack spacing={"0"} ml="1rem">
                    <Heading fontFamily={"Poppins"} fontSize="2rem">
                      {item.name}
                    </Heading>
                    <Text color={"gray"} fontSize="1.4rem">
                      {item.status}
                    </Text>
                  </Stack>
                </EstatePlanItem>
              ))}
            </Flex>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default BeneficiaryDetailsModal;
