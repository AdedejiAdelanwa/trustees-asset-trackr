import {
  Button,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
//import Image from "next/image";
import React from "react";
import Writer from "../public/assets/will-writer.png";

export default function SimpleWillCard({ estatePlan }) {
  const estatePlanItemModal = useDisclosure();
  //const { estate_plan, details } = estatePlan;
  const handleEstatePlanItemShow = (i) => {
    // setEstatePlan(estatePlans[i]);
    estatePlanItemModal.onOpen();
  };
  return (
    <>
      <div className="h-[38rem] w-[35rem]  sm:w-[40rem] md:w-[60rem] h-[30.5rem] m-[1rem]  bg-white flex-grow flex-shrink-0 flex-[25rem] rounded-[5px] shadow-lg transition-all duration-200 ease-in-out hover:shadow-md hover:translate-y-[-1px] overflow-hidden">
        <Image
          height="120px"
          width="100%"
          src={estatePlan.image.src || Writer}
          alt="describe"
        />
        <div className="p-[1.8rem]">
          <h5 className="text-[2rem] uppercase">{estatePlan.name}</h5>
          <Text fontSize="1.4rem" noOfLines={3}>
            {estatePlan.details}
          </Text>
          <Button paddingLeft="0" onClick={() => handleEstatePlanItemShow()}>
            Learn More
          </Button>
        </div>
      </div>
      <Modal
        size={"4xl"}
        isOpen={estatePlanItemModal.isOpen}
        onClose={estatePlanItemModal.onClose}
        isCentered
      >
        <ModalOverlay bg={`rgba(0,0,0,0.4)`} />
        <ModalContent fontSize="1.6rem" py="1.5rem">
          <ModalHeader
            fontFamily={"Poppins"}
            fontSize="1.8rem"
            textTransform={"capitalize"}
          >
            {estatePlan.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            px="1.5rem"
            textTransform="lowercase"
            fontFamily={"Poppins"}
          >
            <Text mb="1rem">{estatePlan.details}</Text>
            <Link
              href={estatePlan.actionUrl}
              isExternal
              _hover={{
                textDecoration: "none",
              }}
            >
              <Button
                bg={"darkgreen"}
                colorScheme={"darkgreen"}
                className="py-[1rem] px-[2rem]"
                size="lg"
                fontSize="1.6rem"
              >
                Sign up
              </Button>
            </Link>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
