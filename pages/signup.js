import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../redux/user/userActions";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

import { BsEye, BsEyeSlash } from "react-icons/bs";
import validator from "validator";
import logo from "../public/assets/Logo.png";
import bigBlock from "../public/assets/bigBlock.png";
import biggerBlock from "../public/assets/biggerBlock.png";
import biggestBlock from "../public/assets/biggestBlock.png";

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
  const [isConfirmEmailValidated, setisConfirmEmailValidated] = useState(true);
  const [isPasswordValidated, setIsPasswordValidated] = useState(false);
  const [isConfirmPasswordValidated, setIsConfirmPasswordValidated] =
    useState(false);
  const [isPhoneNumberValidated, setIsPhoneNumberValidated] = useState(true);
  const [eyePasswordCheck, setEyePasswordCheck] = useState(true);
  const [eyeConfirmPasswordCheck, setEyeConfirmPasswordCheck] = useState(true);

  const { loading, userInfo, error, success } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

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

  const ValidatePhoneNumberByMe = (phone) => {
    return /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(phone) ? true : false;
  };

  const ValidatePhoneNumber = (phoneNumber) => {
    const phoneNumberValidation = ValidatePhoneNumberByMe(phoneNumber);
    if (phoneNumberValidation) {
      setIsPhoneNumberValidated(false);
    } else {
      setIsPhoneNumberValidated(true);
    }
    setPhoneNumber(phoneNumber);
  };

  const validateConfirmEmail = (ConfirmEmail) => {
    const isConfirmEmailValidated = validator.isEmail(ConfirmEmail);
    setConfirmEmail(ConfirmEmail);
    isConfirmEmailValidated
      ? setisConfirmEmailValidated(true)
      : setisConfirmEmailValidated(false);
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
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmission(true);
    console.table(lastName, firstName, email, password, phoneNumber);
    dispatch(
      signupUser({
        surname: lastName,
        othernames: firstName,
        email,
        phone_number: phoneNumber,
        password,
      })
    );
  };

  const NextButton = () => {
    if (firstName && lastName && email && phoneNumber) {
      return (
        <button
          type="button"
          onClick={() => setProgressTrack(1)}
          className="bg-[#345C45] w-[37.1rem] h-[4.8rem] mt-7 text-[1.8rem] text-center sm:w-[28rem] sm:h-[48px] md:w-[31rem] md:h-[4.8rem] rounded-md"
          style={{ color: "white" }}
        >
          Next
        </button>
      );
    } else {
      return (
        <button
          type="button"
          onClick={() => setProgressTrack(1)}
          disabled
          className="bg-[#363d39] w-[37.1rem] h-[4.8rem] mt-7 text-[1.8rem] text-center sm:w-[28rem] sm:h-[48px] md:w-[31rem] md:h-[4.8rem] rounded-md"
          style={{ color: "white" }}
        >
          Next
        </button>
      );
    }
  };

  const SignUpButton = () => {
    if (password && confirmPassword) {
      return (
        <button
          className="bg-[#345C45] w-[14rem] h-[40px] text-[1.8rem] md:w-[10rem] md:h-[35px] rounded-md"
          type="submit"
          style={{ color: "white" }}
        >
          Sign Up
        </button>
      );
    } else {
      return (
        <button
          className="bg-[#363d39] w-[14rem] h-[40px] text-[1.8rem] md:w-[10rem] md:h-[35px] rounded-md"
          type="submit"
          disabled
          style={{ color: "white" }}
        >
          Sign Up
        </button>
      );
    }
  };

  const ConfirmEmailButton = () => {
    if (confirmEmail) {
      return (
        <button
          onClick={() => setProgressTrack(2)}
          type="button"
          className="bg-[#345C45] w-[14rem] h-[40px] text-[1.8rem] md:w-[10rem] md:h-[35px] rounded-md"
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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex font-Poppins">
        <div className="bg-[#BBF1D1] w-1/2 h-{100vh} sm:hidden md:w-1/2 md:h-{80vh}">
          <div className="mt-[4rem] w-[15rem] ml-[6.2rem] mb-[7rem] md:block md:mt-[2rem] md:w-[13.8rem] md:ml-[4rem] md:h-fit cursor-pointer ">
            <Link href="/">
              <Image src={logo} alt="MeristemLogo" />
            </Link>
          </div>

          <div className="font-normal w-[45rem] ml-[6.2rem] mb-[5.3rem] md:mb-[13.3rem] md:block md:w-[20rem] md:ml-[4rem]">
            <h1 className="w-[45rem] h-[20rem] text-[4.8rem] mb-[1.7rem] text-[#345C45] md:w-[31rem] md:h-[14.3rem] md:text-[3.5rem] ">
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

        <div className="flex justify-center px-[3rem] bg-white w-1/2 h-{100vh} md:block md:w-1/2 md:h-{80vh}">
          <div className="w-[10rem] h-[2rem] hidden sm:block sm:mt-7 md:hidden">
            <Image src={logo} alt="MeristemLogo" />
          </div>

          <div className=" w-[42rem] h-[55rem] mt-[10rem] sm:w-[20rem] sm:mt-[7rem] md:w-[35rem] md:h-[52rem] md:mt-[6rem] ">
            <h2 className="mb-6 text-[3.2rem] sm:text-[3.2rem] md:text-[3.2rem] text-[#345C45] ">
              Sign Up
            </h2>
            <div className="flex mb-10 w-[32.1rem] h-[2.4rem]">
              <p className="text-[1.6rem]">Already have an account?</p>
              <span className="ml-3 w-[5.7rem] h-[2.4rem] text-[#345C45] text-[1.8rem] ">
                <b>
                  <Link href="/login">Log in</Link>
                </b>
              </span>{" "}
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex sm:w-[28rem] md:w-[33.8rem] "
            >
              {progressTrack === 0 ? (
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
                        This is a required field with at least 3 character
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
                        Invalid Email.Please match the email pattern
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
                        Please phone number in the following format: (+123)
                        ***-****-***
                      </span>
                    )}
                  </span>
                  <div className=" w-[37.1rem] h-[4.8rem] mb-[1.6rem] sm:w-[33rem] md:w-[37.1rem]">
                    <div className="flex">
                      <select
                        name="format"
                        id="NumFormat"
                        className="bg-[#F3F3F3] h-[48px] text-[1.4rem] md:h-[4.4rem] rounded-bl-xl rounded-tl-xl border"
                        style={{ border: "none", outline: "none" }}
                      >
                        <option value="+234">+234</option>
                        <option value="+1">+1</option>
                        <option value="+997">+997</option>
                        <option value="+01">+01</option>
                        <option value="+233">+233</option>
                        <option value="+910">+910</option>
                      </select>
                      <input
                        onChange={(e) => ValidatePhoneNumber(e.target.value)}
                        onBlur={(e) => ValidatePhoneNumber(e.target.value)}
                        id="phone"
                        type="tel"
                        name="phone"
                        value={phoneNumber}
                        className="bg-[#F3F3F3] text-[1.4rem] w-[32rem] h-[4.8rem] sm:w-[22.5rem] sm:h-[4.4rem] sm:text-[1.3rem] p-2 md:text-[1.4rem] md:w-[25.5rem] md:h-[4.4rem] rounded-br-xl rounded-tr-xl"
                        placeholder="+234810xxxxxx"
                        style={{ border: "none", outline: "none" }}
                        required
                      />
                    </div>
                  </div>
                  <NextButton />
                </div>
              ) : progressTrack === 1 ? (
                <div
                  id="ConfirmEmail"
                  className="w-[40.1rem] md:w-[33rem] sm:w-[30rem]"
                >
                  <label className="text-[1.4rem] w-[95px]">
                    Confirm Email
                  </label>
                  <br />
                  <span>
                    {isConfirmEmailValidated ? (
                      ""
                    ) : (
                      <span className="text-[red]">
                        Invalid Email.Please match the email pattern
                      </span>
                    )}
                  </span>
                  <div className="w-[37rem] h-[4.8rem] mb-[3.6rem] sm:w-[29rem] md:w-[32rem]">
                    <input
                      onChange={(e) =>
                        validateConfirmEmail(e.target.value.trim())
                      }
                      onBlur={(e) =>
                        validateConfirmEmail(e.target.value.trim())
                      }
                      type="email"
                      id="confirmEmail"
                      name="ConfirmEmail"
                      value={confirmEmail}
                      className="bg-[#F3F3F3] w-[37.1rem] h-[4.8rem] p-2 text-[1.4rem] rounded-lg sm:w-[28rem] sm:h-[4.4rem] sm:text-[1.2rem] sm:rounded-lg md:w-[31rem] md:h-[4.4rem] md:text-[1.4rem] md:rounded-lg  "
                      placeholder="faruq@gmail.com"
                      style={{ border: "none", outline: "none" }}
                    />
                  </div>

                  <div className="flex justify-between w-[37rem] mt-7 mb-7 sm:w-[28rem] md:w-[31rem] ">
                    <button
                      onClick={() => setProgressTrack(0)}
                      type="button"
                      className="bg-tranparent text-[#345C45] text-[1.8rem] w-[14rem] h-[4rem] sm:w-[8rem] sm:h-[3rem] sm:text-[1.3rem] md:w-[10rem] md:h-[3.5rem] md:text-[1.5rem] border border-[#345C45] rounded-md"
                    >
                      Back
                    </button>
                    <ConfirmEmailButton />
                  </div>
                </div>
              ) : progressTrack === 2 ? (
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
                      onClick={() => setProgressTrack(1)}
                      className="bg-tranparent text-[#345C45] text-[1.8rem] w-[14rem] h-[4rem] sm:w-[8rem] sm:h-[3rem] sm:text-[1.3rem] md:w-[10rem] md:h-[3.5rem] md:text-[1.5rem] border border-[#345C45] rounded-md"
                    >
                      Back
                    </button>
                    <SignUpButton />
                  </div>

                  <div className="w-[36.6rem] sm:w-[30rem] md:w-[34rem] ">
                    <div className="flex">
                      <input
                        id="checkbox"
                        type="checkbox"
                        className="w-[2rem] sm:w-[1rem] md:w-[1.5rem] border border-[#345C45]"
                      />
                      <h6 className="ml-3 text-[1.3rem] sm:text-[1rem] md:text-[1.2rem]">
                        I agree to the Terms & Condition and Privacy Policy
                      </h6>
                    </div>
                  </div>
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};
module.exports = Signup;
