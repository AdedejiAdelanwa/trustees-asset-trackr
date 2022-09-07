import Image from "next/image";
import Link from "next/link";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { GrDiamond, GrHomeRounded } from "react-icons/gr";
import { RiFileList3Line } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import styled from "styled-components";
import Logo from "../public/assets/Logo.svg";
import User from "../public/assets/user-icon.png";
import { useState } from "react";

const HeaderWrapper = styled.header`
  width: 100vw;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: inherit;
  font-size: 1.6rem;
  padding: 0 2.5rem;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  z-index: 1;

  .logo-group {
    align-items: flex-end;
  }
  .mobile-nav {
    padding: 1rem 0;

    .close-btn {
      padding-left: 2rem;
      font-size: 4rem;
    }
  
    .list-item {
      height: 6rem;
      display: flex;
      align-items: center;
      padding-left: 2rem;
      cursor: pointer;
    }
  }

  .user-box {
    align-items: center;
    justify-content: space-between;
    width: 12rem;
  }

  svg {
    display: none;
  }

  @media screen and (max-width: 768px) {
    padding: 0 2rem;
  
  }
  @media screen and (max-width: 414px) {
    padding: 0 1.5rem;
    svg {
      display: block;
      margin-right: 1.5rem;
    }
    .user-box {
      align-items: center;
      justify-content: center;
      width: 4rem;

      p {
        display: none;
      }
    }
  }
`;

const MainHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <HeaderWrapper className="relative text-black bg-white">
      <div className="logo-group  w-2/3 flex">
        {!isOpen ? (
          <AiOutlineMenu
            fontSize={"2.4rem"}
            className="cursor-pointer hover:text-darkgreen"
            onClick={() => setIsOpen(!isOpen)}
          />
        ) : (
          ""
        )}
        <nav
          className={`mobile-nav text-black bg-lightgrey w-3/4 h-[90vh]  left-0 bottom-0 z-10 fixed ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } ease-in-out duration-300`}
        >
          <AiOutlineClose
            fontSize={"3rem"}
            className="close-btn cursor-pointer hover:text-darkgreen"
            onClick={() => setIsOpen(!isOpen)}
          />
          <ul className="menu-list">
            <li className="list-item hover:bg-lightgreen">
              <GrHomeRounded fontSize={"2.4rem"} />
              <Link href="/dashboard/home">Home</Link>
            </li>
            <li className="list-item hover:bg-lightgreen">
              <GrDiamond fontSize={"2.4rem"} />
              <Link href="/dashboard/assets">Assets</Link>
            </li>
            <li className="list-item hover:bg-lightgreen">
              <RiFileList3Line fontSize={"2.4rem"} />
              <Link href="/dashboard/estate-plans">Estate plans</Link>
            </li>
            <li className="list-item hover:bg-lightgreen">
              <FiSettings fontSize={"2.4rem"} />
              <Link href="/dashboard/settings">Settings</Link>
            </li>
          </ul>
          <Link href="/help-and-support">
            <button className=" w-3/4 absolute bottom-40 ml-8 py-4 px-6 text-darkgreen  rounded-md border-solid border-2 border-darkgreen hover:bg-lightgreen hover:shadow-md">
              Help & Support
            </button>
          </Link>
        </nav>

        <Link href="/" passHref>
          <Image src={Logo} alt="Meristem logo" />
        </Link>
      </div>

      <div className=" user-box flex font-bold">
        <Image
          src={User}
          width="40px"
          height={"40px"}
          className="rounded-full border-solid border-6 border-darkgreen bg-lightgreen"
          alt="Johnson O."
        />
        <p className="">Labake J.</p>
      </div>
    </HeaderWrapper>
  );
};
export default MainHeader;
