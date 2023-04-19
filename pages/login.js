import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { baseUrl } from "../util";
import { userLogin } from "../redux/user/userActions";
import block_one from "../public/assets/blockOne.png";
import block_two from "../public/assets/blockTwo.png";
import block_three from "../public/assets/blockThree.png";
import hidden from "../public/assets/Hiddenpassword.svg";
import show from "../public/assets/Showpassword.svg";
import validator from "validator";
import Logocomponent from "../components/LandingPageShared/logocomponent";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { logout } from "../redux/user/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState("");
  const { loading, error } = useSelector((state) => state.user);
  const userToken = JSON.parse(localStorage.getItem("userToken"));
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isResendingOtp, setIsResendingOtp] = useState(false);
  const [isOtpResent, setIsOtpResent] = useState(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const {
    isOpen: isOtpModalOpen,
    onOpen: onOtpModalOpen,
    onClose: onOtpModalClose,
  } = useDisclosure();
  const notify = useCallback(() => {
    toast.error(error, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }, [error]);
  const validateEmail = (e) => {
    const validEmail = validator.isEmail(e.target.value);
    validEmail ? setIsEmailValid("") : setIsEmailValid("Enter valid Email!");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      dispatch(userLogin({ email, password }));
      setPassword("");
    } catch (error) {}
  };

  const handleResendOtp = async (e) => {
    e.preventDefault();
    setIsResendingOtp(true);
    try {
      await axios.get(`${baseUrl}/user/resend-otp/${email}`);
      setIsOtpResent(true);
      setIsResendingOtp(false);
      onOtpModalOpen();
      setTimeout(() => {
        setIsOtpResent(false);
      }, 3000);
    } catch (error) {
      setIsResendingOtp(false);
    }
  };
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsVerifying(true);
    try {
      await axios.get(`${baseUrl}/user/verify-otp/${email}/${otp}`);
      setIsVerifying(false);
      setOtp("");
      onOtpModalClose();
      router.push("/login");
    } catch (error) {
      setIsVerifying(false);
      alert(error);
    }
  };

  const checkValidToken = useCallback(() => {
    let token;
    if (userToken) {
      token = jwt_decode(userToken);
      if (Date.now() >= token.exp * 1000) {
        dispatch(logout());
      } else {
        router.push("/dashboard/home");
      }
    }
  }, [dispatch, router, userToken]);

  useEffect(() => {
    checkValidToken();

    notify();
  }, [checkValidToken, notify]);
  //console.log(userDetails);
  return (
    <>
      <Head>
        <title>Mapp | Meristem Trustees</title>
        <meta
          name="MAPP"
          content="Easily keep track of your assets, designate beneficiaries and receive estate planning products tailored to your assets."
        />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, height=device-height,initial-scale=1.0, user-scalable=no,user-scalable=0"
        />
      </Head>
      <main className="flex font-Poppins">
        <Logocomponent />
        <div className="w-1/2 flex items-end h-[100vh]  sm:hidden bg-lightgreen">
          <div className="w-full">
            <h1 className="w-[41rem] md:w-[37.7rem] text-[4.8rem] md:text-[4rem] text-darkgreen mx-[6.3rem] md:mx-[1.3rem] ">
              Welcome Back
            </h1>
            <p className="w-[41rem] md:w-[37.7rem] text-[1.6rem] text-black mx-[6.3rem] md:mx-[1.3rem] ">
              Log in to add more Assets, Beneficiaries and process an Estate
              plan for the successful transfer of all your assets to your loved
              ones.
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
        <div className="w-1/2 sm:w-full flex justify-center items-center sm:pt-[10rem] bg-white ">
          <div>
            <h1 className="text-darkgreen text-[3.2rem] ">Log In</h1>
            <p className="text-black text-[1.6rem] mt-[0.1rem]">
              Don’t have an account?
              <span className=" font-bold text-[1.8rem] text-darkgreen">
                <Link href="/signup"> Sign Up</Link>
              </span>
            </p>
            <form className=" text-black" onSubmit={handleLogin}>
              <div className="flex flex-col mb-5 mt-[3rem]">
                <label className=" text-[1.4rem]">Email</label>
                <input
                  onChange={(e) => {
                    validateEmail;
                    setEmail(e.target.value);
                  }}
                  className="bg-[#F3F3F3] text-[1.4rem] w-[38rem] pt-[1.6rem] pr-[1.2rem] pb-[1.4rem] pl-[1.4rem] mt-[0.4rem]  rounded-[0.5rem]"
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
              <div className="flex flex-col mb-5 mt-[3.5rem]">
                <label className="text-[1.4rem] ">Password</label>
                <div className="flex bg-[#F3F3F3] w-[38rem] pt-[1.4rem] pr-[1.2rem] pb-[1.2rem] pl-[1.4rem] mt-[0.4rem] rounded-[0.5rem]">
                  <input
                    onChange={(e) => setPassword(e.target.value.trim())}
                    className="w-[33rem] bg-[#F3F3F3] text-[1.4rem]"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    placeholder="*******"
                    required
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="w-[2rem] cursor-pointer"
                  >
                    {showPassword ? (
                      <Image src={hidden} alt="hidden" />
                    ) : (
                      <Image src={show} alt="show" />
                    )}
                  </span>
                </div>
              </div>
              <Link href="/dashboard/home">
                <button
                  onClick={handleLogin}
                  className="w-[38rem] bg-darkgreen font-medium text-[1.8rem] items-center text-white py-[1rem] px-[10rem] mt-[4rem] rounded-[0.5rem] "
                >
                  {loading ? <Spinner /> : "Log in"}
                </button>
              </Link>
            </form>
            {error == "Please verify your email address" && (
              <form>
                <div className="mt-[1.5rem]">
                  <span
                    onClick={handleResendOtp}
                    className="text-[black] bg-[lightgreen] p-[0.5rem] rounded  cursor-pointer mr-[1rem]"
                  >
                    Resend Otp?
                  </span>
                  {isResendingOtp && <Spinner />}
                  {isOtpResent && (
                    <span className="bg-lightgreen color-black ml-[1rem] py-[0.2rem] px-[0.8rem] rounded">
                      Otp Resent
                    </span>
                  )}
                </div>
              </form>
            )}

            <Link href="/resetpassword">
              <div className="font-semibold text-darkgreen text-[1.8rem] mt-[1.5rem] cursor-pointer">
                Forgot Password?
              </div>
            </Link>
          </div>
        </div>
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
                  Kindly enter the otp sent to your email to verify your account
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
                  {isVerifying ? <Spinner /> : "Verify Email"}
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
      </main>
    </>
  );
};
export default Login;
