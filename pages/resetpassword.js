import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "../util";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import block_one from "../public/assets/blockOne.png";
import block_two from "../public/assets/blockTwo.png";
import block_three from "../public/assets/blockThree.png";
import Logocomponent from "../components/LandingPageShared/logocomponent";
import validator from "validator";

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

const Resetpassword = () => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState("");
  const [isRequesting, setIsRequesting] = useState(false);
  const {
    isOpen: isOtpModalOpen,
    onOpen: onOtpModalOpen,
    onClose: onOtpModalClose,
  } = useDisclosure();
  const validateEmail = (e) => {
    const validEmail = validator.isEmail(e.target.value);
    validEmail ? setIsEmailValid("") : setIsEmailValid("Enter valid Email!");
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsRequesting(true);
    try {
      await axios.get(`${baseUrl}/user/forget-password/start/${email}`);
      setIsRequesting(false);
      setEmail("");
      onOtpModalOpen();
    } catch (error) {
      setIsRequesting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Asset Tracker | Meristem Trustees</title>
        <meta
          name="description"
          content="Seamlessly track your assets, designate beneficiaries and access estate planning products tailored to your needs."
        />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, height=device-height,  initial-scale=1.0, user-scalable=no;user-scalable=0;"
        />
      </Head>
      <main className="flex font-Poppins">
        <Logocomponent />
        <div className="w-1/2 flex items-end h-[100vh] sm:hidden bg-lightgreen">
          <div className="w-full">
            <h1 className="w-[41rem] md:w-[37.7rem] text-[4.8rem] md:text-[4rem] text-darkgreen mx-[6.3rem] md:mx-[1.3rem] ">
              Welcome Back
            </h1>
            <p className="w-[41rem] md:w-[37.7rem] text-[1.6rem] text-black mx-[6.3rem] md:mx-[1.3rem] ">
              Sign up now to easily keep track of your assets, designate
              beneficiaries and receive estate planning products tailored to
              your assets.
            </p>

            <div className="flex h-[45rem]  justify-between overflow-y-hidden md:overflow-y-hidden">
              <div className="h-[10rem] md:h-[7rem] self-end">
                <Image src={block_one} alt="block_one" />
              </div>
              <div className="h-[20rem] md:h-[14rem] self-end">
                <Image src={block_two} alt="block_two" />
              </div>
              <div className="h-[30rem] md:h-[19rem] self-end">
                <Image src={block_three} alt="block_three" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 h-[100vh] sm:w-full flex justify-center items-center sm:pt-[10rem] bg-white mb-[8rem] ">
          <div>
            <h1 className="text-darkgreen text-[3.2rem] ">Reset Password</h1>
            <p className="w-[38rem] sm:w-[31rem] text-black text-[1.6rem] mt-[0.1rem]">
              We’ll send a link to your email, use it to set a new password
            </p>
            <form className=" text-black" onSubmit={handleResetPassword}>
              <div className="flex flex-col mb-5 mt-[3rem]">
                <label className=" text-[1.4rem]">Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value.trim())}
                  onKeyUp={validateEmail}
                  className="bg-[#F3F3F3] w-[38rem] pt-[1.6rem] pr-[1.2rem] pb-[1.4rem] pl-[1.4rem] mt-[0.4rem]  rounded-[0.5rem]"
                  id="grid-Email-Address"
                  type="email"
                  value={email}
                  placeholder="jobori@gmail.com"
                  required
                />
                <div className="mt-[1rem] font-bold text-[#FF0000] text-[1.4rem] ">
                  {isEmailValid}
                </div>
              </div>
              <Link href="#">
                <button
                  onClick={handleResetPassword}
                  className="w-[38rem] bg-darkgreen font-medium text-[1.8rem] items-center text-white py-[1rem] px-[10rem] mt-[2rem] rounded-[0.5rem] "
                >
                  {isRequesting ? <Spinner /> : "Reset Password"}
                </button>
              </Link>
            </form>
          </div>
        </div>
        <Modal
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
          <ModalContent bg="white" fontSize="1.4rem" color="black">
            <ModalHeader textAlign="center" fontSize="2.3rem">
              Reset successful 🎉🎉
            </ModalHeader>
            <ModalCloseButton color="black" />
            <ModalBody pb="1.5rem">
              <Text mt="1.5rem">
                We have sent you a reset password link to your mail.
              </Text>
            </ModalBody>
          </ModalContent>
        </Modal>
      </main>
    </>
  );
};

export default Resetpassword;
