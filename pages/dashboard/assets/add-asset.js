import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  Flex,
  Tooltip,
  VStack,
  Stack,
  Link,
  Heading,
  Box,
  Container,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AiOutlineBank, AiOutlineQuestionCircle } from "react-icons/ai";
import { BiCaretLeft } from "react-icons/bi";
import { MdOutlineEditNote } from "react-icons/md";
import { useSelector } from "react-redux";
import MainHeader from "../../../components/MainHeader";

const assetsLink = [
  "Cash",
  "Equities",
  "Fintech Wallets",
  "Real Estate",
  "Fixed Income/Money Market",
  "Intellectual Property",
  "Alternative Assets",
  "Personal Assets",
  "Pension",
  "Life Insurance",
];

const AddAssetModal = () => {
  const { userDetails } = useSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!userDetails) {
      router.push("/login");
    }
  }, [router, userDetails]);
  return (
    userDetails && (
      <Box fontFamily={"Poppins"} bg="white">
        <MainHeader />
        <Flex fontSize={"1.4rem"} h="90vh">
          <VStack
            w={{ base: "100%", lg: "20%" }}
            pl="2rem"
            pt="2rem"
            bg="lightgrey"
            textAlign="left"
            alignItems={"flex-start"}
          >
            <Heading
              fontSize={"2.8rem"}
              pl="2rem"
              mb="1.75rem"
              fontFamily={"Poppins"}
            >
              New Asset
            </Heading>
            <Flex alignItems={"center"} mb="1.5rem">
              <Text mr={"1rem"} pl="2rem">
                Choose Category
              </Text>
              <Tooltip
                hasArrow
                label="about categories"
                bg="gray.300"
                color="black"
              >
                <span>
                  <AiOutlineQuestionCircle fontSize="1.5rem" color="grey" />
                </span>
              </Tooltip>
            </Flex>
            <Stack pl={"2rem"} fontWeight="bold" spacing="1.5rem">
              {assetsLink.map((assetLink) => (
                <Link
                  href="#"
                  key={assetLink}
                  px="1rem"
                  py="1rem"
                  borderRadius={"4px"}
                  _activeLink={{
                    bg: "lightgreen",
                    color: "darkgreen",
                  }}
                  _hover={{
                    bg: "grey",
                  }}
                >
                  {assetLink}
                </Link>
              ))}
            </Stack>
          </VStack>
          <Stack
            w={{ base: "0", lg: "80%" }}
            display={{ base: "none", lg: "initial" }}
            pl="2rem"
            pt="2rem"
          >
            <Link href="/dashboard/assets">Back</Link>
            <Stack pr="2rem" fontFamily={"Poppins"}>
              <Stack spacing={"1rem"} mb="3rem">
                <Flex alignItems={"center"} mb="rem">
                  <Heading mr={"1rem"} fontFamily={"Poppins"} fontSize="2rem">
                    Cash
                  </Heading>
                  <Tooltip
                    hasArrow
                    label="about categories"
                    bg="gray.300"
                    color="black"
                  >
                    <span>
                      <AiOutlineQuestionCircle fontSize="1.4rem" color="grey" />
                    </span>
                  </Tooltip>
                </Flex>
                <Text>Add bank accounts to your porfolio</Text>
              </Stack>

              <Flex
                justifyContent={"space-between"}
                flexDirection={{ base: "column", lg: "row" }}
              >
                <Flex
                  w={{ base: "100%", lg: "50rem" }}
                  borderRadius={"4px"}
                  border="1px"
                  borderColor={"grey"}
                  p="1rem"
                  alignItems={"center"}
                >
                  <AiOutlineBank fontSize={"5rem"} color="darkgreen" />
                  <Stack ml="2rem">
                    <Heading color={"darkgreen"} fontFamily={"Poppins"}>
                      Connect your bank
                    </Heading>
                    <Text>Syncronise directly with your portfolio</Text>
                  </Stack>
                </Flex>
                <Flex
                  w={{ base: "100%", lg: "50rem" }}
                  borderRadius={"4px"}
                  border="1px"
                  borderColor={"grey"}
                  p="1rem"
                  alignItems={"center"}
                >
                  <MdOutlineEditNote fontSize={"5rem"} color="darkgreen" />
                  <Stack ml="2rem">
                    <Heading color={"darkgreen"} fontFamily={"Poppins"}>
                      Add account manually
                    </Heading>
                    <Text>Add bank details manually</Text>
                  </Stack>
                </Flex>
              </Flex>
            </Stack>
          </Stack>
        </Flex>
      </Box>
    )
  );
};

export default AddAssetModal;
