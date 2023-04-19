import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { baseUrl } from "../util";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import validator from "validator";
import logo from "../public/assets/Logo.png";
import bigBlock from "../public/assets/bigBlock.png";
import biggerBlock from "../public/assets/biggerBlock.png";
import biggestBlock from "../public/assets/biggestBlock.png";
import {
  Button,
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

const Signup = () => {
  const [progressTrack, setProgressTrack] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [issubmission, setIsSubmission] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isFirstNameValidated, setisFirstNameValidated] = useState(true);
  const [isLastNameValidated, setisLastNameValidated] = useState(true);
  const [isEmailPattern, setisEmailPattern] = useState(true);
  const [isPasswordValidated, setIsPasswordValidated] = useState(false);
  const [isConfirmPasswordValidated, setIsConfirmPasswordValidated] =
    useState(false);
  const [isPhoneNumberValidated, setIsPhoneNumberValidated] = useState(true);
  const [eyePasswordCheck, setEyePasswordCheck] = useState(true);
  const [eyeConfirmPasswordCheck, setEyeConfirmPasswordCheck] = useState(true);
  const [isTCAgreed, setIsTCAgreed] = useState(false);
  const {
    isOpen: isOtpModalOpen,
    onOpen: onOtpModalOpen,
    onClose: onOtpModalClose,
  } = useDisclosure();
  const {
    isOpen: isErrorModalOpen,
    onOpen: onErrorModalOpen,
    onClose: onErrorModalClose,
  } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [otp, setOtp] = useState("");
  const [signupErrorMessage, setSignupErrorMessage] = useState("");
  const router = useRouter();
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResendingOtp, setIsResendingOtp] = useState(false);
  const [isOtpResent, setIsOtpResent] = useState(false);
  // const [verificationMessage, setVerificationMessage] = useState("");

  const validateFirstName = (fname) => {
    const FirstNameValidation = validator.isLength(fname, {
      min: 3,
      max: undefined,
    });
    setFirstName(fname);
    FirstNameValidation
      ? setisFirstNameValidated(true)
      : setisFirstNameValidated(false);
  };

  const validateLastName = (lname) => {
    const LastNameValidation = validator.isLength(lname, {
      min: 3,
      max: undefined,
    });
    setLastName(lname);
    LastNameValidation
      ? setisLastNameValidated(true)
      : setisLastNameValidated(false);
  };

  const validateEmail = (email) => {
    const EmailValidation = validator.isEmail(email, {
      allow_display_name: false,
      require_display_name: false,
      allow_utf8_local_part: true,
      require_tld: true,
      allow_ip_domain: false,
      domain_specific_validation: false,
      blacklisted_chars: "",
      host_blacklist: [],
    });
    setEmail(email);
    EmailValidation ? setisEmailPattern(true) : setisEmailPattern(false);
  };

  const ValidatePhoneNumber = (phoneNumber) => {
    const phoneNumberValidation = validator.isMobilePhone(
      phoneNumber,
      "en-NG",
      {
        minLength: 11,
        maxLength: 11,
      }
    );

    if (phoneNumberValidation) {
      setIsPhoneNumberValidated(true);
    } else {
      setIsPhoneNumberValidated(false);
    }
    setPhoneNumber(phoneNumber);
  };

  const validatePasswordByMe = (pwd) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{5,}$/.test(pwd)
      ? true
      : false;
  };

  const validatePassword = (pass) => {
    const passwordValidation = validatePasswordByMe(pass);
    if (passwordValidation) {
      setIsPasswordValidated(false);
    } else {
      setIsPasswordValidated(true);
    }
    setPassword(pass);

    if (password === confirmPassword) {
      setIsConfirmPasswordValidated(false);
    } else {
      setIsConfirmPasswordValidated(true);
    }
  };

  const validateConfirmPassword = (confpassword) => {
    if (confpassword === password) {
      setIsConfirmPasswordValidated(false);
    } else {
      setIsConfirmPasswordValidated(true);
    }
    setConfirmPassword(confpassword);
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsSubmission(true);

    try {
      await axios({
        method: "post",
        url: `${baseUrl}/user/create`,
        data: {
          surname: lastName,
          othernames: firstName,
          email,
          phone_number: phoneNumber,
          password,
        },
      });
      setIsSubmission(false);
      onOtpModalOpen();
      setFirstName("");
      setLastName("");
      setPhoneNumber("");
      setPassword("");
      setConfirmEmail("");
      setConfirmPassword("");
    } catch (error) {
      setIsSubmission(false);
      if (error.response && error.response.data.message) {
        setSignupErrorMessage(error.response.data.message);
        onErrorModalOpen();
      }
      setSignupErrorMessage(error.response.data.message);
      onErrorModalOpen();
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

  const handleResendOtp = async () => {
    setIsResendingOtp(true);
    try {
      await axios.get(`${baseUrl}/user/resend-otp/${email}`);
      setIsOtpResent(true);
      setIsResendingOtp(false);
      setTimeout(() => {
        setIsOtpResent(false);
      }, 5000);
    } catch (error) {
      setIsResendingOtp(false);
    }
  };

  const ConfirmEmailButton = () => {
    if (confirmEmail) {
      return (
        <button
          onClick={() => setProgressTrack(2)}
          type="button"
          className="bg-[#008145] w-[14rem] h-[40px] text-[1.8rem] md:w-[10rem] md:h-[35px] rounded-md"
          style={{ color: "white" }}
        >
          Next
        </button>
      );
    } else {
      return (
        <button
          onClick={() => setProgressTrack(2)}
          type="button"
          disabled
          className="bg-[#363d39] w-[14rem] h-[40px] text-[1.8rem] md:w-[10rem] md:h-[35px] rounded-md"
          style={{ color: "white" }}
        >
          Next
        </button>
      );
    }
  };
  // useEffect(()=>{

  // },[userInfo, success])
  return (
    <div>
      <Head>
        <title>Asset Tracker | Meristem Trustees</title>
        <meta name="description" content="Generated by create next app" />
        <meta
          name="viewport"
          content="width=device-width, height=device-height,  initial-scale=1.0, user-scalable=no,user-scalable=0"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex font-Poppins text-black w-full h-[100vh] bg-white">
        <div className="bg-[#BBF1D1] w-1/2 h-{100vh} sm:hidden md:w-1/2 md:h-{80vh}">
          <div className="mt-[4rem] w-[15rem] ml-[6.2rem] mb-[7rem] md:block md:mt-[2rem] md:w-[13.8rem] md:ml-[4rem] md:h-fit cursor-pointer ">
            <Link href="/">
              <Image src={logo} alt="MeristemLogo" />
            </Link>
          </div>

          <div className="font-normal w-[45rem] ml-[6.2rem] mb-[5.3rem] md:mb-[13.3rem] md:block md:w-[20rem] md:ml-[4rem]">
            <h1 className="w-[45rem] h-[20rem] text-[4.8rem] mb-[1.7rem] text-[#008145] md:w-[31rem] md:h-[14.3rem] md:text-[3.5rem] ">
              Keep track of all your assets on a single dashboard
            </h1>

            <p className="w-[41.4rem] h-[7.2rem] text-[1.6rem] sm:hidden md:w-[31rem] md:h-[7.2rem] md:text-[1.3rem]">
              Sign up now to easily keep track of your assets, designated
              beneficiaries and receive estate planning products tailored to
              your assets.
            </p>
          </div>

          <div className="flex h-[46.4rem] md:h-[22rem] justify-between place-items-end overflow-y-hidden md:overflow-y-hidden">
            <div className="h-[9.8rem] md:h-[6.9rem] ">
              <Image src={bigBlock} alt="bigBlock" />
            </div>
            <div className="h-[18.8rem] md:h-[13.3rem] ">
              <Image src={biggerBlock} alt="biggerBlock" />
            </div>
            <div className="h-[25.6rem] md:h-[18rem] ">
              <Image src={biggestBlock} alt="biggestBlock" />
            </div>
          </div>
        </div>

        <div className="flex justify-center px-[3rem]  bg-white w-1/2 h-{100vh} md:block md:w-1/2 md:h-{80vh}">
          <div className="w-[10rem] h-[2rem] hidden sm:block sm:mt-7 md:hidden">
            <Image src={logo} alt="MeristemLogo" />
          </div>

          <div className=" w-[42rem] h-[55rem] mt-[10rem] sm:w-[20rem] sm:mt-[7rem] md:w-[35rem] md:h-[52rem] md:mt-[6rem] ">
            <h2 className="mb-6 text-[3.2rem] sm:text-[3.2rem] md:text-[3.2rem] text-[#008145] ">
              Sign Up
            </h2>
            <div className="flex mb-10 w-[32.1rem] h-[2.4rem]">
              <p className="text-[1.6rem]">Already have an account?</p>
              <span className="ml-3 w-[5.7rem] font-bold h-[2.4rem] text-[#008145] text-[1.8rem] ">
                <Link href="/login">Log in</Link>
              </span>
            </div>

            <form
              onSubmit={handleSignUp}
              className="flex sm:w-[28rem] md:w-[33.8rem] "
            >
              {progressTrack === 0 && (
                <div id="SignUp" className="mb-5 w-[39rem] ">
                  <label className="text-[1.4rem] w-[7.5rem] mb-2">
                    First Name
                  </label>
                  <br />
                  <span>
                    {isFirstNameValidated ? (
                      ""
                    ) : (
                      <span className=" text-[red]">
                        This is a required field with at least 3 character
                      </span>
                    )}
                  </span>
                  <div className=" w-[37.1rem] h-[4.8rem] mb-[1.6rem] sm:w-[33rem] md:w-[37.1rem]">
                    <input
                      onChange={(e) => validateFirstName(e.target.value.trim())}
                      onBlur={(e) => validateFirstName(e.target.value.trim())}
                      type="text"
                      id="fname"
                      name="firstName"
                      value={firstName}
                      className="bg-[#F3F3F3] w-[37.1rem] h-[4.8rem] p-2 text-[1.4rem] rounded-lg sm:w-[28rem] sm:h-[4.4rem] sm:text-[1.2rem] sm:rounded-lg md:w-[31rem] md:h-[4.4rem] md:text-[1.4rem] md:rounded-lg  "
                      placeholder="firstName"
                      style={{ border: "none", outline: "none" }}
                      required
                    />
                  </div>

                  <label className="text-[1.4rem] w-[95px]">Last Name</label>
                  <br />
                  <span>
                    {isLastNameValidated ? (
                      ""
                    ) : (
                      <span className="text-[red]">
                        Enter a name with min. 3 character
                      </span>
                    )}
                  </span>
                  <div className=" w-[37.1rem] h-[4.8rem] mb-[1.6rem] sm:w-[33rem] md:w-[37.1rem]">
                    <input
                      onChange={(e) => validateLastName(e.target.value.trim())}
                      onBlur={(e) => validateLastName(e.target.value.trim())}
                      type="text"
                      id="lname"
                      name="lastName"
                      value={lastName}
                      className="bg-[#F3F3F3] w-[37.1rem] h-[4.8rem] p-2 text-[1.4rem] rounded-lg sm:w-[28rem] sm:h-[4.4rem] sm:text-[1.2rem] sm:rounded-lg md:w-[31rem] md:h-[4.4rem] md:text-[1.4rem] md:rounded-lg  "
                      placeholder="lastName"
                      style={{ border: "none", outline: "none" }}
                      required
                    />
                  </div>

                  <label className="text-[1.4rem] w-[95px] ">Email</label>
                  <br />
                  <span>
                    {isEmailPattern ? (
                      ""
                    ) : (
                      <span className="text-[red]">
                        Kindly enter a valid email
                      </span>
                    )}
                  </span>
                  <div className=" w-[37.1rem] h-[4.8rem] mb-[1.6rem] sm:w-[33rem] md:w-[37.1rem]">
                    <input
                      onChange={(e) => validateEmail(e.target.value.trim())}
                      type="email"
                      id="Email"
                      name="email"
                      value={email}
                      className="bg-[#F3F3F3] w-[37.1rem] h-[4.8rem] p-2 text-[1.4rem] rounded-lg sm:w-[28rem] sm:h-[4.4rem] sm:text-[1.2rem] sm:rounded-lg md:w-[31rem] md:h-[4.4rem] md:text-[1.4rem] md:rounded-lg  "
                      placeholder="Faruq@gmail.com"
                      style={{ border: "none", outline: "none" }}
                      required
                    />
                  </div>

                  <label className="text-[1.4rem] w-[95px]">Phone Number</label>
                  <br />
                  <span>
                    {isPhoneNumberValidated ? (
                      ""
                    ) : (
                      <span className="text-[red]">
                        Kindly enter a valid phone number
                      </span>
                    )}
                  </span>
                  <div className=" w-[37.1rem] h-[4.8rem] mb-[1.6rem] sm:w-[33rem] md:w-[37.1rem]">
                    <input
                      onChange={(e) => ValidatePhoneNumber(e.target.value)}
                      onBlur={(e) => ValidatePhoneNumber(e.target.value)}
                      id="phone"
                      type="number"
                      name="phone"
                      value={phoneNumber}
                      className="bg-[#F3F3F3] text-[1.4rem] w-[37.1rem] h-[4.8rem] sm:w-[22.5rem] sm:h-[4.4rem] sm:text-[1.3rem] p-2 md:text-[1.4rem] md:w-[25.5rem] md:h-[4.4rem] rounded-br-xl rounded-tr-xl"
                      placeholder="+234810xxxxxx"
                      style={{ border: "none", outline: "none" }}
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setProgressTrack(1)}
                    className={`${
                      firstName && lastName && email && phoneNumber
                        ? "bg-[#008145]"
                        : "bg-[#363d39]"
                    }  w-[37.1rem] h-[4.8rem] mt-7 text-[1.8rem] text-center sm:w-[28rem] sm:h-[48px] md:w-[31rem] md:h-[4.8rem] rounded-md`}
                    style={{ color: "white" }}
                    disabled={!firstName && !lastName && !email && !phoneNumber}
                  >
                    Next
                  </button>
                </div>
              )}

              {progressTrack === 1 && (
                <div className="md:w-[34rem]">
                  <label className="text-[1.4rem] w-[95px]">Password</label>
                  <br />
                  <span>
                    {isPasswordValidated ? (
                      <span className=" text-[red]">
                        A minimum 8 characters password contains a combination
                        of uppercase and lowercase letter and number are
                        required.
                      </span>
                    ) : (
                      ""
                    )}
                  </span>
                  <div className="flex bg-[#F3F3F3] w-[37rem] h-[4.8rem] mb-[1.6rem] sm:w-[31rem] sm:h-[4.3rem] md:w-[33rem] md:h-[4.8rem]">
                    <input
                      onChange={(e) => validatePassword(e.target.value.trim())}
                      type={eyePasswordCheck ? "password" : "text"}
                      id="password"
                      name="password"
                      value={password}
                      autoComplete="new-password"
                      className="bg-[#F3F3F3] w-[33rem] h-[4.8rem] p-2 text-[1.4rem] rounded-lg sm:w-[28rem] sm:h-[4.4rem] sm:text-[1.2rem] sm:rounded-lg md:w-[31rem] md:h-[4.4rem] md:text-[1.4rem] md:rounded-lg  "
                      placeholder="**********"
                      style={{ border: "none", outline: "none" }}
                    />
                    <span
                      id="toggle"
                      onClick={() => {
                        setEyePasswordCheck((prev) => !prev);
                      }}
                      className="bg-[#F3F3F3] mt-5"
                    >
                      {eyePasswordCheck ? (
                        <BsEyeSlash style={{ width: "40px", height: "20px" }} />
                      ) : (
                        <BsEye style={{ width: "40px", height: "20px" }} />
                      )}
                    </span>
                  </div>

                  <label className="text-[1.4rem] w-[95px]">
                    Confirm Password
                  </label>
                  <br />
                  <span>
                    {isConfirmPasswordValidated ? (
                      <span className=" text-[red]">Password mismatch !</span>
                    ) : (
                      ""
                    )}
                  </span>
                  <div className="flex bg-[#F3F3F3] w-[37rem] h-[4.8rem] mb-[1.6rem] sm:w-[31rem] sm:h-[4.3rem] md:w-[33rem] md:h-[4.8rem]">
                    <input
                      onChange={(e) =>
                        validateConfirmPassword(e.target.value.trim())
                      }
                      onBlur={(e) =>
                        validateConfirmPassword(e.target.value.trim())
                      }
                      type={eyeConfirmPasswordCheck ? "password" : "text"}
                      id="confirmPassword"
                      name="confirmPassword"
                      autoComplete="new-password"
                      value={confirmPassword}
                      className="bg-[#F3F3F3] w-[33rem] h-[4.8rem] p-2 text-[1.4rem] rounded-lg sm:w-[28rem] sm:h-[4.4rem] sm:text-[1.2rem] sm:rounded-lg md:w-[31rem] md:h-[4.4rem] md:text-[1.4rem] md:rounded-lg  "
                      placeholder="**********"
                      style={{ border: "none", outline: "none" }}
                    />
                    <span
                      id="toggle"
                      onClick={() => {
                        setEyeConfirmPasswordCheck((prev) => !prev);
                      }}
                      className="bg-[#F3F3F3] mt-5"
                    >
                      {eyeConfirmPasswordCheck ? (
                        <BsEyeSlash style={{ width: "40px", height: "20px" }} />
                      ) : (
                        <BsEye style={{ width: "40px", height: "20px" }} />
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between w-[37rem] mt-7 mb-7 sm:w-[28rem] md:w-[33rem] ">
                    <button
                      type="button"
                      onClick={() => setProgressTrack(0)}
                      className="bg-tranparent text-[#008145] text-[1.8rem] w-[14rem] h-[4rem] sm:w-[8rem] sm:h-[3rem] sm:text-[1.3rem] md:w-[10rem] md:h-[3.5rem] md:text-[1.5rem] border border-[#008145] rounded-md"
                    >
                      Back
                    </button>

                    <button
                      className={`${
                        password && confirmPassword && isTCAgreed
                          ? "bg-[#008145]"
                          : "bg-[#363d39]"
                      } w-[14rem] h-[40px] text-[1.8rem] md:w-[10rem] md:h-[35px] rounded-md`}
                      type="submit"
                      disabled={!isTCAgreed || !password || !confirmPassword}
                      style={{ color: "white" }}
                    >
                      {issubmission ? <Spinner /> : " Sign Up"}
                    </button>
                  </div>

                  <div className="w-[36.6rem] sm:w-[30rem] md:w-[34rem] ">
                    <div className="flex">
                      <input
                        id="checkbox"
                        type="checkbox"
                        onClick={(e) => setIsTCAgreed(e.target.checked)}
                        className="w-[2rem] sm:w-[1rem] md:w-[1.5rem] border border-[#008145]"
                      />
                      <h6 className="ml-3 text-[1.3rem] sm:text-[1rem] md:text-[1.2rem]">
                        I agree to the Terms & Condition and Privacy Policy
                      </h6>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
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
        <Modal
          size="xl"
          isOpen={isErrorModalOpen}
          onClose={onErrorModalClose}
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
              An error occured
            </ModalHeader>
            <ModalCloseButton color="black" />
            <ModalBody pb="1.5rem">
              <Text textAlign="center" mb="1.5rem">
                {signupErrorMessage}
              </Text>

              <button
                onClick={onErrorModalClose}
                className=" w-full bg-darkgreen font-medium text-[1.8rem] items-center text-white py-[0.6rem] px-[1rem]  rounded-[0.5rem] "
              >
                Close
              </button>
            </ModalBody>
          </ModalContent>
        </Modal>
      </main>
    </div>
  );
};
module.exports = Signup;
