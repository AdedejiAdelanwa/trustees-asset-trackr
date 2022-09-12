import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import block_one from "../public/assets/blockOne.png";
import block_two from "../public/assets/blockTwo.png";
import block_three from "../public/assets/blockThree.png";
import hidden from "../public/assets/Hiddenpassword.svg";
import show from "../public/assets/Showpassword.svg";
import validator from "validator";
import Logocomponent from "../components/LandingPageShared/logocomponent";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState("");
  const [validatePassword, setvalidatePassword] = useState("");
  const [handleSunmit, sethandleSunmit] = useState(false);

  const submitHandle = (e) => {
    e.preventDefault();

    sethandleSunmit(true);
  };

  const validateEmail = (e) => {
    const validEmail = validator.isEmail(e.target.value);
    validEmail ? setIsEmailValid("") : setIsEmailValid("Enter valid Email!");
  };

  const validate = (e) => {
    const Val = validator.isStrongPassword(e, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    });
    Val ? setvalidatePassword("") : setvalidatePassword("Not strong");
  };
  return (
    <>
      <main className="flex font-Poppins">
        <Logocomponent />
        <div className="w-1/2  sm:hidden h-[100vh] bg-lightgreen ">
          <h1 className=" text-[4.8rem] text-darkgreen mt-[13.4rem] md:mt-[13.8rem] mx-[6.3rem] md:mx-[1.3rem]">
            Welcome Back
          </h1>
          <p className="  text-[1.6rem] text-black w-[41rem] md:w-[38rem] mt-[1.5rem] mx-[6.3rem] md:mx-[1.3rem]">
            Sign up now to easily keep track of your assets, designate
            beneficiaries and receive estate planning products tailored to your
            assets.
          </p>
          <div className="flex h-[46.4rem] md:h-[46rem]  justify-between  overflow-y-hidden md:overflow-y-hidden">
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
        <div className="w-1/2 md:h-fit sm:w-full md:mx-[1rem] sm:mx-[2rem] bg-white mt-[12.5rem] sm:mt-[7rem] md:mt-[13.5rem] mt-[6rem] sm:my-[0rem] ml-[12rem] ">
          <h1 className="text-darkgreen text-[3.2rem] ">Log In</h1>
          <p className="text-black text-[1.6rem] mt-[0.1rem]">
            Don’t have an account?
            <span className=" font-bold text-[1.8rem] text-darkgreen">
              <Link href="/signup"> Sign Up</Link>
            </span>
          </p>
          <form className=" text-black" onSubmit={submitHandle}>
            <div className="flex flex-col mb-5 mt-[3rem]">
              <label className=" text-[1.4rem]">Email</label>
              <input
                onChange={validateEmail}
                className="bg-[#F3F3F3] w-[38rem] pt-[1.6rem] pr-[1.2rem] pb-[1.4rem] pl-[1.4rem] mt-[0.4rem]  rounded-[0.5rem]"
                id="grid-Email-Address"
                type="email"
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
                  onChange={(e) => validate(e.target.value)}
                  className="w-[33rem] bg-[#F3F3F3] text-1.6rem"
                  type={showPassword ? "text" : "password"}
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
              {validatePassword === "" ? null : (
                <div className="mt-[1rem] font-bold text-[#FF0000] text-[1.4rem]">
                  {validatePassword}
                </div>
              )}
            </div>
            <Link href="/dashboard/home">
              <button className="w-[38rem] bg-darkgreen font-medium text-[1.8rem] items-center text-white py-[1rem] px-[10rem] mt-[4rem] rounded-[0.5rem] ">
                Sign In
              </button>
            </Link>
          </form>
          <Link href="/resetpassword">
            <div className="font-semibold text-darkgreen text-[1.8rem] mt-[1.5rem] cursor-pointer">
              Forget Password?
            </div>
          </Link>
        </div>

        {/* Remove later */}

        {/* 
            <Logocomponent/>
            <div className="w-1/2  sm:hidden h-[100vh] bg-lightgreen ">
                
                
        <h1 className=" text-[4.8rem] text-darkgreen mt-[13.4rem] md:mt-[13.8rem] mx-[6.3rem] md:mx-[1.3rem]">
            Welcome Back
        </h1>
        <p className="  text-[1.6rem] text-black w-[41rem] md:w-[38rem] mt-[1.5rem] mx-[6.3rem] md:mx-[1.3rem]">
            Sign up now to easily keep track of your assets, designate
            beneficiaries and receive estate planning products tailored to your
            assets.
        </p>
        <div className="flex h-[46.4rem] md:h-[46rem]  justify-between  overflow-y-hidden md:overflow-y-hidden">
            <div className="h-[10rem] md:h-[7rem] self-end"><Image src={block_one} alt="block_one"/></div>
            <div className="h-[20rem] md:h-[14rem] self-end"><Image src={block_two} alt="block_two" /></div>
            <div className="h-[30rem] md:h-[19rem] self-end"><Image src={block_three} alt="block_three" /></div>
        </div> 
      </div>
            <div className="w-1/2 md:h-fit sm:w-full md:mx-[1rem] sm:mx-[2rem] bg-white mt-[12.5rem] sm:mt-[7rem] md:mt-[13.5rem] mt-[6rem] sm:my-[0rem] ml-[12rem] ">
                <Link href="/">
                    <div className="w-fit hidden sm:my-[4rem] cursor-pointer">
                        <Image src={logo} alt="logo" />
                    </div>
                </Link>
                <h1 className="text-darkgreen text-[3.2rem] ">
                    Welcome back, Johnson
                </h1>
                <h1 className=" text-black text-[1.6rem] mt-[0.1rem]">
                    Not You? <span className=" font-bold text-[1.8rem] text-darkgreen">
                    <Link href="/login"> Sign in with a different account</Link></span>
                </h1>
                <form className=" text-black" onSubmit={submitHandle}>
                    <div className="flex flex-col mb-5 mt-[3rem]">
                        <label className=" text-[1.4rem]" >
                            Email
                        </label>
                        <input className="bg-[#F3F3F3] w-[38rem] pt-[1.6rem] pr-[1.2rem] pb-[1.4rem] pl-[1.4rem] mt-[0.4rem]  rounded-[0.5rem]" id="grid-Email-Address" type="email" placeholder="jobori@gmail.com" required
                        />
                    </div>
                    <Link href="/dashboard/home">
                        <button className="w-[38rem] bg-darkgreen font-medium text-[1.8rem] items-center text-white py-[1rem] px-[10rem] mt-[4rem] rounded-[0.5rem] ">
                        Sign In
                        </button>
                    </Link>
                </form>
                <Link href="/resetpassword">
                    <div className="font-semibold text-darkgreen text-[1.8rem] mt-[1.5rem] cursor-pointer">
                        Forget Password?
                    </div>
                </Link>
            </div> */}
      </main>
    </>
  );
};
export default Login;
