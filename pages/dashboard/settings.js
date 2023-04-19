import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import styled from "styled-components";
import DashBoardContainer from "../../components/DashboardLayout";
import MainHeader from "../../components/MainHeader";
import SideNav from "../../components/SideNavigation";
import User from "../../public/assets/user-icon.png";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import validator from "validator";
import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { baseUrl } from "../../util";
import AuthWrapper from "../../components/AuthWrapper";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Head from "next/head";

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

  const [bvn, setBvn] = useState("");
  const [isBvnValid, setIsBvnValid] = useState(true);
  const [isSubmittingBvn, setIsSubmittingBvn] = useState(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResendingOtp, setIsResendingOtp] = useState(false);
  const [isOtpResent, setIsOtpResent] = useState(false);
  const router = useRouter();
  const {
    isOpen: isOtpModalOpen,
    onOpen: onOtpModalOpen,
    onClose: onOtpModalClose,
  } = useDisclosure();

  const handleBvnCheck = (e) => {
    e.preventDefault();

    setIsBvnValid(e.target.value.length === 11);
  };
  const handleSubmitBvn = async (e) => {
    const token = jwt_decode(userToken);
    e.preventDefault();
    setIsSubmittingBvn(true);
    if (Date.now() >= token.exp * 1000) {
      dispatch(logout());
    } else {
      try {
        const {
          data: { message },
        } = await axios({
          method: "get",
          url: `${baseUrl}/user/verify-bvn/${bvn}/start`,
          headers: { Authorization: "Bearer " + userToken },
        });
        toast.success(message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsSubmittingBvn(false);
        onOtpModalOpen();
      } catch (error) {
        setIsSubmittingBvn(false);
        if (error.response && error.response.data.message) {
          toast.error(error.response.data.message),
            {
              position: toast.POSITION.TOP_RIGHT,
            };
        } else {
          toast.error(error.message),
            {
              position: toast.POSITION.TOP_RIGHT,
            };
        }
      }
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsVerifying(true);
    try {
      const {
        data: { message },
      } = await axios({
        method: "get",
        url: `${baseUrl}/user/verify-bvn/${bvn}/${otp}/complete`,
        headers: { Authorization: "Bearer " + userToken },
      });
      setIsVerifying(false);
      setOtp("");
      setBvn("");
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      onOtpModalClose();
    } catch (error) {
      setIsVerifying(false);
      setIsSubmittingBvn(false);
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message),
          {
            position: toast.POSITION.TOP_RIGHT,
          };
      } else {
        toast.error(error.message),
          {
            position: toast.POSITION.TOP_RIGHT,
          };
      }
    }
  };
  const handleResendOtp = async () => {
    setIsResendingOtp(true);
    try {
      await axios.get(`${baseUrl}/user/verify-bvn/${bvn}/resend-otp`);
      setIsOtpResent(true);
      setIsResendingOtp(false);
      setOtp("");
      setTimeout(() => {
        setIsOtpResent(false);
      }, 5000);
    } catch (error) {
      setIsResendingOtp(false);
    }
  };

  useEffect(() => {
    if (!userToken) {
      router.push("/login");
    }
  }, [router, userToken]);

  return (
    userDetails && (
      <div>
        <Head>
          <title>Asset Tracker | Meristem Trustees</title>
          <meta
            name="description"
            content="Seamlessly track your assets, designate beneficiaries and access estate planning products tailored to your needs."
          />
          <meta
            name="viewport"
            content="width=device-width, height=device-height,  initial-scale=1.0, user-scalable=no,user-scalable=0"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
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
                Verify Identity
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Box>
                  <HStack mt="2rem">
                    <Image
                      width="70px"
                      height="70px"
                      className="rounded-full  border-solid border-6 border-darkgreen bg-lightgreen"
                      src={User}
                      alt={`${userDetails.othernames} ${userDetails.surname[0]}`}
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
                        py={"1.5rem"}
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
                        py={"1.5rem"}
                      />
                    </FormControl>
                    <FormControl w={{ base: "100%", lg: "40rem" }}>
                      <FormLabel fontSize={"1.6rem"}>Email</FormLabel>
                      <Input
                        type="text"
                        value={userDetails.email}
                        readOnly
                        fontSize={"1.6rem"}
                        bg={"grey"}
                        border="none"
                        py={"1.5rem"}
                      />
                    </FormControl>
                    <FormControl w={{ base: "100%", lg: "40rem" }}>
                      <FormLabel fontSize={"1.6rem"}>Phone Number</FormLabel>
                      <Input
                        type="text"
                        value={userDetails.phone_number}
                        readOnly
                        fontSize={"1.6rem"}
                        bg={"grey"}
                        border="none"
                        py={"1.5rem"}
                      />
                    </FormControl>
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
                  </Stack>
                </Box>
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
                  <form onSubmit={handleSubmitBvn}>
                    <Flex
                      w={{ base: "100%", lg: "57rem" }}
                      justifyContent={{
                        base: "space-around",
                        lg: "space-between",
                      }}
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
                          value={bvn}
                          onChange={(e) => {
                            setBvn(e.target.value);
                            handleBvnCheck(e);
                          }}
                          bg={"grey"}
                          border="none"
                          py={"2rem"}
                          required
                        />
                        {!isBvnValid && (
                          <small className="text-red">
                            Input must be 11 charcaters
                          </small>
                        )}
                      </FormControl>

                      <Button
                        bg={"darkgreen"}
                        color="white"
                        w="10rem"
                        fontSize={"1.6rem"}
                        py="2rem"
                        onClick={handleSubmitBvn}
                        disabled={!isBvnValid}
                      >
                        {isSubmittingBvn ? <Spinner /> : " Submit"}
                      </Button>
                    </Flex>
                  </form>
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
          <ToastContainer />
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            size="xl"
            isOpen={isOtpModalOpen}
            onClose={onOtpModalClose}
            isCentered

          >
            <ModalOverlay
              bg="none"
              backdropFilter="auto"
              backdropInvert="80%"
              backdropBlur="2px"
            />
            <ModalContent
              bg="white"
              fontSize="1.4rem"
              color="black"
              fontFamily="Poppins"
            >
              <ModalHeader textAlign="center" fontSize="2.3rem">
                OTP Sent 🎉🎉
              </ModalHeader>
              <ModalCloseButton color="black" />
              <ModalBody pb="1.5rem">
                <form className=" text-black" onSubmit={handleVerifyOtp}>
                  <Text textAlign="center" mb="1.5rem">
                    Kindly enter the otp sent to the phone number connected to
                    this BVN
                  </Text>
                  <div className="flex flex-col mb-5 mt-[1rem]">
                    <label className=" text-[1.4rem] mb-[1rem]">Otp</label>
                    <input
                      ref={finalRef}
                      onChange={(e) => setOtp(e.target.value)}
                      value={otp}
                      className="bg-[#F3F3F3] py-[0.8rem] px-[1.2rem]   rounded-[0.5rem]"
                      id="verification-otp"
                      type="number"
                      required
                    />
                  </div>

                  <button
                    onClick={handleVerifyOtp}
                    className=" w-full bg-darkgreen font-medium text-[1.8rem] items-center text-white py-[0.8rem] px-[1.2rem]  rounded-[0.5rem] "
                  >
                    {isVerifying ? <Spinner /> : "Verify BVN"}
                  </button>
                </form>
                <Text mt="1.5rem">
                  Did not receive an Otp?{" "}
                  <span
                    onClick={handleResendOtp}
                    className="text-[darkgreen] cursor-pointer mr-[1rem]"
                  >
                    Resend Otp
                  </span>
                  {isResendingOtp && <Spinner />}
                  {isOtpResent && (
                    <span className="bg-lightgreen color-black ml-[1rem] py-[0.2rem] px-[0.8rem] rounded">
                      Otp Resent
                    </span>
                  )}
                </Text>
              </ModalBody>
            </ModalContent>
          </Modal>
        </section>
      </div>
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
