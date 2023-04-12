import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Flex,
  Stack,
  Heading,
  Image,
} from "@chakra-ui/react";
import EstatePlanItem from "./EstatePlanItem";
import { BsPersonCircle } from "react-icons/bs";
//import { beneficiaries } from "../pages/dashboard/estate-plans";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function EstatePlanDetailsModal({
  isOpen,
  onClose,
  estateItem,
}) {
  const { userBeneficiaries } = useSelector((state) => state.userBeneficiaries);
  return (
    <Modal size={"6xl"} isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg={`rgba(0,0,0,0.4)`} />
      <ModalContent fontSize="1.6rem">
        <ModalHeader
          fontFamily={"Poppins"}
          fontSize="1.8rem"
          textTransform={"capitalize"}
        >
          {estateItem.estate_plan}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs>
            <TabList fontFamily={"Poppins"} borderBottomColor={"grey"}>
              <Tab fontSize="1.6rem">Beneficiaries</Tab>
              <Tab fontSize="1.6rem">Documents</Tab>
            </TabList>

            <TabPanels fontFamily={"Poppins"}>
              <TabPanel>
                <Flex
                  flexWrap="wrap"
                  justifyContent={{ base: "space-around", lg: "space-between" }}
                  gap="2rem"
                  mt={"5rem"}
                >
                  {userBeneficiaries.map((ben, i) => (
                    <EstatePlanItem key={i} width="32.5rem">
                      <BsPersonCircle fontSize={"3rem"} color="darkgreen" />

                      <Stack spacing={"0"} ml="1rem">
                        <Heading fontFamily="Poppins" fontSize={"1.8rem"}>
                          {ben.firstname} {ben.surname}
                        </Heading>
                        <Text color={"gray"} fontSize="1.4rem">
                          {ben.beneficiary_relationship}
                        </Text>
                      </Stack>
                    </EstatePlanItem>
                  ))}
                </Flex>
              </TabPanel>
              <TabPanel>
                <div className="relative flex items-center overflow-x-auto space-x-8">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <Link
                      href={"../assets/preview-doc.png"}
                      download
                      target="_blank"
                      key={num}
                    >
                      <div className="w-[30rem] sm:w-[40rem] md:w-[60rem] h-[30.5rem] m-[1rem] bg-white flex-grow flex-shrink-0 flex-[25rem] rounded-[5px] shadow-lg transition-all duration-200 ease-in-out hover:shadow-md hover:translate-y-[-1px] overflow-hidden">
                        <Image
                          boxSize={"25rem"}
                          src={"../assets/preview-doc.png"}
                          fallbackSrc="https://via.placeholder.com/150"
                          alt="describe"
                        />

                        <p className="text-[1.4rem] pl-[1rem] font-normal">
                          Estate Plan doc
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
