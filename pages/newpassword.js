import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../util";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Head from "next/head";
import block_one from "../public/assets/blockOne.png";
import block_two from "../public/assets/blockTwo.png";
import block_three from "../public/assets/blockThree.png";
import Logocomponent from "../components/LandingPageShared/logocomponent";
//import validator from "validator";

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
import { BsEye, BsEyeSlash } from "react-icons/bs";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVissible, setIsPasswordVissible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const [isRequesting, setIsRequesting] = useState(false);

  const {
    isOpen: isOtpModalOpen,
    onOpen: onOtpModalOpen,
    onClose: onOtpModalClose,
  } = useDisclosure();
  const router = useRouter();
  const tokenquery = router.query.token;

  const handleSetNewPassword = async (e) => {
    e.preventDefault();
    setIsRequesting(true);
    try {
      await axios.patch(
        `${baseUrl}/user/forget-password/complete/${tokenquery}`,
        {
          newPassword: password,
          confirmNewPassword: confirmPassword,
        }
      );
      setIsRequesting(false);
      setPassword("");
      setConfirmPassword("");
      onOtpModalOpen();
      setTimeout(() => {
        router.push("/login");
        onOtpModalClose();
      }, 3000);
    } catch (error) {
      let notify;
      setIsRequesting(false);
      if (error.response && error.response.data.message) {
        notify = () => {
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        };
      } else {
        notify = () => {
          toast.error(error.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        };
      }
      notify();
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
              You can reset your password by entering a new password and also
              re-enter it to confirm
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
              Enter your prefered password
            </p>
            <form
              className=" text-black mt-[1.5rem]"
              onSubmit={handleSetNewPassword}
            >
              <div className="md:w-[34rem]">
                <label className=" text-[1.4rem]">New Password</label>
                <div className="flex bg-[#F3F3F3] w-[37rem] h-[4.8rem] mb-[1.6rem] sm:w-[31rem] sm:h-[4.3rem] md:w-[33rem] md:h-[4.8rem]">
                  <input
                    onChange={(e) => setPassword(e.target.value.trim())}
                    type={isPasswordVissible ? "password" : "text"}
                    className="bg-[#F3F3F3] w-[38rem] pt-[1.6rem] pr-[1.2rem] pb-[1.4rem] pl-[1.4rem] mt-[0.4rem]  rounded-[0.5rem]"
                    value={password}
                    autoComplete="new-password"
                    placeholder="*******"
                    required
                  />
                  <span
                    onClick={() => {
                      setIsPasswordVissible(!isPasswordVissible);
                    }}
                    className="bg-[#F3F3F3] mt-5"
                  >
                    {isPasswordVissible ? (
                      <BsEyeSlash style={{ width: "40px", height: "20px" }} />
                    ) : (
                      <BsEye style={{ width: "40px", height: "20px" }} />
                    )}
                  </span>
                </div>
              </div>
              <div className="md:w-[34rem]">
                <label className=" text-[1.4rem]">Confirm Password</label>
                <div className="flex bg-[#F3F3F3] w-[37rem] h-[4.8rem] mb-[1.6rem] sm:w-[31rem] sm:h-[4.3rem] md:w-[33rem] md:h-[4.8rem]">
                  <input
                    onChange={(e) => setConfirmPassword(e.target.value.trim())}
                    type={isConfirmPasswordVisible ? "password" : "text"}
                    className="bg-[#F3F3F3] w-[38rem] pt-[1.6rem] pr-[1.2rem] pb-[1.4rem] pl-[1.4rem] mt-[0.4rem]  rounded-[0.5rem]"
                    value={confirmPassword}
                    autoComplete="new-password"
                    placeholder="*******"
                    required
                  />
                  <span
                    onClick={() => {
                      setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
                    }}
                    className="bg-[#F3F3F3] mt-5"
                  >
                    {isConfirmPasswordVisible ? (
                      <BsEyeSlash style={{ width: "40px", height: "20px" }} />
                    ) : (
                      <BsEye style={{ width: "40px", height: "20px" }} />
                    )}
                  </span>
                </div>
              </div>

              <button
                onClick={handleSetNewPassword}
                className="w-[38rem] bg-darkgreen font-medium text-[1.8rem] items-center text-white py-[1rem] px-[10rem] mt-[2rem] rounded-[0.5rem] "
              >
                {isRequesting ? <Spinner /> : "Reset Password"}
              </button>
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
                You have successfully reset your password,{" "}
                <strong>Rerouting...</strong>
              </Text>
            </ModalBody>
          </ModalContent>
        </Modal>
        <ToastContainer />
      </main>
    </>
  );
};

export default NewPassword;
