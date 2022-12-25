import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import styled from "styled-components";
import DashBoardContainer from "../../components/DashboardLayout";
import MainHeader from "../../components/MainHeader";
import SideNav from "../../components/SideNavigation";
import Lego from "../../public/assets/user-icon.png";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import AuthWrapper from "../../components/AuthWrapper";

const FormWrapper = styled.form`
  label {
    display: block;
    cursor: pointer;
  }
  label.upload-label {
    color: green;
    font-weight: bold;
  }
  label:hover {
    color: black;
  }
  #upload-photo {
    opacity: 0;
    position: absolute;
    z-index: -1;
  }
`;

export default function Settings() {
  const { userDetails } = useSelector((state) => state.user);
  const userToken = JSON.parse(localStorage.getItem("userToken"));
  const router = useRouter();

  useEffect(() => {
    if (!userToken) {
      router.push("/login");
    }
  }, [router, userToken]);
  return (
    userDetails && (
      <section className="main-content">
        <h2 className="text-[2.8rem] font-bold">Settings</h2>
        <Tabs mt={"3rem"} fontSize="1.6rem">
          <TabList borderBottomColor={"grey"}>
            <Tab
              _selected={{ color: "green", borderBottomColor: "green" }}
              fontSize="1.6rem"
            >
              Profile
            </Tab>
            <Tab
              _selected={{ color: "green", borderBottomColor: "green" }}
              fontSize="1.6rem"
            >
              Security
            </Tab>
            <Tab
              _selected={{ color: "green", borderBottomColor: "green" }}
              fontSize="1.6rem"
            >
              Verify Identity
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Box>
                <HStack mt="2rem">
                  <Image
                    borderRadius={"full"}
                    boxSize={{ base: "8rem", lg: "15rem" }}
                    src="https://bit.ly/dan-abramov"
                    alt="user"
                    mr="1rem"
                  />
                  <Stack>
                    <FormWrapper>
                      <label htmlFor="upload-photo" className="upload-label">
                        Change Image
                        <input
                          type={"file"}
                          name="user-photo"
                          accept={[".png,.jpg,.jpeg"]}
                          id="upload-photo"
                        />
                      </label>
                      <Button
                        variant={"unstyled"}
                        color="red"
                        fontSize={"1.5rem"}
                      >
                        Delete Image
                      </Button>
                    </FormWrapper>
                  </Stack>
                </HStack>
                <Stack mt="3rem" spacing={"2rem"}>
                  <FormControl w={{ base: "100%", lg: "40rem" }}>
                    <FormLabel fontSize={"1.6rem"}>First Name</FormLabel>
                    <Input
                      type="text"
                      value={userDetails.othernames}
                      readOnly
                      fontSize={"1.6rem"}
                      bg={"grey"}
                      border="none"
                      py={"2rem"}
                      disabled
                    />
                  </FormControl>
                  <FormControl w={{ base: "100%", lg: "40rem" }}>
                    <FormLabel fontSize={"1.6rem"}>Last Name</FormLabel>
                    <Input
                      type="text"
                      value={userDetails.surname}
                      readOnly
                      fontSize={"1.6rem"}
                      bg={"grey"}
                      border="none"
                      py={"2rem"}
                      disabled
                    />
                  </FormControl>
                  <Button
                    bg={"darkgreen"}
                    color="white"
                    w="10rem"
                    fontSize={"1.6rem"}
                    py="2rem"
                  >
                    Save
                  </Button>
                </Stack>
              </Box>
            </TabPanel>
            <TabPanel>
              <Box w={{ base: "100%", lg: "53rem" }}>
                <Heading fontFamily={"Poppins"}>Contact info</Heading>
                <Text>
                  Change the information we use to contact you.<br></br> Please
                  note that this will also change the email you use to sign in.
                </Text>
              </Box>

              <Box>
                <Stack mt="3rem" spacing={"2rem"}>
                  <FormControl w={{ base: "100%", lg: "40rem" }}>
                    <FormLabel fontSize={"1.6rem"}>Email</FormLabel>
                    <Input
                      type="email"
                      placeholder="labake@mail.com"
                      fontSize={"1.6rem"}
                      bg={"grey"}
                      border="none"
                      py={"2rem"}
                    />
                  </FormControl>
                  <FormControl w={{ base: "100%", lg: "40rem" }}>
                    <FormLabel fontSize={"1.6rem"}>Phone Number</FormLabel>
                    <Input
                      type="tel"
                      placeholder="+2348123456789"
                      fontSize={"1.6rem"}
                      bg={"grey"}
                      border="none"
                      py={"2rem"}
                    />
                  </FormControl>
                  <Button
                    bg={"darkgreen"}
                    color="white"
                    w="10rem"
                    fontSize={"1.6rem"}
                    py="2rem"
                  >
                    Save
                  </Button>
                </Stack>
              </Box>
              <Box mt="2rem">
                <Heading fontFamily={"Poppins"}>Password</Heading>
                <Text>Reset your password.</Text>
              </Box>
              <VStack alignItems={"flex-start"} mt="2rem">
                <Link href="/resetpassword">
                  <Button
                    bg={"white"}
                    color="darkgreen"
                    fontSize={"1.6rem"}
                    borderWidth={"1px"}
                    borderColor={"darkgreen"}
                    py="2rem"
                    px="2rem"
                  >
                    Reset Password
                    <MdOutlineKeyboardArrowRight fontSize={"1.8rem"} />
                  </Button>
                </Link>
              </VStack>
            </TabPanel>
            <TabPanel>
              <Box w={{ base: "100%", lg: "57rem" }} mt="2rem">
                <Heading fontFamily={"Poppins"}>BVN</Heading>
                <Text>
                  Enter your bank verification number. If you don’t have it,
                  dial *565*0# or contact your bank.
                </Text>
              </Box>

              <Box>
                <Flex
                  w={{ base: "100%", lg: "57rem" }}
                  justifyContent={{ base: "space-around", lg: "space-between" }}
                  alignItems={{ base: "flex-start", lg: "flex-end" }}
                  flexDirection={{ base: "column", lg: "row" }}
                  mt="3rem"
                >
                  <FormControl
                    w={{ base: "100%", lg: "40rem" }}
                    mr={{ base: "0", lg: "1.5rem" }}
                    mb={{ base: "1.5rem", lg: "0" }}
                  >
                    <FormLabel fontSize={"1.6rem"}>Enter BVN</FormLabel>
                    <Input
                      type="number"
                      fontSize={"1.6rem"}
                      bg={"grey"}
                      border="none"
                      py={"2rem"}
                    />
                  </FormControl>

                  <Button
                    bg={"darkgreen"}
                    color="white"
                    w="10rem"
                    fontSize={"1.6rem"}
                    py="2rem"
                  >
                    Submit
                  </Button>
                </Flex>
              </Box>
              <Box mt="2rem" w={{ base: "100%", lg: "52rem" }}>
                <Heading fontFamily={"Poppins"}>Identification</Heading>
                <Text>
                  You’ll need to upload a valid means of Identification so we
                  know its you. Select from the list and upload the
                  corresponding document.
                </Text>
              </Box>
              <VStack alignItems={"flex-start"} mt="2rem">
                <Button
                  bg={"darkgreen"}
                  color="white"
                  fontSize={"1.6rem"}
                  borderWidth={"1px"}
                  py="2rem"
                  px="2.5rem"
                >
                  Upload
                </Button>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </section>
    )
  );
}
Settings.getLayout = function getLayout(page) {
  return (
    <AuthWrapper>
      <DashBoardContainer>
        <MainHeader />
        <SideNav />
        {page}
      </DashBoardContainer>
    </AuthWrapper>
  );
};
