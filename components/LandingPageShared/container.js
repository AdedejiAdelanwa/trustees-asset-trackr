import Image from "next/dist/client/image";
import Link from "next/dist/client/link";
import Meristem_logo from "../../public/assets/Meristemlogo.png";
import ExternalHeader from "../ExternalHeader";

const Container = ({ children }) => {
  return (
    <>
    <ExternalHeader />
      {/* <nav className="flex font-Poppins text-[18px] text-darkgreen bg-white h-[10vh] items-center justify-between px-[15.2rem]">
        <Link href="/" passHref={true}>
          <div className="mt-[2rem] cursor-pointer">
            <Image className="" src={Meristem_logo} alt="Meristem_logo" />
          </div>
        </Link>
        <div className=" flex w-[25rem] mt-[2.5rem] justify-between ">
          <Link href="/faqs" className="">
            <span className="mt-[6px] cursor-pointer">FAQ</span>
          </Link>

          <Link href="/login" className="text-darkgreen">
            <span className="mt-[6px] cursor-pointer">Log In</span>
          </Link>

          <div className="rounded-[4px] bg-darkgreen border text-white py-[0.5rem] px-5 ">
            <Link href="/signup">Get Started</Link>
          </div>
        </div>
      </nav> */}

      {children}

      <div className="flex w-full bg-[#F3F3F3] text-black text-[18px] h-[10vh] px-[15.2rem] items-center border-t-2 border-[#D0CDCD] ">
        {/* <div className="w-[251px] h-[27px] ml-[149.78px] mt-[16px]"> */}©
        2022 Copyright: Meristem
      </div>
    </>
  );
};
export default Container;
