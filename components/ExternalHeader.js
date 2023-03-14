import Image from "next/image";
import Link from "next/link";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import styled from "styled-components";
import Logo from "../public/assets/Logo.svg";
import { useState } from "react";
import { Button, HStack } from "@chakra-ui/react";

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: inherit;
  font-size: 1.6rem;
  padding: 0 8rem;
  z-index: 100;

  .logo-group {
    align-items: flex-end;
  }
  .mobile-nav {
    padding: 1rem 0;
    display: none;

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

  svg {
    display: none;
  }

  @media screen and (max-width: 768px) {
    padding: 0 2rem;
  }
  @media screen and (max-width: 414px) {
    padding: 0 1.5rem;
    .mobile-nav {
      display: block;
    }
    svg {
      display: block;
      margin-right: 1.5rem;
    }
  }
`;

const ExternalHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <HeaderWrapper className=" text-black bg-white">
      <div className="logo-group  w-2/3 flex">
        <Link href="/" passHref>
          <Image src={Logo} alt="Meristem logo" />
        </Link>
      </div>
      <HStack
        w={"25%"}
        justifyContent={"space-between"}
        fontFamily="Poppins"
        display={{ base: "none", lg: "flex" }}
      >
        <Link href="/faqs">FAQ</Link>
        <Link href="/login">
          <Button
            py={"2rem"}
            px="2rem"
            color="darkgreen"
            border="2px solid darkgreen"
            fontSize={"1.5rem"}
            _hover={{
              backgroundColor: "darkgreen",
              color: "white",
            }}
          >
            Log in
          </Button>
        </Link>
        <Link href="/signup">
          <Button
            py={"2rem"}
            px="2rem"
            bg={"darkgreen"}
            color="white"
            fontSize={"1.5rem"}
          >
            Get Started
          </Button>
        </Link>
      </HStack>
      {isOpen ? (
        ""
      ) : (
        <AiOutlineMenu
          fontSize={"2.4rem"}
          className="cursor-pointer hover:text-darkgreen"
          onClick={() => setIsOpen(true)}
        />
      )}
      <nav
        className={`mobile-nav text-black bg-white w-2/4 h-[30vh]  right-[-100%] top-0 z-10 fixed ${
          isOpen ? "right-[0%]" : "translate-x-[-50%]"
        } ease-in-out duration-300`}
      >
        <AiOutlineClose
          fontSize={"3rem"}
          className="close-btn cursor-pointer hover:text-darkgreen"
          onClick={() => setIsOpen(false)}
        />
        <ul className="menu-list">
          <Link href="/faqs">
            <li className="list-item">FAQ</li>
          </Link>
          <Link href="/login">
            <li className="list-item">Login</li>
          </Link>
          <Link href="/signup">
            <li className="list-item text-darkgreen font-bold">Get Started</li>
          </Link>
        </ul>
      </nav>
    </HeaderWrapper>
  );
};
export default ExternalHeader;
